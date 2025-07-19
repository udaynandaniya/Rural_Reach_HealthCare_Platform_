import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import Hospital from "@/lib/models/Hospital"
import BlockedList from "@/lib/models/BlockedList"
import AllUserContact from "@/lib/models/AllUserContact."


export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const hospitalData = await request.json()
    const { email, password, name, phone, isHandleEmergency, address } = hospitalData

    // Check blocklist
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

    // Check contact uniqueness
    const existingContact = await AllUserContact.findOne({
      $or: [{ email }, { phone }],
    })

    if (existingContact) {
      return NextResponse.json(
        {
          success: false,
          message: "Email or phone already registered.",
        },
        { status: 409 }
      )
    }

    // Check if hospital already exists
    let existingHospital = await Hospital.findOne({
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

    if (existingHospital && !existingHospital.isVerified) {
      // Update unverified hospital
      existingHospital.name = name
      existingHospital.phone = phone
      existingHospital.password = hashedPassword
      existingHospital.isHandleEmergency = isHandleEmergency
      existingHospital.address = addressToSave
      existingHospital.isVerified = true
      await existingHospital.save()
      existingHospital = existingHospital.toObject()
      isNowVerified = true
    } else if (existingHospital && existingHospital.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "Hospital already exists with this email or phone.",
        },
        { status: 400 }
      )
    } else {
      // Create new hospital
      existingHospital = await Hospital.create({
        name,
        email,
        phone,
        password: hashedPassword,
        isHandleEmergency,
        address: addressToSave,
        isVerified: true,
      })
      isNowVerified = true
    }

    // ✅ Only save to AllUserContact if verified
    if (isNowVerified) {
      try {
        await AllUserContact.create({
          email,
          phone,
          role: "hospital",
        })
      } catch (contactError) {
        console.warn("Warning: Could not create AllUserContact entry.", contactError)
      }
    }

    // JWT token
    const token = jwt.sign(
      {
        userId: existingHospital._id,
        email: existingHospital.email,
        role: "hospital",
        name: existingHospital.name,
        isAdmin: false,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" }
    )

    const response = NextResponse.json({
      success: true,
      message: "Hospital account created successfully",
      user: {
        id: existingHospital._id,
        name: existingHospital.name,
        email: existingHospital.email,
        role: "hospital",
        isAdmin: false,
      },
    })

    // Set auth cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    return response
  } catch (error) {
    console.error("Hospital signup error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    )
  }
}
