//C:\Users\UDAYN\Downloads\healthcare-platform\app\api\auth\me\route.ts
import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import Doctor from "@/lib/models/Doctor"
import Hospital from "@/lib/models/Hospital"

export async function GET(request: NextRequest) {
  // console.log("i am at me JWT_SECRET at runtime:", process.env.JWT_SECRET)


  try {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      return NextResponse.json({
        success: false,
        message: "No token found",
      })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    await dbConnect()
  // console.log(" \n Decoded token:", decoded)
     
    // Find user based on role
    let user
    let Model

    switch (decoded.role) {
      case "user":
        Model = User
        break
      case "doctor":
        Model = Doctor
        break
      case "hospital":
        Model = Hospital
        break
      default:
        return NextResponse.json({
          success: false,
          message: "Invalid role",
        })
    }

    user = await Model.findById(decoded.userId).select("-password")

    if (!user) {
      return NextResponse.json({
        success: false,
        message: "User not found",
      })
    }

    // Check if admin
    const isAdmin = user.email === process.env.ADMIN_EMAIL

    return NextResponse.json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: decoded.role,
        isAdmin: isAdmin,
        isVerified: user.isVerified,
      },
    })
  } catch (error) {
    console.error("Auth check error:", error)
    return NextResponse.json({
      success: false,
      message: "Invalid token",
    })
  }
}
