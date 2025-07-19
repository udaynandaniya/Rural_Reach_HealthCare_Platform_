// app/api/posts/route.ts

import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import post from "@/lib/models/post"
import { cookies } from "next/headers"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    // console.log("📦 Fetching all posts with role-aware filtering")

    const cookieStore = await cookies()
    const token = cookieStore.get("auth-token")?.value

    let currentUserEmail = null
    let currentUserRole = null

    // Decode the token if it exists
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
        currentUserEmail = decoded.email
        currentUserRole = decoded.role
      } catch (err) {
        console.warn("⚠️ Invalid token, treating as guest")
      }
    }

    const query: any = { isApproved: true }

    // 🧠 Only exclude current user's posts if the role is doctor or hospital
    if (
      currentUserEmail &&
      (currentUserRole === "doctor" || currentUserRole === "hospital")
    ) {
      query.email = { $ne: currentUserEmail }
    }

    const posts = await post.find(query).sort({ createdAt: -1 })

    return NextResponse.json({
      success: true,
      data: posts,
      count: posts.length,
    })
  } catch (error) {
    console.error("💥 Error fetching posts:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 },
    )
  }
}
