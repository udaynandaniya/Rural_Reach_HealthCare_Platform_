// // // // // import { type NextRequest, NextResponse } from "next/server"
// // // // // import jwt from "jsonwebtoken"
// // // // // import dbConnect from "@/lib/mongodb"
// // // // // import EmergencyAlert from "@/lib/models/EmergencyAlert"
// // // // // import Hospital from "@/lib/models/Hospital"

// // // // // export async function POST(request: NextRequest) {
// // // // //   try {
// // // // //     const token = request.cookies.get("auth-token")?.value
// // // // //     if (!token) {
// // // // //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // // // //     }

// // // // //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
// // // // //     const { alertId, action } = await request.json() // action: 'accept' or 'deny'

// // // // //     console.log("🏥 Hospital responding to alert:", { alertId, action, hospitalId: decoded.userId })

// // // // //     if (!alertId || !action || !["accept", "deny"].includes(action)) {
// // // // //       return NextResponse.json({ success: false, message: "Invalid request data" }, { status: 400 })
// // // // //     }

// // // // //     await dbConnect()

// // // // //     // Get hospital details
// // // // //     const hospital = await Hospital.findById(decoded.userId)
// // // // //     if (!hospital) {
// // // // //       return NextResponse.json({ success: false, message: "Hospital not found" }, { status: 404 })
// // // // //     }

// // // // //     // Find the emergency alert
// // // // //     const alert = await EmergencyAlert.findById(alertId).populate("userId", "name email phone")

// // // // //     if (!alert) {
// // // // //       return NextResponse.json({ success: false, message: "Emergency alert not found" }, { status: 404 })
// // // // //     }

// // // // //     if (alert.status !== "pending") {
// // // // //       return NextResponse.json({ success: false, message: "Alert is no longer pending" }, { status: 400 })
// // // // //     }

// // // // //     if (action === "accept") {
// // // // //       // Hospital accepts the emergency
// // // // //       const updatedAlert = await EmergencyAlert.findByIdAndUpdate(
// // // // //         alertId,
// // // // //         {
// // // // //           status: "accepted",
// // // // //           acceptedBy: decoded.userId,
// // // // //           respondedAt: new Date(),
// // // // //           isRead: true,
// // // // //         },
// // // // //         { new: true },
// // // // //       ).populate("acceptedBy", "name email phone")

// // // // //       console.log("✅ Emergency alert accepted by hospital:", {
// // // // //         alertId: updatedAlert._id,
// // // // //         hospitalName: hospital.name,
// // // // //         patientName: alert.userInfo?.name || alert.userId?.name,
// // // // //       })

// // // // //       return NextResponse.json({
// // // // //         success: true,
// // // // //         message: "Emergency alert accepted successfully",
// // // // //         alert: updatedAlert,
// // // // //         action: "accepted",
// // // // //       })
// // // // //     } else if (action === "deny") {
// // // // //       // Hospital denies the emergency - just mark as read for this hospital
// // // // //       // Don't change the status, let other hospitals see it
// // // // //       await EmergencyAlert.findByIdAndUpdate(alertId, {
// // // // //         $addToSet: { deniedBy: decoded.userId }, // Add hospital to denied list
// // // // //       })

// // // // //       console.log("❌ Emergency alert denied by hospital:", {
// // // // //         alertId,
// // // // //         hospitalName: hospital.name,
// // // // //         patientName: alert.userInfo?.name || alert.userId?.name,
// // // // //       })

// // // // //       return NextResponse.json({
// // // // //         success: true,
// // // // //         message: "Emergency alert denied",
// // // // //         action: "denied",
// // // // //       })
// // // // //     }
// // // // //   } catch (error) {
// // // // //     console.error("💥 Error responding to emergency alert:", error)
// // // // //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// // // // //   }
// // // // // }



// // // // // app/api/hospital/emergency-alerts/respond/route.ts
// // // // import { type NextRequest, NextResponse } from "next/server"
// // // // // import { connectDB } from "@/utils/db"

// // // // // import Hospital from "@/models/hospital"
// // // // // import EmergencyAlert from "@/models/emergencyAlert"
// // // // import dbConnect from "@/lib/mongodb"
// // // // import Hospital from "@/lib/models/Hospital"
// // // // import EmergencyAlert from "@/lib/models/EmergencyAlert"

// // // // export async function POST(req: NextRequest) {
// // // //   try {
// // // //     await dbConnect()

// // // //     const { alertId, hospitalId, action } = await req.json()

// // // //     if (!alertId || !hospitalId || !action) {
// // // //       return NextResponse.json({ message: "Missing required parameters" }, { status: 400 })
// // // //     }

// // // //     const hospital = await Hospital.findById(hospitalId)

// // // //     if (!hospital) {
// // // //       return NextResponse.json({ message: "Hospital not found" }, { status: 404 })
// // // //     }

// // // //     if (action !== "accept" && action !== "deny") {
// // // //       return NextResponse.json({ message: "Invalid action. Must be 'accept' or 'deny'" }, { status: 400 })
// // // //     }

// // // //     if (action === "accept") {
// // // //       // Accept the alert and set isRead = true
// // // //       await EmergencyAlert.findByIdAndUpdate(alertId, {
// // // //         status: "accepted",
// // // //         acceptedBy: {
// // // //           _id: hospital._id,
// // // //           name: hospital.name,
// // // //           phone: hospital.phone,
// // // //         },
// // // //         isRead: true, // Set to true when accepted
// // // //         updatedAt: new Date(),
// // // //       })
// // // //     } else if (action === "deny") {
// // // //       // Decline the alert but keep isRead = false
// // // //       await EmergencyAlert.findByIdAndUpdate(alertId, {
// // // //         status: "declined",
// // // //         isRead: false, // Keep as false when declined
// // // //         updatedAt: new Date(),
// // // //       })
// // // //     }

// // // //     return NextResponse.json({ message: `Alert ${action}ed successfully` }, { status: 200 })
// // // //   } catch (error: any) {
// // // //     console.error("Error responding to emergency alert:", error)
// // // //     return NextResponse.json({ message: "Failed to respond to emergency alert", error: error.message }, { status: 500 })
// // // //   }
// // // // }







// // // import { type NextRequest, NextResponse } from "next/server"
// // // import jwt from "jsonwebtoken"
// // // import dbConnect from "@/lib/mongodb"
// // // import EmergencyAlert from "@/lib/models/EmergencyAlert"
// // // import Hospital from "@/lib/models/Hospital"

// // // // Helper function to calculate distance between two coordinates
// // // function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
// // //   const R = 6371 // Radius of the Earth in kilometers
// // //   const dLat = (lat2 - lat1) * (Math.PI / 180)
// // //   const dLng = (lng2 - lng1) * (Math.PI / 180)
// // //   const a =
// // //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// // //     Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
// // //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
// // //   const distance = R * c // Distance in kilometers
// // //   return distance
// // // }

// // // // Helper function to check if locations are nearby based on address
// // // function isNearbyByAddress(
// // //   hospitalAddress: any,
// // //   alertAddress: any,
// // // ): { isNearby: boolean; distance: number; reason: string } {
// // //   console.log("🔍 Checking address-based proximity:")
// // //   console.log("🏥 Hospital Address:", {
// // //     area: hospitalAddress?.area,
// // //     townOrVillage: hospitalAddress?.townOrVillage,
// // //     taluka: hospitalAddress?.taluka,
// // //     district: hospitalAddress?.district,
// // //     pincode: hospitalAddress?.pincode,
// // //   })
// // //   console.log("🚨 Alert Address:", {
// // //     area: alertAddress?.area,
// // //     townOrVillage: alertAddress?.townOrVillage,
// // //     taluka: alertAddress?.taluka,
// // //     district: alertAddress?.district,
// // //     pincode: alertAddress?.pincode,
// // //   })
// // //   // Same pincode = very close (within 5km)
// // //   if (hospitalAddress?.pincode && alertAddress?.pincode && hospitalAddress.pincode === alertAddress.pincode) {
// // //     console.log("✅ Same pincode found - Very close proximity")
// // //     return { isNearby: true, distance: 5, reason: "Same pincode" }
// // //   }
// // //   // Same taluka = nearby (within 15km)
// // //   if (
// // //     hospitalAddress?.taluka &&
// // //     alertAddress?.taluka &&
// // //     hospitalAddress.taluka.toLowerCase() === alertAddress.taluka.toLowerCase()
// // //   ) {
// // //     console.log("✅ Same taluka found - Close proximity")
// // //     return { isNearby: true, distance: 15, reason: "Same taluka" }
// // //   }
// // //   // Same district = moderate distance (within 30km)
// // //   if (
// // //     hospitalAddress?.district &&
// // //     alertAddress?.district &&
// // //     hospitalAddress.district.toLowerCase() === alertAddress.district.toLowerCase()
// // //   ) {
// // //     console.log("✅ Same district found - Moderate proximity")
// // //     return { isNearby: true, distance: 30, reason: "Same district" }
// // //   }
// // //   // Same area name = very close (within 3km)
// // //   if (
// // //     hospitalAddress?.area &&
// // //     alertAddress?.area &&
// // //     hospitalAddress.area.toLowerCase() === alertAddress.area.toLowerCase()
// // //   ) {
// // //     console.log("✅ Same area found - Very close proximity")
// // //     return { isNearby: true, distance: 3, reason: "Same area" }
// // //   }
// // //   // Same town/village = close (within 10km)
// // //   if (
// // //     hospitalAddress?.townOrVillage &&
// // //     alertAddress?.townOrVillage &&
// // //     hospitalAddress.townOrVillage.toLowerCase() === alertAddress.townOrVillage.toLowerCase()
// // //   ) {
// // //     console.log("✅ Same town/village found - Close proximity")
// // //     return { isNearby: true, distance: 10, reason: "Same town/village" }
// // //   }
// // //   console.log("❌ No address match found - Too far")
// // //   return { isNearby: false, distance: 999, reason: "No address match" }
// // // }

// // // export async function GET(request: NextRequest) {
// // //   try {
// // //     const token = request.cookies.get("auth-token")?.value
// // //     if (!token) {
// // //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // //     }

// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
// // //     await dbConnect()

// // //     console.log("🏥 Hospital checking for emergency alerts:", decoded.userId)

// // //     // Get hospital details
// // //     const hospital = await Hospital.findById(decoded.userId)
// // //     if (!hospital) {
// // //       return NextResponse.json({ success: false, message: "Hospital not found" }, { status: 404 })
// // //     }

// // //     console.log("🏥 Hospital found:", {
// // //       name: hospital.name,
// // //       isAvailable: hospital.isAvailable,
// // //       isHandleEmergency: hospital.isHandleEmergency,
// // //       hospitalLocation: hospital.location, // Use live location
// // //     })

// // //     // Check if hospital is available and handles emergencies
// // //     if (!hospital.isAvailable || !hospital.isHandleEmergency) {
// // //       console.log("❌ Hospital not available or doesn't handle emergencies")
// // //       return NextResponse.json({
// // //         success: true,
// // //         alerts: [],
// // //         message: "Hospital not available for emergency services",
// // //       })
// // //     }

// // //     // Find pending emergency alerts that were sent to this hospital
// // //     const pendingAlerts = await EmergencyAlert.find({
// // //       status: "pending", // Global status must be pending
// // //       "isSentTo.hospitalId": hospital._id, // Alert was sent to this hospital
// // //       "isSentTo.status": "pending", // This hospital's specific status is pending
// // //       acceptedBy: { $exists: false }, // Not yet accepted by any hospital
// // //     })
// // //       .populate("userId", "name email phone address")
// // //       .sort({ createdAt: -1 })
// // //       .limit(10)

// // //     console.log(`🔍 Found ${pendingAlerts.length} potential alerts for this hospital`)

// // //     const nearbyAlerts = []
// // //     const MAX_DISTANCE_KM = 50
// // //     const ALERT_TIMEOUT_MINUTES = 3 // Situation 1: 3 minutes timeout

// // //     for (const alert of pendingAlerts) {
// // //       const hospitalSentToEntry = alert.isSentTo.find((entry) => entry.hospitalId.equals(hospital._id))

// // //       if (!hospitalSentToEntry) {
// // //         // This should ideally not happen due to the query, but as a safeguard
// // //         continue
// // //       }

// // //       // Situation 1: Check for timeout
// // //       const timeElapsed = (new Date().getTime() - hospitalSentToEntry.sentAt.getTime()) / (1000 * 60)
// // //       if (timeElapsed > ALERT_TIMEOUT_MINUTES) {
// // //         console.log(`⏰ Alert ${alert._id} timed out for hospital ${hospital.name}. Marking as timedOut.`)
// // //         // Update the specific hospital's status in isSentTo to 'timedOut'
// // //         await EmergencyAlert.updateOne(
// // //           { _id: alert._id, "isSentTo.hospitalId": hospital._id },
// // //           { $set: { "isSentTo.$.status": "timedOut" } },
// // //         )
// // //         continue // Skip this alert for this hospital
// // //       }

// // //       console.log(`\n📋 Processing alert ${alert._id}:`)
// // //       console.log("Alert data:", {
// // //         userInfo: alert.userInfo,
// // //         location: alert.location,
// // //         message: alert.message,
// // //         priority: alert.priority,
// // //       })

// // //       let alertLat, alertLng, hospitalLat, hospitalLng
// // //       let distance = 999 // Default high distance
// // //       let proximityMethod = "unknown"
// // //       let shouldRing = false // Flag for audio alert

// // //       // Get alert location coordinates (prioritize live location from user)
// // //       if (alert.location?.lat && alert.location?.lng) {
// // //         alertLat = alert.location.lat
// // //         alertLng = alert.location.lng
// // //         console.log(`📍 Alert GPS: ${alertLat}, ${alertLng}`)
// // //       } else if (alert.location?.address?.geoLocation?.lat && alert.location?.address?.geoLocation?.lng) {
// // //         alertLat = alert.location.address.geoLocation.lat
// // //         alertLng = alert.location.address.geoLocation.lng
// // //         console.log(`📍 Alert GPS (from user's registered address): ${alertLat}, ${alertLng}`)
// // //       } else {
// // //         console.log("⚠️ Alert has no valid GPS coordinates")
// // //       }

// // //       // Get hospital location coordinates (prioritize live location from hospital)
// // //       if (hospital.location?.lat && hospital.location?.lng) {
// // //         hospitalLat = hospital.location.lat
// // //         hospitalLng = hospital.location.lng
// // //         console.log(`🏥 Hospital GPS: ${hospitalLat}, ${hospitalLng}`)
// // //       } else if (hospital.address?.geoLocation?.lat && hospital.address?.geoLocation?.lng) {
// // //         hospitalLat = hospital.address.geoLocation.lat
// // //         hospitalLng = hospital.address.geoLocation.lng
// // //         console.log(`🏥 Hospital GPS (from registered address): ${hospitalLat}, ${hospitalLng}`)
// // //       } else {
// // //         console.log("⚠️ Hospital has no valid GPS coordinates")
// // //       }

// // //       // If both have GPS coordinates, calculate exact distance
// // //       if (alertLat && alertLng && hospitalLat && hospitalLng) {
// // //         distance = calculateDistance(alertLat, alertLng, hospitalLat, hospitalLng)
// // //         proximityMethod = "GPS calculation"
// // //         console.log(`📏 GPS Distance calculated: ${distance.toFixed(2)}km`)
// // //       } else {
// // //         // Fallback to address-based proximity if GPS is not fully available
// // //         console.log("🏠 Falling back to address-based proximity...")
// // //         const addressProximity = isNearbyByAddress(hospital.address, alert.location?.address)
// // //         distance = addressProximity.distance
// // //         proximityMethod = `Address matching (${addressProximity.reason})`
// // //         if (addressProximity.isNearby) {
// // //           console.log(`✅ Address-based proximity: ${distance}km (${addressProximity.reason})`)
// // //         } else {
// // //           console.log(`❌ Not nearby by address matching`)
// // //         }
// // //       }

// // //       console.log(`📊 Final distance: ${distance}km using ${proximityMethod}`)

// // //       // Check if within acceptable range
// // //       if (distance <= MAX_DISTANCE_KM) {
// // //         console.log(`✅ Alert ${alert._id} is within ${MAX_DISTANCE_KM}km range - ADDING TO LIST`)

// // //         // Determine if sound should ring (only if it's a new pending alert for this hospital)
// // //         if (hospitalSentToEntry.status === "pending") {
// // //           shouldRing = true
// // //           // Atomically update the status to 'read' for this hospital
// // //           await EmergencyAlert.updateOne(
// // //             { _id: alert._id, "isSentTo.hospitalId": hospital._id },
// // //             { $set: { "isSentTo.$.status": "read" } },
// // //           )
// // //           console.log(`🔔 Alert ${alert._id} marked as 'read' for hospital ${hospital.name} and will ring.`)
// // //         }

// // //         nearbyAlerts.push({
// // //           ...alert.toObject(),
// // //           distance: Math.round(distance * 100) / 100, // Round to 2 decimal places
// // //           proximityMethod: proximityMethod,
// // //           shouldRing: shouldRing, // Add flag for client to play sound
// // //         })
// // //       } else {
// // //         console.log(`❌ Alert ${alert._id} is ${distance}km away - TOO FAR (max: ${MAX_DISTANCE_KM}km)`)
// // //         // If it's too far, and was pending for this hospital, mark it as declined/timedOut for them
// // //         if (hospitalSentToEntry.status === "pending") {
// // //           await EmergencyAlert.updateOne(
// // //             { _id: alert._id, "isSentTo.hospitalId": hospital._id },
// // //             { $set: { "isSentTo.$.status": "timedOut" } }, // Or 'declined' if you want to be explicit
// // //           )
// // //           console.log(`❌ Alert ${alert._id} marked as 'timedOut' for hospital ${hospital.name} due to distance.`)
// // //         }
// // //       }
// // //     }

// // //     console.log(`\n🎯 FINAL RESULT: Found ${nearbyAlerts.length} nearby alerts within ${MAX_DISTANCE_KM}km`)
// // //     if (nearbyAlerts.length > 0) {
// // //       console.log("📋 Nearby alerts summary:")
// // //       nearbyAlerts.forEach((alert, index) => {
// // //         console.log(
// // //           `${index + 1}. Alert ${alert._id}: ${alert.distance}km away (${alert.proximityMethod}) - Ring: ${alert.shouldRing}`,
// // //         )
// // //       })
// // //     }

// // //     return NextResponse.json({
// // //       success: true,
// // //       alerts: nearbyAlerts,
// // //       hospitalInfo: {
// // //         name: hospital.name,
// // //         maxDistance: MAX_DISTANCE_KM,
// // //         location: hospital.location, // Use live location
// // //       },
// // //     })
// // //   } catch (error) {
// // //     console.error("💥 Error fetching emergency alerts for hospital:", error)
// // //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// // //   }
// // // }




// // //// app/api/hospital/emergency-alerts/respond/route.ts

// // import { type NextRequest, NextResponse } from "next/server"
// // import dbConnect from "@/lib/mongodb"
// // import EmergencyAlert from "@/lib/models/EmergencyAlert"
// // import Hospital from "@/lib/models/Hospital"
// // import { verifyToken } from "@/lib/auth"

// // export async function POST(request: NextRequest) {
// //   await dbConnect()

// //   try {
// //     const token = request.cookies.get("auth-token")?.value
// //     if (!token) {
// //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// //     }

// //     const decoded = verifyToken(token)
// //     if (!decoded || decoded.role !== "hospital") {
// //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// //     }

// //     const { alertId, action } = await request.json()

// //     if (!alertId || !action || !["accept", "deny"].includes(action)) {
// //       return NextResponse.json({ success: false, message: "Invalid request parameters" }, { status: 400 })
// //     }

// //     const hospital = await Hospital.findById(decoded.userId)
// //     if (!hospital) {
// //       return NextResponse.json({ success: false, message: "Hospital not found" }, { status: 404 })
// //     }

// //     const alert = await EmergencyAlert.findById(alertId)

// //     if (!alert) {
// //       return NextResponse.json({ success: false, message: "Emergency alert not found" }, { status: 404 })
// //     }

// //     // Check if the alert is already accepted by another hospital or timed out
// //     if (alert.status === "accepted" && alert.acceptedBy && alert.acceptedBy.toString() !== hospital._id.toString()) {
// //       return NextResponse.json(
// //         { success: false, message: "This alert has already been accepted by another hospital." },
// //         { status: 409 },
// //       )
// //     }
// //     if (alert.status === "timedOut") {
// //       return NextResponse.json({ success: false, message: "This alert has timed out." }, { status: 409 })
// //     }

// //     // Update the alert status based on the action
// //     if (action === "accept") {
// //       alert.status = "accepted"
// //       alert.acceptedBy = hospital._id
// //       // Mark the specific hospital's alert status as accepted
// //       const hospitalAlertIndex = alert.hospitalsNotified.findIndex(
// //         (h: any) => h.hospitalId.toString() === hospital._id.toString(),
// //       )
// //       if (hospitalAlertIndex !== -1) {
// //         alert.hospitalsNotified[hospitalAlertIndex].status = "accepted"
// //       }
// //     } else if (action === "deny") {
// //       // If denied, only update this hospital's specific status, not the overall alert status
// //       const hospitalAlertIndex = alert.hospitalsNotified.findIndex(
// //         (h: any) => h.hospitalId.toString() === hospital._id.toString(),
// //       )
// //       if (hospitalAlertIndex !== -1) {
// //         alert.hospitalsNotified[hospitalAlertIndex].status = "declined"
// //       }
// //       // If all relevant hospitals have declined, or if this is the last one,
// //       // you might want to update the overall alert status to 'noResponse' or similar.
// //       // For now, we'll just update the specific hospital's status.
// //     }

// //     await alert.save()

// //     return NextResponse.json({ success: true, message: `Alert ${action}ed successfully`, data: alert })
// //   } catch (error: any) {
// //     console.error("Error responding to emergency alert:", error)
// //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// //   }
// // }



// // app/api/hospital/emergency-alerts/respond/route.ts
// import { type NextRequest, NextResponse } from "next/server"
// import dbConnect from "@/lib/mongodb"
// import EmergencyAlert from "@/lib/models/EmergencyAlert"
// import Hospital from "@/lib/models/Hospital"
// import { verifyToken } from "@/lib/auth"

// export async function POST(request: NextRequest) {
//   await dbConnect()

//   try {
//     const token = request.cookies.get("auth-token")?.value
//     if (!token) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//     }

//     const decoded = verifyToken(token)
//     if (!decoded || decoded.role !== "hospital") {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//     }

//     const { alertId, action } = await request.json()

//     if (!alertId || !action || !["accept", "deny"].includes(action)) {
//       return NextResponse.json({ success: false, message: "Invalid request parameters" }, { status: 400 })
//     }

//     const hospital = await Hospital.findById(decoded.userId)
//     if (!hospital) {
//       return NextResponse.json({ success: false, message: "Hospital not found" }, { status: 404 })
//     }

//     const alert = await EmergencyAlert.findById(alertId)

//     if (!alert) {
//       return NextResponse.json({ success: false, message: "Emergency alert not found" }, { status: 404 })
//     }

//     if (alert.status === "accepted" && alert.acceptedBy && alert.acceptedBy._id.toString() !== hospital._id.toString()) {
//       return NextResponse.json(
//         { success: false, message: "This alert has already been accepted by another hospital." },
//         { status: 409 }
//       )
//     }

//     if (alert.status === "timedOut") {
//       return NextResponse.json({ success: false, message: "This alert has timed out." }, { status: 409 })
//     }

//     const hospitalAlertIndex = alert.isSentTo.findIndex(
//       (h: any) => h.hospitalId.toString() === hospital._id.toString()
//     )

//     if (hospitalAlertIndex === -1) {
//       return NextResponse.json({ success: false, message: "Hospital not in alert's isSentTo list." }, { status: 404 })
//     }

//     if (action === "accept") {
//       alert.status = "accepted"
//       alert.acceptedBy = {
//         _id: hospital._id,
//         name: hospital.name,
//         phone: hospital.phone, // ✅ persist phone to DB
//       }

//       alert.isSentTo[hospitalAlertIndex].status = "accepted"
//     } else if (action === "deny") {
//       alert.isSentTo[hospitalAlertIndex].status = "declined"
//     }

//     await alert.save()

//     return NextResponse.json({
//       success: true,
//       message: `Alert ${action}ed successfully`,
//       data: {
//         alert,
//       },
//     })
//   } catch (error: any) {
//     console.error("Error responding to emergency alert:", error)
//     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
//   }
// }











import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import EmergencyAlert from "@/lib/models/EmergencyAlert"
import Hospital from "@/lib/models/Hospital"
import { verifyToken } from "@/lib/auth"

export async function POST(request: NextRequest) {
  await dbConnect()
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = verifyToken(token)
    if (!decoded || decoded.role !== "hospital") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const { alertId, action } = await request.json()

    if (!alertId || !action || !["accept", "deny"].includes(action)) {
      return NextResponse.json({ success: false, message: "Invalid request parameters" }, { status: 400 })
    }

    const hospital = await Hospital.findById(decoded.userId)
    if (!hospital) {
      return NextResponse.json({ success: false, message: "Hospital not found" }, { status: 404 })
    }

    const alert = await EmergencyAlert.findById(alertId)
    if (!alert) {
      return NextResponse.json({ success: false, message: "Emergency alert not found" }, { status: 404 })
    }

    if (
      alert.status === "accepted" &&
      alert.acceptedBy &&
      alert.acceptedBy._id.toString() !== hospital._id.toString()
    ) {
      return NextResponse.json(
        { success: false, message: "This alert has already been accepted by another hospital." },
        { status: 409 },
      )
    }

    if (alert.status === "timedOut") {
      return NextResponse.json({ success: false, message: "This alert has timed out." }, { status: 409 })
    }

    const hospitalAlertIndex = alert.isSentTo.findIndex((h: any) => h.hospitalId.toString() === hospital._id.toString())

    if (hospitalAlertIndex === -1) {
      return NextResponse.json({ success: false, message: "Hospital not in alert's isSentTo list." }, { status: 404 })
    }

  if (action === "accept") {
  if (alert.status !== "pending") {
    return NextResponse.json({ success: false, message: "Alert is no longer active." }, { status: 409 })
  }

  alert.status = "accepted"
  alert.acceptedBy = {
    _id: hospital._id,
    name: hospital.name,
    phone: hospital.phone,
  }
  alert.respondedAt = new Date()
  alert.isSentTo[hospitalAlertIndex].status = "accepted"
}
else if (action === "deny") {
      alert.isSentTo[hospitalAlertIndex].status = "declined"
      // If a hospital declines, we can remove it from the list of alerts for this hospital
      // This is handled on the client side by filtering the alerts array after a successful deny.
      // No need to change the main alert status unless all hospitals decline.
    }

    await alert.save()

    return NextResponse.json({
      success: true,
      message: `Alert ${action}ed successfully`,
      data: {
        alert,
      },
    })
  } catch (error: any) {
    console.error("Error responding to emergency alert:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
