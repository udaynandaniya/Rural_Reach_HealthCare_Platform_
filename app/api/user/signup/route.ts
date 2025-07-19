
// // app/api/user/signup/route.ts
// import { type NextRequest, NextResponse } from "next/server"
// import bcrypt from "bcryptjs"
// import jwt from "jsonwebtoken"
// import dbConnect from "@/lib/mongodb"
// import User from "@/lib/models/User"
// import BlockedList from "@/lib/models/BlockedList"

// export async function POST(request: NextRequest) {
//   try {
//     await dbConnect()
//     const userData = await request.json()

//     // Check if user is blocked
//     const blockedUser = await BlockedList.findOne({
//       $or: [{ email: userData.email }, { phone: userData.phone }],
//     })

//     if (blockedUser) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Access denied. Please contact admin if this is a mistake.",
//         },
//         { status: 403 },
//       )
//     }

//     // Check if user already exists
//     let existingUser = await User.findOne({
//       $or: [{ email: userData.email }, { phone: userData.phone }],
//     })

//     // Hash password
//     const hashedPassword = await bcrypt.hash(userData.password, 12)

//     // Check if admin
//     const isAdmin = userData.email === process.env.ADMIN_EMAIL

//     // Prepare user data with address structure matching the User model
//     const userDataToSave = {
//       name: userData.name,
//       email: userData.email,
//       phone: userData.phone,
//       password: hashedPassword,
//       address: {
//         street: userData.address.street,
//         area: userData.address.area,
//         village: userData.address.village,
//         subDistrict: userData.address.subDistrict,
//         district: userData.address.district,
//         // Optional: Add geolocation if you want to implement it later
//         // geoLocation: {
//         //   lat: null,
//         //   lng: null
//         // }
//       },
//       isVerified: true,
//       isAdmin: isAdmin,
//     }

//     if (existingUser && !existingUser.isVerified) {
//       // Update existing unverified user
//       Object.assign(existingUser, userDataToSave)
//       await existingUser.save()
//       existingUser = existingUser.toObject()
//     } else if (existingUser && existingUser.isVerified) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "User already exists with this email or phone",
//         },
//         { status: 400 },
//       )
//     } else {
//       // Create new user
//       existingUser = await User.create(userDataToSave)
//     }

//     // Generate JWT token
//     const token = jwt.sign(
//       {
//         userId: existingUser._id,
//         email: existingUser.email,
//         role: "user",
//         isAdmin: isAdmin,
//       },
//       process.env.JWT_SECRET!,
//       { expiresIn: "30d" },
//     )

//     // Create response
//     const response = NextResponse.json({
//       success: true,
//       message: "Account created successfully",
//       user: {
//         id: existingUser._id,
//         name: existingUser.name,
//         email: existingUser.email,
//         role: "user",
//         isAdmin: isAdmin,
//       },
//     })

//     // Set HTTP-only cookie
//     response.cookies.set("auth-token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "strict",
//       maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
//     })

//     return response
//   } catch (error) {
//     console.error("User signup error:", error)
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Internal server error,,,,",
//       },
//       { status: 500 },
//     )
//   }
// }

import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import BlockedList from "@/lib/models/BlockedList"
import AllUserContact from "@/lib/models/AllUserContact"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const userData = await request.json()
    const { name, email, phone, password, address } = userData

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

    // Check global uniqueness
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

    // Check User collection
    let existingUser = await User.findOne({
      $or: [{ email }, { phone }],
    })

    const hashedPassword = await bcrypt.hash(password, 12)
    const isAdmin = email === process.env.ADMIN_EMAIL

    const addressToSave = {
      street: address.street,
      area: address.area,
      village: address.village,
      subDistrict: address.subDistrict,
      district: address.district,
    }

    const userDataToSave = {
      name,
      email,
      phone,
      password: hashedPassword,
      address: addressToSave,
      isVerified: true,
      isAdmin,
    }

    let isNowVerified = false

    if (existingUser && !existingUser.isVerified) {
      Object.assign(existingUser, userDataToSave)
      await existingUser.save()
      existingUser = existingUser.toObject()
      isNowVerified = true
    } else if (existingUser && existingUser.isVerified) {
      return NextResponse.json(
        {
          success: false,
          message: "User already exists with this email or phone",
        },
        { status: 400 }
      )
    } else {
      existingUser = await User.create(userDataToSave)
      isNowVerified = true
    }

    // ✅ Only save to AllUserContact if user is now verified
    if (isNowVerified) {
      try {
        await AllUserContact.create({
          email,
          phone,
          role: "user",
        })
      } catch (contactError) {
        console.warn("Could not save to AllUserContact:", contactError)
      }
    }

    // Create JWT token
    const token = jwt.sign(
      {
        userId: existingUser._id,
        email: existingUser.email,
        role: "user",
        isAdmin,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" }
    )

    const response = NextResponse.json({
      success: true,
      message: "Account created successfully",
      user: {
        id: existingUser._id,
        name: existingUser.name,
        email: existingUser.email,
        role: "user",
        isAdmin,
      },
    })

    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    })

    return response
  } catch (error) {
    console.error("User signup error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error",
      },
      { status: 500 }
    )
  }
}
