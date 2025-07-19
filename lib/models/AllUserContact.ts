// lib/models/AllUserContact.ts
import mongoose from "mongoose"

const AllUserContactSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true, unique: true },
    role: { type: String, enum: ["user", "doctor", "hospital", "admin"], required: true },
  },
  { timestamps: true },
)

export default mongoose.models.AllUserContact ||
  mongoose.model("AllUserContact", AllUserContactSchema)
