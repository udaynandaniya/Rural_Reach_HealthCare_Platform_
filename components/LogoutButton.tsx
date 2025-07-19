"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      // console.log("Logging out...")
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      })

      if (response.ok) {
        toast.success("Logged out successfully!")
        router.push("/")
        router.refresh()
      } else {
        toast.error("Logout failed")
      }
    } catch (error) {
      toast.error("Something went wrong")
    }
  }

  return (
    <Button
      onClick={handleLogout}
      variant="outline"
      size="sm"
      className="gap-2 bg-transparent hover:bg-red-50 hover:text-red-600 hover:border-red-200 dark:hover:bg-red-900/20 dark:hover:text-red-400"
    >
      <LogOut className="w-4 h-4" />
      Logout
    </Button>
  )
}
