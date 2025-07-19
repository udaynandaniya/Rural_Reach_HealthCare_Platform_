// import { type NextRequest, NextResponse } from "next/server"
// import jwt from "jsonwebtoken"
// import dbConnect from "@/lib/mongodb"
// import EmergencyAlert from "@/lib/models/EmergencyAlert"

// export async function DELETE(request: NextRequest) {
//   try {
//     const token = request.cookies.get("auth-token")?.value
//     if (!token) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
//     const { alertId } = await request.json()

//     if (!alertId) {
//       return NextResponse.json({ success: false, message: "Alert ID is required" }, { status: 400 })
//     }

//     await dbConnect()

//     const alert = await EmergencyAlert.findOneAndDelete({
//       _id: alertId,
//       userId: decoded.userId,
//       // Only allow deletion if the alert is not pending
//       status: { $ne: "pending" },
//     })

//     if (!alert) {
//       return NextResponse.json(
//         { success: false, message: "Alert not found or cannot be deleted in its current state." },
//         { status: 404 },
//       )
//     }

//     return NextResponse.json({ success: true, message: "Alert deleted successfully" })
//   } catch (error) {
//     console.error("Error deleting alert:", error)
//     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
//   }
// }










import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import EmergencyAlert from "@/lib/models/EmergencyAlert"

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const { alertId } = await request.json()

    if (!alertId) {
      return NextResponse.json({ success: false, message: "Alert ID is required" }, { status: 400 })
    }

    await dbConnect()

    const result = await EmergencyAlert.deleteOne({ _id: alertId, userId: decoded.userId })

    if (result.deletedCount === 0) {
      return NextResponse.json(
        { success: false, message: "Alert not found or not authorized to delete" },
        { status: 404 },
      )
    }

    return NextResponse.json({ success: true, message: "Alert deleted successfully" })
  } catch (error) {
    console.error("Error deleting alert:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
