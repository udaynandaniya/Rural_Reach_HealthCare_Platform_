import { NextRequest, NextResponse } from "next/server"
import Doctor from "@/lib/models/Doctor"

import bcrypt from "bcryptjs"
import dbConnect from "@/lib/mongodb"

export async function PUT(req: NextRequest) {
  await dbConnect()

  try {
    const body = await req.json()

    const { email, name, password, specialty, address } = body

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    const doctor = await Doctor.findOne({ email })

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 })
    }

    // Update editable fields
    doctor.name = name || doctor.name
    doctor.specialty = specialty || doctor.specialty

    // If new password provided
    if (password && password.trim() !== "") {
      const salt = await bcrypt.genSalt(10)
      doctor.password = await bcrypt.hash(password, salt)
    }

    // Update address
    if (address) {
      doctor.address = {
        ...doctor.address.toObject(),
        ...address,
      }
    }

    await doctor.save()

    return NextResponse.json({ success: true, message: "Doctor profile updated" }, { status: 200 })
  } catch (error) {
    console.error("Update error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
