// // // // import { type NextRequest, NextResponse } from "next/server"
// // // // // import Announcement from "@/lib/models/Announcement"
// // // // // import connectDB from "@/lib/mongoose"
// // // // import { getToken } from "next-auth/jwt"
// // // // import mongoose from "mongoose"
// // // // import dbConnect from "@/lib/mongodb"
// // // // import Announcement from "@/lib/models/Announcement"


// // // // export async function GET(req: NextRequest) {
// // // //   await dbConnect()

// // // //   try {
// // // //     const token = await getToken({ req })

// // // //     if (!token || !token.id || !token.role) {
// // // //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // // //     }

// // // //     const ownAnnouncements = await Announcement.find({
// // // //       ownerId: new mongoose.Types.ObjectId(token.id),
// // // //       ownerType: token.role,
// // // //     })
// // // //       .sort({ createdAt: -1 })
// // // //       .lean()

// // // //     return NextResponse.json({ success: true, data: ownAnnouncements }, { status: 200 })
// // // //   } catch (error) {
// // // //     console.error("Error fetching own announcements:", error)
// // // //     return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 })
// // // //   }
// // // // }

// // // import { NextResponse } from "next/server"
// // // import dbConnect from "@/lib/mongodb"
// // // import Announcement from "@/lib/models/Announcement"
// // // import { decrypt } from "@/lib/auth"
// // // import { cookies } from "next/headers"

// // // export async function DELETE(request: Request) {
// // //   await dbConnect()
// // //   const token = cookies().get("auth-token")?.value
// // //   const session = await decrypt(token)

// // //   if (!session) {
// // //     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // //   }

// // //   try {
// // //     const { id } = await request.json()

// // //     if (!id) {
// // //       return NextResponse.json({ success: false, message: "Announcement ID is required." }, { status: 400 })
// // //     }

// // //     const announcement = await Announcement.findById(id)

// // //     if (!announcement) {
// // //       return NextResponse.json({ success: false, message: "Announcement not found." }, { status: 404 })
// // //     }

// // //     // Ensure only the owner can delete
// // //     if (announcement.ownerId.toString() !== session.userId) {
// // //       return NextResponse.json(
// // //         { success: false, message: "You are not authorized to delete this announcement." },
// // //         { status: 403 },
// // //       )
// // //     }

// // //     await Announcement.findByIdAndDelete(id)

// // //     return NextResponse.json({ success: true, message: "Announcement deleted successfully." }, { status: 200 })
// // //   } catch (error) {
// // //     console.error("Error deleting announcement:", error)
// // //     return NextResponse.json({ success: false, message: "Failed to delete announcement." }, { status: 500 })
// // //   }
// // // }


// // import { NextResponse } from "next/server"
// // import dbConnect from "@/lib/mongodb"
// // import Announcement from "@/lib/models/Announcement"
// // import { decrypt } from "@/lib/auth"
// // import { cookies } from "next/headers"

// // export async function DELETE(request: Request) {
// //   await dbConnect()
// //   const token = cookies().get("auth-token")?.value
// //   const session = await decrypt(token)

// //   if (!session) {
// //     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// //   }

// //   try {
// //     const { id } = await request.json()
// //     if (!id) {
// //       return NextResponse.json({ success: false, message: "Announcement ID is required." }, { status: 400 })
// //     }

// //     const announcement = await Announcement.findById(id)
// //     if (!announcement) {
// //       return NextResponse.json({ success: false, message: "Announcement not found." }, { status: 404 })
// //     }

// //     // Ensure only the owner can delete
// //     if (announcement.ownerId.toString() !== session.userId) {
// //       return NextResponse.json(
// //         { success: false, message: "You are not authorized to delete this announcement." },
// //         { status: 403 },
// //       )
// //     }

// //     await Announcement.findByIdAndDelete(id)
// //     return NextResponse.json({ success: true, message: "Announcement deleted successfully." }, { status: 200 })
// //   } catch (error) {
// //     console.error("Error deleting announcement:", error)
// //     return NextResponse.json({ success: false, message: "Failed to delete announcement." }, { status: 500 })
// //   }
// // }








// //C:\Users\UDAYN\Downloads\healthcare-platform\app\api\announcements\delete\route.ts

// import { NextResponse } from "next/server"
// import dbConnect from "@/lib/mongodb"
// import Announcement from "@/lib/models/Announcement"
// import { verifyToken } from "@/lib/auth" // Use verifyToken
// import { cookies } from "next/headers"

// export async function DELETE(request: Request) {
//   await dbConnect()
//   const token = cookies().get("auth-token")?.value
//   const session = token ? verifyToken(token) : null // Use verifyToken

//   if (!session) {
//     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//   }

//   try {
//     const { id } = await request.json()
//     if (!id) {
//       return NextResponse.json({ success: false, message: "Announcement ID is required." }, { status: 400 })
//     }

//     const announcement = await Announcement.findById(id)
//     if (!announcement) {
//       return NextResponse.json({ success: false, message: "Announcement not found." }, { status: 404 })
//     }

//     // Ensure only the owner can delete
//     if (announcement.ownerId.toString() !== session.userId) {
//       return NextResponse.json(
//         { success: false, message: "You are not authorized to delete this announcement." },
//         { status: 403 },
//       )
//     }

//     await Announcement.findByIdAndDelete(id)
//     return NextResponse.json({ success: true, message: "Announcement deleted successfully." }, { status: 200 })
//   } catch (error) {
//     console.error("Error deleting announcement:", error)
//     return NextResponse.json({ success: false, message: "Failed to delete announcement." }, { status: 500 })
//   }
// }


// app/api/announcements/delete/route.ts

import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Announcement from "@/lib/models/Announcement"
import { getSession } from "@/lib/getSession"

export async function DELETE(request: Request) {
  await dbConnect()
  const session = await getSession(request)

  if (!session || !session.email) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id } = await request.json()
    if (!id) {
      return NextResponse.json({ success: false, message: "Announcement ID is required." }, { status: 400 })
    }

    const announcement = await Announcement.findById(id)
    if (!announcement) {
      return NextResponse.json({ success: false, message: "Announcement not found." }, { status: 404 })
    }

    // Ensure only the owner (matched by email) can delete
    if (announcement.ownerEmail !== session.email) {
      return NextResponse.json(
        { success: false, message: "You are not authorized to delete this announcement." },
        { status: 403 },
      )
    }

    await Announcement.findByIdAndDelete(id)

    return NextResponse.json({ success: true, message: "Announcement deleted successfully." }, { status: 200 })
  } catch (error) {
    console.error("Error deleting announcement:", error)
    return NextResponse.json({ success: false, message: "Failed to delete announcement." }, { status: 500 })
  }
}
