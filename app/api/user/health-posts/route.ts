import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import post from "@/lib/models/post"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()

    const posts = await post.find({ isApproved: true })
      .populate("authorId", "name")
      .populate("mentionedId", "name")
      .sort({ createdAt: -1 })
      .limit(20)

    return NextResponse.json({ success: true, data: posts })
  } catch (error) {
    console.error("Error fetching health posts:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
