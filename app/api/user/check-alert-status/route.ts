// // // // //C:\Users\UDAYN\Downloads\healthcare-platform\app\api\user\check-alert-status\route.ts

// // // // import { type NextRequest, NextResponse } from "next/server"
// // // // import jwt from "jsonwebtoken"
// // // // import dbConnect from "@/lib/mongodb"
// // // // import EmergencyAlert from "@/lib/models/EmergencyAlert"

// // // // export async function POST(request: NextRequest) {
// // // //   try {
// // // //     const token = request.cookies.get("auth-token")?.value
// // // //     if (!token) {
// // // //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // // //     }

// // // //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
// // // //     const { alertId } = await request.json()

// // // //     await dbConnect()

// // // //     const alert = await EmergencyAlert.findOne({
// // // //       _id: alertId,
// // // //       userId: decoded.userId,
// // // //     }).populate("acceptedBy", "name")

// // // //     if (!alert) {
// // // //       return NextResponse.json({ success: false, message: "Alert not found" }, { status: 404 })
// // // //     }

// // // //     console.log("🔍 Checking alert status:", {
// // // //       alertId: alert._id,
// // // //       status: alert.status,
// // // //       acceptedBy: alert.acceptedBy?.name || null,
// // // //     })

// // // //     return NextResponse.json({
// // // //       success: true,
// // // //       alert: {
// // // //         _id: alert._id,
// // // //         status: alert.status,
// // // //         acceptedBy: alert.acceptedBy,
// // // //         createdAt: alert.createdAt,
// // // //         respondedAt: alert.respondedAt,
// // // //       },
// // // //     })
// // // //   } catch (error) {
// // // //     console.error("Error checking alert status:", error)
// // // //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// // // //   }
// // // // }































// // // import { type NextRequest, NextResponse } from "next/server"
// // // import jwt from "jsonwebtoken"
// // // import dbConnect from "@/lib/mongodb"
// // // import EmergencyAlert from "@/lib/models/EmergencyAlert"

// // // export async function POST(request: NextRequest) {
// // //   try {
// // //     const token = request.cookies.get("auth-token")?.value
// // //     if (!token) {
// // //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // //     }

// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
// // //     const { alertId } = await request.json()

// // //     await dbConnect()

// // //     // Populate acceptedBy to get hospital name, phone, and email
// // //     const alert = await EmergencyAlert.findOne({
// // //       _id: alertId,
// // //       userId: decoded.userId,
// // //     }).populate("acceptedBy._id", "name phone email") // Populate the _id field within acceptedBy

// // //     if (!alert) {
// // //       return NextResponse.json({ success: false, message: "Alert not found" }, { status: 404 })
// // //     }

// // //     console.log("🔍 Checking alert status:", {
// // //       alertId: alert._id,
// // //       status: alert.status,
// // //       acceptedBy: alert.acceptedBy?.name || null,
// // //       acceptedByPhone: alert.acceptedBy?.phone || null, // Include phone
// // //       acceptedByEmail: alert.acceptedBy?.email || null, // Include email
// // //     })

// // //     return NextResponse.json({
// // //       success: true,
// // //       alert: {
// // //         _id: alert._id,
// // //         status: alert.status,
// // //         acceptedBy: alert.acceptedBy, // This will now contain name, phone, email
// // //         createdAt: alert.createdAt,
// // //         respondedAt: alert.respondedAt,
// // //       },
// // //     })
// // //   } catch (error) {
// // //     console.error("Error checking alert status:", error)
// // //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// // //   }
// // // }





























// // import { type NextRequest, NextResponse } from "next/server"
// // import jwt from "jsonwebtoken"
// // import dbConnect from "@/lib/mongodb"
// // import EmergencyAlert from "@/lib/models/EmergencyAlert"
// // import Hospital from "@/lib/models/Hospital"
// // import { calculateDistance } from "@/lib/utils"

// // export async function POST(request: NextRequest) {
// //   try {
// //     const token = request.cookies.get("auth-token")?.value
// //     if (!token) {
// //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
// //     const { alertId } = await request.json()

// //     await dbConnect()

// //     // Populate acceptedBy to get hospital name, phone, and email
// //     const alert = await EmergencyAlert.findOne({
// //       _id: alertId,
// //       userId: decoded.userId,
// //     }).populate("acceptedBy._id", "name phone email") // Populate the _id field within acceptedBy

// //     if (!alert) {
// //       return NextResponse.json({ success: false, message: "Alert not found" }, { status: 404 })
// //     }

// //     // --- Escalation Logic ---
// //     const ESCALATION_INTERVAL_MS = 3 * 60 * 1000 // 3 minutes
// //     const MAX_ESCALATION_HOSPITALS = 5 // Number of additional hospitals to send to per escalation

// //     if (alert.status === "pending" && alert.nextEscalationTime && new Date() > alert.nextEscalationTime) {
// //       console.log(`🚨 Escalating alert ${alertId}. Finding more hospitals...`)

// //       // Get current user's live location from the alert
// //       const userLat = alert.location?.lat
// //       const userLng = alert.location?.lng

// //       if (userLat && userLng) {
// //         // Find all available, emergency-handling hospitals
// //         const allHospitals = await Hospital.find({
// //           isHandleEmergency: true,
// //           isAvailable: true,
// //           "location.lat": { $exists: true },
// //           "location.lng": { $exists: true },
// //         })

// //         const newHospitalsToSend = []
// //         const existingSentHospitalIds = new Set(alert.isSentTo.map((entry) => entry.hospitalId.toString()))

// //         for (const hospital of allHospitals) {
// //           // Only consider hospitals not already sent this alert, or those that timed out/declined
// //           if (!existingSentHospitalIds.has(hospital._id.toString())) {
// //             if (hospital.location?.lat && hospital.location?.lng) {
// //               const distance = calculateDistance(userLat, userLng, hospital.location.lat, hospital.location.lng)
// //               if (distance <= 50) {
// //                 // Re-use MAX_DISTANCE_KM from emergency-alert route
// //                 newHospitalsToSend.push({
// //                   hospitalId: hospital._id,
// //                   status: "pending",
// //                   sentAt: new Date(),
// //                   distance: distance, // Temporarily store distance for sorting
// //                 })
// //               }
// //             }
// //           }
// //         }

// //         // Sort by distance and take a limited number of new hospitals
// //         newHospitalsToSend.sort((a, b) => a.distance - b.distance)
// //         const additionalHospitals = newHospitalsToSend.slice(0, MAX_ESCALATION_HOSPITALS)

// //         if (additionalHospitals.length > 0) {
// //           // Update the existing alert with new hospitals and next escalation time
// //           alert.isSentTo.push(
// //             ...additionalHospitals.map((h) => ({ hospitalId: h.hospitalId, status: h.status, sentAt: h.sentAt })),
// //           )
// //           alert.nextEscalationTime = new Date(Date.now() + ESCALATION_INTERVAL_MS)
// //           await alert.save()
// //           console.log(`✅ Alert ${alertId} escalated. Sent to ${additionalHospitals.length} new hospitals.`)
// //         } else {
// //           console.log(`ℹ️ No more new hospitals found for escalation for alert ${alertId}.`)
// //           // Optionally, clear nextEscalationTime if no more hospitals can be found
// //           alert.nextEscalationTime = undefined
// //           await alert.save()
// //         }
// //       } else {
// //         console.log(`⚠️ Cannot escalate alert ${alertId}: User location not available.`)
// //         // Optionally, clear nextEscalationTime if location is missing
// //         alert.nextEscalationTime = undefined
// //         await alert.save()
// //       }
// //     }
// //     // --- End Escalation Logic ---

// //     console.log("🔍 Checking alert status:", {
// //       alertId: alert._id,
// //       status: alert.status,
// //       acceptedBy: alert.acceptedBy?.name || null,
// //       acceptedByPhone: alert.acceptedBy?.phone || null,
// //       acceptedByEmail: alert.acceptedBy?.email || null,
// //       nextEscalation: alert.nextEscalationTime, // Include for debugging
// //     })

// //     return NextResponse.json({
// //       success: true,
// //       alert: {
// //         _id: alert._id,
// //         status: alert.status,
// //         acceptedBy: alert.acceptedBy, // This will now contain name, phone, email
// //         createdAt: alert.createdAt,
// //         respondedAt: alert.respondedAt,
// //       },
// //     })
// //   } catch (error) {
// //     console.error("Error checking alert status:", error)
// //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// //   }
// // }




// //C:\Users\UDAYN\Downloads\healthcare-platform - Copy\app\api\user\check-alert-status\route.ts
// import { type NextRequest, NextResponse } from "next/server"
// import jwt from "jsonwebtoken"
// import dbConnect from "@/lib/mongodb"
// import EmergencyAlert from "@/lib/models/EmergencyAlert"
// import Hospital from "@/lib/models/Hospital"
// import { calculateDistance } from "@/lib/utils"

// export async function POST(request: NextRequest) {
//   try {
//     const token = request.cookies.get("auth-token")?.value
//     if (!token) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
//     const { alertId } = await request.json()

//     await dbConnect()

//     // Populate acceptedBy to get hospital name, phone, and email
//     const alert = await EmergencyAlert.findOne({
//       _id: alertId,
//       userId: decoded.userId,
//     }).populate("acceptedBy", "name phone email") // Populate the acceptedBy field directly

//     if (!alert) {
//       return NextResponse.json({ success: false, message: "Alert not found" }, { status: 404 })
//     }

//     // --- Escalation Logic ---
//     const ESCALATION_INTERVAL_MS = 3 * 60 * 1000 // 3 minutes
//     const MAX_ADDITIONAL_HOSPITALS_PER_ESCALATION = 5 // Number of additional hospitals to send to per escalation
//     const MAX_DISTANCE_KM = 50 // Max distance for alerts

//     let escalationOccurred = false
//     let noMoreHospitalsFound = false

//     if (alert.status === "pending" && alert.nextEscalationTime && new Date() > alert.nextEscalationTime) {
//       console.log(`🚨 Escalating alert ${alertId}. Finding more hospitals...`)

//       const userLat = alert.location?.lat
//       const userLng = alert.location?.lng

//       if (userLat && userLng) {
//         // Get IDs of hospitals already sent this alert
//         const existingSentHospitalIds = new Set(alert.isSentTo.map((entry) => entry.hospitalId.toString()))

//         // Find all available, emergency-handling hospitals not yet sent this alert
//         const potentialNewHospitals = await Hospital.find({
//           _id: { $nin: Array.from(existingSentHospitalIds) }, // Exclude already sent hospitals
//           isHandleEmergency: true,
//           isAvailable: true,
//           "location.lat": { $exists: true },
//           "location.lng": { $exists: true },
//         })

//         const hospitalsWithDistance = []
//         for (const hospital of potentialNewHospitals) {
//           if (hospital.location?.lat && hospital.location?.lng) {
//             const distance = calculateDistance(userLat, userLng, hospital.location.lat, hospital.location.lng)
//             if (distance <= MAX_DISTANCE_KM) {
//               hospitalsWithDistance.push({
//                 hospitalId: hospital._id,
//                 status: "pending",
//                 sentAt: new Date(),
//                 distance: distance,
//               })
//             }
//           }
//         }

//         // Sort by distance and take a limited number of new hospitals
//         hospitalsWithDistance.sort((a, b) => a.distance - b.distance)
//         const additionalHospitals = hospitalsWithDistance.slice(0, MAX_ADDITIONAL_HOSPITALS_PER_ESCALATION)

//         if (additionalHospitals.length > 0) {
//           // Add new hospitals to isSentTo array
//           alert.isSentTo.push(
//             ...additionalHospitals.map((h) => ({ hospitalId: h.hospitalId, status: h.status, sentAt: h.sentAt })),
//           )
//           alert.nextEscalationTime = new Date(Date.now() + ESCALATION_INTERVAL_MS)
//           await alert.save()
//           escalationOccurred = true
//           console.log(`✅ Alert ${alertId} escalated. Sent to ${additionalHospitals.length} new hospitals.`)
//         } else {
//           console.log(`ℹ️ No more new hospitals found for escalation for alert ${alertId}.`)
//           noMoreHospitalsFound = true
//           // Optionally, clear nextEscalationTime if no more hospitals can be found
//           alert.nextEscalationTime = undefined
//           await alert.save()
//         }
//       } else {
//         console.log(`⚠️ Cannot escalate alert ${alertId}: User location not available.`)
//         noMoreHospitalsFound = true
//         alert.nextEscalationTime = undefined
//         await alert.save()
//       }
//     }
//     // --- End Escalation Logic ---

//     console.log("🔍 Checking alert status:", {
//       alertId: alert._id,
//       status: alert.status,
//       acceptedBy: alert.acceptedBy?.name || null,
//       acceptedByPhone: alert.acceptedBy?.phone || null,
//       acceptedByEmail: alert.acceptedBy?.email || null,
//       nextEscalation: alert.nextEscalationTime,
//       escalationOccurred: escalationOccurred,
//       noMoreHospitalsFound: noMoreHospitalsFound,
//     })

//     return NextResponse.json({
//       success: true,
//       alert: {
//         _id: alert._id,
//         status: alert.status,
//         acceptedBy: alert.acceptedBy,
//         createdAt: alert.createdAt,
//         respondedAt: alert.respondedAt,
//       },
//       escalationOccurred: escalationOccurred,
//       noMoreHospitalsFound: noMoreHospitalsFound,
//     })
//   } catch (error) {
//     console.error("Error checking alert status:", error)
//     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
//   }
// }

















import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import EmergencyAlert from "@/lib/models/EmergencyAlert"
import Hospital from "@/lib/models/Hospital"
import { calculateDistance } from "@/lib/utils"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const { alertId } = await request.json()

    await dbConnect()

    // Populate acceptedBy to get hospital name, phone, and email
    const alert = await EmergencyAlert.findOne({
      _id: alertId,
      userId: decoded.userId,
    }).populate("acceptedBy", "name phone email") // Populate the acceptedBy field directly

    if (!alert) {
      return NextResponse.json({ success: false, message: "Alert not found" }, { status: 404 })
    }

    // --- Escalation Logic ---
    const ESCALATION_INTERVAL_MS = 3 * 60 * 1000 // 3 minutes
    const MAX_ADDITIONAL_HOSPITALS_PER_ESCALATION = 5 // Number of additional hospitals to send to per escalation
    const MAX_DISTANCE_KM = 100 // Max distance for alerts (increased from 50 to 100 for consistency with initial search)

    let escalationOccurred = false
    let noMoreHospitalsFound = false

    if (alert.status === "pending" && alert.nextEscalationTime && new Date() > alert.nextEscalationTime) {
      console.log(`🚨 Escalating alert ${alertId}. Finding more hospitals...`)
      const userLat = alert.location?.lat
      const userLng = alert.location?.lng

      if (userLat && userLng) {
        // Get IDs of hospitals already sent this alert
        const existingSentHospitalIds = new Set(alert.isSentTo.map((entry) => entry.hospitalId.toString()))

        // Find all available, emergency-handling hospitals not yet sent this alert
        const potentialNewHospitals = await Hospital.find({
          _id: { $nin: Array.from(existingSentHospitalIds) }, // Exclude already sent hospitals
          isHandleEmergency: true,
          isAvailable: true,
          "location.lat": { $exists: true },
          "location.lng": { $exists: true },
        })

        const hospitalsWithDistance = []
        for (const hospital of potentialNewHospitals) {
          if (hospital.location?.lat && hospital.location?.lng) {
            const distance = calculateDistance(userLat, userLng, hospital.location.lat, hospital.location.lng)
            if (distance <= MAX_DISTANCE_KM) {
              hospitalsWithDistance.push({
                hospitalId: hospital._id,
                status: "pending",
                sentAt: new Date(),
                distance: distance,
              })
            }
          }
        }

        // Sort by distance and take a limited number of new hospitals
        hospitalsWithDistance.sort((a, b) => a.distance - b.distance)
        const additionalHospitals = hospitalsWithDistance.slice(0, MAX_ADDITIONAL_HOSPITALS_PER_ESCALATION)

        if (additionalHospitals.length > 0) {
          // Add new hospitals to isSentTo array
          alert.isSentTo.push(
            ...additionalHospitals.map((h) => ({
              hospitalId: h.hospitalId,
              status: h.status,
              sentAt: h.sentAt,
              distance: h.distance,
            })),
          )
          // Add to contactedHospitalIds as well
          alert.contactedHospitalIds.push(...additionalHospitals.map((h) => h.hospitalId))

          alert.nextEscalationTime = new Date(Date.now() + ESCALATION_INTERVAL_MS)
          await alert.save()
          escalationOccurred = true
          console.log(`✅ Alert ${alertId} escalated. Sent to ${additionalHospitals.length} new hospitals.`)
        } else {
          console.log(`ℹ️ No more new hospitals found for escalation for alert ${alertId}.`)
          noMoreHospitalsFound = true
          // Set status to no_response_all_contacted if no more hospitals can be found
          alert.status = "no_response_all_contacted"
          alert.nextEscalationTime = undefined
          await alert.save()
        }
      } else {
        console.log(`⚠️ Cannot escalate alert ${alertId}: User location not available.`)
        noMoreHospitalsFound = true
        alert.status = "no_response_all_contacted" // Set status if location is missing for escalation
        alert.nextEscalationTime = undefined
        await alert.save()
      }
    }

    // If alert is accepted, find the distance from the isSentTo array
    let acceptedByDistance: number | undefined = undefined
    if (alert.status === "accepted" && alert.acceptedBy) {
      const acceptedHospitalId = alert.acceptedBy._id.toString()
      const sentToEntry = alert.isSentTo.find((entry) => entry.hospitalId.toString() === acceptedHospitalId)
      if (sentToEntry && typeof sentToEntry.distance === "number") {
        acceptedByDistance = sentToEntry.distance
      }
    }

    console.log("🔍 Checking alert status:", {
      alertId: alert._id,
      status: alert.status,
      acceptedBy: alert.acceptedBy?.name || null,
      acceptedByPhone: alert.acceptedBy?.phone || null,
      acceptedByEmail: alert.acceptedBy?.email || null,
      acceptedByDistance: acceptedByDistance, // Log the distance
      nextEscalation: alert.nextEscalationTime,
      escalationOccurred: escalationOccurred,
      noMoreHospitalsFound: noMoreHospitalsFound,
    })

    return NextResponse.json({
      success: true,
      alert: {
        _id: alert._id,
        status: alert.status,
        acceptedBy: alert.acceptedBy
          ? {
              _id: alert.acceptedBy._id,
              name: alert.acceptedBy.name,
              phone: alert.acceptedBy.phone,
              distance: acceptedByDistance, // Include distance in the response
            }
          : null,
        createdAt: alert.createdAt,
        respondedAt: alert.respondedAt,
      },
      escalationOccurred: escalationOccurred,
      noMoreHospitalsFound: noMoreHospitalsFound,
    })
  } catch (error) {
    console.error("Error checking alert status:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}

