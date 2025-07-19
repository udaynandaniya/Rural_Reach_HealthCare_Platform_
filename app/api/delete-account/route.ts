import { NextRequest, NextResponse } from "next/server"
import { getSession } from "@/lib/getSession"
import dbConnect from "@/lib/mongodb"

// Models
import User from "@/lib/models/User"
import Doctor from "@/lib/models/Doctor"
import Hospital from "@/lib/models/Hospital"
import Announcement from "@/lib/models/Announcement"
import BlockedList from "@/lib/models/BlockedList"
import EmergencyAlert from "@/lib/models/EmergencyAlert"
import post from "@/lib/models/post"
import AllUserContact from "@/lib/models/AllUserContact"

export async function DELETE(req: NextRequest) {
  await dbConnect()

  const session = await getSession()
  if (!session) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  const { userId, email, phone, role } = session

  try {
    // ✅ Step 1: Remove from AllUserContact fast
    await AllUserContact.deleteMany({
      $or: [{ email }, ...(phone ? [{ phone }] : [])],
    })

    // ✅ Step 2: Prepare early response & delete JWT cookie
    const response = NextResponse.json({
      success: true,
      message: "Account deletion initiated. You will be logged out shortly.",
    })

    // Clear JWT auth token
    response.cookies.set("auth-token", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      expires: new Date(0),
    })

    // ✅ Optional: Also clear custom session if stored (depends on your system)
    if (typeof session.destroy === "function") {
      await session.destroy()
    }

    // ✅ Step 3: Background data deletion (non-blocking)
    setTimeout(async () => {
      try {
        const sharedTasks = [
          EmergencyAlert.deleteMany({ $or: [{ email }, ...(phone ? [{ phone }] : [])] }),
          BlockedList.deleteMany({ $or: [{ email }, ...(phone ? [{ phone }] : [])] }),
        ]

        switch (role) {
          case "user":
            await Promise.all([
              User.findByIdAndDelete(userId),
              ...sharedTasks,
            ])
            break

          case "doctor":
            await Promise.all([
              Doctor.findByIdAndDelete(userId),
              post.deleteMany({ createdBy: userId }),
              Announcement.deleteMany({ createdBy: userId }),
              ...sharedTasks,
            ])
            break

          case "hospital":
            await Promise.all([
              Hospital.findByIdAndDelete(userId),
              post.deleteMany({ createdBy: userId }),
              Announcement.deleteMany({ createdBy: userId }),
              ...sharedTasks,
            ])
            break

          default:
            console.warn(`Unknown role "${role}" — skipped role-specific deletion.`)
            await Promise.all(sharedTasks)
            break
        }
      } catch (err) {
        console.error("Background deletion error:", err)
      }
    }, 1000)

    return response
  } catch (error) {
    console.error("Delete account error:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}
