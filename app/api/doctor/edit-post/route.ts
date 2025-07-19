import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import post from "@/lib/models/post"

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    if (decoded.role !== "doctor") {
      return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 })
    }

    const { postId, title, content } = await request.json()
    if (!postId || (!title && !content)) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 })
    }

    await dbConnect()

    const existingPost = await post.findById(postId)
    if (!existingPost) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 })
    }

    // ✅ Match by email and authorType
    if (existingPost.email !== decoded.email || existingPost.authorType !== "Doctor") {
      return NextResponse.json({ success: false, message: "Not authorized to edit this post" }, { status: 403 })
    }

    if (title) existingPost.title = title
    if (content) existingPost.content = content

    await existingPost.save()
    return NextResponse.json({ success: true, message: "Post updated successfully" })
  } catch (error) {
    console.error("💥 Error updating doctor post:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
