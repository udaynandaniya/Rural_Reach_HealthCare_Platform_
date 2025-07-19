// //C:\Users\UDAYN\Downloads\healthcare-platform\lib\verification\verifyOtp.ts
// import dbConnect from "../mongodb"
// import OTP from "../models/OTP"

// export async function verifyOtp(email: string, otp: string) {
//   await dbConnect()

//   const otpRecord = await OTP.findOne({ email, otp })

//   if (!otpRecord) {
//     return { success: false, message: "Invalid or expired OTP" }
//   }

//   // Delete the OTP after successful verification
//   await OTP.deleteOne({ _id: otpRecord._id })

//   return { success: true }
// }


import dbConnect from "../mongodb"
import OTP from "../models/OTP"

export async function verifyOtp(email: string, otp: string) {
  await dbConnect()

  //console.log("🔄 Verifying OTP:", { email, otp })

  // Check if OTP exists and is not expired
  const otpRecord = await OTP.findOne({
    email,
    otp,
    expiresAt: { $gt: new Date() }, // Check if not expired
  })

  //console.log("🔍 OTP verification result:", otpRecord ? "Valid" : "Invalid/Expired")

  if (!otpRecord) {
    // Check if OTP exists but is expired
    const expiredOtp = await OTP.findOne({ email, otp })
    if (expiredOtp) {
      //console.log("⏰ OTP found but expired")
      return { success: false, message: "OTP has expired. Please request a new one." }
    }

    return { success: false, message: "Invalid OTP" }
  }

  // Don't delete the OTP here - let the reset password function handle it
  //console.log("✅ OTP verified successfully")
  return { success: true }
}
