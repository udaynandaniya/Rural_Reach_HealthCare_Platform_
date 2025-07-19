// // import { getSession } from "@/lib/getSession";
// // import Hospital from "@/lib/models/Hospital";
// // import dbConnect from "@/lib/mongodb";
// // import { NextResponse } from "next/server";
// // // import { getServerSession } from "next-auth";
// // // import dbConnect from "@/lib/dbConnect";
// // // import Hospital from "@/models/Hospital";




// // export async function PUT(request: Request) {
// //   const session = await getSession();






// //  console.log("\n\n we are in hospital profile🏥 Updating hospital location for session:", session) ;

















// //   if (!session || !session.user?.email) {
// //     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
// //   }

// //   await dbConnect();

// //   try {
// //     const { lat, lng } = await request.json();

// //     if (typeof lat !== "number" || typeof lng !== "number") {
// //       return NextResponse.json({ success: false, message: "Invalid latitude or longitude" }, { status: 400 });
// //     }

// //     const hospital = await Hospital.findOneAndUpdate(
// //       { email: session.user.email },
// //       {
// //         $set: {
// //           "address.geoLocation.lat": lat,
// //           "address.geoLocation.lng": lng,
// //         },
// //       },
// //       { new: true, runValidators: true }
// //     );

// //     if (!hospital) {
// //       return NextResponse.json({ success: false, message: "Hospital not found" }, { status: 404 });
// //     }

// //     return NextResponse.json({ success: true, data: hospital }, { status: 200 });
// //   } catch (error: any) {
// //     console.error("Error updating hospital location:", error);
// //     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
// //   }
// // }












// // app/api/hospital/profile/update-location/route.ts

// import { getSession } from "@/lib/getSession"
// import Hospital from "@/lib/models/Hospital"
// import dbConnect from "@/lib/mongodb"
// import { NextResponse } from "next/server"

// export async function PUT(request: Request) {
//   const session = await getSession()

//   console.log("🏥 [Hospital Location Update] Received session:", session)

//   // Validate session and email
//   if (!session || !session.email) {
//     console.warn("🚫 [Hospital Location Update] Unauthorized request - no session or email")
//     return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 })
//   }

//   await dbConnect()

//   try {
//     const { lat, lng } = await request.json()

//     console.log("📍 [Hospital Location Update] Payload received:", { lat, lng })

//     if (typeof lat !== "number" || typeof lng !== "number") {
//       console.warn("❌ [Hospital Location Update] Invalid latitude or longitude types")
//       return NextResponse.json({ success: false, message: "Invalid latitude or longitude" }, { status: 400 })
//     }

//     const hospital = await Hospital.findOneAndUpdate(
//       { email: session.email }, // ✅ FIXED: use session.email directly
//       {
//         $set: {
//           "address.geoLocation.lat": lat,
//           "address.geoLocation.lng": lng,
//         },
//       },
//       { new: true, runValidators: true }
//     )

//     if (!hospital) {
//       console.warn("❌ [Hospital Location Update] Hospital not found for email:", session.email)
//       return NextResponse.json({ success: false, message: "Hospital not found" }, { status: 404 })
//     }

//     console.log("✅ [Hospital Location Update] Location updated for:", hospital.name)
//     return NextResponse.json({ success: true, data: hospital }, { status: 200 })
//   } catch (error: any) {
//     console.error("💥 [Hospital Location Update] Error updating location:", error)
//     return NextResponse.json({ success: false, message: error.message || "Internal server error" }, { status: 500 })
//   }
// }
