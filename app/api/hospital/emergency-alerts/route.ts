// // // // // // // // //C:\Users\UDAYN\Downloads\healthcare-platform\app\api\hospital\emergency-alerts\route.ts
// // // // // // // // import { type NextRequest, NextResponse } from "next/server"
// // // // // // // // import jwt from "jsonwebtoken"
// // // // // // // // import dbConnect from "@/lib/mongodb"
// // // // // // // // import EmergencyAlert from "@/lib/models/EmergencyAlert"
// // // // // // // // import Hospital from "@/lib/models/Hospital"

// // // // // // // // // Helper function to calculate distance between two coordinates
// // // // // // // // function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
// // // // // // // //   const R = 6371 // Radius of the Earth in kilometers
// // // // // // // //   const dLat = (lat2 - lat1) * (Math.PI / 180)
// // // // // // // //   const dLng = (lng2 - lng1) * (Math.PI / 180)
// // // // // // // //   const a =
// // // // // // // //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// // // // // // // //     Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
// // // // // // // //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
// // // // // // // //   const distance = R * c // Distance in kilometers
// // // // // // // //   return distance
// // // // // // // // }

// // // // // // // // export async function GET(request: NextRequest) {
// // // // // // // //   try {
// // // // // // // //     const token = request.cookies.get("auth-token")?.value
// // // // // // // //     if (!token) {
// // // // // // // //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // // // // // // //     }

// // // // // // // //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
// // // // // // // //     await dbConnect()

// // // // // // // //     console.log("🏥 Hospital checking for emergency alerts:", decoded.userId)

// // // // // // // //     // Get hospital details
// // // // // // // //     const hospital = await Hospital.findById(decoded.userId)
// // // // // // // //     if (!hospital) {
// // // // // // // //       return NextResponse.json({ success: false, message: "Hospital not found" }, { status: 404 })
// // // // // // // //     }

// // // // // // // //     console.log("🏥 Hospital found:", {
// // // // // // // //       name: hospital.name,
// // // // // // // //       isAvailable: hospital.isAvailable,
// // // // // // // //       isHandleEmergency: hospital.isHandleEmergency,
// // // // // // // //       location: hospital.address,
// // // // // // // //     })

// // // // // // // //     // Check if hospital is available and handles emergencies
// // // // // // // //     if (!hospital.isAvailable || !hospital.isHandleEmergency) {
// // // // // // // //       console.log("❌ Hospital not available or doesn't handle emergencies")
// // // // // // // //       return NextResponse.json({
// // // // // // // //         success: true,
// // // // // // // //         alerts: [],
// // // // // // // //         message: "Hospital not available for emergency services",
// // // // // // // //       })
// // // // // // // //     }

// // // // // // // //     // Find pending emergency alerts that are not read and not accepted by any hospital
// // // // // // // //     const pendingAlerts = await EmergencyAlert.find({
// // // // // // // //       status: "pending",
// // // // // // // //       isRead: false,
// // // // // // // //       acceptedBy: { $exists: false },
// // // // // // // //     })
// // // // // // // //       .populate("userId", "name email phone address")
// // // // // // // //       .sort({ createdAt: -1 })
// // // // // // // //       .limit(10)

// // // // // // // //     console.log(`🔍 Found ${pendingAlerts.length} pending alerts`)

// // // // // // // //     // Filter alerts by distance (within 50km radius)
// // // // // // // //     const nearbyAlerts = []
// // // // // // // //     const MAX_DISTANCE_KM = 50

// // // // // // // //     for (const alert of pendingAlerts) {
// // // // // // // //       let alertLat, alertLng

// // // // // // // //       // Get alert location coordinates
// // // // // // // //       if (alert.location?.lat && alert.location?.lng) {
// // // // // // // //         alertLat = alert.location.lat
// // // // // // // //         alertLng = alert.location.lng
// // // // // // // //       } else if (alert.location?.address?.geoLocation?.lat && alert.location?.address?.geoLocation?.lng) {
// // // // // // // //         alertLat = alert.location.address.geoLocation.lat
// // // // // // // //         alertLng = alert.location.address.geoLocation.lng
// // // // // // // //       } else {
// // // // // // // //         console.log("⚠️ Alert has no location data:", alert._id)
// // // // // // // //         continue
// // // // // // // //       }

// // // // // // // //       // Get hospital location coordinates (assuming hospital has geoLocation in address)
// // // // // // // //       let hospitalLat, hospitalLng
// // // // // // // //       if (hospital.address?.geoLocation?.lat && hospital.address?.geoLocation?.lng) {
// // // // // // // //         hospitalLat = hospital.address.geoLocation.lat
// // // // // // // //         hospitalLng = hospital.address.geoLocation.lng
// // // // // // // //       } else {
// // // // // // // //         console.log("⚠️ Hospital has no location data")
// // // // // // // //         continue
// // // // // // // //       }

// // // // // // // //       // Calculate distance
// // // // // // // //       const distance = calculateDistance(alertLat, alertLng, hospitalLat, hospitalLng)
// // // // // // // //       console.log(`📏 Distance to alert ${alert._id}: ${distance.toFixed(2)}km`)

// // // // // // // //       if (distance <= MAX_DISTANCE_KM) {
// // // // // // // //         nearbyAlerts.push({
// // // // // // // //           ...alert.toObject(),
// // // // // // // //           distance: Math.round(distance * 100) / 100, // Round to 2 decimal places
// // // // // // // //         })
// // // // // // // //       }
// // // // // // // //     }

// // // // // // // //     console.log(`✅ Found ${nearbyAlerts.length} nearby alerts within ${MAX_DISTANCE_KM}km`)

// // // // // // // //     return NextResponse.json({
// // // // // // // //       success: true,
// // // // // // // //       alerts: nearbyAlerts,
// // // // // // // //       hospitalInfo: {
// // // // // // // //         name: hospital.name,
// // // // // // // //         maxDistance: MAX_DISTANCE_KM,
// // // // // // // //       },
// // // // // // // //     })
// // // // // // // //   } catch (error) {
// // // // // // // //     console.error("💥 Error fetching emergency alerts for hospital:", error)
// // // // // // // //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// // // // // // // //   }
// // // // // // // // }







// // // // // // // // app/api/hospital/emergency-alerts/route.ts
// // // // // // // import { type NextRequest, NextResponse } from "next/server"
// // // // // // // import jwt from "jsonwebtoken"
// // // // // // // import dbConnect from "@/lib/mongodb"
// // // // // // // import EmergencyAlert from "@/lib/models/EmergencyAlert"
// // // // // // // import Hospital from "@/lib/models/Hospital"

// // // // // // // // Helper function to calculate distance between two coordinates
// // // // // // // function calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
// // // // // // //   const R = 6371 // Radius of the Earth in kilometers
// // // // // // //   const dLat = (lat2 - lat1) * (Math.PI / 180)
// // // // // // //   const dLng = (lng2 - lng1) * (Math.PI / 180)
// // // // // // //   const a =
// // // // // // //     Math.sin(dLat / 2) * Math.sin(dLat / 2) +
// // // // // // //     Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) * Math.sin(dLng / 2) * Math.sin(dLng / 2)
// // // // // // //   const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
// // // // // // //   const distance = R * c // Distance in kilometers
// // // // // // //   return distance
// // // // // // // }

// // // // // // // // Helper function to check if locations are nearby based on address
// // // // // // // function isNearbyByAddress(
// // // // // // //   hospitalAddress: any,
// // // // // // //   alertAddress: any,
// // // // // // // ): { isNearby: boolean; distance: number; reason: string } {
// // // // // // //   console.log("🔍 Checking address-based proximity:")
// // // // // // //   console.log("🏥 Hospital Address:", {
// // // // // // //     area: hospitalAddress?.area,
// // // // // // //     townOrVillage: hospitalAddress?.townOrVillage,
// // // // // // //     taluka: hospitalAddress?.taluka,
// // // // // // //     district: hospitalAddress?.district,
// // // // // // //     pincode: hospitalAddress?.pincode,
// // // // // // //   })
// // // // // // //   console.log("🚨 Alert Address:", {
// // // // // // //     area: alertAddress?.area,
// // // // // // //     townOrVillage: alertAddress?.townOrVillage,
// // // // // // //     taluka: alertAddress?.taluka,
// // // // // // //     district: alertAddress?.district,
// // // // // // //     pincode: alertAddress?.pincode,
// // // // // // //   })

// // // // // // //   // Same pincode = very close (within 5km)
// // // // // // //   if (hospitalAddress?.pincode && alertAddress?.pincode && hospitalAddress.pincode === alertAddress.pincode) {
// // // // // // //     console.log("✅ Same pincode found - Very close proximity")
// // // // // // //     return { isNearby: true, distance: 5, reason: "Same pincode" }
// // // // // // //   }

// // // // // // //   // Same taluka = nearby (within 15km)
// // // // // // //   if (
// // // // // // //     hospitalAddress?.taluka &&
// // // // // // //     alertAddress?.taluka &&
// // // // // // //     hospitalAddress.taluka.toLowerCase() === alertAddress.taluka.toLowerCase()
// // // // // // //   ) {
// // // // // // //     console.log("✅ Same taluka found - Close proximity")
// // // // // // //     return { isNearby: true, distance: 15, reason: "Same taluka" }
// // // // // // //   }

// // // // // // //   // Same district = moderate distance (within 30km)
// // // // // // //   if (
// // // // // // //     hospitalAddress?.district &&
// // // // // // //     alertAddress?.district &&
// // // // // // //     hospitalAddress.district.toLowerCase() === alertAddress.district.toLowerCase()
// // // // // // //   ) {
// // // // // // //     console.log("✅ Same district found - Moderate proximity")
// // // // // // //     return { isNearby: true, distance: 30, reason: "Same district" }
// // // // // // //   }

// // // // // // //   // Same area name = very close (within 3km)
// // // // // // //   if (
// // // // // // //     hospitalAddress?.area &&
// // // // // // //     alertAddress?.area &&
// // // // // // //     hospitalAddress.area.toLowerCase() === alertAddress.area.toLowerCase()
// // // // // // //   ) {
// // // // // // //     console.log("✅ Same area found - Very close proximity")
// // // // // // //     return { isNearby: true, distance: 3, reason: "Same area" }
// // // // // // //   }

// // // // // // //   // Same town/village = close (within 10km)
// // // // // // //   if (
// // // // // // //     hospitalAddress?.townOrVillage &&
// // // // // // //     alertAddress?.townOrVillage &&
// // // // // // //     hospitalAddress.townOrVillage.toLowerCase() === alertAddress.townOrVillage.toLowerCase()
// // // // // // //   ) {
// // // // // // //     console.log("✅ Same town/village found - Close proximity")
// // // // // // //     return { isNearby: true, distance: 10, reason: "Same town/village" }
// // // // // // //   }

// // // // // // //   console.log("❌ No address match found - Too far")
// // // // // // //   return { isNearby: false, distance: 999, reason: "No address match" }
// // // // // // // }

// // // // // // // export async function GET(request: NextRequest) {
// // // // // // //   try {
// // // // // // //     const token = request.cookies.get("auth-token")?.value
// // // // // // //     if (!token) {
// // // // // // //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // // // // // //     }

// // // // // // //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
// // // // // // //     await dbConnect()

// // // // // // //     console.log("🏥 Hospital checking for emergency alerts:", decoded.userId)

// // // // // // //     // Get hospital details
// // // // // // //     const hospital = await Hospital.findById(decoded.userId)
// // // // // // //     if (!hospital) {
// // // // // // //       return NextResponse.json({ success: false, message: "Hospital not found" }, { status: 404 })
// // // // // // //     }

// // // // // // //     console.log("🏥 Hospital found:", {
// // // // // // //       name: hospital.name,
// // // // // // //       isAvailable: hospital.isAvailable,
// // // // // // //       isHandleEmergency: hospital.isHandleEmergency,
// // // // // // //       address: hospital.address,
// // // // // // //     })

// // // // // // //     // Check if hospital is available and handles emergencies
// // // // // // //     if (!hospital.isAvailable || !hospital.isHandleEmergency) {
// // // // // // //       console.log("❌ Hospital not available or doesn't handle emergencies")
// // // // // // //       return NextResponse.json({
// // // // // // //         success: true,
// // // // // // //         alerts: [],
// // // // // // //         message: "Hospital not available for emergency services",
// // // // // // //       })
// // // // // // //     }

// // // // // // //     // Find pending emergency alerts that are not read and not accepted by any hospital
// // // // // // //     const pendingAlerts = await EmergencyAlert.find({
// // // // // // //       status: "pending",
// // // // // // //       isRead: false,
// // // // // // //       acceptedBy: { $exists: false },
// // // // // // //     })
// // // // // // //       .populate("userId", "name email phone address")
// // // // // // //       .sort({ createdAt: -1 })
// // // // // // //       .limit(10)

// // // // // // //     console.log(`🔍 Found ${pendingAlerts.length} pending alerts`)

// // // // // // //     // Filter alerts by distance (within 50km radius)
// // // // // // //     const nearbyAlerts = []
// // // // // // //     const MAX_DISTANCE_KM = 50

// // // // // // //     for (const alert of pendingAlerts) {
// // // // // // //       console.log(`\n📋 Processing alert ${alert._id}:`)
// // // // // // //       console.log("Alert data:", {
// // // // // // //         userInfo: alert.userInfo,
// // // // // // //         location: alert.location,
// // // // // // //         message: alert.message,
// // // // // // //         priority: alert.priority,
// // // // // // //       })

// // // // // // //       let alertLat, alertLng, hospitalLat, hospitalLng
// // // // // // //       let distance = 999 // Default high distance
// // // // // // //       let proximityMethod = "unknown"

// // // // // // //       // Method 1: Try GPS coordinates first
// // // // // // //       console.log("🛰️ Checking GPS coordinates...")

// // // // // // //       // Get alert location coordinates
// // // // // // //       if (alert.location?.lat && alert.location?.lng) {
// // // // // // //         alertLat = alert.location.lat
// // // // // // //         alertLng = alert.location.lng
// // // // // // //         console.log(`📍 Alert GPS: ${alertLat}, ${alertLng}`)
// // // // // // //       } else if (alert.location?.address?.geoLocation?.lat && alert.location?.address?.geoLocation?.lng) {
// // // // // // //         alertLat = alert.location.address.geoLocation.lat
// // // // // // //         alertLng = alert.location.address.geoLocation.lng
// // // // // // //         console.log(`📍 Alert GPS (from address): ${alertLat}, ${alertLng}`)
// // // // // // //       } else {
// // // // // // //         console.log("⚠️ Alert has no GPS coordinates")
// // // // // // //       }

// // // // // // //       // Get hospital location coordinates
// // // // // // //       if (hospital.address?.geoLocation?.lat && hospital.address?.geoLocation?.lng) {
// // // // // // //         hospitalLat = hospital.address.geoLocation.lat
// // // // // // //         hospitalLng = hospital.address.geoLocation.lng
// // // // // // //         console.log(`�� Hospital GPS: ${hospitalLat}, ${hospitalLng}`)
// // // // // // //       } else {
// // // // // // //         console.log("⚠️ Hospital has no GPS coordinates")
// // // // // // //       }

// // // // // // //       // If both have GPS coordinates, calculate exact distance
// // // // // // //       if (alertLat && alertLng && hospitalLat && hospitalLng) {
// // // // // // //         distance = calculateDistance(alertLat, alertLng, hospitalLat, hospitalLng)
// // // // // // //         proximityMethod = "GPS calculation"
// // // // // // //         console.log(`📏 GPS Distance calculated: ${distance.toFixed(2)}km`)
// // // // // // //       } else {
// // // // // // //         // Method 2: Fallback to address-based proximity
// // // // // // //         console.log("🏠 Falling back to address-based proximity...")
// // // // // // //         const addressProximity = isNearbyByAddress(hospital.address, alert.location?.address)
// // // // // // //         distance = addressProximity.distance
// // // // // // //         proximityMethod = `Address matching (${addressProximity.reason})`

// // // // // // //         if (addressProximity.isNearby) {
// // // // // // //           console.log(`✅ Address-based proximity: ${distance}km (${addressProximity.reason})`)
// // // // // // //         } else {
// // // // // // //           console.log(`❌ Not nearby by address matching`)
// // // // // // //         }
// // // // // // //       }

// // // // // // //       console.log(`📊 Final distance: ${distance}km using ${proximityMethod}`)

// // // // // // //       // Check if within acceptable range
// // // // // // //       if (distance <= MAX_DISTANCE_KM) {
// // // // // // //         console.log(`✅ Alert ${alert._id} is within ${MAX_DISTANCE_KM}km range - ADDING TO LIST`)
// // // // // // //         nearbyAlerts.push({
// // // // // // //           ...alert.toObject(),
// // // // // // //           distance: Math.round(distance * 100) / 100, // Round to 2 decimal places
// // // // // // //           proximityMethod: proximityMethod,
// // // // // // //         })
// // // // // // //       } else {
// // // // // // //         console.log(`❌ Alert ${alert._id} is ${distance}km away - TOO FAR (max: ${MAX_DISTANCE_KM}km)`)
// // // // // // //       }
// // // // // // //     }

// // // // // // //     console.log(`\n🎯 FINAL RESULT: Found ${nearbyAlerts.length} nearby alerts within ${MAX_DISTANCE_KM}km`)

// // // // // // //     if (nearbyAlerts.length > 0) {
// // // // // // //       console.log("📋 Nearby alerts summary:")
// // // // // // //       nearbyAlerts.forEach((alert, index) => {
// // // // // // //         console.log(`${index + 1}. Alert ${alert._id}: ${alert.distance}km away (${alert.proximityMethod})`)
// // // // // // //       })
// // // // // // //     }

// // // // // // //     return NextResponse.json({
// // // // // // //       success: true,
// // // // // // //       alerts: nearbyAlerts,
// // // // // // //       hospitalInfo: {
// // // // // // //         name: hospital.name,
// // // // // // //         maxDistance: MAX_DISTANCE_KM,
// // // // // // //         location: hospital.address,
// // // // // // //       },
// // // // // // //     })
// // // // // // //   } catch (error) {
// // // // // // //     console.error("💥 Error fetching emergency alerts for hospital:", error)
// // // // // // //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// // // // // // //   }
// // // // // // // }












// // // // // // import { type NextRequest, NextResponse } from "next/server"
// // // // // // import jwt from "jsonwebtoken"
// // // // // // import dbConnect from "@/lib/mongodb"
// // // // // // import EmergencyAlert from "@/lib/models/EmergencyAlert"
// // // // // // import Hospital from "@/lib/models/Hospital"
// // // // // // import { calculateDistance } from "@/lib/utils"

// // // // // // // Helper function to check if locations are nearby based on address
// // // // // // function isNearbyByAddress(
// // // // // //   hospitalAddress: any,
// // // // // //   alertAddress: any,
// // // // // // ): { isNearby: boolean; distance: number; reason: string } {
// // // // // //   console.log("🔍 Checking address-based proximity:")
// // // // // //   console.log("🏥 Hospital Address:", {
// // // // // //     area: hospitalAddress?.area,
// // // // // //     townOrVillage: hospitalAddress?.townOrVillage,
// // // // // //     taluka: hospitalAddress?.taluka,
// // // // // //     district: hospitalAddress?.district,
// // // // // //     pincode: hospitalAddress?.pincode,
// // // // // //   })
// // // // // //   console.log("🚨 Alert Address:", {
// // // // // //     area: alertAddress?.area,
// // // // // //     townOrVillage: alertAddress?.townOrVillage,
// // // // // //     taluka: alertAddress?.taluka,
// // // // // //     district: alertAddress?.district,
// // // // // //     pincode: alertAddress?.pincode,
// // // // // //   })
// // // // // //   // Same pincode = very close (within 5km)
// // // // // //   if (hospitalAddress?.pincode && alertAddress?.pincode && hospitalAddress.pincode === alertAddress.pincode) {
// // // // // //     console.log("✅ Same pincode found - Very close proximity")
// // // // // //     return { isNearby: true, distance: 5, reason: "Same pincode" }
// // // // // //   }
// // // // // //   // Same taluka = nearby (within 15km)
// // // // // //   if (
// // // // // //     hospitalAddress?.taluka &&
// // // // // //     alertAddress?.taluka &&
// // // // // //     hospitalAddress.taluka.toLowerCase() === alertAddress.taluka.toLowerCase()
// // // // // //   ) {
// // // // // //     console.log("✅ Same taluka found - Close proximity")
// // // // // //     return { isNearby: true, distance: 15, reason: "Same taluka" }
// // // // // //   }
// // // // // //   // Same district = moderate distance (within 30km)
// // // // // //   if (
// // // // // //     hospitalAddress?.district &&
// // // // // //     alertAddress?.district &&
// // // // // //     hospitalAddress.district.toLowerCase() === alertAddress.district.toLowerCase()
// // // // // //   ) {
// // // // // //     console.log("✅ Same district found - Moderate proximity")
// // // // // //     return { isNearby: true, distance: 30, reason: "Same district" }
// // // // // //   }
// // // // // //   // Same area name = very close (within 3km)
// // // // // //   if (
// // // // // //     hospitalAddress?.area &&
// // // // // //     alertAddress?.area &&
// // // // // //     hospitalAddress.area.toLowerCase() === alertAddress.area.toLowerCase()
// // // // // //   ) {
// // // // // //     console.log("✅ Same area found - Very close proximity")
// // // // // //     return { isNearby: true, distance: 3, reason: "Same area" }
// // // // // //   }
// // // // // //   // Same town/village = close (within 10km)
// // // // // //   if (
// // // // // //     hospitalAddress?.townOrVillage &&
// // // // // //     alertAddress?.townOrVillage &&
// // // // // //     hospitalAddress.townOrVillage.toLowerCase() === alertAddress.townOrVillage.toLowerCase()
// // // // // //   ) {
// // // // // //     console.log("✅ Same town/village found - Close proximity")
// // // // // //     return { isNearby: true, distance: 10, reason: "Same town/village" }
// // // // // //   }
// // // // // //   console.log("❌ No address match found - Too far")
// // // // // //   return { isNearby: false, distance: 999, reason: "No address match" }
// // // // // // }

// // // // // // export async function GET(request: NextRequest) {
// // // // // //   try {
// // // // // //     const token = request.cookies.get("auth-token")?.value
// // // // // //     if (!token) {
// // // // // //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // // // // //     }

// // // // // //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
// // // // // //     const hospitalId = decoded.userId // Assuming userId in token is hospitalId

// // // // // //     await dbConnect()

// // // // // //     const hospital = await Hospital.findById(hospitalId)
// // // // // //     if (!hospital || !hospital.isHandleEmergency || !hospital.isAvailable) {
// // // // // //       // If hospital doesn't handle emergencies or is not available, return no alerts
// // // // // //       return NextResponse.json({
// // // // // //         success: true,
// // // // // //         alerts: [],
// // // // // //         message: "Hospital not configured for emergencies or not available.",
// // // // // //       })
// // // // // //     }

// // // // // //     const hospitalLat = hospital.location?.lat
// // // // // //     const hospitalLng = hospital.location?.lng

// // // // // //     if (!hospitalLat || !hospitalLng) {
// // // // // //       return NextResponse.json({ success: false, message: "Hospital location not set." }, { status: 400 })
// // // // // //     }

// // // // // //     // Find alerts where this hospital's ID is in the isSentTo array
// // // // // //     // We fetch all alerts relevant to this hospital, regardless of their 'isSentTo.status' initially
// // // // // //     const alerts = await EmergencyAlert.find({
// // // // // //       "isSentTo.hospitalId": hospitalId,
// // // // // //       // We are not filtering by "isSentTo.status": "pending" here,
// // // // // //       // as we want to fetch all alerts sent to this hospital
// // // // // //       // and then mark them as 'read' if they were 'pending'.
// // // // // //     }).populate("userId", "name email phone")

// // // // // //     const alertsToReturn = []
// // // // // //     for (const alert of alerts) {
// // // // // //       const userLat = alert.location?.lat
// // // // // //       const userLng = alert.location?.lng
// // // // // //       let distance = null
// // // // // //       if (userLat && userLng) {
// // // // // //         distance = calculateDistance(hospitalLat, hospitalLng, userLat, userLng)
// // // // // //       }

// // // // // //       // Find the specific entry for this hospital in the isSentTo array
// // // // // //       const hospitalEntry = alert.isSentTo.find((entry) => entry.hospitalId.toString() === hospitalId.toString())

// // // // // //       if (hospitalEntry) {
// // // // // //         // If the alert's status for this hospital is 'pending', mark it as 'read'
// // // // // //         if (hospitalEntry.status === "pending") {
// // // // // //           hospitalEntry.status = "read"
// // // // // //           // Save the updated alert back to the database
// // // // // //           await alert.save()
// // // // // //           console.log(`Alert ${alert._id} marked as 'read' for hospital ${hospitalId}.`)
// // // // // //         }

// // // // // //         // Only include alerts that are within 50km and are either 'pending' or 'read' for this hospital
// // // // // //         // and the overall alert status is 'pending' or 'accepted' (if we want to show accepted ones too)
// // // // // //         if (distance !== null && distance <= 50 && (alert.status === "pending" || alert.status === "accepted")) {
// // // // // //           alertsToReturn.push({
// // // // // //             ...alert.toObject(), // Convert Mongoose document to plain object
// // // // // //             distance: Number.parseFloat(distance.toFixed(2)),
// // // // // //             proximityMethod: "GPS",
// // // // // //             // Add the specific hospital's status for this alert
// // // // // //             hospitalAlertStatus: hospitalEntry.status,
// // // // // //           })
// // // // // //         }
// // // // // //       }
// // // // // //     }

// // // // // //     console.log(`🏥 Hospital checking for emergency alerts: ${hospitalId}`)
// // // // // //     console.log(`🔍 Found ${alertsToReturn.length} nearby alerts relevant to this hospital.`)
// // // // // //     console.log(`🎯 FINAL RESULT: Found ${alertsToReturn.length} nearby alerts within 50km`)

// // // // // //     return NextResponse.json({ success: true, alerts: alertsToReturn })
// // // // // //   } catch (error) {
// // // // // //     console.error("💥 Error fetching emergency alerts for hospital:", error)
// // // // // //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// // // // // //   }
// // // // // // }








// // // // // //C:\Users\UDAYN\Downloads\healthcare-platform\app\api\hospital\emergency-alerts\route.ts
// // // // // import { type NextRequest, NextResponse } from "next/server"
// // // // // import jwt from "jsonwebtoken"
// // // // // import dbConnect from "@/lib/mongodb"
// // // // // import EmergencyAlert from "@/lib/models/EmergencyAlert"
// // // // // import Hospital from "@/lib/models/Hospital"
// // // // // import { calculateDistance } from "@/lib/utils" // Import calculateDistance from utils

// // // // // // Helper function to check if locations are nearby based on address
// // // // // function isNearbyByAddress(
// // // // //   hospitalAddress: any,
// // // // //   alertAddress: any,
// // // // // ): { isNearby: boolean; distance: number; reason: string } {
// // // // //   console.log("🔍 Checking address-based proximity:")
// // // // //   console.log("🏥 Hospital Address:", {
// // // // //     area: hospitalAddress?.area,
// // // // //     townOrVillage: hospitalAddress?.townOrVillage,
// // // // //     taluka: hospitalAddress?.taluka,
// // // // //     district: hospitalAddress?.district,
// // // // //     pincode: hospitalAddress?.pincode,
// // // // //   })
// // // // //   console.log("🚨 Alert Address:", {
// // // // //     area: alertAddress?.area,
// // // // //     townOrVillage: alertAddress?.townOrVillage,
// // // // //     taluka: alertAddress?.taluka,
// // // // //     district: alertAddress?.district,
// // // // //     pincode: alertAddress?.pincode,
// // // // //   })
// // // // //   // Same pincode = very close (within 5km)
// // // // //   if (hospitalAddress?.pincode && alertAddress?.pincode && hospitalAddress.pincode === alertAddress.pincode) {
// // // // //     console.log("✅ Same pincode found - Very close proximity")
// // // // //     return { isNearby: true, distance: 5, reason: "Same pincode" }
// // // // //   }
// // // // //   // Same taluka = nearby (within 15km)
// // // // //   if (
// // // // //     hospitalAddress?.taluka &&
// // // // //     alertAddress?.taluka &&
// // // // //     hospitalAddress.taluka.toLowerCase() === alertAddress.taluka.toLowerCase()
// // // // //   ) {
// // // // //     console.log("✅ Same taluka found - Close proximity")
// // // // //     return { isNearby: true, distance: 15, reason: "Same taluka" }
// // // // //   }
// // // // //   // Same district = moderate distance (within 30km)
// // // // //   if (
// // // // //     hospitalAddress?.district &&
// // // // //     alertAddress?.district &&
// // // // //     hospitalAddress.district.toLowerCase() === alertAddress.district.toLowerCase()
// // // // //   ) {
// // // // //     console.log("✅ Same district found - Moderate proximity")
// // // // //     return { isNearby: true, distance: 30, reason: "Same district" }
// // // // //   }
// // // // //   // Same area name = very close (within 3km)
// // // // //   if (
// // // // //     hospitalAddress?.area &&
// // // // //     alertAddress?.area &&
// // // // //     hospitalAddress.area.toLowerCase() === alertAddress.area.toLowerCase()
// // // // //   ) {
// // // // //     console.log("✅ Same area found - Very close proximity")
// // // // //     return { isNearby: true, distance: 3, reason: "Same area" }
// // // // //   }
// // // // //   // Same town/village = close (within 10km)
// // // // //   if (
// // // // //     hospitalAddress?.townOrVillage &&
// // // // //     alertAddress?.townOrVillage &&
// // // // //     hospitalAddress.townOrVillage.toLowerCase() === alertAddress.townOrVillage.toLowerCase()
// // // // //   ) {
// // // // //     console.log("✅ Same town/village found - Close proximity")
// // // // //     return { isNearby: true, distance: 10, reason: "Same town/village" }
// // // // //   }
// // // // //   console.log("❌ No address match found - Too far")
// // // // //   return { isNearby: false, distance: 999, reason: "No address match" }
// // // // // }

// // // // // export async function GET(request: NextRequest) {
// // // // //   try {
// // // // //     const token = request.cookies.get("auth-token")?.value
// // // // //     if (!token) {
// // // // //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // // // //     }

// // // // //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
// // // // //     const hospitalId = decoded.userId // Assuming userId in token is hospitalId

// // // // //     await dbConnect()

// // // // //     const hospital = await Hospital.findById(hospitalId)
// // // // //     if (!hospital || !hospital.isHandleEmergency || !hospital.isAvailable) {
// // // // //       // If hospital doesn't handle emergencies or is not available, return no alerts
// // // // //       return NextResponse.json({
// // // // //         success: true,
// // // // //         alerts: [],
// // // // //         message: "Hospital not configured for emergencies or not available.",
// // // // //       })
// // // // //     }

// // // // //     // Prioritize live location, fall back to registered address geo-location
// // // // //     let hospitalLat = hospital.location?.lat
// // // // //     let hospitalLng = hospital.location?.lng

// // // // //     if (!hospitalLat || !hospitalLng) {
// // // // //       hospitalLat = hospital.address?.geoLocation?.lat
// // // // //       hospitalLng = hospital.address?.geoLocation?.lng
// // // // //       if (hospitalLat && hospitalLng) {
// // // // //         console.log("🏥 Using hospital's registered address geo-location as fallback.")
// // // // //       } else {
// // // // //         console.error("⚠️ Hospital has no valid GPS coordinates (live or registered address).")
// // // // //         return NextResponse.json({ success: false, message: "Hospital location not set." }, { status: 400 })
// // // // //       }
// // // // //     } else {
// // // // //       console.log("🏥 Using hospital's live location.")
// // // // //     }

// // // // //     // Find alerts where this hospital's ID is in the isSentTo array
// // // // //     // We fetch all alerts relevant to this hospital, regardless of their 'isSentTo.status' initially
// // // // //     const alerts = await EmergencyAlert.find({
// // // // //       "isSentTo.hospitalId": hospitalId,
// // // // //     }).populate("userId", "name email phone")

// // // // //     const alertsToReturn = []
// // // // //     const MAX_DISTANCE_KM = 50 // Define max distance for alerts
// // // // //     const ALERT_TIMEOUT_MINUTES = 3 // Define alert timeout

// // // // //     for (const alert of alerts) {
// // // // //       const userLat = alert.location?.lat
// // // // //       const userLng = alert.location?.lng
// // // // //       let distance = 999 // Default high distance
// // // // //       let proximityMethod = "unknown"

// // // // //       // Calculate distance if user location is available
// // // // //       if (userLat && userLng) {
// // // // //         distance = calculateDistance(hospitalLat, hospitalLng, userLat, userLng)
// // // // //         proximityMethod = "GPS calculation"
// // // // //       } else {
// // // // //         // Fallback to address-based proximity if GPS is not fully available
// // // // //         const addressProximity = isNearbyByAddress(hospital.address, alert.location?.address)
// // // // //         distance = addressProximity.distance
// // // // //         proximityMethod = `Address matching (${addressProximity.reason})`
// // // // //       }

// // // // //       // Find the specific entry for this hospital in the isSentTo array
// // // // //       const hospitalEntry = alert.isSentTo.find((entry) => entry.hospitalId.toString() === hospitalId.toString())

// // // // //       if (hospitalEntry) {
// // // // //         // Check for timeout for this specific hospital's entry
// // // // //         const timeElapsed = (new Date().getTime() - hospitalEntry.sentAt.getTime()) / (1000 * 60)
// // // // //         if (hospitalEntry.status === "pending" && timeElapsed > ALERT_TIMEOUT_MINUTES) {
// // // // //           console.log(`⏰ Alert ${alert._id} timed out for hospital ${hospital.name}. Marking as timedOut.`)
// // // // //           hospitalEntry.status = "timedOut"
// // // // //           await alert.save() // Save the updated alert
// // // // //           continue // Skip this alert for this hospital
// // // // //         }

// // // // //         // If the alert's status for this hospital is 'pending', mark it as 'read' upon fetching
// // // // //         if (hospitalEntry.status === "pending") {
// // // // //           hospitalEntry.status = "read"
// // // // //           await alert.save() // Save the updated alert back to the database
// // // // //           console.log(`Alert ${alert._id} marked as 'read' for hospital ${hospitalId}.`)
// // // // //         }

// // // // //         // Only include alerts that are within acceptable range and are either 'pending', 'read', or 'accepted' overall
// // // // //         if (distance <= MAX_DISTANCE_KM && (alert.status === "pending" || alert.status === "accepted")) {
// // // // //           alertsToReturn.push({
// // // // //             ...alert.toObject(), // Convert Mongoose document to plain object
// // // // //             distance: Number.parseFloat(distance.toFixed(2)),
// // // // //             proximityMethod: proximityMethod,
// // // // //             // Add the specific hospital's status for this alert
// // // // //             hospitalAlertStatus: hospitalEntry.status,
// // // // //           })
// // // // //         }
// // // // //       }
// // // // //     }

// // // // //     console.log(`🏥 Hospital checking for emergency alerts: ${hospitalId}`)
// // // // //     console.log(`🔍 Found ${alertsToReturn.length} nearby alerts relevant to this hospital.`)
// // // // //     console.log(`🎯 FINAL RESULT: Found ${alertsToReturn.length} nearby alerts within ${MAX_DISTANCE_KM}km`)

// // // // //     return NextResponse.json({ success: true, alerts: alertsToReturn })
// // // // //   } catch (error) {
// // // // //     console.error("💥 Error fetching emergency alerts for hospital:", error)
// // // // //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// // // // //   }
// // // // // }













// // // // import { type NextRequest, NextResponse } from "next/server"
// // // // import jwt from "jsonwebtoken"
// // // // import dbConnect from "@/lib/mongodb"
// // // // import EmergencyAlert from "@/lib/models/EmergencyAlert"
// // // // import Hospital from "@/lib/models/Hospital"

// // // // import { calculateDistance } from "@/lib/utils" // Import calculateDistance from utils
// // // // import User from "@/lib/models/User"

// // // // // Helper function to check if locations are nearby based on address
// // // // function isNearbyByAddress(
// // // //   hospitalAddress: any,
// // // //   alertAddress: any,
// // // // ): { isNearby: boolean; distance: number; reason: string } {
// // // //   console.log("🔍 Checking address-based proximity:")
// // // //   console.log("🏥 Hospital Address:", {
// // // //     area: hospitalAddress?.area,
// // // //     townOrVillage: hospitalAddress?.townOrVillage,
// // // //     taluka: hospitalAddress?.taluka,
// // // //     district: hospitalAddress?.district,
// // // //     pincode: hospitalAddress?.pincode,
// // // //   })
// // // //   console.log("🚨 Alert Address:", {
// // // //     area: alertAddress?.area,
// // // //     townOrVillage: alertAddress?.townOrVillage,
// // // //     taluka: alertAddress?.taluka,
// // // //     district: alertAddress?.district,
// // // //     pincode: alertAddress?.pincode,
// // // //   })

// // // //   // Same pincode = very close (within 5km)
// // // //   if (hospitalAddress?.pincode && alertAddress?.pincode && hospitalAddress.pincode === alertAddress.pincode) {
// // // //     console.log("✅ Same pincode found - Very close proximity")
// // // //     return { isNearby: true, distance: 5, reason: "Same pincode" }
// // // //   }

// // // //   // Same taluka = nearby (within 15km)
// // // //   if (
// // // //     hospitalAddress?.taluka &&
// // // //     alertAddress?.taluka &&
// // // //     hospitalAddress.taluka.toLowerCase() === alertAddress.taluka.toLowerCase()
// // // //   ) {
// // // //     console.log("✅ Same taluka found - Close proximity")
// // // //     return { isNearby: true, distance: 15, reason: "Same taluka" }
// // // //   }

// // // //   // Same district = moderate distance (within 30km)
// // // //   if (
// // // //     hospitalAddress?.district &&
// // // //     alertAddress?.district &&
// // // //     hospitalAddress.district.toLowerCase() === alertAddress.district.toLowerCase()
// // // //   ) {
// // // //     console.log("✅ Same district found - Moderate proximity")
// // // //     return { isNearby: true, distance: 30, reason: "Same district" }
// // // //   }

// // // //   // Same area name = very close (within 3km)
// // // //   if (
// // // //     hospitalAddress?.area &&
// // // //     alertAddress?.area &&
// // // //     hospitalAddress.area.toLowerCase() === alertAddress.area.toLowerCase()
// // // //   ) {
// // // //     console.log("✅ Same area found - Very close proximity")
// // // //     return { isNearby: true, distance: 3, reason: "Same area" }
// // // //   }

// // // //   // Same town/village = close (within 10km)
// // // //   if (
// // // //     hospitalAddress?.townOrVillage &&
// // // //     alertAddress?.townOrVillage &&
// // // //     hospitalAddress.townOrVillage.toLowerCase() === alertAddress.townOrVillage.toLowerCase()
// // // //   ) {
// // // //     console.log("✅ Same town/village found - Close proximity")
// // // //     return { isNearby: true, distance: 10, reason: "Same town/village" }
// // // //   }

// // // //   console.log("❌ No address match found - Too far")
// // // //   return { isNearby: false, distance: 999, reason: "No address match" }
// // // // }

// // // // export async function GET(request: NextRequest) {
// // // //   try {
// // // //     const token = request.cookies.get("auth-token")?.value
// // // //     if (!token) {
// // // //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // // //     }

// // // //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
// // // //     const hospitalId = decoded.userId // Assuming userId in token is hospitalId

// // // //     await dbConnect()

// // // //     const hospital = await Hospital.findById(hospitalId)
// // // //     if (!hospital || !hospital.isHandleEmergency || !hospital.isAvailable) {
// // // //       // If hospital doesn't handle emergencies or is not available, return no alerts
// // // //       return NextResponse.json({
// // // //         success: true,
// // // //         alerts: [],
// // // //         message: "Hospital not configured for emergencies or not available.",
// // // //       })
// // // //     }

// // // //     // Prioritize live location, fall back to registered address geo-location
// // // //     let hospitalLat = hospital.location?.lat
// // // //     let hospitalLng = hospital.location?.lng

// // // //     if (!hospitalLat || !hospitalLng) {
// // // //       hospitalLat = hospital.address?.geoLocation?.lat
// // // //       hospitalLng = hospital.address?.geoLocation?.lng
// // // //       if (hospitalLat && hospitalLng) {
// // // //         console.log("🏥 Using hospital's registered address geo-location as fallback.")
// // // //       } else {
// // // //         console.error("⚠️ Hospital has no valid GPS coordinates (live or registered address).")
// // // //         return NextResponse.json({ success: false, message: "Hospital location not set." }, { status: 400 })
// // // //       }
// // // //     } else {
// // // //       console.log("🏥 Using hospital's live location.")
// // // //     }

// // // //     // Find alerts where this hospital's ID is in the isSentTo array
// // // //     // We fetch all alerts relevant to this hospital, regardless of their 'isSentTo.status' initially
// // // //     const alerts = await EmergencyAlert.find({
// // // //       "isSentTo.hospitalId": hospitalId,
// // // //       status: { $nin: ["accepted", "cancelled", "no_response_all_contacted"] }, // Only show alerts that are still active
// // // //     }).populate("userId", "name email phone")

// // // //     const alertsToReturn = []
// // // //     const MAX_DISTANCE_KM = 100 // Define max distance for alerts
// // // //     const ALERT_TIMEOUT_MINUTES = 3 // Define alert timeout

// // // //     for (const alert of alerts) {
// // // //       const userLat = alert.location?.lat
// // // //       const userLng = alert.location?.lng

// // // //       let distance = 999 // Default high distance
// // // //       let proximityMethod = "unknown"

// // // //       // Calculate distance if user location is available
// // // //       if (userLat && userLng && hospitalLat && hospitalLng) {
// // // //         distance = calculateDistance(hospitalLat, hospitalLng, userLat, userLng)
// // // //         proximityMethod = "GPS calculation"
// // // //       } else {
// // // //         // Fallback to address-based proximity if GPS is not fully available
// // // //         const addressProximity = isNearbyByAddress(hospital.address, alert.location?.address)
// // // //         distance = addressProximity.distance
// // // //         proximityMethod = `Address matching (${addressProximity.reason})`
// // // //       }

// // // //       // Find the specific entry for this hospital in the isSentTo array
// // // //       const hospitalEntry = alert.isSentTo.find((entry) => entry.hospitalId.toString() === hospitalId.toString())

// // // //       if (hospitalEntry) {
// // // //         // Check for timeout for this specific hospital's entry
// // // //         const timeElapsed = (new Date().getTime() - hospitalEntry.sentAt.getTime()) / (1000 * 60)
// // // //         if (hospitalEntry.status === "pending" && timeElapsed > ALERT_TIMEOUT_MINUTES) {
// // // //           console.log(`⏰ Alert ${alert._id} timed out for hospital ${hospital.name}. Marking as timedOut.`)
// // // //           hospitalEntry.status = "timedOut"
// // // //           await alert.save() // Save the updated alert
// // // //           continue // Skip this alert for this hospital
// // // //         }

// // // //         // If the alert's status for this hospital is 'pending', mark it as 'read' upon fetching
// // // //         if (hospitalEntry.status === "pending") {
// // // //           hospitalEntry.status = "read"
// // // //           await alert.save() // Save the updated alert back to the database
// // // //           console.log(`Alert ${alert._id} marked as 'read' for hospital ${hospitalId}.`)
// // // //         }

// // // //         // Only include alerts that are within acceptable range and are either 'pending', 'read', or 'accepted' overall
// // // //         // The overall alert status must also not be 'accepted' or 'cancelled' by another hospital
// // // //         if (
// // // //           distance <= MAX_DISTANCE_KM &&
// // // //           (hospitalEntry.status === "pending" || hospitalEntry.status === "read") &&
// // // //           alert.status === "pending" // Only show if the overall alert is still pending
// // // //         ) {
// // // //           alertsToReturn.push({
// // // //             ...alert.toObject(), // Convert Mongoose document to plain object
// // // //             distance: Number.parseFloat(distance.toFixed(2)),
// // // //             proximityMethod: proximityMethod,
// // // //             // Add the specific hospital's status for this alert
// // // //             hospitalAlertStatus: hospitalEntry.status,
// // // //           })
// // // //         } else if (alert.status === "accepted" && hospitalEntry.status === "accepted") {
// // // //           // If this hospital accepted it, show it regardless of distance (it's already handled)
// // // //           alertsToReturn.push({
// // // //             ...alert.toObject(),
// // // //             distance: Number.parseFloat(distance.toFixed(2)),
// // // //             proximityMethod: proximityMethod,
// // // //             hospitalAlertStatus: hospitalEntry.status,
// // // //           })
// // // //         }
// // // //       }
// // // //     }

// // // //     console.log(`🏥 Hospital checking for emergency alerts: ${hospitalId}`)
// // // //     console.log(`🔍 Found ${alertsToReturn.length} nearby alerts relevant to this hospital.`)
// // // //     console.log(`🎯 FINAL RESULT: Found ${alertsToReturn.length} nearby alerts within ${MAX_DISTANCE_KM}km`)

// // // //     return NextResponse.json({ success: true, alerts: alertsToReturn })
// // // //   } catch (error) {
// // // //     console.error("💥 Error fetching emergency alerts for hospital:", error)
// // // //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// // // //   }
// // // // }


// // // import { type NextRequest, NextResponse } from "next/server"
// // // import jwt from "jsonwebtoken"
// // // import dbConnect from "@/lib/mongodb"
// // // import EmergencyAlert from "@/lib/models/EmergencyAlert"
// // // import Hospital from "@/lib/models/Hospital"
// // // import User from "@/lib/models/User"
// // // import { calculateDistance } from "@/lib/utils"

// // // // Utility to wait (sleep) for given milliseconds
// // // const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms))

// // // export async function GET(request: NextRequest) {
// // //   try {
// // //     const token = request.cookies.get("auth-token")?.value
// // //     if (!token) {
// // //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // //     }

// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
// // //     const hospitalId = decoded.userId

// // //     await dbConnect()

// // //     let hospital = await Hospital.findById(hospitalId)
// // //     if (!hospital || !hospital.isHandleEmergency || !hospital.isAvailable) {
// // //       return NextResponse.json({
// // //         success: true,
// // //         alerts: [],
// // //         message: "Hospital not configured for emergencies or not available.",
// // //       })
// // //     }

// // //     // Try to get GPS coordinates with retry (wait for app to possibly update live location)
// // //     let hospitalLat = hospital.location?.lat
// // //     let hospitalLng = hospital.location?.lng
// // //     const MAX_RETRIES = 5
// // //     const RETRY_DELAY_MS = 2000 // 2 seconds

// // //     let attempt = 0
// // //     while ((!hospitalLat || !hospitalLng) && attempt < MAX_RETRIES) {
// // //       console.log(`⏳ Waiting for hospital GPS location... attempt ${attempt + 1}`)
// // //       await delay(RETRY_DELAY_MS)

// // //       hospital = await Hospital.findById(hospitalId) // re-fetch
// // //       hospitalLat = hospital.location?.lat
// // //       hospitalLng = hospital.location?.lng
// // //       attempt++
// // //     }

// // //     if (!hospitalLat || !hospitalLng) {
// // //       console.error("⚠️ Hospital has no valid GPS coordinates after retries.")
// // //       return NextResponse.json({ success: false, message: "Hospital location not set." }, { status: 400 })
// // //     }

// // //     console.log("📍 Using hospital GPS location:", hospitalLat, hospitalLng)

// // //     const alerts = await EmergencyAlert.find({
// // //       "isSentTo.hospitalId": hospitalId,
// // //       status: { $nin: ["accepted", "cancelled", "no_response_all_contacted"] },
// // //     }).populate("userId", "name email phone")

// // //     const alertsToReturn = []
// // //     const MAX_DISTANCE_KM = 100
// // //     const ALERT_TIMEOUT_MINUTES = 3

// // //     for (const alert of alerts) {
// // //       const userLat = alert.location?.lat
// // //       const userLng = alert.location?.lng

// // //       if (!userLat || !userLng) {
// // //         console.warn(`⚠️ Skipping alert ${alert._id} due to missing user coordinates.`)
// // //         continue
// // //       }

// // //       const distance = calculateDistance(hospitalLat, hospitalLng, userLat, userLng)
// // //       const proximityMethod = "GPS calculation"

// // //       const hospitalEntry = alert.isSentTo.find(
// // //         (entry) => entry.hospitalId.toString() === hospitalId.toString()
// // //       )

// // //       if (hospitalEntry) {
// // //         const timeElapsed = (Date.now() - new Date(hospitalEntry.sentAt).getTime()) / (1000 * 60)
// // //         if (hospitalEntry.status === "pending" && timeElapsed > ALERT_TIMEOUT_MINUTES) {
// // //           console.log(`⏰ Alert ${alert._id} timed out for hospital ${hospital.name}. Marking as timedOut.`)
// // //           hospitalEntry.status = "timedOut"
// // //           await alert.save()
// // //           continue
// // //         }

// // //         if (hospitalEntry.status === "pending") {
// // //           hospitalEntry.status = "read"
// // //           await alert.save()
// // //           console.log(`Alert ${alert._id} marked as 'read' for hospital ${hospitalId}.`)
// // //         }

// // //         if (
// // //           distance <= MAX_DISTANCE_KM &&
// // //           (hospitalEntry.status === "pending" || hospitalEntry.status === "read") &&
// // //           alert.status === "pending"
// // //         ) {
// // //           alertsToReturn.push({
// // //             ...alert.toObject(),
// // //             distance: Number.parseFloat(distance.toFixed(2)),
// // //             proximityMethod,
// // //             hospitalAlertStatus: hospitalEntry.status,
// // //           })
// // //         } else if (alert.status === "accepted" && hospitalEntry.status === "accepted") {
// // //           alertsToReturn.push({
// // //             ...alert.toObject(),
// // //             distance: Number.parseFloat(distance.toFixed(2)),
// // //             proximityMethod,
// // //             hospitalAlertStatus: hospitalEntry.status,
// // //           })
// // //         }
// // //       }
// // //     }

// // //     console.log(`🎯 FINAL RESULT: Found ${alertsToReturn.length} nearby alerts within ${MAX_DISTANCE_KM}km`)
// // //     return NextResponse.json({ success: true, alerts: alertsToReturn })
// // //   } catch (error) {
// // //     console.error("💥 Error fetching emergency alerts for hospital:", error)
// // //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// // //   }
// // // }






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

// //     if (
// //       alert.status === "accepted" &&
// //       alert.acceptedBy &&
// //       alert.acceptedBy._id.toString() !== hospital._id.toString()
// //     ) {
// //       return NextResponse.json(
// //         { success: false, message: "This alert has already been accepted by another hospital." },
// //         { status: 409 },
// //       )
// //     }

// //     if (alert.status === "timedOut") {
// //       return NextResponse.json({ success: false, message: "This alert has timed out." }, { status: 409 })
// //     }

// //     const hospitalAlertIndex = alert.isSentTo.findIndex((h: any) => h.hospitalId.toString() === hospital._id.toString())

// //     if (hospitalAlertIndex === -1) {
// //       return NextResponse.json({ success: false, message: "Hospital not in alert's isSentTo list." }, { status: 404 })
// //     }

// //     if (action === "accept") {
// //       alert.status = "accepted"
// //       alert.acceptedBy = {
// //         _id: hospital._id,
// //         name: hospital.name,
// //         phone: hospital.phone, // persist phone to DB
// //       }
// //       alert.isSentTo[hospitalAlertIndex].status = "accepted"
// //     } else if (action === "deny") {
// //       alert.isSentTo[hospitalAlertIndex].status = "declined"
// //       // If a hospital declines, we can remove it from the list of alerts for this hospital
// //       // This is handled on the client side by filtering the alerts array after a successful deny.
// //       // No need to change the main alert status unless all hospitals decline.
// //     }

// //     await alert.save()

// //     return NextResponse.json({
// //       success: true,
// //       message: `Alert ${action}ed successfully`,
// //       data: {
// //         alert,
// //       },
// //     })
// //   } catch (error: any) {
// //     console.error("Error responding to emergency alert:", error)
// //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// //   }
// // }

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

//     if (
//       alert.status === "accepted" &&
//       alert.acceptedBy &&
//       alert.acceptedBy._id.toString() !== hospital._id.toString()
//     ) {
//       return NextResponse.json(
//         { success: false, message: "This alert has already been accepted by another hospital." },
//         { status: 409 },
//       )
//     }

//     if (alert.status === "timedOut") {
//       return NextResponse.json({ success: false, message: "This alert has timed out." }, { status: 409 })
//     }

//     const hospitalAlertIndex = alert.isSentTo.findIndex((h: any) => h.hospitalId.toString() === hospital._id.toString())

//     if (hospitalAlertIndex === -1) {
//       return NextResponse.json({ success: false, message: "Hospital not in alert's isSentTo list." }, { status: 404 })
//     }

//     if (action === "accept") {
//       alert.status = "accepted"
//       alert.acceptedBy = {
//         _id: hospital._id,
//         name: hospital.name,
//         phone: hospital.phone, // persist phone to DB
//       }
//       alert.isSentTo[hospitalAlertIndex].status = "accepted"
//     } else if (action === "deny") {
//       alert.isSentTo[hospitalAlertIndex].status = "declined"
//       // If a hospital declines, we can remove it from the list of alerts for this hospital
//       // This is handled on the client side by filtering the alerts array after a successful deny.
//       // No need to change the main alert status unless all hospitals decline.
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

export async function GET(request: NextRequest) {
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

    const hospitalId = decoded.userId

    const alerts = await EmergencyAlert.find({
      "isSentTo.hospitalId": hospitalId,
      status: { $nin: ["cancelled", "no_response_all_contacted"] },
    })
      .lean()
      .sort({ createdAt: -1 })

    const formatted = alerts.map((alert) => {
      const hospitalStatus = alert.isSentTo.find(
        (h: any) => h.hospitalId.toString() === hospitalId,
      )?.status

      return {
        ...alert,
        hospitalAlertStatus: hospitalStatus || "unknown",
      }
    })

    return NextResponse.json({ success: true, alerts: formatted })
  } catch (error) {
    console.error("💥 Error in GET /emergency-alerts:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
