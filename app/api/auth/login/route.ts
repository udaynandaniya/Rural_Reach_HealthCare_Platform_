import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import User from "@/lib/models/User"
import Doctor from "@/lib/models/Doctor"
import Hospital from "@/lib/models/Hospital"
import BlockedList from "@/lib/models/BlockedList"
import AllUserContact from "@/lib/models/AllUserContact"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { email, password, role: incomingRole } = await request.json()

    // 🚫 Check if blocked
    const blockedUser = await BlockedList.findOne({ email })
    if (blockedUser) {
      return NextResponse.json(
        { success: false, message: "Access denied. Please contact admin if this is a mistake." },
        { status: 403 }
      )
    }

    // 📌 Ensure email exists in AllUserContact first
    const contact = await AllUserContact.findOne({ email })
    if (!contact) {
      return NextResponse.json(
        { success: false, message: "Account not found. Please sign up." },
        { status: 404 }
      )
    }

    // ✅ Determine role
    const role = incomingRole || contact.role

    // 🔍 Select model
    let Model
    switch (role) {
      case "user":
        Model = User
        break
      case "doctor":
        Model = Doctor
        break
      case "hospital":
        Model = Hospital
        break
      default:
        return NextResponse.json(
          { success: false, message: "Invalid role specified." },
          { status: 400 }
        )
    }

    // 🔐 Find user by email
    const user = await Model.findOne({ email })
    if (!user) {
      return NextResponse.json(
        { success: false, message: "Invalid credentials." },
        { status: 401 }
      )
    }

    // ⛔ Don't allow login if not verified
    if (user.isVerified === false) {
      return NextResponse.json(
        {
          success: false,
          message: "Account not verified. Please verify your email or contact support.",
        },
        { status: 403 }
      )
    }

    // 🔑 Validate password
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return NextResponse.json(
        { success: false, message: "Invalid email or password." },
        { status: 401 }
      )
    }

    // 👑 Check admin
    const isAdmin = email === process.env.ADMIN_EMAIL
    if (isAdmin) user.isAdmin = true

    // 🔁 Resync AllUserContact in case it was deleted
    await AllUserContact.updateOne(
      { email: user.email },
      {
        $setOnInsert: {
          email: user.email,
          phone: user.phone || null,
          role,
        },
      },
      { upsert: true }
    )

    // 🧾 Generate JWT
    const token = jwt.sign(
      {
        userId: user._id,
        email: user.email,
        role,
        name: user.name,
        phone: user.phone,
        isAdmin,
      },
      process.env.JWT_SECRET!,
      { expiresIn: "30d" }
    )

    const response = NextResponse.json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role,
        phone: user.phone,
        isAdmin,
      },
    })

    // 🍪 Set cookie
    response.cookies.set("auth-token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })

    return response
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json(
      {
        success: false,
        message: "Internal server error. Please try again later.",
      },
      { status: 500 }
    )
  }
}
