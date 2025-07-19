//C:\Users\UDAYN\Downloads\healthcare-platform\app\api\doctor\my-posts\route.ts


import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import post from "@/lib/models/post"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    if (decoded.role !== "doctor") {
      return NextResponse.json({ success: false, message: "Doctor access required" }, { status: 403 })
    }

    await dbConnect()

    const posts = await post
      .find({ email: decoded.email, authorType: "Doctor" }) // ✅ Query by email
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: posts }) // ✅ Return as `data` to match frontend
  } catch (error) {
    console.error("💥 Error fetching doctor posts:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
