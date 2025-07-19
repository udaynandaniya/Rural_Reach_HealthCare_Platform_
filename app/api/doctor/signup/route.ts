import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import Doctor from "@/lib/models/Doctor"
import BlockedList from "@/lib/models/BlockedList"
import AllUserContact from "@/lib/models/AllUserContact"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const doctorData = await request.json()
    const { email, password, name, phone, specialty, address } = doctorData

    // Blocked user check
    const blockedUser = await BlockedList.findOne({
      $or: [{ email }, { phone }],
    })

    if (blockedUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Access denied. Please contact admin if this is a mistake.",
        },
        { status: 403 }
      )
    }

    // Check AllUserContact
    const existingContact = await AllUserContact.findOne({
      $or: [{ email }, { phone }],
    })

    if (existingContact) {
      return NextResponse.json(
        {
          success: false,
          message: "Email or phone already registered",
        },
        { status: 409 }
      )
    }

    let existingDoctor = await Doctor.findOne({
      $or: [{ email }, { phone }],
    })

    const hashedPassword = await bcrypt.hash(password, 12)

    const addressToSave = {
      street: address.street,
      area: address.area,
      village: address.village,
      subDistrict: address.subDistrict,
      district: address.district,
    }

    let isNowVerified = false

    if (existingDoctor && !existingDoctor.isVerified) {
      existingDoctor.name = name
      existingDoctor.phone = phone
      existingDoctor.password = hashedPassword
      existingDoctor.specialty = specialty
      existingDoctor.address = addressToSave
      existingDoctor.isVerified = true
      await existingDoctor.save()
      existingDoctor = existingDoctor.toObject()
      isNowVerified = true
    } else if (existingDoctor && existingDoctor.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Doctor already exists with this email or phone",
        },
        { status: 400 }
      )
    } else {
      existingDoctor = await Doctor.create({
        name,
        email,
        phone,
        password: hashedPassword,
        specialty,
        address: addressToSave,
        isVerified: true,
      })
      isNowVerified = true
    }

    // ✅ Only after verified
    if (isNowVerified) {
      try {
        await AllUserContact.create({ email, phone, role: "doctor" })
      } catch (contactErr) {
        console.warn("Failed to save to AllUserContact:", contactErr)
      }
    }

    const token = jwt.sign(
      {
        userId: existingDoctor._id,
        email: existingDoctor.email,
        role: "doctor",
        name: existingDoctor.name,
        isAdmin: false,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" }
    )

    const response = NextResponse.json({
      success: true,
      message: "Doctor account created successfully",
      user: {
        id: existingDoctor._id,
        name: existingDoctor.name,
        email: existingDoctor.email,
        role: "doctor",
        isAdmin: false,
      },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    return response
  } catch (error) {
    console.error("Doctor signup error:", error)
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    )
  }
}
