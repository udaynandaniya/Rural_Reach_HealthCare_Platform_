


// // import { type NextRequest, NextResponse } from "next/server"
// // import jwt from "jsonwebtoken"
// // import dbConnect from "@/lib/mongodb"
// // import post from "@/lib/models/post"

// // export async function POST(request: NextRequest) {
// //   try {
// //     const token = request.cookies.get("auth-token")?.value

// //     if (!token) {
// //       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
// //     }

// //     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any

// //     if (decoded.role !== "hospital") {
// //       return NextResponse.json({ success: false, message: "Hospital access required" }, { status: 403 })
// //     }

// //     const { title, content, category, tags, mentionedDoctor } = await request.json()

// //     await dbConnect()

// //     const Post = await post.create({
// //       title,
// //       content,
// //       category,
// //       tags,
// //       authorId: decoded.userId,
// //       authorType: "Hospital",
// //       mentionedId: mentionedDoctor || null,
// //       mentionedType: mentionedDoctor ? "Doctor" : null,
// //       isApproved: false,
// //     })

// //     return NextResponse.json({ success: true, data: Post })
// //   } catch (error) {
// //     console.error("Error creating hospital post:", error)
// //     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
// //   }
// // }



// //C:\Users\UDAYN\Downloads\healthcare-platform\app\api\hospital\create-post\route.ts
// import { type NextRequest, NextResponse } from "next/server"
// import jwt from "jsonwebtoken"
// import dbConnect from "@/lib/mongodb"
// import post from "@/lib/models/post"

// export async function POST(request: NextRequest) {
//   try {
//     //console.log("📥 Incoming request to create hospital post")

//     const token = request.cookies.get("auth-token")?.value
//     //console.log("🔐 Extracted token:", token ? "✅ Present" : "❌ Missing")

//     if (!token) {
//       console.warn("❌ Unauthorized: No token provided")
//       return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any
//     //console.log("👤 Decoded JWT:", decoded)

//     if (decoded.role !== "hospital") {
//       console.warn("🚫 Access denied: Not a hospital")
//       return NextResponse.json({ success: false, message: "Hospital access required" }, { status: 403 })
//     }

//     const { title, content, category, tags, mentionedDoctor } = await request.json()
//     //console.log("📝 Post data received:", { title, content, category, tags, mentionedDoctor })

//     await dbConnect()
//     //console.log("✅ Connected to MongoDB")

//    const newPost = await post.create({
//        title,
//        content,
//        category,
//        tags,
//        postby: session.name,
//        email: session.email,
//        authorType: "Doctor",
//        mentionedId: null,
//        mentionedType: null,
//        isApproved: true,
//      })


//     //console.log("✅ Post created successfully:", Post._id)

//     return NextResponse.json({ success: true, data: Post })
//   } catch (error) {
//     console.error("💥 Error creating hospital post:", error)
//     return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
//   }
// }


// app/api/hospital/create-post/route.ts
import { NextResponse } from "next/server"
import post from "@/lib/models/post"
import { getSession } from "@/lib/getSession"

export async function POST(req: Request) {
  try {
    const session = await getSession(req)




    // console.log("\n\n🏥 Creating post for hospital session:", session)

    

    if (!session) {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
    }

    if (session.role !== "hospital") {
      return NextResponse.json({ success: false, message: "Forbidden: Not a hospital" }, { status: 403 })
    }

    const body = await req.json()
    const { title, content, category, tags, mentionedDoctor } = body

    if (!title || !content || !category || !tags) {
      return NextResponse.json({ success: false, message: "Missing required fields" }, { status: 400 })
    }

    // console.log("🏥 Creating post for hospital session:", session)

    const newPost = await post.create({
      title,
      content,
      category,
      tags,
      postby: session.name,
      email: session.email,
      authorType: "Hospital",
      mentionedId: mentionedDoctor || null,
      mentionedType: mentionedDoctor ? "Doctor" : null,
      isApproved: true,
    })

    return NextResponse.json({ success: true, data: newPost }, { status: 201 })

  } catch (error) {
    console.error("💥 [HOSPITAL_CREATE_POST_ERROR]:", error)
    return NextResponse.json({ success: false, message: "Internal server error" }, { status: 500 })
  }
}
