// // import { NextResponse } from "next/server"
// // import dbConnect from "@/lib/mongodb"
// // import Announcement from "@/lib/models/Announcement"
// // import { decrypt } from "@/lib/auth"
// // import { cookies } from "next/headers"

// // export async function POST(request: Request) {
// //   await dbConnect()
// //   const token = cookies().get("auth-token")?.value
// //   const session = await decrypt(token)

// //   if (!session) {
// //     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// //   }

// //   try {
// //     const { title, content, ownerType } = await request.json()

// //     if (!title || !content || !ownerType) {
// //       return NextResponse.json(
// //         { success: false, message: "Title, content, and ownerType are required." },
// //         { status: 400 },
// //       )
// //     }

// //     // Ensure the ownerType matches the session role for security
// //     if (session.role !== ownerType) {
// //       return NextResponse.json(
// //         { success: false, message: "Unauthorized: ownerType does not match session role." },
// //         { status: 403 },
// //       )
// //     }

// //     const newAnnouncement = new Announcement({
// //       title,
// //       content,
// //       ownerId: session.userId,
// //       ownerType,
// //       readBy: [session.userId], // Owner has read their own announcement
// //     })

// //     await newAnnouncement.save()

// //     return NextResponse.json({ success: true, data: newAnnouncement }, { status: 201 })
// //   } catch (error) {
// //     console.error("Error creating announcement:", error)
// //     return NextResponse.json({ success: false, message: "Failed to create announcement." }, { status: 500 })
// //   }
// // }


// import { NextResponse } from "next/server"
// import dbConnect from "@/lib/mongodb"
// import Announcement from "@/lib/models/Announcement"
// import { verifyToken } from "@/lib/auth" // Use verifyToken
// import { cookies } from "next/headers"

// export async function POST(request: Request) {
//   await dbConnect()
//   const token = cookies().get("auth-token")?.value
//   const session = token ? verifyToken(token) : null // Use verifyToken

//   if (!session) {
//     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//   }

//   try {
//     const { title, content, ownerType } = await request.json()

//     if (!title || !content || !ownerType) {
//       return NextResponse.json(
//         { success: false, message: "Title, content, and ownerType are required." },
//         { status: 400 },
//       )
//     }

//     // Ensure the ownerType matches the session role for security
//     if (session.role !== ownerType) {
//       return NextResponse.json(
//         { success: false, message: "Unauthorized: ownerType does not match session role." },
//         { status: 403 },
//       )
//     }

//     const newAnnouncement = new Announcement({
//       title,
//       content,
//       ownerId: session.userId,
//       ownerType,
//       readBy: [session.userId], // Owner has read their own announcement
//     })

//     await newAnnouncement.save()

//     return NextResponse.json({ success: true, data: newAnnouncement }, { status: 201 })
//   } catch (error) {
//     console.error("Error creating announcement:", error)
//     return NextResponse.json({ success: false, message: "Failed to create announcement." }, { status: 500 })
//   }
// }

// app/api/announcements/route.ts

import { NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Announcement from "@/lib/models/Announcement"
import { getSession } from "@/lib/getSession"

export async function POST(request: Request) {
  await dbConnect()

  const session = await getSession(request)

  if (!session || !session.email || !session.role) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  try {
    const { title, content, ownerType } = await request.json()

    if (!title || !content || !ownerType) {
      return NextResponse.json(
        { success: false, message: "Title, content, and ownerType are required." },
        { status: 400 },
      )
    }

    if (session.role !== ownerType) {
      return NextResponse.json(
        { success: false, message: "Unauthorized: ownerType does not match session role." },
        { status: 403 },
      )
    }

    const newAnnouncement = new Announcement({
      title,
      content,
      ownerEmail: session.email,
      ownerType,
      announcedBy: session.name || session.email,
      readBy: [session.email],
    })

    await newAnnouncement.save()

    return NextResponse.json({ success: true, data: newAnnouncement }, { status: 201 })
  } catch (error) {
    console.error("❌ Error creating announcement:", error)
    return NextResponse.json(
      { success: false, message: "Failed to create announcement." },
      { status: 500 },
    )
  }
}
