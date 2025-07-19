import { type NextRequest, NextResponse } from "next/server"
import dbConnect from "@/lib/mongodb"
import Hospital from "@/lib/models/Hospital"

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    const { hospitalId } = await request.json()
    if (!hospitalId) {
      return NextResponse.json({ success: false, message: "Hospital ID is required." }, { status: 400 })
    }
    const hospital = await Hospital.findById(hospitalId)
    if (!hospital) {
      return NextResponse.json({ success: false, message: "Hospital not found." }, { status: 404 })
    }
    const { address } = hospital
    if (!address || !address.village || !address.subDistrict || !address.district || !address.state) {
      return NextResponse.json(
        { success: false, message: "Hospital address details are incomplete for geocoding." },
        { status: 400 },
      )
    }
    const fullAddress = `${address.village}, ${address.subDistrict}, ${address.district}, ${address.state}, India`
    // console.log(`Geocoding with Nominatim: ${fullAddress}`)
    const geocodeUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(fullAddress)}&format=json&limit=1`
    const response = await fetch(geocodeUrl, {
      headers: {
        "User-Agent": "healthcare-app (codehubvibe@gmail.com)", // replace with a real email
      },
    })
    if (!response.ok) {
      return NextResponse.json({ success: false, message: "Failed to fetch location from Nominatim" }, { status: 500 })
    }
    const data = await response.json()
    if (!data || data.length === 0) {
      return NextResponse.json({ success: false, message: "No geolocation data found." }, { status: 404 })
    }
    const lat = Number.parseFloat(data[0].lat)
    const lng = Number.parseFloat(data[0].lon)
    hospital.location = { lat, lng }
    await hospital.save()
    return NextResponse.json({
      success: true,
      message: "Hospital location updated from address.",
      location: { lat, lng },
    })
  } catch (error) {
    console.error("Geocoding error:", error)
    return NextResponse.json({ success: false, message: "Internal server error." }, { status: 500 })
  }
}
