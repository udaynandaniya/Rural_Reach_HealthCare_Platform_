import { NextResponse } from "next/server"
import Hospital from "@/lib/models/Hospital"
import dbConnect from "@/lib/mongodb"


export const GET = async () => {
  try {
    await dbConnect()

    // If this API exists, update it to use isHandleEmergency
    const hospitals = await Hospital.find({ isVerified: true })
      .select("name email phone address specialties isVerified isAvailable isHandleEmergency createdAt")
      .sort({ createdAt: -1 })

    return new NextResponse(JSON.stringify(hospitals), { status: 200 })
  } catch (err) {
    //console.log(err)
    return new NextResponse("Error in fetching hospitals - " + err, { status: 500 })
  }
}
