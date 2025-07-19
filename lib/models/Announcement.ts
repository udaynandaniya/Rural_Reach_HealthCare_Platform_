// // // lib/models/Announcement.ts
// // import { Schema, models, model, type Document } from "mongoose"
// // import type mongoose from "mongoose"

// // export interface IAnnouncement extends Document {
// //   ownerId: mongoose.Types.ObjectId
// //   ownerType: "doctor" | "hospital" | "user"
// //   title: string
// //   content: string
// //   readBy: mongoose.Types.ObjectId[] // Changed to ObjectId[] to store user/doctor/hospital IDs
// //   createdAt: Date
// //   updatedAt: Date
// // }

// // const AnnouncementSchema: Schema = new Schema(
// //   {
// //     title: { type: String, required: true },
// //     content: { type: String, required: true },
// //     ownerId: { type: Schema.Types.ObjectId, required: true, refPath: "ownerType" },
// //     ownerType: { type: String, enum: ["user", "doctor", "hospital"], required: true },
// //     readBy: [{ type: Schema.Types.ObjectId }], // Store ObjectIds of users/doctors/hospitals who read it
// //   },
// //   { timestamps: true },
// // )

// // const Announcement = models.Announcement || model<IAnnouncement>("Announcement", AnnouncementSchema)

// // export default Announcement

// import { Schema, models, model, type Document } from "mongoose"

// export interface IAnnouncement extends Document {
//   ownerEmail: string
//   ownerType: "doctor" | "hospital" | "user"
//   title: string
//   content: string
//   announcedBy: string
//   readBy: string[] // array of user emails
//   createdAt: Date
//   updatedAt: Date
// }

// const AnnouncementSchema: Schema = new Schema(
//   {
//     title: { type: String, required: true },
//     content: { type: String, required: true },
//     ownerEmail: { type: String, required: true },
//     ownerType: { type: String, enum: ["user", "doctor", "hospital"], required: true },
//     announcedBy: { type: String, required: true },
//     readBy: [{ type: String }], // Store emails of readers
//   },
//   { timestamps: true },
// )

// const Announcement = models.Announcement || model<IAnnouncement>("Announcement", AnnouncementSchema)
// export default Announcement

import { Schema, models, model, type Document } from "mongoose"

export interface IAnnouncement extends Document {
  ownerEmail: string // User who owns the announcement (used for access control)
  ownerType: "doctor" | "hospital" | "user"
  title: string
  content: string
  announcedBy: string // Display name of announcer (e.g., Dr. John)
  readBy: string[] // Array of user emails or IDs who read it
  createdAt: Date
  updatedAt: Date
}

const AnnouncementSchema: Schema = new Schema<IAnnouncement>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    ownerEmail: { type: String, required: true, lowercase: true, trim: true },
    ownerType: { type: String, enum: ["user", "doctor", "hospital"], required: true },
    announcedBy: { type: String, required: true, trim: true },
    readBy: [{ type: String, trim: true }],
  },
  { timestamps: true },
)

const Announcement = models.Announcement || model<IAnnouncement>("Announcement", AnnouncementSchema)
export default Announcement
