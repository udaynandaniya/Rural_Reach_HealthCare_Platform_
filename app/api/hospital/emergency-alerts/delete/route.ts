// import { type NextRequest, NextResponse } from "next/server"
// import EmergencyAlert from "@/lib/models/EmergencyAlert"
// import { verifyToken } from "@/lib/auth"
// import dbConnect from "@/lib/mongodb"


// export async function DELETE(request: NextRequest) {
//   try {
//     await dbConnect()

//     const token = request.cookies.get("token")?.value
//     if (!token) {
//       return NextResponse.json({ message: "Authentication required" }, { status: 401 })
//     }

//     const decoded = verifyToken(token)
//     if (!decoded || decoded.role !== "hospital") {
//       return NextResponse.json({ message: "Hospital access required" }, { status: 403 })
//     }

//     const { alertId } = await request.json()

//     if (!alertId) {
//       return NextResponse.json({ message: "Alert ID is required" }, { status: 400 })
//     }

//     // Find and delete the alert
//     const alert = await EmergencyAlert.findById(alertId)
//     if (!alert) {
//       return NextResponse.json({ message: "Alert not found" }, { status: 404 })
//     }

//     // Mark as read and delete
//     await EmergencyAlert.findByIdAndUpdate(alertId, {
//       isRead: true,
//       deletedBy: decoded.id,
//       deletedAt: new Date(),
//     })

//     // Actually delete the alert
//     await EmergencyAlert.findByIdAndDelete(alertId)

//     return NextResponse.json({
//       success: true,
//       message: "Alert deleted successfully",
//     })
//   } catch (error) {
//     console.error("Error deleting emergency alert:", error)
//     return NextResponse.json({ message: "Internal server error" }, { status: 500 })
//   }
// }




import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import EmergencyAlert from "@/lib/models/EmergencyAlert"

export async function DELETE(req: NextRequest) {
  try {
    const token = req.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const hospitalId = decoded.userId // Get hospital ID from token

    await dbConnect()
    const { alertId } = await req.json()

    if (!alertId) {
      return NextResponse.json({ message: "Missing alertId" }, { status: 400 })
    }

    // Find the alert and ensure it was sent to this hospital
    const alert = await EmergencyAlert.findOne({
      _id: alertId,
      "isSentTo.hospitalId": hospitalId,
    })

    if (!alert) {
      return NextResponse.json({ message: "Alert not found or not sent to this hospital" }, { status: 404 })
    }

    // Remove the specific hospital's entry from the isSentTo array
    // This effectively "deletes" the alert from this hospital's view
    await EmergencyAlert.updateOne({ _id: alertId }, { $pull: { isSentTo: { hospitalId: hospitalId } } })

    // Optional: If the isSentTo array becomes empty after this, you might want to
    // consider deleting the alert entirely from the database if no other hospitals
    // are tracking it. For now, we'll just remove it from this hospital's view.
    const updatedAlert = await EmergencyAlert.findById(alertId)
    if (updatedAlert && updatedAlert.isSentTo.length === 0) {
      await EmergencyAlert.deleteOne({ _id: alertId })
      console.log(`🗑️ Alert ${alertId} fully deleted as no hospitals are tracking it.`)
    } else {
      console.log(`🗑️ Alert ${alertId} removed from hospital ${hospitalId}'s view.`)
    }

    return NextResponse.json({ message: "Alert deleted successfully" }, { status: 200 })
  } catch (error: any) {
    console.error("Error deleting emergency alert:", error)
    return NextResponse.json({ message: "Failed to delete emergency alert", error: error.message }, { status: 500 })
  }
}

