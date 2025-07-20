
// // // // // // // lib/models/EmergencyAlert.ts
// // // // // // import mongoose from "mongoose"

// // // // // // const emergencyAlertSchema = new mongoose.Schema({
// // // // // //   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// // // // // //   userInfo: {
// // // // // //     name: { type: String, required: true },
// // // // // //     email: { type: String, required: true },
// // // // // //     phone: { type: String, required: true },
// // // // // //   },
// // // // // //   location: {
// // // // // //     lat: { type: Number },
// // // // // //     lng: { type: Number },
// // // // // //   },
// // // // // //   message: { type: String, default: "Emergency assistance needed" },
// // // // // //   status: {
// // // // // //     type: String,
// // // // // //     enum: ["pending", "accepted", "completed", "cancelled"],
// // // // // //     default: "pending",
// // // // // //   },
// // // // // //   acceptedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
// // // // // //   deniedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "Hospital" }],
// // // // // //   isRead: { type: Boolean, default: false },
// // // // // //   priority: {
// // // // // //     type: String,
// // // // // //     enum: ["low", "medium", "high", "critical"],
// // // // // //     default: "high",
// // // // // //   },
// // // // // //   createdAt: { type: Date, default: Date.now },
// // // // // //   respondedAt: { type: Date },
// // // // // // })

// // // // // // // ✅ Default export fix here:
// // // // // // const EmergencyAlert = mongoose.models.EmergencyAlert || mongoose.model("EmergencyAlert", emergencyAlertSchema)
// // // // // // export default EmergencyAlert


























// // // // // import mongoose from "mongoose"

// // // // // const geoLocationSchema = new mongoose.Schema(
// // // // //   {
// // // // //     lat: { type: Number, required: false },
// // // // //     lng: { type: Number, required: false },
// // // // //   },
// // // // //   { _id: false },
// // // // // )

// // // // // const addressGeoLocationSchema = new mongoose.Schema(
// // // // //   {
// // // // //     street: { type: String, required: true },
// // // // //     area: { type: String, required: true },
// // // // //     village: { type: String, required: true }, // Renamed from townOrVillage
// // // // //     subDistrict: { type: String, required: true }, // Renamed from taluka
// // // // //     district: { type: String, required: true },
// // // // //     pincode: { type: String, required: true },
// // // // //     state: { type: String, required: true },
// // // // //     geoLocation: { type: geoLocationSchema, required: false }, // Optional for address
// // // // //   },
// // // // //   { _id: false },
// // // // // )

// // // // // const emergencyAlertSchema = new mongoose.Schema({
// // // // //   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// // // // //   userInfo: {
// // // // //     name: { type: String, required: true },
// // // // //     email: { type: String, required: true },
// // // // //     phone: { type: String, required: true },
// // // // //   },
// // // // //   location: {
// // // // //     // This is the live location from the user
// // // // //     lat: { type: Number, required: true },
// // // // //     lng: { type: Number, required: true },
// // // // //     address: { type: addressGeoLocationSchema, required: false }, // Optional, if reverse geocoded
// // // // //   },
// // // // //   message: { type: String, default: "Emergency assistance needed" },
// // // // //   status: {
// // // // //     type: String,
// // // // //     enum: ["pending", "accepted", "completed", "cancelled"],
// // // // //     default: "pending",
// // // // //   },
// // // // //   // This will store the hospital that accepted the alert
// // // // //   acceptedBy: {
// // // // //     _id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
// // // // //     name: { type: String },
// // // // //     phone: { type: String },
// // // // //     email: { type: String }, // Added email for consistency
// // // // //   },
// // // // //   // This array tracks which hospitals the alert was sent to and their individual status
// // // // //   isSentTo: [
// // // // //     {
// // // // //       hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
// // // // //       status: { type: String, enum: ["pending", "read", "accepted", "declined", "timedOut"], default: "pending" },
// // // // //       sentAt: { type: Date, default: Date.now },
// // // // //     },
// // // // //   ],
// // // // //   createdAt: { type: Date, default: Date.now },
// // // // //   respondedAt: { type: Date }, // When the alert was accepted/declined by a hospital
// // // // // })

// // // // // const EmergencyAlert = mongoose.models.EmergencyAlert || mongoose.model("EmergencyAlert", emergencyAlertSchema)
// // // // // export default EmergencyAlert






















// // // // import mongoose from "mongoose"

// // // // const geoLocationSchema = new mongoose.Schema(
// // // //   {
// // // //     lat: { type: Number, required: false },
// // // //     lng: { type: Number, required: false },
// // // //   },
// // // //   { _id: false },
// // // // )

// // // // const addressGeoLocationSchema = new mongoose.Schema(
// // // //   {
// // // //     street: { type: String, required: true },
// // // //     area: { type: String, required: true },
// // // //     village: { type: String, required: true }, // Renamed from townOrVillage
// // // //     subDistrict: { type: String, required: true }, // Renamed from taluka
// // // //     district: { type: String, required: true },
// // // //     pincode: { type: String, required: true },
// // // //     state: { type: String, required: true },
// // // //     geoLocation: { type: geoLocationSchema, required: false }, // Optional for address
// // // //   },
// // // //   { _id: false },
// // // // )

// // // // const emergencyAlertSchema = new mongoose.Schema({
// // // //   userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
// // // //   userInfo: {
// // // //     name: { type: String, required: true },
// // // //     email: { type: String, required: true },
// // // //     phone: { type: String, required: true },
// // // //   },
// // // //   location: {
// // // //     // This is the live location from the user
// // // //     lat: { type: Number, required: true },
// // // //     lng: { type: Number, required: true },
// // // //     address: { type: addressGeoLocationSchema, required: false }, // Optional, if reverse geocoded
// // // //   },
// // // //   message: { type: String, default: "Emergency assistance needed" },
// // // //   status: {
// // // //     type: String,
// // // //     enum: ["pending", "accepted", "completed", "cancelled"],
// // // //     default: "pending",
// // // //   },
// // // //   // This will store the hospital that accepted the alert
// // // //   acceptedBy: {
// // // //     _id: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
// // // //     name: { type: String },
// // // //     phone: { type: String },
// // // //     email: { type: String }, // Added email for consistency
// // // //   },
// // // //   // This array tracks which hospitals the alert was sent to and their individual status
// // // //   isSentTo: [
// // // //     {
// // // //       hospitalId: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", required: true },
// // // //       status: { type: String, enum: ["pending", "read", "accepted", "declined", "timedOut"], default: "pending" },
// // // //       sentAt: { type: Date, default: Date.now },
// // // //     },
// // // //   ],
// // // //   createdAt: { type: Date, default: Date.now },
// // // //   respondedAt: { type: Date }, // When the alert was accepted/declined by a hospital
// // // //   nextEscalationTime: { type: Date }, // For server-side escalation logic
// // // // })

// // // // const EmergencyAlert = mongoose.models.EmergencyAlert || mongoose.model("EmergencyAlert", emergencyAlertSchema)
// // // // export default EmergencyAlert




// // // //C:\Users\UDAYN\Downloads\healthcare-platform\lib\models\EmergencyAlert.ts

// // // import mongoose, { Schema, type Document } from "mongoose"

// // // export interface IEmergencyAlert extends Document {
// // //   userId: mongoose.Types.ObjectId
// // //   userInfo: {
// // //     name: string
// // //     email: string
// // //     phone: string
// // //   }
// // //   location: {
// // //     lat: number
// // //     lng: number
// // //     address?: {
// // //       street?: string
// // //       area?: string
// // //       townOrVillage?: string
// // //       taluka?: string
// // //       district?: string
// // //       pincode?: string
// // //       state?: string
// // //       geoLocation?: {
// // //         lat?: number
// // //         lng?: number
// // //       }
// // //     }
// // //   }
// // //   message: string
// // //   priority: "critical" | "high" | "medium" | "low"
// // //   status: "pending" | "accepted" | "declined" | "resolved" | "cancelled"
// // //   isSentTo: Array<{
// // //     hospitalId: mongoose.Types.ObjectId
// // //     status: "pending" | "accepted" | "declined"
// // //     sentAt: Date
// // //     respondedAt?: Date
// // //   }>
// // //   acceptedBy?: mongoose.Types.ObjectId // Hospital ID that accepted the alert
// // //   respondedAt?: Date
// // //   createdAt: Date
// // //   updatedAt: Date
// // //   nextEscalationTime?: Date // New field for escalation logic
// // // }

// // // const EmergencyAlertSchema: Schema = new Schema(
// // //   {
// // //     userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
// // //     userInfo: {
// // //       name: { type: String, required: true },
// // //       email: { type: String, required: true },
// // //       phone: { type: String, required: true },
// // //     },
// // //     location: {
// // //       lat: { type: Number, required: true },
// // //       lng: { type: Number, required: true },
// // //       address: {
// // //         street: { type: String },
// // //         area: { type: String },
// // //         townOrVillage: { type: String },
// // //         taluka: { type: String },
// // //         district: { type: String },
// // //         pincode: { type: String },
// // //         state: { type: String },
// // //         geoLocation: {
// // //           lat: { type: Number },
// // //           lng: { type: Number },
// // //         },
// // //       },
// // //     },
// // //     message: { type: String, required: true },
// // //     priority: { type: String, enum: ["critical", "high", "medium", "low"], default: "medium" },
// // //     status: {
// // //       type: String,
// // //       enum: ["pending", "accepted", "declined", "resolved", "cancelled"],
// // //       default: "pending",
// // //     },
// // //     isSentTo: [
// // //       {
// // //         hospitalId: { type: Schema.Types.ObjectId, ref: "Hospital", required: true },
// // //         status: { type: String, enum: ["pending", "accepted", "declined", "read"], default: "pending" },
// // //         sentAt: { type: Date, default: Date.now },
// // //         respondedAt: { type: Date },
// // //       },
// // //     ],
// // //     acceptedBy: { type: Schema.Types.ObjectId, ref: "Hospital" },
// // //     respondedAt: { type: Date },
// // //     nextEscalationTime: { type: Date }, // Added for escalation
// // //   },
// // //   { timestamps: true },
// // // )

// // // export default (mongoose.models.EmergencyAlert as mongoose.Model<IEmergencyAlert>) ||
// // //   mongoose.model<IEmergencyAlert>("EmergencyAlert", EmergencyAlertSchema)















// // // lib/models/EmergencyAlert.ts (Conceptual update)
// // import mongoose, { Schema, Document } from "mongoose"

// // interface IHospitalAlertStatus {
// //   hospitalId: mongoose.Types.ObjectId
// //   status: "pending" | "read" | "accepted" | "declined" | "timedOut"
// //   sentAt: Date // When this alert was sent to this specific hospital
// // }

// // export interface IEmergencyAlert extends Document {
// //   userId: mongoose.Types.ObjectId
// //   userInfo: {
// //     name: string
// //     email: string
// //     phone: string
// //   }
// //   location: {
// //     lat: number
// //     lng: number
// //     address?: { /* ... address fields ... */ }
// //   }
// //   message: string
// //   priority: "critical" | "high" | "medium" | "low"
// //   status: "pending" | "accepted" | "declined" | "cancelled" | "no_response_all_contacted" // Added new status
// //   isSentTo: IHospitalAlertStatus[] // Hospitals this alert has been sent to in current/past batches
// //   contactedHospitalIds: mongoose.Types.ObjectId[] // All hospitals ever contacted for this alert
// //   nextEscalationTime: Date | null // When to send to the next batch
// //   createdAt: Date
// //   updatedAt: Date
// //   acceptedBy?: {
// //     _id: mongoose.Types.ObjectId
// //     name: string
// //   }
// // }

// // const EmergencyAlertSchema: Schema = new Schema(
// //   {
// //     userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
// //     userInfo: {
// //       name: { type: String, required: true },
// //       email: { type: String, required: true },
// //       phone: { type: String, required: true },
// //     },
// //     location: {
// //       lat: { type: Number, required: true },
// //       lng: { type: Number, required: true },
// //       address: { type: Object }, // Assuming address is an object
// //     },
// //     message: { type: String, default: "🚨 EMERGENCY SOS - Immediate assistance needed!" },
// //     priority: { type: String, enum: ["critical", "high", "medium", "low"], default: "critical" },
// //     status: {
// //       type: String,
// //       enum: ["pending", "accepted", "declined", "cancelled", "no_response_all_contacted"],
// //       default: "pending",
// //     },
// //     isSentTo: [
// //       {
// //         hospitalId: { type: Schema.Types.ObjectId, ref: "Hospital", required: true },
// //         status: {
// //           type: String,
// //           enum: ["pending", "read", "accepted", "declined", "timedOut"],
// //           default: "pending",
// //         },
// //         sentAt: { type: Date, default: Date.now },
// //       },
// //     ],
// //     contactedHospitalIds: [{ type: Schema.Types.ObjectId, ref: "Hospital" }], // New field
// //     nextEscalationTime: { type: Date, default: null },
// //     acceptedBy: {
// //       _id: { type: Schema.Types.ObjectId, ref: "Hospital" },
// //       name: { type: String },
// //       phone: { type: String },
// //       distance:{type: Number}, // Optional: distance from user to hospital
// //     },
// //   },
// //   { timestamps: true },
// // )

// // const EmergencyAlert =
// //   mongoose.models.EmergencyAlert || mongoose.model<IEmergencyAlert>("EmergencyAlert", EmergencyAlertSchema)

// // export default EmergencyAlert


// import mongoose, { Schema, type Document } from "mongoose"

// interface IHospitalAlertStatus {
//   hospitalId: mongoose.Types.ObjectId
//   status: "pending" | "read" | "accepted" | "declined" | "timedOut"
//   sentAt: Date // When this alert was sent to this specific hospital
//   distance?: number // Distance to this hospital when alert was sent
// }

// export interface IEmergencyAlert extends Document {
//   userId: mongoose.Types.ObjectId
//   userInfo: {
//     name: string
//     email: string
//     phone: string
//   }
//   location: {
//     lat: number
//     lng: number
//     address?: {
//       street?: string
//       area?: string
//       townOrVillage?: string
//       taluka?: string
//       district?: string
//       pincode?: string
//       state?: string
//       geoLocation?: {
//         lat?: number
//         lng?: number
//       }
//     }
//   }
//   message: string
//   priority: "critical" | "high" | "medium" | "low"
//   status: "pending" | "accepted" | "declined" | "cancelled" | "no_response_all_contacted" // Added new status
//   isSentTo: IHospitalAlertStatus[] // Hospitals this alert has been sent to in current/past batches
//   contactedHospitalIds: mongoose.Types.ObjectId[] // All hospitals ever contacted for this alert
//   nextEscalationTime: Date | null // When to send to the next batch
//   createdAt: Date
//   updatedAt: Date
//   acceptedBy?: {
//     _id: mongoose.Types.ObjectId
//     name: string
//     phone: string
//     distance?: number // Distance from user to accepting hospital (populated on user side)
//   }
//   respondedAt?: Date // When the alert was accepted/declined
// }

// const EmergencyAlertSchema: Schema = new Schema(
//   {
//     userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
//     userInfo: {
//       name: { type: String, required: true },
//       email: { type: String, required: true },
//       phone: { type: String, required: true },
//     },
//     location: {
//       lat: { type: Number, required: true },
//       lng: { type: Number, required: true },
//       address: {
//         street: { type: String },
//         area: { type: String },
//         village: { type: String }, // Renamed from townOrVillage
//         subDistrict: { type: String }, // Renamed from taluka
//         district: { type: String },
//         pincode: { type: String },
//         state: { type: String },
//         geoLocation: {
//           lat: { type: Number },
//           lng: { type: Number },
//         },
//       },
//     },
//     message: { type: String, default: "🚨 EMERGENCY SOS - Immediate assistance needed!" },
//     priority: { type: String, enum: ["critical", "high", "medium", "low"], default: "critical" },
//     status: {
//       type: String,
//       enum: ["pending", "accepted", "declined", "cancelled", "no_response_all_contacted"],
//       default: "pending",
//     },
//     isSentTo: [
//       {
//         hospitalId: { type: Schema.Types.ObjectId, ref: "Hospital", required: true },
//         status: {
//           type: String,
//           enum: ["pending", "read", "accepted", "declined", "timedOut"],
//           default: "pending",
//         },
//         sentAt: { type: Date, default: Date.now },
//         distance: { type: Number }, // Store distance for each hospital in the sent list
//       },
//     ],
//     contactedHospitalIds: [{ type: Schema.Types.ObjectId, ref: "Hospital" }], // New field
//     nextEscalationTime: { type: Date, default: null },
//     acceptedBy: {
//       _id: { type: Schema.Types.ObjectId, ref: "Hospital" },
//       name: { type: String },
//       phone: { type: String }, // Added phone to acceptedBy
//       distance: { type: Number }, // This will be populated on the user side from isSentTo
//     },
//     respondedAt: { type: Date }, // When the alert was accepted/declined
//   },
//   { timestamps: true },
// )

// const EmergencyAlert =
//   mongoose.models.EmergencyAlert || mongoose.model<IEmergencyAlert>("EmergencyAlert", EmergencyAlertSchema)

// export default EmergencyAlert














// lib/models/EmergencyAlert.ts

import mongoose, { Schema, type Document } from "mongoose"

interface IHospitalAlertStatus {
  hospitalId: mongoose.Types.ObjectId
  status: "pending" | "read" | "accepted" | "declined" | "timedOut"
  sentAt: Date // When this alert was sent to this specific hospital
  distance?: number // Distance to this hospital when alert was sent
}

export interface IEmergencyAlert extends Document {
  userId: mongoose.Types.ObjectId
  userInfo: {
    name: string
    email: string
    phone: string
  }
  location: {
    lat: number
    lng: number
    address?: {
      street?: string
      area?: string
      village?: string // Renamed from townOrVillage
      subDistrict?: string // Renamed from taluka
      district?: string
      pincode?: string
      state?: string
      geoLocation?: {
        lat?: number
        lng?: number
      }
    }
  }
  message: string
  priority: "critical" | "high" | "medium" | "low"
  status: "pending" | "accepted" | "declined" | "cancelled" | "no_response_all_contacted" // Added new status
  isSentTo: IHospitalAlertStatus[] // Hospitals this alert has been sent to in current/past batches
  contactedHospitalIds: mongoose.Types.ObjectId[] // All hospitals ever contacted for this alert
  nextEscalationTime: Date | null // When to send to the next batch
  createdAt: Date
  updatedAt: Date
  acceptedBy?: {
    _id: mongoose.Types.ObjectId
    name: string
    phone: string
    distance?: number // Distance from user to accepting hospital
  }
  respondedAt?: Date // When the alert was accepted/declined by a hospital
}

const EmergencyAlertSchema: Schema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    userInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
    },
    location: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
      address: {
        street: { type: String },
        area: { type: String },
        village: { type: String },
        subDistrict: { type: String },
        district: { type: String },
        pincode: { type: String },
        state: { type: String },
        geoLocation: {
          lat: { type: Number },
          lng: { type: Number },
        },
      },
    },
    message: { type: String, default: "🚨 EMERGENCY SOS - Immediate assistance needed!" },
    priority: { type: String, enum: ["critical", "high", "medium", "low"], default: "critical" },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined", "cancelled", "no_response_all_contacted","completed"],
      default: "pending",
    },
    isSentTo: [
      {
        hospitalId: { type: Schema.Types.ObjectId, ref: "Hospital", required: true },
        status: {
          type: String,
          enum: ["pending", "read", "accepted", "declined", "timedOut"],
          default: "pending",
        },
        sentAt: { type: Date, default: Date.now },
        distance: { type: Number }, // Store distance for each hospital in the sent list
      },
    ],
    contactedHospitalIds: [{ type: Schema.Types.ObjectId, ref: "Hospital" }], // New field
    nextEscalationTime: { type: Date, default: null },
    acceptedBy: {
      _id: { type: Schema.Types.ObjectId, ref: "Hospital" },
      name: { type: String },
      phone: { type: String },
      distance: { type: Number }, // Store distance from user to accepting hospital
    },
    respondedAt: { type: Date }, // When the alert was accepted/declined
    completedAt: { type: Date },
  },
  { timestamps: true },
)

const EmergencyAlert =
  mongoose.models.EmergencyAlert || mongoose.model<IEmergencyAlert>("EmergencyAlert", EmergencyAlertSchema)

export default EmergencyAlert
