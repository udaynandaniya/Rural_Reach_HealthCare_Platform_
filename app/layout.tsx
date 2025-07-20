// //C:\Users\UDAYN\Downloads\healthcare-platform\app\layout.tsx
// import type React from "react"
// import type { Metadata } from "next"
// import { Inter } from "next/font/google"
// import "./globals.css"
// import { ThemeProvider } from "@/contexts/ThemeContext"
// import { Toaster } from "react-hot-toast"

// const inter = Inter({ subsets: ["latin"] })

// export const metadata: Metadata = {
//   title: "RuralReach - Smart Healthcare Platform",
//   description: "Your Smart Guide for Health Awareness and Emergency Care",
//     generator: 'v0.dev'
// }

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>
//         <ThemeProvider>
//           {children}
//           <Toaster
//             position="top-right"
//             toastOptions={{
//               duration: 4000,
//               style: {
//                 background: "var(--background)",
//                 color: "var(--foreground)",
//               },
//             }}
//           />
//         </ThemeProvider>
//       </body>
//     </html>
//   )
// }


//C:\Users\UDAYN\Downloads\healthcare-platform\app\layout.tsx
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/contexts/ThemeContext"
import { Toaster } from "react-hot-toast"
import { AuthProvider } from "./contexts/AuthProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "RuralReach - Smart Healthcare Platform",
  description: "Your Smart Guide for Health Awareness and Emergency Care",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
     <body className={`${inter.className} overflow-x-hidden`}>

        <ThemeProvider>
           <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "var(--background)",
                color: "var(--foreground)",
              },
            }}
          />
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
