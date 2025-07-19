// app/api/hospitals/route.ts
import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Hospital from "@/lib/models/Hospital"

export async function GET(request: NextRequest) {
  try {
    await dbConnect()
    const url = new URL(request.url)
    const query: any = {}

    // Text filters (case-insensitive)
    const name = url.searchParams.get("name")
    const village = url.searchParams.get("village")
    const subDistrict = url.searchParams.get("subDistrict")
    const district = url.searchParams.get("district")
    const state = url.searchParams.get("state")

    if (name) query.name = { $regex: name, $options: "i" }
    if (village) query["address.village"] = { $regex: village, $options: "i" }
    if (subDistrict) query["address.subDistrict"] = { $regex: subDistrict, $options: "i" }
    if (district) query["address.district"] = { $regex: district, $options: "i" }
    if (state) query["address.state"] = { $regex: state, $options: "i" }

    // Boolean filters
    const emergency = url.searchParams.get("emergency")
    const available = url.searchParams.get("available")

    if (emergency === "yes") query.isHandleEmergency = true
    if (emergency === "no") query.isHandleEmergency = false

    if (available === "yes") query.isAvailable = true
    if (available === "no") query.isAvailable = false

    const hospitals = await Hospital.find(query).select("-password -__v")
    return NextResponse.json({ success: true, data: hospitals })
  } catch (error) {
    console.error("Error fetching hospitals:", error)
    return NextResponse.json({ success: false, message: "Internal Server Error" }, { status: 500 })
  }
}
