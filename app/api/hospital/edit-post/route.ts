// import { type NextRequest, NextResponse } from "next/server"
// import jwt from "jsonwebtoken"
// import dbConnect from "@/lib/mongodb"
// import post from "@/lib/models/post"

// export async function PUT(request: NextRequest) {
//   try {
//     const token = request.cookies.get("auth-token")?.value

//     if (!token) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

//     if (decoded.role !== "hospital") {
//       return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 })
//     }

//     const { postId, title, content, category, tags, mentionedHospital } = await request.json()

//     if (!postId || (!title && !content && !category && !tags && !mentionedHospital)) {
//       return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
//     }

//     await dbConnect()

//     const existingPost = await post.findById(postId)

//     if (!existingPost) {
//       return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 })
//     }

//     if (existingPost.authorId.toString() !== decoded.userId || existingPost.authorType !== "Hospital") {
//       return NextResponse.json({ success: false, message: "Not authorized to edit this post" }, { status: 403 })
//     }

//     // Update only provided fields
//     if (title) existingPost.title = title
//     if (content) existingPost.content = content
//     if (category) existingPost.category = category
//     if (tags) existingPost.tags = tags
//     if (mentionedHospital !== undefined) existingPost.mentionedHospital = mentionedHospital

//     await existingPost.save()

//     return NextResponse.json({ success: true, message: "Post updated successfully" })
//   } catch (error) {
//     console.error("💥 Error editing hospital post:", error)
//     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
//   }
// }








// app/api/hospital/edit-post/route.ts

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
    if (decoded.role !== "hospital") {
      return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 })
    }

    const { postId, title, content, category, tags, mentionedDoctor } = await request.json()
    if (!postId || (!title && !content && !category && !tags && mentionedDoctor === undefined)) {
      return NextResponse.json({ success: false, message: "Missing fields" }, { status: 400 })
    }

    await dbConnect()

    const existingPost = await post.findById(postId)
    if (!existingPost) {
      return NextResponse.json({ success: false, message: "Post not found" }, { status: 404 })
    }

    // ✅ Match by email and authorType
    if (existingPost.email !== decoded.email || existingPost.authorType !== "Hospital") {
      return NextResponse.json({ success: false, message: "Not authorized to edit this post" }, { status: 403 })
    }

    if (title) existingPost.title = title
    if (content) existingPost.content = content
    if (category) existingPost.category = category
    if (tags) existingPost.tags = tags
    if (mentionedDoctor !== undefined) {
      existingPost.mentionedId = mentionedDoctor
      existingPost.mentionedType = mentionedDoctor ? "Doctor" : null
    }

    await existingPost.save()
    return NextResponse.json({ success: true, message: "Post updated successfully" })
  } catch (error) {
    console.error("💥 Error updating hospital post:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
