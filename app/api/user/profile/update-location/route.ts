// app/api/user/profile/update-location/route.ts

import { getSession } from "@/lib/getSession"
import User from "@/lib/models/User"
import dbConnect from "@/lib/mongodb"
import { type NextRequest, NextResponse } from "next/server"
   
// 


// For session handling


export async function PUT(req: NextRequest) {
  await dbConnect()                                       // Ensure DB is connected
  const session = await getSession()                // Get current session

  // ❌ Reject if no valid user session
  if (!session || !session.user?.email) {
    return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
  }

  const { lat, lng } = await req.json()                   // Read lat/lng from request

  // ✅ Validate coordinates are numbers
  if (typeof lat !== "number" || typeof lng !== "number") {
    return NextResponse.json(
      { success: false, message: "Invalid coordinates provided. Both lat and lng must be numbers." },
      { status: 400 },
    )
  }

  try {
    // ✅ Update user's location based on their email
    const user = await User.findOneAndUpdate(
      { email: session.user.email },
      {
        $set: {
          "address.geoLocation.lat": lat,
          "address.geoLocation.lng": lng,
        },
      },
      { new: true, runValidators: true } // Return updated document and validate fields
    )

    // ❌ User not found
    if (!user) {
      return NextResponse.json({ success: false, message: "User not found" }, { status: 404 })
    }

    // ✅ Respond with success
    return NextResponse.json({
      success: true,
      message: "Location updated successfully",
      user: user.toObject(),
    })
  } catch (error: any) {
    console.error("Error updating user location:", error)
    return NextResponse.json({ success: false, message: error.message || "Failed to update location" }, { status: 500 })
  }
}
