import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import post from "@/lib/models/post"

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    if (decoded.role !== "doctor") {
      return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 })
    }

    const { postId } = await request.json()
    if (!postId) {
      return NextResponse.json({ success: false, message: "Post ID is required" }, { status: 400 })
    }

    await dbConnect()
    const existingPost = await post.findById(postId)
    if (!existingPost) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 })
    }

    // ✅ Match by email and authorType
    if (existingPost.email !== decoded.email || existingPost.authorType !== "Doctor") {
      return NextResponse.json({ success: false, message: "Not authorized to delete this post" }, { status: 403 })
    }

    await post.findByIdAndDelete(postId)
    return NextResponse.json({ success: true, message: "Post deleted successfully" })
  } catch (error) {
    console.error("💥 Error deleting doctor post:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
