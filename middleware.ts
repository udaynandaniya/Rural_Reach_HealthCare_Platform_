import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { jwtVerify, SignJWT } from "jose"

const MAX_TOKEN_LIFE = 30 * 24 * 60 * 60 // 30 days
const REFRESH_TOKEN_LIFE = 5 * 24 * 60 * 60 // 5 days

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("auth-token")?.value
  const { pathname } = request.nextUrl

  const publicRoutes = [
    "/",
    "/auth/login",
    "/auth/forgot-password",
    "/user/signup",
    "/doctor/signup",
    "/hospital/signup",
    "/api/auth/me",
    "/api/auth/logout",
    "/api/auth/reset-by-otp/send-otp",
    "/api/auth/reset-by-otp/verify-otp",
    "/api/auth/reset-by-otp/reset-password",
    "/api/auth/reset-by-old",
  ]

  if (publicRoutes.includes(pathname)) {
    return NextResponse.next()
  }

  if (!token || typeof token !== "string") {
    console.warn("❌ No token or invalid token format")
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }

  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET)
    const { payload } = await jwtVerify(token, secret)

    const now = Math.floor(Date.now() / 1000)
    const issuedAt = payload.iat || now
    const maxExp = issuedAt + MAX_TOKEN_LIFE

    const response = NextResponse.next()

    // Refresh if token is within the refresh window
    if (now + REFRESH_TOKEN_LIFE < maxExp) {
      const refreshed = await new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(`${REFRESH_TOKEN_LIFE}s`)
        .sign(secret)

      response.cookies.set("auth-token", refreshed, {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: REFRESH_TOKEN_LIFE,
      })
    }

    // Role-based route protection
    const role = payload.role
    const isAdmin = payload.isAdmin

    if (pathname.startsWith("/user/") && role !== "user" && !isAdmin)
      return NextResponse.redirect(new URL("/", request.url))

    if (pathname.startsWith("/doctor/") && role !== "doctor" && !isAdmin)
      return NextResponse.redirect(new URL("/", request.url))

    if (pathname.startsWith("/hospital/") && role !== "hospital" && !isAdmin)
      return NextResponse.redirect(new URL("/", request.url))

    if (pathname.startsWith("/admin/") && !isAdmin)
      return NextResponse.redirect(new URL("/", request.url))

    return response
  } catch (err) {
    console.error("❌ Invalid or expired token:", err)
    return NextResponse.redirect(new URL("/auth/login", request.url))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}


// import { NextResponse } from "next/server"
// import type { NextRequest } from "next/server"
// import { jwtVerify, SignJWT } from "jose"

// const MAX_TOKEN_LIFE = 30 * 24 * 60 * 60 // 30 days
// const REFRESH_TOKEN_LIFE = 5 * 24 * 60 * 60 // 5 days

// export async function middleware(request: NextRequest) {
//   const token = request.cookies.get("auth-token")?.value
//   const { pathname } = request.nextUrl

//   const publicRoutes = [
//     "/",
//     "/auth/login",
//     "/auth/forgot-password",
//     "/user/signup",
//     "/doctor/signup",
//     "/hospital/signup",
//     "/api/auth/me",
//     "/api/auth/logout",
//     "/api/auth/reset-by-otp/send-otp",
//     "/api/auth/reset-by-otp/verify-otp",
//     "/api/auth/reset-by-otp/reset-password",
//     "/api/auth/reset-by-old",
//   ]

//   if (publicRoutes.includes(pathname)) return NextResponse.next()

//   // if (!token) {
//   //   return NextResponse.redirect(new URL("/auth/login", request.url))
//   // }

//   try {
//     const secret = new TextEncoder().encode(process.env.JWT_SECRET)
//     const { payload } = await jwtVerify(token, secret)

//     // ⏳ Refresh token by extending 5 days from now (not more than 30 days from original iat)
//     const now = Math.floor(Date.now() / 1000)
//     const issuedAt = payload.iat || now
//     const maxExp = issuedAt + MAX_TOKEN_LIFE

//     const response = NextResponse.next()

//     if (now + REFRESH_TOKEN_LIFE < maxExp) {
//       const refreshed = await new SignJWT(payload)
//         .setProtectedHeader({ alg: "HS256" })
//         .setIssuedAt()
//         .setExpirationTime(`${REFRESH_TOKEN_LIFE}s`)
//         .sign(secret)

//       response.cookies.set("auth-token", refreshed, {
//         httpOnly: true,
//         sameSite: "lax",
//         path: "/",
//         secure: process.env.NODE_ENV === "production",
//         maxAge: REFRESH_TOKEN_LIFE,
//       })
//     }

//     // Role-based protection
//     if (pathname.startsWith("/user/") && payload.role !== "user" && !payload.isAdmin)
//       return NextResponse.redirect(new URL("/", request.url))

//     if (pathname.startsWith("/doctor/") && payload.role !== "doctor" && !payload.isAdmin)
//       return NextResponse.redirect(new URL("/", request.url))

//     if (pathname.startsWith("/hospital/") && payload.role !== "hospital" && !payload.isAdmin)
//       return NextResponse.redirect(new URL("/", request.url))

//     if (pathname.startsWith("/admin/") && !payload.isAdmin)
//       return NextResponse.redirect(new URL("/", request.url))

//     return response
//   } catch (err) {
//     console.error("❌ Invalid or expired token:", err)
//     return NextResponse.redirect(new URL("/auth/login", request.url))
//   }
// }

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
// }


