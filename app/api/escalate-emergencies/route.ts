// // import { type NextRequest, NextResponse } from "next/server"
// // import dbConnect from "@/lib/mongodb"
// // import EmergencyAlert from "@/lib/models/EmergencyAlert"
// // import Hospital from "@/lib/models/Hospital"
// // import { calculateDistance } from "@/lib/utils"

// // // This route is intended to be called by a cron job (e.g., Vercel Cron Jobs)
// // // to periodically check and escalate emergency alerts.
// // export async function GET(request: NextRequest) {
// //   try {
// //     await dbConnect()
// //     const now = new Date()

// //     // Find alerts that are pending, not accepted/cancelled, and due for escalation
// //     const alertsToEscalate = await EmergencyAlert.find({
// //       status: { $nin: ["accepted", "cancelled", "no_response_all_contacted"] }, // Exclude new status
// //       nextEscalationTime: { $lte: now },
// //       nextEscalationTime: { $ne: null }, // Ensure it's explicitly set for escalation
// //     })

// //     if (alertsToEscalate.length === 0) {
// //       console.log("No emergency alerts due for escalation.")
// //       return NextResponse.json({ success: true, message: "No alerts to escalate." })
// //     }

// //     console.log(`Found ${alertsToEscalate.length} alert(s) to escalate.`)

// //     for (const alert of alertsToEscalate) {
// //       console.log(`Processing alert ID: ${alert._id}`)

// //       // Get all eligible hospitals within 50km
// //       const allEligibleHospitals = await Hospital.find({
// //         isHandleEmergency: true,
// //         isAvailable: true,
// //         "location.lat": { $exists: true },
// //         "location.lng": { $exists: true },
// //       })

// //       const hospitalsWithin50Km = allEligibleHospitals
// //         .map((hospital) => {
// //           const { lat, lng } = hospital.location
// //           const distance = calculateDistance(alert.location.lat, alert.location.lng, lat!, lng!)
// //           return { hospitalId: hospital._id, lat, lng, distance, hospitalName: hospital.name }
// //         })
// //         .filter((h) => h.distance <= 50)
// //         .sort((a, b) => a.distance - b.distance)

// //       // Filter out hospitals that have already been contacted for this alert
// //       const alreadyContactedIds = alert.contactedHospitalIds.map((id) => id.toString())
// //       const uncontactedHospitals = hospitalsWithin50Km.filter(
// //         (h) => !alreadyContactedIds.includes(h.hospitalId.toString()),
// //       )

// //       // Select the next 3 closest uncontacted hospitals
// //       const nextBatch = uncontactedHospitals.slice(0, 3)

// //       if (nextBatch.length > 0) {
// //         // Add new hospitals to isSentTo and contactedHospitalIds
// //         const newSentToEntries = nextBatch.map((h) => ({
// //           hospitalId: h.hospitalId,
// //           status: "pending",
// //           sentAt: now,
// //         }))

// //         alert.isSentTo.push(...newSentToEntries)
// //         alert.contactedHospitalIds.push(...nextBatch.map((h) => h.hospitalId))

// //         // Schedule next escalation if there are more uncontacted hospitals
// //         const remainingUncontacted = uncontactedHospitals.slice(3)
// //         if (remainingUncontacted.length > 0) {
// //           alert.nextEscalationTime = new Date(now.getTime() + 3 * 60 * 1000) // Schedule 3 minutes later
// //           console.log(
// //             `Alert ${alert._id}: Sent to ${nextBatch.length} new hospitals. Next escalation scheduled for ${alert.nextEscalationTime}.`,
// //           )
// //         } else {
// //           alert.nextEscalationTime = null // No more hospitals to escalate to
// //           console.log(`Alert ${alert._id}: All nearby hospitals contacted. No further escalation.`)
// //         }
// //       } else {
// //         // No more uncontacted hospitals within 50km
// //         alert.nextEscalationTime = null // Stop escalation

// //         // If the alert is still pending, mark it as "no_response_all_contacted"
// //         if (alert.status === "pending") {
// //           alert.status = "no_response_all_contacted"
// //           console.log(
// //             `Alert ${alert._id}: No more uncontacted hospitals within 50km. Status updated to 'no_response_all_contacted'.`,
// //           )
// //           // TODO: Implement user notification here (e.g., push notification, email, SMS)
// //           // Example: sendNotificationToUser(alert.userId, "No hospital ready to accept emergency within 50km.");
// //         } else {
// //           console.log(`Alert ${alert._id}: No more uncontacted hospitals, but status is not pending.`)
// //         }
// //       }
// //       await alert.save()
// //     }

// //     return NextResponse.json({ success: true, message: "Emergency escalation process completed." })
// //   } catch (error) {
// //     console.error("🚨 Error during emergency escalation:", error)
// //     return NextResponse.json({ success: false, message: "Internal Server Error during escalation." }, { status: 500 })
// //   }
// // }






// import { type NextRequest, NextResponse } from "next/server"
// import dbConnect from "@/lib/mongodb"
// import EmergencyAlert from "@/lib/models/EmergencyAlert"
// import Hospital from "@/lib/models/Hospital"
// import { calculateDistance } from "@/lib/utils"

// // This route is intended to be called by a cron job (e.g., Vercel Cron Jobs)
// // to periodically check and escalate emergency alerts.
// export async function GET(request: NextRequest) {
//   try {
//     await dbConnect()
//     const now = new Date()

//     // Find alerts that are pending, not accepted/cancelled, and due for escalation
//     const alertsToEscalate = await EmergencyAlert.find({
//       status: { $nin: ["accepted", "cancelled", "no_response_all_contacted"] }, // Exclude new status
//       nextEscalationTime: { $lte: now },
//       nextEscalationTime: { $ne: null }, // Ensure it's explicitly set for escalation
//     })

//     if (alertsToEscalate.length === 0) {
//       console.log("No emergency alerts due for escalation.")
//       return NextResponse.json({ success: true, message: "No alerts to escalate." })
//     }

//     console.log(`Found ${alertsToEscalate.length} alert(s) to escalate.`)

//     for (const alert of alertsToEscalate) {
//       console.log(`Processing alert ID: ${alert._id}`)

//       // Get all eligible hospitals within 50km
//       const allEligibleHospitals = await Hospital.find({
//         isHandleEmergency: true,
//         isAvailable: true,
//         "location.lat": { $exists: true },
//         "location.lng": { $exists: true },
//       })

//       const hospitalsWithin50Km = allEligibleHospitals
//         .map((hospital) => {
//           const { lat, lng } = hospital.location
//           const distance = calculateDistance(alert.location.lat, alert.location.lng, lat!, lng!)
//           return { hospitalId: hospital._id, lat, lng, distance, hospitalName: hospital.name }
//         })
//         .filter((h) => h.distance <= 50)
//         .sort((a, b) => a.distance - b.distance)

//       // Filter out hospitals that have already been contacted for this alert
//       const alreadyContactedIds = alert.contactedHospitalIds.map((id) => id.toString())
//       const uncontactedHospitals = hospitalsWithin50Km.filter(
//         (h) => !alreadyContactedIds.includes(h.hospitalId.toString()),
//       )

//       // Select the next 3 closest uncontacted hospitals
//       const nextBatch = uncontactedHospitals.slice(0, 3)

//       if (nextBatch.length > 0) {
//         // Add new hospitals to isSentTo and contactedHospitalIds
//         const newSentToEntries = nextBatch.map((h) => ({
//           hospitalId: h.hospitalId,
//           status: "pending",
//           sentAt: now,
//         }))

//         alert.isSentTo.push(...newSentToEntries)
//         alert.contactedHospitalIds.push(...nextBatch.map((h) => h.hospitalId))

//         // Schedule next escalation if there are more uncontacted hospitals
//         const remainingUncontacted = uncontactedHospitals.slice(3)
//         if (remainingUncontacted.length > 0) {
//           alert.nextEscalationTime = new Date(now.getTime() + 3 * 60 * 1000) // Schedule 3 minutes later
//           console.log(
//             `Alert ${alert._id}: Sent to ${nextBatch.length} new hospitals. Next escalation scheduled for ${alert.nextEscalationTime}.`,
//           )
//         } else {
//           alert.nextEscalationTime = null // No more hospitals to escalate to
//           console.log(`Alert ${alert._id}: All nearby hospitals contacted. No further escalation.`)
//         }
//       } else {
//         // No more uncontacted hospitals within 50km
//         alert.nextEscalationTime = null // Stop escalation

//         // If the alert is still pending, mark it as "no_response_all_contacted"
//         if (alert.status === "pending") {
//           alert.status = "no_response_all_contacted"
//           console.log(
//             `01: Alert ${alert._id}: No hospital ready to accept emergency within 50km. Status updated to 'no_response_all_contacted'.`,
//           )
//           // TODO: Implement user notification here (e.g., push notification, email, SMS)
//           // The user's dashboard would need to poll for this status change and display a toast.
//         } else {
//           console.log(`Alert ${alert._id}: No more uncontacted hospitals, but status is not pending.`)
//         }
//       }
//       await alert.save()
//     }

//     return NextResponse.json({ success: true, message: "Emergency escalation process completed." })
//   } catch (error) {
//     console.error("🚨 Error during emergency escalation:", error)
//     return NextResponse.json({ success: false, message: "Internal Server Error during escalation." }, { status: 500 })
//   }
// }










import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import EmergencyAlert from "@/lib/models/EmergencyAlert"
import Hospital from "@/lib/models/Hospital"
import { calculateDistance } from "@/lib/utils"

// This route is intended to be called by a cron job (e.g., Vercel Cron Jobs)
// to periodically check and escalate emergency alerts.
export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const now = new Date()

    // Find alerts that are pending, not accepted/cancelled, and due for escalation
    const alertsToEscalate = await EmergencyAlert.find({
      status: { $nin: ["accepted", "cancelled", "no_response_all_contacted"] }, // Exclude new status
      nextEscalationTime: { $lte: now },
      nextEscalationTime: { $ne: null }, // Ensure it's explicitly set for escalation
    })

    if (alertsToEscalate.length === 0) {
      console.log("No emergency alerts due for escalation.")
      return NextResponse.json({ success: true, message: "No alerts to escalate." })
    }

    console.log(`Found ${alertsToEscalate.length} alert(s) to escalate.`)

    for (const alert of alertsToEscalate) {
      console.log(`Processing alert ID: ${alert._id}`)

      // Get all eligible hospitals within 50km
      const allEligibleHospitals = await Hospital.find({
        isHandleEmergency: true,
        isAvailable: true,
        "location.lat": { $exists: true, $ne: null },
        "location.lng": { $exists: true, $ne: null },
      })

      const hospitalsWithin100Km = allEligibleHospitals
        .map((hospital) => {
          const { lat, lng } = hospital.location
          const distance = calculateDistance(alert.location.lat, alert.location.lng, lat!, lng!)
          return { hospitalId: hospital._id, lat, lng, distance, hospitalName: hospital.name }
        })
        .filter((h) => h.distance <= 100)
        .sort((a, b) => a.distance - b.distance)

      // Filter out hospitals that have already been contacted for this alert
      const alreadyContactedIds = alert.contactedHospitalIds.map((id) => id.toString())
      const uncontactedHospitals = hospitalsWithin100Km.filter(
        (h) => !alreadyContactedIds.includes(h.hospitalId.toString()),
      )

      // Select the next 3 closest uncontacted hospitals
      const nextBatch = uncontactedHospitals.slice(0, 3)

      if (nextBatch.length > 0) {
        // Add new hospitals to isSentTo and contactedHospitalIds
        const newSentToEntries = nextBatch.map((h) => ({
          hospitalId: h.hospitalId,
          status: "pending",
          sentAt: now,
        }))

        alert.isSentTo.push(...newSentToEntries)
        alert.contactedHospitalIds.push(...nextBatch.map((h) => h.hospitalId))

        // Schedule next escalation if there are more uncontacted hospitals
        const remainingUncontacted = uncontactedHospitals.slice(3)
        if (remainingUncontacted.length > 0) {
          alert.nextEscalationTime = new Date(now.getTime() + 3 * 60 * 1000) // Schedule 3 minutes later
          console.log(
            `Alert ${alert._id}: Sent to ${nextBatch.length} new hospitals. Next escalation scheduled for ${alert.nextEscalationTime}.`,
          )
        } else {
          alert.nextEscalationTime = null // No more hospitals to escalate to
          console.log(`Alert ${alert._id}: All nearby hospitals contacted. No further escalation.`)
        }
      } else {
        // No more uncontacted hospitals within 50km
        alert.nextEscalationTime = null // Stop escalation

        // If the alert is still pending, mark it as "no_response_all_contacted"
        if (alert.status === "pending") {
          alert.status = "no_response_all_contacted"
          console.log(
            `01: Alert ${alert._id}: No hospital ready to accept emergency within 100km. Status updated to 'no_response_all_contacted'.`,
          )
          // TODO: Implement user notification here (e.g., push notification, email, SMS)
          // The user's dashboard would need to poll for this status change and display a toast.
        } else {
          console.log(`Alert ${alert._id}: No more uncontacted hospitals, but status is not pending.`)
        }
      }
      await alert.save()
    }

    return NextResponse.json({ success: true, message: "Emergency escalation process completed." })
  } catch (error) {
    console.error("🚨 Error during emergency escalation:", error)
    return NextResponse.json({ success: false, message: "Internal Server Error during escalation." }, { status: 500 })
  }
}




