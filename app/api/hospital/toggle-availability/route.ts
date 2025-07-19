// // // //C:\Users\UDAYN\Downloads\healthcare-platform\app\api\hospital\toggle-availability.ts\route.ts

// // // import type { NextApiRequest, NextApiResponse } from "next"
// // // import Hospital from "@/lib/models/Hospital"
// // // // import { getSession } from "next-auth/react" // Assuming you're using NextAuth
// // // import dbConnect from "@/lib/mongodb"
// // // import SessionStatus from "@/components/SessionStatus"
// // // export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// // //   if (req.method !== "POST") {
// // //     return res.status(405).json({ message: "Method Not Allowed" })
// // //   }

// // //   try {s
// // //     await dbConnect()

// // //     const session = await SessionStatus({ req })

// // //     if (!session || session.user.role !== "hospital") {
// // //       return res.status(401).json({ message: "Unauthorized" })
// // //     }

// // //     // Assuming `email` is stored in session.user
// // //     const hospital = await Hospital.findOne({ email: session.user.email })

// // //     if (!hospital) {
// // //       return res.status(404).json({ message: "Hospital not found" })
// // //     }

// // //     const { isAvailable } = req.body

// // //     hospital.isAvailable = isAvailable
// // //     await hospital.save()

// // //     return res.status(200).json({ message: "Availability updated", isAvailable })
// // //   } catch (error) {
// // //     console.error("Error toggling availability:", error)
// // //     return res.status(500).json({ message: "Server error" })
// // //   }
// // // }

// // import { NextRequest, NextResponse } from "next/server"
// // import dbConnect from "@/lib/mongodb"
// // import Hospital from "@/lib/models/Hospital"

// // // Simulated function to get session (replace this with actual logic)
// // async function getHospitalFromRequest(req: NextRequest) {
// //   // Example: Extract email from headers or cookies
// //   const email = req.headers.get("x-user-email") // Replace with real logic

// //   if (!email) return null

// //   await dbConnect()
// //   const hospital = await Hospital.findOne({ email })

// //   return hospital
// // }

// // export async function POST(req: NextRequest) {
// //   try {
// //     const body = await req.json()
// //     const { isAvailable } = body

// //     const hospital = await getHospitalFromRequest(req)

// //     if (!hospital) {
// //       return NextResponse.json({ message: "Unauthorized or hospital not found" }, { status: 401 })
// //     }

// //     hospital.isAvailable = isAvailable
// //     await hospital.save()

// //     return NextResponse.json({ message: "Availability updated", isAvailable }, { status: 200 })
// //   } catch (error) {
// //     console.error("Toggle availability error:", error)
// //     return NextResponse.json({ message: "Server error" }, { status: 500 })
// //   }
// // }


// import { NextRequest, NextResponse } from "next/server"
// import dbConnect from "@/lib/mongodb"
// import Hospital from "@/lib/models/Hospital"
// import { jwtVerify } from "jose"

// export async function POST(req: NextRequest) {
//   try {
//     await dbConnect()

//     // Step 1: Get JWT from cookies
//     const token = req.cookies.get("auth-token")?.value
//     if (!token) {
//       return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
//     }

//     // Step 2: Verify JWT and extract payload
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET)
//     const { payload } = await jwtVerify(token, secret)

//     if (payload.role !== "hospital" && !payload.isAdmin) {
//       return NextResponse.json({ message: "Forbidden" }, { status: 403 })
//     }

//     // Step 3: Find the hospital by email
//     const hospital = await Hospital.findOne({ email: payload.email })
//     if (!hospital) {
//       return NextResponse.json({ message: "Hospital not found" }, { status: 404 })
//     }

//     // Step 4: Toggle availability
//     const { isAvailable } = await req.json()
//     hospital.isAvailable = isAvailable
//     await hospital.save()

//     return NextResponse.json({ message: "Availability updated", isAvailable }, { status: 200 })
//   } catch (error) {
//     console.error("❌ Error in toggle-availability API:", error)
//     return NextResponse.json({ message: "Server error" }, { status: 500 })
//   }
// }



import { NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Hospital from "@/lib/models/Hospital"
import { jwtVerify } from "jose"

export async function POST(req: NextRequest) {
  //console.log("🔧 [API] /hospital/toggle-availability POST called")

  try {
    //console.log("🌐 Connecting to DB...")
    await dbConnect()
    //console.log("✅ DB connected")

    // Step 1: Get JWT from cookies
    const token = req.cookies.get("auth-token")?.value
    //console.log("🔐 Token fetched from cookies:", token ? "[Present]" : "[Missing]")

    if (!token) {
      //console.log("⛔ No auth-token found in cookies")
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    // Step 2: Verify JWT and extract payload
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)
    //console.log("🧾 Token verified. Payload:", payload)

    if (payload.role !== "hospital" && !payload.isAdmin) {
      //console.log("🚫 User is not a hospital or admin")
      return NextResponse.json({ message: "Forbidden" }, { status: 403 })
    }

    // Step 3: Find the hospital by email
    const hospital = await Hospital.findOne({ email: payload.email })
    if (!hospital) {
      //console.log("❌ Hospital not found for email:", payload.email)
      return NextResponse.json({ message: "Hospital not found" }, { status: 404 })
    }
    //console.log("🏥 Hospital found:", hospital.name)

    // Step 4: Toggle availability
    const { isAvailable } = await req.json()
    //console.log("🔄 Requested availability toggle to:", isAvailable)

    hospital.isAvailable = isAvailable
    await hospital.save()

    //console.log("✅ Availability updated in DB:", isAvailable)

    return NextResponse.json({ message: "Availability updated", isAvailable }, { status: 200 })
  } catch (error) {
    console.error("❌ Error in toggle-availability API:", error)
    return NextResponse.json({ message: "Server error" }, { status: 500 })
  }
}
