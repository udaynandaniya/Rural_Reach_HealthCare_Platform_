//C:\Users\UDAYN\Downloads\healthcare-platform\app\api\posts\doctor\route.ts
import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import post from "@/lib/models/post"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    //console.log("📦 Fetching all doctor posts")

    const posts = await post
      .find({ authorType: "Doctor" })
      .populate("authorId", "name")
      .populate("mentionedId", "name")
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, posts })
  } catch (error) {
    console.error("💥 Error fetching doctor posts:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
