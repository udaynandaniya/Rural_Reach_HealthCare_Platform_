//C:\Users\UDAYN\Downloads\healthcare-platform\app\contexts\AuthProvider.tsx
"use client"

import React, { createContext, useContext, useEffect, useState } from "react"
import type { DecodedToken } from "@/lib/auth"
import { toast } from "react-hot-toast"

interface AuthContextType {
  isAuthenticated: boolean
  user: DecodedToken | null
  isLoading: boolean
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<DecodedToken | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })
      if (res.ok) {
        setUser(null)
        if (typeof window !== "undefined") {
        window.location.href = "/auth/login"
      }

      } else {
        toast.error("Logout failed.")
      }
    } catch (error) {
      console.error("Logout error:", error)
      toast.error("Error during logout.")
    }
  }

  const checkAuth = async () => {
    try {
      const res = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include",
      })

      const data = await res.json()
      if (res.ok && data.success && data.user) {



     console.log("\n\n\n✅ Session Data (Decoded):", data.user)





        setUser(data.user)
      } else {
        setUser(null)
      }
    } catch (error) {
      console.error("Auth check error:", error)
      setUser(null)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!user,
        user,
        isLoading,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
