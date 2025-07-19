// //C:\Users\UDAYN\Downloads\healthcare-platform\lib\models\post.ts

// import mongoose from "mongoose"

// const postSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   content: { type: String, required: true },
//   authorType: { type: String, required: true, enum: ["Doctor", "Hospital"] },
//   category: { type: String, required: true },
//   tags: [{ type: String }],
//   postby: { type: String, required: false},
//   email: { type: String, required: true }, 
//   isApproved: { type: Boolean, default: true },
//   createdAt: { type: Date, default: Date.now },
// })

// export default mongoose.models.Post || mongoose.model("Post", postSchema)


// lib/models/post.ts

import mongoose, { Schema, models, model } from "mongoose"

const postSchema = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  authorType: { type: String, required: true, enum: ["Doctor", "Hospital"] },
  category: { type: String, required: true },
  tags: [{ type: String }],
  postby: { type: String },
  email: { type: String, required: true },
  isApproved: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
})

// 🧼 Fix the cached model issue
export default models?.Post || model("Post", postSchema)
