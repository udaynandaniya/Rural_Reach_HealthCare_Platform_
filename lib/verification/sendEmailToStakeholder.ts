//C:\Users\UDAYN\Downloads\healthcare-platform\lib\verification\sendEmailToStakeholder.ts

import nodemailer from "nodemailer"

const transporter = nodemailer.createTransport({
  // Configure your email service here
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendEmailToStakeholder(email: string, otp: string, role: string) {
  const roleNames = {
    user: "User",
    doctor: "Doctor",
    hospital: "Hospital",
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `RuralReach ${roleNames[role as keyof typeof roleNames]} Verification`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb;">Welcome to RuralReach</h2>
        <p>Your verification code for ${roleNames[role as keyof typeof roleNames]} registration is:</p>
        <div style="background: #f3f4f6; padding: 20px; text-align: center; font-size: 24px; font-weight: bold; color: #2563eb;">
          ${otp}
        </div>
        <p>This code will expire in 5 minutes.</p>
        <p>If you didn't request this, please ignore this email.</p>
      </div>
    `,
  }

  try {
    await transporter.sendMail(mailOptions)
    return { success: true }
  } catch (error) {
    console.error("Email sending failed:", error)
    return { success: false, error }
  }
}
