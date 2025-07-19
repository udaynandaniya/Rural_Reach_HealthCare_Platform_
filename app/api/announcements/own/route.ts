// // // // // import { type NextRequest, NextResponse } from "next/server"


// // // // // import jwt from "jsonwebtoken"

// // // // // import mongoose from "mongoose"
// // // // // import dbConnect from "@/lib/mongodb"
// // // // // import Announcement from "@/lib/models/Announcement"


// // // // // export async function GET(req: NextRequest) {
// // // // //   await dbConnect()

// // // // //   try {
// // // // //     const token = await jwt({ req })

// // // // //     if (!token || !token.id || !token.role) {
// // // // //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // // // //     }

// // // // //     const ownAnnouncements = await Announcement.find({
// // // // //       ownerId: new mongoose.Types.ObjectId(token.id),
// // // // //       ownerType: token.role,
// // // // //     })
// // // // //       .sort({ createdAt: -1 })
// // // // //       .lean()

// // // // //     return NextResponse.json({ success: true, data: ownAnnouncements }, { status: 200 })
// // // // //   } catch (error) {
// // // // //     console.error("Error fetching own announcements:", error)
// // // // //     return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 })
// // // // //   }
// // // // // }

// // // // import { NextResponse } from "next/server"
// // // // import dbConnect from "@/lib/mongodb"
// // // // import Announcement from "@/lib/models/Announcement"
// // // // import { decrypt } from "@/lib/auth"
// // // // import { cookies } from "next/headers"

// // // // export async function GET(request: Request) {
// // // //   await dbConnect()
// // // //   const token = cookies().get("auth-token")?.value
// // // //   const session = await decrypt(token)

// // // //   if (!session) {
// // // //     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // // //   }

// // // //   try {
// // // //     const announcements = await Announcement.find({ ownerId: session.userId }).sort({ createdAt: -1 })
// // // //     return NextResponse.json({ success: true, data: announcements }, { status: 200 })
// // // //   } catch (error) {
// // // //     console.error("Error fetching own announcements:", error)
// // // //     return NextResponse.json({ success: false, message: "Failed to fetch own announcements." }, { status: 500 })
// // // //   }
// // // // }

// // // import { NextResponse } from "next/server"
// // // import dbConnect from "@/lib/mongodb"
// // // import Announcement from "@/lib/models/Announcement"
// // // import { decrypt } from "@/lib/auth"
// // // import { cookies } from "next/headers"

// // // export async function GET(request: Request) {
// // //   await dbConnect()
// // //   const token = cookies().get("auth-token")?.value
// // //   const session = await decrypt(token)

// // //   if (!session) {
// // //     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // //   }

// // //   try {
// // //     const announcements = await Announcement.find({ ownerId: session.userId }).sort({ createdAt: -1 })
// // //     return NextResponse.json({ success: true, data: announcements }, { status: 200 })
// // //   } catch (error) {
// // //     console.error("Error fetching own announcements:", error)
// // //     return NextResponse.json({ success: false, message: "Failed to fetch own announcements." }, { status: 500 })
// // //   }
// // // }


// // import { type NextRequest, NextResponse } from "next/server"
// // import Announcement from "@/lib/models/Announcement"
// // import dbConnect from "@/lib/mongodb"
// // import { decrypt } from "@/lib/auth"
// // import { cookies } from "next/headers"
// // import mongoose from "mongoose"

// // export async function GET(req: NextRequest) {
// //   await dbConnect()
// //   const token = cookies().get("auth-token")?.value
// //   const session = await decrypt(token)

// //   if (!session || !session.userId || !session.role) {
// //     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// //   }

// //   try {
// //     const ownAnnouncements = await Announcement.find({
// //       ownerId: new mongoose.Types.ObjectId(session.userId),
// //       ownerType: session.role,
// //     })
// //       .sort({ createdAt: -1 })
// //       .lean()

// //     return NextResponse.json({ success: true, data: ownAnnouncements }, { status: 200 })
// //   } catch (error) {
// //     console.error("Error fetching own announcements:", error)
// //     return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 })
// //   }
// // }





// //C:\Users\UDAYN\Downloads\healthcare-platform\app\api\announcements\own\route.ts
// import { type NextRequest, NextResponse } from "next/server"
// import Announcement from "@/lib/models/Announcement"
// import dbConnect from "@/lib/mongodb"
// import { verifyToken } from "@/lib/auth" // Use verifyToken
// import { cookies } from "next/headers"
// import mongoose from "mongoose"

// export async function GET(req: NextRequest) {
//   await dbConnect()
//   const cookieStore = await cookies()
// const token = cookieStore.get("auth-token")?.value

//   const session = token ? verifyToken(token) : null // Use verifyToken

//   if (!session || !session.userId || !session.role) {
//     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//   }

//   try {
//     const ownAnnouncements = await Announcement.find({
//       ownerId: new mongoose.Types.ObjectId(session.userId),
//       ownerType: session.role,
//     })
//       .sort({ createdAt: -1 })
//       .lean()

//     return NextResponse.json({ success: true, data: ownAnnouncements }, { status: 200 })
//   } catch (error) {
//     console.error("Error fetching own announcements:", error)
//     return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 })
//   }
// }

// app/api/announcements/own/route.ts

import { type NextRequest, NextResponse } from "next/server"
import Announcement from "@/lib/models/Announcement"
import dbConnect from "@/lib/mongodb"
import { getSession } from "@/lib/getSession"

export async function GET(req: NextRequest) {
  await dbConnect()
  const session = await getSession(req)

  if (!session || !session.email || !session.role) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const ownAnnouncements = await Announcement.find({
      ownerEmail: session.email,
      ownerType: session.role,
    })
      .sort({ createdAt: -1 })
      .lean()

    return NextResponse.json({ success: true, data: ownAnnouncements }, { status: 200 })
  } catch (error) {
    console.error("Error fetching own announcements:", error)
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 })
  }
}
