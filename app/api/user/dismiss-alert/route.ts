// // import { type NextRequest, NextResponse } from "next/server"
// // import jwt from "jsonwebtoken"
// // import dbConnect from "@/lib/mongodb"
// // import EmergencyAlert from "@/lib/models/EmergencyAlert"

// // export async function POST(request: NextRequest) {
// //   try {
// //     const token = request.cookies.get("auth-token")?.value
// //     if (!token) {
// //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
// //     const { alertId } = await request.json()

// //     await dbConnect()

// //     const alert = await EmergencyAlert.findOneAndUpdate(
// //       { _id: alertId, userId: decoded.userId },
// //       { isRead: true },
// //       { new: true },
// //     )

// //     if (!alert) {
// //       return NextResponse.json({ success: false, message: "Alert not found" }, { status: 404 })
// //     }

// //     return NextResponse.json({ success: true, message: "Alert dismissed" })
// //   } catch (error) {
// //     console.error("Error dismissing alert:", error)
// //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// //   }
// // }



// // C:\Users\UDAYN\Downloads\healthcare-platform\app\api\user\dismiss-alert\route.ts
// import { type NextRequest, NextResponse } from "next/server"
// import jwt from "jsonwebtoken"
// import dbConnect from "@/lib/mongodb"
// import EmergencyAlert from "@/lib/models/EmergencyAlert"

// export async function POST(request: NextRequest) {
//   try {
//     const token = request.cookies.get("auth-token")?.value
//     if (!token) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
//     const { alertId } = await request.json()

//     await dbConnect()

//     const alert = await EmergencyAlert.findOneAndUpdate(
//       {
//         _id: alertId,
//         userId: decoded.userId,
//         status: { $in: ["pending", "declined"] }, // Only allow cancelling if not accepted yet
//       },
//       {
//         status: "cancelled",
//       },
//       { new: true }
//     )

//     if (!alert) {
//       return NextResponse.json({ success: false, message: "Alert not found or already processed" }, { status: 404 })
//     }

//     return NextResponse.json({ success: true, message: "Alert cancelled successfully", alert })
//   } catch (error) {
//     console.error("Error cancelling alert:", error)
//     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
//   }
// }







import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import EmergencyAlert from "@/lib/models/EmergencyAlert"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const { alertId } = await request.json()

    await dbConnect()

    // Find the alert and update its status to 'cancelled'
    const alert = await EmergencyAlert.findOneAndUpdate(
      {
        _id: alertId,
        userId: decoded.userId,
        // Only allow cancelling if the alert is pending or has no response from all contacted hospitals
        status: { $in: ["pending", "no_response_all_contacted"] },
      },
      {
        status: "cancelled",
        nextEscalationTime: null, // Stop any further escalation
      },
      { new: true },
    )

    if (!alert) {
      return NextResponse.json(
        { success: false, message: "Alert not found, already processed, or cannot be cancelled." },
        { status: 404 },
      )
    }

    return NextResponse.json({ success: true, message: "Alert cancelled successfully", alert })
  } catch (error) {
    console.error("Error cancelling alert:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
