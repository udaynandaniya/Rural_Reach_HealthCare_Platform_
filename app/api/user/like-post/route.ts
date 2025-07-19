import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import post from "@/lib/models/post"  

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const { postId } = await request.json()

    await dbConnect()

    const Post = await post.findById(postId)
    if (!Post) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 })
    }

    const userLikedIndex = Post.likes.indexOf(decoded.userId)
    if (userLikedIndex > -1) {
      Post.likes.splice(userLikedIndex, 1)
    } else {
      Post.likes.push(decoded.userId)
    }

    await Post.save()

    return NextResponse.json({ success: true, message: "Post like updated" })
  } catch (error) {
    console.error("Error updating post like:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
