// app/api/doctor/create-post/route.ts
import { NextResponse } from "next/server"
import post from "@/lib/models/post"
import { getSession } from "@/lib/getSession"


export async function POST(req: Request) {
  try {
    const session = await getSession(req)

    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    if (session.role !== "doctor") {
      return NextResponse.json({ success: false, message: "Forbidden: Not a doctor" }, { status: 403 })
    }

    const body = await req.json()
    const { title, content, category, tags } = body

    if (!title || !content || !category || !tags) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }






// console.log("\n\\n\n\n📦 Session used in post creation:", session)











    const newPost = await post.create({
      title,
      content,
      category,
      tags,
      postby: session.name,
      email: session.email,
      authorType: "Doctor",
      mentionedId: null,
      mentionedType: null,
      isApproved: true,
    })

    return NextResponse.json({ success: true, data: newPost }, { status: 201 })

  } catch (error) {
    console.error("🔥 [CREATE_POST_ERROR]:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
