import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import jwt from "jsonwebtoken"
import assessment from "@/lib/models/Assessment"


// Helper function to get user from JWT token
function getUserFromToken(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) return null

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    return decoded
  } catch (error) {
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = getUserFromToken(request)
    if (!user?.userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const body = await request.json()
    const { type, responses, score, result } = body

    const assessment = new Assessment({
      userId: user.userId,
      type,
      responses,
      score,
      result,
      completedAt: new Date(),
    })

    await assessment.save()

    return NextResponse.json({
      success: true,
      message: "Assessment completed successfully",
      data: assessment,
    })
  } catch (error) {
    console.error("💥 Error saving assessment:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const user = getUserFromToken(request)
    if (!user?.userId) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    await dbConnect()
    const assessments = await Assessment.find({ userId: user.userId }).sort({ completedAt: -1 })

    return NextResponse.json({
      success: true,
      data: assessments,
    })
  } catch (error) {
    console.error("💥 Error fetching assessments:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
