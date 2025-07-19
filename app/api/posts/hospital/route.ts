//C:\Users\UDAYN\Downloads\healthcare-platform\app\api\posts\hospital\route.ts



// app/api/posts/route.ts
import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import post from "@/lib/models/post"
import { getSession } from "@/lib/getSession"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    // console.log("📦 Fetching posts based on role")

    const session = await getSession(request)
    const query: any = { isApproved: true }

    // 🔒 If the user is logged in, apply role-based logic
    if (session) {
      const { role, email } = session

      if (role === "doctor" || role === "hospital") {
        // 🧠 Exclude posts by the logged-in doctor/hospital (based on email)
        query.email = { $ne: email }
      }

      // 🧑 For `user`, we don't exclude anything — see all posts
    }

    const posts = await post
      .find(query)
      .sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length,
    })
  } catch (error) {
    console.error("❌ Error fetching posts:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}
