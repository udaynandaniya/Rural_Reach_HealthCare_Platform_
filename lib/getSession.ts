// // lib/getSession.ts
// import { cookies } from "next/headers"
// import { verifyToken } from "./auth" // from your existing auth.ts
// import type { DecodedToken } from "./auth"

// export async function getSession(req?: Request): Promise<DecodedToken | null> {
//   try {
//     // For Route Handlers (API routes)
//     const token = req
//       ? req.cookies?.get?.("auth-token")?.value // Edge API route support
//       : cookies().get("auth-token")?.value      // Middleware, server components

//     if (!token) return null

//     const decoded = verifyToken(token)
//     return decoded
//   } catch (error) {
//     console.error("❌ Error in getSession:", error)
//     return null
//   }
// }

// lib/getSession.ts
import { cookies } from "next/headers"
import { verifyToken } from "./auth" // your existing JWT verification
import type { DecodedToken } from "./auth"

export async function getSession(req?: Request): Promise<DecodedToken | null> {
  try {
    let token: string | undefined

    if (req) {
      // For Edge API route (NextRequest with .cookies)
      token = req.cookies?.get?.("auth-token")?.value
    } else {
      // ✅ Await cookies() in dynamic route context
      const cookieStore = await cookies()
      token = cookieStore.get("auth-token")?.value
    }

    if (!token) return null

    const decoded = verifyToken(token)
    return decoded
  } catch (error) {
    console.error("❌ Error in getSession:", error)
    return null
  }
}
