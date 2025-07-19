// // // // // // import { type NextRequest, NextResponse } from "next/server"
// // // // // // import Announcement from "@/lib/models/Announcement"
// // // // // // import connectDB from "@/lib/mongoose"
// // // // // // import { getToken } from "next-auth/jwt"
// // // // // // import mongoose from "mongoose"

// // // // // // export async function PUT(req: NextRequest) {
// // // // // //   await connectDB()

// // // // // //   try {
// // // // // //     const token = await getToken({ req })

// // // // // //     if (!token || !token.id) {
// // // // // //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // // // // //     }

// // // // // //     const { announcementId, title, content, mentions } = await req.json()

// // // // // //     if (!announcementId || !mongoose.Types.ObjectId.isValid(announcementId) || !title || !content) {
// // // // // //       return NextResponse.json(
// // // // // //         { success: false, message: "Announcement ID, title, and content are required." },
// // // // // //         { status: 400 },
// // // // // //       )
// // // // // //     }

// // // // // //     const announcement = await Announcement.findById(announcementId)

// // // // // //     if (!announcement) {
// // // // // //       return NextResponse.json({ success: false, message: "Announcement not found." }, { status: 404 })
// // // // // //     }

// // // // // //     // Ensure only the owner can edit their own announcement
// // // // // //     if (announcement.ownerId.toString() !== token.id) {
// // // // // //       return NextResponse.json(
// // // // // //         { success: false, message: "You are not authorized to edit this announcement." },
// // // // // //         { status: 403 },
// // // // // //       )
// // // // // //     }

// // // // // //     // Validate mentions structure
// // // // // //     const validMentions = mentions.filter(
// // // // // //       (m: any) =>
// // // // // //         m.id &&
// // // // // //         mongoose.Types.ObjectId.isValid(m.id) &&
// // // // // //         m.name &&
// // // // // //         m.type &&
// // // // // //         (m.type === "doctor" || m.type === "hospital") &&
// // // // // //         m.email,
// // // // // //     )

// // // // // //     announcement.title = title
// // // // // //     announcement.content = content
// // // // // //     announcement.mentions = validMentions
// // // // // //     await announcement.save()

// // // // // //     return NextResponse.json(
// // // // // //       { success: true, message: "Announcement updated successfully.", data: announcement },
// // // // // //       { status: 200 },
// // // // // //     )
// // // // // //   } catch (error) {
// // // // // //     console.error("Error editing announcement:", error)
// // // // // //     return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 })
// // // // // //   }
// // // // // // }

// // // // // import { NextResponse } from "next/server"
// // // // // import dbConnect from "@/lib/mongodb"
// // // // // import Announcement from "@/lib/models/Announcement"
// // // // // import { decrypt } from "@/lib/auth"
// // // // // import { cookies } from "next/headers"

// // // // // export async function PUT(request: Request) {
// // // // //   await dbConnect()
// // // // //   const token = cookies().get("auth-token")?.value
// // // // //   const session = await decrypt(token)

// // // // //   if (!session) {
// // // // //     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // // // //   }

// // // // //   try {
// // // // //     const { id, title, content } = await request.json() // Removed mentions from destructuring

// // // // //     if (!id || !title || !content) {
// // // // //       return NextResponse.json(
// // // // //         { success: false, message: "Announcement ID, title, and content are required." },
// // // // //         { status: 400 },
// // // // //       )
// // // // //     }

// // // // //     const announcement = await Announcement.findById(id)

// // // // //     if (!announcement) {
// // // // //       return NextResponse.json({ success: false, message: "Announcement not found." }, { status: 404 })
// // // // //     }

// // // // //     // Ensure only the owner can edit
// // // // //     if (announcement.ownerId.toString() !== session.userId) {
// // // // //       return NextResponse.json(
// // // // //         { success: false, message: "You are not authorized to edit this announcement." },
// // // // //         { status: 403 },
// // // // //       )
// // // // //     }

// // // // //     announcement.title = title
// // // // //     announcement.content = content
// // // // //     // Removed mentions update
// // // // //     announcement.updatedAt = new Date()

// // // // //     await announcement.save()

// // // // //     return NextResponse.json({ success: true, data: announcement }, { status: 200 })
// // // // //   } catch (error) {
// // // // //     console.error("Error editing announcement:", error)
// // // // //     return NextResponse.json({ success: false, message: "Failed to edit announcement." }, { status: 500 })
// // // // //   }
// // // // // }

// // // // import { type NextRequest, NextResponse } from "next/server"
// // // // import Announcement from "@/lib/models/Announcement"
// // // // import dbConnect from "@/lib/mongodb"
// // // // import { decrypt } from "@/lib/auth"
// // // // import { cookies } from "next/headers"
// // // // import mongoose from "mongoose"

// // // // export async function PUT(req: NextRequest) {
// // // //   await dbConnect()
// // // //   const token = cookies().get("auth-token")?.value
// // // //   const session = await decrypt(token)

// // // //   if (!session) {
// // // //     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // // //   }

// // // //   try {
// // // //     const { announcementId, title, content } = await req.json()

// // // //     if (!announcementId || !mongoose.Types.ObjectId.isValid(announcementId) || !title || !content) {
// // // //       return NextResponse.json(
// // // //         { success: false, message: "Announcement ID, title, and content are required." },
// // // //         { status: 400 },
// // // //       )
// // // //     }

// // // //     const announcement = await Announcement.findById(announcementId)

// // // //     if (!announcement) {
// // // //       return NextResponse.json({ success: false, message: "Announcement not found." }, { status: 404 })
// // // //     }

// // // //     // Ensure only the owner can edit their own announcement
// // // //     if (announcement.ownerId.toString() !== session.userId) {
// // // //       return NextResponse.json(
// // // //         { success: false, message: "You are not authorized to edit this announcement." },
// // // //         { status: 403 },
// // // //       )
// // // //     }

// // // //     announcement.title = title
// // // //     announcement.content = content
// // // //     await announcement.save()

// // // //     return NextResponse.json(
// // // //       { success: true, message: "Announcement updated successfully.", data: announcement },
// // // //       { status: 200 },
// // // //     )
// // // //   } catch (error) {
// // // //     console.error("Error editing announcement:", error)
// // // //     return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 })
// // // //   }
// // // // }











// // // //C:\Users\UDAYN\Downloads\healthcare-platform\app\api\announcements\edit\route.ts
// // // import { type NextRequest, NextResponse } from "next/server"
// // // import Announcement from "@/lib/models/Announcement"
// // // import dbConnect from "@/lib/mongodb"
// // // import { verifyToken } from "@/lib/auth" // Use verifyToken
// // // import { cookies } from "next/headers"
// // // import mongoose from "mongoose"

// // // export async function PUT(req: NextRequest) {
// // //   await dbConnect()
// // //   const token = cookies().get("auth-token")?.value
// // //   const session = token ? verifyToken(token) : null // Use verifyToken

// // //   if (!session) {
// // //     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// // //   }

// // //   try {
// // //     const { announcementId, title, content } = await req.json()

// // //     if (!announcementId || !mongoose.Types.ObjectId.isValid(announcementId) || !title || !content) {
// // //       return NextResponse.json(
// // //         { success: false, message: "Announcement ID, title, and content are required." },
// // //         { status: 400 },
// // //       )
// // //     }

// // //     const announcement = await Announcement.findById(announcementId)

// // //     if (!announcement) {
// // //       return NextResponse.json({ success: false, message: "Announcement not found." }, { status: 404 })
// // //     }

// // //     // Ensure only the owner can edit their own announcement
// // //     if (announcement.ownerId.toString() !== session.userId) {
// // //       return NextResponse.json(
// // //         { success: false, message: "You are not authorized to edit this announcement." },
// // //         { status: 403 },
// // //       )
// // //     }

// // //     announcement.title = title
// // //     announcement.content = content
// // //     await announcement.save()

// // //     return NextResponse.json(
// // //       { success: true, message: "Announcement updated successfully.", data: announcement },
// // //       { status: 200 },
// // //     )
// // //   } catch (error) {
// // //     console.error("Error editing announcement:", error)
// // //     return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 })
// // //   }
// // // }


// // // app/api/announcements/edit/route.ts

// // import { NextResponse } from "next/server"
// // import dbConnect from "@/lib/mongodb"
// // import Announcement from "@/lib/models/Announcement"
// // import { getSession } from "@/lib/getSession"

// // export async function PATCH(request: Request) {
// //   await dbConnect()
// //   const session = await getSession(request)

// //   if (!session || !session.email) {
// //     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// //   }

// //   try {
// //     const { id, title, content } = await request.json()

// //     if (!id || !title || !content) {
// //       return NextResponse.json(
// //         { success: false, message: "ID, title, and content are required." },
// //         { status: 400 },
// //       )
// //     }

// //     const announcement = await Announcement.findById(id)
// //     if (!announcement) {
// //       return NextResponse.json({ success: false, message: "Announcement not found." }, { status: 404 })
// //     }

// //     // Check if current user is the owner (via email)
// //     if (announcement.ownerEmail !== session.email) {
// //       return NextResponse.json(
// //         { success: false, message: "You are not authorized to edit this announcement." },
// //         { status: 403 },
// //       )
// //     }

// //     // Update and save
// //     announcement.title = title
// //     announcement.content = content
// //     await announcement.save()

// //     return NextResponse.json({ success: true, data: announcement, message: "Announcement updated." }, { status: 200 })
// //   } catch (error) {
// //     console.error("Error editing announcement:", error)
// //     return NextResponse.json({ success: false, message: "Failed to update announcement." }, { status: 500 })
// //   }
// // }

// // app/api/announcements/edit/route.ts

// import { NextResponse } from "next/server"
// import dbConnect from "@/lib/mongodb"
// import Announcement from "@/lib/models/Announcement"
// import { getSession } from "@/lib/getSession"

// export async function PATCH(request: Request) {
//   console.log("📡 [PATCH] /api/announcements/edit - Incoming request")

//   await dbConnect()
//   console.log("✅ Connected to DB")

//   const session = await getSession(request)
//   console.log("🔐 Session:", session)

//   if (!session || !session.email) {
//     console.warn("❌ Unauthorized access attempt")
//     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//   }

//   try {
//     const { id, title, content } = await request.json()
//     console.log("📥 Request data:", { id, title, content })

//     if (!id || !title || !content) {
//       console.warn("⚠️ Missing required fields")
//       return NextResponse.json(
//         { success: false, message: "ID, title, and content are required." },
//         { status: 400 },
//       )
//     }

//     const announcement = await Announcement.findById(id)
//     console.log("🔍 Found announcement:", announcement)

//     if (!announcement) {
//       console.warn("❌ Announcement not found")
//       return NextResponse.json({ success: false, message: "Announcement not found." }, { status: 404 })
//     }

//     if (announcement.ownerEmail !== session.email) {
//       console.warn("🚫 User not authorized to edit this announcement")
//       return NextResponse.json(
//         { success: false, message: "You are not authorized to edit this announcement." },
//         { status: 403 },
//       )
//     }

//     announcement.title = title
//     announcement.content = content
//     await announcement.save()

//     console.log("✅ Announcement updated successfully:", announcement)

//     return NextResponse.json({ success: true, data: announcement, message: "Announcement updated." }, { status: 200 })
//   } catch (error) {
//     console.error("🔥 Error editing announcement:", error)
//     return NextResponse.json({ success: false, message: "Failed to update announcement." }, { status: 500 })
//   }
// }




import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Announcement from "@/lib/models/Announcement"
import { getSession } from "@/lib/getSession"

export async function PATCH(request: Request) {
  console.log("🔧 PATCH /api/announcements/edit called")

  await dbConnect()
  console.log("✅ Database connected")

  const session = await getSession(request)
  console.log("🔐 Session:", session)

  if (!session || !session.email) {
    console.warn("❌ Unauthorized: No session or email")
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { id, title, content } = await request.json()
    console.log("📦 Payload received:", { id, title, content })

    if (!id || !title || !content) {
      console.warn("❌ Missing fields in payload")
      return NextResponse.json(
        { success: false, message: "ID, title, and content are required." },
        { status: 400 },
      )
    }

    const announcement = await Announcement.findById(id)
    console.log("📄 Fetched announcement:", announcement)

    if (!announcement) {
      console.warn("❌ Announcement not found")
      return NextResponse.json({ success: false, message: "Announcement not found." }, { status: 404 })
    }

    if (announcement.ownerEmail !== session.email) {
      console.warn("❌ Email mismatch: unauthorized edit attempt")
      return NextResponse.json(
        { success: false, message: "You are not authorized to edit this announcement." },
        { status: 403 },
      )
    }

    // Perform the update
    announcement.title = title
    announcement.content = content

    console.log("\n\nSending updated announcement:", announcement)

    await announcement.save()

    console.log("✅ Announcement updated successfully:", announcement)

    return NextResponse.json(
      { success: true, data: announcement, message: "Announcement updated." },
      { status: 200 },
    )
  } catch (error) {
    console.error("❌ Error editing announcement:", error)
    return NextResponse.json(
      { success: false, message: "Failed to update announcement." },
      { status: 500 },
    )
  }
}
