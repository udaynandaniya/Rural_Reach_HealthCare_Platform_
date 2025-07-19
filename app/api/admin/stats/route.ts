import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import Doctor from "@/lib/models/Doctor"
import Hospital from "@/lib/models/Hospital"
import EmergencyAlert from "@/lib/models/EmergencyAlert"
import HealthTip from "@/lib/models/HealthTip"
import BlockedList from "@/lib/models/BlockedList"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    if (!decoded.isAdmin) {
      return NextResponse.json({ success: false, message: "Admin access required" }, { status: 403 })
    }

    await dbConnect()

    // Get today's date range
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    const tomorrow = new Date(today)
    tomorrow.setDate(tomorrow.getDate() + 1)

    const [
      totalUsers,
      totalHospitals,
      totalDoctors,
      activeEmergencies,
      pendingApprovals,
      blockedUsers,
      totalHealthTips,
      emergenciesToday,
      verifiedHospitals,
      verifiedDoctors,
      emergencyCapableHospitals,
    ] = await Promise.all([
      User.countDocuments(),
      Hospital.countDocuments(),
      Doctor.countDocuments(),
      EmergencyAlert.countDocuments({ status: "pending" }),
      HealthTip.countDocuments({ isApproved: false }),
      BlockedList.countDocuments(),
      HealthTip.countDocuments({ isApproved: true }),
      EmergencyAlert.countDocuments({ createdAt: { $gte: today, $lt: tomorrow } }),
      Hospital.countDocuments({ isVerified: true }),
      Doctor.countDocuments({ isVerified: true }),
      Hospital.countDocuments({ isHandleEmergency: true }),
    ])

    return NextResponse.json({
      success: true,
      data: {
        totalUsers,
        totalHospitals,
        totalDoctors,
        activeEmergencies,
        pendingApprovals,
        blockedUsers,
        totalHealthTips,
        emergenciesToday,
        verifiedHospitals,
        verifiedDoctors,
        emergencyCapableHospitals,
      },
    })
  } catch (error) {
    // console.error("Error fetching admin stats:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
