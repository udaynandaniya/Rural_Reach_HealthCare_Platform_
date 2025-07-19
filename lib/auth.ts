// // //C:\Users\UDAYN\Downloads\healthcare-platform\lib\auth.ts
// // import jwt from "jsonwebtoken"

// // export interface DecodedToken {
// //   userId: string
// //   email: string
// //   role: string
// //   isAdmin: boolean
// //   exp: number
// // }

// // export function decodeToken(token: string): DecodedToken | null {
// //   try {
// //     return jwt.decode(token) as DecodedToken
// //   } catch (error) {
// //     return null
// //   }
// // }

// // export function isTokenExpired(token: DecodedToken): boolean {
// //   return Date.now() >= token.exp * 1000
// // }


// import "server-only"
// import { SignJWT, jwtVerify, type JWTPayload } from "jose"
// import { type NextRequest, NextResponse } from "next/server"

// // Define the structure of your session payload
// export interface SessionPayload extends JWTPayload {
//   userId: string
//   email: string
//   role: "user" | "doctor" | "hospital" | "admin" // Example roles
//   isAdmin: boolean
//   name: string // Assuming user name is also in the payload
// }

// const secretKey = process.env.AUTH_SECRET
// const encodedKey = new TextEncoder().encode(secretKey)

// export async function encrypt(payload: SessionPayload) {
//   return new SignJWT(payload)
//     .setProtectedHeader({ alg: "HS256" })
//     .setIssuedAt()
//     .setExpirationTime("7d") // Token expires in 7 days
//     .sign(encodedKey)
// }

// export async function decrypt(session: string | undefined = ""): Promise<SessionPayload | null> {
//   try {
//     const { payload } = await jwtVerify(session, encodedKey, {
//       algorithms: ["HS256"],
//     })
//     return payload as SessionPayload // Cast to our specific payload type
//   } catch (error) {
//     console.error("Failed to verify session:", error)
//     return null
//   }
// }

// export async function updateSession(request: NextRequest) {
//   const session = request.cookies.get("auth-token")?.value
//   if (!session) return

//   const parsed = await decrypt(session)
//   if (!parsed) return

//   // Refresh the session cookie
//   const res = NextResponse.next()
//   res.cookies.set({
//     name: "auth-token",
//     value: await encrypt(parsed),
//     httpOnly: true,
//     secure: process.env.NODE_ENV === "production",
//     sameSite: "lax",
//     path: "/",
//   })
//   return res
// }



//C:\Users\UDAYN\Downloads\healthcare-platform\lib\auth.ts
import "server-only"
import { SignJWT, jwtVerify, type JWTPayload } from "jose"
import { type NextRequest, NextResponse } from "next/server"
import jwt from "jsonwebtoken"

// Define the structure of your session payload
export interface SessionPayload extends JWTPayload {
  userId: string
  email: string
  role: "user" | "doctor" | "hospital" | "admin" // Example roles
  isAdmin: boolean
  name: string // Assuming user name is also in the payload
}

export interface DecodedToken {
  userId: string
  email: string
  role: "user" | "doctor" | "hospital" | "admin"
  isAdmin: boolean
  exp: number
  name?: string // Add name as it's used in the session payload
}

const secretKey = process.env.AUTH_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d") // Token expires in 7 days
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = ""): Promise<SessionPayload | null> {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload as SessionPayload // Cast to our specific payload type
  } catch (error) {
    console.error("Failed to verify session:", error)
    return null
  }
}

export function decodeToken(token: string): DecodedToken | null {
  try {
    return jwt.decode(token) as DecodedToken
  } catch (error) {
    console.error("Error decoding token:", error)
    return null
  }
}

export function verifyToken(token: string): DecodedToken | null {
  try {
    // Ensure JWT_SECRET is defined
    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is not defined in environment variables.")
      return null
    }
    return jwt.verify(token, process.env.JWT_SECRET) as DecodedToken
  } catch (error) {
    console.error("Error verifying token:", error)
    return null
  }
}

export function isTokenExpired(token: DecodedToken): boolean {
  return Date.now() >= token.exp * 1000
}

export async function updateSession(request: NextRequest) {
  const session = request.cookies.get("auth-token")?.value
  if (!session) return

  const parsed = await decrypt(session)
  if (!parsed) return

  // Refresh the session cookie
  const res = NextResponse.next()
  res.cookies.set({
    name: "auth-token",
    value: await encrypt(parsed),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  })
  return res
}
