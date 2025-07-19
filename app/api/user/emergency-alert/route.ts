









// // // // import { type NextRequest, NextResponse } from "next/server"
// // // // import jwt from "jsonwebtoken"
// // // // import dbConnect from "@/lib/mongodb"
// // // // import EmergencyAlert from "@/lib/models/EmergencyAlert"
// // // // import User from "@/lib/models/User"
// // // // import Hospital from "@/lib/models/Hospital"
// // // // import { calculateDistance } from "@/lib/utils"

// // // // export async function POST(request: NextRequest) {
// // // //   try {
// // // //     const token = request.cookies.get("auth-token")?.value
// // // //     if (!token) {
// // // //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // // //     }

// // // //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
// // // //     const { location, message, priority } = await request.json()

// // // //     if (!location || typeof location.lat !== "number" || typeof location.lng !== "number") {
// // // //       return NextResponse.json({ success: false, message: "Invalid location" }, { status: 400 })
// // // //     }

// // // //     await dbConnect()

// // // //     const user = await User.findById(decoded.userId)
// // // //     if (!user) {
// // // //       return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
// // // //     }

// // // //     // Find all hospitals that handle emergencies, are available, and have a fixed location
// // // //     const allHospitals = await Hospital.find({
// // // //       isHandleEmergency: true,
// // // //       isAvailable: true,
// // // //       "location.lat": { $exists: true }, // Use hospital.location
// // // //       "location.lng": { $exists: true }, // Use hospital.location
// // // //     })

// // // //     const hospitalsWithDistance = allHospitals
// // // //       .map((hospital) => {
// // // //         const { lat, lng } = hospital.location // Use hospital.location
// // // //         const distance = calculateDistance(location.lat, location.lng, lat!, lng!) // lat/lng are guaranteed by $exists
// // // //         return { hospitalId: hospital._id, lat, lng, distance }
// // // //       })
// // // //       .filter((h) => h.distance <= 50) // Filter within 50km
// // // //       .sort((a, b) => a.distance - b.distance) // Sort by distance

// // // //     if (hospitalsWithDistance.length === 0) {
// // // //       // No hospitals found within 50km
// // // //       return NextResponse.json({ success: false, message: "No hospital found within 50km" }, { status: 404 })
// // // //     }

// // // //     // Divide into escalation batches of 3
// // // //     const escalationGroups = []
// // // //     for (let i = 0; i < hospitalsWithDistance.length; i += 3) {
// // // //       escalationGroups.push(hospitalsWithDistance.slice(i, i + 3))
// // // //     }

// // // //     const now = new Date()
// // // //     const initialSentTo = escalationGroups[0] || [] // First group to be sent immediately
// // // //     const initialContactedHospitalIds = initialSentTo.map((h) => h.hospitalId)

// // // //     // Prepare isSentTo array for the first batch
// // // //     const isSentToForAlert = initialSentTo.map((h) => ({
// // // //       hospitalId: h.hospitalId,
// // // //       status: "pending",
// // // //       sentAt: now,
// // // //     }))

// // // //     // Determine next escalation time
// // // //     const nextEscalationTime = escalationGroups.length > 1 ? new Date(now.getTime() + 3 * 60 * 1000) : null // 3 minutes later

// // // //     const alert = await EmergencyAlert.create({
// // // //       userId: decoded.userId,
// // // //       userInfo: {
// // // //         name: user.name,
// // // //         email: user.email,
// // // //         phone: user.phone,
// // // //       },
// // // //       location: {
// // // //         lat: location.lat,
// // // //         lng: location.lng,
// // // //       },
// // // //       message: message || "🚨 EMERGENCY SOS - Immediate assistance needed!",
// // // //       priority: priority || "critical",
// // // //       status: "pending",
// // // //       isSentTo: isSentToForAlert,
// // // //       contactedHospitalIds: initialContactedHospitalIds, // Initialize contacted hospitals
// // // //       nextEscalationTime: nextEscalationTime,
// // // //     })

// // // //     return NextResponse.json({
// // // //       success: true,
// // // //       message: "Alert sent to nearest hospitals. Escalation scheduled.",
// // // //       alertId: alert._id,
// // // //       initialHospitals: initialSentTo.map((h) => h.hospitalId),
// // // //     })
// // // //   } catch (error) {
// // // //     console.error("🚨 Emergency Alert Error:", error)
// // // //     return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
// // // //   }
// // // // }




// // // /// C:\Users\UDAYN\Downloads\healthcare-platform\app\api\user\emergency-alert\route.ts

// // // import { type NextRequest, NextResponse } from "next/server"
// // // import jwt from "jsonwebtoken"
// // // import dbConnect from "@/lib/mongodb"
// // // import EmergencyAlert from "@/lib/models/EmergencyAlert"
// // // import User from "@/lib/models/User"
// // // import Hospital from "@/lib/models/Hospital"
// // // import { calculateDistance } from "@/lib/utils"

// // // export async function POST(request: NextRequest) {
// // //   try {
// // //     const token = request.cookies.get("auth-token")?.value
// // //     if (!token) {
// // //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // //     }

// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
// // //     const { location, message, priority } = await request.json()

// // //     if (!location || typeof location.lat !== "number" || typeof location.lng !== "number") {
// // //       return NextResponse.json({ success: false, message: "Invalid location" }, { status: 400 })
// // //     }

// // //     await dbConnect()

// // //     const user = await User.findById(decoded.userId)
// // //     if (!user) {
// // //       return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
// // //     }

// // //     // Find all hospitals that handle emergencies, are available, and have a fixed location
// // //     const allEligibleHospitals = await Hospital.find({
// // //       isHandleEmergency: true,
// // //       isAvailable: true,
// // //       "location.lat": { $exists: true, $ne: null }, // Ensure lat exists and is not null
// // //       "location.lng": { $exists: true, $ne: null }, // Ensure lng exists and is not null
// // //     })

// // //     console.log(`[EmergencyAlert] Found ${allEligibleHospitals.length} eligible hospitals in DB.`)

// // //     const hospitalsWithDistance = allEligibleHospitals
// // //       .map((hospital) => {
// // //         const { lat, lng } = hospital.location
// // //         const distance = calculateDistance(location.lat, location.lng, lat!, lng!)
// // //         console.log(
// // //           `[EmergencyAlert] Hospital: ${hospital.name} (ID: ${hospital._id}) at (${lat}, ${lng}) is ${distance.toFixed(2)}km from user.`,
// // //         )
// // //         return { hospitalId: hospital._id, lat, lng, distance, hospitalName: hospital.name }
// // //       })
// // //       .filter((h) => h.distance <= 100) // Filter within 100km
// // //       .sort((a, b) => a.distance - b.distance) // Sort by distance

// // //     console.log(`[EmergencyAlert] After 100km filter, found ${hospitalsWithDistance.length} hospitals.`)
// // //     if (hospitalsWithDistance.length > 0) {
// // //       console.log(
// // //         `[EmergencyAlert] Nearest hospitals: ${hospitalsWithDistance.map((h) => `${h.hospitalName} (${h.distance.toFixed(2)}km)`).join(", ")}`,
// // //       )
// // //     }

// // //     if (hospitalsWithDistance.length === 0) {
// // //       // 0: No nearby hospital found within 100km
// // //       return NextResponse.json({ success: false, message: "0: No nearby hospital found within 100km" }, { status: 404 })
// // //     }

// // //     // Divide into escalation batches of 3
// // //     const escalationGroups = []
// // //     for (let i = 0; i < hospitalsWithDistance.length; i += 3) {
// // //       escalationGroups.push(hospitalsWithDistance.slice(i, i + 3))
// // //     }

// // //     const now = new Date()
// // //     const initialSentTo = escalationGroups[0] || [] // First group to be sent immediately
// // //     const initialContactedHospitalIds = initialSentTo.map((h) => h.hospitalId)

// // //     // Prepare isSentTo array for the first batch
// // //     const isSentToForAlert = initialSentTo.map((h) => ({
// // //       hospitalId: h.hospitalId,
// // //       status: "pending",
// // //       sentAt: now,
// // //     }))

// // //     // Determine next escalation time
// // //     const nextEscalationTime = escalationGroups.length > 1 ? new Date(now.getTime() + 3 * 60 * 1000) : null // 3 minutes later

// // //     const alert = await EmergencyAlert.create({
// // //       userId: decoded.userId,
// // //       userInfo: {
// // //         name: user.name,
// // //         email: user.email,
// // //         phone: user.phone,
// // //       },
// // //       location: {
// // //         lat: location.lat,
// // //         lng: location.lng,
// // //       },
// // //       message: message || "🚨 EMERGENCY SOS - Immediate assistance needed!",
// // //       priority: priority || "critical",
// // //       status: "pending",
// // //       isSentTo: isSentToForAlert,
// // //       contactedHospitalIds: initialContactedHospitalIds, // Initialize contacted hospitals
// // //       nextEscalationTime: nextEscalationTime,
// // //     })

// // //     return NextResponse.json({
// // //       success: true,
// // //       message: "Alert sent to nearest hospitals. Escalation scheduled.",
// // //       alertId: alert._id,
// // //       initialHospitals: initialSentTo.map((h) => h.hospitalId),
// // //     })
// // //   } catch (error) {
// // //     console.error("🚨 Emergency Alert Error:", error)
// // //     return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
// // //   }
// // // }


// // import { type NextRequest, NextResponse } from "next/server"
// // import jwt from "jsonwebtoken"
// // import dbConnect from "@/lib/mongodb"
// // import EmergencyAlert from "@/lib/models/EmergencyAlert"
// // import User from "@/lib/models/User"
// // import Hospital from "@/lib/models/Hospital"
// // import { calculateDistance } from "@/lib/utils"

// // export async function POST(request: NextRequest) {
// //   try {
// //     const token = request.cookies.get("auth-token")?.value
// //     if (!token) {
// //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
// //     const { location, message, priority } = await request.json()

// //     if (!location || typeof location.lat !== "number" || typeof location.lng !== "number") {
// //       return NextResponse.json({ success: false, message: "Invalid location" }, { status: 400 })
// //     }

// //     await dbConnect()

// //     const user = await User.findById(decoded.userId)
// //     if (!user) {
// //       return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
// //     }

// //     // Find all hospitals that handle emergencies, are available, and have a fixed location
// //     const allEligibleHospitals = await Hospital.find({
// //       isHandleEmergency: true,
// //       isAvailable: true,
// //       "location.lat": { $exists: true, $ne: null }, // Ensure lat exists and is not null
// //       "location.lng": { $exists: true, $ne: null }, // Ensure lng exists and is not null
// //     })

// //     console.log(`[EmergencyAlert] Found ${allEligibleHospitals.length} eligible hospitals in DB.`)

// //     const hospitalsWithDistance = allEligibleHospitals
// //       .map((hospital) => {
// //         const { lat, lng } = hospital.location
// //         const distance = calculateDistance(location.lat, location.lng, lat!, lng!)
// //         console.log(
// //           `[EmergencyAlert] Hospital: ${hospital.name} (ID: ${hospital._id}) at (${lat}, ${lng}) is ${distance.toFixed(2)}km from user.`,
// //         )
// //         return { hospitalId: hospital._id, lat, lng, distance, hospitalName: hospital.name }
// //       })
// //       .filter((h) => h.distance <= 100) // Filter within 100km
// //       .sort((a, b) => a.distance - b.distance) // Sort by distance

// //     console.log(`[EmergencyAlert] After 100km filter, found ${hospitalsWithDistance.length} hospitals.`)

// //     if (hospitalsWithDistance.length > 0) {
// //       console.log(
// //         `[EmergencyAlert] Nearest hospitals: ${hospitalsWithDistance.map((h) => `${h.hospitalName} (${h.distance.toFixed(2)}km)`).join(", ")}`,
// //       )
// //     }

// //     if (hospitalsWithDistance.length === 0) {
// //       // 0: No nearby hospital found within 100km
// //       return NextResponse.json({ success: false, message: "0: No nearby hospital found within 100km" }, { status: 404 })
// //     }

// //     // Divide into escalation batches of 3
// //     const escalationGroups = []
// //     for (let i = 0; i < hospitalsWithDistance.length; i += 3) {
// //       escalationGroups.push(hospitalsWithDistance.slice(i, i + 3))
// //     }

// //     const now = new Date()
// //     const initialSentTo = escalationGroups[0] || [] // First group to be sent immediately
// //     const initialContactedHospitalIds = initialSentTo.map((h) => h.hospitalId)

// //     // Prepare isSentTo array for the first batch
// //     const isSentToForAlert = initialSentTo.map((h) => ({
// //       hospitalId: h.hospitalId,
// //       status: "pending",
// //       sentAt: now,
// //     }))

// //     // Determine next escalation time
// //     const nextEscalationTime = escalationGroups.length > 1 ? new Date(now.getTime() + 3 * 60 * 1000) : null // 3 minutes later

// //     const alert = await EmergencyAlert.create({
// //       userId: decoded.userId,
// //       userInfo: {
// //         name: user.name,
// //         email: user.email,
// //         phone: user.phone,
// //       },
// //       location: {
// //         lat: location.lat,
// //         lng: location.lng,
// //       },
// //       message: message || "🚨 EMERGENCY SOS - Immediate assistance needed!",
// //       priority: priority || "critical",
// //       status: "pending",
// //       isSentTo: isSentToForAlert,
// //       contactedHospitalIds: initialContactedHospitalIds, // Initialize contacted hospitals
// //       nextEscalationTime: nextEscalationTime,
// //     })

// //     return NextResponse.json({
// //       success: true,
// //       message: "Alert sent to nearest hospitals. Escalation scheduled.",
// //       alertId: alert._id,
// //       initialHospitals: initialSentTo.map((h) => h.hospitalId),
// //       userInfo: {
// //         name: user.name,
// //         phone: user.phone,
// //       }, // Include user info for toast
// //     })
// //   } catch (error) {
// //     console.error("🚨 Emergency Alert Error:", error)
// //     return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
// //   }
// // }


// import { type NextRequest, NextResponse } from "next/server"
// import jwt from "jsonwebtoken"
// import dbConnect from "@/lib/mongodb"
// import EmergencyAlert from "@/lib/models/EmergencyAlert"
// import User from "@/lib/models/User"
// import Hospital from "@/lib/models/Hospital"
// import { calculateDistance } from "@/lib/utils"

// export async function POST(request: NextRequest) {
//   try {
//     const token = request.cookies.get("auth-token")?.value
//     if (!token) {
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
//     const { location, message, priority } = await request.json()

//     if (!location || typeof location.lat !== "number" || typeof location.lng !== "number") {
//       return NextResponse.json({ success: false, message: "Invalid location" }, { status: 400 })
//     }

//     await dbConnect()

//     const user = await User.findById(decoded.userId)
//     if (!user) {
//       return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
//     }

//     // Find all hospitals that handle emergencies, are available, and have a fixed location
//     const allEligibleHospitals = await Hospital.find({
//       isHandleEmergency: true,
//       isAvailable: true,
//       "location.lat": { $exists: true, $ne: null }, // Ensure lat exists and is not null
//       "location.lng": { $exists: true, $ne: null }, // Ensure lng exists and is not null
//     })

//     console.log(`[EmergencyAlert] Found ${allEligibleHospitals.length} eligible hospitals in DB.`)

//     const hospitalsWithDistance = allEligibleHospitals
//       .map((hospital) => {
//         const { lat, lng } = hospital.location
//         const distance = calculateDistance(location.lat, location.lng, lat!, lng!)
//         console.log(
//           `[EmergencyAlert] Hospital: ${hospital.name} (ID: ${hospital._id}) at (${lat}, ${lng}) is ${distance.toFixed(2)}km from user.`,
//         )
//         return { hospitalId: hospital._id, lat, lng, distance, hospitalName: hospital.name }
//       })
//       .filter((h) => h.distance <= 100) // Filter within 100km
//       .sort((a, b) => a.distance - b.distance) // Sort by distance

//     console.log(`[EmergencyAlert] After 100km filter, found ${hospitalsWithDistance.length} hospitals.`)

//     if (hospitalsWithDistance.length > 0) {
//       console.log(
//         `[EmergencyAlert] Nearest hospitals: ${hospitalsWithDistance.map((h) => `${h.hospitalName} (${h.distance.toFixed(2)}km)`).join(", ")}`,
//       )
//     }

//     if (hospitalsWithDistance.length === 0) {
//       // 0: No nearby hospital found within 100km
//       return NextResponse.json({ success: false, message: "0: No nearby hospital found within 100km" }, { status: 404 })
//     }

//     // Divide into escalation batches of 3
//     const escalationGroups = []
//     for (let i = 0; i < hospitalsWithDistance.length; i += 3) {
//       escalationGroups.push(hospitalsWithDistance.slice(i, i + 3))
//     }

//     const now = new Date()
//     const initialSentTo = escalationGroups[0] || [] // First group to be sent immediately
//     const initialContactedHospitalIds = initialSentTo.map((h) => h.hospitalId)

//     // Prepare isSentTo array for the first batch, including distance
//     const isSentToForAlert = initialSentTo.map((h) => ({
//       hospitalId: h.hospitalId,
//       status: "pending",
//       sentAt: now,
//       distance: h.distance, // Store distance here
//     }))

//     // Determine next escalation time
//     const nextEscalationTime = escalationGroups.length > 1 ? new Date(now.getTime() + 3 * 60 * 1000) : null // 3 minutes later

//     const alert = await EmergencyAlert.create({
//       userId: decoded.userId,
//       userInfo: {
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//       },
//       location: {
//         lat: location.lat,
//         lng: location.lng,
//         address: user.address, // Store user's full address
//       },
//       message: message || "🚨 EMERGENCY SOS - Immediate assistance needed!",
//       priority: priority || "critical",
//       status: "pending",
//       isSentTo: isSentToForAlert,
//       contactedHospitalIds: initialContactedHospitalIds, // Initialize contacted hospitals
//       nextEscalationTime: nextEscalationTime,
//     })

//     return NextResponse.json({
//       success: true,
//       message: "Alert sent to nearest hospitals. Escalation scheduled.",
//       alertId: alert._id,
//       initialHospitals: initialSentTo.map((h) => h.hospitalId),
//       userInfo: {
//         name: user.name,
//         phone: user.phone,
//       }, // Include user info for toast
//     })
//   } catch (error) {
//     console.error("🚨 Emergency Alert Error:", error)
//     return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
//   }
// }














import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import EmergencyAlert from "@/lib/models/EmergencyAlert"
import User from "@/lib/models/User"
import Hospital from "@/lib/models/Hospital"
import { calculateDistance } from "@/lib/utils"

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
    const { location, message, priority } = await request.json()

    if (!location || typeof location.lat !== "number" || typeof location.lng !== "number") {
      return NextResponse.json({ success: false, message: "Invalid location" }, { status: 400 })
    }

    await dbConnect()

    const user = await User.findById(decoded.userId)
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // Find all hospitals that handle emergencies, are available, and have a fixed location
    const allEligibleHospitals = await Hospital.find({
      isHandleEmergency: true,
      isAvailable: true,
      "location.lat": { $exists: true, $ne: null }, // Ensure lat exists and is not null
      "location.lng": { $exists: true, $ne: null }, // Ensure lng exists and is not null
    })

    console.log(`[EmergencyAlert] Found ${allEligibleHospitals.length} eligible hospitals in DB.`)

    const hospitalsWithDistance = allEligibleHospitals
      .map((hospital) => {
        const { lat, lng } = hospital.location
        const distance = calculateDistance(location.lat, location.lng, lat!, lng!)
        console.log(
          `[EmergencyAlert] Hospital: ${hospital.name} (ID: ${hospital._id}) at (${lat}, ${lng}) is ${distance.toFixed(2)}km from user.`,
        )
        return { hospitalId: hospital._id, lat, lng, distance, hospitalName: hospital.name }
      })
      .filter((h) => h.distance <= 100) // Filter within 100km
      .sort((a, b) => a.distance - b.distance) // Sort by distance

    console.log(`[EmergencyAlert] After 100km filter, found ${hospitalsWithDistance.length} hospitals.`)

    if (hospitalsWithDistance.length > 0) {
      console.log(
        `[EmergencyAlert] Nearest hospitals: ${hospitalsWithDistance.map((h) => `${h.hospitalName} (${h.distance.toFixed(2)}km)`).join(", ")}`,
      )
    }

    if (hospitalsWithDistance.length === 0) {
      // 0: No nearby hospital found within 100km
      return NextResponse.json({ success: false, message: "0: No nearby hospital found within 100km" }, { status: 404 })
    }

    // Divide into escalation batches of 3
    const escalationGroups = []
    for (let i = 0; i < hospitalsWithDistance.length; i += 3) {
      escalationGroups.push(hospitalsWithDistance.slice(i, i + 3))
    }

    const now = new Date()
    const initialSentTo = escalationGroups[0] || [] // First group to be sent immediately
    const initialContactedHospitalIds = initialSentTo.map((h) => h.hospitalId)

    // Prepare isSentTo array for the first batch
    const isSentToForAlert = initialSentTo.map((h) => ({
      hospitalId: h.hospitalId,
      status: "pending",
      sentAt: now,
      distance: h.distance, // Store distance for initial batch
    }))

    // Determine next escalation time
    const nextEscalationTime = escalationGroups.length > 1 ? new Date(now.getTime() + 3 * 60 * 1000) : null // 3 minutes later

    const alert = await EmergencyAlert.create({
      userId: decoded.userId,
      userInfo: {
        name: user.name,
        email: user.email,
        phone: user.phone,
      },
      location: {
        lat: location.lat,
        lng: location.lng,
        address: user.address, // Store user's full address from profile
      },
      message: message || "🚨 EMERGENCY SOS - Immediate assistance needed!",
      priority: priority || "critical",
      status: "pending",
      isSentTo: isSentToForAlert,
      contactedHospitalIds: initialContactedHospitalIds, // Initialize contacted hospitals
      nextEscalationTime: nextEscalationTime,
    })

    return NextResponse.json({
      success: true,
      message: "Alert sent to nearest hospitals. Escalation scheduled.",
      alertId: alert._id,
      initialHospitals: initialSentTo.map((h) => h.hospitalId),
      userInfo: {
        name: user.name,
        phone: user.phone,
      }, // Include user info for toast
    })
  } catch (error) {
    console.error("🚨 Emergency Alert Error:", error)
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
  }
}

