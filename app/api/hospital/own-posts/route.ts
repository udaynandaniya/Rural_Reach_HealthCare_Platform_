// // import { type NextRequest, NextResponse } from "next/server"
// // import jwt from "jsonwebtoken"
// // import dbConnect from "@/lib/mongodb"
// // import post from "@/lib/models/post"

// // export async function GET(request: NextRequest) {
// //   try {
// //     console.log("\n📦 Fetching own posts for hospital")
// //     const token = request.cookies.get("auth-token")?.value
// //     if (!token) {
// //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

// //     if (decoded.role !== "hospital") {
// //       return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 })
// //     }

// //     await dbConnect()
// //     const posts = await post
// //       .find({ authorId: decoded.userId, authorType: "Hospital" })
// //       .populate("mentionedId", "name")

// //     return NextResponse.json({ success: true, posts })
// //   } catch (error) {
// //     console.error("💥 Error fetching own posts:", error)
// //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// //   }
// // }

// import { type NextRequest, NextResponse } from "next/server"
// import jwt from "jsonwebtoken"
// import dbConnect from "@/lib/mongodb"
// import post from "@/lib/models/post"

// export async function GET(request: NextRequest) {
//   try {
//     // console.log("\n📦 [GET /api/hospital/own-posts] Starting fetch for hospital posts")

//     const token = request.cookies.get("auth-token")?.value
//     // console.log("🔍 Token found:", !!token)

//     if (!token) {
//       // console.warn("❌ No auth-token found in cookies")
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
//     // console.log("🔓 Decoded JWT:", decoded)

//     if (decoded.role !== "hospital") {
//       // console.warn("🚫 Access denied: Role is not hospital")
//       return NextResponse.json({ success: false, message: "Access denied" }, { status: 403 })
//     }

//     await dbConnect()
//     // console.log("🛢️ Connected to MongoDB")

//     const query = {
//       authorId: decoded.userId,
//       authorType: "Hospital",
//     }
//     // console.log("📄 Querying posts with:", query)

//     const posts = await post.find(query)
//     // console.log("✅ Posts found:", posts.length)

//     return NextResponse.json({ success: true, data: posts })
//   } catch (error) {
//     console.error("💥 Error fetching own posts:", error)
//     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
//   }
// }


// app/api/hospital/own-posts/route.ts

import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"
import dbConnect from "@/lib/mongodb"
import post from "@/lib/models/post"

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("auth-token")?.value
    if (!token) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

    if (decoded.role !== "hospital") {
      return NextResponse.json({ success: false, message: "Hospital access required" }, { status: 403 })
    }

    await dbConnect()

    const posts = await post
      .find({ email: decoded.email, authorType: "Hospital" }) // ✅ Query by email
      .sort({ createdAt: -1 })

    return NextResponse.json({ success: true, data: posts }) // ✅ Return as `data` to match frontend
  } catch (error) {
    console.error("💥 Error fetching hospital posts:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
