//C:\Users\UDAYN\Downloads\healthcare-platform\components\SessionStatus.tsx

"use client"

import { useEffect, useState } from "react"
import { Clock, Shield } from "lucide-react"
import { useAuth } from "@/app/contexts/AuthProvider"

export default function SessionStatus() {
  const { isAuthenticated, user } = useAuth()
  const [timeLeft, setTimeLeft] = useState<string>("")

  useEffect(() => {
    if (!isAuthenticated || !user) return

    const updateTimeLeft = () => {
      // Assuming 30-day session from login
      const sessionDuration = 30 * 24 * 60 * 60 * 1000 // 30 days in milliseconds
      const now = Date.now()
      const sessionStart = now - sessionDuration // This is approximate
      const sessionEnd = sessionStart + sessionDuration
      const remaining = sessionEnd - now

      if (remaining > 0) {
        const days = Math.floor(remaining / (24 * 60 * 60 * 1000))
        const hours = Math.floor((remaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000))

        if (days > 0) {
          setTimeLeft(`${days} days, ${hours} hours`)
        } else {
          setTimeLeft(`${hours} hours`)
        }
      } else {
        setTimeLeft("Expired")
      }
    }

    updateTimeLeft()
    const interval = setInterval(updateTimeLeft, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [isAuthenticated, user])

  if (!isAuthenticated) return null

  return (
    <div className="fixed bottom-4 right-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-3 shadow-lg max-w-xs">
      <div className="flex items-center gap-2 text-sm">
        <Shield className="w-4 h-4 text-green-500" />
        <span className="font-medium">Session Active</span>
      </div>
      <div className="flex items-center gap-2 text-xs text-gray-600 dark:text-gray-400 mt-1">
        <Clock className="w-3 h-3" />
        <span>Expires in: {timeLeft}</span>
      </div>
    </div>
  )
}
