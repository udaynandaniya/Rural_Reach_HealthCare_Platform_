
// components/UserDropdown.tsx
"use client"

import type React from "react"
import { AnimatePresence } from "framer-motion"
import { useState, useRef, useEffect } from "react"
import {
  User, Settings, LogOut, ChevronDown, Users,
  UserCheck, Building2, Shield, Trash2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Swal from "sweetalert2"
import { useAuth, isLoading  } from "@/app/contexts/AuthProvider"

export default function UserDropdown() {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, log me out",
    })

    if (result.isConfirmed) {
      try {
        const response = await fetch("/api/auth/logout", {
          method: "POST",
          credentials: "include",
        })

        if (response.ok) {
          Swal.fire("Logged out!", "You have been logged out.", "success")
          setIsOpen(false)
          window.location.href = "/"
        } else {
          Swal.fire("Failed!", "Logout failed. Try again.", "error")
        }
      } catch (error) {
        console.error("Logout error:", error)
        Swal.fire("Error", "Something went wrong. Please try again.", "error")
      }
    }
  }

  const handleDashboardClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsOpen(false)

    const dashboardPath = user?.isAdmin ? "/admin/dashboard" : `/${user?.role}/dashboard`
    window.location.href = dashboardPath
  }

  const handleDeleteAccount = async () => {
    const firstConfirm = await Swal.fire({
      title: "Are you sure?",
      text: "Your account will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    })

    if (!firstConfirm.isConfirmed) return

    const secondConfirm = await Swal.fire({
      title: "Final confirmation",
      text: "This cannot be undone. Proceed?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Delete my account",
    })

    if (!secondConfirm.isConfirmed) return

    Swal.fire({
      title: "Deleting...",
      text: "Please wait...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      didOpen: () => Swal.showLoading(),
    })

    try {
      const res = await fetch("/api/delete-account", {
        method: "DELETE",
        credentials: "include",
      })

      const data = await res.json()

      if (res.ok) {
        Swal.fire({
          icon: "success",
          title: "Deleted!",
          text: data.message,
        })

        await fetch("/api/auth/logout", { method: "POST" })
        window.location.href = "/"
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed",
          text: data.error || "Something went wrong.",
        })
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Network or server error.",
      })
    }
  }

  // if (!user) return null
  if (isLoading || !user) return null


  const getRoleIcon = () => {
    if (user.isAdmin) return <Shield className="w-4 h-4 text-white" />
    switch (user.role) {
      case "user":
        return <Users className="w-4 h-4 text-white" />
      case "doctor":
        return <UserCheck className="w-4 h-4 text-white" />
      case "hospital":
        return <Building2 className="w-4 h-4 text-white" />
      default:
        return <User className="w-4 h-4 text-white" />
    }
  }

  const getRoleColor = () => {
    if (user.isAdmin) return "from-red-500 to-red-600"
    switch (user.role) {
      case "user":
        return "from-blue-500 to-blue-600"
      case "doctor":
        return "from-green-500 to-green-600"
      case "hospital":
        return "from-purple-500 to-purple-600"
      default:
        return "from-gray-500 to-gray-600"
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        variant="ghost"
        className="flex items-center space-x-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full px-4 py-2 transition-colors duration-200"
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          setIsOpen(!isOpen)
        }}
      >
        <div className={`w-8 h-8 bg-gradient-to-br ${getRoleColor()} rounded-full flex items-center justify-center shadow-sm`}>
          {getRoleIcon()}
        </div>
        <span className="hidden sm:block font-medium text-gray-700 dark:text-gray-300 max-w-32 truncate">
          {user.name}
        </span>
        <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <div className="absolute right-0 top-full mt-2 w-64 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg overflow-visible z-[9999]">
            <div className="p-4 border-b border-gray-100 dark:border-gray-700">
              <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
              <p className="text-xs text-gray-400 capitalize">{user.isAdmin ? "Admin" : `${user.role} account`}</p>
            </div>
            <div>
              <button
                onClick={handleDashboardClick}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-3 text-gray-700 dark:text-gray-300"
              >
                {getRoleIcon()} <span>Dashboard</span>
              </button>
              <button
                onClick={() => {
                  setIsOpen(false)
                  router.push("/auth/forgot-password")
                }}
                className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center gap-3 text-gray-700 dark:text-gray-300"
              >
                <Settings className="w-4 h-4" /> <span>Change Password</span>
              </button>
              <button
                onClick={handleDeleteAccount}
                className="w-full text-left px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 text-red-600 dark:text-red-400"
              >
                <Trash2 className="w-4 h-4" /> <span>Delete Account</span>
              </button>
            </div>
            <div className="border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-3 text-red-600 dark:text-red-400"
              >
                <LogOut className="w-4 h-4" /> <span>Logout</span>
              </button>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
