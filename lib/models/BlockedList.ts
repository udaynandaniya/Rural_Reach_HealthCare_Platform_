// lib/models/BlockedList.ts
import mongoose from "mongoose"

const blockedListSchema = new mongoose.Schema({
  email: { type: String, required: true },
  phone: { type: String, required: true },
  reason: { type: String, required: true },
  role: { type: String, required: true },
  addedAt: { type: Date, default: Date.now },
})

export default mongoose.models.BlockedList || mongoose.model("BlockedList", blockedListSchema)
