

import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Announcement from "@/lib/models/Announcement"
import { getSession } from "@/lib/getSession"

export async function PATCH(request: Request) {
  // console.log("🔧 PATCH /api/announcements/edit called")

  await dbConnect()
  // console.log("✅ Database connected")

  const session = await getSession(request)
  // console.log("🔐 Session:", session)

  if (!session || !session.email) {
    console.warn("❌ Unauthorized: No session or email")
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id, title, content } = await request.json()
    // console.log("📦 Payload received:", { id, title, content })

    if (!id || !title || !content) {
      console.warn("❌ Missing fields in payload")
      return NextResponse.json(
        { success: false, message: "ID, title, and content are required." },
        { status: 400 },
      )
    }

    const announcement = await Announcement.findById(id)
    // console.log("📄 Fetched announcement:", announcement)

    if (!announcement) {
      console.warn("❌ Announcement not found")
      return NextResponse.json({ success: false, message: "Announcement not found." }, { status: 404 })
    }

    if (announcement.ownerEmail !== session.email) {
      console.warn("❌ Email mismatch: unauthorized edit attempt")
      return NextResponse.json(
        { success: false, message: "You are not authorized to edit this announcement." },
        { status: 403 },
      )
    }

    // Perform the update
    announcement.title = title
    announcement.content = content

    // console.log("\n\nSending updated announcement:", announcement)

    await announcement.save()

    // console.log("✅ Announcement updated successfully:", announcement)

    return NextResponse.json(
      { success: true, data: announcement, message: "Announcement updated." },
      { status: 200 },
    )
  } catch (error) {
    console.error("❌ Error editing announcement:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update announcement." },
      { status: 500 },
    )
  }
}
