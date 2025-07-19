// // // // // // app/user/dashboard/page.tsx


// // // // // "use client"
// // // // // import { useState, useEffect } from "react"
// // // // // import { motion, AnimatePresence } from "framer-motion"
// // // // // import {
// // // // //   Heart,
// // // // //   AlertTriangle,
// // // // //   Brain,
// // // // //   Target,
// // // // //   Zap,
// // // // //   Moon,
// // // // //   Smile,
// // // // //   Frown,
// // // // //   Meh,
// // // // //   Plus,
// // // // //   BarChart3,
// // // // //   TrendingUp,
// // // // //   Calendar,
// // // // //   Clock,
// // // // //   Building2,
// // // // //   Stethoscope,
// // // // //   MapPin,
// // // // //   Phone,
// // // // //   Mail,
// // // // //   Award,
// // // // //   CheckCircle,
// // // // //   Trash2,
// // // // //   Send,
// // // // //   History,
// // // // //   Timer,
// // // // //   Map,
// // // // //   ExternalLink,
// // // // //   RefreshCw,
// // // // //   XCircle,
// // // // //   FileText,
// // // // //   Tag,
// // // // //   Eye,
// // // // //   Megaphone,
// // // // //   AtSign,
// // // // //   Bell,
// // // // // } from "lucide-react"
// // // // // import { Button } from "@/components/ui/button"
// // // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // // // import { Progress } from "@/components/ui/progress"
// // // // // import { Badge } from "@/components/ui/badge"
// // // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // // // import { Textarea } from "@/components/ui/textarea"
// // // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// // // // // import { Alert, AlertDescription } from "@/components/ui/alert"
// // // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // // // import { useAuth } from "@/app/contexts/AuthProvider"
// // // // // import ThemeToggle from "@/components/ThemeToggle"
// // // // // import UserDropdown from "@/components/UserDropdown"
// // // // // import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
// // // // // import { toast } from "react-hot-toast"
// // // // // import PHQ9Assessment from "@/components/assessments/PHQ9Assessment"
// // // // // import GAD7Assessment from "@/components/assessments/GAD7Assessment"
// // // // // import AssessmentResults from "@/components/assessments/AssessmentResults"

// // // // // interface MoodData {
// // // // //   date: string
// // // // //   mood: number
// // // // //   energy: number
// // // // //   anxiety: number
// // // // //   sleep: number
// // // // //   notes?: string
// // // // // }

// // // // // interface EmergencyAlert {
// // // // //   _id: string
// // // // //   status: string
// // // // //   priority: string
// // // // //   createdAt: string
// // // // //   message: string
// // // // //   userInfo: {
// // // // //     name: string
// // // // //     email: string
// // // // //     phone: string
// // // // //   }
// // // // //   location?: {
// // // // //     lat?: number
// // // // //     lng?: number
// // // // //     address?: {
// // // // //       street?: string
// // // // //       area?: string
// // // // //       townOrVillage?: string
// // // // //       taluka?: string
// // // // //       district?: string
// // // // //       pincode?: string
// // // // //       state?: string
// // // // //       geoLocation?: {
// // // // //         lat?: number
// // // // //         lng?: number
// // // // //       }
// // // // //     }
// // // // //   }
// // // // //   acceptedBy?: {
// // // // //     _id: string
// // // // //     name: string
// // // // //     phone: string
// // // // //   }
// // // // //   isRead?: boolean
// // // // // }

// // // // // interface Post {
// // // // //   _id: string
// // // // //   title: string
// // // // //   content: string
// // // // //   category: string
// // // // //   tags: string[]
// // // // //   authorId: {
// // // // //     _id: string
// // // // //     name: string
// // // // //   }
// // // // //   authorType: string
// // // // //   mentionedId?: {
// // // // //     _id: string
// // // // //     name: string
// // // // //   }
// // // // //   mentionedType?: string
// // // // //   createdAt: string
// // // // //   postby :string
// // // // //   isApproved: boolean
// // // // // }

// // // // // interface Hospital {
// // // // //   _id: string
// // // // //   name: string
// // // // //   email: string
// // // // //   phone: string
// // // // //   address: string
// // // // //   specialties: string[]
// // // // //   isVerified: boolean
// // // // //   isAvailable: boolean
// // // // //   isHandleEmergency: boolean
// // // // //   createdAt: string
// // // // //   distance?: number
// // // // // }

// // // // // interface UserProfile {
// // // // //   _id: string
// // // // //   name: string
// // // // //   email: string
// // // // //   phone: string
// // // // //   address: {
// // // // //     street: string
// // // // //     area: string
// // // // //     village: string
// // // // //     subDistrict: string
// // // // //     district: string
// // // // //     pincode: string
// // // // //     state: string
// // // // //   }
// // // // //   location: {
// // // // //     lat: number
// // // // //     lng: number
// // // // //   }
// // // // //   emergencyContacts: Array<{
// // // // //     name: string
// // // // //     phone: string
// // // // //     relation: string
// // // // //   }>
// // // // //   medicalInfo: {
// // // // //     bloodGroup: string
// // // // //     allergies: string[]
// // // // //     medications: string[]
// // // // //     conditions: string[]
// // // // //   }
// // // // // }

// // // // // interface Announcement {
// // // // //   _id: string
// // // // //   title: string
// // // // //   content: string
// // // // //   ownerId: string
// // // // //   ownerType: "doctor" | "hospital"
// // // // //   mentions: Array<{
// // // // //     id: string
// // // // //     name: string
// // // // //     type: "doctor" | "hospital"
// // // // //     email: string
// // // // //   }>
// // // // //   readBy: string[] // Array of user/doctor/hospital IDs who have read it
// // // // //   createdAt: string
// // // // //   isRead?: boolean // For mentions tab, indicates if *this* user has read it
// // // // // }

// // // // // export default function UserDashboard() {
// // // // //   const { user } = useAuth()
// // // // //   const [moodData, setMoodData] = useState<MoodData[]>([])
// // // // //   const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
// // // // //   const [allPosts, setAllPosts] = useState<Post[]>([])
// // // // //   const [hospitals, setHospitals] = useState<Hospital[]>([])
// // // // //   const [allAnnouncements, setAllAnnouncements] = useState<Announcement[]>([])
// // // // //   const [todayMood, setTodayMood] = useState<MoodData | null>(null)
// // // // //   const [isEmergencyActive, setIsEmergencyActive] = useState(false)
// // // // //   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
// // // // //   const [loading, setLoading] = useState(true)
// // // // //   const [showHospitalInfo, setShowHospitalInfo] = useState(false)
// // // // //   const [currentAlert, setCurrentAlert] = useState<EmergencyAlert | null>(null)
// // // // //   const [showAlertNotification, setShowAlertNotification] = useState(false)
// // // // //   const [alertTimer, setAlertTimer] = useState<NodeJS.Timeout | null>(null)
// // // // //   const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
// // // // //   const [emergencyButtonDisabled, setEmergencyButtonDisabled] = useState(false)
// // // // //   const [alertStatus, setAlertStatus] = useState<string | null>(null)
// // // // //   const [lastAlertCheck, setLastAlertCheck] = useState<Date>(new Date())
// // // // //   const [currentAssessment, setCurrentAssessment] = useState<string | null>(null)
// // // // //   const [assessmentResult, setAssessmentResult] = useState<any>(null)
// // // // //   const [assessmentType, setAssessmentType] = useState<string>("")
// // // // //   const [unreadAnnouncementsCount, setUnreadAnnouncementsCount] = useState(0)

// // // // //   // Mood tracking state
// // // // //   const [currentMood, setCurrentMood] = useState(5)
// // // // //   const [currentEnergy, setCurrentEnergy] = useState(5)
// // // // //   const [currentAnxiety, setCurrentAnxiety] = useState(5)
// // // // //   const [currentSleep, setCurrentSleep] = useState(8)
// // // // //   const [moodNotes, setMoodNotes] = useState("")
// // // // //   // Emergency form state
// // // // //   const [emergencyForm, setEmergencyForm] = useState({
// // // // //     message: "",
// // // // //     priority: "high",
// // // // //   })

// // // // //   // useEffect(() => {
// // // // //   //   fetchDashboardData()
// // // // //   //   requestLocation()
// // // // //   //   checkAlertStatus()
// // // // //   //   setTimeout(() => {
// // // // //   //     fetchUserProfile()
// // // // //   //   }, 2000)
// // // // //   //   const interval = setInterval(checkAlertStatus, 10000)
// // // // //   //   return () => clearInterval(interval)
// // // // //   // }, [])



// // // // //   useEffect(() => {
// // // // //   fetchDashboardData()
// // // // //   requestLocation()

// // // // //   // Delay until alerts load
// // // // //   setTimeout(() => {
// // // // //     fetchUserProfile()

// // // // //     // Find the most recent alertId (pending or accepted, etc.)
// // // // //     const latestAlert = emergencyAlerts.find(alert =>
// // // // //       alert.status === "pending" || alert.status === "active" || alert.status === "accepted"
// // // // //     )

// // // // //     if (latestAlert?._id) {
// // // // //       checkAlertStatus(latestAlert._id)
// // // // //     }

// // // // //     const interval = setInterval(() => {
// // // // //       if (latestAlert?._id) {
// // // // //         checkAlertStatus(latestAlert._id)
// // // // //       }
// // // // //     }, 10000)

// // // // //     return () => clearInterval(interval)
// // // // //   }, 2000)
// // // // // }, [])










// // // // //   const fetchDashboardData = async () => {
// // // // //     try {
// // // // //       const [moodRes, alertsRes, postsRes, hospitalsRes, announcementsRes] = await Promise.all([
// // // // //         fetch("/api/user/mood-data"),
// // // // //         fetch("/api/user/emergency-alerts"),
// // // // //         fetch("/api/posts"),
// // // // //         fetch("/api/user/hospitals"),
// // // // //         fetch("/api/announcements/mentions"), // Fetch all announcements for user, including mentions
// // // // //       ])

// // // // //       if (moodRes.ok) {
// // // // //         const moodData = await moodRes.json()
// // // // //         setMoodData(moodData.data || [])
// // // // //         setTodayMood(moodData.today || null)
// // // // //       }
// // // // //       if (alertsRes.ok) {
// // // // //         const alertsData = await alertsRes.json()
// // // // //         setEmergencyAlerts(alertsData.data || [])
// // // // //         const pendingAlerts =
// // // // //           alertsData.data?.filter((alert: EmergencyAlert) => alert.status === "pending" && !alert.acceptedBy) || []
// // // // //         if (pendingAlerts.length > 0) {
// // // // //           setCurrentAlert(pendingAlerts[0])
// // // // //           setEmergencyButtonDisabled(true)
// // // // //         } else {
// // // // //           setEmergencyButtonDisabled(false)
// // // // //         }
// // // // //       }
// // // // //       if (postsRes.ok) {
// // // // //         const postsData = await postsRes.json()
// // // // //         setAllPosts(postsData.data || [])
// // // // //       }
// // // // //       if (hospitalsRes.ok) {
// // // // //         const hospitalsData = await hospitalsRes.json()
// // // // //         setHospitals(hospitalsData.data || [])
// // // // //       }
// // // // //       if (announcementsRes.ok) {
// // // // //         const announcementsData = await announcementsRes.json()
// // // // //         setAllAnnouncements(announcementsData.data || [])
// // // // //         // Calculate unread count for the current user
// // // // //         const unreadCount = announcementsData.data?.filter((ann: Announcement) => !ann.isRead).length || 0
// // // // //         setUnreadAnnouncementsCount(unreadCount)
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching dashboard data:", error)
// // // // //     } finally {
// // // // //       setLoading(false)
// // // // //     }
// // // // //   }

// // // // //   const requestLocation = () => {
// // // // //     if (navigator.geolocation) {
// // // // //       navigator.geolocation.getCurrentPosition(
// // // // //         (position) => {
// // // // //           setLocation({
// // // // //             lat: position.coords.latitude,
// // // // //             lng: position.coords.longitude,
// // // // //           })
// // // // //         },
// // // // //         (error) => {
// // // // //           toast.error("Location access denied. Emergency alerts will use your registered address.")
// // // // //         },
// // // // //       )
// // // // //     } else {
// // // // //       toast.error("Geolocation not supported by this browser.")
// // // // //     }
// // // // //   }

// // // // //   // const checkAlertStatus = async () => {
// // // // //   //   try {
// // // // //   //     const response = await fetch("/api/user/check-alert-status")
// // // // //   //     const data = await response.json()
// // // // //   //     if (response.ok) {
// // // // //   //       setAlertStatus(data.status)
// // // // //   //       setEmergencyButtonDisabled(data.hasActiveAlert)
// // // // //   //       setLastAlertCheck(new Date())
// // // // //   //       if (data.status === "accepted" && data.hospitalInfo) {
// // // // //   //         toast.success(
// // // // //   //           `🏥 ${data.hospitalInfo.name} is coming to help! They will contact you at ${data.hospitalInfo.phone}`,
// // // // //   //           {
// // // // //   //             duration: 8000,
// // // // //   //           },
// // // // //   //         )
// // // // //   //       }
// // // // //   //     }
// // // // //   //   } catch (error) {
// // // // //   //     console.error("Error checking alert status:", error)
// // // // //   //   }
// // // // //   // }

// // // // //   const checkAlertStatus = async (alertId: string) => {
// // // // //   try {
// // // // //     const response = await fetch("/api/user/check-alert-status", {
// // // // //       method: "POST",
// // // // //       headers: {
// // // // //         "Content-Type": "application/json",
// // // // //       },
// // // // //       credentials: "include", // to send cookies
// // // // //       body: JSON.stringify({ alertId }), // 👈 send the required alertId
// // // // //     })

// // // // //     const data = await response.json()

// // // // //     if (response.ok) {
// // // // //       setAlertStatus(data.alert.status)
// // // // //       setEmergencyButtonDisabled(data.alert.status === "active")
// // // // //       setLastAlertCheck(new Date())

// // // // //       if (data.alert.status === "accepted" && data.alert.acceptedBy) {
// // // // //         toast.success(
// // // // //           `🏥 ${data.alert.acceptedBy.name} is coming to help!`,
// // // // //           { duration: 8000 },
// // // // //         )
// // // // //       }
// // // // //     } else {
// // // // //       console.error("API error:", data.message)
// // // // //     }
// // // // //   } catch (error) {
// // // // //     console.error("Error checking alert status:", error)
// // // // //   }
// // // // // }


// // // // //   const startAlertMonitoring = (alertId: string) => {
// // // // //     let checkCounter = 0
// // // // //     const checkStatus = async () => {
// // // // //       checkCounter++
// // // // //       const statusChanged = await checkAlertStatus(alertId)
// // // // //       if (statusChanged) {
// // // // //         return
// // // // //       }
// // // // //       if (checkCounter === 1) {
// // // // //         setShowAlertNotification(true)
// // // // //         toast.error("⚠️ Hospitals haven't responded yet. Alert escalated!", {
// // // // //           duration: 10000,
// // // // //         })
// // // // //         setTimeout(checkStatus, 180000)
// // // // //       } else if (checkCounter === 2) {
// // // // //         toast.error("🚨 Still no response from hospitals. Please call emergency services directly!", {
// // // // //           duration: 15000,
// // // // //         })
// // // // //       }
// // // // //     }
// // // // //     const timer = setTimeout(checkStatus, 180000)
// // // // //     setAlertTimer(timer)
// // // // //   }

// // // // //   const handleEmergencySOS = async () => {
// // // // //     if (isEmergencyActive || emergencyButtonDisabled) return
// // // // //     setIsEmergencyActive(true)
// // // // //     setEmergencyButtonDisabled(true)
// // // // //     if (!location && navigator.geolocation) {
// // // // //       navigator.geolocation.getCurrentPosition(
// // // // //         async (position) => {
// // // // //           const currentLocation = {
// // // // //             lat: position.coords.latitude,
// // // // //             lng: position.coords.longitude,
// // // // //           }
// // // // //           setLocation(currentLocation)
// // // // //           await sendQuickEmergencyAlert(currentLocation)
// // // // //         },
// // // // //         async (error) => {
// // // // //           await sendQuickEmergencyAlert(null)
// // // // //         },
// // // // //       )
// // // // //     } else {
// // // // //       await sendQuickEmergencyAlert(location)
// // // // //     }
// // // // //   }

// // // // //   const sendQuickEmergencyAlert = async (currentLocation: { lat: number; lng: number } | null) => {
// // // // //     try {
// // // // //       const response = await fetch("/api/user/emergency-alert", {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({
// // // // //           location: currentLocation,
// // // // //           message: "🚨 EMERGENCY SOS - Immediate assistance needed!",
// // // // //           priority: "critical",
// // // // //         }),
// // // // //       })
// // // // //       const data = await response.json()
// // // // //       if (response.ok) {
// // // // //         toast.success(`🚨 Emergency alert sent! User: ${data.userInfo.name} | Phone: ${data.userInfo.phone}`)
// // // // //         toast.success("🏥 Searching for nearby hospitals... Please wait!")
// // // // //         startAlertMonitoring(data.alertId)
// // // // //         setTimeout(() => {
// // // // //           fetchDashboardData()
// // // // //         }, 1000)
// // // // //         setIsEmergencyActive(false)
// // // // //       } else {
// // // // //         toast.error(data.message || "Failed to send emergency alert")
// // // // //         setIsEmergencyActive(false)
// // // // //         setEmergencyButtonDisabled(false)
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Emergency alert error:", error)
// // // // //       toast.error("Emergency system error. Please try again.")
// // // // //       setIsEmergencyActive(false)
// // // // //       setEmergencyButtonDisabled(false)
// // // // //     }
// // // // //   }

// // // // //   const handleFormEmergencyAlert = async () => {
// // // // //     if (!emergencyForm.message.trim()) {
// // // // //       toast.error("Please describe your emergency")
// // // // //       return
// // // // //     }
// // // // //     setIsEmergencyActive(true)
// // // // //     try {
// // // // //       const position = await new Promise<GeolocationPosition>((resolve, reject) => {
// // // // //         navigator.geolocation.getCurrentPosition(resolve, reject, {
// // // // //           enableHighAccuracy: true,
// // // // //           timeout: 10000,
// // // // //           maximumAge: 60000,
// // // // //         })
// // // // //       })
// // // // //       const response = await fetch("/api/user/emergency-alert", {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({
// // // // //           message: emergencyForm.message,
// // // // //           priority: emergencyForm.priority,
// // // // //           location: {
// // // // //             lat: position.coords.latitude,
// // // // //             lng: position.coords.longitude,
// // // // //           },
// // // // //         }),
// // // // //       })
// // // // //       const data = await response.json()
// // // // //       if (response.ok) {
// // // // //         toast.success("🚨 Emergency alert sent to nearby hospitals!")
// // // // //         setEmergencyForm({ message: "", priority: "high" })
// // // // //         setEmergencyButtonDisabled(true)
// // // // //         setAlertStatus("pending")
// // // // //         startAlertMonitoring(data.alertId)
// // // // //         fetchDashboardData()
// // // // //         window.addEventListener("beforeunload", (e) => {
// // // // //           e.preventDefault()
// // // // //           e.returnValue = ""
// // // // //         })
// // // // //       } else {
// // // // //         toast.error(data.message || "Failed to send emergency alert")
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Error sending emergency alert:", error)
// // // // //       if (error instanceof GeolocationPositionError) {
// // // // //         toast.error("Location access required for emergency alerts")
// // // // //       } else {
// // // // //         toast.error("Failed to send emergency alert")
// // // // //       }
// // // // //     } finally {
// // // // //       setIsEmergencyActive(false)
// // // // //     }
// // // // //   }

// // // // //   const dismissAlert = async () => {
// // // // //     if (!currentAlert) return
// // // // //     try {
// // // // //       const response = await fetch("/api/user/dismiss-alert", {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({ alertId: currentAlert._id }),
// // // // //       })
// // // // //       if (response.ok) {
// // // // //         setShowAlertNotification(false)
// // // // //         setCurrentAlert(null)
// // // // //         setEmergencyButtonDisabled(false)
// // // // //         if (alertTimer) {
// // // // //           clearTimeout(alertTimer)
// // // // //           setAlertTimer(null)
// // // // //         }
// // // // //         toast.success("Alert dismissed")
// // // // //         fetchDashboardData()
// // // // //         window.removeEventListener("beforeunload", () => {})
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Error dismissing alert:", error)
// // // // //       toast.error("Failed to dismiss alert")
// // // // //     }
// // // // //   }

// // // // //   const handleDeleteAlert = async (alertId: string) => {
// // // // //     const confirmed = window.confirm(
// // // // //       "⚠️ Are you sure you want to delete this emergency alert? This action cannot be undone.",
// // // // //     )
// // // // //     if (!confirmed) return
// // // // //     try {
// // // // //       const response = await fetch("/api/user/emergency-alerts/delete", {
// // // // //         method: "DELETE",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({ alertId }),
// // // // //       })
// // // // //       if (response.ok) {
// // // // //         toast.success("✅ Emergency alert deleted successfully")
// // // // //         fetchDashboardData()
// // // // //       } else {
// // // // //         toast.error("Failed to delete alert")
// // // // //       }
// // // // //     } catch (error) {
// // // // //       toast.error("Error deleting alert")
// // // // //     }
// // // // //   }

// // // // //   const saveMoodEntry = async () => {
// // // // //     try {
// // // // //       const response = await fetch("/api/user/mood-entry", {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({
// // // // //           mood: currentMood,
// // // // //           energy: currentEnergy,
// // // // //           anxiety: currentAnxiety,
// // // // //           sleep: currentSleep,
// // // // //           notes: moodNotes,
// // // // //         }),
// // // // //       })
// // // // //       if (response.ok) {
// // // // //         toast.success("✅ Mood entry saved!")
// // // // //         fetchDashboardData()
// // // // //         setMoodNotes("")
// // // // //       } else {
// // // // //         toast.error("Failed to save mood entry")
// // // // //       }
// // // // //     } catch (error) {
// // // // //       toast.error("Error saving mood entry")
// // // // //     }
// // // // //   }

// // // // //   const handleMarkAnnouncementRead = async (announcementId: string) => {
// // // // //     try {
// // // // //       const response = await fetch("/api/announcements/mark-read", {
// // // // //         method: "POST",
// // // // //         headers: { "Content-Type": "application/json" },
// // // // //         body: JSON.stringify({ announcementId }),
// // // // //       })
// // // // //       if (response.ok) {
// // // // //         toast.success("Announcement marked as read.")
// // // // //         fetchDashboardData() // Re-fetch to update read status and notification count
// // // // //       } else {
// // // // //         toast.error("Failed to mark announcement as read.")
// // // // //       }
// // // // //     } catch (error) {
// // // // //       toast.error("Error marking announcement as read.")
// // // // //     }
// // // // //   }

// // // // //   const getMoodIcon = (mood: number) => {
// // // // //     if (mood >= 8) return <Smile className="w-6 h-6 text-green-500" />
// // // // //     if (mood >= 6) return <Meh className="w-6 h-6 text-yellow-500" />
// // // // //     return <Frown className="w-6 h-6 text-red-500" />
// // // // //   }

// // // // //   const getMoodColor = (mood: number) => {
// // // // //     if (mood >= 8) return "text-green-600"
// // // // //     if (mood >= 6) return "text-yellow-600"
// // // // //     return "text-red-600"
// // // // //   }

// // // // //   const getWellnessScore = () => {
// // // // //     if (!todayMood) return 0
// // // // //     const score = (todayMood.mood + todayMood.energy + (10 - todayMood.anxiety) + Math.min(todayMood.sleep, 8)) / 4
// // // // //     return Math.round(score * 10)
// // // // //   }

// // // // //   const getWeeklyAverage = () => {
// // // // //     if (moodData.length === 0) return 0
// // // // //     const recentData = moodData.slice(-7)
// // // // //     const avgMood = recentData.reduce((sum, entry) => sum + entry.mood, 0) / recentData.length
// // // // //     return Math.round(avgMood * 10) / 10
// // // // //   }

// // // // //   const fetchUserProfile = async () => {
// // // // //     try {
// // // // //       const response = await fetch("/api/user/profile")
// // // // //       const data = await response.json()
// // // // //       if (response.ok && data.user) {
// // // // //         setUserProfile(data.user)
// // // // //       }
// // // // //     } catch (error) {
// // // // //       console.error("Error fetching user profile:", error)
// // // // //     }
// // // // //   }

// // // // //   const formatTimeAgo = (dateString: string) => {
// // // // //     const now = new Date()
// // // // //     const alertTime = new Date(dateString)
// // // // //     const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60))
// // // // //     if (diffInMinutes < 1) return "Just now"
// // // // //     if (diffInMinutes < 60) return `${diffInMinutes}m ago`
// // // // //     const diffInHours = Math.floor(diffInMinutes / 60)
// // // // //     if (diffInHours < 24) return `${diffInHours}h ago`
// // // // //     return alertTime.toLocaleDateString()
// // // // //   }

// // // // //   const getPriorityColor = (priority: string) => {
// // // // //     switch (priority) {
// // // // //       case "critical":
// // // // //         return "bg-red-500 text-white"
// // // // //       case "high":
// // // // //         return "bg-orange-500 text-white"
// // // // //       case "medium":
// // // // //         return "bg-yellow-500 text-black"
// // // // //       default:
// // // // //         return "bg-gray-500 text-white"
// // // // //     }
// // // // //   }

// // // // //   const getStatusColor = (status: string) => {
// // // // //     switch (status) {
// // // // //       case "pending":
// // // // //         return "bg-yellow-500 text-white"
// // // // //       case "accepted":
// // // // //         return "bg-green-500 text-white"
// // // // //       case "declined":
// // // // //         return "bg-red-500 text-white"
// // // // //       default:
// // // // //         return "bg-gray-500 text-white"
// // // // //     }
// // // // //   }

// // // // //   const formatLocationAddress = (address: any) => {
// // // // //     if (!address) return "Location not available"
// // // // //     const parts = [
// // // // //       address.area,
// // // // //       address.village || address.townOrVillage,
// // // // //       address.subDistrict || address.taluka,
// // // // //       address.district,
// // // // //       address.state || "Gujarat",
// // // // //       address.pincode,
// // // // //     ].filter(Boolean)
// // // // //     return parts.join(", ")
// // // // //   }

// // // // //   const openGoogleMaps = (address: any) => {
// // // // //     if (!address) {
// // // // //       toast.error("Location not available")
// // // // //       return
// // // // //     }
// // // // //     const searchQuery = formatLocationAddress(address)
// // // // //     const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
// // // // //     window.open(googleMapsUrl, "_blank")
// // // // //     toast.success("🗺️ Opening location in Google Maps...")
// // // // //   }

// // // // //   const getAuthorIcon = (authorType: string) => {
// // // // //     return authorType === "Doctor" ? (
// // // // //       <Stethoscope className="w-5 h-5 text-green-600" />
// // // // //     ) : (
// // // // //       <Building2 className="w-5 h-5 text-purple-600" />
// // // // //     )
// // // // //   }

// // // // //   const getAuthorBadgeColor = (authorType: string) => {
// // // // //     return authorType === "Doctor"
// // // // //       ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
// // // // //       : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
// // // // //   }

// // // // //   if (loading) {
// // // // //     return (
// // // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
// // // // //         <div className="text-center">
// // // // //           <motion.div
// // // // //             className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
// // // // //             animate={{ rotate: 360 }}
// // // // //             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// // // // //           />
// // // // //           <p className="text-gray-600 dark:text-gray-400 text-lg">Loading your wellness dashboard...</p>
// // // // //         </div>
// // // // //       </div>
// // // // //     )
// // // // //   }

// // // // //   return (
// // // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
// // // // //       {/* Emergency Alert Notification */}
// // // // //       <AnimatePresence>
// // // // //         {showAlertNotification && currentAlert && (
// // // // //           <motion.div
// // // // //             initial={{ opacity: 0, y: -100 }}
// // // // //             animate={{ opacity: 1, y: 0 }}
// // // // //             exit={{ opacity: 0, y: -100 }}
// // // // //             className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
// // // // //           >
// // // // //             <Alert className="border-red-500 bg-red-50 dark:bg-red-900/20">
// // // // //               <AlertTriangle className="h-4 w-4 text-red-600" />
// // // // //               <AlertDescription className="flex items-center justify-between">
// // // // //                 <div>
// // // // //                   <p className="font-semibold text-red-800 dark:text-red-200">🚨 HIGH ALERT: No Hospital Response</p>
// // // // //                   <p className="text-red-700 dark:text-red-300 text-sm">
// // // // //                     Your emergency alert is still pending. Consider calling emergency services directly.
// // // // //                   </p>
// // // // //                   {currentAlert && (
// // // // //                     <p className="text-xs text-red-600 dark:text-red-400 mt-1">
// // // // //                       User: {currentAlert.userInfo?.name || userProfile?.name || "Unknown"} | Phone:{" "}
// // // // //                       {currentAlert.userInfo?.phone || userProfile?.phone || "Unknown"}
// // // // //                     </p>
// // // // //                   )}
// // // // //                 </div>
// // // // //                 <Button variant="ghost" size="sm" onClick={dismissAlert} className="text-red-600 hover:text-red-800">
// // // // //                   <CheckCircle className="w-4 h-4" />
// // // // //                 </Button>
// // // // //               </AlertDescription>
// // // // //             </Alert>
// // // // //           </motion.div>
// // // // //         )}
// // // // //       </AnimatePresence>
// // // // //       {/* Header with Animated Icons */}
// // // // //       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
// // // // //         <AnimatedHealthIcons />
// // // // //         <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
// // // // //           <div className="flex items-center space-x-4">
// // // // //             <motion.div
// // // // //               className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg"
// // // // //               animate={{
// // // // //                 scale: [1, 1.1, 1],
// // // // //                 rotate: [0, 5, -5, 0],
// // // // //               }}
// // // // //               transition={{
// // // // //                 duration: 3,
// // // // //                 repeat: Number.POSITIVE_INFINITY,
// // // // //                 ease: "easeInOut",
// // // // //               }}
// // // // //             >
// // // // //               <Heart className="w-6 h-6 text-white" />
// // // // //             </motion.div>
// // // // //             <div>
// // // // //               <h1 className="text-xl font-bold text-gray-900 dark:text-white">RuralReach</h1>
// // // // //               <p className="text-sm text-gray-600 dark:text-gray-400">Your Wellness Dashboard</p>
// // // // //             </div>
// // // // //           </div>
// // // // //           <div className="flex items-center space-x-4">
// // // // //             {/* Hospital Info Button */}
// // // // //             <Dialog open={showHospitalInfo} onOpenChange={setShowHospitalInfo}>
// // // // //               <DialogTrigger asChild>
// // // // //                 <motion.button
// // // // //                   whileHover={{ scale: 1.05 }}
// // // // //                   whileTap={{ scale: 0.95 }}
// // // // //                   className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
// // // // //                 >
// // // // //                   <Building2 className="w-4 h-4" />
// // // // //                   <span className="text-sm font-medium">Hospital Info</span>
// // // // //                 </motion.button>
// // // // //               </DialogTrigger>
// // // // //               <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
// // // // //                 <DialogHeader>
// // // // //                   <DialogTitle className="flex items-center space-x-2">
// // // // //                     <Building2 className="w-5 h-5 text-purple-600" />
// // // // //                     <span>Connected Hospitals</span>
// // // // //                   </DialogTitle>
// // // // //                 </DialogHeader>
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
// // // // //                   {hospitals.map((hospital) => (
// // // // //                     <motion.div
// // // // //                       key={hospital._id}
// // // // //                       initial={{ opacity: 0, y: 20 }}
// // // // //                       animate={{ opacity: 1, y: 0 }}
// // // // //                       className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
// // // // //                     >
// // // // //                       <div className="flex items-start justify-between mb-3">
// // // // //                         <div className="flex items-center space-x-2">
// // // // //                           <Building2 className="w-5 h-5 text-purple-600" />
// // // // //                           <h3 className="font-semibold text-lg">{hospital.name}</h3>
// // // // //                           {hospital.isVerified && <Award className="w-4 h-4 text-green-500" />}
// // // // //                         </div>
// // // // //                         <div className="flex items-center space-x-2">
// // // // //                           <Badge variant={hospital.isAvailable ? "default" : "secondary"}>
// // // // //                             {hospital.isAvailable ? "Available" : "Unavailable"}
// // // // //                           </Badge>
// // // // //                           {hospital.isHandleEmergency && (
// // // // //                             <Badge variant="destructive" className="text-xs">
// // // // //                               Emergency 24/7
// // // // //                             </Badge>
// // // // //                           )}
// // // // //                         </div>
// // // // //                       </div>
// // // // //                       <div className="space-y-2 text-sm">
// // // // //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// // // // //                           <Mail className="w-4 h-4" />
// // // // //                           <span>{hospital.email}</span>
// // // // //                         </div>
// // // // //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// // // // //                           <Phone className="w-4 h-4" />
// // // // //                           <span>{hospital.phone}</span>
// // // // //                         </div>
// // // // //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// // // // //                           <MapPin className="w-4 h-4" />
// // // // //                           <span>{hospital.address}</span>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                       <div className="mt-3">
// // // // //                         <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties:</p>
// // // // //                         <div className="flex flex-wrap gap-1">
// // // // //                           {hospital.specialties.map((specialty, index) => (
// // // // //                             <Badge key={index} variant="outline" className="text-xs">
// // // // //                               {specialty}
// // // // //                             </Badge>
// // // // //                           ))}
// // // // //                         </div>
// // // // //                       </div>
// // // // //                       <div className="mt-3 pt-3 border-t">
// // // // //                         <p className="text-xs text-gray-500">
// // // // //                           Joined: {new Date(hospital.createdAt).toLocaleDateString()}
// // // // //                         </p>
// // // // //                       </div>
// // // // //                     </motion.div>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               </DialogContent>
// // // // //             </Dialog>
// // // // //             <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
// // // // //               <Clock className="w-4 h-4" />
// // // // //               <span>Last checked: {lastAlertCheck.toLocaleTimeString()}</span>
// // // // //             </div>
// // // // //             <Button
// // // // //               variant="outline"
// // // // //               size="sm"
// // // // //               onClick={checkAlertStatus}
// // // // //               className="flex items-center space-x-2 bg-transparent"
// // // // //             >
// // // // //               <RefreshCw className="w-4 h-4" />
// // // // //               <span>Refresh</span>
// // // // //             </Button>
// // // // //             <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// // // // //               <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
// // // // //               {unreadAnnouncementsCount > 0 && (
// // // // //                 <motion.span
// // // // //                   className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
// // // // //                   animate={{ scale: [1, 1.2, 1] }}
// // // // //                   transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
// // // // //                 >
// // // // //                   {unreadAnnouncementsCount}
// // // // //                 </motion.span>
// // // // //               )}
// // // // //             </motion.div>
// // // // //             <ThemeToggle />
// // // // //             <UserDropdown />
// // // // //           </div>
// // // // //         </div>
// // // // //       </header>
// // // // //       <div className="container mx-auto px-6 py-8">
// // // // //         {/* Welcome Section */}
// // // // //         <motion.div
// // // // //           className="mb-8"
// // // // //           initial={{ opacity: 0, y: 20 }}
// // // // //           animate={{ opacity: 1, y: 0 }}
// // // // //           transition={{ duration: 0.6 }}
// // // // //         >
// // // // //           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user?.name}! 👋</h2>
// // // // //           <p className="text-gray-600 dark:text-gray-400">
// // // // //             How are you feeling today? Let's track your wellness journey and stay healthy together.
// // // // //           </p>
// // // // //         </motion.div>
// // // // //         {/* Emergency SOS Button - Always Available */}
// // // // //         <motion.div
// // // // //           className="mb-8"
// // // // //           initial={{ opacity: 0, scale: 0.9 }}
// // // // //           animate={{ opacity: 1, scale: 1 }}
// // // // //           transition={{ duration: 0.6, delay: 0.1 }}
// // // // //         >
// // // // //           <Card className="border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
// // // // //             <CardContent className="p-6">
// // // // //               <div className="flex items-center justify-between">
// // // // //                 <div className="flex items-center space-x-4">
// // // // //                   <motion.div
// // // // //                     className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
// // // // //                     animate={{
// // // // //                       boxShadow: [
// // // // //                         "0 0 0 0 rgba(239, 68, 68, 0.7)",
// // // // //                         "0 0 0 10px rgba(239, 68, 68, 0)",
// // // // //                         "0 0 0 0 rgba(239, 68, 68, 0)",
// // // // //                       ],
// // // // //                     }}
// // // // //                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// // // // //                   >
// // // // //                     <AlertTriangle className="w-6 h-6 text-white" />
// // // // //                   </motion.div>
// // // // //                   <div>
// // // // //                     <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Quick Emergency Support</h3>
// // // // //                     <p className="text-red-600 dark:text-red-300">Need immediate help? Press for instant alert</p>
// // // // //                     {location && (
// // // // //                       <p className="text-xs text-red-500 dark:text-red-400 mt-1">
// // // // //                         📍 Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
// // // // //                       </p>
// // // // //                     )}
// // // // //                     {emergencyButtonDisabled && (
// // // // //                       <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
// // // // //                         ⚠️ Emergency alert already sent. Waiting for hospital response...
// // // // //                       </p>
// // // // //                     )}
// // // // //                   </div>
// // // // //                 </div>
// // // // //                 <motion.div
// // // // //                   whileHover={{ scale: emergencyButtonDisabled ? 1 : 1.05 }}
// // // // //                   whileTap={{ scale: emergencyButtonDisabled ? 1 : 0.95 }}
// // // // //                 >
// // // // //                   <Button
// // // // //                     onClick={handleEmergencySOS}
// // // // //                     disabled={isEmergencyActive || emergencyButtonDisabled}
// // // // //                     className={`font-bold px-8 py-3 text-lg shadow-lg transition-all duration-300 ${
// // // // //                       emergencyButtonDisabled
// // // // //                         ? "bg-gray-400 cursor-not-allowed"
// // // // //                         : "bg-red-600 hover:bg-red-700 hover:shadow-xl"
// // // // //                     } text-white`}
// // // // //                   >
// // // // //                     {isEmergencyActive
// // // // //                       ? "🚨 Sending..."
// // // // //                       : emergencyButtonDisabled
// // // // //                         ? "🚨 Alert Sent"
// // // // //                         : "🆘 SOS Emergency"}
// // // // //                   </Button>
// // // // //                 </motion.div>
// // // // //               </div>
// // // // //             </CardContent>
// // // // //           </Card>
// // // // //         </motion.div>
// // // // //         {/* Emergency Status Banner */}
// // // // //         {alertStatus && (
// // // // //           <motion.div
// // // // //             className="mb-8"
// // // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // // //             animate={{ opacity: 1, scale: 1 }}
// // // // //             transition={{ duration: 0.6, delay: 0.1 }}
// // // // //           >
// // // // //             <Card
// // // // //               className={`border-2 ${
// // // // //                 alertStatus === "pending"
// // // // //                   ? "border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
// // // // //                   : alertStatus === "accepted"
// // // // //                     ? "border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
// // // // //                     : "border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20"
// // // // //               }`}
// // // // //             >
// // // // //               <CardContent className="p-6">
// // // // //                 <div className="flex items-center justify-between">
// // // // //                   <div className="flex items-center space-x-4">
// // // // //                     <motion.div
// // // // //                       className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
// // // // //                         alertStatus === "pending"
// // // // //                           ? "bg-yellow-500"
// // // // //                           : alertStatus === "accepted"
// // // // //                             ? "bg-green-500"
// // // // //                             : "bg-red-500"
// // // // //                       }`}
// // // // //                       animate={{
// // // // //                         boxShadow:
// // // // //                           alertStatus === "pending"
// // // // //                             ? [
// // // // //                                 "0 0 0 0 rgba(234, 179, 8, 0.7)",
// // // // //                                 "0 0 0 10px rgba(234, 179, 8, 0)",
// // // // //                                 "0 0 0 0 rgba(234, 179, 8, 0)",
// // // // //                               ]
// // // // //                             : undefined,
// // // // //                       }}
// // // // //                       transition={{ duration: 2, repeat: alertStatus === "pending" ? Number.POSITIVE_INFINITY : 0 }}
// // // // //                     >
// // // // //                       {alertStatus === "pending" ? (
// // // // //                         <Timer className="w-6 h-6 text-white" />
// // // // //                       ) : alertStatus === "accepted" ? (
// // // // //                         <CheckCircle className="w-6 h-6 text-white" />
// // // // //                       ) : (
// // // // //                         <XCircle className="w-6 h-6 text-white" />
// // // // //                       )}
// // // // //                     </motion.div>
// // // // //                     <div>
// // // // //                       <h3
// // // // //                         className={`text-lg font-semibold ${
// // // // //                           alertStatus === "pending"
// // // // //                             ? "text-yellow-800 dark:text-yellow-200"
// // // // //                             : alertStatus === "accepted"
// // // // //                               ? "text-green-800 dark:text-green-200"
// // // // //                               : "text-red-800 dark:text-red-200"
// // // // //                         }`}
// // // // //                       >
// // // // //                         {alertStatus === "pending" && "🚨 Emergency Alert Sent"}
// // // // //                         {alertStatus === "accepted" && "✅ Hospital is Coming!"}
// // // // //                         {alertStatus === "declined" && "❌ Alert Declined"}
// // // // //                       </h3>
// // // // //                       <p
// // // // //                         className={`${
// // // // //                           alertStatus === "pending"
// // // // //                             ? "text-yellow-600 dark:text-yellow-300"
// // // // //                             : alertStatus === "accepted"
// // // // //                               ? "text-green-600 dark:text-green-300"
// // // // //                               : "text-red-600 dark:text-red-300"
// // // // //                         }`}
// // // // //                       >
// // // // //                         {alertStatus === "pending" && "Waiting for hospital response..."}
// // // // //                         {alertStatus === "accepted" && "A hospital has accepted your emergency request"}
// // // // //                         {alertStatus === "declined" && "Your emergency request was declined"}
// // // // //                       </p>
// // // // //                     </div>
// // // // //                   </div>
// // // // //                   <Button onClick={dismissAlert} variant="outline" className="font-bold px-6 py-2 bg-transparent">
// // // // //                     Dismiss
// // // // //                   </Button>
// // // // //                 </div>
// // // // //               </CardContent>
// // // // //             </Card>
// // // // //           </motion.div>
// // // // //         )}
// // // // //         {/* Quick Stats */}
// // // // //         <motion.div
// // // // //           className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
// // // // //           initial={{ opacity: 0, y: 20 }}
// // // // //           animate={{ opacity: 1, y: 0 }}
// // // // //           transition={{ duration: 0.6, delay: 0.2 }}
// // // // //         >
// // // // //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// // // // //             <Card className="hover:shadow-lg transition-all duration-300">
// // // // //               <CardContent className="p-6">
// // // // //                 <div className="flex items-center justify-between">
// // // // //                   <div>
// // // // //                     <p className="text-sm text-gray-600 dark:text-gray-400">Wellness Score</p>
// // // // //                     <p className="text-2xl font-bold text-blue-600">{getWellnessScore()}%</p>
// // // // //                     <p className="text-xs text-gray-500 mt-1">Based on today's data</p>
// // // // //                   </div>
// // // // //                   <motion.div
// // // // //                     className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
// // // // //                     animate={{ rotate: [0, 360] }}
// // // // //                     transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// // // // //                   >
// // // // //                     <Target className="w-6 h-6 text-blue-600" />
// // // // //                   </motion.div>
// // // // //                 </div>
// // // // //               </CardContent>
// // // // //             </Card>
// // // // //           </motion.div>
// // // // //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// // // // //             <Card className="hover:shadow-lg transition-all duration-300">
// // // // //               <CardContent className="p-6">
// // // // //                 <div className="flex items-center justify-between">
// // // // //                   <div>
// // // // //                     <p className="text-sm text-gray-600 dark:text-gray-400">Today's Mood</p>
// // // // //                     <div className="flex items-center space-x-2">
// // // // //                       {todayMood ? getMoodIcon(todayMood.mood) : <Meh className="w-6 h-6 text-gray-400" />}
// // // // //                       <span
// // // // //                         className={`text-lg font-semibold ${todayMood ? getMoodColor(todayMood.mood) : "text-gray-400"}`}
// // // // //                       >
// // // // //                         {todayMood?.mood || "Not set"}
// // // // //                       </span>
// // // // //                     </div>
// // // // //                     <p className="text-xs text-gray-500 mt-1">Out of 10</p>
// // // // //                   </div>
// // // // //                   <motion.div
// // // // //                     className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
// // // // //                     animate={{
// // // // //                       scale: [1, 1.1, 1],
// // // // //                       rotate: [0, 10, -10, 0],
// // // // //                     }}
// // // // //                     transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
// // // // //                   >
// // // // //                     <Brain className="w-6 h-6 text-green-600" />
// // // // //                   </motion.div>
// // // // //                 </div>
// // // // //               </CardContent>
// // // // //             </Card>
// // // // //           </motion.div>
// // // // //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// // // // //             <Card className="hover:shadow-lg transition-all duration-300">
// // // // //               <CardContent className="p-6">
// // // // //                 <div className="flex items-center justify-between">
// // // // //                   <div>
// // // // //                     <p className="text-sm text-gray-600 dark:text-gray-400">Sleep Last Night</p>
// // // // //                     <p className="text-2xl font-bold text-purple-600">{todayMood?.sleep || 0}h</p>
// // // // //                     <p className="text-xs text-gray-500 mt-1">
// // // // //                       {(todayMood?.sleep || 0) >= 7 ? "Good sleep!" : "Need more rest"}
// // // // //                     </p>
// // // // //                   </div>
// // // // //                   <motion.div
// // // // //                     className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
// // // // //                     animate={{
// // // // //                       y: [0, -5, 0],
// // // // //                       opacity: [1, 0.7, 1],
// // // // //                     }}
// // // // //                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
// // // // //                   >
// // // // //                     <Moon className="w-6 h-6 text-purple-600" />
// // // // //                   </motion.div>
// // // // //                 </div>
// // // // //               </CardContent>
// // // // //             </Card>
// // // // //           </motion.div>
// // // // //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// // // // //             <Card className="hover:shadow-lg transition-all duration-300">
// // // // //               <CardContent className="p-6">
// // // // //                 <div className="flex items-center justify-between">
// // // // //                   <div>
// // // // //                     <p className="text-sm text-gray-600 dark:text-gray-400">Energy Level</p>
// // // // //                     <p className="text-2xl font-bold text-orange-600">{todayMood?.energy || 0}/10</p>
// // // // //                     <p className="text-xs text-gray-500 mt-1">Weekly avg: {getWeeklyAverage()}</p>
// // // // //                   </div>
// // // // //                   <motion.div
// // // // //                     className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center"
// // // // //                     animate={{
// // // // //                       scale: [1, 1.2, 1],
// // // // //                       rotate: [0, 180, 360],
// // // // //                     }}
// // // // //                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// // // // //                   >
// // // // //                     <Zap className="w-6 h-6 text-orange-600" />
// // // // //                   </motion.div>
// // // // //                 </div>
// // // // //               </CardContent>
// // // // //             </Card>
// // // // //           </motion.div>
// // // // //         </motion.div>
// // // // //         {/* Main Content Tabs */}
// // // // //         <motion.div
// // // // //           initial={{ opacity: 0, y: 20 }}
// // // // //           animate={{ opacity: 1, y: 0 }}
// // // // //           transition={{ duration: 0.6, delay: 0.3 }}
// // // // //         >
// // // // //           <Tabs defaultValue="mood" className="space-y-6">
// // // // //             <TabsList className="grid w-full grid-cols-5">
// // // // //               <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
// // // // //               <TabsTrigger value="posts">Posts</TabsTrigger>
// // // // //               <TabsTrigger value="announcements">Announcements</TabsTrigger>
// // // // //               <TabsTrigger value="emergency">Emergency Alert</TabsTrigger>
// // // // //               <TabsTrigger value="past-alerts">Past Alerts</TabsTrigger>
// // // // //               <TabsTrigger value="assessment">Self Assessment</TabsTrigger>
// // // // //             </TabsList>
// // // // //             {/* Mood Tracking Tab */}
// // // // //             <TabsContent value="mood" className="space-y-6">
// // // // //               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // // //                 {/* Today's Mood Entry */}
// // // // //                 <Card className="hover:shadow-lg transition-shadow duration-300">
// // // // //                   <CardHeader>
// // // // //                     <CardTitle className="flex items-center space-x-2">
// // // // //                       <Plus className="w-5 h-5" />
// // // // //                       <span>Log Today's Mood</span>
// // // // //                     </CardTitle>
// // // // //                   </CardHeader>
// // // // //                   <CardContent className="space-y-6">
// // // // //                     <div>
// // // // //                       <label className="block text-sm font-medium mb-2">Mood (1-10)</label>
// // // // //                       <div className="flex items-center space-x-4">
// // // // //                         <input
// // // // //                           type="range"
// // // // //                           min="1"
// // // // //                           max="10"
// // // // //                           value={currentMood}
// // // // //                           onChange={(e) => setCurrentMood(Number(e.target.value))}
// // // // //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// // // // //                         />
// // // // //                         <div className="flex items-center space-x-2">
// // // // //                           {getMoodIcon(currentMood)}
// // // // //                           <span className="text-lg font-semibold w-8">{currentMood}</span>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <label className="block text-sm font-medium mb-2">Energy Level (1-10)</label>
// // // // //                       <div className="flex items-center space-x-4">
// // // // //                         <input
// // // // //                           type="range"
// // // // //                           min="1"
// // // // //                           max="10"
// // // // //                           value={currentEnergy}
// // // // //                           onChange={(e) => setCurrentEnergy(Number(e.target.value))}
// // // // //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// // // // //                         />
// // // // //                         <div className="flex items-center space-x-2">
// // // // //                           <Zap className="w-5 h-5 text-orange-500" />
// // // // //                           <span className="text-lg font-semibold w-8">{currentEnergy}</span>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <label className="block text-sm font-medium mb-2">Anxiety Level (1-10)</label>
// // // // //                       <div className="flex items-center space-x-4">
// // // // //                         <input
// // // // //                           type="range"
// // // // //                           min="1"
// // // // //                           max="10"
// // // // //                           value={currentAnxiety}
// // // // //                           onChange={(e) => setCurrentAnxiety(Number(e.target.value))}
// // // // //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// // // // //                         />
// // // // //                         <div className="flex items-center space-x-2">
// // // // //                           <AlertTriangle className="w-5 h-5 text-red-500" />
// // // // //                           <span className="text-lg font-semibold w-8">{currentAnxiety}</span>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <label className="block text-sm font-medium mb-2">Sleep Hours</label>
// // // // //                       <div className="flex items-center space-x-4">
// // // // //                         <input
// // // // //                           type="range"
// // // // //                           min="0"
// // // // //                           max="12"
// // // // //                           value={currentSleep}
// // // // //                           onChange={(e) => setCurrentSleep(Number(e.target.value))}
// // // // //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// // // // //                         />
// // // // //                         <div className="flex items-center space-x-2">
// // // // //                           <Moon className="w-5 h-5 text-purple-500" />
// // // // //                           <span className="text-lg font-semibold w-8">{currentSleep}h</span>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                     <div>
// // // // //                       <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
// // // // //                       <Textarea
// // // // //                         value={moodNotes}
// // // // //                         onChange={(e) => setMoodNotes(e.target.value)}
// // // // //                         placeholder="How are you feeling today? Any specific thoughts or events?"
// // // // //                         className="w-full"
// // // // //                         rows={3}
// // // // //                       />
// // // // //                     </div>
// // // // //                     <Button
// // // // //                       onClick={saveMoodEntry}
// // // // //                       className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
// // // // //                     >
// // // // //                       Save Mood Entry
// // // // //                     </Button>
// // // // //                   </CardContent>
// // // // //                 </Card>
// // // // //                 {/* Mood Chart */}
// // // // //                 <Card className="hover:shadow-lg transition-shadow duration-300">
// // // // //                   <CardHeader>
// // // // //                     <CardTitle className="flex items-center space-x-2">
// // // // //                       <BarChart3 className="w-5 h-5" />
// // // // //                       <span>7-Day Mood Trend</span>
// // // // //                     </CardTitle>
// // // // //                   </CardHeader>
// // // // //                   <CardContent>
// // // // //                     {moodData.length > 0 ? (
// // // // //                       <div className="space-y-4">
// // // // //                         {moodData.slice(-7).map((entry, index) => (
// // // // //                           <motion.div
// // // // //                             key={index}
// // // // //                             className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
// // // // //                             initial={{ opacity: 0, x: -20 }}
// // // // //                             animate={{ opacity: 1, x: 0 }}
// // // // //                             transition={{ delay: index * 0.1 }}
// // // // //                           >
// // // // //                             <div className="flex items-center space-x-3">
// // // // //                               <Calendar className="w-4 h-4 text-gray-500" />
// // // // //                               <span className="text-sm text-gray-600 dark:text-gray-400">
// // // // //                                 {new Date(entry.date).toLocaleDateString()}
// // // // //                               </span>
// // // // //                             </div>
// // // // //                             <div className="flex items-center space-x-3">
// // // // //                               {getMoodIcon(entry.mood)}
// // // // //                               <Progress value={entry.mood * 10} className="w-20" />
// // // // //                               <span className="text-sm font-medium w-12">{entry.mood}/10</span>
// // // // //                             </div>
// // // // //                           </motion.div>
// // // // //                         ))}
// // // // //                         <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
// // // // //                           <div className="flex items-center justify-between">
// // // // //                             <span className="text-sm text-blue-700 dark:text-blue-300">Weekly Average</span>
// // // // //                             <div className="flex items-center space-x-2">
// // // // //                               <TrendingUp className="w-4 h-4 text-blue-600" />
// // // // //                               <span className="font-semibold text-blue-600">{getWeeklyAverage()}/10</span>
// // // // //                             </div>
// // // // //                           </div>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     ) : (
// // // // //                       <div className="text-center py-8">
// // // // //                         <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// // // // //                         <p className="text-gray-600 dark:text-gray-400">No mood data yet</p>
// // // // //                         <p className="text-sm text-gray-500">Start tracking to see your trends</p>
// // // // //                       </div>
// // // // //                     )}
// // // // //                   </CardContent>
// // // // //                 </Card>
// // // // //               </div>
// // // // //             </TabsContent>
// // // // //             {/* Combined Posts Tab */}
// // // // //             <TabsContent value="posts" className="space-y-6">
// // // // //               <Card>
// // // // //                 <CardHeader>
// // // // //                   <CardTitle className="flex items-center space-x-2">
// // // // //                     <FileText className="w-5 h-5 text-blue-600" />
// // // // //                     <span>Healthcare Posts</span>
// // // // //                     <Badge variant="secondary">{allPosts.length} posts</Badge>
// // // // //                   </CardTitle>
// // // // //                 </CardHeader>
// // // // //                 <CardContent>
// // // // //                   {allPosts.length > 0 ? (
// // // // //                     <div className="space-y-6">
// // // // //                       {allPosts.map((post, index) => (
// // // // //                         <motion.div
// // // // //                           key={post._id}
// // // // //                           initial={{ opacity: 0, y: 20 }}
// // // // //                           animate={{ opacity: 1, y: 0 }}
// // // // //                           transition={{ delay: index * 0.1 }}
// // // // //                           whileHover={{ scale: 1.01 }}
// // // // //                           className="border rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
// // // // //                         >
// // // // //                           {/* Post Header */}
// // // // //                           <div className="flex items-start justify-between mb-4">
// // // // //                             <div className="flex items-center space-x-4">
// // // // //                               <div
// // // // //                                 className={`w-12 h-12 rounded-full flex items-center justify-center ${getAuthorBadgeColor(post.authorType)}`}
// // // // //                               >
// // // // //                                 {getAuthorIcon(post.authorType)}
// // // // //                               </div>
// // // // //                               <div>
// // // // //                                 <div className="flex items-center space-x-2">
// // // // //                                   <p className="font-semibold text-lg">
// // // // //                                      {post.authorType === "Doctor" ? "Dr. " : "Hospital "}
// // // // //                                       {post.postby || "Mahadev"}
// // // // //                                   </p>
// // // // //                                   <Badge className={getAuthorBadgeColor(post.authorType)}>{post.authorType}</Badge>
// // // // //                                 </div>
// // // // //                                 <p className="text-sm text-gray-500 dark:text-gray-400">
// // // // //                                   {post.authorType === "Doctor" ? "Medical Professional" : "Healthcare Institution"}
// // // // //                                 </p>
// // // // //                                 {post.mentionedId && (
// // // // //                                   <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
// // // // //                                     mentioned {post.mentionedType === "Doctor" ? "Dr. " : ""}
// // // // //                                     {post.mentionedId.name}
// // // // //                                   </p>
// // // // //                                 )}
// // // // //                               </div>
// // // // //                             </div>
// // // // //                             <div className="flex items-center space-x-3">
// // // // //                               <Badge variant="outline" className="capitalize">
// // // // //                                 {post.category.replace("-", " ")}
// // // // //                               </Badge>
// // // // //                               <div className="flex items-center space-x-1 text-xs text-gray-500">
// // // // //                                 <Clock className="w-3 h-3" />
// // // // //                                 <span>{formatTimeAgo(post.createdAt)}</span>
// // // // //                               </div>
// // // // //                             </div>
// // // // //                           </div>
// // // // //                           {/* Post Content */}
// // // // //                           <div className="mb-4">
// // // // //                             <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">{post.title}</h3>
// // // // //                             <div className="prose prose-gray dark:prose-invert max-w-none">
// // // // //                               <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{post.content}</p>
// // // // //                             </div>
// // // // //                           </div>
// // // // //                           {/* Tags */}
// // // // //                           {post.tags.length > 0 && (
// // // // //                             <div className="mb-4">
// // // // //                               <div className="flex items-center space-x-2 mb-2">
// // // // //                                 <Tag className="w-4 h-4 text-gray-500" />
// // // // //                                 <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags:</span>
// // // // //                               </div>
// // // // //                               <div className="flex flex-wrap gap-2">
// // // // //                                 {post.tags.map((tag, tagIndex) => (
// // // // //                                   <Badge
// // // // //                                     key={tagIndex}
// // // // //                                     variant="secondary"
// // // // //                                     className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
// // // // //                                   >
// // // // //                                     #{tag}
// // // // //                                   </Badge>
// // // // //                                 ))}
// // // // //                               </div>
// // // // //                             </div>
// // // // //                           )}
// // // // //                           {/* Post Actions */}
// // // // //                           <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
// // // // //                             <div className="flex items-center space-x-6">
// // // // //                               <div className="flex items-center space-x-2 text-gray-600">
// // // // //                                 <Eye className="w-5 h-5" />
// // // // //                                 <span className="text-xs text-gray-500">Public post</span>
// // // // //                               </div>
// // // // //                             </div>
// // // // //                             <div className="flex items-center space-x-2">
// // // // //                               {post.isApproved && (
// // // // //                                 <Badge variant="outline" className="text-green-600 border-green-200">
// // // // //                                   <CheckCircle className="w-3 h-3 mr-1" />
// // // // //                                   Verified
// // // // //                                 </Badge>
// // // // //                               )}
// // // // //                             </div>
// // // // //                           </div>
// // // // //                         </motion.div>
// // // // //                       ))}
// // // // //                     </div>
// // // // //                   ) : (
// // // // //                     <div className="text-center py-16">
// // // // //                       <FileText className="w-20 h-20 text-gray-400 mx-auto mb-6" />
// // // // //                       <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
// // // // //                         No posts available
// // // // //                       </h3>
// // // // //                       <p className="text-gray-500 mb-4">Healthcare posts from doctors and hospitals will appear here</p>
// // // // //                       <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
// // // // //                         <div className="flex items-center space-x-2">
// // // // //                           <Stethoscope className="w-4 h-4" />
// // // // //                           <span>Doctor posts</span>
// // // // //                         </div>
// // // // //                         <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
// // // // //                         <div className="flex items-center space-x-2">
// // // // //                           <Building2 className="w-4 h-4" />
// // // // //                           <span>Hospital updates</span>
// // // // //                         </div>
// // // // //                       </div>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </CardContent>
// // // // //               </Card>
// // // // //             </TabsContent>
// // // // //             {/* Announcements Tab */}
// // // // //             <TabsContent value="announcements" className="space-y-6">
// // // // //               <Card>
// // // // //                 <CardHeader>
// // // // //                   <CardTitle className="flex items-center space-x-2">
// // // // //                     <Megaphone className="w-5 h-5 text-blue-600" />
// // // // //                     <span>All Announcements</span>
// // // // //                     {unreadAnnouncementsCount > 0 && (
// // // // //                       <Badge variant="destructive" className="ml-2">
// // // // //                         {unreadAnnouncementsCount} Unread
// // // // //                       </Badge>
// // // // //                     )}
// // // // //                   </CardTitle>
// // // // //                 </CardHeader>
// // // // //                 <CardContent>
// // // // //                   {allAnnouncements.length > 0 ? (
// // // // //                     <div className="space-y-4">
// // // // //                       {allAnnouncements.map((announcement, index) => (
// // // // //                         <motion.div
// // // // //                           key={announcement._id}
// // // // //                           initial={{ opacity: 0, y: 20 }}
// // // // //                           animate={{ opacity: 1, y: 0 }}
// // // // //                           transition={{ delay: index * 0.1 }}
// // // // //                           whileHover={{ scale: 1.01 }}
// // // // //                           className={`border rounded-lg p-4 hover:shadow-md transition-all duration-300 ${
// // // // //                             !announcement.isRead ? "bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200" : ""
// // // // //                           }`}
// // // // //                         >
// // // // //                           <div className="flex items-start justify-between mb-3">
// // // // //                             <div className="flex-1">
// // // // //                               <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
// // // // //                               <div className="flex items-center space-x-2 mb-2">
// // // // //                                 <Badge variant="outline">{announcement.ownerType}</Badge>
// // // // //                                 {announcement.mentions.length > 0 && (
// // // // //                                   <Badge variant="secondary" className="flex items-center gap-1">
// // // // //                                     <AtSign className="w-3 h-3" />
// // // // //                                     {announcement.mentions.length} Mention
// // // // //                                     {announcement.mentions.length > 1 ? "s" : ""}
// // // // //                                   </Badge>
// // // // //                                 )}
// // // // //                                 {!announcement.isRead && (
// // // // //                                   <Badge variant="destructive" className="ml-auto">
// // // // //                                     NEW
// // // // //                                   </Badge>
// // // // //                                 )}
// // // // //                               </div>
// // // // //                             </div>
// // // // //                             <div className="flex items-center space-x-2">
// // // // //                               <span className="text-xs text-gray-500">
// // // // //                                 {new Date(announcement.createdAt).toLocaleDateString()}
// // // // //                               </span>
// // // // //                               {!announcement.isRead && (
// // // // //                                 <Button
// // // // //                                   size="sm"
// // // // //                                   variant="outline"
// // // // //                                   onClick={() => handleMarkAnnouncementRead(announcement._id)}
// // // // //                                 >
// // // // //                                   Mark as Read
// // // // //                                 </Button>
// // // // //                               )}
// // // // //                             </div>
// // // // //                           </div>
// // // // //                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{announcement.content}</p>
// // // // //                           <div className="flex items-center justify-between">
// // // // //                             <div className="flex items-center space-x-2 text-gray-600">
// // // // //                               <Eye className="w-4 h-4" />
// // // // //                               <span className="text-sm">View details</span>
// // // // //                             </div>
// // // // //                           </div>
// // // // //                         </motion.div>
// // // // //                       ))}
// // // // //                     </div>
// // // // //                   ) : (
// // // // //                     <div className="text-center py-12">
// // // // //                       <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// // // // //                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
// // // // //                         No announcements yet
// // // // //                       </h3>
// // // // //                       <p className="text-gray-500">Announcements from doctors and hospitals will appear here.</p>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </CardContent>
// // // // //               </Card>
// // // // //             </TabsContent>
// // // // //             {/* Emergency Alert Tab - Form-based */}
// // // // //             <TabsContent value="emergency" className="space-y-6">
// // // // //               <Card>
// // // // //                 <CardHeader>
// // // // //                   <CardTitle className="flex items-center space-x-2">
// // // // //                     <AlertTriangle className="w-5 h-5 text-red-500" />
// // // // //                     <span>Detailed Emergency Alert</span>
// // // // //                     {emergencyButtonDisabled && <Badge variant="destructive">Alert Active</Badge>}
// // // // //                   </CardTitle>
// // // // //                 </CardHeader>
// // // // //                 <CardContent className="space-y-6">
// // // // //                   {!emergencyButtonDisabled ? (
// // // // //                     <>
// // // // //                       <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
// // // // //                         <AlertTriangle className="h-4 w-4" />
// // // // //                         <AlertDescription>
// // // // //                           <strong>Emergency Use Only:</strong> This will immediately alert nearby hospitals with
// // // // //                           detailed information.
// // // // //                         </AlertDescription>
// // // // //                       </Alert>
// // // // //                       <div>
// // // // //                         <label className="block text-sm font-medium mb-2">Describe your emergency *</label>
// // // // //                         <Textarea
// // // // //                           value={emergencyForm.message}
// // // // //                           onChange={(e) => setEmergencyForm({ ...emergencyForm, message: e.target.value })}
// // // // //                           placeholder="Please describe your medical emergency in detail..."
// // // // //                           className="w-full min-h-[120px]"
// // // // //                         />
// // // // //                       </div>
// // // // //                       <div>
// // // // //                         <label className="block text-sm font-medium mb-2">Priority Level</label>
// // // // //                         <Select
// // // // //                           value={emergencyForm.priority}
// // // // //                           onValueChange={(value) => setEmergencyForm({ ...emergencyForm, priority: value })}
// // // // //                         >
// // // // //                           <SelectTrigger>
// // // // //                             <SelectValue />
// // // // //                           </SelectTrigger>
// // // // //                           <SelectContent>
// // // // //                             <SelectItem value="critical">🔴 Critical - Life threatening</SelectItem>
// // // // //                             <SelectItem value="high">🟠 High - Urgent medical attention</SelectItem>
// // // // //                             <SelectItem value="medium">🟡 Medium - Medical assistance needed</SelectItem>
// // // // //                           </SelectContent>
// // // // //                         </Select>
// // // // //                       </div>
// // // // //                       <Button
// // // // //                         onClick={handleFormEmergencyAlert}
// // // // //                         disabled={isEmergencyActive || !emergencyForm.message.trim()}
// // // // //                         className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg"
// // // // //                       >
// // // // //                         {isEmergencyActive ? (
// // // // //                           <>
// // // // //                             <motion.div
// // // // //                               className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
// // // // //                               animate={{ rotate: 360 }}
// // // // //                               transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// // // // //                             />
// // // // //                             Sending Emergency Alert...
// // // // //                           </>
// // // // //                         ) : (
// // // // //                           <>
// // // // //                             <Send className="w-5 h-5 mr-2" />
// // // // //                             Send Detailed Emergency Alert
// // // // //                           </>
// // // // //                         )}
// // // // //                       </Button>
// // // // //                     </>
// // // // //                   ) : (
// // // // //                     <div className="text-center py-12">
// // // // //                       <motion.div
// // // // //                         className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
// // // // //                         animate={{
// // // // //                           boxShadow: [
// // // // //                             "0 0 0 0 rgba(234, 179, 8, 0.7)",
// // // // //                             "0 0 0 20px rgba(234, 179, 8, 0)",
// // // // //                             "0 0 0 0 rgba(234, 179, 8, 0)",
// // // // //                           ],
// // // // //                         }}
// // // // //                         transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// // // // //                       >
// // // // //                         <Timer className="w-8 h-8 text-white" />
// // // // //                       </motion.div>
// // // // //                       <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
// // // // //                         Emergency Alert Active
// // // // //                       </h3>
// // // // //                       <p className="text-yellow-600 dark:text-yellow-300 mb-4">
// // // // //                         Your emergency alert has been sent to nearby hospitals. Please wait for their response.
// // // // //                       </p>
// // // // //                       <Button
// // // // //                         onClick={dismissAlert}
// // // // //                         variant="outline"
// // // // //                         className="border-yellow-500 text-yellow-700 hover:bg-yellow-50 bg-transparent"
// // // // //                       >
// // // // //                         Dismiss Alert
// // // // //                       </Button>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </CardContent>
// // // // //               </Card>
// // // // //             </TabsContent>
// // // // //             {/* Past Emergency Alerts Tab */}
// // // // //             <TabsContent value="past-alerts" className="space-y-6">
// // // // //               <Card>
// // // // //                 <CardHeader>
// // // // //                   <CardTitle className="flex items-center space-x-2">
// // // // //                     <History className="w-5 h-5 text-blue-500" />
// // // // //                     <span>Past Emergency Alert Requests</span>
// // // // //                     <Badge variant="secondary">{emergencyAlerts.length} total</Badge>
// // // // //                   </CardTitle>
// // // // //                 </CardHeader>
// // // // //                 <CardContent>
// // // // //                   {emergencyAlerts.length > 0 ? (
// // // // //                     <div className="space-y-4">
// // // // //                       {emergencyAlerts.map((alert, index) => (
// // // // //                         <motion.div
// // // // //                           key={alert._id}
// // // // //                           initial={{ opacity: 0, x: -20 }}
// // // // //                           animate={{ opacity: 1, x: 0 }}
// // // // //                           transition={{ delay: index * 0.1 }}
// // // // //                           className={`border rounded-lg p-4 hover:shadow-lg transition-all duration-300 ${
// // // // //                             alert.status === "pending"
// // // // //                               ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
// // // // //                               : alert.status === "accepted"
// // // // //                                 ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
// // // // //                                 : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
// // // // //                           }`}
// // // // //                         >
// // // // //                           <div className="flex items-start justify-between">
// // // // //                             <div className="flex-1">
// // // // //                               <div className="flex items-center space-x-3 mb-3">
// // // // //                                 <motion.div
// // // // //                                   className={`w-3 h-3 rounded-full ${
// // // // //                                     alert.status === "pending"
// // // // //                                       ? "bg-yellow-500"
// // // // //                                       : alert.status === "accepted"
// // // // //                                         ? "bg-green-500"
// // // // //                                         : "bg-red-500"
// // // // //                                   }`}
// // // // //                                   animate={{ scale: alert.status === "pending" ? [1, 1.2, 1] : 1 }}
// // // // //                                   transition={{
// // // // //                                     duration: 1,
// // // // //                                     repeat: alert.status === "pending" ? Number.POSITIVE_INFINITY : 0,
// // // // //                                   }}
// // // // //                                 />
// // // // //                                 <h3 className="font-semibold text-lg">Emergency Alert</h3>
// // // // //                                 <Badge className={getPriorityColor(alert.priority)}>
// // // // //                                   {alert.priority.toUpperCase()}
// // // // //                                 </Badge>
// // // // //                                 <Badge className={getStatusColor(alert.status)}>{alert.status.toUpperCase()}</Badge>
// // // // //                               </div>
// // // // //                               <div className="mb-4">
// // // // //                                 <h4 className="font-medium text-gray-900 dark:text-white mb-2">Emergency Message</h4>
// // // // //                                 <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
// // // // //                                   {alert.message}
// // // // //                                 </p>
// // // // //                               </div>
// // // // //                               {alert.location?.address && (
// // // // //                                 <div className="mb-4">
// // // // //                                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Location</h4>
// // // // //                                   <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
// // // // //                                     <div className="flex items-start space-x-2">
// // // // //                                       <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
// // // // //                                       <div className="flex-1">
// // // // //                                         <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
// // // // //                                           📍 {formatLocationAddress(alert.location.address)}
// // // // //                                         </p>
// // // // //                                         <Button
// // // // //                                           onClick={() => openGoogleMaps(alert.location?.address)}
// // // // //                                           size="sm"
// // // // //                                           className="bg-blue-600 hover:bg-blue-700 text-white"
// // // // //                                         >
// // // // //                                           <Map className="w-3 h-3 mr-1" />
// // // // //                                           View on Map
// // // // //                                           <ExternalLink className="w-3 h-3 ml-1" />
// // // // //                                         </Button>
// // // // //                                       </div>
// // // // //                                     </div>
// // // // //                                   </div>
// // // // //                                 </div>
// // // // //                               )}
// // // // //                               {alert.acceptedBy && (
// // // // //                                 <div className="mb-4">
// // // // //                                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hospital Response</h4>
// // // // //                                   <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
// // // // //                                     <div className="flex items-center space-x-2">
// // // // //                                       <CheckCircle className="w-4 h-4 text-green-500" />
// // // // //                                       <span className="font-medium text-green-800 dark:text-green-200">
// // // // //                                         Accepted by {alert.acceptedBy.name}
// // // // //                                       </span>
// // // // //                                     </div>
// // // // //                                     <p className="text-sm text-green-700 dark:text-green-300 mt-1">
// // // // //                                       Contact: {alert.acceptedBy.phone}
// // // // //                                     </p>
// // // // //                                   </div>
// // // // //                                 </div>
// // // // //                               )}
// // // // //                               <div className="flex items-center justify-between">
// // // // //                                 <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
// // // // //                                   <Timer className="w-4 h-4" />
// // // // //                                   <span>{formatTimeAgo(alert.createdAt)}</span>
// // // // //                                 </div>
// // // // //                                 <Button
// // // // //                                   size="sm"
// // // // //                                   variant="outline"
// // // // //                                   onClick={() => handleDeleteAlert(alert._id)}
// // // // //                                   className="text-red-600 hover:text-red-800 hover:bg-red-50"
// // // // //                                 >
// // // // //                                   <Trash2 className="w-4 h-4 mr-1" />
// // // // //                                   Delete
// // // // //                                 </Button>
// // // // //                               </div>
// // // // //                             </div>
// // // // //                           </div>
// // // // //                         </motion.div>
// // // // //                       ))}
// // // // //                     </div>
// // // // //                   ) : (
// // // // //                     <div className="text-center py-12">
// // // // //                       <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// // // // //                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
// // // // //                         No Past Alert Requests
// // // // //                       </h3>
// // // // //                       <p className="text-gray-500">You haven't sent any emergency alerts yet</p>
// // // // //                     </div>
// // // // //                   )}
// // // // //                 </CardContent>
// // // // //               </Card>
// // // // //             </TabsContent>
// // // // //             {/* Self Assessment Tab */}
// // // // //             <TabsContent value="assessment" className="space-y-6">
// // // // //               {currentAssessment ? (
// // // // //                 currentAssessment === "phq9" ? (
// // // // //                   <PHQ9Assessment
// // // // //                     onComplete={(result) => {
// // // // //                       setAssessmentResult(result)
// // // // //                       setCurrentAssessment("results")
// // // // //                     }}
// // // // //                     onBack={() => setCurrentAssessment(null)}
// // // // //                   />
// // // // //                 ) : currentAssessment === "gad7" ? (
// // // // //                   <GAD7Assessment
// // // // //                     onComplete={(result) => {
// // // // //                       setAssessmentResult(result)
// // // // //                       setCurrentAssessment("results")
// // // // //                     }}
// // // // //                     onBack={() => setCurrentAssessment(null)}
// // // // //                   />
// // // // //                 ) : currentAssessment === "results" ? (
// // // // //                   <AssessmentResults
// // // // //                     type={assessmentType}
// // // // //                     result={assessmentResult}
// // // // //                     onBack={() => setCurrentAssessment(null)}
// // // // //                     onReturnToDashboard={() => {
// // // // //                       setCurrentAssessment(null)
// // // // //                       setAssessmentResult(null)
// // // // //                       setAssessmentType("")
// // // // //                     }}
// // // // //                   />
// // // // //                 ) : null
// // // // //               ) : (
// // // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // // //                   {[
// // // // //                     {
// // // // //                       icon: Brain,
// // // // //                       title: "Depression Assessment (PHQ-9)",
// // // // //                       desc: "A 9-question assessment to help identify symptoms of depression and track your mental health.",
// // // // //                       color: "blue",
// // // // //                       type: "phq9",
// // // // //                     },
// // // // //                     {
// // // // //                       icon: AlertTriangle,
// // // // //                       title: "Anxiety Assessment (GAD-7)",
// // // // //                       desc: "A 7-question screening tool for generalized anxiety disorder and anxiety symptoms.",
// // // // //                       color: "yellow",
// // // // //                       type: "gad7",
// // // // //                     },
// // // // //                     {
// // // // //                       icon: Zap,
// // // // //                       title: "Stress Level Check",
// // // // //                       desc: "Quick assessment to understand your current stress levels and get personalized recommendations.",
// // // // //                       color: "red",
// // // // //                       type: "stress",
// // // // //                       disabled: true,
// // // // //                     },
// // // // //                     {
// // // // //                       icon: Heart,
// // // // //                       title: "General Wellness Check",
// // // // //                       desc: "Comprehensive wellness assessment covering multiple areas of your physical and mental health.",
// // // // //                       color: "green",
// // // // //                       type: "wellness",
// // // // //                       disabled: true,
// // // // //                     },
// // // // //                   ].map((assessment, index) => (
// // // // //                     <motion.div
// // // // //                       key={index}
// // // // //                       initial={{ opacity: 0, y: 20 }}
// // // // //                       animate={{ opacity: 1, y: 0 }}
// // // // //                       transition={{ delay: index * 0.1 }}
// // // // //                       whileHover={{ scale: assessment.disabled ? 1 : 1.02, y: assessment.disabled ? 0 : -5 }}
// // // // //                     >
// // // // //                       <Card
// // // // //                         className={`hover:shadow-lg transition-all duration-300 ${assessment.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer group"}`}
// // // // //                       >
// // // // //                         <CardHeader>
// // // // //                           <CardTitle className="flex items-center space-x-2">
// // // // //                             <assessment.icon className={`w-5 h-5 text-${assessment.color}-500`} />
// // // // //                             <span>{assessment.title}</span>
// // // // //                             {assessment.disabled && <Badge variant="secondary">Coming Soon</Badge>}
// // // // //                           </CardTitle>
// // // // //                         </CardHeader>
// // // // //                         <CardContent>
// // // // //                           <p className="text-gray-600 dark:text-gray-300 mb-4">{assessment.desc}</p>
// // // // //                           <Button
// // // // //                             className={`w-full ${assessment.disabled ? "cursor-not-allowed" : `group-hover:bg-${assessment.color}-600`}`}
// // // // //                             disabled={assessment.disabled}
// // // // //                             onClick={() => {
// // // // //                               if (!assessment.disabled) {
// // // // //                                 setAssessmentType(assessment.type)
// // // // //                                 setCurrentAssessment(assessment.type)
// // // // //                               }
// // // // //                             }}
// // // // //                           >
// // // // //                             {assessment.disabled ? "Coming Soon" : "Start Assessment"}
// // // // //                           </Button>
// // // // //                         </CardContent>
// // // // //                       </Card>
// // // // //                     </motion.div>
// // // // //                   ))}
// // // // //                 </div>
// // // // //               )}
// // // // //             </TabsContent>
// // // // //           </Tabs>
// // // // //         </motion.div>
// // // // //       </div>
// // // // //     </div>
// // // // //   )
// // // // // }


// // // // "use client"

// // // // import { useState, useEffect } from "react"
// // // // import { motion, AnimatePresence } from "framer-motion"
// // // // import {
// // // //   Heart,
// // // //   AlertTriangle,
// // // //   Brain,
// // // //   Target,
// // // //   Zap,
// // // //   Moon,
// // // //   Smile,
// // // //   Frown,
// // // //   Meh,
// // // //   Plus,
// // // //   BarChart3,
// // // //   TrendingUp,
// // // //   Calendar,
// // // //   Clock,
// // // //   Building2,
// // // //   Stethoscope,
// // // //   MapPin,
// // // //   Phone,
// // // //   Mail,
// // // //   Award,
// // // //   CheckCircle,
// // // //   Trash2,
// // // //   Send,
// // // //   History,
// // // //   Timer,
// // // //   Map,
// // // //   ExternalLink,
// // // //   RefreshCw,
// // // //   XCircle,
// // // //   FileText,
// // // //   Tag,
// // // //   Eye,
// // // //   Megaphone,
// // // //   Bell,
// // // // } from "lucide-react"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // // import { Progress } from "@/components/ui/progress"
// // // // import { Badge } from "@/components/ui/badge"
// // // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // // import { Textarea } from "@/components/ui/textarea"
// // // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// // // // import { Alert, AlertDescription } from "@/components/ui/alert"
// // // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // // import { useAuth } from "@/app/contexts/AuthProvider"
// // // // import ThemeToggle from "@/components/ThemeToggle"
// // // // import UserDropdown from "@/components/UserDropdown"
// // // // import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
// // // // import { toast } from "react-hot-toast"
// // // // import PHQ9Assessment from "@/components/assessments/PHQ9Assessment"
// // // // import GAD7Assessment from "@/components/assessments/GAD7Assessment"
// // // // import AssessmentResults from "@/components/assessments/AssessmentResults"

// // // // interface MoodData {
// // // //   date: string
// // // //   mood: number
// // // //   energy: number
// // // //   anxiety: number
// // // //   sleep: number
// // // //   notes?: string
// // // // }

// // // // interface EmergencyAlert {
// // // //   _id: string
// // // //   status: string
// // // //   priority: string
// // // //   createdAt: string
// // // //   message: string
// // // //   userInfo: {
// // // //     name: string
// // // //     email: string
// // // //     phone: string
// // // //   }
// // // //   location?: {
// // // //     lat?: number
// // // //     lng?: number
// // // //     address?: {
// // // //       street?: string
// // // //       area?: string
// // // //       townOrVillage?: string
// // // //       taluka?: string
// // // //       district?: string
// // // //       pincode?: string
// // // //       state?: string
// // // //       geoLocation?: {
// // // //         lat?: number
// // // //         lng?: number
// // // //       }
// // // //     }
// // // //   }
// // // //   acceptedBy?: {
// // // //     _id: string
// // // //     name: string
// // // //     phone: string
// // // //   }
// // // //   isRead?: boolean
// // // // }

// // // // interface Post {
// // // //   _id: string
// // // //   title: string
// // // //   content: string
// // // //   category: string
// // // //   tags: string[]
// // // //   authorId: {
// // // //     _id: string
// // // //     name: string
// // // //   }
// // // //   authorType: string
// // // //   mentionedId?: {
// // // //     _id: string
// // // //     name: string
// // // //   }
// // // //   mentionedType?: string
// // // //   createdAt: string
// // // //   postby: string
// // // //   isApproved: boolean
// // // // }

// // // // interface Hospital {
// // // //   _id: string
// // // //   name: string
// // // //   email: string
// // // //   phone: string
// // // //   address: string
// // // //   specialties: string[]
// // // //   isVerified: boolean
// // // //   isAvailable: boolean
// // // //   isHandleEmergency: boolean
// // // //   createdAt: string
// // // //   distance?: number
// // // // }

// // // // interface UserProfile {
// // // //   _id: string
// // // //   name: string
// // // //   email: string
// // // //   phone: string
// // // //   address: {
// // // //     street: string
// // // //     area: string
// // // //     village: string
// // // //     subDistrict: string
// // // //     district: string
// // // //     pincode: string
// // // //     state: string
// // // //   }
// // // //   location: {
// // // //     lat: number
// // // //     lng: number
// // // //   }
// // // //   emergencyContacts: Array<{
// // // //     name: string
// // // //     phone: string
// // // //     relation: string
// // // //   }>
// // // //   medicalInfo: {
// // // //     bloodGroup: string
// // // //     allergies: string[]
// // // //     medications: string[]
// // // //     conditions: string[]
// // // //   }
// // // // }

// // // // interface Announcement {
// // // //   _id: string
// // // //   title: string
// // // //   content: string
// // // //   ownerId: string
// // // //   ownerType: "doctor" | "hospital" | "user"
// // // //   mentions: Array<{
// // // //     id: string
// // // //     name: string
// // // //     type: "doctor" | "hospital"
// // // //     email: string
// // // //   }>
// // // //   readBy: string[] // Array of user/doctor/hospital IDs who have read it
// // // //   createdAt: string
// // // //   isRead?: boolean // For mentions tab, indicates if *this* user has read it
// // // // }

// // // // export default function UserDashboard() {
// // // //   const { user } = useAuth()
// // // //   const [moodData, setMoodData] = useState<MoodData[]>([])
// // // //   const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
// // // //   const [allPosts, setAllPosts] = useState<Post[]>([])
// // // //   const [hospitals, setHospitals] = useState<Hospital[]>([])
// // // //   const [allAnnouncements, setAllAnnouncements] = useState<Announcement[]>([])
// // // //   const [todayMood, setTodayMood] = useState<MoodData | null>(null)
// // // //   const [isEmergencyActive, setIsEmergencyActive] = useState(false)
// // // //   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null)
// // // //   const [loading, setLoading] = useState(true)
// // // //   const [showHospitalInfo, setShowHospitalInfo] = useState(false)
// // // //   const [currentAlert, setCurrentAlert] = useState<EmergencyAlert | null>(null)
// // // //   const [showAlertNotification, setShowAlertNotification] = useState(false)
// // // //   const [alertTimer, setAlertTimer] = useState<NodeJS.Timeout | null>(null)
// // // //   const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
// // // //   const [emergencyButtonDisabled, setEmergencyButtonDisabled] = useState(false)
// // // //   const [alertStatus, setAlertStatus] = useState<string | null>(null)
// // // //   const [lastAlertCheck, setLastAlertCheck] = useState<Date>(new Date())
// // // //   const [currentAssessment, setCurrentAssessment] = useState<string | null>(null)
// // // //   const [assessmentResult, setAssessmentResult] = useState<any>(null)
// // // //   const [assessmentType, setAssessmentType] = useState<string>("")
// // // //   const [unreadAnnouncementsCount, setUnreadAnnouncementsCount] = useState(0)

// // // //   // Mood tracking state
// // // //   const [currentMood, setCurrentMood] = useState(5)
// // // //   const [currentEnergy, setCurrentEnergy] = useState(5)
// // // //   const [currentAnxiety, setCurrentAnxiety] = useState(5)
// // // //   const [currentSleep, setCurrentSleep] = useState(8)
// // // //   const [moodNotes, setMoodNotes] = useState("")

// // // //   // Emergency form state
// // // //   const [emergencyForm, setEmergencyForm] = useState({
// // // //     message: "",
// // // //     priority: "high",
// // // //   })

// // // //   useEffect(() => {
// // // //     fetchDashboardData()
// // // //     requestLocation()
// // // //     setTimeout(() => {
// // // //       fetchUserProfile()
// // // //       // Find the most recent alertId (pending or accepted, etc.)
// // // //       const latestAlert = emergencyAlerts.find(
// // // //         (alert) => alert.status === "pending" || alert.status === "active" || alert.status === "accepted",
// // // //       )
// // // //       if (latestAlert?._id) {
// // // //         checkAlertStatus(latestAlert._id)
// // // //       }
// // // //       const interval = setInterval(() => {
// // // //         if (latestAlert?._id) {
// // // //           checkAlertStatus(latestAlert._id)
// // // //         }
// // // //       }, 10000)
// // // //       return () => clearInterval(interval)
// // // //     }, 2000)
// // // //   }, [])

// // // //   const fetchDashboardData = async () => {
// // // //     try {
// // // //       const [moodRes, alertsRes, postsRes, hospitalsRes, announcementsRes] = await Promise.all([
// // // //         fetch("/api/user/mood-data"),
// // // //         fetch("/api/user/emergency-alerts"),
// // // //         fetch("/api/posts"),
// // // //         fetch("/api/user/hospitals"),
// // // //         fetch("/api/announcements/mentions"), // Fetch all announcements for user, including mentions
// // // //       ])

// // // //       if (moodRes.ok) {
// // // //         const moodData = await moodRes.json()
// // // //         setMoodData(moodData.data || [])
// // // //         setTodayMood(moodData.today || null)
// // // //       }
// // // //       if (alertsRes.ok) {
// // // //         const alertsData = await alertsRes.json()
// // // //         setEmergencyAlerts(alertsData.data || [])
// // // //         const pendingAlerts =
// // // //           alertsData.data?.filter((alert: EmergencyAlert) => alert.status === "pending" && !alert.acceptedBy) || []
// // // //         if (pendingAlerts.length > 0) {
// // // //           setCurrentAlert(pendingAlerts[0])
// // // //           setEmergencyButtonDisabled(true)
// // // //         } else {
// // // //           setEmergencyButtonDisabled(false)
// // // //         }
// // // //       }
// // // //       if (postsRes.ok) {
// // // //         const postsData = await postsRes.json()
// // // //         setAllPosts(postsData.data || [])
// // // //       }
// // // //       if (hospitalsRes.ok) {
// // // //         const hospitalsData = await hospitalsRes.json()
// // // //         setHospitals(hospitalsData.data || [])
// // // //       }
// // // //       if (announcementsRes.ok) {
// // // //         const announcementsData = await announcementsRes.json()
// // // //         // Calculate isRead status on the client side based on user.userId
// // // //         const processedAnnouncements =
// // // //           announcementsData.data?.map((ann: Announcement) => ({
// // // //             ...ann,
// // // //             isRead: ann.readBy.includes(user?.userId || ""), // Check if current user's ID is in readBy
// // // //           })) || []
// // // //         setAllAnnouncements(processedAnnouncements)
// // // //         // Calculate unread count for the current user
// // // //         const unreadCount = processedAnnouncements.filter((ann: Announcement) => !ann.isRead).length || 0
// // // //         setUnreadAnnouncementsCount(unreadCount)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching dashboard data:", error)
// // // //     } finally {
// // // //       setLoading(false)
// // // //     }
// // // //   }

// // // //   const requestLocation = () => {
// // // //     if (navigator.geolocation) {
// // // //       navigator.geolocation.getCurrentPosition(
// // // //         (position) => {
// // // //           setLocation({
// // // //             lat: position.coords.latitude,
// // // //             lng: position.coords.longitude,
// // // //           })
// // // //         },
// // // //         (error) => {
// // // //           toast.error("Location access denied. Emergency alerts will use your registered address.")
// // // //         },
// // // //       )
// // // //     } else {
// // // //       toast.error("Geolocation not supported by this browser.")
// // // //     }
// // // //   }

// // // //   const checkAlertStatus = async (alertId: string) => {
// // // //     try {
// // // //       const response = await fetch("/api/user/check-alert-status", {
// // // //         method: "POST",
// // // //         headers: {
// // // //           "Content-Type": "application/json",
// // // //         },
// // // //         credentials: "include", // to send cookies
// // // //         body: JSON.stringify({ alertId }), // 👈 send the required alertId
// // // //       })
// // // //       const data = await response.json()
// // // //       if (response.ok) {
// // // //         setAlertStatus(data.alert.status)
// // // //         setEmergencyButtonDisabled(data.alert.status === "active")
// // // //         setLastAlertCheck(new Date())
// // // //         if (data.alert.status === "accepted" && data.alert.acceptedBy) {
// // // //           toast.success(`🏥 ${data.alert.acceptedBy.name} is coming to help!`, { duration: 8000 })
// // // //         }
// // // //       } else {
// // // //         console.error("API error:", data.message)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error checking alert status:", error)
// // // //     }
// // // //   }

// // // //   const startAlertMonitoring = (alertId: string) => {
// // // //     let checkCounter = 0
// // // //     const checkStatus = async () => {
// // // //       checkCounter++
// // // //       const statusChanged = await checkAlertStatus(alertId)
// // // //       if (statusChanged) {
// // // //         return
// // // //       }
// // // //       if (checkCounter === 1) {
// // // //         setShowAlertNotification(true)
// // // //         toast.error("⚠️ Hospitals haven't responded yet. Alert escalated!", {
// // // //           duration: 10000,
// // // //         })
// // // //         setTimeout(checkStatus, 180000)
// // // //       } else if (checkCounter === 2) {
// // // //         toast.error("🚨 Still no response from hospitals. Please call emergency services directly!", {
// // // //           duration: 15000,
// // // //         })
// // // //       }
// // // //     }
// // // //     const timer = setTimeout(checkStatus, 180000)
// // // //     setAlertTimer(timer)
// // // //   }

// // // //   const handleEmergencySOS = async () => {
// // // //     if (isEmergencyActive || emergencyButtonDisabled) return
// // // //     setIsEmergencyActive(true)
// // // //     setEmergencyButtonDisabled(true)

// // // //     if (!location && navigator.geolocation) {
// // // //       navigator.geolocation.getCurrentPosition(
// // // //         async (position) => {
// // // //           const currentLocation = {
// // // //             lat: position.coords.latitude,
// // // //             lng: position.coords.longitude,
// // // //           }
// // // //           setLocation(currentLocation)
// // // //           await sendQuickEmergencyAlert(currentLocation)
// // // //         },
// // // //         async (error) => {
// // // //           await sendQuickEmergencyAlert(null)
// // // //         },
// // // //       )
// // // //     } else {
// // // //       await sendQuickEmergencyAlert(location)
// // // //     }
// // // //   }

// // // //   const sendQuickEmergencyAlert = async (currentLocation: { lat: number; lng: number } | null) => {
// // // //     try {
// // // //       const response = await fetch("/api/user/emergency-alert", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           location: currentLocation,
// // // //           message: "🚨 EMERGENCY SOS - Immediate assistance needed!",
// // // //           priority: "critical",
// // // //         }),
// // // //       })
// // // //       const data = await response.json()
// // // //       if (response.ok) {
// // // //         toast.success(`🚨 Emergency alert sent! User: ${data.userInfo.name} | Phone: ${data.userInfo.phone}`)
// // // //         toast.success("🏥 Searching for nearby hospitals... Please wait!")
// // // //         startAlertMonitoring(data.alertId)
// // // //         setTimeout(() => {
// // // //           fetchDashboardData()
// // // //         }, 1000)
// // // //         setIsEmergencyActive(false)
// // // //       } else {
// // // //         toast.error(data.message || "Failed to send emergency alert")
// // // //         setIsEmergencyActive(false)
// // // //         setEmergencyButtonDisabled(false)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Emergency alert error:", error)
// // // //       toast.error("Emergency system error. Please try again.")
// // // //       setIsEmergencyActive(false)
// // // //       setEmergencyButtonDisabled(false)
// // // //     }
// // // //   }

// // // //   const handleFormEmergencyAlert = async () => {
// // // //     if (!emergencyForm.message.trim()) {
// // // //       toast.error("Please describe your emergency")
// // // //       return
// // // //     }
// // // //     setIsEmergencyActive(true)
// // // //     try {
// // // //       const position = await new Promise<GeolocationPosition>((resolve, reject) => {
// // // //         navigator.geolocation.getCurrentPosition(resolve, reject, {
// // // //           enableHighAccuracy: true,
// // // //           timeout: 10000,
// // // //           maximumAge: 60000,
// // // //         })
// // // //       })
// // // //       const response = await fetch("/api/user/emergency-alert", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           message: emergencyForm.message,
// // // //           priority: emergencyForm.priority,
// // // //           location: {
// // // //             lat: position.coords.latitude,
// // // //             lng: position.coords.longitude,
// // // //           },
// // // //         }),
// // // //       })
// // // //       const data = await response.json()
// // // //       if (response.ok) {
// // // //         toast.success("🚨 Emergency alert sent to nearby hospitals!")
// // // //         setEmergencyForm({ message: "", priority: "high" })
// // // //         setEmergencyButtonDisabled(true)
// // // //         setAlertStatus("pending")
// // // //         startAlertMonitoring(data.alertId)
// // // //         fetchDashboardData()
// // // //         window.addEventListener("beforeunload", (e) => {
// // // //           e.preventDefault()
// // // //           e.returnValue = ""
// // // //         })
// // // //       } else {
// // // //         toast.error(data.message || "Failed to send emergency alert")
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error sending emergency alert:", error)
// // // //       if (error instanceof GeolocationPositionError) {
// // // //         toast.error("Location access required for emergency alerts")
// // // //       } else {
// // // //         toast.error("Failed to send emergency alert")
// // // //       }
// // // //     } finally {
// // // //       setIsEmergencyActive(false)
// // // //     }
// // // //   }

// // // //   const dismissAlert = async () => {
// // // //     if (!currentAlert) return
// // // //     try {
// // // //       const response = await fetch("/api/user/dismiss-alert", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ alertId: currentAlert._id }),
// // // //       })
// // // //       if (response.ok) {
// // // //         setShowAlertNotification(false)
// // // //         setCurrentAlert(null)
// // // //         setEmergencyButtonDisabled(false)
// // // //         if (alertTimer) {
// // // //           clearTimeout(alertTimer)
// // // //           setAlertTimer(null)
// // // //         }
// // // //         toast.success("Alert dismissed")
// // // //         fetchDashboardData()
// // // //         window.removeEventListener("beforeunload", () => {})
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error dismissing alert:", error)
// // // //       toast.error("Failed to dismiss alert")
// // // //     }
// // // //   }

// // // //   const handleDeleteAlert = async (alertId: string) => {
// // // //     const confirmed = window.confirm(
// // // //       "⚠️ Are you sure you want to delete this emergency alert? This action cannot be undone.",
// // // //     )
// // // //     if (!confirmed) return
// // // //     try {
// // // //       const response = await fetch("/api/user/emergency-alerts/delete", {
// // // //         method: "DELETE",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ alertId }),
// // // //       })
// // // //       if (response.ok) {
// // // //         toast.success("✅ Emergency alert deleted successfully")
// // // //         fetchDashboardData()
// // // //       } else {
// // // //         toast.error("Failed to delete alert")
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error("Error deleting alert")
// // // //     }
// // // //   }

// // // //   const saveMoodEntry = async () => {
// // // //     try {
// // // //       const response = await fetch("/api/user/mood-entry", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({
// // // //           mood: currentMood,
// // // //           energy: currentEnergy,
// // // //           anxiety: currentAnxiety,
// // // //           sleep: currentSleep,
// // // //           notes: moodNotes,
// // // //         }),
// // // //       })
// // // //       if (response.ok) {
// // // //         toast.success("✅ Mood entry saved!")
// // // //         fetchDashboardData()
// // // //         setMoodNotes("")
// // // //       } else {
// // // //         toast.error("Failed to save mood entry")
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error("Error saving mood entry")
// // // //     }
// // // //   }

// // // //   const handleMarkAnnouncementRead = async (announcementId: string) => {
// // // //     try {
// // // //       const response = await fetch("/api/announcements/mark-read", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ announcementId }),
// // // //       })
// // // //       if (response.ok) {
// // // //         toast.success("Announcement marked as read.")
// // // //         fetchDashboardData() // Re-fetch to update read status and notification count
// // // //       } else {
// // // //         toast.error("Failed to mark announcement as read.")
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error("Error marking announcement as read.")
// // // //     }
// // // //   }

// // // //   const getMoodIcon = (mood: number) => {
// // // //     if (mood >= 8) return <Smile className="w-6 h-6 text-green-500" />
// // // //     if (mood >= 6) return <Meh className="w-6 h-6 text-yellow-500" />
// // // //     return <Frown className="w-6 h-6 text-red-500" />
// // // //   }

// // // //   const getMoodColor = (mood: number) => {
// // // //     if (mood >= 8) return "text-green-600"
// // // //     if (mood >= 6) return "text-yellow-600"
// // // //     return "text-red-600"
// // // //   }

// // // //   const getWellnessScore = () => {
// // // //     if (!todayMood) return 0
// // // //     const score = (todayMood.mood + todayMood.energy + (10 - todayMood.anxiety) + Math.min(todayMood.sleep, 8)) / 4
// // // //     return Math.round(score * 10)
// // // //   }

// // // //   const getWeeklyAverage = () => {
// // // //     if (moodData.length === 0) return 0
// // // //     const recentData = moodData.slice(-7)
// // // //     const avgMood = recentData.reduce((sum, entry) => sum + entry.mood, 0) / recentData.length
// // // //     return Math.round(avgMood * 10) / 10
// // // //   }

// // // //   const fetchUserProfile = async () => {
// // // //     try {
// // // //       const response = await fetch("/api/user/profile")
// // // //       const data = await response.json()
// // // //       if (response.ok && data.user) {
// // // //         setUserProfile(data.user)
// // // //       }
// // // //     } catch (error) {
// // // //       console.error("Error fetching user profile:", error)
// // // //     }
// // // //   }

// // // //   const formatTimeAgo = (dateString: string) => {
// // // //     const now = new Date()
// // // //     const alertTime = new Date(dateString)
// // // //     const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60))
// // // //     if (diffInMinutes < 1) return "Just now"
// // // //     if (diffInMinutes < 60) return `${diffInMinutes}m ago`
// // // //     const diffInHours = Math.floor(diffInMinutes / 60)
// // // //     if (diffInHours < 24) return `${diffInHours}h ago`
// // // //     return alertTime.toLocaleDateString()
// // // //   }

// // // //   const getPriorityColor = (priority: string) => {
// // // //     switch (priority) {
// // // //       case "critical":
// // // //         return "bg-red-500 text-white"
// // // //       case "high":
// // // //         return "bg-orange-500 text-white"
// // // //       case "medium":
// // // //         return "bg-yellow-500 text-black"
// // // //       default:
// // // //         return "bg-gray-500 text-white"
// // // //     }
// // // //   }

// // // //   const getStatusColor = (status: string) => {
// // // //     switch (status) {
// // // //       case "pending":
// // // //         return "bg-yellow-500 text-white"
// // // //       case "accepted":
// // // //         return "bg-green-500 text-white"
// // // //       case "declined":
// // // //         return "bg-red-500 text-white"
// // // //       default:
// // // //         return "bg-gray-500 text-white"
// // // //     }
// // // //   }

// // // //   const formatLocationAddress = (address: any) => {
// // // //     if (!address) return "Location not available"
// // // //     const parts = [
// // // //       address.area,
// // // //       address.village || address.townOrVillage,
// // // //       address.subDistrict || address.taluka,
// // // //       address.district,
// // // //       address.state || "Gujarat",
// // // //       address.pincode,
// // // //     ].filter(Boolean)
// // // //     return parts.join(", ")
// // // //   }

// // // //   const openGoogleMaps = (address: any) => {
// // // //     if (!address) {
// // // //       toast.error("Location not available")
// // // //       return
// // // //     }
// // // //     const searchQuery = formatLocationAddress(address)
// // // //     const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
// // // //     window.open(googleMapsUrl, "_blank")
// // // //     toast.success("🗺️ Opening location in Google Maps...")
// // // //   }

// // // //   const getAuthorIcon = (authorType: string) => {
// // // //     return authorType === "Doctor" ? (
// // // //       <Stethoscope className="w-5 h-5 text-green-600" />
// // // //     ) : (
// // // //       <Building2 className="w-5 h-5 text-purple-600" />
// // // //     )
// // // //   }

// // // //   const getAuthorBadgeColor = (authorType: string) => {
// // // //     return authorType === "Doctor"
// // // //       ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
// // // //       : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
// // // //   }

// // // //   if (loading) {
// // // //     return (
// // // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
// // // //         <div className="text-center">
// // // //           <motion.div
// // // //             className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
// // // //             animate={{ rotate: 360 }}
// // // //             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// // // //           />
// // // //           <p className="text-gray-600 dark:text-gray-400 text-lg">Loading your wellness dashboard...</p>
// // // //         </div>
// // // //       </div>
// // // //     )
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
// // // //       {/* Emergency Alert Notification */}
// // // //       <AnimatePresence>
// // // //         {showAlertNotification && currentAlert && (
// // // //           <motion.div
// // // //             initial={{ opacity: 0, y: -100 }}
// // // //             animate={{ opacity: 1, y: 0 }}
// // // //             exit={{ opacity: 0, y: -100 }}
// // // //             className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
// // // //           >
// // // //             <Alert className="border-red-500 bg-red-50 dark:bg-red-900/20">
// // // //               <AlertTriangle className="h-4 w-4 text-red-600" />
// // // //               <AlertDescription className="flex items-center justify-between">
// // // //                 <div>
// // // //                   <p className="font-semibold text-red-800 dark:text-red-200">🚨 HIGH ALERT: No Hospital Response</p>
// // // //                   <p className="text-red-700 dark:text-red-300 text-sm">
// // // //                     Your emergency alert is still pending. Consider calling emergency services directly.
// // // //                   </p>
// // // //                   {currentAlert && (
// // // //                     <p className="text-xs text-red-600 dark:text-red-400 mt-1">
// // // //                       User: {currentAlert.userInfo?.name || userProfile?.name || "Unknown"} | Phone:{" "}
// // // //                       {currentAlert.userInfo?.phone || userProfile?.phone || "Unknown"}
// // // //                     </p>
// // // //                   )}
// // // //                 </div>
// // // //                 <Button variant="ghost" size="sm" onClick={dismissAlert} className="text-red-600 hover:text-red-800">
// // // //                   <CheckCircle className="w-4 h-4" />
// // // //                 </Button>
// // // //               </AlertDescription>
// // // //             </Alert>
// // // //           </motion.div>
// // // //         )}
// // // //       </AnimatePresence>

// // // //       {/* Header with Animated Icons */}
// // // //       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
// // // //         <AnimatedHealthIcons />
// // // //         <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
// // // //           <div className="flex items-center space-x-4">
// // // //             <motion.div
// // // //               className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg"
// // // //               animate={{
// // // //                 scale: [1, 1.1, 1],
// // // //                 rotate: [0, 5, -5, 0],
// // // //               }}
// // // //               transition={{
// // // //                 duration: 3,
// // // //                 repeat: Number.POSITIVE_INFINITY,
// // // //                 ease: "easeInOut",
// // // //               }}
// // // //             >
// // // //               <Heart className="w-6 h-6 text-white" />
// // // //             </motion.div>
// // // //             <div>
// // // //               <h1 className="text-xl font-bold text-gray-900 dark:text-white">RuralReach</h1>
// // // //               <p className="text-sm text-gray-600 dark:text-gray-400">Your Wellness Dashboard</p>
// // // //             </div>
// // // //           </div>
// // // //           <div className="flex items-center space-x-4">
// // // //             {/* Hospital Info Button */}
// // // //             <Dialog open={showHospitalInfo} onOpenChange={setShowHospitalInfo}>
// // // //               <DialogTrigger asChild>
// // // //                 <motion.button
// // // //                   whileHover={{ scale: 1.05 }}
// // // //                   whileTap={{ scale: 0.95 }}
// // // //                   className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
// // // //                 >
// // // //                   <Building2 className="w-4 h-4" />
// // // //                   <span className="text-sm font-medium">Hospital Info</span>
// // // //                 </motion.button>
// // // //               </DialogTrigger>
// // // //               <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
// // // //                 <DialogHeader>
// // // //                   <DialogTitle className="flex items-center space-x-2">
// // // //                     <Building2 className="w-5 h-5 text-purple-600" />
// // // //                     <span>Connected Hospitals</span>
// // // //                   </DialogTitle>
// // // //                 </DialogHeader>
// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
// // // //                   {hospitals.map((hospital) => (
// // // //                     <motion.div
// // // //                       key={hospital._id}
// // // //                       initial={{ opacity: 0, y: 20 }}
// // // //                       animate={{ opacity: 1, y: 0 }}
// // // //                       className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
// // // //                     >
// // // //                       <div className="flex items-start justify-between mb-3">
// // // //                         <div className="flex items-center space-x-2">
// // // //                           <Building2 className="w-5 h-5 text-purple-600" />
// // // //                           <h3 className="font-semibold text-lg">{hospital.name}</h3>
// // // //                           {hospital.isVerified && <Award className="w-4 h-4 text-green-500" />}
// // // //                         </div>
// // // //                         <div className="flex items-center space-x-2">
// // // //                           <Badge variant={hospital.isAvailable ? "default" : "secondary"}>
// // // //                             {hospital.isAvailable ? "Available" : "Unavailable"}
// // // //                           </Badge>
// // // //                           {hospital.isHandleEmergency && (
// // // //                             <Badge variant="destructive" className="text-xs">
// // // //                               Emergency 24/7
// // // //                             </Badge>
// // // //                           )}
// // // //                         </div>
// // // //                       </div>
// // // //                       <div className="space-y-2 text-sm">
// // // //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// // // //                           <Mail className="w-4 h-4" />
// // // //                           <span>{hospital.email}</span>
// // // //                         </div>
// // // //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// // // //                           <Phone className="w-4 h-4" />
// // // //                           <span>{hospital.phone}</span>
// // // //                         </div>
// // // //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// // // //                           <MapPin className="w-4 h-4" />
// // // //                           <span>{hospital.address}</span>
// // // //                         </div>
// // // //                       </div>
// // // //                       <div className="mt-3">
// // // //                         <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties:</p>
// // // //                         <div className="flex flex-wrap gap-1">
// // // //                           {hospital.specialties.map((specialty, index) => (
// // // //                             <Badge key={index} variant="outline" className="text-xs">
// // // //                               {specialty}
// // // //                             </Badge>
// // // //                           ))}
// // // //                         </div>
// // // //                       </div>
// // // //                       <div className="mt-3 pt-3 border-t">
// // // //                         <p className="text-xs text-gray-500">
// // // //                           Joined: {new Date(hospital.createdAt).toLocaleDateString()}
// // // //                         </p>
// // // //                       </div>
// // // //                     </motion.div>
// // // //                   ))}
// // // //                 </div>
// // // //               </DialogContent>
// // // //             </Dialog>
// // // //             <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
// // // //               <Clock className="w-4 h-4" />
// // // //               <span>Last checked: {lastAlertCheck.toLocaleTimeString()}</span>
// // // //             </div>
// // // //             <Button
// // // //               variant="outline"
// // // //               size="sm"
// // // //               onClick={() => currentAlert?._id && checkAlertStatus(currentAlert._id)} // Pass alertId if available
// // // //               className="flex items-center space-x-2 bg-transparent"
// // // //             >
// // // //               <RefreshCw className="w-4 h-4" />
// // // //               <span>Refresh</span>
// // // //             </Button>
// // // //             <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// // // //               <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
// // // //               {unreadAnnouncementsCount > 0 && (
// // // //                 <motion.span
// // // //                   className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
// // // //                   animate={{ scale: [1, 1.2, 1] }}
// // // //                   transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
// // // //                 >
// // // //                   {unreadAnnouncementsCount}
// // // //                 </motion.span>
// // // //               )}
// // // //             </motion.div>
// // // //             <ThemeToggle />
// // // //             <UserDropdown />
// // // //           </div>
// // // //         </div>
// // // //       </header>
// // // //       <div className="container mx-auto px-6 py-8">
// // // //         {/* Welcome Section */}
// // // //         <motion.div
// // // //           className="mb-8"
// // // //           initial={{ opacity: 0, y: 20 }}
// // // //           animate={{ opacity: 1, y: 0 }}
// // // //           transition={{ duration: 0.6 }}
// // // //         >
// // // //           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user?.name}! 👋</h2>
// // // //           <p className="text-gray-600 dark:text-gray-400">
// // // //             How are you feeling today? Let's track your wellness journey and stay healthy together.
// // // //           </p>
// // // //         </motion.div>

// // // //         {/* Emergency SOS Button - Always Available */}
// // // //         <motion.div
// // // //           className="mb-8"
// // // //           initial={{ opacity: 0, scale: 0.9 }}
// // // //           animate={{ opacity: 1, scale: 1 }}
// // // //           transition={{ duration: 0.6, delay: 0.1 }}
// // // //         >
// // // //           <Card className="border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
// // // //             <CardContent className="p-6">
// // // //               <div className="flex items-center justify-between">
// // // //                 <div className="flex items-center space-x-4">
// // // //                   <motion.div
// // // //                     className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
// // // //                     animate={{
// // // //                       boxShadow: [
// // // //                         "0 0 0 0 rgba(239, 68, 68, 0.7)",
// // // //                         "0 0 0 10px rgba(239, 68, 68, 0)",
// // // //                         "0 0 0 0 rgba(239, 68, 68, 0)",
// // // //                       ],
// // // //                     }}
// // // //                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// // // //                   >
// // // //                     <AlertTriangle className="w-6 h-6 text-white" />
// // // //                   </motion.div>
// // // //                   <div>
// // // //                     <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Quick Emergency Support</h3>
// // // //                     <p className="text-red-600 dark:text-red-300">Need immediate help? Press for instant alert</p>
// // // //                     {location && (
// // // //                       <p className="text-xs text-red-500 dark:text-red-400 mt-1">
// // // //                         📍 Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}
// // // //                       </p>
// // // //                     )}
// // // //                     {emergencyButtonDisabled && (
// // // //                       <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
// // // //                         ⚠️ Emergency alert already sent. Waiting for hospital response...
// // // //                       </p>
// // // //                     )}
// // // //                   </div>
// // // //                 </div>
// // // //                 <motion.div
// // // //                   whileHover={{ scale: emergencyButtonDisabled ? 1 : 1.05 }}
// // // //                   whileTap={{ scale: emergencyButtonDisabled ? 1 : 0.95 }}
// // // //                 >
// // // //                   <Button
// // // //                     onClick={handleEmergencySOS}
// // // //                     disabled={isEmergencyActive || emergencyButtonDisabled}
// // // //                     className={`font-bold px-8 py-3 text-lg shadow-lg transition-all duration-300 ${
// // // //                       emergencyButtonDisabled
// // // //                         ? "bg-gray-400 cursor-not-allowed"
// // // //                         : "bg-red-600 hover:bg-red-700 hover:shadow-xl"
// // // //                     } text-white`}
// // // //                   >
// // // //                     {isEmergencyActive
// // // //                       ? "🚨 Sending..."
// // // //                       : emergencyButtonDisabled
// // // //                         ? "🚨 Alert Sent"
// // // //                         : "🆘 SOS Emergency"}
// // // //                   </Button>
// // // //                 </motion.div>
// // // //               </div>
// // // //             </CardContent>
// // // //           </Card>
// // // //         </motion.div>

// // // //         {/* Emergency Status Banner */}
// // // //         {alertStatus && (
// // // //           <motion.div
// // // //             className="mb-8"
// // // //             initial={{ opacity: 0, scale: 0.9 }}
// // // //             animate={{ opacity: 1, scale: 1 }}
// // // //             transition={{ duration: 0.6, delay: 0.1 }}
// // // //           >
// // // //             <Card
// // // //               className={`border-2 ${
// // // //                 alertStatus === "pending"
// // // //                   ? "border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
// // // //                   : alertStatus === "accepted"
// // // //                     ? "border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
// // // //                     : "border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20"
// // // //               }`}
// // // //             >
// // // //               <CardContent className="p-6">
// // // //                 <div className="flex items-center justify-between">
// // // //                   <div className="flex items-center space-x-4">
// // // //                     <motion.div
// // // //                       className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
// // // //                         alertStatus === "pending"
// // // //                           ? "bg-yellow-500"
// // // //                           : alertStatus === "accepted"
// // // //                             ? "bg-green-500"
// // // //                             : "bg-red-500"
// // // //                       }`}
// // // //                       animate={{
// // // //                         boxShadow:
// // // //                           alertStatus === "pending"
// // // //                             ? [
// // // //                                 "0 0 0 0 rgba(234, 179, 8, 0.7)",
// // // //                                 "0 0 0 10px rgba(234, 179, 8, 0)",
// // // //                                 "0 0 0 0 rgba(234, 179, 8, 0)",
// // // //                               ]
// // // //                             : undefined,
// // // //                       }}
// // // //                       transition={{ duration: 2, repeat: alertStatus === "pending" ? Number.POSITIVE_INFINITY : 0 }}
// // // //                     >
// // // //                       {alertStatus === "pending" ? (
// // // //                         <Timer className="w-6 h-6 text-white" />
// // // //                       ) : alertStatus === "accepted" ? (
// // // //                         <CheckCircle className="w-6 h-6 text-white" />
// // // //                       ) : (
// // // //                         <XCircle className="w-6 h-6 text-white" />
// // // //                       )}
// // // //                     </motion.div>
// // // //                     <div>
// // // //                       <h3
// // // //                         className={`text-lg font-semibold ${
// // // //                           alertStatus === "pending"
// // // //                             ? "text-yellow-800 dark:text-yellow-200"
// // // //                             : alertStatus === "accepted"
// // // //                               ? "text-green-800 dark:text-green-200"
// // // //                               : "text-red-800 dark:text-red-200"
// // // //                         }`}
// // // //                       >
// // // //                         {alertStatus === "pending" && "🚨 Emergency Alert Sent"}
// // // //                         {alertStatus === "accepted" && "✅ Hospital is Coming!"}
// // // //                         {alertStatus === "declined" && "❌ Alert Declined"}
// // // //                       </h3>
// // // //                       <p
// // // //                         className={`${
// // // //                           alertStatus === "pending"
// // // //                             ? "text-yellow-600 dark:text-yellow-300"
// // // //                             : alertStatus === "accepted"
// // // //                               ? "text-green-600 dark:text-green-300"
// // // //                               : "text-red-600 dark:text-red-300"
// // // //                         }`}
// // // //                       >
// // // //                         {alertStatus === "pending" && "Waiting for hospital response..."}
// // // //                         {alertStatus === "accepted" && "A hospital has accepted your emergency request"}
// // // //                         {alertStatus === "declined" && "Your emergency request was declined"}
// // // //                       </p>
// // // //                     </div>
// // // //                   </div>
// // // //                   <Button onClick={dismissAlert} variant="outline" className="font-bold px-6 py-2 bg-transparent">
// // // //                     Dismiss
// // // //                   </Button>
// // // //                 </div>
// // // //               </CardContent>
// // // //             </Card>
// // // //           </motion.div>
// // // //         )}

// // // //         {/* Quick Stats */}
// // // //         <motion.div
// // // //           className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
// // // //           initial={{ opacity: 0, y: 20 }}
// // // //           animate={{ opacity: 1, y: 0 }}
// // // //           transition={{ duration: 0.6, delay: 0.2 }}
// // // //         >
// // // //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// // // //             <Card className="hover:shadow-lg transition-all duration-300">
// // // //               <CardContent className="p-6">
// // // //                 <div className="flex items-center justify-between">
// // // //                   <div>
// // // //                     <p className="text-sm text-gray-600 dark:text-gray-400">Wellness Score</p>
// // // //                     <p className="text-2xl font-bold text-blue-600">{getWellnessScore()}%</p>
// // // //                     <p className="text-xs text-gray-500 mt-1">Based on today's data</p>
// // // //                   </div>
// // // //                   <motion.div
// // // //                     className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
// // // //                     animate={{ rotate: [0, 360] }}
// // // //                     transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// // // //                   >
// // // //                     <Target className="w-6 h-6 text-blue-600" />
// // // //                   </motion.div>
// // // //                 </div>
// // // //               </CardContent>
// // // //             </Card>
// // // //           </motion.div>
// // // //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// // // //             <Card className="hover:shadow-lg transition-all duration-300">
// // // //               <CardContent className="p-6">
// // // //                 <div className="flex items-center justify-between">
// // // //                   <div>
// // // //                     <p className="text-sm text-gray-600 dark:text-gray-400">Today's Mood</p>
// // // //                     <div className="flex items-center space-x-2">
// // // //                       {todayMood ? getMoodIcon(todayMood.mood) : <Meh className="w-6 h-6 text-gray-400" />}
// // // //                       <span
// // // //                         className={`text-lg font-semibold ${todayMood ? getMoodColor(todayMood.mood) : "text-gray-400"}`}
// // // //                       >
// // // //                         {todayMood?.mood || "Not set"}
// // // //                       </span>
// // // //                     </div>
// // // //                     <p className="text-xs text-gray-500 mt-1">Out of 10</p>
// // // //                   </div>
// // // //                   <motion.div
// // // //                     className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
// // // //                     animate={{
// // // //                       scale: [1, 1.1, 1],
// // // //                       rotate: [0, 10, -10, 0],
// // // //                     }}
// // // //                     transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
// // // //                   >
// // // //                     <Brain className="w-6 h-6 text-green-600" />
// // // //                   </motion.div>
// // // //                 </div>
// // // //               </CardContent>
// // // //             </Card>
// // // //           </motion.div>
// // // //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// // // //             <Card className="hover:shadow-lg transition-all duration-300">
// // // //               <CardContent className="p-6">
// // // //                 <div className="flex items-center justify-between">
// // // //                   <div>
// // // //                     <p className="text-sm text-gray-600 dark:text-gray-400">Sleep Last Night</p>
// // // //                     <p className="text-2xl font-bold text-purple-600">{todayMood?.sleep || 0}h</p>
// // // //                     <p className="text-xs text-gray-500 mt-1">
// // // //                       {(todayMood?.sleep || 0) >= 7 ? "Good sleep!" : "Need more rest"}
// // // //                     </p>
// // // //                   </div>
// // // //                   <motion.div
// // // //                     className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
// // // //                     animate={{
// // // //                       y: [0, -5, 0],
// // // //                       opacity: [1, 0.7, 1],
// // // //                     }}
// // // //                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
// // // //                   >
// // // //                     <Moon className="w-6 h-6 text-purple-600" />
// // // //                   </motion.div>
// // // //                 </div>
// // // //               </CardContent>
// // // //             </Card>
// // // //           </motion.div>
// // // //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// // // //             <Card className="hover:shadow-lg transition-all duration-300">
// // // //               <CardContent className="p-6">
// // // //                 <div className="flex items-center justify-between">
// // // //                   <div>
// // // //                     <p className="text-sm text-gray-600 dark:text-gray-400">Energy Level</p>
// // // //                     <p className="text-2xl font-bold text-orange-600">{todayMood?.energy || 0}/10</p>
// // // //                     <p className="text-xs text-gray-500 mt-1">Weekly avg: {getWeeklyAverage()}</p>
// // // //                   </div>
// // // //                   <motion.div
// // // //                     className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center"
// // // //                     animate={{
// // // //                       scale: [1, 1.2, 1],
// // // //                       rotate: [0, 180, 360],
// // // //                     }}
// // // //                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// // // //                   >
// // // //                     <Zap className="w-6 h-6 text-orange-600" />
// // // //                   </motion.div>
// // // //                 </div>
// // // //               </CardContent>
// // // //             </Card>
// // // //           </motion.div>
// // // //         </motion.div>

// // // //         {/* Main Content Tabs */}
// // // //         <motion.div
// // // //           initial={{ opacity: 0, y: 20 }}
// // // //           animate={{ opacity: 1, y: 0 }}
// // // //           transition={{ duration: 0.6, delay: 0.3 }}
// // // //         >
// // // //           <Tabs defaultValue="mood" className="space-y-6">
// // // //             <TabsList className="grid w-full grid-cols-5">
// // // //               <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
// // // //               <TabsTrigger value="posts">Posts</TabsTrigger>
// // // //               <TabsTrigger value="announcements">Announcements</TabsTrigger>
// // // //               <TabsTrigger value="emergency">Emergency Alert</TabsTrigger>
// // // //               <TabsTrigger value="past-alerts">Past Alerts</TabsTrigger>
// // // //               <TabsTrigger value="assessment">Self Assessment</TabsTrigger>
// // // //             </TabsList>

// // // //             {/* Mood Tracking Tab */}
// // // //             <TabsContent value="mood" className="space-y-6">
// // // //               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // // //                 {/* Today's Mood Entry */}
// // // //                 <Card className="hover:shadow-lg transition-shadow duration-300">
// // // //                   <CardHeader>
// // // //                     <CardTitle className="flex items-center space-x-2">
// // // //                       <Plus className="w-5 h-5" />
// // // //                       <span>Log Today's Mood</span>
// // // //                     </CardTitle>
// // // //                   </CardHeader>
// // // //                   <CardContent className="space-y-6">
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium mb-2">Mood (1-10)</label>
// // // //                       <div className="flex items-center space-x-4">
// // // //                         <input
// // // //                           type="range"
// // // //                           min="1"
// // // //                           max="10"
// // // //                           value={currentMood}
// // // //                           onChange={(e) => setCurrentMood(Number(e.target.value))}
// // // //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// // // //                         />
// // // //                         <div className="flex items-center space-x-2">
// // // //                           {getMoodIcon(currentMood)}
// // // //                           <span className="text-lg font-semibold w-8">{currentMood}</span>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium mb-2">Energy Level (1-10)</label>
// // // //                       <div className="flex items-center space-x-4">
// // // //                         <input
// // // //                           type="range"
// // // //                           min="1"
// // // //                           max="10"
// // // //                           value={currentEnergy}
// // // //                           onChange={(e) => setCurrentEnergy(Number(e.target.value))}
// // // //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// // // //                         />
// // // //                         <div className="flex items-center space-x-2">
// // // //                           <Zap className="w-5 h-5 text-orange-500" />
// // // //                           <span className="text-lg font-semibold w-8">{currentEnergy}</span>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium mb-2">Anxiety Level (1-10)</label>
// // // //                       <div className="flex items-center space-x-4">
// // // //                         <input
// // // //                           type="range"
// // // //                           min="1"
// // // //                           max="10"
// // // //                           value={currentAnxiety}
// // // //                           onChange={(e) => setCurrentAnxiety(Number(e.target.value))}
// // // //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// // // //                         />
// // // //                         <div className="flex items-center space-x-2">
// // // //                           <AlertTriangle className="w-5 h-5 text-red-500" />
// // // //                           <span className="text-lg font-semibold w-8">{currentAnxiety}</span>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium mb-2">Sleep Hours</label>
// // // //                       <div className="flex items-center space-x-4">
// // // //                         <input
// // // //                           type="range"
// // // //                           min="0"
// // // //                           max="12"
// // // //                           value={currentSleep}
// // // //                           onChange={(e) => setCurrentSleep(Number(e.target.value))}
// // // //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// // // //                         />
// // // //                         <div className="flex items-center space-x-2">
// // // //                           <Moon className="w-5 h-5 text-purple-500" />
// // // //                           <span className="text-lg font-semibold w-8">{currentSleep}h</span>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                     <div>
// // // //                       <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
// // // //                       <Textarea
// // // //                         value={moodNotes}
// // // //                         onChange={(e) => setMoodNotes(e.target.value)}
// // // //                         placeholder="How are you feeling today? Any specific thoughts or events?"
// // // //                         className="w-full"
// // // //                         rows={3}
// // // //                       />
// // // //                     </div>
// // // //                     <Button
// // // //                       onClick={saveMoodEntry}
// // // //                       className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
// // // //                     >
// // // //                       Save Mood Entry
// // // //                     </Button>
// // // //                   </CardContent>
// // // //                 </Card>

// // // //                 {/* Mood Chart */}
// // // //                 <Card className="hover:shadow-lg transition-shadow duration-300">
// // // //                   <CardHeader>
// // // //                     <CardTitle className="flex items-center space-x-2">
// // // //                       <BarChart3 className="w-5 h-5" />
// // // //                       <span>7-Day Mood Trend</span>
// // // //                     </CardTitle>
// // // //                   </CardHeader>
// // // //                   <CardContent>
// // // //                     {moodData.length > 0 ? (
// // // //                       <div className="space-y-4">
// // // //                         {moodData.slice(-7).map((entry, index) => (
// // // //                           <motion.div
// // // //                             key={index}
// // // //                             className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
// // // //                             initial={{ opacity: 0, x: -20 }}
// // // //                             animate={{ opacity: 1, x: 0 }}
// // // //                             transition={{ delay: index * 0.1 }}
// // // //                           >
// // // //                             <div className="flex items-center space-x-3">
// // // //                               <Calendar className="w-4 h-4 text-gray-500" />
// // // //                               <span className="text-sm text-gray-600 dark:text-gray-400">
// // // //                                 {new Date(entry.date).toLocaleDateString()}
// // // //                               </span>
// // // //                             </div>
// // // //                             <div className="flex items-center space-x-3">
// // // //                               {getMoodIcon(entry.mood)}
// // // //                               <Progress value={entry.mood * 10} className="w-20" />
// // // //                               <span className="text-sm font-medium w-12">{entry.mood}/10</span>
// // // //                             </div>
// // // //                           </motion.div>
// // // //                         ))}
// // // //                         <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
// // // //                           <div className="flex items-center justify-between">
// // // //                             <span className="text-sm text-blue-700 dark:text-blue-300">Weekly Average</span>
// // // //                             <div className="flex items-center space-x-2">
// // // //                               <TrendingUp className="w-4 h-4 text-blue-600" />
// // // //                               <span className="font-semibold text-blue-600">{getWeeklyAverage()}/10</span>
// // // //                             </div>
// // // //                           </div>
// // // //                         </div>
// // // //                       </div>
// // // //                     ) : (
// // // //                       <div className="text-center py-8">
// // // //                         <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// // // //                         <p className="text-gray-600 dark:text-gray-400">No mood data yet</p>
// // // //                         <p className="text-sm text-gray-500">Start tracking to see your trends</p>
// // // //                       </div>
// // // //                     )}
// // // //                   </CardContent>
// // // //                 </Card>
// // // //               </div>
// // // //             </TabsContent>

// // // //             {/* Combined Posts Tab */}
// // // //             <TabsContent value="posts" className="space-y-6">
// // // //               <Card>
// // // //                 <CardHeader>
// // // //                   <CardTitle className="flex items-center space-x-2">
// // // //                     <FileText className="w-5 h-5 text-blue-600" />
// // // //                     <span>Healthcare Posts</span>
// // // //                     <Badge variant="secondary">{allPosts.length} posts</Badge>
// // // //                   </CardTitle>
// // // //                 </CardHeader>
// // // //                 <CardContent>
// // // //                   {allPosts.length > 0 ? (
// // // //                     <div className="space-y-6">
// // // //                       {allPosts.map((post, index) => (
// // // //                         <motion.div
// // // //                           key={post._id}
// // // //                           initial={{ opacity: 0, y: 20 }}
// // // //                           animate={{ opacity: 1, y: 0 }}
// // // //                           transition={{ delay: index * 0.1 }}
// // // //                           whileHover={{ scale: 1.01 }}
// // // //                           className="border rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
// // // //                         >
// // // //                           {/* Post Header */}
// // // //                           <div className="flex items-start justify-between mb-4">
// // // //                             <div className="flex items-center space-x-4">
// // // //                               <div
// // // //                                 className={`w-12 h-12 rounded-full flex items-center justify-center ${getAuthorBadgeColor(post.authorType)}`}
// // // //                               >
// // // //                                 {getAuthorIcon(post.authorType)}
// // // //                               </div>
// // // //                               <div>
// // // //                                 <div className="flex items-center space-x-2">
// // // //                                   <p className="font-semibold text-lg">
// // // //                                     {post.authorType === "Doctor" ? "Dr. " : "Hospital "}
// // // //                                     {post.postby || "Mahadev"}
// // // //                                   </p>
// // // //                                   <Badge className={getAuthorBadgeColor(post.authorType)}>{post.authorType}</Badge>
// // // //                                 </div>
// // // //                                 <p className="text-sm text-gray-500 dark:text-gray-400">
// // // //                                   {post.authorType === "Doctor" ? "Medical Professional" : "Healthcare Institution"}
// // // //                                 </p>
// // // //                                 {post.mentionedId && (
// // // //                                   <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
// // // //                                     mentioned {post.mentionedType === "Doctor" ? "Dr. " : ""}
// // // //                                     {post.mentionedId.name}
// // // //                                   </p>
// // // //                                 )}
// // // //                               </div>
// // // //                             </div>
// // // //                             <div className="flex items-center space-x-3">
// // // //                               <Badge variant="outline" className="capitalize">
// // // //                                 {post.category.replace("-", " ")}
// // // //                               </Badge>
// // // //                               <div className="flex items-center space-x-1 text-xs text-gray-500">
// // // //                                 <Clock className="w-3 h-3" />
// // // //                                 <span>{formatTimeAgo(post.createdAt)}</span>
// // // //                               </div>
// // // //                             </div>
// // // //                           </div>

// // // //                           {/* Post Content */}
// // // //                           <div className="mb-4">
// // // //                             <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">{post.title}</h3>
// // // //                             <div className="prose prose-gray dark:prose-invert max-w-none">
// // // //                               <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{post.content}</p>
// // // //                             </div>
// // // //                           </div>

// // // //                           {/* Tags */}
// // // //                           {post.tags.length > 0 && (
// // // //                             <div className="mb-4">
// // // //                               <div className="flex items-center space-x-2 mb-2">
// // // //                                 <Tag className="w-4 h-4 text-gray-500" />
// // // //                                 <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags:</span>
// // // //                               </div>
// // // //                               <div className="flex flex-wrap gap-2">
// // // //                                 {post.tags.map((tag, tagIndex) => (
// // // //                                   <Badge
// // // //                                     key={tagIndex}
// // // //                                     variant="secondary"
// // // //                                     className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
// // // //                                   >
// // // //                                     #{tag}
// // // //                                   </Badge>
// // // //                                 ))}
// // // //                               </div>
// // // //                             </div>
// // // //                           )}

// // // //                           {/* Post Actions */}
// // // //                           <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
// // // //                             <div className="flex items-center space-x-6">
// // // //                               <div className="flex items-center space-x-2 text-gray-600">
// // // //                                 <Eye className="w-5 h-5" />
// // // //                                 <span className="text-xs text-gray-500">Public post</span>
// // // //                               </div>
// // // //                             </div>
// // // //                             <div className="flex items-center space-x-2">
// // // //                               {post.isApproved && (
// // // //                                 <Badge variant="outline" className="text-green-600 border-green-200">
// // // //                                   <CheckCircle className="w-3 h-3 mr-1" />
// // // //                                   Verified
// // // //                                 </Badge>
// // // //                               )}
// // // //                             </div>
// // // //                           </div>
// // // //                         </motion.div>
// // // //                       ))}
// // // //                     </div>
// // // //                   ) : (
// // // //                     <div className="text-center py-16">
// // // //                       <FileText className="w-20 h-20 text-gray-400 mx-auto mb-6" />
// // // //                       <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
// // // //                         No posts available
// // // //                       </h3>
// // // //                       <p className="text-gray-500 mb-4">Healthcare posts from doctors and hospitals will appear here</p>
// // // //                       <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
// // // //                         <div className="flex items-center space-x-2">
// // // //                           <Stethoscope className="w-4 h-4" />
// // // //                           <span>Doctor posts</span>
// // // //                         </div>
// // // //                         <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
// // // //                         <div className="flex items-center space-x-2">
// // // //                           <Building2 className="w-4 h-4" />
// // // //                           <span>Hospital updates</span>
// // // //                         </div>
// // // //                       </div>
// // // //                     </div>
// // // //                   )}
// // // //                 </CardContent>
// // // //               </Card>
// // // //             </TabsContent>

// // // //             {/* Announcements Tab */}
// // // //             <TabsContent value="announcements" className="space-y-6">
// // // //               <Card>
// // // //                 <CardHeader>
// // // //                   <CardTitle className="flex items-center space-x-2">
// // // //                     <Megaphone className="w-5 h-5 text-blue-600" />
// // // //                     <span>All Announcements</span>
// // // //                   </CardTitle>
// // // //                 </CardHeader>
// // // //                 <CardContent>
// // // //                   {allAnnouncements.length > 0 ? (
// // // //                     <div className="space-y-4">
// // // //                       {allAnnouncements.map((announcement, index) => (
// // // //                         <motion.div
// // // //                           key={announcement._id}
// // // //                           initial={{ opacity: 0, y: 20 }}
// // // //                           animate={{ opacity: 1, y: 0 }}
// // // //                           transition={{ delay: index * 0.1 }}
// // // //                           whileHover={{ scale: 1.01 }}
// // // //                           className={`border rounded-lg p-4 hover:shadow-md transition-all duration-300 ${
// // // //                             announcement.isRead ? "bg-gray-50 dark:bg-gray-800" : "bg-yellow-50 dark:bg-yellow-900/20"
// // // //                           }`}
// // // //                         >
// // // //                           <div className="flex items-start justify-between mb-3">
// // // //                             <div className="flex-1">
// // // //                               <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
// // // //                               <div className="flex items-center space-x-2 mb-2">
// // // //                                 <Badge variant="outline">{announcement.ownerType}</Badge>
// // // //                               </div>
// // // //                             </div>
// // // //                             <div className="flex items-center space-x-2">
// // // //                               <span className="text-xs text-gray-500">
// // // //                                 {new Date(announcement.createdAt).toLocaleDateString()}
// // // //                               </span>
// // // //                             </div>
// // // //                           </div>
// // // //                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{announcement.content}</p>
// // // //                           <div className="flex items-center justify-between">
// // // //                             <div className="flex items-center space-x-2 text-gray-600">
// // // //                               <Eye className="w-4 h-4" />
// // // //                               <span className="text-sm">View details</span>
// // // //                             </div>
// // // //                           </div>
// // // //                         </motion.div>
// // // //                       ))}
// // // //                     </div>
// // // //                   ) : (
// // // //                     <div className="text-center py-12">
// // // //                       <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// // // //                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
// // // //                         No announcements yet
// // // //                       </h3>
// // // //                       <p className="text-gray-500">Announcements from doctors and hospitals will appear here.</p>
// // // //                     </div>
// // // //                   )}
// // // //                 </CardContent>
// // // //               </Card>
// // // //             </TabsContent>

// // // //             {/* Emergency Alert Tab - Form-based */}
// // // //             <TabsContent value="emergency" className="space-y-6">
// // // //               <Card>
// // // //                 <CardHeader>
// // // //                   <CardTitle className="flex items-center space-x-2">
// // // //                     <AlertTriangle className="w-5 h-5 text-red-500" />
// // // //                     <span>Detailed Emergency Alert</span>
// // // //                     {emergencyButtonDisabled && <Badge variant="destructive">Alert Active</Badge>}
// // // //                   </CardTitle>
// // // //                 </CardHeader>
// // // //                 <CardContent className="space-y-6">
// // // //                   {!emergencyButtonDisabled ? (
// // // //                     <>
// // // //                       <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
// // // //                         <AlertTriangle className="h-4 w-4" />
// // // //                         <AlertDescription>
// // // //                           <strong>Emergency Use Only:</strong> This will immediately alert nearby hospitals with
// // // //                           detailed information.
// // // //                         </AlertDescription>
// // // //                       </Alert>
// // // //                       <div>
// // // //                         <label className="block text-sm font-medium mb-2">Describe your emergency *</label>
// // // //                         <Textarea
// // // //                           value={emergencyForm.message}
// // // //                           onChange={(e) => setEmergencyForm({ ...emergencyForm, message: e.target.value })}
// // // //                           placeholder="Please describe your medical emergency in detail..."
// // // //                           className="w-full min-h-[120px]"
// // // //                         />
// // // //                       </div>
// // // //                       <div>
// // // //                         <label className="block text-sm font-medium mb-2">Priority Level</label>
// // // //                         <Select
// // // //                           value={emergencyForm.priority}
// // // //                           onValueChange={(value) => setEmergencyForm({ ...emergencyForm, priority: value })}
// // // //                         >
// // // //                           <SelectTrigger>
// // // //                             <SelectValue />
// // // //                           </SelectTrigger>
// // // //                           <SelectContent>
// // // //                             <SelectItem value="critical">🔴 Critical - Life threatening</SelectItem>
// // // //                             <SelectItem value="high">🟠 High - Urgent medical attention</SelectItem>
// // // //                             <SelectItem value="medium">🟡 Medium - Medical assistance needed</SelectItem>
// // // //                           </SelectContent>
// // // //                         </Select>
// // // //                       </div>
// // // //                       <Button
// // // //                         onClick={handleFormEmergencyAlert}
// // // //                         disabled={isEmergencyActive || !emergencyForm.message.trim()}
// // // //                         className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg"
// // // //                       >
// // // //                         {isEmergencyActive ? (
// // // //                           <>
// // // //                             <motion.div
// // // //                               className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
// // // //                               animate={{ rotate: 360 }}
// // // //                               transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// // // //                             />
// // // //                             Sending Emergency Alert...
// // // //                           </>
// // // //                         ) : (
// // // //                           <>
// // // //                             <Send className="w-5 h-5 mr-2" />
// // // //                             Send Detailed Emergency Alert
// // // //                           </>
// // // //                         )}
// // // //                       </Button>
// // // //                     </>
// // // //                   ) : (
// // // //                     <div className="text-center py-12">
// // // //                       <motion.div
// // // //                         className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
// // // //                         animate={{
// // // //                           boxShadow: [
// // // //                             "0 0 0 0 rgba(234, 179, 8, 0.7)",
// // // //                             "0 0 0 20px rgba(234, 179, 8, 0)",
// // // //                             "0 0 0 0 rgba(234, 179, 8, 0)",
// // // //                           ],
// // // //                         }}
// // // //                         transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// // // //                       >
// // // //                         <Timer className="w-8 h-8 text-white" />
// // // //                       </motion.div>
// // // //                       <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
// // // //                         Emergency Alert Active
// // // //                       </h3>
// // // //                       <p className="text-yellow-600 dark:text-yellow-300 mb-4">
// // // //                         Your emergency alert has been sent to nearby hospitals. Please wait for their response.
// // // //                       </p>
// // // //                       <Button
// // // //                         onClick={dismissAlert}
// // // //                         variant="outline"
// // // //                         className="border-yellow-500 text-yellow-700 hover:bg-yellow-50 bg-transparent"
// // // //                       >
// // // //                         Dismiss Alert
// // // //                       </Button>
// // // //                     </div>
// // // //                   )}
// // // //                 </CardContent>
// // // //               </Card>
// // // //             </TabsContent>

// // // //             {/* Past Emergency Alerts Tab */}
// // // //             <TabsContent value="past-alerts" className="space-y-6">
// // // //               <Card>
// // // //                 <CardHeader>
// // // //                   <CardTitle className="flex items-center space-x-2">
// // // //                     <History className="w-5 h-5 text-blue-500" />
// // // //                     <span>Past Emergency Alert Requests</span>
// // // //                     <Badge variant="secondary">{emergencyAlerts.length} total</Badge>
// // // //                   </CardTitle>
// // // //                 </CardHeader>
// // // //                 <CardContent>
// // // //                   {emergencyAlerts.length > 0 ? (
// // // //                     <div className="space-y-4">
// // // //                       {emergencyAlerts.map((alert, index) => (
// // // //                         <motion.div
// // // //                           key={alert._id}
// // // //                           initial={{ opacity: 0, y: 20 }}
// // // //                           animate={{ opacity: 1, y: 0 }}
// // // //                           transition={{ delay: index * 0.1 }}
// // // //                           className={`border rounded-lg p-4 hover:shadow-md transition-all duration-300 ${
// // // //                             alert.status === "pending"
// // // //                               ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
// // // //                               : alert.status === "accepted"
// // // //                                 ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
// // // //                                 : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
// // // //                           }`}
// // // //                         >
// // // //                           <div className="flex items-start justify-between">
// // // //                             <div className="flex-1">
// // // //                               <div className="flex items-center space-x-3 mb-3">
// // // //                                 <motion.div
// // // //                                   className={`w-3 h-3 rounded-full ${
// // // //                                     alert.status === "pending"
// // // //                                       ? "bg-yellow-500"
// // // //                                       : alert.status === "accepted"
// // // //                                         ? "bg-green-500"
// // // //                                         : "bg-red-500"
// // // //                                   }`}
// // // //                                   animate={{ scale: alert.status === "pending" ? [1, 1.2, 1] : 1 }}
// // // //                                   transition={{
// // // //                                     duration: 1,
// // // //                                     repeat: alert.status === "pending" ? Number.POSITIVE_INFINITY : 0,
// // // //                                   }}
// // // //                                 />
// // // //                                 <h3 className="font-semibold text-lg">Emergency Alert</h3>
// // // //                                 <Badge className={getPriorityColor(alert.priority)}>
// // // //                                   {alert.priority.toUpperCase()}
// // // //                                 </Badge>
// // // //                                 <Badge className={getStatusColor(alert.status)}>{alert.status.toUpperCase()}</Badge>
// // // //                               </div>
// // // //                               <div className="mb-4">
// // // //                                 <h4 className="font-medium text-gray-900 dark:text-white mb-2">Emergency Message</h4>
// // // //                                 <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
// // // //                                   {alert.message}
// // // //                                 </p>
// // // //                               </div>
// // // //                               {alert.location?.address && (
// // // //                                 <div className="mb-4">
// // // //                                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Location</h4>
// // // //                                   <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
// // // //                                     <div className="flex items-start space-x-2">
// // // //                                       <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
// // // //                                       <div className="flex-1">
// // // //                                         <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
// // // //                                           📍 {formatLocationAddress(alert.location.address)}
// // // //                                         </p>
// // // //                                         <Button
// // // //                                           onClick={() => openGoogleMaps(alert.location?.address)}
// // // //                                           size="sm"
// // // //                                           className="bg-blue-600 hover:bg-blue-700 text-white"
// // // //                                         >
// // // //                                           <Map className="w-3 h-3 mr-1" />
// // // //                                           View on Map
// // // //                                           <ExternalLink className="w-3 h-3 ml-1" />
// // // //                                         </Button>
// // // //                                       </div>
// // // //                                     </div>
// // // //                                   </div>
// // // //                                 </div>
// // // //                               )}
// // // //                               {alert.acceptedBy && (
// // // //                                 <div className="mb-4">
// // // //                                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hospital Response</h4>
// // // //                                   <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
// // // //                                     <div className="flex items-center space-x-2">
// // // //                                       <CheckCircle className="w-4 h-4 text-green-500" />
// // // //                                       <span className="font-medium text-green-800 dark:text-green-200">
// // // //                                         Accepted by {alert.acceptedBy.name}
// // // //                                       </span>
// // // //                                     </div>
// // // //                                     <p className="text-sm text-green-700 dark:text-green-300 mt-1">
// // // //                                       Contact: {alert.acceptedBy.phone}
// // // //                                     </p>
// // // //                                   </div>
// // // //                                 </div>
// // // //                               )}
// // // //                               <div className="flex items-center justify-between">
// // // //                                 <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
// // // //                                   <Timer className="w-4 h-4" />
// // // //                                   <span>{formatTimeAgo(alert.createdAt)}</span>
// // // //                                 </div>
// // // //                                 <Button
// // // //                                   size="sm"
// // // //                                   variant="outline"
// // // //                                   onClick={() => handleDeleteAlert(alert._id)}
// // // //                                   className="text-red-600 hover:text-red-800 hover:bg-red-50"
// // // //                                 >
// // // //                                   <Trash2 className="w-4 h-4 mr-1" />
// // // //                                   Delete
// // // //                                 </Button>
// // // //                               </div>
// // // //                             </div>
// // // //                           </div>
// // // //                         </motion.div>
// // // //                       ))}
// // // //                     </div>
// // // //                   ) : (
// // // //                     <div className="text-center py-12">
// // // //                       <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// // // //                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
// // // //                         No Past Alert Requests
// // // //                       </h3>
// // // //                       <p className="text-gray-500">You haven't sent any emergency alerts yet</p>
// // // //                     </div>
// // // //                   )}
// // // //                 </CardContent>
// // // //               </Card>
// // // //             </TabsContent>

// // // //             {/* Self Assessment Tab */}
// // // //             <TabsContent value="assessment" className="space-y-6">
// // // //               {currentAssessment ? (
// // // //                 currentAssessment === "phq9" ? (
// // // //                   <PHQ9Assessment
// // // //                     onComplete={(result) => {
// // // //                       setAssessmentResult(result)
// // // //                       setCurrentAssessment("results")
// // // //                     }}
// // // //                     onBack={() => setCurrentAssessment(null)}
// // // //                   />
// // // //                 ) : currentAssessment === "gad7" ? (
// // // //                   <GAD7Assessment
// // // //                     onComplete={(result) => {
// // // //                       setAssessmentResult(result)
// // // //                       setCurrentAssessment("results")
// // // //                     }}
// // // //                     onBack={() => setCurrentAssessment(null)}
// // // //                   />
// // // //                 ) : currentAssessment === "results" ? (
// // // //                   <AssessmentResults
// // // //                     type={assessmentType}
// // // //                     result={assessmentResult}
// // // //                     onBack={() => setCurrentAssessment(null)}
// // // //                     onReturnToDashboard={() => {
// // // //                       setCurrentAssessment(null)
// // // //                       setAssessmentResult(null)
// // // //                       setAssessmentType("")
// // // //                     }}
// // // //                   />
// // // //                 ) : null
// // // //               ) : (
// // // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // // //                   {[
// // // //                     {
// // // //                       icon: Brain,
// // // //                       title: "Depression Assessment (PHQ-9)",
// // // //                       desc: "A 9-question assessment to help identify symptoms of depression and track your mental health.",
// // // //                       color: "blue",
// // // //                       type: "phq9",
// // // //                     },
// // // //                     {
// // // //                       icon: AlertTriangle,
// // // //                       title: "Anxiety Assessment (GAD-7)",
// // // //                       desc: "A 7-question screening tool for generalized anxiety disorder and anxiety symptoms.",
// // // //                       color: "yellow",
// // // //                       type: "gad7",
// // // //                     },
// // // //                     {
// // // //                       icon: Zap,
// // // //                       title: "Stress Level Check",
// // // //                       desc: "Quick assessment to understand your current stress levels and get personalized recommendations.",
// // // //                       color: "red",
// // // //                       type: "stress",
// // // //                       disabled: true,
// // // //                     },
// // // //                     {
// // // //                       icon: Heart,
// // // //                       title: "General Wellness Check",
// // // //                       desc: "Comprehensive wellness assessment covering multiple areas of your physical and mental health.",
// // // //                       color: "green",
// // // //                       type: "wellness",
// // // //                       disabled: true,
// // // //                     },
// // // //                   ].map((assessment, index) => (
// // // //                     <motion.div
// // // //                       key={index}
// // // //                       initial={{ opacity: 0, y: 20 }}
// // // //                       animate={{ opacity: 1, y: 0 }}
// // // //                       transition={{ delay: index * 0.1 }}
// // // //                       whileHover={{ scale: assessment.disabled ? 1 : 1.02, y: assessment.disabled ? 0 : -5 }}
// // // //                     >
// // // //                       <Card
// // // //                         className={`hover:shadow-lg transition-all duration-300 ${assessment.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer group"}`}
// // // //                       >
// // // //                         <CardHeader>
// // // //                           <CardTitle className="flex items-center space-x-2">
// // // //                             <assessment.icon className={`w-5 h-5 text-${assessment.color}-500`} />
// // // //                             <span>{assessment.title}</span>
// // // //                             {assessment.disabled && <Badge variant="secondary">Coming Soon</Badge>}
// // // //                           </CardTitle>
// // // //                         </CardHeader>
// // // //                         <CardContent>
// // // //                           <p className="text-gray-600 dark:text-gray-300 mb-4">{assessment.desc}</p>
// // // //                           <Button
// // // //                             className={`w-full ${assessment.disabled ? "cursor-not-allowed" : `group-hover:bg-${assessment.color}-600`}`}
// // // //                             disabled={assessment.disabled}
// // // //                             onClick={() => {
// // // //                               if (!assessment.disabled) {
// // // //                                 setAssessmentType(assessment.type)
// // // //                                 setCurrentAssessment(assessment.type)
// // // //                               }
// // // //                             }}
// // // //                           >
// // // //                             {assessment.disabled ? "Coming Soon" : "Start Assessment"}
// // // //                           </Button>
// // // //                         </CardContent>
// // // //                       </Card>
// // // //                     </motion.div>
// // // //                   ))}
// // // //                 </div>
// // // //               )}
// // // //             </TabsContent>
// // // //           </Tabs>
// // // //         </motion.div>
// // // //       </div>
// // // //     </div>
// // // //   )
// // // // }
















// // // //C:\Users\UDAYN\Downloads\healthcare-platform - Copy\app\user\dashboard\page.tsx
// // // "use client"
// // // import { useState, useEffect } from "react"
// // // import { motion, AnimatePresence } from "framer-motion"
// // // import {
// // //   Heart,
// // //   AlertTriangle,
// // //   Brain,
// // //   Target,
// // //   Zap,
// // //   Moon,
// // //   Smile,
// // //   Frown,
// // //   Meh,
// // //   Plus,
// // //   BarChart3,
// // //   TrendingUp,
// // //   Calendar,
// // //   Clock,
// // //   Building2,
// // //   Stethoscope,
// // //   MapPin,
// // //   Phone,
// // //   Mail,
// // //   Award,
// // //   CheckCircle,
// // //   Trash2,
// // //   Send,
// // //   History,
// // //   Timer,
// // //   Map,
// // //   ExternalLink,
// // //   RefreshCw,
// // //   XCircle,
// // //   FileText,
// // //   Tag,
// // //   Eye,
// // //   Megaphone,
// // //   Bell,
// // // } from "lucide-react"
// // // import { Button } from "@/components/ui/button"
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // import { Progress } from "@/components/ui/progress"
// // // import { Badge } from "@/components/ui/badge"
// // // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // // import { Textarea } from "@/components/ui/textarea"
// // // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// // // import { Alert, AlertDescription } from "@/components/ui/alert"
// // // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // // import { useAuth } from "@/app/contexts/AuthProvider"
// // // import ThemeToggle from "@/components/ThemeToggle"
// // // import UserDropdown from "@/components/UserDropdown"
// // // import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
// // // import { toast } from "react-hot-toast"
// // // import PHQ9Assessment from "@/components/assessments/PHQ9Assessment"
// // // import GAD7Assessment from "@/components/assessments/GAD7Assessment"
// // // import AssessmentResults from "@/components/assessments/AssessmentResults"

// // // interface MoodData {
// // //   date: string
// // //   mood: number
// // //   energy: number
// // //   anxiety: number
// // //   sleep: number
// // //   notes?: string
// // // }

// // // interface EmergencyAlert {
// // //   _id: string
// // //   status: string
// // //   priority: string
// // //   createdAt: string
// // //   message: string
// // //   userInfo: {
// // //     name: string
// // //     email: string
// // //     phone: string
// // //   }
// // //   location?: {
// // //     lat?: number
// // //     lng?: number
// // //     address?: {
// // //       street?: string
// // //       area?: string
// // //       townOrVillage?: string
// // //       taluka?: string
// // //       district?: string
// // //       pincode?: string
// // //       state?: string
// // //       geoLocation?: {
// // //         lat?: number
// // //         lng?: number
// // //       }
// // //     }
// // //   }
// // //   acceptedBy?: {
// // //     _id: string
// // //     name: string
// // //     phone: string
// // //   }
// // //   isRead?: boolean
// // // }

// // // interface Post {
// // //   _id: string
// // //   title: string
// // //   content: string
// // //   category: string
// // //   tags: string[]
// // //   authorId: {
// // //     _id: string
// // //     name: string
// // //   }
// // //   authorType: string
// // //   mentionedId?: {
// // //     _id: string
// // //     name: string
// // //   }
// // //   mentionedType?: string
// // //   createdAt: string
// // //   postby: string
// // //   isApproved: boolean
// // // }

// // // interface Hospital {
// // //   _id: string
// // //   name: string
// // //   email: string
// // //   phone: string
// // //   address: string
// // //   specialties: string[]
// // //   isVerified: boolean
// // //   isAvailable: boolean
// // //   isHandleEmergency: boolean
// // //   createdAt: string
// // //   distance?: number
// // // }

// // // interface UserProfile {
// // //   _id: string
// // //   name: string
// // //   email: string
// // //   phone: string
// // //   address: {
// // //     street: string
// // //     area: string
// // //     village: string // Renamed from townOrVillage
// // //     subDistrict: string // Renamed from taluka
// // //     district: string
// // //     pincode: string
// // //     state: string
// // //     geoLocation?: {
// // //       // Added this based on the provided schema
// // //       lat?: number
// // //       lng?: number
// // //     }
// // //   }
// // //   emergencyContacts: Array<{
// // //     name: string
// // //     phone: string
// // //     relation: string
// // //   }>
// // //   medicalInfo: {
// // //     bloodGroup: string
// // //     allergies: string[]
// // //     medications: string[]
// // //     conditions: string[]
// // //   }
// // // }

// // // interface Announcement {
// // //   _id: string
// // //   title: string
// // //   content: string
// // //   ownerId: string
// // //   ownerType: "doctor" | "hospital" | "user"
// // //   mentions: Array<{
// // //     id: string
// // //     name: string
// // //     type: "doctor" | "hospital"
// // //     email: string
// // //   }>
// // //   readBy: string[] // Array of user/doctor/hospital IDs who have read it
// // //   createdAt: string
// // //   isRead?: boolean // For mentions tab, indicates if *this* user has read it
// // // }

// // // export default function UserDashboard() {
// // //   const { user } = useAuth()
// // //   const [moodData, setMoodData] = useState<MoodData[]>([])
// // //   const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
// // //   const [allPosts, setAllPosts] = useState<Post[]>([])
// // //   const [hospitals, setHospitals] = useState<Hospital[]>([])
// // //   const [allAnnouncements, setAllAnnouncements] = useState<Announcement[]>([])
// // //   const [todayMood, setTodayMood] = useState<MoodData | null>(null)
// // //   const [isEmergencyActive, setIsEmergencyActive] = useState(false)
// // //   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null) // Live location state
// // //   const [loading, setLoading] = useState(true)
// // //   const [showHospitalInfo, setShowHospitalInfo] = useState(false)
// // //   const [currentAlert, setCurrentAlert] = useState<EmergencyAlert | null>(null)
// // //   const [showAlertNotification, setShowAlertNotification] = useState(false)
// // //   const [alertTimer, setAlertTimer] = useState<NodeJS.Timeout | null>(null)
// // //   const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
// // //   const [emergencyButtonDisabled, setEmergencyButtonDisabled] = useState(false)
// // //   const [alertStatus, setAlertStatus] = useState<string | null>(null)
// // //   const [lastAlertCheck, setLastAlertCheck] = useState<Date>(new Date())
// // //   const [currentAssessment, setCurrentAssessment] = useState<string | null>(null)
// // //   const [assessmentResult, setAssessmentResult] = useState<any>(null)
// // //   const [assessmentType, setAssessmentType] = useState<string>("")
// // //   const [unreadAnnouncementsCount, setUnreadAnnouncementsCount] = useState(0)
// // //   const [showLocationPrompt, setShowLocationPrompt] = useState(false) // New state for location prompt
// // //   const [escalationCount, setEscalationCount] = useState(0) // Track escalation attempts

// // //   // Mood tracking state
// // //   const [currentMood, setCurrentMood] = useState(5)
// // //   const [currentEnergy, setCurrentEnergy] = useState(5)
// // //   const [currentAnxiety, setCurrentAnxiety] = useState(5)
// // //   const [currentSleep, setCurrentSleep] = useState(8)
// // //   const [moodNotes, setMoodNotes] = useState("")

// // //   // Emergency form state
// // //   const [emergencyForm, setEmergencyForm] = useState({
// // //     message: "",
// // //     priority: "high",
// // //   })

// // //   // Helper to update location in DB
// // //   const updateLocationInDB = async (newLocation: { lat: number; lng: number }) => {
// // //     try {
// // //       const response = await fetch("/api/user/profile/update-location", {
// // //         method: "PUT",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ lat: newLocation.lat, lng: newLocation.lng }),
// // //       })
// // //       if (!response.ok) {
// // //         console.error("Failed to update location in DB")
// // //       }
// // //     } catch (error) {
// // //       console.error("Error updating location in DB:", error)
// // //     }
// // //   }

// // //   // Function to request location and handle prompt
// // //   const handleLocationRequest = async () => {
// // //     return new Promise<boolean>((resolve) => {
// // //       if (navigator.geolocation) {
// // //         navigator.geolocation.getCurrentPosition(
// // //           async (position) => {
// // //             const newLocation = {
// // //               lat: position.coords.latitude,
// // //               lng: position.coords.longitude,
// // //             }
// // //             setLocation(newLocation)
// // //             await updateLocationInDB(newLocation)
// // //             resolve(true) // Location granted and saved
// // //           },
// // //           (error) => {
// // //             if (error.code === error.PERMISSION_DENIED) {
// // //               setShowLocationPrompt(true) // Show the custom prompt
// // //               resolve(false) // Location denied, prompt shown
// // //             } else {
// // //               toast.error("Location access denied or error. Emergency alerts will use your registered address.")
// // //               resolve(false) // Other error, proceed without live location
// // //             }
// // //           },
// // //           { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }, // Request fresh location
// // //         )
// // //       } else {
// // //         toast.error("Geolocation not supported by this browser. Emergency alerts will use your registered address.")
// // //         resolve(false) // Not supported
// // //       }
// // //     })
// // //   }

// // //   useEffect(() => {
// // //     const initDashboard = async () => {
// // //       setLoading(true)
// // //       // Attempt to get live location and update DB
// // //       await handleLocationRequest()
// // //       // Then fetch all dashboard data, which will include the updated user profile
// // //       await fetchDashboardData()
// // //       setLoading(false) // Set loading to false after all data is fetched
// // //     }

// // //     initDashboard()

// // //     // Polling for alerts (existing logic)
// // //     const interval = setInterval(() => {
// // //       if (currentAlert?._id) {
// // //         checkAlertStatus(currentAlert._id)
// // //       }
// // //     }, 10000)
// // //     return () => clearInterval(interval)
// // //   }, [currentAlert?._id]) // Dependency for polling

// // //   const fetchDashboardData = async () => {
// // //     try {
// // //       const [moodRes, alertsRes, postsRes, hospitalsRes, announcementsRes, userProfileRes] = await Promise.all([
// // //         fetch("/api/user/mood-data"),
// // //         fetch("/api/user/emergency-alerts"),
// // //         fetch("/api/posts"),
// // //         fetch("/api/user/hospitals"),
// // //         fetch("/api/announcements/mentions"), // Fetch all announcements for user, including mentions
// // //         fetch("/api/user/profile"), // Fetch user profile
// // //       ])

// // //       if (moodRes.ok) {
// // //         const moodData = await moodRes.json()
// // //         setMoodData(moodData.data || [])
// // //         setTodayMood(moodData.today || null)
// // //       }
// // //       if (alertsRes.ok) {
// // //         const alertsData = await alertsRes.json()
// // //         setEmergencyAlerts(alertsData.data || [])
// // //         const pendingAlerts =
// // //           alertsData.data?.filter((alert: EmergencyAlert) => alert.status === "pending" && !alert.acceptedBy) || []
// // //         if (pendingAlerts.length > 0) {
// // //           setCurrentAlert(pendingAlerts[0])
// // //           setEmergencyButtonDisabled(true)
// // //         } else {
// // //           setCurrentAlert(null) // Clear current alert if no pending ones
// // //           setEmergencyButtonDisabled(false)
// // //         }
// // //       }
// // //       if (postsRes.ok) {
// // //         const postsData = await postsRes.json()
// // //         setAllPosts(postsData.data || [])
// // //       }
// // //       if (hospitalsRes.ok) {
// // //         const hospitalsData = await hospitalsRes.json()
// // //         setHospitals(hospitalsData.data || [])
// // //       }
// // //       if (announcementsRes.ok) {
// // //         const announcementsData = await announcementsRes.json()
// // //         // Calculate isRead status on the client side based on user.userId
// // //         const processedAnnouncements =
// // //           announcementsData.data?.map((ann: Announcement) => ({
// // //             ...ann,
// // //             isRead: ann.readBy.includes(user?.userId || ""), // Check if current user's ID is in readBy
// // //           })) || []
// // //         setAllAnnouncements(processedAnnouncements)
// // //         // Calculate unread count for the current user
// // //         const unreadCount = processedAnnouncements.filter((ann: Announcement) => !ann.isRead).length || 0
// // //         setUnreadAnnouncementsCount(unreadCount)
// // //       }
// // //       if (userProfileRes.ok) {
// // //         const userProfileData = await userProfileRes.json()
// // //         if (userProfileData.user) {
// // //           setUserProfile(userProfileData.user)
// // //           // Initialize live location state from DB if available
// // //           if (userProfileData.user.address?.geoLocation?.lat && userProfileData.user.address?.geoLocation?.lng) {
// // //             setLocation({
// // //               lat: userProfileData.user.address.geoLocation.lat,
// // //               lng: userProfileData.user.address.geoLocation.lng,
// // //             })
// // //           }
// // //         }
// // //       }
// // //     } catch (error) {
// // //       console.error("Error fetching dashboard data:", error)
// // //     } finally {
// // //       // setLoading(false) // Moved to initDashboard
// // //     }
// // //   }

// // //   const checkAlertStatus = async (alertId: string) => {
// // //     try {
// // //       const response = await fetch("/api/user/check-alert-status", {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //         },
// // //         credentials: "include", // to send cookies
// // //         body: JSON.stringify({ alertId }), // 👈 send the required alertId
// // //       })
// // //       const data = await response.json()
// // //       if (response.ok) {
// // //         setAlertStatus(data.alert.status)
// // //         setEmergencyButtonDisabled(data.alert.status === "active")
// // //         setLastAlertCheck(new Date())

// // //         if (data.alert.status === "accepted" && data.alert.acceptedBy) {
// // //           toast.success(`🏥 ${data.alert.acceptedBy.name} is coming to help!`, { duration: 8000 })
// // //           setShowAlertNotification(false) // Dismiss notification if accepted
// // //           setEscalationCount(0) // Reset escalation count
// // //         } else if (data.alert.status === "pending") {
// // //           // Handle escalation messages
// // //           if (data.escalationOccurred) {
// // //             setEscalationCount((prev) => prev + 1)
// // //             toast.info(
// // //               `⏳ Still finding help. Escalating alert to more hospitals... (Attempt ${escalationCount + 1})`,
// // //               {
// // //                 duration: 5000,
// // //               },
// // //             )
// // //           } else if (data.noMoreHospitalsFound) {
// // //             setShowAlertNotification(true) // Show persistent notification
// // //             toast.error(
// // //               "🚨 No more hospitals found within 100km to handle the situation. Please call emergency services directly!",
// // //               {
// // //                 duration: 15000,
// // //               },
// // //             )
// // //           } else {
// // //             // Initial pending state or waiting for first escalation
// // //             toast.info("⏳ Your emergency alert is pending. Searching for nearby hospitals...", { duration: 3000 })
// // //           }
// // //         }
// // //       } else {
// // //         console.error("API error:", data.message)
// // //       }
// // //     } catch (error) {
// // //       console.error("Error checking alert status:", error)
// // //     }
// // //   }

// // //   const startAlertMonitoring = (alertId: string) => {
// // //     // This client-side function now primarily triggers the initial check
// // //     // and relies on the backend's check-alert-status for escalation logic and messages.
// // //     // The interval in useEffect will repeatedly call checkAlertStatus.
// // //     setEscalationCount(0) // Reset count for new alert
// // //     setShowAlertNotification(false) // Hide initial notification until backend signals escalation
// // //     toast.info("⏳ Your emergency alert is pending. Searching for nearby hospitals...", { duration: 3000 })
// // //   }

// // //   const handleEmergencySOS = async () => {
// // //     if (isEmergencyActive || emergencyButtonDisabled) return
// // //     setIsEmergencyActive(true)
// // //     setEmergencyButtonDisabled(true)
// // //     // Use the current live location if available, otherwise rely on registered address (handled by backend)
// // //     await sendQuickEmergencyAlert(location)
// // //   }

// // //   const sendQuickEmergencyAlert = async (currentLocation: { lat: number; lng: number } | null) => {
// // //     try {
// // //       const response = await fetch("/api/user/emergency-alert", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           location: currentLocation ? { lat: currentLocation.lat, lng: currentLocation.lng } : undefined, // Send current live location if available
// // //           message: "🚨 EMERGENCY SOS - Immediate assistance needed!",
// // //           priority: "critical",
// // //         }),
// // //       })
// // //       const data = await response.json()
// // //       if (response.ok) {
// // //         toast.success(`🚨 Emergency alert sent! User: ${data.userInfo.name} | Phone: ${data.userInfo.phone}`)
// // //         toast.success("🏥 Searching for nearby hospitals... Please wait!")
// // //         setCurrentAlert({ ...currentAlert, _id: data.alertId, status: "pending" }) // Set current alert to trigger polling
// // //         setEmergencyButtonDisabled(true)
// // //         startAlertMonitoring(data.alertId) // Start client-side monitoring
// // //         setIsEmergencyActive(false)
// // //       } else {
// // //         toast.error(data.message || "Failed to send emergency alert")
// // //         setIsEmergencyActive(false)
// // //         setEmergencyButtonDisabled(false)
// // //       }
// // //     } catch (error) {
// // //       console.error("Emergency alert error:", error)
// // //       toast.error("Emergency system error. Please try again.")
// // //       setIsEmergencyActive(false)
// // //       setEmergencyButtonDisabled(false)
// // //     }
// // //   }

// // //   const handleFormEmergencyAlert = async () => {
// // //     if (!emergencyForm.message.trim()) {
// // //       toast.error("Please describe your emergency")
// // //       return
// // //     }
// // //     setIsEmergencyActive(true)
// // //     try {
// // //       const position = await new Promise<GeolocationPosition>((resolve, reject) => {
// // //         navigator.geolocation.getCurrentPosition(resolve, reject, {
// // //           enableHighAccuracy: true,
// // //           timeout: 10000,
// // //           maximumAge: 60000,
// // //         })
// // //       })
// // //       const response = await fetch("/api/user/emergency-alert", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           message: emergencyForm.message,
// // //           priority: emergencyForm.priority,
// // //           location: {
// // //             lat: position.coords.latitude,
// // //             lng: position.coords.longitude,
// // //           },
// // //         }),
// // //       })
// // //       const data = await response.json()
// // //       if (response.ok) {
// // //         toast.success("🚨 Emergency alert sent to nearby hospitals!")
// // //         setEmergencyForm({ message: "", priority: "high" })
// // //         setEmergencyButtonDisabled(true)
// // //         setAlertStatus("pending")
// // //         setCurrentAlert({ ...currentAlert, _id: data.alertId, status: "pending" }) // Set current alert to trigger polling
// // //         startAlertMonitoring(data.alertId) // Start client-side monitoring
// // //         window.addEventListener("beforeunload", (e) => {
// // //           e.preventDefault()
// // //           e.returnValue = ""
// // //         })
// // //       } else {
// // //         toast.error(data.message || "Failed to send emergency alert")
// // //       }
// // //     } catch (error) {
// // //       console.error("Error sending emergency alert:", error)
// // //       if (error instanceof GeolocationPositionError) {
// // //         toast.error("Location access required for emergency alerts")
// // //       } else {
// // //         toast.error("Failed to send emergency alert")
// // //       }
// // //     } finally {
// // //       setIsEmergencyActive(false)
// // //     }
// // //   }

// // //   const dismissAlert = async () => {
// // //     if (!currentAlert) return
// // //     try {
// // //       const response = await fetch("/api/user/dismiss-alert", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ alertId: currentAlert._id }),
// // //       })
// // //       if (response.ok) {
// // //         setShowAlertNotification(false)
// // //         setCurrentAlert(null)
// // //         setEmergencyButtonDisabled(false)
// // //         setAlertStatus(null) // Clear alert status
// // //         setEscalationCount(0) // Reset escalation count
// // //         if (alertTimer) {
// // //           clearTimeout(alertTimer)
// // //           setAlertTimer(null)
// // //         }
// // //         toast.success("Alert dismissed")
// // //         fetchDashboardData()
// // //         window.removeEventListener("beforeunload", () => {})
// // //       }
// // //     } catch (error) {
// // //       console.error("Error dismissing alert:", error)
// // //       toast.error("Failed to dismiss alert")
// // //     }
// // //   }

// // //   const handleDeleteAlert = async (alertId: string) => {
// // //     const confirmed = window.confirm(
// // //       "⚠️ Are you sure you want to delete this emergency alert? This action cannot be undone.",
// // //     )
// // //     if (!confirmed) return
// // //     try {
// // //       const response = await fetch("/api/user/emergency-alerts/delete", {
// // //         method: "DELETE",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ alertId }),
// // //       })
// // //       if (response.ok) {
// // //         toast.success("✅ Emergency alert deleted successfully")
// // //         fetchDashboardData()
// // //       } else {
// // //         toast.error("Failed to delete alert")
// // //       }
// // //     } catch (error) {
// // //       toast.error("Error deleting alert")
// // //     }
// // //   }

// // //   const saveMoodEntry = async () => {
// // //     try {
// // //       const response = await fetch("/api/user/mood-entry", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({
// // //           mood: currentMood,
// // //           energy: currentEnergy,
// // //           anxiety: currentAnxiety,
// // //           sleep: currentSleep,
// // //           notes: moodNotes,
// // //         }),
// // //       })
// // //       if (response.ok) {
// // //         toast.success("✅ Mood entry saved!")
// // //         fetchDashboardData()
// // //         setMoodNotes("")
// // //       } else {
// // //         toast.error("Failed to save mood entry")
// // //       }
// // //     } catch (error) {
// // //       toast.error("Error saving mood entry")
// // //     }
// // //   }

// // //   const handleMarkAnnouncementRead = async (announcementId: string) => {
// // //     try {
// // //       const response = await fetch("/api/announcements/mark-read", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ announcementId }),
// // //       })
// // //       if (response.ok) {
// // //         toast.success("Announcement marked as read.")
// // //         fetchDashboardData() // Re-fetch to update read status and notification count
// // //       } else {
// // //         toast.error("Failed to mark announcement as read.")
// // //       }
// // //     } catch (error) {
// // //       toast.error("Error marking announcement as read.")
// // //     }
// // //   }

// // //   const getMoodIcon = (mood: number) => {
// // //     if (mood >= 8) return <Smile className="w-6 h-6 text-green-500" />
// // //     if (mood >= 6) return <Meh className="w-6 h-6 text-yellow-500" />
// // //     return <Frown className="w-6 h-6 text-red-500" />
// // //   }

// // //   const getMoodColor = (mood: number) => {
// // //     if (mood >= 8) return "text-green-600"
// // //     if (mood >= 6) return "text-yellow-600"
// // //     return "text-red-600"
// // //   }

// // //   const getWellnessScore = () => {
// // //     if (!todayMood) return 0
// // //     const score = (todayMood.mood + todayMood.energy + (10 - todayMood.anxiety) + Math.min(todayMood.sleep, 8)) / 4
// // //     return Math.round(score * 10)
// // //   }

// // //   const getWeeklyAverage = () => {
// // //     if (moodData.length === 0) return 0
// // //     const recentData = moodData.slice(-7)
// // //     const avgMood = recentData.reduce((sum, entry) => sum + entry.mood, 0) / recentData.length
// // //     return Math.round(avgMood * 10) / 10
// // //   }

// // //   const formatTimeAgo = (dateString: string) => {
// // //     const now = new Date()
// // //     const alertTime = new Date(dateString)
// // //     const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60))
// // //     if (diffInMinutes < 1) return "Just now"
// // //     if (diffInMinutes < 60) return `${diffInMinutes}m ago`
// // //     const diffInHours = Math.floor(diffInMinutes / 60)
// // //     if (diffInHours < 24) return `${diffInHours}h ago`
// // //     return alertTime.toLocaleDateString()
// // //   }

// // //   const getPriorityColor = (priority: string) => {
// // //     switch (priority) {
// // //       case "critical":
// // //         return "bg-red-500 text-white"
// // //       case "high":
// // //         return "bg-orange-500 text-white"
// // //       case "medium":
// // //         return "bg-yellow-500 text-black"
// // //       default:
// // //         return "bg-gray-500 text-white"
// // //     }
// // //   }

// // //   const getStatusColor = (status: string) => {
// // //     switch (status) {
// // //       case "pending":
// // //         return "bg-yellow-500 text-white"
// // //       case "accepted":
// // //         return "bg-green-500 text-white"
// // //       case "declined":
// // //         return "bg-red-500 text-white"
// // //       default:
// // //         return "bg-gray-500 text-white"
// // //     }
// // //   }

// // //   const formatLocationAddress = (address: any) => {
// // //     if (!address) return "Location not available"
// // //     const parts = [
// // //       address.area,
// // //       address.village || address.townOrVillage,
// // //       address.subDistrict || address.taluka,
// // //       address.district,
// // //       address.state || "Gujarat",
// // //       address.pincode,
// // //     ].filter(Boolean)
// // //     return parts.join(", ")
// // //   }

// // //   const openGoogleMaps = (address: any) => {
// // //     if (!address) {
// // //       toast.error("Location not available")
// // //       return
// // //     }
// // //     const searchQuery = formatLocationAddress(address)
// // //     const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
// // //     window.open(googleMapsUrl, "_blank")
// // //     toast.success("🗺️ Opening location in Google Maps...")
// // //   }

// // //   const getAuthorIcon = (authorType: string) => {
// // //     return authorType === "Doctor" ? (
// // //       <Stethoscope className="w-5 h-5 text-green-600" />
// // //     ) : (
// // //       <Building2 className="w-5 h-5 text-purple-600" />
// // //     )
// // //   }

// // //   const getAuthorBadgeColor = (authorType: string) => {
// // //     return authorType === "Doctor"
// // //       ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
// // //       : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
// // //   }

// // //   if (loading) {
// // //     return (
// // //       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
// // //         <div className="text-center">
// // //           <motion.div
// // //             className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
// // //             animate={{ rotate: 360 }}
// // //             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// // //           />
// // //           <p className="text-gray-600 dark:text-gray-400 text-lg">Loading your wellness dashboard...</p>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
// // //       {/* Location Prompt Dialog */}
// // //       <Dialog open={showLocationPrompt} onOpenChange={setShowLocationPrompt}>
// // //         <DialogContent className="max-w-md">
// // //           <DialogHeader>
// // //             <DialogTitle className="flex items-center space-x-2">
// // //               <MapPin className="w-5 h-5 text-blue-500" />
// // //               <span>Your Location Is Safe With Us</span>
// // //             </DialogTitle>
// // //           </DialogHeader>
// // //           <div className="space-y-4 text-gray-700 dark:text-gray-300">
// // //             <p>To connect you with the nearest hospital quickly during emergencies, we need your live location.</p>
// // //             <ul className="list-disc list-inside space-y-1">
// // //               <li>{"✅ We do not store your location permanently"}</li>
// // //               <li>{"✅ We never share it with anyone else"}</li>
// // //               <li>{"✅ It's used only to find nearby help in real-time"}</li>
// // //             </ul>
// // //             <p className="font-semibold">This is only for your safety — your privacy is 100% protected.</p>
// // //             <p className="text-blue-600 dark:text-blue-400 font-medium">
// // //               👉 Please tap “Allow” when your browser asks for permission.
// // //             </p>
// // //           </div>
// // //           <div className="flex justify-end space-x-2 mt-4">
// // //             <Button
// // //               variant="outline"
// // //               onClick={() => {
// // //                 setShowLocationPrompt(false)
// // //                 // User chose to proceed without live location, dashboard already loaded with existing data
// // //               }}
// // //             >
// // //               Proceed Without Location
// // //             </Button>
// // //             <Button
// // //               onClick={async () => {
// // //                 setShowLocationPrompt(false) // Close prompt
// // //                 setLoading(true) // Show loading again while re-fetching
// // //                 await handleLocationRequest() // Retry requesting location
// // //                 await fetchDashboardData() // Re-fetch dashboard data after location attempt
// // //                 setLoading(false) // Hide loading
// // //               }}
// // //             >
// // //               Allow Location
// // //             </Button>
// // //           </div>
// // //         </DialogContent>
// // //       </Dialog>

// // //       {/* Emergency Alert Notification */}
// // //       <AnimatePresence>
// // //         {showAlertNotification && currentAlert && (
// // //           <motion.div
// // //             initial={{ opacity: 0, y: -100 }}
// // //             animate={{ opacity: 1, y: 0 }}
// // //             exit={{ opacity: 0, y: -100 }}
// // //             className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
// // //           >
// // //             <Alert className="border-red-500 bg-red-50 dark:bg-red-900/20">
// // //               <AlertTriangle className="h-4 w-4 text-red-600" />
// // //               <AlertDescription className="flex items-center justify-between">
// // //                 <div>
// // //                   <p className="font-semibold text-red-800 dark:text-red-200">🚨 HIGH ALERT: No Hospital Response</p>
// // //                   <p className="text-red-700 dark:text-red-300 text-sm">
// // //                     Your emergency alert is still pending. Consider calling emergency services directly.
// // //                   </p>
// // //                   {currentAlert && (
// // //                     <p className="text-xs text-red-600 dark:text-red-400 mt-1">
// // //                       User: {currentAlert.userInfo?.name || userProfile?.name || "Unknown"} | Phone:{" "}
// // //                       {currentAlert.userInfo?.phone || userProfile?.phone || "Unknown"}
// // //                     </p>
// // //                   )}
// // //                 </div>
// // //                 <Button variant="ghost" size="sm" onClick={dismissAlert} className="text-red-600 hover:text-red-800">
// // //                   <CheckCircle className="w-4 h-4" />
// // //                 </Button>
// // //               </AlertDescription>
// // //             </Alert>
// // //           </motion.div>
// // //         )}
// // //       </AnimatePresence>
// // //       {/* Header with Animated Icons */}
// // //       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
// // //         <AnimatedHealthIcons />
// // //         <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
// // //           <div className="flex items-center space-x-4">
// // //             <motion.div
// // //               className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg"
// // //               animate={{
// // //                 scale: [1, 1.1, 1],
// // //                 rotate: [0, 5, -5, 0],
// // //               }}
// // //               transition={{
// // //                 duration: 3,
// // //                 repeat: Number.POSITIVE_INFINITY,
// // //                 ease: "easeInOut",
// // //               }}
// // //             >
// // //               <Heart className="w-6 h-6 text-white" />
// // //             </motion.div>
// // //             <div>
// // //               <h1 className="text-xl font-bold text-gray-900 dark:text-white">RuralReach</h1>
// // //               <p className="text-sm text-gray-600 dark:text-gray-400">Your Wellness Dashboard</p>
// // //             </div>
// // //           </div>
// // //           <div className="flex items-center space-x-4">
// // //             {/* Hospital Info Button */}
// // //             <Dialog open={showHospitalInfo} onOpenChange={setShowHospitalInfo}>
// // //               <DialogTrigger asChild>
// // //                 <motion.button
// // //                   whileHover={{ scale: 1.05 }}
// // //                   whileTap={{ scale: 0.95 }}
// // //                   className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
// // //                 >
// // //                   <Building2 className="w-4 h-4" />
// // //                   <span className="text-sm font-medium">Hospital Info</span>
// // //                 </motion.button>
// // //               </DialogTrigger>
// // //               <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
// // //                 <DialogHeader>
// // //                   <DialogTitle className="flex items-center space-x-2">
// // //                     <Building2 className="w-5 h-5 text-purple-600" />
// // //                     <span>Connected Hospitals</span>
// // //                   </DialogTitle>
// // //                 </DialogHeader>
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
// // //                   {hospitals.map((hospital) => (
// // //                     <motion.div
// // //                       key={hospital._id}
// // //                       initial={{ opacity: 0, y: 20 }}
// // //                       animate={{ opacity: 1, y: 0 }}
// // //                       className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
// // //                     >
// // //                       <div className="flex items-start justify-between mb-3">
// // //                         <div className="flex items-center space-x-2">
// // //                           <Building2 className="w-5 h-5 text-purple-600" />
// // //                           <h3 className="font-semibold text-lg">{hospital.name}</h3>
// // //                           {hospital.isVerified && <Award className="w-4 h-4 text-green-500" />}
// // //                         </div>
// // //                         <div className="flex items-center space-x-2">
// // //                           <Badge variant={hospital.isAvailable ? "default" : "secondary"}>
// // //                             {hospital.isAvailable ? "Available" : "Unavailable"}
// // //                           </Badge>
// // //                           {hospital.isHandleEmergency && (
// // //                             <Badge variant="destructive" className="text-xs">
// // //                               Emergency 24/7
// // //                             </Badge>
// // //                           )}
// // //                         </div>
// // //                       </div>
// // //                       <div className="space-y-2 text-sm">
// // //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// // //                           <Mail className="w-4 h-4" />
// // //                           <span>{hospital.email}</span>
// // //                         </div>
// // //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// // //                           <Phone className="w-4 h-4" />
// // //                           <span>{hospital.phone}</span>
// // //                         </div>
// // //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// // //                           <MapPin className="w-4 h-4" />
// // //                           <span>{hospital.address}</span>
// // //                         </div>
// // //                       </div>
// // //                       <div className="mt-3">
// // //                         <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties:</p>
// // //                         <div className="flex flex-wrap gap-1">
// // //                           {hospital.specialties.map((specialty, index) => (
// // //                             <Badge key={index} variant="outline" className="text-xs">
// // //                               {specialty}
// // //                             </Badge>
// // //                           ))}
// // //                         </div>
// // //                       </div>
// // //                       <div className="mt-3 pt-3 border-t">
// // //                         <p className="text-xs text-gray-500">
// // //                           Joined: {new Date(hospital.createdAt).toLocaleDateString()}
// // //                         </p>
// // //                       </div>
// // //                     </motion.div>
// // //                   ))}
// // //                 </div>
// // //               </DialogContent>
// // //             </Dialog>
// // //             <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
// // //               <Clock className="w-4 h-4" />
// // //               <span>Last checked: {lastAlertCheck.toLocaleTimeString()}</span>
// // //             </div>
// // //             <Button
// // //               variant="outline"
// // //               size="sm"
// // //               onClick={() => currentAlert?._id && checkAlertStatus(currentAlert._id)} // Pass alertId if available
// // //               className="flex items-center space-x-2 bg-transparent"
// // //             >
// // //               <RefreshCw className="w-4 h-4" />
// // //               <span>Refresh</span>
// // //             </Button>
// // //             <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// // //               <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
// // //               {unreadAnnouncementsCount > 0 && (
// // //                 <motion.span
// // //                   className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
// // //                   animate={{ scale: [1, 1.2, 1] }}
// // //                   transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
// // //                 >
// // //                   {unreadAnnouncementsCount}
// // //                 </motion.span>
// // //               )}
// // //             </motion.div>
// // //             <ThemeToggle />
// // //             <UserDropdown />
// // //           </div>
// // //         </div>
// // //       </header>
// // //       <div className="container mx-auto px-6 py-8">
// // //         {/* Welcome Section */}
// // //         <motion.div
// // //           className="mb-8"
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.6 }}
// // //         >
// // //           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user?.name}! 👋</h2>
// // //           <p className="text-gray-600 dark:text-gray-400">
// // //             How are you feeling today? Let's track your wellness journey and stay healthy together.
// // //           </p>
// // //         </motion.div>
// // //         {/* Emergency SOS Button - Always Available */}
// // //         <motion.div
// // //           className="mb-8"
// // //           initial={{ opacity: 0, scale: 0.9 }}
// // //           animate={{ opacity: 1, scale: 1 }}
// // //           transition={{ duration: 0.6, delay: 0.1 }}
// // //         >
// // //           <Card className="border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
// // //             <CardContent className="p-6">
// // //               <div className="flex items-center justify-between">
// // //                 <div className="flex items-center space-x-4">
// // //                   <motion.div
// // //                     className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
// // //                     animate={{
// // //                       boxShadow: [
// // //                         "0 0 0 0 rgba(239, 68, 68, 0.7)",
// // //                         "0 0 0 10px rgba(239, 68, 68, 0)",
// // //                         "0 0 0 0 rgba(239, 68, 68, 0)",
// // //                       ],
// // //                     }}
// // //                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// // //                   >
// // //                     <AlertTriangle className="w-6 h-6 text-white" />
// // //                   </motion.div>
// // //                   <div>
// // //                     <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Quick Emergency Support</h3>
// // //                     <p className="text-red-600 dark:text-red-300">Need immediate help? Press for instant alert</p>
// // //                     {userProfile?.address?.geoLocation?.lat && userProfile?.address?.geoLocation?.lng ? (
// // //                       <p className="text-xs text-red-500 dark:text-red-400 mt-1">
// // //                         📍 Location: {userProfile.address.geoLocation.lat.toFixed(4)},{" "}
// // //                         {userProfile.address.geoLocation.lng.toFixed(4)} (from profile)
// // //                       </p>
// // //                     ) : location ? (
// // //                       <p className="text-xs text-red-500 dark:text-red-400 mt-1">
// // //                         📍 Live Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)} (current session)
// // //                       </p>
// // //                     ) : (
// // //                       <p className="text-xs text-red-500 dark:text-red-400 mt-1">
// // //                         📍 Location: Not available (please enable location services or reload the page)
// // //                       </p>
// // //                     )}
// // //                     {emergencyButtonDisabled && (
// // //                       <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
// // //                         ⚠️ Emergency alert already sent. Waiting for hospital response...
// // //                       </p>
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //                 <motion.div
// // //                   whileHover={{ scale: emergencyButtonDisabled ? 1 : 1.05 }}
// // //                   whileTap={{ scale: emergencyButtonDisabled ? 1 : 0.95 }}
// // //                 >
// // //                   <Button
// // //                     onClick={handleEmergencySOS}
// // //                     disabled={isEmergencyActive || emergencyButtonDisabled}
// // //                     className={`font-bold px-8 py-3 text-lg shadow-lg transition-all duration-300 ${
// // //                       emergencyButtonDisabled
// // //                         ? "bg-gray-400 cursor-not-allowed"
// // //                         : "bg-red-600 hover:bg-red-700 hover:shadow-xl"
// // //                     } text-white`}
// // //                   >
// // //                     {isEmergencyActive
// // //                       ? "🚨 Sending..."
// // //                       : emergencyButtonDisabled
// // //                         ? "🚨 Alert Sent"
// // //                         : "🆘 SOS Emergency"}
// // //                   </Button>
// // //                 </motion.div>
// // //               </div>
// // //             </CardContent>
// // //           </Card>
// // //         </motion.div>
// // //         {/* Emergency Status Banner */}
// // //         {alertStatus && (
// // //           <motion.div
// // //             className="mb-8"
// // //             initial={{ opacity: 0, scale: 0.9 }}
// // //             animate={{ opacity: 1, scale: 1 }}
// // //             transition={{ duration: 0.6, delay: 0.1 }}
// // //           >
// // //             <Card
// // //               className={`border-2 ${
// // //                 alertStatus === "pending"
// // //                   ? "border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
// // //                   : alertStatus === "accepted"
// // //                     ? "border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
// // //                     : "border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20"
// // //               }`}
// // //             >
// // //               <CardContent className="p-6">
// // //                 <div className="flex items-center justify-between">
// // //                   <div className="flex items-center space-x-4">
// // //                     <motion.div
// // //                       className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
// // //                         alertStatus === "pending"
// // //                           ? "bg-yellow-500"
// // //                           : alertStatus === "accepted"
// // //                             ? "bg-green-500"
// // //                             : "bg-red-500"
// // //                       }`}
// // //                       animate={{
// // //                         boxShadow:
// // //                           alertStatus === "pending"
// // //                             ? [
// // //                                 "0 0 0 0 rgba(234, 179, 8, 0.7)",
// // //                                 "0 0 0 10px rgba(234, 179, 8, 0)",
// // //                                 "0 0 0 0 rgba(234, 179, 8, 0)",
// // //                               ]
// // //                             : undefined,
// // //                       }}
// // //                       transition={{ duration: 2, repeat: alertStatus === "pending" ? Number.POSITIVE_INFINITY : 0 }}
// // //                     >
// // //                       {alertStatus === "pending" ? (
// // //                         <Timer className="w-6 h-6 text-white" />
// // //                       ) : alertStatus === "accepted" ? (
// // //                         <CheckCircle className="w-6 h-6 text-white" />
// // //                       ) : (
// // //                         <XCircle className="w-6 h-6 text-white" />
// // //                       )}
// // //                     </motion.div>
// // //                     <div>
// // //                       <h3
// // //                         className={`text-lg font-semibold ${
// // //                           alertStatus === "pending"
// // //                             ? "text-yellow-800 dark:text-yellow-200"
// // //                             : alertStatus === "accepted"
// // //                               ? "text-green-800 dark:text-green-200"
// // //                               : "text-red-800 dark:text-red-200"
// // //                         }`}
// // //                       >
// // //                         {alertStatus === "pending" && "🚨 Emergency Alert Sent"}
// // //                         {alertStatus === "accepted" && "✅ Hospital is Coming!"}
// // //                         {alertStatus === "declined" && "❌ Alert Declined"}
// // //                       </h3>
// // //                       <p
// // //                         className={`${
// // //                           alertStatus === "pending"
// // //                             ? "text-yellow-600 dark:text-yellow-300"
// // //                             : alertStatus === "accepted"
// // //                               ? "text-green-600 dark:text-green-300"
// // //                               : "text-red-600 dark:text-red-300"
// // //                         }`}
// // //                       >
// // //                         {alertStatus === "pending" && "Waiting for hospital response..."}
// // //                         {alertStatus === "accepted" && "A hospital has accepted your emergency request"}
// // //                         {alertStatus === "declined" && "Your emergency request was declined"}
// // //                       </p>
// // //                     </div>
// // //                   </div>
// // //                   <Button onClick={dismissAlert} variant="outline" className="font-bold px-6 py-2 bg-transparent">
// // //                     Dismiss
// // //                   </Button>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </motion.div>
// // //         )}
// // //         {/* Quick Stats */}
// // //         <motion.div
// // //           className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.6, delay: 0.2 }}
// // //         >
// // //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// // //             <Card className="hover:shadow-lg transition-all duration-300">
// // //               <CardContent className="p-6">
// // //                 <div className="flex items-center justify-between">
// // //                   <div>
// // //                     <p className="text-sm text-gray-600 dark:text-gray-400">Wellness Score</p>
// // //                     <p className="text-2xl font-bold text-blue-600">{getWellnessScore()}%</p>
// // //                     <p className="text-xs text-gray-500 mt-1">Based on today's data</p>
// // //                   </div>
// // //                   <motion.div
// // //                     className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
// // //                     animate={{ rotate: [0, 360] }}
// // //                     transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// // //                   >
// // //                     <Target className="w-6 h-6 text-blue-600" />
// // //                   </motion.div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </motion.div>
// // //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// // //             <Card className="hover:shadow-lg transition-all duration-300">
// // //               <CardContent className="p-6">
// // //                 <div className="flex items-center justify-between">
// // //                   <div>
// // //                     <p className="text-sm text-gray-600 dark:text-gray-400">Today's Mood</p>
// // //                     <div className="flex items-center space-x-2">
// // //                       {todayMood ? getMoodIcon(todayMood.mood) : <Meh className="w-6 h-6 text-gray-400" />}
// // //                       <span
// // //                         className={`text-lg font-semibold ${todayMood ? getMoodColor(todayMood.mood) : "text-gray-400"}`}
// // //                       >
// // //                         {todayMood?.mood || "Not set"}
// // //                       </span>
// // //                     </div>
// // //                     <p className="text-xs text-gray-500 mt-1">Out of 10</p>
// // //                   </div>
// // //                   <motion.div
// // //                     className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
// // //                     animate={{
// // //                       scale: [1, 1.1, 1],
// // //                       rotate: [0, 10, -10, 0],
// // //                     }}
// // //                     transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
// // //                   >
// // //                     <Brain className="w-6 h-6 text-green-600" />
// // //                   </motion.div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </motion.div>
// // //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// // //             <Card className="hover:shadow-lg transition-all duration-300">
// // //               <CardContent className="p-6">
// // //                 <div className="flex items-center justify-between">
// // //                   <div>
// // //                     <p className="text-sm text-gray-600 dark:text-gray-400">Sleep Last Night</p>
// // //                     <p className="text-2xl font-bold text-purple-600">{todayMood?.sleep || 0}h</p>
// // //                     <p className="text-xs text-gray-500 mt-1">
// // //                       {(todayMood?.sleep || 0) >= 7 ? "Good sleep!" : "Need more rest"}
// // //                     </p>
// // //                   </div>
// // //                   <motion.div
// // //                     className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
// // //                     animate={{
// // //                       y: [0, -5, 0],
// // //                       opacity: [1, 0.7, 1],
// // //                     }}
// // //                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
// // //                   >
// // //                     <Moon className="w-6 h-6 text-purple-600" />
// // //                   </motion.div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </motion.div>
// // //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// // //             <Card className="hover:shadow-lg transition-all duration-300">
// // //               <CardContent className="p-6">
// // //                 <div className="flex items-center justify-between">
// // //                   <div>
// // //                     <p className="text-sm text-gray-600 dark:text-gray-400">Energy Level</p>
// // //                     <p className="text-2xl font-bold text-orange-600">{todayMood?.energy || 0}/10</p>
// // //                     <p className="text-xs text-gray-500 mt-1">Weekly avg: {getWeeklyAverage()}</p>
// // //                   </div>
// // //                   <motion.div
// // //                     className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center"
// // //                     animate={{
// // //                       scale: [1, 1.2, 1],
// // //                       rotate: [0, 180, 360],
// // //                     }}
// // //                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// // //                   >
// // //                     <Zap className="w-6 h-6 text-orange-600" />
// // //                   </motion.div>
// // //                 </div>
// // //               </CardContent>
// // //             </Card>
// // //           </motion.div>
// // //         </motion.div>
// // //         {/* Main Content Tabs */}
// // //         <motion.div
// // //           initial={{ opacity: 0, y: 20 }}
// // //           animate={{ opacity: 1, y: 0 }}
// // //           transition={{ duration: 0.6, delay: 0.3 }}
// // //         >
// // //           <Tabs defaultValue="mood" className="space-y-6">
// // //             <TabsList className="grid w-full grid-cols-5">
// // //               <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
// // //               <TabsTrigger value="posts">Posts</TabsTrigger>
// // //               <TabsTrigger value="announcements">Announcements</TabsTrigger>
// // //               <TabsTrigger value="emergency">Emergency Alert</TabsTrigger>
// // //               <TabsTrigger value="past-alerts">Past Alerts</TabsTrigger>
// // //               <TabsTrigger value="assessment">Self Assessment</TabsTrigger>
// // //             </TabsList>
// // //             {/* Mood Tracking Tab */}
// // //             <TabsContent value="mood" className="space-y-6">
// // //               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// // //                 {/* Today's Mood Entry */}
// // //                 <Card className="hover:shadow-lg transition-shadow duration-300">
// // //                   <CardHeader>
// // //                     <CardTitle className="flex items-center space-x-2">
// // //                       <Plus className="w-5 h-5" />
// // //                       <span>Log Today's Mood</span>
// // //                     </CardTitle>
// // //                   </CardHeader>
// // //                   <CardContent className="space-y-6">
// // //                     <div>
// // //                       <label className="block text-sm font-medium mb-2">Mood (1-10)</label>
// // //                       <div className="flex items-center space-x-4">
// // //                         <input
// // //                           type="range"
// // //                           min="1"
// // //                           max="10"
// // //                           value={currentMood}
// // //                           onChange={(e) => setCurrentMood(Number(e.target.value))}
// // //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// // //                         />
// // //                         <div className="flex items-center space-x-2">
// // //                           {getMoodIcon(currentMood)}
// // //                           <span className="text-lg font-semibold w-8">{currentMood}</span>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-sm font-medium mb-2">Energy Level (1-10)</label>
// // //                       <div className="flex items-center space-x-4">
// // //                         <input
// // //                           type="range"
// // //                           min="1"
// // //                           max="10"
// // //                           value={currentEnergy}
// // //                           onChange={(e) => setCurrentEnergy(Number(e.target.value))}
// // //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// // //                         />
// // //                         <div className="flex items-center space-x-2">
// // //                           <Zap className="w-5 h-5 text-orange-500" />
// // //                           <span className="text-lg font-semibold w-8">{currentEnergy}</span>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-sm font-medium mb-2">Anxiety Level (1-10)</label>
// // //                       <div className="flex items-center space-x-4">
// // //                         <input
// // //                           type="range"
// // //                           min="1"
// // //                           max="10"
// // //                           value={currentAnxiety}
// // //                           onChange={(e) => setCurrentAnxiety(Number(e.target.value))}
// // //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// // //                         />
// // //                         <div className="flex items-center space-x-2">
// // //                           <AlertTriangle className="w-5 h-5 text-red-500" />
// // //                           <span className="text-lg font-semibold w-8">{currentAnxiety}</span>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-sm font-medium mb-2">Sleep Hours</label>
// // //                       <div className="flex items-center space-x-4">
// // //                         <input
// // //                           type="range"
// // //                           min="0"
// // //                           max="12"
// // //                           value={currentSleep}
// // //                           onChange={(e) => setCurrentSleep(Number(e.target.value))}
// // //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// // //                         />
// // //                         <div className="flex items-center space-x-2">
// // //                           <Moon className="w-5 h-5 text-purple-500" />
// // //                           <span className="text-lg font-semibold w-8">{currentSleep}h</span>
// // //                         </div>
// // //                       </div>
// // //                     </div>
// // //                     <div>
// // //                       <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
// // //                       <Textarea
// // //                         value={moodNotes}
// // //                         onChange={(e) => setMoodNotes(e.target.value)}
// // //                         placeholder="How are you feeling today? Any specific thoughts or events?"
// // //                         className="w-full"
// // //                         rows={3}
// // //                       />
// // //                     </div>
// // //                     <Button
// // //                       onClick={saveMoodEntry}
// // //                       className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
// // //                     >
// // //                       Save Mood Entry
// // //                     </Button>
// // //                   </CardContent>
// // //                 </Card>
// // //                 {/* Mood Chart */}
// // //                 <Card className="hover:shadow-lg transition-shadow duration-300">
// // //                   <CardHeader>
// // //                     <CardTitle className="flex items-center space-x-2">
// // //                       <BarChart3 className="w-5 h-5" />
// // //                       <span>7-Day Mood Trend</span>
// // //                     </CardTitle>
// // //                   </CardHeader>
// // //                   <CardContent>
// // //                     {moodData.length > 0 ? (
// // //                       <div className="space-y-4">
// // //                         {moodData.slice(-7).map((entry, index) => (
// // //                           <motion.div
// // //                             key={index}
// // //                             className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
// // //                             initial={{ opacity: 0, x: -20 }}
// // //                             animate={{ opacity: 1, x: 0 }}
// // //                             transition={{ delay: index * 0.1 }}
// // //                           >
// // //                             <div className="flex items-center space-x-3">
// // //                               <Calendar className="w-4 h-4 text-gray-500" />
// // //                               <span className="text-sm text-gray-600 dark:text-gray-400">
// // //                                 {new Date(entry.date).toLocaleDateString()}
// // //                               </span>
// // //                             </div>
// // //                             <div className="flex items-center space-x-3">
// // //                               {getMoodIcon(entry.mood)}
// // //                               <Progress value={entry.mood * 10} className="w-20" />
// // //                               <span className="text-sm font-medium w-12">{entry.mood}/10</span>
// // //                             </div>
// // //                           </motion.div>
// // //                         ))}
// // //                         <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
// // //                           <div className="flex items-center justify-between">
// // //                             <span className="text-sm text-blue-700 dark:text-blue-300">Weekly Average</span>
// // //                             <div className="flex items-center space-x-2">
// // //                               <TrendingUp className="w-4 h-4 text-blue-600" />
// // //                               <span className="font-semibold text-blue-600">{getWeeklyAverage()}/10</span>
// // //                             </div>
// // //                           </div>
// // //                         </div>
// // //                       </div>
// // //                     ) : (
// // //                       <div className="text-center py-8">
// // //                         <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// // //                         <p className="text-gray-600 dark:text-gray-400">No mood data yet</p>
// // //                         <p className="text-sm text-gray-500">Start tracking to see your trends</p>
// // //                       </div>
// // //                     )}
// // //                   </CardContent>
// // //                 </Card>
// // //               </div>
// // //             </TabsContent>
// // //             {/* Combined Posts Tab */}
// // //             <TabsContent value="posts" className="space-y-6">
// // //               <Card>
// // //                 <CardHeader>
// // //                   <CardTitle className="flex items-center space-x-2">
// // //                     <FileText className="w-5 h-5 text-blue-600" />
// // //                     <span>Healthcare Posts</span>
// // //                     <Badge variant="secondary">{allPosts.length} posts</Badge>
// // //                   </CardTitle>
// // //                 </CardHeader>
// // //                 <CardContent>
// // //                   {allPosts.length > 0 ? (
// // //                     <div className="space-y-6">
// // //                       {allPosts.map((post, index) => (
// // //                         <motion.div
// // //                           key={post._id}
// // //                           initial={{ opacity: 0, y: 20 }}
// // //                           animate={{ opacity: 1, y: 0 }}
// // //                           transition={{ delay: index * 0.1 }}
// // //                           whileHover={{ scale: 1.01 }}
// // //                           className="border rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
// // //                         >
// // //                           {/* Post Header */}
// // //                           <div className="flex items-start justify-between mb-4">
// // //                             <div className="flex items-center space-x-4">
// // //                               <div
// // //                                 className={`w-12 h-12 rounded-full flex items-center justify-center ${getAuthorBadgeColor(post.authorType)}`}
// // //                               >
// // //                                 {getAuthorIcon(post.authorType)}
// // //                               </div>
// // //                               <div>
// // //                                 <div className="flex items-center space-x-2">
// // //                                   <p className="font-semibold text-lg">
// // //                                     {post.authorType === "Doctor" ? "Dr. " : "Hospital "}
// // //                                     {post.postby || "Mahadev"}
// // //                                   </p>
// // //                                   <Badge className={getAuthorBadgeColor(post.authorType)}>{post.authorType}</Badge>
// // //                                 </div>
// // //                                 <p className="text-sm text-gray-500 dark:text-gray-400">
// // //                                   {post.authorType === "Doctor" ? "Medical Professional" : "Healthcare Institution"}
// // //                                 </p>
// // //                                 {post.mentionedId && (
// // //                                   <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
// // //                                     mentioned {post.mentionedType === "Doctor" ? "Dr. " : ""}
// // //                                     {post.mentionedId.name}
// // //                                   </p>
// // //                                 )}
// // //                               </div>
// // //                             </div>
// // //                             <div className="flex items-center space-x-3">
// // //                               <Badge variant="outline" className="capitalize">
// // //                                 {post.category.replace("-", " ")}
// // //                               </Badge>
// // //                               <div className="flex items-center space-x-1 text-xs text-gray-500">
// // //                                 <Clock className="w-3 h-3" />
// // //                                 <span>{formatTimeAgo(post.createdAt)}</span>
// // //                               </div>
// // //                             </div>
// // //                           </div>
// // //                           {/* Post Content */}
// // //                           <div className="mb-4">
// // //                             <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">{post.title}</h3>
// // //                             <div className="prose prose-gray dark:prose-invert max-w-none">
// // //                               <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{post.content}</p>
// // //                             </div>
// // //                           </div>
// // //                           {/* Tags */}
// // //                           {post.tags.length > 0 && (
// // //                             <div className="mb-4">
// // //                               <div className="flex items-center space-x-2 mb-2">
// // //                                 <Tag className="w-4 h-4 text-gray-500" />
// // //                                 <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags:</span>
// // //                               </div>
// // //                               <div className="flex flex-wrap gap-2">
// // //                                 {post.tags.map((tag, tagIndex) => (
// // //                                   <Badge
// // //                                     key={tagIndex}
// // //                                     variant="secondary"
// // //                                     className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
// // //                                   >
// // //                                     #{tag}
// // //                                   </Badge>
// // //                                 ))}
// // //                               </div>
// // //                             </div>
// // //                           )}
// // //                           {/* Post Actions */}
// // //                           <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
// // //                             <div className="flex items-center space-x-6">
// // //                               <div className="flex items-center space-x-2 text-gray-600">
// // //                                 <Eye className="w-5 h-5" />
// // //                                 <span className="text-xs text-gray-500">Public post</span>
// // //                               </div>
// // //                             </div>
// // //                             <div className="flex items-center space-x-2">
// // //                               {post.isApproved && (
// // //                                 <Badge variant="outline" className="text-green-600 border-green-200">
// // //                                   <CheckCircle className="w-3 h-3 mr-1" />
// // //                                   Verified
// // //                                 </Badge>
// // //                               )}
// // //                             </div>
// // //                           </div>
// // //                         </motion.div>
// // //                       ))}
// // //                     </div>
// // //                   ) : (
// // //                     <div className="text-center py-16">
// // //                       <FileText className="w-20 h-20 text-gray-400 mx-auto mb-6" />
// // //                       <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
// // //                         No posts available
// // //                       </h3>
// // //                       <p className="text-gray-500 mb-4">Healthcare posts from doctors and hospitals will appear here</p>
// // //                       <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
// // //                         <Stethoscope className="w-4 h-4" />
// // //                         <span>Doctor posts</span>
// // //                       </div>
// // //                       <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
// // //                       <div className="flex items-center space-x-2">
// // //                         <Building2 className="w-4 h-4" />
// // //                         <span>Hospital updates</span>
// // //                       </div>
// // //                     </div>
// // //                   )}
// // //                 </CardContent>
// // //               </Card>
// // //             </TabsContent>
// // //             {/* Announcements Tab */}
// // //             <TabsContent value="announcements" className="space-y-6">
// // //               <Card>
// // //                 <CardHeader>
// // //                   <CardTitle className="flex items-center space-x-2">
// // //                     <Megaphone className="w-5 h-5 text-blue-600" />
// // //                     <span>All Announcements</span>
// // //                   </CardTitle>
// // //                 </CardHeader>
// // //                 <CardContent>
// // //                   {allAnnouncements.length > 0 ? (
// // //                     <div className="space-y-4">
// // //                       {allAnnouncements.map((announcement, index) => (
// // //                         <motion.div
// // //                           key={announcement._id}
// // //                           initial={{ opacity: 0, y: 20 }}
// // //                           animate={{ opacity: 1, y: 0 }}
// // //                           transition={{ delay: index * 0.1 }}
// // //                           whileHover={{ scale: 1.01 }}
// // //                           className={`border rounded-lg p-4 hover:shadow-md transition-all duration-300 ${
// // //                             announcement.isRead ? "bg-gray-50 dark:bg-gray-800" : "bg-yellow-50 dark:bg-yellow-900/20"
// // //                           }`}
// // //                         >
// // //                           <div className="flex items-start justify-between mb-3">
// // //                             <div className="flex-1">
// // //                               <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
// // //                               <div className="flex items-center space-x-2 mb-2">
// // //                                 <Badge variant="outline">{announcement.ownerType}</Badge>
// // //                               </div>
// // //                             </div>
// // //                             <div className="flex items-center space-x-2">
// // //                               <span className="text-xs text-gray-500">
// // //                                 {new Date(announcement.createdAt).toLocaleDateString()}
// // //                               </span>
// // //                             </div>
// // //                           </div>
// // //                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{announcement.content}</p>
// // //                           <div className="flex items-center justify-between">
// // //                             <div className="flex items-center space-x-2 text-gray-600">
// // //                               <Eye className="w-4 h-4" />
// // //                               <span className="text-sm">View details</span>
// // //                             </div>
// // //                           </div>
// // //                         </motion.div>
// // //                       ))}
// // //                     </div>
// // //                   ) : (
// // //                     <div className="text-center py-12">
// // //                       <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// // //                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
// // //                         No announcements yet
// // //                       </h3>
// // //                       <p className="text-gray-500">Announcements from doctors and hospitals will appear here.</p>
// // //                     </div>
// // //                   )}
// // //                 </CardContent>
// // //               </Card>
// // //             </TabsContent>
// // //             {/* Emergency Alert Tab - Form-based */}
// // //             <TabsContent value="emergency" className="space-y-6">
// // //               <Card>
// // //                 <CardHeader>
// // //                   <CardTitle className="flex items-center space-x-2">
// // //                     <AlertTriangle className="w-5 h-5 text-red-500" />
// // //                     <span>Detailed Emergency Alert</span>
// // //                     {emergencyButtonDisabled && <Badge variant="destructive">Alert Active</Badge>}
// // //                   </CardTitle>
// // //                 </CardHeader>
// // //                 <CardContent className="space-y-6">
// // //                   {!emergencyButtonDisabled ? (
// // //                     <>
// // //                       <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
// // //                         <AlertTriangle className="h-4 w-4" />
// // //                         <AlertDescription>
// // //                           <strong>Emergency Use Only:</strong> This will immediately alert nearby hospitals with
// // //                           detailed information.
// // //                         </AlertDescription>
// // //                       </Alert>
// // //                       <div>
// // //                         <label className="block text-sm font-medium mb-2">Describe your emergency *</label>
// // //                         <Textarea
// // //                           value={emergencyForm.message}
// // //                           onChange={(e) => setEmergencyForm({ ...emergencyForm, message: e.target.value })}
// // //                           placeholder="Please describe your medical emergency in detail..."
// // //                           className="w-full min-h-[120px]"
// // //                         />
// // //                       </div>
// // //                       <div>
// // //                         <label className="block text-sm font-medium mb-2">Priority Level</label>
// // //                         <Select
// // //                           value={emergencyForm.priority}
// // //                           onValueChange={(value) => setEmergencyForm({ ...emergencyForm, priority: value })}
// // //                         >
// // //                           <SelectTrigger>
// // //                             <SelectValue />
// // //                           </SelectTrigger>
// // //                           <SelectContent>
// // //                             <SelectItem value="critical">🔴 Critical - Life threatening</SelectItem>
// // //                             <SelectItem value="high">🟠 High - Urgent medical attention</SelectItem>
// // //                             <SelectItem value="medium">🟡 Medium - Medical assistance needed</SelectItem>
// // //                           </SelectContent>
// // //                         </Select>
// // //                       </div>
// // //                       <Button
// // //                         onClick={handleFormEmergencyAlert}
// // //                         disabled={isEmergencyActive || !emergencyForm.message.trim()}
// // //                         className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg"
// // //                       >
// // //                         {isEmergencyActive ? (
// // //                           <>
// // //                             <motion.div
// // //                               className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
// // //                               animate={{ rotate: 360 }}
// // //                               transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// // //                             />
// // //                             Sending Emergency Alert...
// // //                           </>
// // //                         ) : (
// // //                           <>
// // //                             <Send className="w-5 h-5 mr-2" />
// // //                             Send Detailed Emergency Alert
// // //                           </>
// // //                         )}
// // //                       </Button>
// // //                     </>
// // //                   ) : (
// // //                     <div className="text-center py-12">
// // //                       <motion.div
// // //                         className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
// // //                         animate={{
// // //                           boxShadow: [
// // //                             "0 0 0 0 rgba(234, 179, 8, 0.7)",
// // //                             "0 0 0 20px rgba(234, 179, 8, 0)",
// // //                             "0 0 0 0 rgba(234, 179, 8, 0)",
// // //                           ],
// // //                         }}
// // //                         transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// // //                       >
// // //                         <Timer className="w-8 h-8 text-white" />
// // //                       </motion.div>
// // //                       <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
// // //                         Emergency Alert Active
// // //                       </h3>
// // //                       <p className="text-yellow-600 dark:text-yellow-300 mb-4">
// // //                         Your emergency alert has been sent to nearby hospitals. Please wait for their response.
// // //                       </p>
// // //                       <Button
// // //                         onClick={dismissAlert}
// // //                         variant="outline"
// // //                         className="border-yellow-500 text-yellow-700 hover:bg-yellow-50 bg-transparent"
// // //                       >
// // //                         Dismiss Alert
// // //                       </Button>
// // //                     </div>
// // //                   )}
// // //                 </CardContent>
// // //               </Card>
// // //             </TabsContent>
// // //             {/* Past Emergency Alerts Tab */}
// // //             <TabsContent value="past-alerts" className="space-y-6">
// // //               <Card>
// // //                 <CardHeader>
// // //                   <CardTitle className="flex items-center space-x-2">
// // //                     <History className="w-5 h-5 text-blue-500" />
// // //                     <span>Past Emergency Alert Requests</span>
// // //                     <Badge variant="secondary">{emergencyAlerts.length} total</Badge>
// // //                   </CardTitle>
// // //                 </CardHeader>
// // //                 <CardContent>
// // //                   {emergencyAlerts.length > 0 ? (
// // //                     <div className="space-y-4">
// // //                       {emergencyAlerts.map((alert, index) => (
// // //                         <motion.div
// // //                           key={alert._id}
// // //                           initial={{ opacity: 0, y: 20 }}
// // //                           animate={{ opacity: 1, y: 0 }}
// // //                           transition={{ delay: index * 0.1 }}
// // //                           className={`border rounded-lg p-4 hover:shadow-md transition-all duration-300 ${
// // //                             alert.status === "pending"
// // //                               ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
// // //                               : alert.status === "accepted"
// // //                                 ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
// // //                                 : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
// // //                           }`}
// // //                         >
// // //                           <div className="flex items-start justify-between">
// // //                             <div className="flex-1">
// // //                               <div className="flex items-center space-x-3 mb-3">
// // //                                 <motion.div
// // //                                   className={`w-3 h-3 rounded-full ${
// // //                                     alert.status === "pending"
// // //                                       ? "bg-yellow-500"
// // //                                       : alert.status === "accepted"
// // //                                         ? "bg-green-500"
// // //                                         : "bg-red-500"
// // //                                   }`}
// // //                                   animate={{ scale: alert.status === "pending" ? [1, 1.2, 1] : 1 }}
// // //                                   transition={{
// // //                                     duration: 1,
// // //                                     repeat: alert.status === "pending" ? Number.POSITIVE_INFINITY : 0,
// // //                                   }}
// // //                                 />
// // //                                 <h3 className="font-semibold text-lg">Emergency Alert</h3>
// // //                                 <Badge className={getPriorityColor(alert.priority)}>
// // //                                   {alert.priority.toUpperCase()}
// // //                                 </Badge>
// // //                                 <Badge className={getStatusColor(alert.status)}>{alert.status.toUpperCase()}</Badge>
// // //                               </div>
// // //                               <div className="mb-4">
// // //                                 <h4 className="font-medium text-gray-900 dark:text-white mb-2">Emergency Message</h4>
// // //                                 <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
// // //                                   {alert.message}
// // //                                 </p>
// // //                               </div>
// // //                               {alert.location?.address && (
// // //                                 <div className="mb-4">
// // //                                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Location</h4>
// // //                                   <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
// // //                                     <div className="flex items-start space-x-2">
// // //                                       <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
// // //                                       <div className="flex-1">
// // //                                         <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
// // //                                           📍 {formatLocationAddress(alert.location.address)}
// // //                                         </p>
// // //                                         <Button
// // //                                           onClick={() => openGoogleMaps(alert.location?.address)}
// // //                                           size="sm"
// // //                                           className="bg-blue-600 hover:bg-blue-700 text-white"
// // //                                         >
// // //                                           <Map className="w-3 h-3 mr-1" />
// // //                                           View on Map
// // //                                           <ExternalLink className="w-3 h-3 ml-1" />
// // //                                         </Button>
// // //                                       </div>
// // //                                     </div>
// // //                                   </div>
// // //                                 </div>
// // //                               )}
// // //                               {alert.acceptedBy && (
// // //                                 <div className="mb-4">
// // //                                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hospital Response</h4>
// // //                                   <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
// // //                                     <div className="flex items-center space-x-2">
// // //                                       <CheckCircle className="w-4 h-4 text-green-500" />
// // //                                       <span className="font-medium text-green-800 dark:text-green-200">
// // //                                         Accepted by {alert.acceptedBy.name}
// // //                                       </span>
// // //                                     </div>
// // //                                     <p className="text-sm text-green-700 dark:text-green-300 mt-1">
// // //                                       Contact: {alert.acceptedBy.phone}
// // //                                     </p>
// // //                                   </div>
// // //                                 </div>
// // //                               )}
// // //                               <div className="flex items-center justify-between">
// // //                                 <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
// // //                                   <Timer className="w-4 h-4" />
// // //                                   <span>{formatTimeAgo(alert.createdAt)}</span>
// // //                                 </div>
// // //                                 <Button
// // //                                   size="sm"
// // //                                   variant="outline"
// // //                                   onClick={() => handleDeleteAlert(alert._id)}
// // //                                   className="text-red-600 hover:text-red-800 hover:bg-red-50"
// // //                                 >
// // //                                   <Trash2 className="w-4 h-4 mr-1" />
// // //                                   Delete
// // //                                 </Button>
// // //                               </div>
// // //                             </div>
// // //                           </div>
// // //                         </motion.div>
// // //                       ))}
// // //                     </div>
// // //                   ) : (
// // //                     <div className="text-center py-12">
// // //                       <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// // //                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
// // //                         No Past Alert Requests
// // //                       </h3>
// // //                       <p className="text-gray-500">You haven't sent any emergency alerts yet</p>
// // //                     </div>
// // //                   )}
// // //                 </CardContent>
// // //               </Card>
// // //             </TabsContent>
// // //             {/* Self Assessment Tab */}
// // //             <TabsContent value="assessment" className="space-y-6">
// // //               {currentAssessment ? (
// // //                 currentAssessment === "phq9" ? (
// // //                   <PHQ9Assessment
// // //                     onComplete={(result) => {
// // //                       setAssessmentResult(result)
// // //                       setCurrentAssessment("results")
// // //                     }}
// // //                     onBack={() => setCurrentAssessment(null)}
// // //                   />
// // //                 ) : currentAssessment === "gad7" ? (
// // //                   <GAD7Assessment
// // //                     onComplete={(result) => {
// // //                       setAssessmentResult(result)
// // //                       setCurrentAssessment("results")
// // //                     }}
// // //                     onBack={() => setCurrentAssessment(null)}
// // //                   />
// // //                 ) : currentAssessment === "results" ? (
// // //                   <AssessmentResults
// // //                     type={assessmentType}
// // //                     result={assessmentResult}
// // //                     onBack={() => setCurrentAssessment(null)}
// // //                     onReturnToDashboard={() => {
// // //                       setCurrentAssessment(null)
// // //                       setAssessmentResult(null)
// // //                       setAssessmentType("")
// // //                     }}
// // //                   />
// // //                 ) : null
// // //               ) : (
// // //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// // //                   {[
// // //                     {
// // //                       icon: Brain,
// // //                       title: "Depression Assessment (PHQ-9)",
// // //                       desc: "A 9-question assessment to help identify symptoms of depression and track your mental health.",
// // //                       color: "blue",
// // //                       type: "phq9",
// // //                     },
// // //                     {
// // //                       icon: AlertTriangle,
// // //                       title: "Anxiety Assessment (GAD-7)",
// // //                       desc: "A 7-question screening tool for generalized anxiety disorder and anxiety symptoms.",
// // //                       color: "yellow",
// // //                       type: "gad7",
// // //                     },
// // //                     {
// // //                       icon: Zap,
// // //                       title: "Stress Level Check",
// // //                       desc: "Quick assessment to understand your current stress levels and get personalized recommendations.",
// // //                       color: "red",
// // //                       type: "stress",
// // //                       disabled: true,
// // //                     },
// // //                     {
// // //                       icon: Heart,
// // //                       title: "General Wellness Check",
// // //                       desc: "Comprehensive wellness assessment covering multiple areas of your physical and mental health.",
// // //                       color: "green",
// // //                       type: "wellness",
// // //                       disabled: true,
// // //                     },
// // //                   ].map((assessment, index) => (
// // //                     <motion.div
// // //                       key={index}
// // //                       initial={{ opacity: 0, y: 20 }}
// // //                       animate={{ opacity: 1, y: 0 }}
// // //                       transition={{ delay: index * 0.1 }}
// // //                       whileHover={{ scale: assessment.disabled ? 1 : 1.02, y: assessment.disabled ? 0 : -5 }}
// // //                     >
// // //                       <Card
// // //                         className={`hover:shadow-lg transition-all duration-300 ${assessment.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer group"}`}
// // //                       >
// // //                         <CardHeader>
// // //                           <CardTitle className="flex items-center space-x-2">
// // //                             <assessment.icon className={`w-5 h-5 text-${assessment.color}-500`} />
// // //                             <span>{assessment.title}</span>
// // //                             {assessment.disabled && <Badge variant="secondary">Coming Soon</Badge>}
// // //                           </CardTitle>
// // //                         </CardHeader>
// // //                         <CardContent>
// // //                           <p className="text-gray-600 dark:text-gray-300 mb-4">{assessment.desc}</p>
// // //                           <Button
// // //                             className={`w-full ${assessment.disabled ? "cursor-not-allowed" : `group-hover:bg-${assessment.color}-600`}`}
// // //                             disabled={assessment.disabled}
// // //                             onClick={() => {
// // //                               if (!assessment.disabled) {
// // //                                 setAssessmentType(assessment.type)
// // //                                 setCurrentAssessment(assessment.type)
// // //                               }
// // //                             }}
// // //                           >
// // //                             {assessment.disabled ? "Coming Soon" : "Start Assessment"}
// // //                           </Button>
// // //                         </CardContent>
// // //                       </Card>
// // //                     </motion.div>
// // //                   ))}
// // //                 </div>
// // //               )}
// // //             </TabsContent>
// // //           </Tabs>
// // //         </motion.div>
// // //       </div>
// // //     </div>
// // //   )
// // // }







// // //C:\Users\UDAYN\Downloads\healthcare-platform - Copy\app\user\dashboard\page.tsx
// // "use client"

// // import { useState, useEffect } from "react"
// // import { motion, AnimatePresence } from "framer-motion"
// // import {
// //   Heart,
// //   AlertTriangle,
// //   Brain,
// //   Target,
// //   Zap,
// //   Moon,
// //   Smile,
// //   Frown,
// //   Meh,
// //   Plus,
// //   BarChart3,
// //   TrendingUp,
// //   Calendar,
// //   Clock,
// //   Building2,
// //   Stethoscope,
// //   MapPin,
// //   Phone,
// //   Mail,
// //   Award,
// //   CheckCircle,
// //   Send,
// //   History,
// //   Timer,
// //   Map,
// //   ExternalLink,
// //   RefreshCw,
// //   XCircle,
// //   FileText,
// //   Tag,
// //   Eye,
// //   Megaphone,
// //   Bell,
// // } from "lucide-react"
// // import { Button } from "@/components/ui/button"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Progress } from "@/components/ui/progress"
// // import { Badge } from "@/components/ui/badge"
// // import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// // import { Alert, AlertDescription } from "@/components/ui/alert"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import { useAuth } from "@/app/contexts/AuthProvider"
// // import ThemeToggle from "@/components/ThemeToggle"
// // import UserDropdown from "@/components/UserDropdown"
// // import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
// // import { toast } from "react-hot-toast"
// // import PHQ9Assessment from "@/components/assessments/PHQ9Assessment"
// // import GAD7Assessment from "@/components/assessments/GAD7Assessment"
// // import AssessmentResults from "@/components/assessments/AssessmentResults"

// // interface MoodData {
// //   date: string
// //   mood: number
// //   energy: number
// //   anxiety: number
// //   sleep: number
// //   notes?: string
// // }

// // interface EmergencyAlert {
// //   _id: string
// //   status: string
// //   priority: string
// //   createdAt: string
// //   message: string
// //   userInfo: {
// //     name: string
// //     email: string
// //     phone: string
// //   }
// //   location?: {
// //     lat?: number
// //     lng?: number
// //     address?: {
// //       street?: string
// //       area?: string
// //       townOrVillage?: string
// //       taluka?: string
// //       district?: string
// //       pincode?: string
// //       state?: string
// //       geoLocation?: {
// //         lat?: number
// //         lng?: number
// //       }
// //     }
// //   }
// //   acceptedBy?: {
// //     _id: string
// //     name: string
// //     phone: string
// //   }
// //   isRead?: boolean
// // }

// // interface Post {
// //   _id: string
// //   title: string
// //   content: string
// //   category: string
// //   tags: string[]
// //   authorId: {
// //     _id: string
// //     name: string
// //   }
// //   authorType: string
// //   mentionedId?: {
// //     _id: string
// //     name: string
// //   }
// //   mentionedType?: string
// //   createdAt: string
// //   postby: string
// //   isApproved: boolean
// // }

// // interface Hospital {
// //   _id: string
// //   name: string
// //   email: string
// //   phone: string
// //   address: string
// //   specialties: string[]
// //   isVerified: boolean
// //   isAvailable: boolean
// //   isHandleEmergency: boolean
// //   createdAt: string
// //   distance?: number
// // }

// // interface UserProfile {
// //   _id: string
// //   name: string
// //   email: string
// //   phone: string
// //   address: {
// //     street: string
// //     area: string
// //     village: string // Renamed from townOrVillage
// //     subDistrict: string // Renamed from taluka
// //     district: string
// //     pincode: string
// //     state: string
// //     geoLocation?: {
// //       // Added this based on the provided schema
// //       lat?: number
// //       lng?: number
// //     }
// //   }
// //   emergencyContacts: Array<{
// //     name: string
// //     phone: string
// //     relation: string
// //   }>
// //   medicalInfo: {
// //     bloodGroup: string
// //     allergies: string[]
// //     medications: string[]
// //     conditions: string[]
// //   }
// // }

// // interface Announcement {
// //   _id: string
// //   title: string
// //   content: string
// //   ownerId: string
// //   ownerType: "doctor" | "hospital" | "user"
// //   mentions: Array<{
// //     id: string
// //     name: string
// //     type: "doctor" | "hospital"
// //     email: string
// //   }>
// //   readBy: string[] // Array of user/doctor/hospital IDs who have read it
// //   createdAt: string
// //   isRead?: boolean // For mentions tab, indicates if *this* user has read it
// // }

// // export default function UserDashboard() {
// //   const { user } = useAuth()
// //   const [moodData, setMoodData] = useState<MoodData[]>([])
// //   const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
// //   const [allPosts, setAllPosts] = useState<Post[]>([])
// //   const [hospitals, setHospitals] = useState<Hospital[]>([])
// //   const [allAnnouncements, setAllAnnouncements] = useState<Announcement[]>([])
// //   const [todayMood, setTodayMood] = useState<MoodData | null>(null)
// //   const [isEmergencyActive, setIsEmergencyActive] = useState(false)
// //   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null) // Live location state
// //   const [loading, setLoading] = useState(true)
// //   const [showHospitalInfo, setShowHospitalInfo] = useState(false)
// //   const [currentAlert, setCurrentAlert] = useState<EmergencyAlert | null>(null)
// //   const [showAlertNotification, setShowAlertNotification] = useState(false)
// //   const [alertTimer, setAlertTimer] = useState<NodeJS.Timeout | null>(null)
// //   const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
// //   const [emergencyButtonDisabled, setEmergencyButtonDisabled] = useState(false)
// //   const [alertStatus, setAlertStatus] = useState<string | null>(null)
// //   const [lastAlertCheck, setLastAlertCheck] = useState<Date>(new Date())
// //   const [currentAssessment, setCurrentAssessment] = useState<string | null>(null)
// //   const [assessmentResult, setAssessmentResult] = useState<any>(null)
// //   const [assessmentType, setAssessmentType] = useState<string>("")
// //   const [unreadAnnouncementsCount, setUnreadAnnouncementsCount] = useState(0)
// //   const [showLocationPrompt, setShowLocationPrompt] = useState(false) // New state for location prompt
// //   const [escalationCount, setEscalationCount] = useState(0) // Track escalation attempts

// //   // Mood tracking state
// //   const [currentMood, setCurrentMood] = useState(5)
// //   const [currentEnergy, setCurrentEnergy] = useState(5)
// //   const [currentAnxiety, setCurrentAnxiety] = useState(5)
// //   const [currentSleep, setCurrentSleep] = useState(8)
// //   const [moodNotes, setMoodNotes] = useState("")

// //   // Emergency form state
// //   const [emergencyForm, setEmergencyForm] = useState({
// //     message: "",
// //     priority: "high",
// //   })

// //   // Helper to update location in DB
// //   const updateLocationInDB = async (newLocation: { lat: number; lng: number }) => {
// //     try {
// //       const response = await fetch("/api/user/profile/update-location", {
// //         method: "PUT",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ lat: newLocation.lat, lng: newLocation.lng }),
// //       })
// //       if (!response.ok) {
// //         console.error("Failed to update location in DB")
// //       }
// //     } catch (error) {
// //       console.error("Error updating location in DB:", error)
// //     }
// //   }

// //   // Function to request location and handle prompt
// //   const handleLocationRequest = async () => {
// //     return new Promise<boolean>((resolve) => {
// //       if (navigator.geolocation) {
// //         navigator.geolocation.getCurrentPosition(
// //           async (position) => {
// //             const newLocation = {
// //               lat: position.coords.latitude,
// //               lng: position.coords.longitude,
// //             }
// //             setLocation(newLocation)
// //             await updateLocationInDB(newLocation)
// //             resolve(true) // Location granted and saved
// //           },
// //           (error) => {
// //             if (error.code === error.PERMISSION_DENIED) {
// //               setShowLocationPrompt(true) // Show the custom prompt
// //               resolve(false) // Location denied, prompt shown
// //             } else {
// //               toast.error("Location access denied or error. Emergency alerts will use your registered address.")
// //               resolve(false) // Other error, proceed without live location
// //             }
// //           },
// //           { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }, // Request fresh location
// //         )
// //       } else {
// //         toast.error("Geolocation not supported by this browser. Emergency alerts will use your registered address.")
// //         resolve(false) // Not supported
// //       }
// //     })
// //   }

// //   useEffect(() => {
// //     const initDashboard = async () => {
// //       setLoading(true)
// //       // Attempt to get live location and update DB
// //       await handleLocationRequest()

// //       // Staggered fetching of dashboard data
// //       // Fetch user profile and mood data first as they are core
// //       await fetchUserProfileAndMoodData()

// //       // Then fetch other data with delays
// //       setTimeout(async () => {
// //         await fetchEmergencyAlerts()
// //       }, 1000) // 1 second delay

// //       setTimeout(async () => {
// //         await fetchAllPosts()
// //       }, 2000) // 2 second delay

// //       setTimeout(async () => {
// //         await fetchHospitalsAndAnnouncements()
// //         setLoading(false) // Set loading to false after all data is initiated
// //       }, 3000) // 3 second delay
// //     }

// //     initDashboard()

// //     // Polling for alerts (existing logic)
// //     const interval = setInterval(() => {
// //       if (currentAlert?._id) {
// //         checkAlertStatus(currentAlert._id)
// //       }
// //     }, 10000)
// //     return () => clearInterval(interval)
// //   }, [currentAlert?._id]) // Dependency for polling

// //   const fetchUserProfileAndMoodData = async () => {
// //     try {
// //       const [userProfileRes, moodRes] = await Promise.all([fetch("/api/user/profile"), fetch("/api/user/mood-data")])

// //       if (userProfileRes.ok) {
// //         const userProfileData = await userProfileRes.json()
// //         if (userProfileData.user) {
// //           setUserProfile(userProfileData.user)
// //           // Initialize live location state from DB if available
// //           if (userProfileData.user.address?.geoLocation?.lat && userProfileData.user.address?.geoLocation?.lng) {
// //             setLocation({
// //               lat: userProfileData.user.address.geoLocation.lat,
// //               lng: userProfileData.user.address.geoLocation.lng,
// //             })
// //           }
// //         }
// //       }
// //       if (moodRes.ok) {
// //         const moodData = await moodRes.json()
// //         setMoodData(moodData.data || [])
// //         setTodayMood(moodData.today || null)
// //       }
// //     } catch (error) {
// //       console.error("Error fetching user profile or mood data:", error)
// //     }
// //   }

// //   const fetchEmergencyAlerts = async () => {
// //     try {
// //       const alertsRes = await fetch("/api/user/emergency-alerts")
// //       if (alertsRes.ok) {
// //         const alertsData = await alertsRes.json()
// //         setEmergencyAlerts(alertsData.data || [])
// //         const pendingAlerts =
// //           alertsData.data?.filter(
// //             (alert: EmergencyAlert) =>
// //               (alert.status === "pending" || alert.status === "no_response_all_contacted") && !alert.acceptedBy,
// //           ) || []
// //         if (pendingAlerts.length > 0) {
// //           setCurrentAlert(pendingAlerts[0])
// //           setEmergencyButtonDisabled(true)
// //           setAlertStatus(pendingAlerts[0].status) // Set alert status for banner
// //         } else {
// //           setCurrentAlert(null) // Clear current alert if no pending ones
// //           setEmergencyButtonDisabled(false)
// //           setAlertStatus(null) // Clear alert status
// //           setShowAlertNotification(false) // Hide persistent notification
// //         }
// //       }
// //     } catch (error) {
// //       console.error("Error fetching emergency alerts:", error)
// //     }
// //   }

// //   const fetchAllPosts = async () => {
// //     try {
// //       const postsRes = await fetch("/api/posts")
// //       if (postsRes.ok) {
// //         const postsData = await postsRes.json()
// //         setAllPosts(postsData.data || [])
// //       }
// //     } catch (error) {
// //       console.error("Error fetching all posts:", error)
// //     }
// //   }

// //   const fetchHospitalsAndAnnouncements = async () => {
// //     try {
// //       const [hospitalsRes, announcementsRes] = await Promise.all([
// //         fetch("/api/user/hospitals"),
// //         fetch("/api/announcements/mentions"), // Fetch all announcements for user, including mentions
// //       ])

// //       if (hospitalsRes.ok) {
// //         const hospitalsData = await hospitalsRes.json()
// //         setHospitals(hospitalsData.data || [])
// //       }
// //       if (announcementsRes.ok) {
// //         const announcementsData = await announcementsRes.json()
// //         // Calculate isRead status on the client side based on user.userId
// //         const processedAnnouncements =
// //           announcementsData.data?.map((ann: Announcement) => ({
// //             ...ann,
// //             isRead: ann.readBy.includes(user?.userId || ""), // Check if current user's ID is in readBy
// //           })) || []
// //         setAllAnnouncements(processedAnnouncements)
// //         // Calculate unread count for the current user
// //         const unreadCount = processedAnnouncements.filter((ann: Announcement) => !ann.isRead).length || 0
// //         setUnreadAnnouncementsCount(unreadCount)
// //       }
// //     } catch (error) {
// //       console.error("Error fetching hospitals or announcements:", error)
// //     }
// //   }

// //   const checkAlertStatus = async (alertId: string) => {
// //     try {
// //       const response = await fetch("/api/user/check-alert-status", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         credentials: "include", // to send cookies
// //         body: JSON.stringify({ alertId }), // 👈 send the required alertId
// //       })
// //       const data = await response.json()
// //       if (response.ok) {
// //         setAlertStatus(data.alert.status)
// //         setEmergencyButtonDisabled(data.alert.status === "pending" || data.alert.status === "accepted")
// //         setLastAlertCheck(new Date())

// //         if (data.alert.status === "accepted" && data.alert.acceptedBy) {
// //           toast.success(`🏥 ${data.alert.acceptedBy.name} is coming to help!`, { duration: 8000 })
// //           setShowAlertNotification(false) // Dismiss notification if accepted
// //           setEscalationCount(0) // Reset escalation count
// //           // Remove beforeunload listener when alert is accepted
// //           window.removeEventListener("beforeunload", handleBeforeUnload)
// //         } else if (data.alert.status === "pending") {
// //           // Handle escalation messages
// //           if (data.escalationOccurred) {
// //             setEscalationCount((prev) => prev + 1)
// //             toast.info(
// //               `⏳ Still finding help. Escalating alert to more hospitals... (Attempt ${escalationCount + 1})`,
// //               {
// //                 duration: 5000,
// //               },
// //             )
// //           } else {
// //             // Initial pending state or waiting for first escalation
// //             toast.info("⏳ Your emergency alert is pending. Searching for nearby hospitals...", { duration: 3000 })
// //           }
// //         } else if (data.alert.status === "no_response_all_contacted") {
// //           setShowAlertNotification(true) // Show persistent notification
// //           toast.error(
// //             "🚨 No more hospitals found within 100km to handle the situation. Please call emergency services directly!",
// //             {
// //               duration: 15000,
// //             },
// //           )
// //           // Remove beforeunload listener when no more hospitals can be contacted
// //           window.removeEventListener("beforeunload", handleBeforeUnload)
// //         }
// //       } else {
// //         console.error("API error:", data.message)
// //       }
// //     } catch (error) {
// //       console.error("Error checking alert status:", error)
// //     }
// //   }

// //   const handleBeforeUnload = (e: BeforeUnloadEvent) => {
// //     e.preventDefault()
// //     e.returnValue = ""
// //   }

// //   const startAlertMonitoring = (alertId: string) => {
// //     setEscalationCount(0) // Reset count for new alert
// //     setShowAlertNotification(false) // Hide initial notification until backend signals escalation
// //     toast.info("⏳ Your emergency alert is pending. Searching for nearby hospitals...", { duration: 3000 })
// //     // Add beforeunload listener to warn user about active alert
// //     window.addEventListener("beforeunload", handleBeforeUnload)
// //   }

// //   const handleEmergencySOS = async () => {
// //     if (isEmergencyActive || emergencyButtonDisabled) return
// //     setIsEmergencyActive(true)
// //     setEmergencyButtonDisabled(true)
// //     // Use the current live location if available, otherwise rely on registered address (handled by backend)
// //     await sendQuickEmergencyAlert(location)
// //   }

// //   const sendQuickEmergencyAlert = async (currentLocation: { lat: number; lng: number } | null) => {
// //     try {
// //       const response = await fetch("/api/user/emergency-alert", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           location: currentLocation ? { lat: currentLocation.lat, lng: currentLocation.lng } : undefined, // Send current live location if available
// //           message: "🚨 EMERGENCY SOS - Immediate assistance needed!",
// //           priority: "critical",
// //         }),
// //       })
// //       const data = await response.json()
// //       if (response.ok) {
// //         toast.success(`🚨 Emergency alert sent! User: ${data.userInfo.name} | Phone: ${data.userInfo.phone}`)
// //         toast.success("🏥 Searching for nearby hospitals... Please wait!")
// //         setCurrentAlert({ ...currentAlert, _id: data.alertId, status: "pending" }) // Set current alert to trigger polling
// //         setEmergencyButtonDisabled(true)
// //         setAlertStatus("pending") // Set status for banner
// //         startAlertMonitoring(data.alertId) // Start client-side monitoring
// //         setIsEmergencyActive(false)
// //       } else {
// //         toast.error(data.message || "Failed to send emergency alert")
// //         setIsEmergencyActive(false)
// //         setEmergencyButtonDisabled(false)
// //       }
// //     } catch (error) {
// //       console.error("Emergency alert error:", error)
// //       toast.error("Emergency system error. Please try again.")
// //       setIsEmergencyActive(false)
// //       setEmergencyButtonDisabled(false)
// //     }
// //   }

// //   const handleFormEmergencyAlert = async () => {
// //     if (!emergencyForm.message.trim()) {
// //       toast.error("Please describe your emergency")
// //       return
// //     }
// //     setIsEmergencyActive(true)
// //     try {
// //       const position = await new Promise<GeolocationPosition>((resolve, reject) => {
// //         navigator.geolocation.getCurrentPosition(resolve, reject, {
// //           enableHighAccuracy: true,
// //           timeout: 10000,
// //           maximumAge: 60000,
// //         })
// //       })
// //       const response = await fetch("/api/user/emergency-alert", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           message: emergencyForm.message,
// //           priority: emergencyForm.priority,
// //           location: {
// //             lat: position.coords.latitude,
// //             lng: position.coords.longitude,
// //           },
// //         }),
// //       })
// //       const data = await response.json()
// //       if (response.ok) {
// //         toast.success("🚨 Emergency alert sent to nearby hospitals!")
// //         setEmergencyForm({ message: "", priority: "high" })
// //         setEmergencyButtonDisabled(true)
// //         setAlertStatus("pending")
// //         setCurrentAlert({ ...currentAlert, _id: data.alertId, status: "pending" }) // Set current alert to trigger polling
// //         startAlertMonitoring(data.alertId) // Start client-side monitoring
// //       } else {
// //         toast.error(data.message || "Failed to send emergency alert")
// //       }
// //     } catch (error) {
// //       console.error("Error sending emergency alert:", error)
// //       if (error instanceof GeolocationPositionError) {
// //         toast.error("Location access required for emergency alerts")
// //       } else {
// //         toast.error("Failed to send emergency alert")
// //       }
// //     } finally {
// //       setIsEmergencyActive(false)
// //     }
// //   }

// //   const dismissAlert = async () => {
// //     if (!currentAlert) return
// //     try {
// //       const response = await fetch("/api/user/dismiss-alert", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ alertId: currentAlert._id }),
// //       })
// //       if (response.ok) {
// //         setShowAlertNotification(false)
// //         setCurrentAlert(null)
// //         setEmergencyButtonDisabled(false)
// //         setAlertStatus(null) // Clear alert status
// //         setEscalationCount(0) // Reset escalation count
// //         if (alertTimer) {
// //           clearTimeout(alertTimer)
// //           setAlertTimer(null)
// //         }
// //         toast.success("Alert dismissed")
// //         fetchEmergencyAlerts() // Re-fetch alerts to update the list
// //         window.removeEventListener("beforeunload", handleBeforeUnload) // Remove listener
// //       } else {
// //         toast.error("Failed to dismiss alert")
// //       }
// //     } catch (error) {
// //       console.error("Error dismissing alert:", error)
// //       toast.error("Failed to dismiss alert")
// //     }
// //   }

// //   // Removed handleDeleteAlert function as per user request for user dashboard

// //   const saveMoodEntry = async () => {
// //     try {
// //       const response = await fetch("/api/user/mood-entry", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({
// //           mood: currentMood,
// //           energy: currentEnergy,
// //           anxiety: currentAnxiety,
// //           sleep: currentSleep,
// //           notes: moodNotes,
// //         }),
// //       })
// //       if (response.ok) {
// //         toast.success("✅ Mood entry saved!")
// //         fetchUserProfileAndMoodData() // Re-fetch mood data
// //         setMoodNotes("")
// //       } else {
// //         toast.error("Failed to save mood entry")
// //       }
// //     } catch (error) {
// //       toast.error("Error saving mood entry")
// //     }
// //   }

// //   const handleMarkAnnouncementRead = async (announcementId: string) => {
// //     try {
// //       const response = await fetch("/api/announcements/mark-read", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ announcementId }),
// //       })
// //       if (response.ok) {
// //         toast.success("Announcement marked as read.")
// //         fetchHospitalsAndAnnouncements() // Re-fetch to update read status and notification count
// //       } else {
// //         toast.error("Failed to mark announcement as read.")
// //       }
// //     } catch (error) {
// //       toast.error("Error marking announcement as read.")
// //     }
// //   }

// //   const getMoodIcon = (mood: number) => {
// //     if (mood >= 8) return <Smile className="w-6 h-6 text-green-500" />
// //     if (mood >= 6) return <Meh className="w-6 h-6 text-yellow-500" />
// //     return <Frown className="w-6 h-6 text-red-500" />
// //   }

// //   const getMoodColor = (mood: number) => {
// //     if (mood >= 8) return "text-green-600"
// //     if (mood >= 6) return "text-yellow-600"
// //     return "text-red-600"
// //   }

// //   const getWellnessScore = () => {
// //     if (!todayMood) return 0
// //     const score = (todayMood.mood + todayMood.energy + (10 - todayMood.anxiety) + Math.min(todayMood.sleep, 8)) / 4
// //     return Math.round(score * 10)
// //   }

// //   const getWeeklyAverage = () => {
// //     if (moodData.length === 0) return 0
// //     const recentData = moodData.slice(-7)
// //     const avgMood = recentData.reduce((sum, entry) => sum + entry.mood, 0) / recentData.length
// //     return Math.round(avgMood * 10) / 10
// //   }

// //   const formatTimeAgo = (dateString: string) => {
// //     const now = new Date()
// //     const alertTime = new Date(dateString)
// //     const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60))
// //     if (diffInMinutes < 1) return "Just now"
// //     if (diffInMinutes < 60) return `${diffInMinutes}m ago`
// //     const diffInHours = Math.floor(diffInMinutes / 60)
// //     if (diffInHours < 24) return `${diffInHours}h ago`
// //     return alertTime.toLocaleDateString()
// //   }

// //   const getPriorityColor = (priority: string) => {
// //     switch (priority) {
// //       case "critical":
// //         return "bg-red-500 text-white"
// //       case "high":
// //         return "bg-orange-500 text-white"
// //       case "medium":
// //         return "bg-yellow-500 text-black"
// //       default:
// //         return "bg-gray-500 text-white"
// //     }
// //   }

// //   const getStatusColor = (status: string) => {
// //     switch (status) {
// //       case "pending":
// //         return "bg-yellow-500 text-white"
// //       case "accepted":
// //         return "bg-green-500 text-white"
// //       case "declined":
// //         return "bg-red-500 text-white"
// //       case "cancelled":
// //         return "bg-gray-500 text-white"
// //       case "no_response_all_contacted":
// //         return "bg-red-700 text-white"
// //       default:
// //         return "bg-gray-500 text-white"
// //     }
// //   }

// //   const formatLocationAddress = (address: any) => {
// //     if (!address) return "Location not available"
// //     const parts = [
// //       address.area,
// //       address.village || address.townOrVillage,
// //       address.subDistrict || address.taluka,
// //       address.district,
// //       address.state || "Gujarat",
// //       address.pincode,
// //     ].filter(Boolean)
// //     return parts.join(", ")
// //   }

// //   const openGoogleMaps = (address: any) => {
// //     if (!address) {
// //       toast.error("Location not available")
// //       return
// //     }
// //     const searchQuery = formatLocationAddress(address)
// //     const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
// //     window.open(googleMapsUrl, "_blank")
// //     toast.success("🗺️ Opening location in Google Maps...")
// //   }

// //   const getAuthorIcon = (authorType: string) => {
// //     return authorType === "Doctor" ? (
// //       <Stethoscope className="w-5 h-5 text-green-600" />
// //     ) : (
// //       <Building2 className="w-5 h-5 text-purple-600" />
// //     )
// //   }

// //   const getAuthorBadgeColor = (authorType: string) => {
// //     return authorType === "Doctor"
// //       ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
// //       : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
// //   }

// //   if (loading) {
// //     return (
// //       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
// //         <div className="text-center">
// //           <motion.div
// //             className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
// //             animate={{ rotate: 360 }}
// //             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// //           />
// //           <p className="text-gray-600 dark:text-gray-400 text-lg">Loading your wellness dashboard...</p>
// //         </div>
// //       </div>
// //     )
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
// //       {/* Location Prompt Dialog */}
// //       <Dialog open={showLocationPrompt} onOpenChange={setShowLocationPrompt}>
// //         <DialogContent className="max-w-md">
// //           <DialogHeader>
// //             <DialogTitle className="flex items-center space-x-2">
// //               <MapPin className="w-5 h-5 text-blue-500" />
// //               <span>Your Location Is Safe With Us</span>
// //             </DialogTitle>
// //           </DialogHeader>
// //           <div className="space-y-4 text-gray-700 dark:text-gray-300">
// //             <p>To connect you with the nearest hospital quickly during emergencies, we need your live location.</p>
// //             <ul className="list-disc list-inside space-y-1">
// //               <li>{"✅ We do not store your location permanently"}</li>
// //               <li>{"✅ We never share it with anyone else"}</li>
// //               <li>{"✅ It's used only to find nearby help in real-time"}</li>
// //             </ul>
// //             <p className="font-semibold">This is only for your safety — your privacy is 100% protected.</p>
// //             <p className="text-blue-600 dark:text-blue-400 font-medium">
// //               👉 Please tap “Allow” when your browser asks for permission.
// //             </p>
// //           </div>
// //           <div className="flex justify-end space-x-2 mt-4">
// //             <Button
// //               variant="outline"
// //               onClick={() => {
// //                 setShowLocationPrompt(false)
// //                 // User chose to proceed without live location, dashboard already loaded with existing data
// //               }}
// //             >
// //               Proceed Without Location
// //             </Button>
// //             <Button
// //               onClick={async () => {
// //                 setShowLocationPrompt(false) // Close prompt
// //                 setLoading(true) // Show loading again while re-fetching
// //                 await handleLocationRequest() // Retry requesting location
// //                 // Re-fetch all data after location attempt
// //                 await fetchUserProfileAndMoodData()
// //                 setTimeout(async () => {
// //                   await fetchEmergencyAlerts()
// //                 }, 1000)
// //                 setTimeout(async () => {
// //                   await fetchAllPosts()
// //                 }, 2000)
// //                 setTimeout(async () => {
// //                   await fetchHospitalsAndAnnouncements()
// //                   setLoading(false)
// //                 }, 3000)
// //               }}
// //             >
// //               Allow Location
// //             </Button>
// //           </div>
// //         </DialogContent>
// //       </Dialog>

// //       {/* Emergency Alert Notification */}
// //       <AnimatePresence>
// //         {showAlertNotification && currentAlert && (
// //           <motion.div
// //             initial={{ opacity: 0, y: -100 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             exit={{ opacity: 0, y: -100 }}
// //             className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
// //           >
// //             <Alert className="border-red-500 bg-red-50 dark:bg-red-900/20">
// //               <AlertTriangle className="h-4 w-4 text-red-600" />
// //               <AlertDescription className="flex items-center justify-between">
// //                 <div>
// //                   <p className="font-semibold text-red-800 dark:text-red-200">🚨 HIGH ALERT: No Hospital Response</p>
// //                   <p className="text-red-700 dark:text-red-300 text-sm">
// //                     Your emergency alert is still pending. Consider calling emergency services directly.
// //                   </p>
// //                   {currentAlert && (
// //                     <p className="text-xs text-red-600 dark:text-red-400 mt-1">
// //                       User: {currentAlert.userInfo?.name || userProfile?.name || "Unknown"} | Phone:{" "}
// //                       {currentAlert.userInfo?.phone || userProfile?.phone || "Unknown"}
// //                     </p>
// //                   )}
// //                 </div>
// //                 <Button variant="ghost" size="sm" onClick={dismissAlert} className="text-red-600 hover:text-red-800">
// //                   <CheckCircle className="w-4 h-4" />
// //                 </Button>
// //               </AlertDescription>
// //             </Alert>
// //           </motion.div>
// //         )}
// //       </AnimatePresence>

// //       {/* Header with Animated Icons */}
// //       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
// //         <AnimatedHealthIcons />
// //         <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
// //           <div className="flex items-center space-x-4">
// //             <motion.div
// //               className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg"
// //               animate={{
// //                 scale: [1, 1.1, 1],
// //                 rotate: [0, 5, -5, 0],
// //               }}
// //               transition={{
// //                 duration: 3,
// //                 repeat: Number.POSITIVE_INFINITY,
// //                 ease: "easeInOut",
// //               }}
// //             >
// //               <Heart className="w-6 h-6 text-white" />
// //             </motion.div>
// //             <div>
// //               <h1 className="text-xl font-bold text-gray-900 dark:text-white">RuralReach</h1>
// //               <p className="text-sm text-gray-600 dark:text-gray-400">Your Wellness Dashboard</p>
// //             </div>
// //           </div>
// //           <div className="flex items-center space-x-4">
// //             {/* Hospital Info Button */}
// //             <Dialog open={showHospitalInfo} onOpenChange={setShowHospitalInfo}>
// //               <DialogTrigger asChild>
// //                 <motion.button
// //                   whileHover={{ scale: 1.05 }}
// //                   whileTap={{ scale: 0.95 }}
// //                   className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
// //                 >
// //                   <Building2 className="w-4 h-4" />
// //                   <span className="text-sm font-medium">Hospital Info</span>
// //                 </motion.button>
// //               </DialogTrigger>
// //               <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
// //                 <DialogHeader>
// //                   <DialogTitle className="flex items-center space-x-2">
// //                     <Building2 className="w-5 h-5 text-purple-600" />
// //                     <span>Connected Hospitals</span>
// //                   </DialogTitle>
// //                 </DialogHeader>
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
// //                   {hospitals.map((hospital) => (
// //                     <motion.div
// //                       key={hospital._id}
// //                       initial={{ opacity: 0, y: 20 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
// //                     >
// //                       <div className="flex items-start justify-between mb-3">
// //                         <div className="flex items-center space-x-2">
// //                           <Building2 className="w-5 h-5 text-purple-600" />
// //                           <h3 className="font-semibold text-lg">{hospital.name}</h3>
// //                           {hospital.isVerified && <Award className="w-4 h-4 text-green-500" />}
// //                         </div>
// //                         <div className="flex items-center space-x-2">
// //                           <Badge variant={hospital.isAvailable ? "default" : "secondary"}>
// //                             {hospital.isAvailable ? "Available" : "Unavailable"}
// //                           </Badge>
// //                           {hospital.isHandleEmergency && (
// //                             <Badge variant="destructive" className="text-xs">
// //                               Emergency 24/7
// //                             </Badge>
// //                           )}
// //                         </div>
// //                       </div>
// //                       <div className="space-y-2 text-sm">
// //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// //                           <Mail className="w-4 h-4" />
// //                           <span>{hospital.email}</span>
// //                         </div>
// //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// //                           <Phone className="w-4 h-4" />
// //                           <span>{hospital.phone}</span>
// //                         </div>
// //                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
// //                           <MapPin className="w-4 h-4" />
// //                           <span>{hospital.address}</span>
// //                         </div>
// //                       </div>
// //                       <div className="mt-3">
// //                         <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties:</p>
// //                         <div className="flex flex-wrap gap-1">
// //                           {hospital.specialties.map((specialty, index) => (
// //                             <Badge key={index} variant="outline" className="text-xs">
// //                               {specialty}
// //                             </Badge>
// //                           ))}
// //                         </div>
// //                       </div>
// //                       <div className="mt-3 pt-3 border-t">
// //                         <p className="text-xs text-gray-500">
// //                           Joined: {new Date(hospital.createdAt).toLocaleDateString()}
// //                         </p>
// //                       </div>
// //                     </motion.div>
// //                   ))}
// //                 </div>
// //               </DialogContent>
// //             </Dialog>
// //             <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
// //               <Clock className="w-4 h-4" />
// //               <span>Last checked: {lastAlertCheck.toLocaleTimeString()}</span>
// //             </div>
// //             <Button
// //               variant="outline"
// //               size="sm"
// //               onClick={() => currentAlert?._id && checkAlertStatus(currentAlert._id)} // Pass alertId if available
// //               className="flex items-center space-x-2 bg-transparent"
// //             >
// //               <RefreshCw className="w-4 h-4" />
// //               <span>Refresh</span>
// //             </Button>
// //             <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
// //               <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
// //               {unreadAnnouncementsCount > 0 && (
// //                 <motion.span
// //                   className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
// //                   animate={{ scale: [1, 1.2, 1] }}
// //                   transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
// //                 >
// //                   {unreadAnnouncementsCount}
// //                 </motion.span>
// //               )}
// //             </motion.div>
// //             <ThemeToggle />
// //             <UserDropdown />
// //           </div>
// //         </div>
// //       </header>
// //       <div className="container mx-auto px-6 py-8">
// //         {/* Welcome Section */}
// //         <motion.div
// //           className="mb-8"
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6 }}
// //         >
// //           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user?.name}! 👋</h2>
// //           <p className="text-gray-600 dark:text-gray-400">
// //             How are you feeling today? Let's track your wellness journey and stay healthy together.
// //           </p>
// //         </motion.div>

// //         {/* Emergency SOS Button - Always Available */}
// //         <motion.div
// //           className="mb-8"
// //           initial={{ opacity: 0, scale: 0.9 }}
// //           animate={{ opacity: 1, scale: 1 }}
// //           transition={{ duration: 0.6, delay: 0.1 }}
// //         >
// //           <Card className="border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
// //             <CardContent className="p-6">
// //               <div className="flex items-center justify-between">
// //                 <div className="flex items-center space-x-4">
// //                   <motion.div
// //                     className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
// //                     animate={{
// //                       boxShadow: [
// //                         "0 0 0 0 rgba(239, 68, 68, 0.7)",
// //                         "0 0 0 10px rgba(239, 68, 68, 0)",
// //                         "0 0 0 0 rgba(239, 68, 68, 0)",
// //                       ],
// //                     }}
// //                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// //                   >
// //                     <AlertTriangle className="w-6 h-6 text-white" />
// //                   </motion.div>
// //                   <div>
// //                     <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Quick Emergency Support</h3>
// //                     <p className="text-red-600 dark:text-red-300">Need immediate help? Press for instant alert</p>
// //                     {userProfile?.address?.geoLocation?.lat && userProfile?.address?.geoLocation?.lng ? (
// //                       <p className="text-xs text-red-500 dark:text-red-400 mt-1">
// //                         📍 Location: {userProfile.address.geoLocation.lat.toFixed(4)},{" "}
// //                         {userProfile.address.geoLocation.lng.toFixed(4)} (from profile)
// //                       </p>
// //                     ) : location ? (
// //                       <p className="text-xs text-red-500 dark:text-red-400 mt-1">
// //                         📍 Live Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)} (current session)
// //                       </p>
// //                     ) : (
// //                       <p className="text-xs text-red-500 dark:text-red-400 mt-1">
// //                         📍 Location: Not available (please enable location services or reload the page)
// //                       </p>
// //                     )}
// //                     {emergencyButtonDisabled && (
// //                       <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
// //                         ⚠️ Emergency alert already sent. Waiting for hospital response...
// //                       </p>
// //                     )}
// //                   </div>
// //                 </div>
// //                 <motion.div
// //                   whileHover={{ scale: emergencyButtonDisabled ? 1 : 1.05 }}
// //                   whileTap={{ scale: emergencyButtonDisabled ? 1 : 0.95 }}
// //                 >
// //                   <Button
// //                     onClick={handleEmergencySOS}
// //                     disabled={isEmergencyActive || emergencyButtonDisabled}
// //                     className={`font-bold px-8 py-3 text-lg shadow-lg transition-all duration-300 ${
// //                       emergencyButtonDisabled
// //                         ? "bg-gray-400 cursor-not-allowed"
// //                         : "bg-red-600 hover:bg-red-700 hover:shadow-xl"
// //                     } text-white`}
// //                   >
// //                     {isEmergencyActive
// //                       ? "🚨 Sending..."
// //                       : emergencyButtonDisabled
// //                         ? "🚨 Alert Sent"
// //                         : "🆘 SOS Emergency"}
// //                   </Button>
// //                 </motion.div>
// //               </div>
// //             </CardContent>
// //           </Card>
// //         </motion.div>

// //         {/* Emergency Status Banner */}
// //         {alertStatus && (
// //           <motion.div
// //             className="mb-8"
// //             initial={{ opacity: 0, scale: 0.9 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             transition={{ duration: 0.6, delay: 0.1 }}
// //           >
// //             <Card
// //               className={`border-2 ${
// //                 alertStatus === "pending"
// //                   ? "border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
// //                   : alertStatus === "accepted"
// //                     ? "border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
// //                     : alertStatus === "no_response_all_contacted"
// //                       ? "border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20"
// //                       : "border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20" // For 'declined' or 'cancelled'
// //               }`}
// //             >
// //               <CardContent className="p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div className="flex items-center space-x-4">
// //                     <motion.div
// //                       className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
// //                         alertStatus === "pending"
// //                           ? "bg-yellow-500"
// //                           : alertStatus === "accepted"
// //                             ? "bg-green-500"
// //                             : alertStatus === "no_response_all_contacted"
// //                               ? "bg-red-500"
// //                               : "bg-red-500" // For 'declined' or 'cancelled'
// //                       }`}
// //                       animate={{
// //                         boxShadow:
// //                           alertStatus === "pending"
// //                             ? [
// //                                 "0 0 0 0 rgba(234, 179, 8, 0.7)",
// //                                 "0 0 0 10px rgba(234, 179, 8, 0)",
// //                                 "0 0 0 0 rgba(234, 179, 8, 0)",
// //                               ]
// //                             : undefined,
// //                       }}
// //                       transition={{ duration: 2, repeat: alertStatus === "pending" ? Number.POSITIVE_INFINITY : 0 }}
// //                     >
// //                       {alertStatus === "pending" ? (
// //                         <Timer className="w-6 h-6 text-white" />
// //                       ) : alertStatus === "accepted" ? (
// //                         <CheckCircle className="w-6 h-6 text-white" />
// //                       ) : (
// //                         <XCircle className="w-6 h-6 text-white" />
// //                       )}
// //                     </motion.div>
// //                     <div>
// //                       <h3
// //                         className={`text-lg font-semibold ${
// //                           alertStatus === "pending"
// //                             ? "text-yellow-800 dark:text-yellow-200"
// //                             : alertStatus === "accepted"
// //                               ? "text-green-800 dark:text-green-200"
// //                               : "text-red-800 dark:text-red-200"
// //                         }`}
// //                       >
// //                         {alertStatus === "pending" && "🚨 Emergency Alert Sent"}
// //                         {alertStatus === "accepted" && "✅ Hospital is Coming!"}
// //                         {alertStatus === "declined" && "❌ Alert Declined"}
// //                         {alertStatus === "cancelled" && "🚫 Alert Cancelled"}
// //                         {alertStatus === "no_response_all_contacted" && "🚨 No Hospital Response"}
// //                       </h3>
// //                       <p
// //                         className={`${
// //                           alertStatus === "pending"
// //                             ? "text-yellow-600 dark:text-yellow-300"
// //                             : alertStatus === "accepted"
// //                               ? "text-green-600 dark:text-green-300"
// //                               : "text-red-600 dark:text-red-300"
// //                         }`}
// //                       >
// //                         {alertStatus === "pending" && "Waiting for hospital response..."}
// //                         {alertStatus === "accepted" && "A hospital has accepted your emergency request"}
// //                         {alertStatus === "declined" && "Your emergency request was declined"}
// //                         {alertStatus === "cancelled" && "You have cancelled this emergency alert."}
// //                         {alertStatus === "no_response_all_contacted" &&
// //                           "No nearby hospitals could respond. Please call emergency services directly."}
// //                       </p>
// //                     </div>
// //                   </div>
// //                   {(alertStatus === "pending" || alertStatus === "no_response_all_contacted") && (
// //                     <Button onClick={dismissAlert} variant="outline" className="font-bold px-6 py-2 bg-transparent">
// //                       Dismiss
// //                     </Button>
// //                   )}
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </motion.div>
// //         )}

// //         {/* Quick Stats */}
// //         <motion.div
// //           className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6, delay: 0.2 }}
// //         >
// //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// //             <Card className="hover:shadow-lg transition-all duration-300">
// //               <CardContent className="p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">Wellness Score</p>
// //                     <p className="text-2xl font-bold text-blue-600">{getWellnessScore()}%</p>
// //                     <p className="text-xs text-gray-500 mt-1">Based on today's data</p>
// //                   </div>
// //                   <motion.div
// //                     className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
// //                     animate={{ rotate: [0, 360] }}
// //                     transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// //                   >
// //                     <Target className="w-6 h-6 text-blue-600" />
// //                   </motion.div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </motion.div>
// //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// //             <Card className="hover:shadow-lg transition-all duration-300">
// //               <CardContent className="p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">Today's Mood</p>
// //                     <div className="flex items-center space-x-2">
// //                       {todayMood ? getMoodIcon(todayMood.mood) : <Meh className="w-6 h-6 text-gray-400" />}
// //                       <span
// //                         className={`text-lg font-semibold ${todayMood ? getMoodColor(todayMood.mood) : "text-gray-400"}`}
// //                       >
// //                         {todayMood?.mood || "Not set"}
// //                       </span>
// //                     </div>
// //                     <p className="text-xs text-gray-500 mt-1">Out of 10</p>
// //                   </div>
// //                   <motion.div
// //                     className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
// //                     animate={{
// //                       scale: [1, 1.1, 1],
// //                       rotate: [0, 10, -10, 0],
// //                     }}
// //                     transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
// //                   >
// //                     <Brain className="w-6 h-6 text-green-600" />
// //                   </motion.div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </motion.div>
// //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// //             <Card className="hover:shadow-lg transition-all duration-300">
// //               <CardContent className="p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">Sleep Last Night</p>
// //                     <p className="text-2xl font-bold text-purple-600">{todayMood?.sleep || 0}h</p>
// //                     <p className="text-xs text-gray-500 mt-1">
// //                       {(todayMood?.sleep || 0) >= 7 ? "Good sleep!" : "Need more rest"}
// //                     </p>
// //                   </div>
// //                   <motion.div
// //                     className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
// //                     animate={{
// //                       y: [0, -5, 0],
// //                       opacity: [1, 0.7, 1],
// //                     }}
// //                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
// //                   >
// //                     <Moon className="w-6 h-6 text-purple-600" />
// //                   </motion.div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </motion.div>
// //           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
// //             <Card className="hover:shadow-lg transition-all duration-300">
// //               <CardContent className="p-6">
// //                 <div className="flex items-center justify-between">
// //                   <div>
// //                     <p className="text-sm text-gray-600 dark:text-gray-400">Energy Level</p>
// //                     <p className="text-2xl font-bold text-orange-600">{todayMood?.energy || 0}/10</p>
// //                     <p className="text-xs text-gray-500 mt-1">Weekly avg: {getWeeklyAverage()}</p>
// //                   </div>
// //                   <motion.div
// //                     className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center"
// //                     animate={{
// //                       scale: [1, 1.2, 1],
// //                       rotate: [0, 180, 360],
// //                     }}
// //                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// //                   >
// //                     <Zap className="w-6 h-6 text-orange-600" />
// //                   </motion.div>
// //                 </div>
// //               </CardContent>
// //             </Card>
// //           </motion.div>
// //         </motion.div>

// //         {/* Main Content Tabs */}
// //         <motion.div
// //           initial={{ opacity: 0, y: 20 }}
// //           animate={{ opacity: 1, y: 0 }}
// //           transition={{ duration: 0.6, delay: 0.3 }}
// //         >
// //           <Tabs defaultValue="mood" className="space-y-6">
// //             <TabsList className="grid w-full grid-cols-5">
// //               <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
// //               <TabsTrigger value="posts">Posts</TabsTrigger>
// //               <TabsTrigger value="announcements">Announcements</TabsTrigger>
// //               <TabsTrigger value="emergency">Emergency Alert</TabsTrigger>
// //               <TabsTrigger value="past-alerts">Past Alerts</TabsTrigger>
// //               <TabsTrigger value="assessment">Self Assessment</TabsTrigger>
// //             </TabsList>

// //             {/* Mood Tracking Tab */}
// //             <TabsContent value="mood" className="space-y-6">
// //               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
// //                 {/* Today's Mood Entry */}
// //                 <Card className="hover:shadow-lg transition-shadow duration-300">
// //                   <CardHeader>
// //                     <CardTitle className="flex items-center space-x-2">
// //                       <Plus className="w-5 h-5" />
// //                       <span>Log Today's Mood</span>
// //                     </CardTitle>
// //                   </CardHeader>
// //                   <CardContent className="space-y-6">
// //                     <div>
// //                       <label className="block text-sm font-medium mb-2">Mood (1-10)</label>
// //                       <div className="flex items-center space-x-4">
// //                         <input
// //                           type="range"
// //                           min="1"
// //                           max="10"
// //                           value={currentMood}
// //                           onChange={(e) => setCurrentMood(Number(e.target.value))}
// //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// //                         />
// //                         <div className="flex items-center space-x-2">
// //                           {getMoodIcon(currentMood)}
// //                           <span className="text-lg font-semibold w-8">{currentMood}</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium mb-2">Energy Level (1-10)</label>
// //                       <div className="flex items-center space-x-4">
// //                         <input
// //                           type="range"
// //                           min="1"
// //                           max="10"
// //                           value={currentEnergy}
// //                           onChange={(e) => setCurrentEnergy(Number(e.target.value))}
// //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// //                         />
// //                         <div className="flex items-center space-x-2">
// //                           <Zap className="w-5 h-5 text-orange-500" />
// //                           <span className="text-lg font-semibold w-8">{currentEnergy}</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium mb-2">Anxiety Level (1-10)</label>
// //                       <div className="flex items-center space-x-4">
// //                         <input
// //                           type="range"
// //                           min="1"
// //                           max="10"
// //                           value={currentAnxiety}
// //                           onChange={(e) => setCurrentAnxiety(Number(e.target.value))}
// //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// //                         />
// //                         <div className="flex items-center space-x-2">
// //                           <AlertTriangle className="w-5 h-5 text-red-500" />
// //                           <span className="text-lg font-semibold w-8">{currentAnxiety}</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium mb-2">Sleep Hours</label>
// //                       <div className="flex items-center space-x-4">
// //                         <input
// //                           type="range"
// //                           min="0"
// //                           max="12"
// //                           value={currentSleep}
// //                           onChange={(e) => setCurrentSleep(Number(e.target.value))}
// //                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
// //                         />
// //                         <div className="flex items-center space-x-2">
// //                           <Moon className="w-5 h-5 text-purple-500" />
// //                           <span className="text-lg font-semibold w-8">{currentSleep}h</span>
// //                         </div>
// //                       </div>
// //                     </div>
// //                     <div>
// //                       <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
// //                       <Textarea
// //                         value={moodNotes}
// //                         onChange={(e) => setMoodNotes(e.target.value)}
// //                         placeholder="How are you feeling today? Any specific thoughts or events?"
// //                         className="w-full"
// //                         rows={3}
// //                       />
// //                     </div>
// //                     <Button
// //                       onClick={saveMoodEntry}
// //                       className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
// //                     >
// //                       Save Mood Entry
// //                     </Button>
// //                   </CardContent>
// //                 </Card>
// //                 {/* Mood Chart */}
// //                 <Card className="hover:shadow-lg transition-shadow duration-300">
// //                   <CardHeader>
// //                     <CardTitle className="flex items-center space-x-2">
// //                       <BarChart3 className="w-5 h-5" />
// //                       <span>7-Day Mood Trend</span>
// //                     </CardTitle>
// //                   </CardHeader>
// //                   <CardContent>
// //                     {moodData.length > 0 ? (
// //                       <div className="space-y-4">
// //                         {moodData.slice(-7).map((entry, index) => (
// //                           <motion.div
// //                             key={index}
// //                             className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
// //                             initial={{ opacity: 0, x: -20 }}
// //                             animate={{ opacity: 1, x: 0 }}
// //                             transition={{ delay: index * 0.1 }}
// //                           >
// //                             <div className="flex items-center space-x-3">
// //                               <Calendar className="w-4 h-4 text-gray-500" />
// //                               <span className="text-sm text-gray-600 dark:text-gray-400">
// //                                 {new Date(entry.date).toLocaleDateString()}
// //                               </span>
// //                             </div>
// //                             <div className="flex items-center space-x-3">
// //                               {getMoodIcon(entry.mood)}
// //                               <Progress value={entry.mood * 10} className="w-20" />
// //                               <span className="text-sm font-medium w-12">{entry.mood}/10</span>
// //                             </div>
// //                           </motion.div>
// //                         ))}
// //                         <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
// //                           <div className="flex items-center justify-between">
// //                             <span className="text-sm text-blue-700 dark:text-blue-300">Weekly Average</span>
// //                             <div className="flex items-center space-x-2">
// //                               <TrendingUp className="w-4 h-4 text-blue-600" />
// //                               <span className="font-semibold text-blue-600">{getWeeklyAverage()}/10</span>
// //                             </div>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     ) : (
// //                       <div className="text-center py-8">
// //                         <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
// //                         <p className="text-gray-600 dark:text-gray-400">No mood data yet</p>
// //                         <p className="text-sm text-gray-500">Start tracking to see your trends</p>
// //                       </div>
// //                     )}
// //                   </CardContent>
// //                 </Card>
// //               </div>
// //             </TabsContent>

// //             {/* Combined Posts Tab */}
// //             <TabsContent value="posts" className="space-y-6">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center space-x-2">
// //                     <FileText className="w-5 h-5 text-blue-600" />
// //                     <span>Healthcare Posts</span>
// //                     <Badge variant="secondary">{allPosts.length} posts</Badge>
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   {allPosts.length > 0 ? (
// //                     <div className="space-y-6">
// //                       {allPosts.map((post, index) => (
// //                         <motion.div
// //                           key={post._id}
// //                           initial={{ opacity: 0, y: 20 }}
// //                           animate={{ opacity: 1, y: 0 }}
// //                           transition={{ delay: index * 0.1 }}
// //                           whileHover={{ scale: 1.01 }}
// //                           className="border rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
// //                         >
// //                           {/* Post Header */}
// //                           <div className="flex items-start justify-between mb-4">
// //                             <div className="flex items-center space-x-4">
// //                               <div
// //                                 className={`w-12 h-12 rounded-full flex items-center justify-center ${getAuthorBadgeColor(post.authorType)}`}
// //                               >
// //                                 {getAuthorIcon(post.authorType)}
// //                               </div>
// //                               <div>
// //                                 <div className="flex items-center space-x-2">
// //                                   <p className="font-semibold text-lg">
// //                                     {post.authorType === "Doctor" ? "Dr. " : "Hospital "}
// //                                     {post.postby || "Mahadev"}
// //                                   </p>
// //                                   <Badge className={getAuthorBadgeColor(post.authorType)}>{post.authorType}</Badge>
// //                                 </div>
// //                                 <p className="text-sm text-gray-500 dark:text-gray-400">
// //                                   {post.authorType === "Doctor" ? "Medical Professional" : "Healthcare Institution"}
// //                                 </p>
// //                                 {post.mentionedId && (
// //                                   <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
// //                                     mentioned {post.mentionedType === "Doctor" ? "Dr. " : ""}
// //                                     {post.mentionedId.name}
// //                                   </p>
// //                                 )}
// //                               </div>
// //                             </div>
// //                             <div className="flex items-center space-x-3">
// //                               <Badge variant="outline" className="capitalize">
// //                                 {post.category.replace("-", " ")}
// //                               </Badge>
// //                               <div className="flex items-center space-x-1 text-xs text-gray-500">
// //                                 <Clock className="w-3 h-3" />
// //                                 <span>{formatTimeAgo(post.createdAt)}</span>
// //                               </div>
// //                             </div>
// //                           </div>
// //                           {/* Post Content */}
// //                           <div className="mb-4">
// //                             <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">{post.title}</h3>
// //                             <div className="prose prose-gray dark:prose-invert max-w-none">
// //                               <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{post.content}</p>
// //                             </div>
// //                           </div>
// //                           {/* Tags */}
// //                           {post.tags.length > 0 && (
// //                             <div className="mb-4">
// //                               <div className="flex items-center space-x-2 mb-2">
// //                                 <Tag className="w-4 h-4 text-gray-500" />
// //                                 <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags:</span>
// //                               </div>
// //                               <div className="flex flex-wrap gap-2">
// //                                 {post.tags.map((tag, tagIndex) => (
// //                                   <Badge
// //                                     key={tagIndex}
// //                                     variant="secondary"
// //                                     className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
// //                                   >
// //                                     #{tag}
// //                                   </Badge>
// //                                 ))}
// //                               </div>
// //                             </div>
// //                           )}
// //                           {/* Post Actions */}
// //                           <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
// //                             <div className="flex items-center space-x-6">
// //                               <div className="flex items-center space-x-2 text-gray-600">
// //                                 <Eye className="w-5 h-5" />
// //                                 <span className="text-xs text-gray-500">Public post</span>
// //                               </div>
// //                             </div>
// //                             <div className="flex items-center space-x-2">
// //                               {post.isApproved && (
// //                                 <Badge variant="outline" className="text-green-600 border-green-200">
// //                                   <CheckCircle className="w-3 h-3 mr-1" />
// //                                   Verified
// //                                 </Badge>
// //                               )}
// //                             </div>
// //                           </div>
// //                         </motion.div>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     <div className="text-center py-16">
// //                       <FileText className="w-20 h-20 text-gray-400 mx-auto mb-6" />
// //                       <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
// //                         No posts available
// //                       </h3>
// //                       <p className="text-gray-500 mb-4">Healthcare posts from doctors and hospitals will appear here</p>
// //                       <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
// //                         <Stethoscope className="w-4 h-4" />
// //                         <span>Doctor posts</span>
// //                       </div>
// //                       <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
// //                       <div className="flex items-center space-x-2">
// //                         <Building2 className="w-4 h-4" />
// //                         <span>Hospital updates</span>
// //                       </div>
// //                     </div>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             </TabsContent>

// //             {/* Announcements Tab */}
// //             <TabsContent value="announcements" className="space-y-6">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center space-x-2">
// //                     <Megaphone className="w-5 h-5 text-blue-600" />
// //                     <span>All Announcements</span>
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   {allAnnouncements.length > 0 ? (
// //                     <div className="space-y-4">
// //                       {allAnnouncements.map((announcement, index) => (
// //                         <motion.div
// //                           key={announcement._id}
// //                           initial={{ opacity: 0, y: 20 }}
// //                           animate={{ opacity: 1, y: 0 }}
// //                           transition={{ delay: index * 0.1 }}
// //                           whileHover={{ scale: 1.01 }}
// //                           className={`border rounded-lg p-4 hover:shadow-md transition-all duration-300 ${
// //                             announcement.isRead ? "bg-gray-50 dark:bg-gray-800" : "bg-yellow-50 dark:bg-yellow-900/20"
// //                           }`}
// //                         >
// //                           <div className="flex items-start justify-between mb-3">
// //                             <div className="flex-1">
// //                               <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
// //                               <div className="flex items-center space-x-2 mb-2">
// //                                 <Badge variant="outline">{announcement.ownerType}</Badge>
// //                               </div>
// //                             </div>
// //                             <div className="flex items-center space-x-2">
// //                               <span className="text-xs text-gray-500">
// //                                 {new Date(announcement.createdAt).toLocaleDateString()}
// //                               </span>
// //                               {!announcement.isRead && (
// //                                 <Button
// //                                   variant="ghost"
// //                                   size="sm"
// //                                   onClick={() => handleMarkAnnouncementRead(announcement._id)}
// //                                   className="text-blue-600 hover:text-blue-800"
// //                                 >
// //                                   Mark as Read
// //                                 </Button>
// //                               )}
// //                             </div>
// //                           </div>
// //                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{announcement.content}</p>
// //                           <div className="flex items-center justify-between">
// //                             <div className="flex items-center space-x-2 text-gray-600">
// //                               <Eye className="w-4 h-4" />
// //                               <span className="text-sm">View details</span>
// //                             </div>
// //                           </div>
// //                         </motion.div>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     <div className="text-center py-12">
// //                       <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// //                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
// //                         No announcements yet
// //                       </h3>
// //                       <p className="text-gray-500">Announcements from doctors and hospitals will appear here.</p>
// //                     </div>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             </TabsContent>

// //             {/* Emergency Alert Tab - Form-based */}
// //             <TabsContent value="emergency" className="space-y-6">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center space-x-2">
// //                     <AlertTriangle className="w-5 h-5 text-red-500" />
// //                     <span>Detailed Emergency Alert</span>
// //                     {emergencyButtonDisabled && <Badge variant="destructive">Alert Active</Badge>}
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent className="space-y-6">
// //                   {!emergencyButtonDisabled ? (
// //                     <>
// //                       <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
// //                         <AlertTriangle className="h-4 w-4" />
// //                         <AlertDescription>
// //                           <strong>Emergency Use Only:</strong> This will immediately alert nearby hospitals with
// //                           detailed information.
// //                         </AlertDescription>
// //                       </Alert>
// //                       <div>
// //                         <label className="block text-sm font-medium mb-2">Describe your emergency *</label>
// //                         <Textarea
// //                           value={emergencyForm.message}
// //                           onChange={(e) => setEmergencyForm({ ...emergencyForm, message: e.target.value })}
// //                           placeholder="Please describe your medical emergency in detail..."
// //                           className="w-full min-h-[120px]"
// //                         />
// //                       </div>
// //                       <div>
// //                         <label className="block text-sm font-medium mb-2">Priority Level</label>
// //                         <Select
// //                           value={emergencyForm.priority}
// //                           onValueChange={(value) => setEmergencyForm({ ...emergencyForm, priority: value })}
// //                         >
// //                           <SelectTrigger>
// //                             <SelectValue />
// //                           </SelectTrigger>
// //                           <SelectContent>
// //                             <SelectItem value="critical">🔴 Critical - Life threatening</SelectItem>
// //                             <SelectItem value="high">🟠 High - Urgent medical attention</SelectItem>
// //                             <SelectItem value="medium">🟡 Medium - Medical assistance needed</SelectItem>
// //                           </SelectContent>
// //                         </Select>
// //                       </div>
// //                       <Button
// //                         onClick={handleFormEmergencyAlert}
// //                         disabled={isEmergencyActive || !emergencyForm.message.trim()}
// //                         className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg"
// //                       >
// //                         {isEmergencyActive ? (
// //                           <>
// //                             <motion.div
// //                               className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
// //                               animate={{ rotate: 360 }}
// //                               transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
// //                             />
// //                             Sending Emergency Alert...
// //                           </>
// //                         ) : (
// //                           <>
// //                             <Send className="w-5 h-5 mr-2" />
// //                             Send Detailed Emergency Alert
// //                           </>
// //                         )}
// //                       </Button>
// //                     </>
// //                   ) : (
// //                     <div className="text-center py-12">
// //                       <motion.div
// //                         className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
// //                         animate={{
// //                           boxShadow: [
// //                             "0 0 0 0 rgba(234, 179, 8, 0.7)",
// //                             "0 0 0 20px rgba(234, 179, 8, 0)",
// //                             "0 0 0 0 rgba(234, 179, 8, 0)",
// //                           ],
// //                         }}
// //                         transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
// //                       >
// //                         <Timer className="w-8 h-8 text-white" />
// //                       </motion.div>
// //                       <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
// //                         Emergency Alert Active
// //                       </h3>
// //                       <p className="text-yellow-600 dark:text-yellow-300 mb-4">
// //                         Your emergency alert has been sent to nearby hospitals. Please wait for their response.
// //                       </p>
// //                       <Button
// //                         onClick={dismissAlert}
// //                         variant="outline"
// //                         className="border-yellow-500 text-yellow-700 hover:bg-yellow-50 bg-transparent"
// //                       >
// //                         Dismiss Alert
// //                       </Button>
// //                     </div>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             </TabsContent>

// //             {/* Past Emergency Alerts Tab */}
// //             <TabsContent value="past-alerts" className="space-y-6">
// //               <Card>
// //                 <CardHeader>
// //                   <CardTitle className="flex items-center space-x-2">
// //                     <History className="w-5 h-5 text-blue-500" />
// //                     <span>Past Emergency Alert Requests</span>
// //                     <Badge variant="secondary">{emergencyAlerts.length} total</Badge>
// //                   </CardTitle>
// //                 </CardHeader>
// //                 <CardContent>
// //                   {emergencyAlerts.length > 0 ? (
// //                     <div className="space-y-4">
// //                       {emergencyAlerts.map((alert, index) => (
// //                         <motion.div
// //                           key={alert._id}
// //                           initial={{ opacity: 0, y: 20 }}
// //                           animate={{ opacity: 1, y: 0 }}
// //                           transition={{ delay: index * 0.1 }}
// //                           className={`border rounded-lg p-4 hover:shadow-md transition-all duration-300 ${
// //                             alert.status === "pending"
// //                               ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
// //                               : alert.status === "accepted"
// //                                 ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
// //                                 : alert.status === "cancelled"
// //                                   ? "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/20"
// //                                   : alert.status === "no_response_all_contacted"
// //                                     ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
// //                                     : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20" // For 'declined'
// //                           }`}
// //                         >
// //                           <div className="flex items-start justify-between">
// //                             <div className="flex-1">
// //                               <div className="flex items-center space-x-3 mb-3">
// //                                 <motion.div
// //                                   className={`w-3 h-3 rounded-full ${
// //                                     alert.status === "pending"
// //                                       ? "bg-yellow-500"
// //                                       : alert.status === "accepted"
// //                                         ? "bg-green-500"
// //                                         : alert.status === "cancelled"
// //                                           ? "bg-gray-500"
// //                                           : alert.status === "no_response_all_contacted"
// //                                             ? "bg-red-500"
// //                                             : "bg-red-500" // For 'declined'
// //                                   }`}
// //                                   animate={{ scale: alert.status === "pending" ? [1, 1.2, 1] : 1 }}
// //                                   transition={{
// //                                     duration: 1,
// //                                     repeat: alert.status === "pending" ? Number.POSITIVE_INFINITY : 0,
// //                                   }}
// //                                 />
// //                                 <h3 className="font-semibold text-lg">Emergency Alert</h3>
// //                                 <Badge className={getPriorityColor(alert.priority)}>
// //                                   {alert.priority.toUpperCase()}
// //                                 </Badge>
// //                                 <Badge className={getStatusColor(alert.status)}>{alert.status.toUpperCase()}</Badge>
// //                               </div>
// //                               <div className="mb-4">
// //                                 <h4 className="font-medium text-gray-900 dark:text-white mb-2">Emergency Message</h4>
// //                                 <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
// //                                   {alert.message}
// //                                 </p>
// //                               </div>
// //                               {alert.location?.address && (
// //                                 <div className="mb-4">
// //                                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Location</h4>
// //                                   <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
// //                                     <div className="flex items-start space-x-2">
// //                                       <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
// //                                       <div className="flex-1">
// //                                         <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
// //                                           📍 {formatLocationAddress(alert.location.address)}
// //                                         </p>
// //                                         <Button
// //                                           onClick={() => openGoogleMaps(alert.location?.address)}
// //                                           size="sm"
// //                                           className="bg-blue-600 hover:bg-blue-700 text-white"
// //                                         >
// //                                           <Map className="w-3 h-3 mr-1" />
// //                                           View on Map
// //                                           <ExternalLink className="w-3 h-3 ml-1" />
// //                                         </Button>
// //                                       </div>
// //                                     </div>
// //                                   </div>
// //                                 </div>
// //                               )}
// //                               {alert.acceptedBy && (
// //                                 <div className="mb-4">
// //                                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hospital Response</h4>
// //                                   <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
// //                                     <div className="flex items-center space-x-2">
// //                                       <CheckCircle className="w-4 h-4 text-green-500" />
// //                                       <span className="font-medium text-green-800 dark:text-green-200">
// //                                         Accepted by {alert.acceptedBy.name}
// //                                       </span>
// //                                     </div>
// //                                     <p className="text-sm text-green-700 dark:text-green-300 mt-1">
// //                                       Contact: {alert.acceptedBy.phone}
// //                                     </p>
// //                                   </div>
// //                                 </div>
// //                               )}
// //                               <div className="flex items-center justify-between">
// //                                 <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
// //                                   <Timer className="w-4 h-4" />
// //                                   <span>{formatTimeAgo(alert.createdAt)}</span>
// //                                 </div>
// //                                 {/* Removed delete button as per user request */}
// //                                 {/* <Button
// //                                   size="sm"
// //                                   variant="outline"
// //                                   onClick={() => handleDeleteAlert(alert._id)}
// //                                   className="text-red-600 hover:text-red-800 hover:bg-red-50"
// //                                 >
// //                                   <Trash2 className="w-4 h-4 mr-1" />
// //                                   Delete
// //                                 </Button> */}
// //                               </div>
// //                             </div>
// //                           </div>
// //                         </motion.div>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     <div className="text-center py-12">
// //                       <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
// //                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
// //                         No Past Alert Requests
// //                       </h3>
// //                       <p className="text-gray-500">You haven't sent any emergency alerts yet</p>
// //                     </div>
// //                   )}
// //                 </CardContent>
// //               </Card>
// //             </TabsContent>

// //             {/* Self Assessment Tab */}
// //             <TabsContent value="assessment" className="space-y-6">
// //               {currentAssessment ? (
// //                 currentAssessment === "phq9" ? (
// //                   <PHQ9Assessment
// //                     onComplete={(result) => {
// //                       setAssessmentResult(result)
// //                       setCurrentAssessment("results")
// //                     }}
// //                     onBack={() => setCurrentAssessment(null)}
// //                   />
// //                 ) : currentAssessment === "gad7" ? (
// //                   <GAD7Assessment
// //                     onComplete={(result) => {
// //                       setAssessmentResult(result)
// //                       setCurrentAssessment("results")
// //                     }}
// //                     onBack={() => setCurrentAssessment(null)}
// //                   />
// //                 ) : currentAssessment === "results" ? (
// //                   <AssessmentResults
// //                     type={assessmentType}
// //                     result={assessmentResult}
// //                     onBack={() => setCurrentAssessment(null)}
// //                     onReturnToDashboard={() => {
// //                       setCurrentAssessment(null)
// //                       setAssessmentResult(null)
// //                       setAssessmentType("")
// //                     }}
// //                   />
// //                 ) : null
// //               ) : (
// //                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
// //                   {[
// //                     {
// //                       icon: Brain,
// //                       title: "Depression Assessment (PHQ-9)",
// //                       desc: "A 9-question assessment to help identify symptoms of depression and track your mental health.",
// //                       color: "blue",
// //                       type: "phq9",
// //                     },
// //                     {
// //                       icon: AlertTriangle,
// //                       title: "Anxiety Assessment (GAD-7)",
// //                       desc: "A 7-question screening tool for generalized anxiety disorder and anxiety symptoms.",
// //                       color: "yellow",
// //                       type: "gad7",
// //                     },
// //                     {
// //                       icon: Zap,
// //                       title: "Stress Level Check",
// //                       desc: "Quick assessment to understand your current stress levels and get personalized recommendations.",
// //                       color: "red",
// //                       type: "stress",
// //                       disabled: true,
// //                     },
// //                     {
// //                       icon: Heart,
// //                       title: "General Wellness Check",
// //                       desc: "Comprehensive wellness assessment covering multiple areas of your physical and mental health.",
// //                       color: "green",
// //                       type: "wellness",
// //                       disabled: true,
// //                     },
// //                   ].map((assessment, index) => (
// //                     <motion.div
// //                       key={index}
// //                       initial={{ opacity: 0, y: 20 }}
// //                       animate={{ opacity: 1, y: 0 }}
// //                       transition={{ delay: index * 0.1 }}
// //                       whileHover={{ scale: assessment.disabled ? 1 : 1.02, y: assessment.disabled ? 0 : -5 }}
// //                     >
// //                       <Card
// //                         className={`hover:shadow-lg transition-all duration-300 ${assessment.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer group"}`}
// //                       >
// //                         <CardHeader>
// //                           <CardTitle className="flex items-center space-x-2">
// //                             <assessment.icon className={`w-5 h-5 text-${assessment.color}-500`} />
// //                             <span>{assessment.title}</span>
// //                             {assessment.disabled && <Badge variant="secondary">Coming Soon</Badge>}
// //                           </CardTitle>
// //                         </CardHeader>
// //                         <CardContent>
// //                           <p className="text-gray-600 dark:text-gray-300 mb-4">{assessment.desc}</p>
// //                           <Button
// //                             className={`w-full ${assessment.disabled ? "cursor-not-allowed" : `group-hover:bg-${assessment.color}-600`}`}
// //                             disabled={assessment.disabled}
// //                             onClick={() => {
// //                               if (!assessment.disabled) {
// //                                 setAssessmentType(assessment.type)
// //                                 setCurrentAssessment(assessment.type)
// //                               }
// //                             }}
// //                           >
// //                             {assessment.disabled ? "Coming Soon" : "Start Assessment"}
// //                           </Button>
// //                         </CardContent>
// //                       </Card>
// //                     </motion.div>
// //                   ))}
// //                 </div>
// //               )}
// //             </TabsContent>
// //           </Tabs>
// //         </motion.div>
// //       </div>
// //     </div>
// //   )
// // }

















// "use client"
// import { useState, useEffect } from "react"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   Heart,
//   AlertTriangle,
//   Brain,
//   Target,
//   Zap,
//   Moon,
//   Smile,
//   Frown,
//   Meh,
//   Plus,
//   BarChart3,
//   TrendingUp,
//   Calendar,
//   Clock,
//   Building2,
//   Stethoscope,
//   MapPin,
//   Phone,
//   Mail,
//   Award,
//   CheckCircle,
//   Send,
//   History,
//   Timer,
//   Map,
//   ExternalLink,
//   RefreshCw,
//   XCircle,
//   FileText,
//   Tag,
//   Eye,
//   Megaphone,
//   Bell,
//   Trash2,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Progress } from "@/components/ui/progress"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Textarea } from "@/components/ui/textarea"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { useAuth } from "@/app/contexts/AuthProvider"
// import ThemeToggle from "@/components/ThemeToggle"
// import UserDropdown from "@/components/UserDropdown"
// import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
// import { toast } from "react-hot-toast"
// import PHQ9Assessment from "@/components/assessments/PHQ9Assessment"
// import GAD7Assessment from "@/components/assessments/GAD7Assessment"
// import AssessmentResults from "@/components/assessments/AssessmentResults"
// import Swal from "sweetalert2" // Import SweetAlert2

// interface MoodData {
//   date: string
//   mood: number
//   energy: number
//   anxiety: number
//   sleep: number
//   notes?: string
// }

// interface EmergencyAlert {
//   _id: string
//   status: string
//   priority: string
//   createdAt: string
//   message: string
//   userInfo: {
//     name: string
//     email: string
//     phone: string
//   }
//   location?: {
//     lat?: number
//     lng?: number
//     address?: {
//       street?: string
//       area?: string
//       townOrVillage?: string
//       taluka?: string
//       district?: string
//       pincode?: string
//       state?: string
//       geoLocation?: {
//         lat?: number
//         lng?: number
//       }
//     }
//   }
//   acceptedBy?: {
//     _id: string
//     name: string
//     phone: string
//     distance?: number // Added distance here
//   }
//   isRead?: boolean
// }

// interface Post {
//   _id: string
//   title: string
//   content: string
//   category: string
//   tags: string[]
//   authorId: {
//     _id: string
//     name: string
//   }
//   authorType: string
//   mentionedId?: {
//     _id: string
//     name: string
//   }
//   mentionedType?: string
//   createdAt: string
//   postby: string
//   isApproved: boolean
// }

// interface Hospital {
//   _id: string
//   name: string
//   email: string
//   phone: string
//   address: string
//   specialties: string[]
//   isVerified: boolean
//   isAvailable: boolean
//   isHandleEmergency: boolean
//   createdAt: string
//   distance?: number
// }

// interface UserProfile {
//   _id: string
//   name: string
//   email: string
//   phone: string
//   address: {
//     street: string
//     area: string
//     village: string // Renamed from townOrVillage
//     subDistrict: string // Renamed from taluka
//     district: string
//     pincode: string
//     state: string
//     geoLocation?: {
//       // Added this based on the provided schema
//       lat?: number
//       lng?: number
//     }
//   }
//   emergencyContacts: Array<{
//     name: string
//     phone: string
//     relation: string
//   }>
//   medicalInfo: {
//     bloodGroup: string
//     allergies: string[]
//     medications: string[]
//     conditions: string[]
//   }
// }

// interface Announcement {
//   _id: string
//   title: string
//   content: string
//   ownerId: string
//   ownerType: "doctor" | "hospital" | "user"
//   mentions: Array<{
//     id: string
//     name: string
//     type: "doctor" | "hospital"
//     email: string
//   }>
//   readBy: string[] // Array of user/doctor/hospital IDs who have read it
//   createdAt: string
//   isRead?: boolean // For mentions tab, indicates if *this* user has read it
// }

// export default function UserDashboard() {
//   const { user } = useAuth()
//   const [moodData, setMoodData] = useState<MoodData[]>([])
//   const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
//   const [allPosts, setAllPosts] = useState<Post[]>([])
//   const [hospitals, setHospitals] = useState<Hospital[]>([])
//   const [allAnnouncements, setAllAnnouncements] = useState<Announcement[]>([])
//   const [todayMood, setTodayMood] = useState<MoodData | null>(null)
//   const [isEmergencyActive, setIsEmergencyActive] = useState(false)
//   const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null) // Live location state
//   const [loading, setLoading] = useState(true)
//   const [showHospitalInfo, setShowHospitalInfo] = useState(false)
//   const [currentAlert, setCurrentAlert] = useState<EmergencyAlert | null>(null)
//   const [showAlertNotification, setShowAlertNotification] = useState(false)
//   const [alertTimer, setAlertTimer] = useState<NodeJS.Timeout | null>(null)
//   const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
//   const [emergencyButtonDisabled, setEmergencyButtonDisabled] = useState(false)
//   const [alertStatus, setAlertStatus] = useState<string | null>(null)
//   const [lastAlertCheck, setLastAlertCheck] = useState<Date>(new Date())
//   const [currentAssessment, setCurrentAssessment] = useState<string | null>(null)
//   const [assessmentResult, setAssessmentResult] = useState<any>(null)
//   const [assessmentType, setAssessmentType] = useState<string>("")
//   const [unreadAnnouncementsCount, setUnreadAnnouncementsCount] = useState(0)
//   const [showLocationPrompt, setShowLocationPrompt] = useState(false) // New state for location prompt
//   const [escalationCount, setEscalationCount] = useState(0) // Track escalation attempts

//   // Mood tracking state
//   const [currentMood, setCurrentMood] = useState(5)
//   const [currentEnergy, setCurrentEnergy] = useState(5)
//   const [currentAnxiety, setCurrentAnxiety] = useState(5)
//   const [currentSleep, setCurrentSleep] = useState(8)
//   const [moodNotes, setMoodNotes] = useState("")

//   // Emergency form state
//   const [emergencyForm, setEmergencyForm] = useState({
//     message: "",
//     priority: "high",
//   })

//   // Helper to update location in DB
//   const updateLocationInDB = async (newLocation: { lat: number; lng: number }) => {
//     try {
//       const response = await fetch("/api/user/profile/update-location", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ lat: newLocation.lat, lng: newLocation.lng }),
//       })
//       if (!response.ok) {
//         console.error("Failed to update location in DB")
//       }
//     } catch (error) {
//       console.error("Error updating location in DB:", error)
//     }
//   }

//   // Function to request location and handle prompt
//   const handleLocationRequest = async () => {
//     return new Promise<boolean>((resolve) => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           async (position) => {
//             const newLocation = {
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             }
//             setLocation(newLocation)
//             await updateLocationInDB(newLocation)
//             resolve(true) // Location granted and saved
//           },
//           (error) => {
//             if (error.code === error.PERMISSION_DENIED) {
//               setShowLocationPrompt(true) // Show the custom prompt
//               resolve(false) // Location denied, prompt shown
//             } else {
//               toast.error("Location access denied or error. Emergency alerts will use your registered address.")
//               resolve(false) // Other error, proceed without live location
//             }
//           },
//           { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }, // Request fresh location
//         )
//       } else {
//         toast.error("Geolocation not supported by this browser. Emergency alerts will use your registered address.")
//         resolve(false) // Not supported
//       }
//     })
//   }

//   useEffect(() => {
//     const initDashboard = async () => {
//       setLoading(true)
//       // Attempt to get live location and update DB
//       await handleLocationRequest()

//       // Staggered fetching of dashboard data
//       // Fetch user profile and mood data first as they are core
//       await fetchUserProfileAndMoodData()

//       // Then fetch other data with delays
//       setTimeout(async () => {
//         await fetchEmergencyAlerts()
//       }, 1000) // 1 second delay

//       setTimeout(async () => {
//         await fetchAllPosts()
//       }, 2000) // 2 second delay

//       setTimeout(async () => {
//         await fetchHospitalsAndAnnouncements()
//         setLoading(false) // Set loading to false after all data is initiated
//       }, 3000) // 3 second delay
//     }

//     initDashboard()

//     // Polling for alerts (existing logic)
//     const interval = setInterval(() => {
//       if (currentAlert?._id) {
//         checkAlertStatus(currentAlert._id)
//       }
//     }, 10000)

//     return () => clearInterval(interval)
//   }, [currentAlert?._id]) // Dependency for polling

//   const fetchUserProfileAndMoodData = async () => {
//     try {
//       const [userProfileRes, moodRes] = await Promise.all([fetch("/api/user/profile"), fetch("/api/user/mood-data")])

//       if (userProfileRes.ok) {
//         const userProfileData = await userProfileRes.json()
//         if (userProfileData.user) {
//           setUserProfile(userProfileData.user)
//           // Initialize live location state from DB if available
//           if (userProfileData.user.address?.geoLocation?.lat && userProfileData.user.address?.geoLocation?.lng) {
//             setLocation({
//               lat: userProfileData.user.address.geoLocation.lat,
//               lng: userProfileData.user.address.geoLocation.lng,
//             })
//           }
//         }
//       }
//       if (moodRes.ok) {
//         const moodData = await moodRes.json()
//         setMoodData(moodData.data || [])
//         setTodayMood(moodData.today || null)
//       }
//     } catch (error) {
//       console.error("Error fetching user profile or mood data:", error)
//     }
//   }

//   const fetchEmergencyAlerts = async () => {
//     try {
//       const alertsRes = await fetch("/api/user/emergency-alerts")
//       if (alertsRes.ok) {
//         const alertsData = await alertsRes.json()
//         setEmergencyAlerts(alertsData.data || [])
//         const pendingAlerts =
//           alertsData.data?.filter(
//             (alert: EmergencyAlert) =>
//               (alert.status === "pending" || alert.status === "no_response_all_contacted") && !alert.acceptedBy,
//           ) || []

//         if (pendingAlerts.length > 0) {
//           setCurrentAlert(pendingAlerts[0])
//           setEmergencyButtonDisabled(true)
//           setAlertStatus(pendingAlerts[0].status) // Set alert status for banner
//         } else {
//           setCurrentAlert(null) // Clear current alert if no pending ones
//           setEmergencyButtonDisabled(false)
//           setAlertStatus(null) // Clear alert status
//           setShowAlertNotification(false) // Hide persistent notification
//         }
//       }
//     } catch (error) {
//       console.error("Error fetching emergency alerts:", error)
//     }
//   }

//   const fetchAllPosts = async () => {
//     try {
//       const postsRes = await fetch("/api/posts")
//       if (postsRes.ok) {
//         const postsData = await postsRes.json()
//         setAllPosts(postsData.data || [])
//       }
//     } catch (error) {
//       console.error("Error fetching all posts:", error)
//     }
//   }

//   const fetchHospitalsAndAnnouncements = async () => {
//     try {
//       const [hospitalsRes, announcementsRes] = await Promise.all([
//         fetch("/api/user/hospitals"),
//         fetch("/api/announcements/mentions"), // Fetch all announcements for user, including mentions
//       ])

//       if (hospitalsRes.ok) {
//         const hospitalsData = await hospitalsRes.json()
//         setHospitals(hospitalsData.data || [])
//       }

//       if (announcementsRes.ok) {
//         const announcementsData = await announcementsRes.json()
//         // Calculate isRead status on the client side based on user.userId
//         const processedAnnouncements =
//           announcementsData.data?.map((ann: Announcement) => ({
//             ...ann,
//             isRead: ann.readBy.includes(user?.userId || ""), // Check if current user's ID is in readBy
//           })) || []
//         setAllAnnouncements(processedAnnouncements)
//         // Calculate unread count for the current user
//         const unreadCount = processedAnnouncements.filter((ann: Announcement) => !ann.isRead).length || 0
//         setUnreadAnnouncementsCount(unreadCount)
//       }
//     } catch (error) {
//       console.error("Error fetching hospitals or announcements:", error)
//     }
//   }

//   const checkAlertStatus = async (alertId: string) => {
//     try {
//       const response = await fetch("/api/user/check-alert-status", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include", // to send cookies
//         body: JSON.stringify({ alertId }), // 👈 send the required alertId
//       })
//       const data = await response.json()

//       if (response.ok) {
//         setAlertStatus(data.alert.status)
//         setEmergencyButtonDisabled(data.alert.status === "pending" || data.alert.status === "accepted")
//         setLastAlertCheck(new Date())

//         if (data.alert.status === "accepted" && data.alert.acceptedBy) {
//           toast.success(`🏥 ${data.alert.acceptedBy.name} is coming to help!`, { duration: 8000 })
//           setShowAlertNotification(false) // Dismiss notification if accepted
//           setEscalationCount(0) // Reset escalation count
//           setCurrentAlert(data.alert) // Update current alert with acceptedBy details
//           // Remove beforeunload listener when alert is accepted
//           window.removeEventListener("beforeunload", handleBeforeUnload)
//         } else if (data.alert.status === "pending") {
//           // Handle escalation messages
//           if (data.escalationOccurred) {
//             setEscalationCount((prev) => prev + 1)
//             toast.info(
//               `⏳ Still finding help. Escalating alert to more hospitals... (Attempt ${escalationCount + 1})`,
//               {
//                 duration: 5000,
//               },
//             )
//           } else {
//             // Initial pending state or waiting for first escalation
//             toast.info("⏳ Your emergency alert is pending. Searching for nearby hospitals...", { duration: 3000 })
//           }
//         } else if (data.alert.status === "no_response_all_contacted") {
//           setShowAlertNotification(true) // Show persistent notification
//           toast.error(
//             "🚨 No more hospitals found within 100km to handle the situation. Please call emergency services directly!",
//             {
//               duration: 15000,
//             },
//           )
//           // Remove beforeunload listener when no more hospitals can be contacted
//           window.removeEventListener("beforeunload", handleBeforeUnload)
//         }
//       } else {
//         console.error("API error:", data.message)
//       }
//     } catch (error) {
//       console.error("Error checking alert status:", error)
//     }
//   }

//   const handleBeforeUnload = (e: BeforeUnloadEvent) => {
//     e.preventDefault()
//     e.returnValue = ""
//   }

//   const startAlertMonitoring = (alertId: string) => {
//     setEscalationCount(0) // Reset count for new alert
//     setShowAlertNotification(false) // Hide initial notification until backend signals escalation
//     toast.info("⏳ Your emergency alert is pending. Searching for nearby hospitals...", { duration: 3000 })
//     // Add beforeunload listener to warn user about active alert
//     window.addEventListener("beforeunload", handleBeforeUnload)
//   }

//   const handleEmergencySOS = async () => {
//     if (isEmergencyActive || emergencyButtonDisabled) return

//     setIsEmergencyActive(true)
//     setEmergencyButtonDisabled(true)

//     // Use the current live location if available, otherwise rely on registered address (handled by backend)
//     await sendQuickEmergencyAlert(location)
//   }

//   const sendQuickEmergencyAlert = async (currentLocation: { lat: number; lng: number } | null) => {
//     try {
//       const response = await fetch("/api/user/emergency-alert", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           location: currentLocation ? { lat: currentLocation.lat, lng: currentLocation.lng } : undefined, // Send current live location if available
//           message: "🚨 EMERGENCY SOS - Immediate assistance needed!",
//           priority: "critical",
//         }),
//       })
//       const data = await response.json()

//       if (response.ok) {
//         toast.success(`🚨 Emergency alert sent! User: ${data.userInfo.name} | Phone: ${data.userInfo.phone}`)
//         toast.success("🏥 Searching for nearby hospitals... Please wait!")
//         setCurrentAlert({ ...currentAlert, _id: data.alertId, status: "pending" }) // Set current alert to trigger polling
//         setEmergencyButtonDisabled(true)
//         setAlertStatus("pending") // Set status for banner
//         startAlertMonitoring(data.alertId) // Start client-side monitoring
//         setIsEmergencyActive(false)
//       } else {
//         toast.error(data.message || "Failed to send emergency alert")
//         setIsEmergencyActive(false)
//         setEmergencyButtonDisabled(false)
//       }
//     } catch (error) {
//       console.error("Emergency alert error:", error)
//       toast.error("Emergency system error. Please try again.")
//       setIsEmergencyActive(false)
//       setEmergencyButtonDisabled(false)
//     }
//   }

//   const handleFormEmergencyAlert = async () => {
//     if (!emergencyForm.message.trim()) {
//       toast.error("Please describe your emergency")
//       return
//     }
//     setIsEmergencyActive(true)
//     try {
//       const position = await new Promise<GeolocationPosition>((resolve, reject) => {
//         navigator.geolocation.getCurrentPosition(resolve, reject, {
//           enableHighAccuracy: true,
//           timeout: 10000,
//           maximumAge: 60000,
//         })
//       })

//       const response = await fetch("/api/user/emergency-alert", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           message: emergencyForm.message,
//           priority: emergencyForm.priority,
//           location: {
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           },
//         }),
//       })
//       const data = await response.json()

//       if (response.ok) {
//         toast.success("🚨 Emergency alert sent to nearby hospitals!")
//         setEmergencyForm({ message: "", priority: "high" })
//         setEmergencyButtonDisabled(true)
//         setAlertStatus("pending")
//         setCurrentAlert({ ...currentAlert, _id: data.alertId, status: "pending" }) // Set current alert to trigger polling
//         startAlertMonitoring(data.alertId) // Start client-side monitoring
//       } else {
//         toast.error(data.message || "Failed to send emergency alert")
//       }
//     } catch (error) {
//       console.error("Error sending emergency alert:", error)
//       if (error instanceof GeolocationPositionError) {
//         toast.error("Location access required for emergency alerts")
//       } else {
//         toast.error("Failed to send emergency alert")
//       }
//     } finally {
//       setIsEmergencyActive(false)
//     }
//   }

//   const dismissAlert = async () => {
//     if (!currentAlert) return

//     try {
//       const response = await fetch("/api/user/dismiss-alert", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ alertId: currentAlert._id }),
//       })

//       if (response.ok) {
//         setShowAlertNotification(false)
//         setCurrentAlert(null)
//         setEmergencyButtonDisabled(false)
//         setAlertStatus(null) // Clear alert status
//         setEscalationCount(0) // Reset escalation count
//         if (alertTimer) {
//           clearTimeout(alertTimer)
//           setAlertTimer(null)
//         }
//         toast.success("Alert dismissed")
//         fetchEmergencyAlerts() // Re-fetch alerts to update the list
//         window.removeEventListener("beforeunload", handleBeforeUnload) // Remove listener
//       } else {
//         toast.error("Failed to dismiss alert")
//       }
//     } catch (error) {
//       console.error("Error dismissing alert:", error)
//       toast.error("Failed to dismiss alert")
//     }
//   }

//   const handleDeleteAlert = async (alertId: string) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "You won't be able to revert this!",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     })

//     if (result.isConfirmed) {
//       try {
//         const response = await fetch("/api/user/delete-alert", {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ alertId }),
//         })

//         if (response.ok) {
//           toast.success("Alert deleted successfully!")
//           fetchEmergencyAlerts() // Re-fetch alerts to update the list
//         } else {
//           toast.error("Failed to delete alert.")
//         }
//       } catch (error) {
//         console.error("Error deleting alert:", error)
//         toast.error("Error deleting alert.")
//       }
//     }
//   }

//   const saveMoodEntry = async () => {
//     try {
//       const response = await fetch("/api/user/mood-entry", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           mood: currentMood,
//           energy: currentEnergy,
//           anxiety: currentAnxiety,
//           sleep: currentSleep,
//           notes: moodNotes,
//         }),
//       })

//       if (response.ok) {
//         toast.success("✅ Mood entry saved!")
//         fetchUserProfileAndMoodData() // Re-fetch mood data
//         setMoodNotes("")
//       } else {
//         toast.error("Failed to save mood entry")
//       }
//     } catch (error) {
//       toast.error("Error saving mood entry")
//     }
//   }

//   const handleMarkAnnouncementRead = async (announcementId: string) => {
//     try {
//       const response = await fetch("/api/announcements/mark-read", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ announcementId }),
//       })

//       if (response.ok) {
//         toast.success("Announcement marked as read.")
//         fetchHospitalsAndAnnouncements() // Re-fetch to update read status and notification count
//       } else {
//         toast.error("Failed to mark announcement as read.")
//       }
//     } catch (error) {
//       toast.error("Error marking announcement as read.")
//     }
//   }

//   const getMoodIcon = (mood: number) => {
//     if (mood >= 8) return <Smile className="w-6 h-6 text-green-500" />
//     if (mood >= 6) return <Meh className="w-6 h-6 text-yellow-500" />
//     return <Frown className="w-6 h-6 text-red-500" />
//   }

//   const getMoodColor = (mood: number) => {
//     if (mood >= 8) return "text-green-600"
//     if (mood >= 6) return "text-yellow-600"
//     return "text-red-600"
//   }

//   const getWellnessScore = () => {
//     if (!todayMood) return 0
//     const score = (todayMood.mood + todayMood.energy + (10 - todayMood.anxiety) + Math.min(todayMood.sleep, 8)) / 4
//     return Math.round(score * 10)
//   }

//   const getWeeklyAverage = () => {
//     if (moodData.length === 0) return 0
//     const recentData = moodData.slice(-7)
//     const avgMood = recentData.reduce((sum, entry) => sum + entry.mood, 0) / recentData.length
//     return Math.round(avgMood * 10) / 10
//   }

//   const formatTimeAgo = (dateString: string) => {
//     const now = new Date()
//     const alertTime = new Date(dateString)
//     const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60))

//     if (diffInMinutes < 1) return "Just now"
//     if (diffInMinutes < 60) return `${diffInMinutes}m ago`
//     const diffInHours = Math.floor(diffInMinutes / 60)
//     if (diffInHours < 24) return `${diffInHours}h ago`
//     return alertTime.toLocaleDateString()
//   }

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "critical":
//         return "bg-red-500 text-white"
//       case "high":
//         return "bg-orange-500 text-white"
//       case "medium":
//         return "bg-yellow-500 text-black"
//       default:
//         return "bg-gray-500 text-white"
//     }
//   }

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "pending":
//         return "bg-yellow-500 text-white"
//       case "accepted":
//         return "bg-green-500 text-white"
//       case "declined":
//         return "bg-red-500 text-white"
//       case "cancelled":
//         return "bg-gray-500 text-white"
//       case "no_response_all_contacted":
//         return "bg-red-700 text-white"
//       default:
//         return "bg-gray-500 text-white"
//     }
//   }

//   const formatLocationAddress = (address: any) => {
//     if (!address) return "Location not available"
//     const parts = [
//       address.area,
//       address.village || address.townOrVillage,
//       address.subDistrict || address.taluka,
//       address.district,
//       address.state || "Gujarat",
//       address.pincode,
//     ].filter(Boolean)
//     return parts.join(", ")
//   }

//   const openGoogleMaps = (address: any) => {
//     if (!address) {
//       toast.error("Location not available")
//       return
//     }
//     const searchQuery = formatLocationAddress(address)
//     const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
//     window.open(googleMapsUrl, "_blank")
//     toast.success("🗺️ Opening location in Google Maps...")
//   }

//   const getAuthorIcon = (authorType: string) => {
//     return authorType === "Doctor" ? (
//       <Stethoscope className="w-5 h-5 text-green-600" />
//     ) : (
//       <Building2 className="w-5 h-5 text-purple-600" />
//     )
//   }

//   const getAuthorBadgeColor = (authorType: string) => {
//     return authorType === "Doctor"
//       ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
//       : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <motion.div
//             className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           />
//           <p className="text-gray-600 dark:text-gray-400 text-lg">Loading your wellness dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       {/* Location Prompt Dialog */}
//       <Dialog open={showLocationPrompt} onOpenChange={setShowLocationPrompt}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle className="flex items-center space-x-2">
//               <MapPin className="w-5 h-5 text-blue-500" />
//               <span>Your Location Is Safe With Us</span>
//             </DialogTitle>
//           </DialogHeader>
//           <div className="space-y-4 text-gray-700 dark:text-gray-300">
//             <p>To connect you with the nearest hospital quickly during emergencies, we need your live location.</p>
//             <ul className="list-disc list-inside space-y-1">
//               <li>{"✅ We do not store your location permanently"}</li>
//               <li>{"✅ We never share it with anyone else"}</li>
//               <li>{"✅ It's used only to find nearby help in real-time"}</li>
//             </ul>
//             <p className="font-semibold">This is only for your safety — your privacy is 100% protected.</p>
//             <p className="text-blue-600 dark:text-blue-400 font-medium">
//               👉 Please tap “Allow” when your browser asks for permission.
//             </p>
//           </div>
//           <div className="flex justify-end space-x-2 mt-4">
//             <Button
//               variant="outline"
//               onClick={() => {
//                 setShowLocationPrompt(false)
//                 // User chose to proceed without live location, dashboard already loaded with existing data
//               }}
//             >
//               Proceed Without Location
//             </Button>
//             <Button
//               onClick={async () => {
//                 setShowLocationPrompt(false) // Close prompt
//                 setLoading(true) // Show loading again while re-fetching
//                 await handleLocationRequest() // Retry requesting location
//                 // Re-fetch all data after location attempt
//                 await fetchUserProfileAndMoodData()
//                 setTimeout(async () => {
//                   await fetchEmergencyAlerts()
//                 }, 1000)
//                 setTimeout(async () => {
//                   await fetchAllPosts()
//                 }, 2000)
//                 setTimeout(async () => {
//                   await fetchHospitalsAndAnnouncements()
//                   setLoading(false)
//                 }, 3000)
//               }}
//             >
//               Allow Location
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>

//       {/* Emergency Alert Notification (Persistent for no_response_all_contacted) */}
//       <AnimatePresence>
//         {showAlertNotification && currentAlert && currentAlert.status === "no_response_all_contacted" && (
//           <motion.div
//             initial={{ opacity: 0, y: -100 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -100 }}
//             className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
//           >
//             <Alert className="border-red-500 bg-red-50 dark:bg-red-900/20">
//               <AlertTriangle className="h-4 w-4 text-red-600" />
//               <AlertDescription className="flex items-center justify-between">
//                 <div>
//                   <p className="font-semibold text-red-800 dark:text-red-200">🚨 HIGH ALERT: No Hospital Response</p>
//                   <p className="text-red-700 dark:text-red-300 text-sm">
//                     Your emergency alert is still pending. Consider calling emergency services directly.
//                   </p>
//                   {currentAlert && (
//                     <p className="text-xs text-red-600 dark:text-red-400 mt-1">
//                       User: {currentAlert.userInfo?.name || userProfile?.name || "Unknown"} | Phone:{" "}
//                       {currentAlert.userInfo?.phone || userProfile?.phone || "Unknown"}
//                     </p>
//                   )}
//                 </div>
//                 <Button variant="ghost" size="sm" onClick={dismissAlert} className="text-red-600 hover:text-red-800">
//                   <CheckCircle className="w-4 h-4" />
//                 </Button>
//               </AlertDescription>
//             </Alert>
//           </motion.div>
//         )}
//       </AnimatePresence>

//       {/* Header with Animated Icons */}
//       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
//         <AnimatedHealthIcons />
//         <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
//           <div className="flex items-center space-x-4">
//             <motion.div
//               className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg"
//               animate={{
//                 scale: [1, 1.1, 1],
//                 rotate: [0, 5, -5, 0],
//               }}
//               transition={{
//                 duration: 3,
//                 repeat: Number.POSITIVE_INFINITY,
//                 ease: "easeInOut",
//               }}
//             >
//               <Heart className="w-6 h-6 text-white" />
//             </motion.div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900 dark:text-white">RuralReach</h1>
//               <p className="text-sm text-gray-600 dark:text-gray-400">Your Wellness Dashboard</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             {/* Hospital Info Button */}
//             <Dialog open={showHospitalInfo} onOpenChange={setShowHospitalInfo}>
//               <DialogTrigger asChild>
//                 <motion.button
//                   whileHover={{ scale: 1.05 }}
//                   whileTap={{ scale: 0.95 }}
//                   className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
//                 >
//                   <Building2 className="w-4 h-4" />
//                   <span className="text-sm font-medium">Hospital Info</span>
//                 </motion.button>
//               </DialogTrigger>
//               <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
//                 <DialogHeader>
//                   <DialogTitle className="flex items-center space-x-2">
//                     <Building2 className="w-5 h-5 text-purple-600" />
//                     <span>Connected Hospitals</span>
//                   </DialogTitle>
//                 </DialogHeader>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
//                   {hospitals.map((hospital) => (
//                     <motion.div
//                       key={hospital._id}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
//                     >
//                       <div className="flex items-start justify-between mb-3">
//                         <div className="flex items-center space-x-2">
//                           <Building2 className="w-5 h-5 text-purple-600" />
//                           <h3 className="font-semibold text-lg">{hospital.name}</h3>
//                           {hospital.isVerified && <Award className="w-4 h-4 text-green-500" />}
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <Badge variant={hospital.isAvailable ? "default" : "secondary"}>
//                             {hospital.isAvailable ? "Available" : "Unavailable"}
//                           </Badge>
//                           {hospital.isHandleEmergency && (
//                             <Badge variant="destructive" className="text-xs">
//                               Emergency 24/7
//                             </Badge>
//                           )}
//                         </div>
//                       </div>
//                       <div className="space-y-2 text-sm">
//                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
//                           <Mail className="w-4 h-4" />
//                           <span>{hospital.email}</span>
//                         </div>
//                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
//                           <Phone className="w-4 h-4" />
//                           <span>{hospital.phone}</span>
//                         </div>
//                         <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
//                           <MapPin className="w-4 h-4" />
//                           <span>{hospital.address}</span>
//                         </div>
//                       </div>
//                       <div className="mt-3">
//                         <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties:</p>
//                         <div className="flex flex-wrap gap-1">
//                           {hospital.specialties.map((specialty, index) => (
//                             <Badge key={index} variant="outline" className="text-xs">
//                               {specialty}
//                             </Badge>
//                           ))}
//                         </div>
//                       </div>
//                       <div className="mt-3 pt-3 border-t">
//                         <p className="text-xs text-gray-500">
//                           Joined: {new Date(hospital.createdAt).toLocaleDateString()}
//                         </p>
//                       </div>
//                     </motion.div>
//                   ))}
//                 </div>
//               </DialogContent>
//             </Dialog>
//             <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//               <Clock className="w-4 h-4" />
//               <span>Last checked: {lastAlertCheck.toLocaleTimeString()}</span>
//             </div>
//             <Button
//               variant="outline"
//               size="sm"
//               onClick={() => currentAlert?._id && checkAlertStatus(currentAlert._id)} // Pass alertId if available
//               className="flex items-center space-x-2 bg-transparent"
//             >
//               <RefreshCw className="w-4 h-4" />
//               <span>Refresh</span>
//             </Button>
//             <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//               <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
//               {unreadAnnouncementsCount > 0 && (
//                 <motion.span
//                   className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   {unreadAnnouncementsCount}
//                 </motion.span>
//               )}
//             </motion.div>
//             <ThemeToggle />
//             <UserDropdown />
//           </div>
//         </div>
//       </header>

//       <div className="container mx-auto px-6 py-8">
//         {/* Welcome Section */}
//         <motion.div
//           className="mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user?.name}! 👋</h2>
//           <p className="text-gray-600 dark:text-gray-400">
//             How are you feeling today? Let's track your wellness journey and stay healthy together.
//           </p>
//         </motion.div>

//         {/* Emergency SOS Button - Always Available */}
//         <motion.div
//           className="mb-8"
//           initial={{ opacity: 0, scale: 0.9 }}
//           animate={{ opacity: 1, scale: 1 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//         >
//           <Card className="border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center space-x-4">
//                   <motion.div
//                     className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
//                     animate={{
//                       boxShadow: [
//                         "0 0 0 0 rgba(239, 68, 68, 0.7)",
//                         "0 0 0 10px rgba(239, 68, 68, 0)",
//                         "0 0 0 0 rgba(239, 68, 68, 0)",
//                       ],
//                     }}
//                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <AlertTriangle className="w-6 h-6 text-white" />
//                   </motion.div>
//                   <div>
//                     <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Quick Emergency Support</h3>
//                     <p className="text-red-600 dark:text-red-300">Need immediate help? Press for instant alert</p>
//                     {userProfile?.address?.geoLocation?.lat && userProfile?.address?.geoLocation?.lng ? (
//                       <p className="text-xs text-red-500 dark:text-red-400 mt-1">
//                         📍 Location: {userProfile.address.geoLocation.lat.toFixed(4)},{" "}
//                         {userProfile.address.geoLocation.lng.toFixed(4)} (from profile)
//                       </p>
//                     ) : location ? (
//                       <p className="text-xs text-red-500 dark:text-red-400 mt-1">
//                         📍 Live Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)} (current session)
//                       </p>
//                     ) : (
//                       <p className="text-xs text-red-500 dark:text-red-400 mt-1">
//                         📍 Location: Not available (please enable location services or reload the page)
//                       </p>
//                     )}
//                     {emergencyButtonDisabled && alertStatus !== "accepted" && (
//                       <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
//                         ⚠️ Emergency alert already sent. Waiting for hospital response...
//                       </p>
//                     )}
//                   </div>
//                 </div>
//                 <motion.div
//                   whileHover={{ scale: emergencyButtonDisabled ? 1 : 1.05 }}
//                   whileTap={{ scale: emergencyButtonDisabled ? 1 : 0.95 }}
//                 >
//                   <Button
//                     onClick={handleEmergencySOS}
//                     disabled={isEmergencyActive || emergencyButtonDisabled}
//                     className={`font-bold px-8 py-3 text-lg shadow-lg transition-all duration-300 ${
//                       emergencyButtonDisabled
//                         ? "bg-gray-400 cursor-not-allowed"
//                         : "bg-red-600 hover:bg-red-700 hover:shadow-xl"
//                     } text-white`}
//                   >
//                     {isEmergencyActive
//                       ? "🚨 Sending..."
//                       : emergencyButtonDisabled
//                         ? "🚨 Alert Sent"
//                         : "🆘 SOS Emergency"}
//                   </Button>
//                 </motion.div>
//               </div>
//             </CardContent>
//           </Card>
//         </motion.div>

//         {/* Emergency Status Banner (New Section) */}
//         {alertStatus && (
//           <motion.div
//             className="mb-8"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//           >
//             <Card
//               className={`border-2 ${
//                 alertStatus === "pending"
//                   ? "border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
//                   : alertStatus === "accepted"
//                     ? "border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
//                     : alertStatus === "no_response_all_contacted"
//                       ? "border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20"
//                       : "border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20" // For 'declined' or 'cancelled'
//               }`}
//             >
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <motion.div
//                       className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
//                         alertStatus === "pending"
//                           ? "bg-yellow-500"
//                           : alertStatus === "accepted"
//                             ? "bg-green-500"
//                             : alertStatus === "no_response_all_contacted"
//                               ? "bg-red-500"
//                               : "bg-red-500" // For 'declined' or 'cancelled'
//                       }`}
//                       animate={{
//                         boxShadow:
//                           alertStatus === "pending"
//                             ? [
//                                 "0 0 0 0 rgba(234, 179, 8, 0.7)",
//                                 "0 0 0 10px rgba(234, 179, 8, 0)",
//                                 "0 0 0 0 rgba(234, 179, 8, 0)",
//                               ]
//                             : undefined,
//                       }}
//                       transition={{ duration: 2, repeat: alertStatus === "pending" ? Number.POSITIVE_INFINITY : 0 }}
//                     >
//                       {alertStatus === "pending" ? (
//                         <Timer className="w-6 h-6 text-white" />
//                       ) : alertStatus === "accepted" ? (
//                         <CheckCircle className="w-6 h-6 text-white" />
//                       ) : (
//                         <XCircle className="w-6 h-6 text-white" />
//                       )}
//                     </motion.div>
//                     <div>
//                       <h3
//                         className={`text-lg font-semibold ${
//                           alertStatus === "pending"
//                             ? "text-yellow-800 dark:text-yellow-200"
//                             : alertStatus === "accepted"
//                               ? "text-green-800 dark:text-green-200"
//                               : "text-red-800 dark:text-red-200"
//                         }`}
//                       >
//                         {alertStatus === "pending" && "🚨 Emergency Alert Sent"}
//                         {alertStatus === "accepted" && "✅ Hospital is Coming!"}
//                         {alertStatus === "declined" && "❌ Alert Declined"}
//                         {alertStatus === "cancelled" && "🚫 Alert Cancelled"}
//                         {alertStatus === "no_response_all_contacted" && "🚨 No Hospital Response"}
//                       </h3>
//                       <p
//                         className={`${
//                           alertStatus === "pending"
//                             ? "text-yellow-600 dark:text-yellow-300"
//                             : alertStatus === "accepted"
//                               ? "text-green-600 dark:text-green-300"
//                               : "text-red-600 dark:text-red-300"
//                         }`}
//                       >
//                         {alertStatus === "pending" && "Waiting for hospital response..."}
//                         {alertStatus === "accepted" &&
//                           currentAlert?.acceptedBy &&
//                           `A hospital has accepted your emergency request: ${currentAlert.acceptedBy.name} (${currentAlert.acceptedBy.phone})`}
//                         {alertStatus === "accepted" &&
//                           currentAlert?.acceptedBy?.distance &&
//                           ` (${currentAlert.acceptedBy.distance.toFixed(2)}km away)`}
//                         {alertStatus === "declined" && "Your emergency request was declined"}
//                         {alertStatus === "cancelled" && "You have cancelled this emergency alert."}
//                         {alertStatus === "no_response_all_contacted" &&
//                           "No nearby hospitals could respond. Please call emergency services directly."}
//                       </p>
//                     </div>
//                   </div>
//                   {(alertStatus === "pending" || alertStatus === "no_response_all_contacted") && (
//                     <Button onClick={dismissAlert} variant="outline" className="font-bold px-6 py-2 bg-transparent">
//                       Dismiss
//                     </Button>
//                   )}
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}

//         {/* Quick Stats */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Wellness Score</p>
//                     <p className="text-2xl font-bold text-blue-600">{getWellnessScore()}%</p>
//                     <p className="text-xs text-gray-500 mt-1">Based on today's data</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
//                     animate={{ rotate: [0, 360] }}
//                     transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                   >
//                     <Target className="w-6 h-6 text-blue-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Today's Mood</p>
//                     <div className="flex items-center space-x-2">
//                       {todayMood ? getMoodIcon(todayMood.mood) : <Meh className="w-6 h-6 text-gray-400" />}
//                       <span
//                         className={`text-lg font-semibold ${todayMood ? getMoodColor(todayMood.mood) : "text-gray-400"}`}
//                       >
//                         {todayMood?.mood || "Not set"}
//                       </span>
//                     </div>
//                     <p className="text-xs text-gray-500 mt-1">Out of 10</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       scale: [1, 1.1, 1],
//                       rotate: [0, 10, -10, 0],
//                     }}
//                     transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <Brain className="w-6 h-6 text-green-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Sleep Last Night</p>
//                     <p className="text-2xl font-bold text-purple-600">{todayMood?.sleep || 0}h</p>
//                     <p className="text-xs text-gray-500 mt-1">
//                       {(todayMood?.sleep || 0) >= 7 ? "Good sleep!" : "Need more rest"}
//                     </p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       y: [0, -5, 0],
//                       opacity: [1, 0.7, 1],
//                     }}
//                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <Moon className="w-6 h-6 text-purple-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Energy Level</p>
//                     <p className="text-2xl font-bold text-orange-600">{todayMood?.energy || 0}/10</p>
//                     <p className="text-xs text-gray-500 mt-1">Weekly avg: {getWeeklyAverage()}</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       scale: [1, 1.2, 1],
//                       rotate: [0, 180, 360],
//                     }}
//                     transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <Zap className="w-6 h-6 text-orange-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         </motion.div>

//         {/* Main Content Tabs */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//         >
//           <Tabs defaultValue="mood" className="space-y-6">
//             <TabsList className="grid w-full grid-cols-5">
//               <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
//               <TabsTrigger value="posts">Posts</TabsTrigger>
//               <TabsTrigger value="announcements">Announcements</TabsTrigger>
//               <TabsTrigger value="emergency">Emergency Alert</TabsTrigger>
//               <TabsTrigger value="past-alerts">Past Alerts</TabsTrigger>
//               <TabsTrigger value="assessment">Self Assessment</TabsTrigger>
//             </TabsList>

//             {/* Mood Tracking Tab */}
//             <TabsContent value="mood" className="space-y-6">
//               <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                 {/* Today's Mood Entry */}
//                 <Card className="hover:shadow-lg transition-shadow duration-300">
//                   <CardHeader>
//                     <CardTitle className="flex items-center space-x-2">
//                       <Plus className="w-5 h-5" />
//                       <span>Log Today's Mood</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent className="space-y-6">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Mood (1-10)</label>
//                       <div className="flex items-center space-x-4">
//                         <input
//                           type="range"
//                           min="1"
//                           max="10"
//                           value={currentMood}
//                           onChange={(e) => setCurrentMood(Number(e.target.value))}
//                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
//                         />
//                         <div className="flex items-center space-x-2">
//                           {getMoodIcon(currentMood)}
//                           <span className="text-lg font-semibold w-8">{currentMood}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Energy Level (1-10)</label>
//                       <div className="flex items-center space-x-4">
//                         <input
//                           type="range"
//                           min="1"
//                           max="10"
//                           value={currentEnergy}
//                           onChange={(e) => setCurrentEnergy(Number(e.target.value))}
//                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
//                         />
//                         <div className="flex items-center space-x-2">
//                           <Zap className="w-5 h-5 text-orange-500" />
//                           <span className="text-lg font-semibold w-8">{currentEnergy}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Anxiety Level (1-10)</label>
//                       <div className="flex items-center space-x-4">
//                         <input
//                           type="range"
//                           min="1"
//                           max="10"
//                           value={currentAnxiety}
//                           onChange={(e) => setCurrentAnxiety(Number(e.target.value))}
//                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
//                         />
//                         <div className="flex items-center space-x-2">
//                           <AlertTriangle className="w-5 h-5 text-red-500" />
//                           <span className="text-lg font-semibold w-8">{currentAnxiety}</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Sleep Hours</label>
//                       <div className="flex items-center space-x-4">
//                         <input
//                           type="range"
//                           min="0"
//                           max="12"
//                           value={currentSleep}
//                           onChange={(e) => setCurrentSleep(Number(e.target.value))}
//                           className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
//                         />
//                         <div className="flex items-center space-x-2">
//                           <Moon className="w-5 h-5 text-purple-500" />
//                           <span className="text-lg font-semibold w-8">{currentSleep}h</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
//                       <Textarea
//                         value={moodNotes}
//                         onChange={(e) => setMoodNotes(e.target.value)}
//                         placeholder="How are you feeling today? Any specific thoughts or events?"
//                         className="w-full"
//                         rows={3}
//                       />
//                     </div>
//                     <Button
//                       onClick={saveMoodEntry}
//                       className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
//                     >
//                       Save Mood Entry
//                     </Button>
//                   </CardContent>
//                 </Card>

//                 {/* Mood Chart */}
//                 <Card className="hover:shadow-lg transition-shadow duration-300">
//                   <CardHeader>
//                     <CardTitle className="flex items-center space-x-2">
//                       <BarChart3 className="w-5 h-5" />
//                       <span>7-Day Mood Trend</span>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     {moodData.length > 0 ? (
//                       <div className="space-y-4">
//                         {moodData.slice(-7).map((entry, index) => (
//                           <motion.div
//                             key={index}
//                             className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: index * 0.1 }}
//                           >
//                             <div className="flex items-center space-x-3">
//                               <Calendar className="w-4 h-4 text-gray-500" />
//                               <span className="text-sm text-gray-600 dark:text-gray-400">
//                                 {new Date(entry.date).toLocaleDateString()}
//                               </span>
//                             </div>
//                             <div className="flex items-center space-x-3">
//                               {getMoodIcon(entry.mood)}
//                               <Progress value={entry.mood * 10} className="w-20" />
//                               <span className="text-sm font-medium w-12">{entry.mood}/10</span>
//                             </div>
//                           </motion.div>
//                         ))}
//                         <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
//                           <div className="flex items-center justify-between">
//                             <span className="text-sm text-blue-700 dark:text-blue-300">Weekly Average</span>
//                             <div className="flex items-center space-x-2">
//                               <TrendingUp className="w-4 h-4 text-blue-600" />
//                               <span className="font-semibold text-blue-600">{getWeeklyAverage()}/10</span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     ) : (
//                       <div className="text-center py-8">
//                         <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
//                         <p className="text-gray-600 dark:text-gray-400">No mood data yet</p>
//                         <p className="text-sm text-gray-500">Start tracking to see your trends</p>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </div>
//             </TabsContent>

//             {/* Combined Posts Tab */}
//             <TabsContent value="posts" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <FileText className="w-5 h-5 text-blue-600" />
//                     <span>Healthcare Posts</span>
//                     <Badge variant="secondary">{allPosts.length} posts</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {allPosts.length > 0 ? (
//                     <div className="space-y-6">
//                       {allPosts.map((post, index) => (
//                         <motion.div
//                           key={post._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
//                         >
//                           {/* Post Header */}
//                           <div className="flex items-start justify-between mb-4">
//                             <div className="flex items-center space-x-4">
//                               <div
//                                 className={`w-12 h-12 rounded-full flex items-center justify-center ${getAuthorBadgeColor(post.authorType)}`}
//                               >
//                                 {getAuthorIcon(post.authorType)}
//                               </div>
//                               <div>
//                                 <div className="flex items-center space-x-2">
//                                   <p className="font-semibold text-lg">
//                                     {post.authorType === "Doctor" ? "Dr. " : "Hospital "}
//                                     {post.postby || "Mahadev"}
//                                   </p>
//                                   <Badge className={getAuthorBadgeColor(post.authorType)}>{post.authorType}</Badge>
//                                 </div>
//                                 <p className="text-sm text-gray-500 dark:text-gray-400">
//                                   {post.authorType === "Doctor" ? "Medical Professional" : "Healthcare Institution"}
//                                 </p>
//                                 {post.mentionedId && (
//                                   <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
//                                     mentioned {post.mentionedType === "Doctor" ? "Dr. " : ""}
//                                     {post.mentionedId.name}
//                                   </p>
//                                 )}
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-3">
//                               <Badge variant="outline" className="capitalize">
//                                 {post.category.replace("-", " ")}
//                               </Badge>
//                               <div className="flex items-center space-x-1 text-xs text-gray-500">
//                                 <Clock className="w-3 h-3" />
//                                 <span>{formatTimeAgo(post.createdAt)}</span>
//                               </div>
//                             </div>
//                           </div>

//                           {/* Post Content */}
//                           <div className="mb-4">
//                             <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">{post.title}</h3>
//                             <div className="prose prose-gray dark:prose-invert max-w-none">
//                               <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{post.content}</p>
//                             </div>
//                           </div>

//                           {/* Tags */}
//                           {post.tags.length > 0 && (
//                             <div className="mb-4">
//                               <div className="flex items-center space-x-2 mb-2">
//                                 <Tag className="w-4 h-4 text-gray-500" />
//                                 <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags:</span>
//                               </div>
//                               <div className="flex flex-wrap gap-2">
//                                 {post.tags.map((tag, tagIndex) => (
//                                   <Badge
//                                     key={tagIndex}
//                                     variant="secondary"
//                                     className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
//                                   >
//                                     #{tag}
//                                   </Badge>
//                                 ))}
//                               </div>
//                             </div>
//                           )}

//                           {/* Post Actions */}
//                           <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
//                             <div className="flex items-center space-x-6">
//                               <div className="flex items-center space-x-2 text-gray-600">
//                                 <Eye className="w-5 h-5" />
//                                 <span className="text-xs text-gray-500">Public post</span>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               {post.isApproved && (
//                                 <Badge variant="outline" className="text-green-600 border-green-200">
//                                   <CheckCircle className="w-3 h-3 mr-1" />
//                                   Verified
//                                 </Badge>
//                               )}
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-16">
//                       <FileText className="w-20 h-20 text-gray-400 mx-auto mb-6" />
//                       <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
//                         No posts available
//                       </h3>
//                       <p className="text-gray-500 mb-4">Healthcare posts from doctors and hospitals will appear here</p>
//                       <div className="flex items-center justify-center space-x-4 text-sm text-gray-400">
//                         <Stethoscope className="w-4 h-4" />
//                         <span>Doctor posts</span>
//                       </div>
//                       <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
//                       <div className="flex items-center space-x-2">
//                         <Building2 className="w-4 h-4" />
//                         <span>Hospital updates</span>
//                       </div>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Announcements Tab */}
//             <TabsContent value="announcements" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Megaphone className="w-5 h-5 text-blue-600" />
//                     <span>All Announcements</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {allAnnouncements.length > 0 ? (
//                     <div className="space-y-4">
//                       {allAnnouncements.map((announcement, index) => (
//                         <motion.div
//                           key={announcement._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className={`border rounded-lg p-4 hover:shadow-md transition-all duration-300 ${
//                             announcement.isRead ? "bg-gray-50 dark:bg-gray-800" : "bg-yellow-50 dark:bg-yellow-900/20"
//                           }`}
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex-1">
//                               <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
//                               <div className="flex items-center space-x-2 mb-2">
//                                 <Badge variant="outline">{announcement.ownerType}</Badge>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <span className="text-xs text-gray-500">
//                                 {new Date(announcement.createdAt).toLocaleDateString()}
//                               </span>
//                               {!announcement.isRead && (
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={() => handleMarkAnnouncementRead(announcement._id)}
//                                   className="text-blue-600 hover:text-blue-800"
//                                 >
//                                   Mark as Read
//                                 </Button>
//                               )}
//                             </div>
//                           </div>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{announcement.content}</p>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2 text-gray-600">
//                               <Eye className="w-4 h-4" />
//                               <span className="text-sm">View details</span>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
//                         No announcements yet
//                       </h3>
//                       <p className="text-gray-500">Announcements from doctors and hospitals will appear here.</p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Emergency Alert Tab - Form-based */}
//             <TabsContent value="emergency" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <AlertTriangle className="w-5 h-5 text-red-500" />
//                     <span>Detailed Emergency Alert</span>
//                     {emergencyButtonDisabled && <Badge variant="destructive">Alert Active</Badge>}
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   {!emergencyButtonDisabled || (emergencyButtonDisabled && alertStatus === "declined") ? (
//                     <>
//                       <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
//                         <AlertTriangle className="h-4 w-4" />
//                         <AlertDescription>
//                           <strong>Emergency Use Only:</strong> This will immediately alert nearby hospitals with
//                           detailed information.
//                         </AlertDescription>
//                       </Alert>
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Describe your emergency *</label>
//                         <Textarea
//                           value={emergencyForm.message}
//                           onChange={(e) => setEmergencyForm({ ...emergencyForm, message: e.target.value })}
//                           placeholder="Please describe your medical emergency in detail..."
//                           className="w-full min-h-[120px]"
//                         />
//                       </div>
//                       <div>
//                         <label className="block text-sm font-medium mb-2">Priority Level</label>
//                         <Select
//                           value={emergencyForm.priority}
//                           onValueChange={(value) => setEmergencyForm({ ...emergencyForm, priority: value })}
//                         >
//                           <SelectTrigger>
//                             <SelectValue />
//                           </SelectTrigger>
//                           <SelectContent>
//                             <SelectItem value="critical">🔴 Critical - Life threatening</SelectItem>
//                             <SelectItem value="high">🟠 High - Urgent medical attention</SelectItem>
//                             <SelectItem value="medium">🟡 Medium - Medical assistance needed</SelectItem>
//                           </SelectContent>
//                         </Select>
//                       </div>
//                       <Button
//                         onClick={handleFormEmergencyAlert}
//                         disabled={isEmergencyActive || !emergencyForm.message.trim()}
//                         className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg"
//                       >
//                         {isEmergencyActive ? (
//                           <>
//                             <motion.div
//                               className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
//                               animate={{ rotate: 360 }}
//                               transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                             />
//                             Sending Emergency Alert...
//                           </>
//                         ) : (
//                           <>
//                             <Send className="w-5 h-5 mr-2" />
//                             Send Detailed Emergency Alert
//                           </>
//                         )}
//                       </Button>
//                     </>
//                   ) : (
//                     <div className="text-center py-12">
//                       <motion.div
//                         className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
//                         animate={{
//                           boxShadow: [
//                             "0 0 0 0 rgba(234, 179, 8, 0.7)",
//                             "0 0 0 20px rgba(234, 179, 8, 0)",
//                             "0 0 0 0 rgba(234, 179, 8, 0)",
//                           ],
//                         }}
//                         transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                       >
//                         <Timer className="w-8 h-8 text-white" />
//                       </motion.div>
//                       <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
//                         Emergency Alert Active
//                       </h3>
//                       <p className="text-yellow-600 dark:text-yellow-300 mb-4">
//                         Your emergency alert has been sent to nearby hospitals. Please wait for their response.
//                       </p>
//                       <Button
//                         onClick={dismissAlert}
//                         variant="outline"
//                         className="border-yellow-500 text-yellow-700 hover:bg-yellow-50 bg-transparent"
//                       >
//                         Dismiss Alert
//                       </Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Past Emergency Alerts Tab */}
//             <TabsContent value="past-alerts" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <History className="w-5 h-5 text-blue-500" />
//                     <span>Past Emergency Alert Requests</span>
//                     <Badge variant="secondary">{emergencyAlerts.length} total</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {emergencyAlerts.length > 0 ? (
//                     <div className="space-y-4">
//                       {emergencyAlerts.map((alert, index) => (
//                         <motion.div
//                           key={alert._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           className={`border rounded-lg p-4 hover:shadow-md transition-all duration-300 ${
//                             alert.status === "pending"
//                               ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
//                               : alert.status === "accepted"
//                                 ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
//                                 : alert.status === "cancelled"
//                                   ? "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/20"
//                                   : alert.status === "no_response_all_contacted"
//                                     ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
//                                     : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20" // For 'declined'
//                           }`}
//                         >
//                           <div className="flex items-start justify-between">
//                             <div className="flex-1">
//                               <div className="flex items-center space-x-3 mb-3">
//                                 <motion.div
//                                   className={`w-3 h-3 rounded-full ${
//                                     alert.status === "pending"
//                                       ? "bg-yellow-500"
//                                       : alert.status === "accepted"
//                                         ? "bg-green-500"
//                                         : alert.status === "cancelled"
//                                           ? "bg-gray-500"
//                                           : alert.status === "no_response_all_contacted"
//                                             ? "bg-red-500"
//                                             : "bg-red-500" // For 'declined'
//                                   }`}
//                                   animate={{ scale: alert.status === "pending" ? [1, 1.2, 1] : 1 }}
//                                   transition={{
//                                     duration: 1,
//                                     repeat: alert.status === "pending" ? Number.POSITIVE_INFINITY : 0,
//                                   }}
//                                 />
//                                 <h3 className="font-semibold text-lg">Emergency Alert</h3>
//                                 <Badge className={getPriorityColor(alert.priority)}>
//                                   {alert.priority.toUpperCase()}
//                                 </Badge>
//                                 <Badge className={getStatusColor(alert.status)}>{alert.status.toUpperCase()}</Badge>
//                               </div>
//                               <div className="mb-4">
//                                 <h4 className="font-medium text-gray-900 dark:text-white mb-2">Emergency Message</h4>
//                                 <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
//                                   {alert.message}
//                                 </p>
//                               </div>
//                               {alert.location?.address && (
//                                 <div className="mb-4">
//                                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Location</h4>
//                                   <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
//                                     <div className="flex items-start space-x-2">
//                                       <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
//                                       <div className="flex-1">
//                                         <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
//                                           📍 {formatLocationAddress(alert.location.address)}
//                                         </p>
//                                         <Button
//                                           onClick={() => openGoogleMaps(alert.location?.address)}
//                                           size="sm"
//                                           className="bg-blue-600 hover:bg-blue-700 text-white"
//                                         >
//                                           <Map className="w-3 h-3 mr-1" />
//                                           View on Map
//                                           <ExternalLink className="w-3 h-3 ml-1" />
//                                         </Button>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                               )}
//                               {alert.acceptedBy && (
//                                 <div className="mb-4">
//                                   <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hospital Response</h4>
//                                   <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
//                                     <div className="flex items-center space-x-2">
//                                       <CheckCircle className="w-4 h-4 text-green-500" />
//                                       <span className="font-medium text-green-800 dark:text-green-200">
//                                         Accepted by {alert.acceptedBy.name}
//                                         {alert.acceptedBy.distance &&
//                                           ` (${alert.acceptedBy.distance.toFixed(2)}km away)`}
//                                       </span>
//                                     </div>
//                                     <p className="text-sm text-green-700 dark:text-green-300 mt-1">
//                                       Contact: {alert.acceptedBy.phone}
//                                     </p>
//                                   </div>
//                                 </div>
//                               )}
//                               <div className="flex items-center justify-between">
//                                 <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//                                   <Timer className="w-4 h-4" />
//                                   <span>{formatTimeAgo(alert.createdAt)}</span>
//                                 </div>
//                                 {/* Delete button shows when alert is not pending */}
//                                 {alert.status !== "pending" && (
//                                   <Button
//                                     size="sm"
//                                     variant="outline"
//                                     onClick={() => handleDeleteAlert(alert._id)}
//                                     className="text-red-600 hover:text-red-800 hover:bg-red-50"
//                                   >
//                                     <Trash2 className="w-4 h-4 mr-1" />
//                                     Delete
//                                   </Button>
//                                 )}
//                               </div>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
//                         No Past Alert Requests
//                       </h3>
//                       <p className="text-gray-500">You haven't sent any emergency alerts yet</p>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Self Assessment Tab */}
//             <TabsContent value="assessment" className="space-y-6">
//               {currentAssessment ? (
//                 currentAssessment === "phq9" ? (
//                   <PHQ9Assessment
//                     onComplete={(result) => {
//                       setAssessmentResult(result)
//                       setCurrentAssessment("results")
//                     }}
//                     onBack={() => setCurrentAssessment(null)}
//                   />
//                 ) : currentAssessment === "gad7" ? (
//                   <GAD7Assessment
//                     onComplete={(result) => {
//                       setAssessmentResult(result)
//                       setCurrentAssessment("results")
//                     }}
//                     onBack={() => setCurrentAssessment(null)}
//                   />
//                 ) : currentAssessment === "results" ? (
//                   <AssessmentResults
//                     type={assessmentType}
//                     result={assessmentResult}
//                     onBack={() => setCurrentAssessment(null)}
//                     onReturnToDashboard={() => {
//                       setCurrentAssessment(null)
//                       setAssessmentResult(null)
//                       setAssessmentType("")
//                     }}
//                   />
//                 ) : null
//               ) : (
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   {[
//                     {
//                       icon: Brain,
//                       title: "Depression Assessment (PHQ-9)",
//                       desc: "A 9-question assessment to help identify symptoms of depression and track your mental health.",
//                       color: "blue",
//                       type: "phq9",
//                     },
//                     {
//                       icon: AlertTriangle,
//                       title: "Anxiety Assessment (GAD-7)",
//                       desc: "A 7-question screening tool for generalized anxiety disorder and anxiety symptoms.",
//                       color: "yellow",
//                       type: "gad7",
//                     },
//                     {
//                       icon: Zap,
//                       title: "Stress Level Check",
//                       desc: "Quick assessment to understand your current stress levels and get personalized recommendations.",
//                       color: "red",
//                       type: "stress",
//                       disabled: true,
//                     },
//                     {
//                       icon: Heart,
//                       title: "General Wellness Check",
//                       desc: "Comprehensive wellness assessment covering multiple areas of your physical and mental health.",
//                       color: "green",
//                       type: "wellness",
//                       disabled: true,
//                     },
//                   ].map((assessment, index) => (
//                     <motion.div
//                       key={index}
//                       initial={{ opacity: 0, y: 20 }}
//                       animate={{ opacity: 1, y: 0 }}
//                       transition={{ delay: index * 0.1 }}
//                       whileHover={{ scale: assessment.disabled ? 1 : 1.02, y: assessment.disabled ? 0 : -5 }}
//                     >
//                       <Card
//                         className={`hover:shadow-lg transition-all duration-300 ${assessment.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer group"}`}
//                       >
//                         <CardHeader>
//                           <CardTitle className="flex items-center space-x-2">
//                             <assessment.icon className={`w-5 h-5 text-${assessment.color}-500`} />
//                             <span>{assessment.title}</span>
//                             {assessment.disabled && <Badge variant="secondary">Coming Soon</Badge>}
//                           </CardTitle>
//                         </CardHeader>
//                         <CardContent>
//                           <p className="text-gray-600 dark:text-gray-300 mb-4">{assessment.desc}</p>
//                           <Button
//                             className={`w-full ${assessment.disabled ? "cursor-not-allowed" : `group-hover:bg-${assessment.color}-600`}`}
//                             disabled={assessment.disabled}
//                             onClick={() => {
//                               if (!assessment.disabled) {
//                                 setAssessmentType(assessment.type)
//                                 setCurrentAssessment(assessment.type)
//                               }
//                             }}
//                           >
//                             {assessment.disabled ? "Coming Soon" : "Start Assessment"}
//                           </Button>
//                         </CardContent>
//                       </Card>
//                     </motion.div>
//                   ))}
//                 </div>
//               )}
//             </TabsContent>
//           </Tabs>
//         </motion.div>
//       </div>
//     </div>
//   )
// }




"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  Heart,
  AlertTriangle,
  Brain,
  Target,
  Zap,
  Moon,
  Smile,
  Frown,
  Meh,
  Plus,
  BarChart3,
  TrendingUp,
  Calendar,
  Clock,
  Building2,
  Stethoscope,
  MapPin,
  Phone,
  Mail,
  Award,
  CheckCircle,
  Send,
  History,
  Timer,
  RefreshCw,
  XCircle,
  FileText,
  Tag,
  Eye,
  Megaphone,
  Bell,
  Trash2,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useAuth } from "@/app/contexts/AuthProvider"
import ThemeToggle from "@/components/ThemeToggle"
import UserDropdown from "@/components/UserDropdown"
import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
import { toast } from "react-hot-toast"
import PHQ9Assessment from "@/components/assessments/PHQ9Assessment"
import GAD7Assessment from "@/components/assessments/GAD7Assessment"
import AssessmentResults from "@/components/assessments/AssessmentResults"
import Swal from "sweetalert2" // Import SweetAlert2
import Link from "next/link" // Import Link


interface MoodData {
  date: string
  mood: number
  energy: number
  anxiety: number
  sleep: number
  notes?: string
}

interface EmergencyAlert {
  _id: string
  status: string
  priority: string
  createdAt: string
  message: string
  userInfo: {
    name: string
    email: string
    phone: string
  }
  location?: {
    lat?: number
    lng?: number
    address?: {
      street?: string
      area?: string
      townOrVillage?: string
      taluka?: string
      district?: string
      pincode?: string
      state?: string
      geoLocation?: {
        lat?: number
        lng?: number
      }
    }
  }
  acceptedBy?: {
    _id: string
    name: string
    phone: string
    distance?: number // Added distance here
  }
  isRead?: boolean
}

interface Post {
  _id: string
  title: string
  content: string
  category: string
  tags: string[]
  authorId: {
    _id: string
    name: string
  }
  authorType: string
  mentionedId?: {
    _id: string
    name: string
  }
  mentionedType?: string
  createdAt: string
  postby: string
  isApproved: boolean
}

interface Hospital {
  _id: string
  name: string
  email: string
  phone: string
  address: string
  specialties: string[]
  isVerified: boolean
  isAvailable: boolean
  isHandleEmergency: boolean
  createdAt: string
  distance?: number
}

interface UserProfile {
  _id: string
  name: string
  email: string
  phone: string
  address: {
    street: string
    area: string
    village: string // Renamed from townOrVillage
    subDistrict: string // Renamed from taluka
    district: string
    pincode: string
    state: string
    geoLocation?: {
      // Added this based on the provided schema
      lat?: number
      lng?: number
    }
  }
  emergencyContacts: Array<{
    name: string
    phone: string
    relation: string
  }>
  medicalInfo: {
    bloodGroup: string
    allergies: string[]
    medications: string[]
    conditions: string[]
  }
}

interface Announcement {
  _id: string
  title: string
  content: string
  ownerId: string
  ownerType: "doctor" | "hospital" | "user"
  mentions: Array<{
    id: string
    name: string
    type: "doctor" | "hospital"
    email: string
  }>
  readBy: string[] // Array of user/doctor/hospital IDs who have read it
  createdAt: string
  isRead?: boolean // For mentions tab, indicates if *this* user has read it
}

export default function UserDashboard() {
  const { user } = useAuth()
  const [moodData, setMoodData] = useState<MoodData[]>([])
  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
  const [allPosts, setAllPosts] = useState<Post[]>([])
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [allAnnouncements, setAllAnnouncements] = useState<Announcement[]>([])
  const [todayMood, setTodayMood] = useState<MoodData | null>(null)
  const [isEmergencyActive, setIsEmergencyActive] = useState(false)
  const [location, setLocation] = useState<{ lat: number; lng: number } | null>(null) // Live location state
  const [loading, setLoading] = useState(true)
  const [currentAlert, setCurrentAlert] = useState<EmergencyAlert | null>(null)
  const [showAlertNotification, setShowAlertNotification] = useState(false)
  const [alertTimer, setAlertTimer] = useState<NodeJS.Timeout | null>(null)
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null)
  const [emergencyButtonDisabled, setEmergencyButtonDisabled] = useState(false)
  const [alertStatus, setAlertStatus] = useState<string | null>(null)
  const [lastAlertCheck, setLastAlertCheck] = useState<Date>(new Date())
  const [currentAssessment, setCurrentAssessment] = useState<string | null>(null)
  const [assessmentResult, setAssessmentResult] = useState<any>(null)
  const [assessmentType, setAssessmentType] = useState<string>("")
  const [unreadAnnouncementsCount, setUnreadAnnouncementsCount] = useState(0)
  const [showLocationPrompt, setShowLocationPrompt] = useState(false) // New state for location prompt
  const [escalationCount, setEscalationCount] = useState(0) // Track escalation attempts

  // Mood tracking state
  const [currentMood, setCurrentMood] = useState(5)
  const [currentEnergy, setCurrentEnergy] = useState(5)
  const [currentAnxiety, setCurrentAnxiety] = useState(5)
  const [currentSleep, setCurrentSleep] = useState(8)
  const [moodNotes, setMoodNotes] = useState("")

  // Emergency form state
  const [emergencyForm, setEmergencyForm] = useState({
    message: "",
    priority: "high",
  })

  // Helper to update location in DB
  const updateLocationInDB = async (newLocation: { lat: number; lng: number }) => {
    try {
      const response = await fetch("/api/user/profile/update-location", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lat: newLocation.lat, lng: newLocation.lng }),
      })
      if (!response.ok) {
        console.error("Failed to update location in DB")
      }
    } catch (error) {
      console.error("Error updating location in DB:", error)
    }
  }

  // Function to request location and handle prompt
  const handleLocationRequest = async () => {
    return new Promise<boolean>((resolve) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
            setLocation(newLocation)
            await updateLocationInDB(newLocation)
            resolve(true) // Location granted and saved
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              setShowLocationPrompt(true) // Show the custom prompt
              resolve(false) // Location denied, prompt shown
            } else {
              toast.error("Location access denied or error. Emergency alerts will use your registered address.")
              resolve(false) // Other error, proceed without live location
            }
          },
          { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }, // Request fresh location
        )
      } else {
        toast.error("Geolocation not supported by this browser. Emergency alerts will use your registered address.")
        resolve(false) // Not supported
      }
    })
  }

  useEffect(() => {
    const initDashboard = async () => {
      setLoading(true)
      // Attempt to get live location and update DB
      await handleLocationRequest()

      // Staggered fetching of dashboard data
      // Fetch user profile and mood data first as they are core
      await fetchUserProfileAndMoodData()

      // Then fetch other data with delays
      setTimeout(async () => {
        await fetchEmergencyAlerts()
      }, 1000) // 1 second delay

      setTimeout(async () => {
        await fetchAllPosts()
      }, 2000) // 2 second delay

      setTimeout(async () => {
        await fetchHospitalsAndAnnouncements()
        setLoading(false) // Set loading to false after all data is initiated
      }, 3000) // 3 second delay
    }

    initDashboard()

    // Polling for alerts (existing logic)
    const interval = setInterval(() => {
      if (currentAlert?._id) {
        checkAlertStatus(currentAlert._id)
      }
    }, 10000)

    return () => clearInterval(interval)
  }, [currentAlert?._id]) // Dependency for polling

  const fetchUserProfileAndMoodData = async () => {
    try {
      const [userProfileRes, moodRes] = await Promise.all([fetch("/api/user/profile"), fetch("/api/user/mood-data")])

      if (userProfileRes.ok) {
        const userProfileData = await userProfileRes.json()
        if (userProfileData.user) {
          setUserProfile(userProfileData.user)
          // Initialize live location state from DB if available
          if (userProfileData.user.address?.geoLocation?.lat && userProfileData.user.address?.geoLocation?.lng) {
            setLocation({
              lat: userProfileData.user.address.geoLocation.lat,
              lng: userProfileData.user.address.geoLocation.lng,
            })
          }
        }
      }
      if (moodRes.ok) {
        const moodData = await moodRes.json()
        setMoodData(moodData.data || [])
        setTodayMood(moodData.today || null)
      }
    } catch (error) {
      console.error("Error fetching user profile or mood data:", error)
    }
  }

  const fetchEmergencyAlerts = async () => {
    try {
      const alertsRes = await fetch("/api/user/emergency-alerts")
      if (alertsRes.ok) {
        const alertsData = await alertsRes.json()
        setEmergencyAlerts(alertsData.data || [])
        const pendingAlerts =
          alertsData.data?.filter(
            (alert: EmergencyAlert) =>
              (alert.status === "pending" || alert.status === "no_response_all_contacted") && !alert.acceptedBy,
          ) || []

        if (pendingAlerts.length > 0) {
          setCurrentAlert(pendingAlerts[0])
          setEmergencyButtonDisabled(true)
          setAlertStatus(pendingAlerts[0].status) // Set alert status for banner
        } else {
          setCurrentAlert(null) // Clear current alert if no pending ones
          setEmergencyButtonDisabled(false)
          setAlertStatus(null) // Clear alert status
          setShowAlertNotification(false) // Hide persistent notification
        }
      }
    } catch (error) {
      console.error("Error fetching emergency alerts:", error)
    }
  }

  const fetchAllPosts = async () => {
    try {
      const postsRes = await fetch("/api/posts")
      if (postsRes.ok) {
        const postsData = await postsRes.json()
        setAllPosts(postsData.data || [])
      }
    } catch (error) {
      console.error("Error fetching all posts:", error)
    }
  }

  const fetchHospitalsAndAnnouncements = async () => {
    try {
      const [hospitalsRes, announcementsRes] = await Promise.all([
        fetch("/api/user/hospitals"),
        fetch("/api/announcements/mentions"), // Fetch all announcements for user, including mentions
      ])

      if (hospitalsRes.ok) {
        const hospitalsData = await hospitalsRes.json()
        setHospitals(hospitalsData.data || [])
      }

      if (announcementsRes.ok) {
        const announcementsData = await announcementsRes.json()
        // Calculate isRead status on the client side based on user.userId
        const processedAnnouncements =
          announcementsData.data?.map((ann: Announcement) => ({
            ...ann,
            isRead: ann.readBy.includes(user?.userId || ""), // Check if current user's ID is in readBy
          })) || []
        setAllAnnouncements(processedAnnouncements)
        // Calculate unread count for the current user
        const unreadCount = processedAnnouncements.filter((ann: Announcement) => !ann.isRead).length || 0
        setUnreadAnnouncementsCount(unreadCount)
      }
    } catch (error) {
      console.error("Error fetching hospitals or announcements:", error)
    }
  }

  const checkAlertStatus = async (alertId: string) => {
    try {
      const response = await fetch("/api/user/check-alert-status", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // to send cookies
        body: JSON.stringify({ alertId }), // 👈 send the required alertId
      })
      const data = await response.json()

      if (response.ok) {
        setAlertStatus(data.alert.status)
        setEmergencyButtonDisabled(data.alert.status === "pending" || data.alert.status === "accepted")
        setLastAlertCheck(new Date())

        if (data.alert.status === "accepted" && data.alert.acceptedBy) {
          toast.success(`🏥 ${data.alert.acceptedBy.name} is coming to help!`, { duration: 8000 })
          setShowAlertNotification(false) // Dismiss notification if accepted
          setEscalationCount(0) // Reset escalation count
          setCurrentAlert(data.alert) // Update current alert with acceptedBy details
          // Remove beforeunload listener when alert is accepted
          window.removeEventListener("beforeunload", handleBeforeUnload)
        } else if (data.alert.status === "pending") {
          // Handle escalation messages
          if (data.escalationOccurred) {
            setEscalationCount((prev) => prev + 1)
            toast.info(
              `⏳ Still finding help. Escalating alert to more hospitals... (Attempt ${escalationCount + 1})`,
              {
                duration: 5000,
              },
            )
          } else {
            // Initial pending state or waiting for first escalation
            toast.info("⏳ Your emergency alert is pending. Searching for nearby hospitals...", { duration: 3000 })
          }
        } else if (data.alert.status === "no_response_all_contacted") {
          setShowAlertNotification(true) // Show persistent notification
          toast.error(
            "🚨 No more hospitals found within 100km to handle the situation. Please call emergency services directly!",
            {
              duration: 15000,
            },
          )
          // Remove beforeunload listener when no more hospitals can be contacted
          window.removeEventListener("beforeunload", handleBeforeUnload)
        }
      } else {
        console.error("API error:", data.message)
      }
    } catch (error) {
      console.error("Error checking alert status:", error)
    }
  }

  const handleBeforeUnload = (e: BeforeUnloadEvent) => {
    e.preventDefault()
    e.returnValue = ""
  }

  const startAlertMonitoring = (alertId: string) => {
    setEscalationCount(0) // Reset count for new alert
    setShowAlertNotification(false) // Hide initial notification until backend signals escalation
    toast.info("⏳ Your emergency alert is pending. Searching for nearby hospitals...", { duration: 3000 })
    // Add beforeunload listener to warn user about active alert
    window.addEventListener("beforeunload", handleBeforeUnload)
  }

  const handleEmergencySOS = async () => {
    if (isEmergencyActive || emergencyButtonDisabled) return

    setIsEmergencyActive(true)
    setEmergencyButtonDisabled(true)

    // Use the current live location if available, otherwise rely on registered address (handled by backend)
    await sendQuickEmergencyAlert(location)
  }

  const sendQuickEmergencyAlert = async (currentLocation: { lat: number; lng: number } | null) => {
    try {
      const response = await fetch("/api/user/emergency-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          location: currentLocation ? { lat: currentLocation.lat, lng: currentLocation.lng } : undefined, // Send current live location if available
          message: "🚨 EMERGENCY SOS - Immediate assistance needed!",
          priority: "critical",
        }),
      })
      const data = await response.json()

      if (response.ok) {
        toast.success(`🚨 Emergency alert sent! User: ${data.userInfo.name} | Phone: ${data.userInfo.phone}`)
        toast.success("🏥 Searching for nearby hospitals... Please wait!")
        setCurrentAlert({ ...currentAlert, _id: data.alertId, status: "pending" }) // Set current alert to trigger polling
        setEmergencyButtonDisabled(true)
        setAlertStatus("pending") // Set status for banner
        startAlertMonitoring(data.alertId) // Start client-side monitoring
        setIsEmergencyActive(false)
      } else {
        toast.error(data.message || "Failed to send emergency alert")
        setIsEmergencyActive(false)
        setEmergencyButtonDisabled(false)
      }
    } catch (error) {
      console.error("Emergency alert error:", error)
      toast.error("Emergency system error. Please try again.")
      setIsEmergencyActive(false)
      setEmergencyButtonDisabled(false)
    }
  }

  const handleFormEmergencyAlert = async () => {
    if (!emergencyForm.message.trim()) {
      toast.error("Please describe your emergency")
      return
    }
    setIsEmergencyActive(true)
    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000,
        })
      })

      const response = await fetch("/api/user/emergency-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: emergencyForm.message,
          priority: emergencyForm.priority,
          location: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
        }),
      })
      const data = await response.json()

      if (response.ok) {
        toast.success("🚨 Emergency alert sent to nearby hospitals!")
        setEmergencyForm({ message: "", priority: "high" })
        setEmergencyButtonDisabled(true)
        setAlertStatus("pending")
        setCurrentAlert({ ...currentAlert, _id: data.alertId, status: "pending" }) // Set current alert to trigger polling
        startAlertMonitoring(data.alertId) // Start client-side monitoring
      } else {
        toast.error(data.message || "Failed to send emergency alert")
      }
    } catch (error) {
      console.error("Error sending emergency alert:", error)
      if (error instanceof GeolocationPositionError) {
        toast.error("Location access required for emergency alerts")
      } else {
        toast.error("Failed to send emergency alert")
      }
    } finally {
      setIsEmergencyActive(false)
    }
  }

  const dismissAlert = async () => {
    if (!currentAlert) return

    try {
      const response = await fetch("/api/user/dismiss-alert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertId: currentAlert._id }),
      })

      if (response.ok) {
        setShowAlertNotification(false)
        setCurrentAlert(null)
        setEmergencyButtonDisabled(false)
        setAlertStatus(null) // Clear alert status
        setEscalationCount(0) // Reset escalation count
        if (alertTimer) {
          clearTimeout(alertTimer)
          setAlertTimer(null)
        }
        toast.success("Alert dismissed")
        fetchEmergencyAlerts() // Re-fetch alerts to update the list
        window.removeEventListener("beforeunload", handleBeforeUnload) // Remove listener
      } else {
        toast.error("Failed to dismiss alert")
      }
    } catch (error) {
      console.error("Error dismissing alert:", error)
      toast.error("Failed to dismiss alert")
    }
  }

  const handleDeleteAlert = async (alertId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    })

    if (result.isConfirmed) {
      try {
        const response = await fetch("/api/user/delete-alert", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ alertId }),
        })

        if (response.ok) {
          toast.success("Alert deleted successfully!")
          fetchEmergencyAlerts() // Re-fetch alerts to update the list
        } else {
          toast.error("Failed to delete alert.")
        }
      } catch (error) {
        console.error("Error deleting alert:", error)
        toast.error("Error deleting alert.")
      }
    }
  }

  const saveMoodEntry = async () => {
    try {
      const response = await fetch("/api/user/mood-entry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood: currentMood,
          energy: currentEnergy,
          anxiety: currentAnxiety,
          sleep: currentSleep,
          notes: moodNotes,
        }),
      })

      if (response.ok) {
        toast.success("✅ Mood entry saved!")
        fetchUserProfileAndMoodData() // Re-fetch mood data
        setMoodNotes("")
      } else {
        toast.error("Failed to save mood entry")
      }
    } catch (error) {
      toast.error("Error saving mood entry")
    }
  }

  const handleMarkAnnouncementRead = async (announcementId: string) => {
    try {
      const response = await fetch("/api/announcements/mark-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ announcementId }),
      })

      if (response.ok) {
        toast.success("Announcement marked as read.")
        fetchHospitalsAndAnnouncements() // Re-fetch to update read status and notification count
      } else {
        toast.error("Failed to mark announcement as read.")
      }
    } catch (error) {
      toast.error("Error marking announcement as read.")
    }
  }

  const getMoodIcon = (mood: number) => {
    if (mood >= 8) return <Smile className="w-6 h-6 text-green-500" />
    if (mood >= 6) return <Meh className="w-6 h-6 text-yellow-500" />
    return <Frown className="w-6 h-6 text-red-500" />
  }

  const getMoodColor = (mood: number) => {
    if (mood >= 8) return "text-green-600"
    if (mood >= 6) return "text-yellow-600"
    return "text-red-600"
  }

  const getWellnessScore = () => {
    if (!todayMood) return 0
    const score = (todayMood.mood + todayMood.energy + (10 - todayMood.anxiety) + Math.min(todayMood.sleep, 8)) / 4
    return Math.round(score * 10)
  }

  const getWeeklyAverage = () => {
    if (moodData.length === 0) return 0
    const recentData = moodData.slice(-7)
    const avgMood = recentData.reduce((sum, entry) => sum + entry.mood, 0) / recentData.length
    return Math.round(avgMood * 10) / 10
  }

  const formatTimeAgo = (dateString: string) => {
    const now = new Date()
    const alertTime = new Date(dateString)
    const diffInMinutes = Math.floor((now.getTime() - alertTime.getTime()) / (1000 * 60))

    if (diffInMinutes < 1) return "Just now"
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`
    const diffInHours = Math.floor(diffInMinutes / 60)
    if (diffInHours < 24) return `${diffInHours}h ago`
    return alertTime.toLocaleDateString()
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500 text-white"
      case "high":
        return "bg-orange-500 text-white"
      case "medium":
        return "bg-yellow-500 text-black"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-500 text-white"
      case "accepted":
        return "bg-green-500 text-white"
      case "declined":
        return "bg-red-500 text-white"
      case "cancelled":
        return "bg-gray-500 text-white"
      case "no_response_all_contacted":
        return "bg-red-700 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const formatLocationAddress = (address: any) => {
    if (!address) return "Location not available"
    const parts = [
      address.area,
      address.village || address.townOrVillage,
      address.subDistrict || address.taluka,
      address.district,
      address.state || "Gujarat",
      address.pincode,
    ].filter(Boolean)
    return parts.join(", ")
  }

  const openGoogleMaps = (address: any) => {
    if (!address) {
      toast.error("Location not available")
      return
    }
    const searchQuery = formatLocationAddress(address)
    const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
    window.open(googleMapsUrl, "_blank")
    toast.success("🗺️ Opening location in Google Maps...")
  }

  const getAuthorIcon = (authorType: string) => {
    return authorType === "Doctor" ? (
      <Stethoscope className="w-5 h-5 text-green-600" />
    ) : (
      <Building2 className="w-5 h-5 text-purple-600" />
    )
  }

  const getAuthorBadgeColor = (authorType: string) => {
    return authorType === "Doctor"
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
      : "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading your wellness dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Location Prompt Dialog */}
      <Dialog open={showLocationPrompt} onOpenChange={setShowLocationPrompt}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <MapPin className="w-5 h-5 text-blue-500" />
              <span>Your Location Is Safe With Us</span>
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 text-gray-700 dark:text-gray-300">
            <p>To connect you with the nearest hospital quickly during emergencies, we need your live location.</p>
            <ul className="list-disc list-inside space-y-1">
              <li>{"✅ We do not store your location permanently"}</li>
              <li>{"✅ We never share it with anyone else"}</li>
              <li>{"✅ It's used only to find nearby help in real-time"}</li>
            </ul>
            <p className="font-semibold">This is only for your safety — your privacy is 100% protected.</p>
            <p className="text-blue-600 dark:text-blue-400 font-medium">
              👉 Please tap “Allow” when your browser asks for permission.
            </p>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setShowLocationPrompt(false)
                // User chose to proceed without live location, dashboard already loaded with existing data
              }}
            >
              Proceed Without Location
            </Button>
            <Button
              onClick={async () => {
                setShowLocationPrompt(false) // Close prompt
                setLoading(true) // Show loading again while re-fetching
                await handleLocationRequest() // Retry requesting location
                // Re-fetch all data after location attempt
                await fetchUserProfileAndMoodData()
                setTimeout(async () => {
                  await fetchEmergencyAlerts()
                }, 1000)
                setTimeout(async () => {
                  await fetchAllPosts()
                }, 2000)
                setTimeout(async () => {
                  await fetchHospitalsAndAnnouncements()
                  setLoading(false)
                }, 3000)
              }}
            >
              Allow Location
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Emergency Alert Notification (Persistent for no_response_all_contacted) */}
      <AnimatePresence>
        {showAlertNotification && currentAlert && currentAlert.status === "no_response_all_contacted" && (
          <motion.div
            initial={{ opacity: 0, y: -100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md"
          >
            <Alert className="border-red-500 bg-red-50 dark:bg-red-900/20">
              <AlertTriangle className="h-4 w-4 text-red-600" />
              <AlertDescription className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-red-800 dark:text-red-200">🚨 HIGH ALERT: No Hospital Response</p>
                  <p className="text-red-700 dark:text-red-300 text-sm">
                    Your emergency alert is still pending. Consider calling emergency services directly.
                  </p>
                  {currentAlert && (
                    <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                      User: {currentAlert.userInfo?.name || userProfile?.name || "Unknown"} | Phone:{" "}
                      {currentAlert.userInfo?.phone || userProfile?.phone || "Unknown"}
                    </p>
                    
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={dismissAlert} className="text-red-600 hover:text-red-800">
                  <CheckCircle className="w-4 h-4" />
                </Button>
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header with Animated Icons */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
        <AnimatedHealthIcons />
        <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg"
              animate={{
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              <Heart className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">RuralReach</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Your Wellness Dashboard</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">


                                 <Link href="/" passHref>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 dark:text-gray-400 p-4 sm:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition w-14 h-14"
              >
                <Home className="w-7 h-7 sm:w-6 sm:h-6" />
                <span className="sr-only">Home</span>
              </Button>
            </Link>
            
            

            {/* Hospital Info Button
            <Dialog open={showHospitalInfo} onOpenChange={setShowHospitalInfo}>
              <DialogTrigger asChild>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
                >
                  <Building2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Hospital Info</span>
                </motion.button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <span>Connected Hospitals</span>
                  </DialogTitle>
                </DialogHeader>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                  {hospitals.map((hospital) => (
                    <motion.div
                      key={hospital._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <Building2 className="w-5 h-5 text-purple-600" />
                          <h3 className="font-semibold text-lg">{hospital.name}</h3>
                          {hospital.isVerified && <Award className="w-4 h-4 text-green-500" />}
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant={hospital.isAvailable ? "default" : "secondary"}>
                            {hospital.isAvailable ? "Available" : "Unavailable"}
                          </Badge>
                          {hospital.isHandleEmergency && (
                            <Badge variant="destructive" className="text-xs">
                              Emergency 24/7
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                          <Mail className="w-4 h-4" />
                          <span>{hospital.email}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                          <Phone className="w-4 h-4" />
                          <span>{hospital.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                          <MapPin className="w-4 h-4" />
                          <span>{hospital.address}</span>
                        </div>
                      </div>
                      <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Specialties:</p>
                        <div className="flex flex-wrap gap-1">
                          {hospital.specialties.map((specialty, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-xs text-gray-500">
                          Joined: {new Date(hospital.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </DialogContent>
            </Dialog> */}




<Link href="/all-hospitals" passHref>
  <Button
    className="flex items-center space-x-2 bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-2 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800 transition-colors"
  >
    <Building2 className="w-4 h-4" />
    <span className="text-sm font-medium">Hospital Info</span>
  </Button>
</Link>


            <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Last checked: {lastAlertCheck.toLocaleTimeString()}</span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => currentAlert?._id && checkAlertStatus(currentAlert._id)} // Pass alertId if available
              className="flex items-center space-x-2 bg-transparent"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Refresh</span>
            </Button>
            <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              {unreadAnnouncementsCount > 0 && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  {unreadAnnouncementsCount}
                </motion.span>
              )}
            </motion.div>
            <ThemeToggle />
            <UserDropdown />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome back, {user?.name}! 👋</h2>
          <p className="text-gray-600 dark:text-gray-400">
            How are you feeling today? Let's track your wellness journey and stay healthy together.
          </p>
        </motion.div>

        {/* Emergency SOS Button - Always Available */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card className="border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
                    animate={{
                      boxShadow: [
                        "0 0 0 0 rgba(239, 68, 68, 0.7)",
                        "0 0 0 10px rgba(239, 68, 68, 0)",
                        "0 0 0 0 rgba(239, 68, 68, 0)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <AlertTriangle className="w-6 h-6 text-white" />
                  </motion.div>
                  <div>
                    <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">Quick Emergency Support</h3>
                    <p className="text-red-600 dark:text-red-300">Need immediate help? Press for instant alert</p>
                    {userProfile?.address?.geoLocation?.lat && userProfile?.address?.geoLocation?.lng ? (
                      <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                        📍 Location: {userProfile.address.geoLocation.lat.toFixed(4)},{" "}
                        {userProfile.address.geoLocation.lng.toFixed(4)} (from profile)
                      </p>
                    ) : location ? (
                      <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                        📍 Live Location: {location.lat.toFixed(4)}, {location.lng.toFixed(4)} (current session)
                      </p>
                    ) : (
                      <p className="text-xs text-red-500 dark:text-red-400 mt-1">
                        📍 Location: Not available (please enable location services or reload the page)
                      </p>
                    )}
                    {emergencyButtonDisabled && alertStatus !== "accepted" && (
                      <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                        ⚠️ Emergency alert already sent. Waiting for hospital response...
                      </p>
                    )}
                  </div>
                </div>
                <motion.div
                  whileHover={{ scale: emergencyButtonDisabled ? 1 : 1.05 }}
                  whileTap={{ scale: emergencyButtonDisabled ? 1 : 0.95 }}
                >
                  <Button
                    onClick={handleEmergencySOS}
                    disabled={isEmergencyActive || emergencyButtonDisabled}
                    className={`font-bold px-8 py-3 text-lg shadow-lg transition-all duration-300 ${
                      emergencyButtonDisabled
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-700 hover:shadow-xl"
                    } text-white`}
                  >
                    {isEmergencyActive
                      ? "🚨 Sending..."
                      : emergencyButtonDisabled
                        ? "🚨 Alert Sent"
                        : "🆘 SOS Emergency"}
                  </Button>
                </motion.div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Emergency Status Banner (New Section) */}
        {alertStatus && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <Card
              className={`border-2 ${
                alertStatus === "pending"
                  ? "border-yellow-200 dark:border-yellow-800 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20"
                  : alertStatus === "accepted"
                    ? "border-green-200 dark:border-green-800 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
                    : alertStatus === "no_response_all_contacted"
                      ? "border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20"
                      : "border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20" // For 'declined' or 'cancelled'
              }`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg ${
                        alertStatus === "pending"
                          ? "bg-yellow-500"
                          : alertStatus === "accepted"
                            ? "bg-green-500"
                            : alertStatus === "no_response_all_contacted"
                              ? "bg-red-500"
                              : "bg-red-500" // For 'declined' or 'cancelled'
                      }`}
                      animate={{
                        boxShadow:
                          alertStatus === "pending"
                            ? [
                                "0 0 0 0 rgba(234, 179, 8, 0.7)",
                                "0 0 0 10px rgba(234, 179, 8, 0)",
                                "0 0 0 0 rgba(234, 179, 8, 0)",
                              ]
                            : undefined,
                      }}
                      transition={{ duration: 2, repeat: alertStatus === "pending" ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      {alertStatus === "pending" ? (
                        <Timer className="w-6 h-6 text-white" />
                      ) : alertStatus === "accepted" ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <XCircle className="w-6 h-6 text-white" />
                      )}
                    </motion.div>
                    <div>
                      <h3
                        className={`text-lg font-semibold ${
                          alertStatus === "pending"
                            ? "text-yellow-800 dark:text-yellow-200"
                            : alertStatus === "accepted"
                              ? "text-green-800 dark:text-green-200"
                              : "text-red-800 dark:text-red-200"
                        }`}
                      >
                        {alertStatus === "pending" && "🚨 Emergency Alert Sent"}
                        {alertStatus === "accepted" && "✅ Hospital is Coming!"}
                        {alertStatus === "declined" && "❌ Alert Declined"}
                        {alertStatus === "cancelled" && "🚫 Alert Cancelled"}
                        {alertStatus === "no_response_all_contacted" && "🚨 No Hospital Response"}
                      </h3>
                      <p
                        className={`${
                          alertStatus === "pending"
                            ? "text-yellow-600 dark:text-yellow-300"
                            : alertStatus === "accepted"
                              ? "text-green-600 dark:text-green-300"
                              : "text-red-600 dark:text-red-300"
                        }`}
                      >
                        {alertStatus === "pending" && "Waiting for hospital response..."}
                        {alertStatus === "accepted" && currentAlert?.acceptedBy && (
                          <>
                            Accepted by {currentAlert.acceptedBy.name} ({currentAlert.acceptedBy.phone})
                            {currentAlert.acceptedBy.distance &&
                              ` (${currentAlert.acceptedBy.distance.toFixed(2)}km away)`}
                          </>
                        )}
                        {alertStatus === "declined" && "Your emergency request was declined"}
                        {alertStatus === "cancelled" && "You have cancelled this emergency alert."}
                        {alertStatus === "no_response_all_contacted" &&
                          "No nearby hospitals could respond. Please call emergency services directly."}
                      </p>
                    </div>
                  </div>
                  {(alertStatus === "pending" || alertStatus === "no_response_all_contacted") && (
                    <Button onClick={dismissAlert} variant="outline" className="font-bold px-6 py-2 bg-transparent">
                      Dismiss
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Wellness Score</p>
                    <p className="text-2xl font-bold text-blue-600">{getWellnessScore()}%</p>
                    <p className="text-xs text-gray-500 mt-1">Based on today's data</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <Target className="w-6 h-6 text-blue-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Today's Mood</p>
                    <div className="flex items-center space-x-2">
                      {todayMood ? getMoodIcon(todayMood.mood) : <Meh className="w-6 h-6 text-gray-400" />}
                      <span
                        className={`text-lg font-semibold ${todayMood ? getMoodColor(todayMood.mood) : "text-gray-400"}`}
                      >
                        {todayMood?.mood || "Not set"}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Out of 10</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Brain className="w-6 h-6 text-green-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Sleep Last Night</p>
                    <p className="text-2xl font-bold text-purple-600">{todayMood?.sleep || 0}h</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {(todayMood?.sleep || 0) >= 7 ? "Good sleep!" : "Need more rest"}
                    </p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
                    animate={{
                      y: [0, -5, 0],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Moon className="w-6 h-6 text-purple-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          <motion.div whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Energy Level</p>
                    <p className="text-2xl font-bold text-orange-600">{todayMood?.energy || 0}/10</p>
                    <p className="text-xs text-gray-500 mt-1">Weekly avg: {getWeeklyAverage()}</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center"
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 180, 360],
                    }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Zap className="w-6 h-6 text-orange-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs defaultValue="mood" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="mood">Mood Tracking</TabsTrigger>
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
              <TabsTrigger value="emergency">Emergency Alert</TabsTrigger>
              <TabsTrigger value="past-alerts">Past Alerts</TabsTrigger>
              <TabsTrigger value="assessment">Self Assessment</TabsTrigger>
            </TabsList>

            {/* Mood Tracking Tab */}
            <TabsContent value="mood" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Today's Mood Entry */}
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Plus className="w-5 h-5" />
                      <span>Log Today's Mood</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">Mood (1-10)</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={currentMood}
                          onChange={(e) => setCurrentMood(Number(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <div className="flex items-center space-x-2">
                          {getMoodIcon(currentMood)}
                          <span className="text-lg font-semibold w-8">{currentMood}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Energy Level (1-10)</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={currentEnergy}
                          onChange={(e) => setCurrentEnergy(Number(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <div className="flex items-center space-x-2">
                          <Zap className="w-5 h-5 text-orange-500" />
                          <span className="text-lg font-semibold w-8">{currentEnergy}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Anxiety Level (1-10)</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="1"
                          max="10"
                          value={currentAnxiety}
                          onChange={(e) => setCurrentAnxiety(Number(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <div className="flex items-center space-x-2">
                          <AlertTriangle className="w-5 h-5 text-red-500" />
                          <span className="text-lg font-semibold w-8">{currentAnxiety}</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Sleep Hours</label>
                      <div className="flex items-center space-x-4">
                        <input
                          type="range"
                          min="0"
                          max="12"
                          value={currentSleep}
                          onChange={(e) => setCurrentSleep(Number(e.target.value))}
                          className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                        />
                        <div className="flex items-center space-x-2">
                          <Moon className="w-5 h-5 text-purple-500" />
                          <span className="text-lg font-semibold w-8">{currentSleep}h</span>
                        </div>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Notes (Optional)</label>
                      <Textarea
                        value={moodNotes}
                        onChange={(e) => setMoodNotes(e.target.value)}
                        placeholder="How are you feeling today? Any specific thoughts or events?"
                        className="w-full"
                        rows={3}
                      />
                    </div>
                    <Button
                      onClick={saveMoodEntry}
                      className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600"
                    >
                      Save Mood Entry
                    </Button>
                  </CardContent>
                </Card>

                {/* Mood Chart */}
                <Card className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5" />
                      <span>7-Day Mood Trend</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {moodData.length > 0 ? (
                      <div className="space-y-4">
                        {moodData.slice(-7).map((entry, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                          >
                            <div className="flex items-center space-x-3">
                              <Calendar className="w-4 h-4 text-gray-500" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {new Date(entry.date).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-3">
                              {getMoodIcon(entry.mood)}
                              <Progress value={entry.mood * 10} className="w-20" />
                              <span className="text-sm font-medium w-12">{entry.mood}/10</span>
                            </div>
                          </motion.div>
                        ))}
                        <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-blue-700 dark:text-blue-300">Weekly Average</span>
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-4 h-4 text-blue-600" />
                              <span className="font-semibold text-blue-600">{getWeeklyAverage()}/10</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Brain className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 dark:text-gray-400">No mood data yet</p>
                        <p className="text-sm text-gray-500">Start tracking to see your trends</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Combined Posts Tab */}
            <TabsContent value="posts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    <span>Healthcare Posts</span>
                    <Badge variant="secondary">{allPosts.length} posts</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {allPosts.length > 0 ? (
                    <div className="space-y-6">
                      {allPosts.map((post, index) => (
                        <motion.div
                          key={post._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                          className="border rounded-xl p-6 hover:shadow-lg transition-all duration-300 bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900"
                        >
                          {/* Post Header */}
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-4">
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center ${getAuthorBadgeColor(post.authorType)}`}
                              >
                                {getAuthorIcon(post.authorType)}
                              </div>
                              <div>
                                <div className="flex items-center space-x-2">
                                  <p className="font-semibold text-lg">
                                    {post.authorType === "Doctor" ? "Dr. " : "Hospital "}
                                    {post.postby || "Mahadev"}
                                  </p>
                                  <Badge className={getAuthorBadgeColor(post.authorType)}>{post.authorType}</Badge>
                                </div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                  {post.authorType === "Doctor" ? "Medical Professional" : "Healthcare Institution"}
                                </p>
                                {post.mentionedId && (
                                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">
                                    mentioned {post.mentionedType === "Doctor" ? "Dr. " : ""}
                                    {post.mentionedId.name}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <Badge variant="outline" className="capitalize">
                                {post.category.replace("-", " ")}
                              </Badge>
                              <div className="flex items-center space-x-1 text-xs text-gray-500">
                                <Clock className="w-3 h-3" />
                                <span>{formatTimeAgo(post.createdAt)}</span>
                              </div>
                            </div>
                          </div>

                          {/* Post Content */}
                          <div className="mb-4">
                            <h3 className="font-bold text-xl mb-3 text-gray-900 dark:text-white">{post.title}</h3>
                            <div className="prose prose-gray dark:prose-invert max-w-none">
                              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{post.content}</p>
                            </div>
                          </div>

                          {/* Tags */}
                          {post.tags.length > 0 && (
                            <div className="mb-4">
                              <div className="flex items-center space-x-2 mb-2">
                                <Tag className="w-4 h-4 text-gray-500" />
                                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Tags:</span>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {post.tags.map((tag, tagIndex) => (
                                  <Badge
                                    key={tagIndex}
                                    variant="secondary"
                                    className="text-xs bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                  >
                                    #{tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}

                          {/* Post Actions */}
                          <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex items-center space-x-6">
                              <div className="flex items-center space-x-2 text-gray-600">
                                <Eye className="w-5 h-5" />
                                <span className="text-xs text-gray-500">Public post</span>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              {post.isApproved && (
                                <Badge variant="outline" className="text-green-600 border-green-200">
                                  <CheckCircle className="w-3 h-3 mr-1" />
                                  Verified
                                </Badge>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-16">
                      <FileText className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                      <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        No posts available
                      </h3>
                      <p className="text-gray-500 mb-4">Healthcare posts from doctors and hospitals will appear here</p>
                      <div className="flex items-center space-x-4 text-sm text-gray-400">
                        <Stethoscope className="w-4 h-4" />
                        <span>Doctor posts</span>
                      </div>
                      <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                      <div className="flex items-center space-x-2">
                        <Building2 className="w-4 h-4" />
                        <span>Hospital updates</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Announcements Tab */}
            <TabsContent value="announcements" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Megaphone className="w-5 h-5 text-blue-600" />
                    <span>All Announcements</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {allAnnouncements.length > 0 ? (
                    <div className="space-y-4">
                      {allAnnouncements.map((announcement, index) => (
                        <motion.div
                          key={announcement._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                          className={`border rounded-lg p-4 hover:shadow-md transition-all duration-300 ${
                            announcement.isRead ? "bg-gray-50 dark:bg-gray-800" : "bg-yellow-50 dark:bg-yellow-900/20"
                          }`}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline">{announcement.ownerType}</Badge>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="text-xs text-gray-500">
                                {new Date(announcement.createdAt).toLocaleDateString()}
                              </span>
                              {!announcement.isRead && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleMarkAnnouncementRead(announcement._id)}
                                  className="text-blue-600 hover:text-blue-800"
                                >
                                  Mark as Read
                                </Button>
                              )}
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{announcement.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Eye className="w-4 h-4" />
                              <span className="text-sm">View details</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Megaphone className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        No announcements yet
                      </h3>
                      <p className="text-gray-500">Announcements from doctors and hospitals will appear here.</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Emergency Alert Tab - Form-based */}
            <TabsContent value="emergency" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="w-5 h-5 text-red-500" />
                    <span>Detailed Emergency Alert</span>
                    {emergencyButtonDisabled && <Badge variant="destructive">Alert Active</Badge>}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Show form if no alert is active, or if alert is accepted/declined/cancelled */}
                  {!emergencyButtonDisabled ||
                  alertStatus === "accepted" ||
                  alertStatus === "declined" ||
                  alertStatus === "cancelled" ? (
                    <>
                      <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                        <AlertTriangle className="h-4 w-4" />
                        <AlertDescription>
                          <strong>Emergency Use Only:</strong> This will immediately alert nearby hospitals with
                          detailed information.
                        </AlertDescription>
                      </Alert>
                      <div>
                        <label className="block text-sm font-medium mb-2">Describe your emergency *</label>
                        <Textarea
                          value={emergencyForm.message}
                          onChange={(e) => setEmergencyForm({ ...emergencyForm, message: e.target.value })}
                          placeholder="Please describe your medical emergency in detail..."
                          className="w-full min-h-[120px]"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Priority Level</label>
                        <Select
                          value={emergencyForm.priority}
                          onValueChange={(value) => setEmergencyForm({ ...emergencyForm, priority: value })}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="critical">🔴 Critical - Life threatening</SelectItem>
                            <SelectItem value="high">🟠 High - Urgent medical attention</SelectItem>
                            <SelectItem value="medium">🟡 Medium - Medical assistance needed</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button
                        onClick={handleFormEmergencyAlert}
                        disabled={isEmergencyActive || !emergencyForm.message.trim()}
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 text-lg"
                      >
                        {isEmergencyActive ? (
                          <>
                            <motion.div
                              className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            />
                            Sending Emergency Alert...
                          </>
                        ) : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            Send Detailed Emergency Alert
                          </>
                        )}
                      </Button>
                    </>
                  ) : (
                    // Show active alert message only if pending or no_response_all_contacted
                    emergencyButtonDisabled &&
                    (alertStatus === "pending" || alertStatus === "no_response_all_contacted") && (
                      <div className="text-center py-12">
                        <motion.div
                          className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4"
                          animate={{
                            boxShadow: [
                              "0 0 0 0 rgba(234, 179, 8, 0.7)",
                              "0 0 0 20px rgba(234, 179, 8, 0)",
                              "0 0 0 0 rgba(234, 179, 8, 0)",
                            ],
                          }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        >
                          <Timer className="w-8 h-8 text-white" />
                        </motion.div>
                        <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
                          Emergency Alert Active
                        </h3>
                        <p className="text-yellow-600 dark:text-yellow-300 mb-4">
                          Your emergency alert has been sent to nearby hospitals. Please wait for their response.
                        </p>
                        <Button
                          onClick={dismissAlert}
                          variant="outline"
                          className="border-yellow-500 text-yellow-700 hover:bg-yellow-50 bg-transparent"
                        >
                          Dismiss Alert
                        </Button>
                      </div>
                    )
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Past Emergency Alerts Tab */}
            <TabsContent value="past-alerts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <History className="w-5 h-5 text-blue-500" />
                    <span>Past Emergency Alert Requests</span>
                    <Badge variant="secondary">{emergencyAlerts.length} total</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {emergencyAlerts.length > 0 ? (
                    <div className="space-y-4">
                      {emergencyAlerts.map((alert, index) => (
                        <motion.div
                          key={alert._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          className={`border rounded-lg p-4 hover:shadow-md transition-all duration-300 ${
                            alert.status === "pending"
                              ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
                              : alert.status === "accepted"
                                ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                                : alert.status === "cancelled"
                                  ? "border-gray-200 bg-gray-50 dark:border-gray-800 dark:bg-gray-900/20"
                                  : alert.status === "no_response_all_contacted"
                                    ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                                    : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20" // For 'declined'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center space-x-3 mb-3">
                                <motion.div
                                  className={`w-3 h-3 rounded-full ${
                                    alert.status === "pending"
                                      ? "bg-yellow-500"
                                      : alert.status === "accepted"
                                        ? "bg-green-500"
                                        : alert.status === "cancelled"
                                          ? "bg-gray-500"
                                          : alert.status === "no_response_all_contacted"
                                            ? "bg-red-500"
                                            : "bg-red-500" // For 'declined'
                                  }`}
                                  animate={{ scale: alert.status === "pending" ? [1, 1.2, 1] : 1 }}
                                  transition={{
                                    duration: 1,
                                    repeat: alert.status === "pending" ? Number.POSITIVE_INFINITY : 0,
                                  }}
                                />
                                <h3 className="font-semibold text-lg">Emergency Alert</h3>
                                <Badge className={getPriorityColor(alert.priority)}>
                                  {alert.priority.toUpperCase()}
                                </Badge>
                                <Badge className={getStatusColor(alert.status)}>{alert.status.toUpperCase()}</Badge>
                              </div>
                              <div className="mb-4">
                                <h4 className="font-medium text-gray-900 dark:text-white mb-2">Emergency Message</h4>
                                <p className="text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                                  {alert.message}
                                </p>
                              </div>
                              {/* Removed user's own location display from past alerts */}
                              {alert.acceptedBy && (
                                <div className="mb-4">
                                  <h4 className="font-medium text-gray-900 dark:text-white mb-2">Hospital Response</h4>
                                  <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
                                    <div className="flex items-center space-x-2">
                                      <CheckCircle className="w-4 h-4 text-green-500" />
                                      <span className="font-medium text-green-800 dark:text-green-200">
                                        Accepted by {alert.acceptedBy.name}
                                      </span>
                                    </div>
                                    <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                                      Contact: {alert.acceptedBy.phone}
                                    </p>
                                    {alert.acceptedBy.distance && (
                                      <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                                        Distance from your location: {alert.acceptedBy.distance.toFixed(2)}km
                                      </p>
                                    )}
                                  </div>
                                </div>
                              )}
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                  <Timer className="w-4 h-4" />
                                  <span>{formatTimeAgo(alert.createdAt)}</span>
                                </div>
                                {/* Delete button shows when alert is not pending */}
                                {alert.status !== "pending" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleDeleteAlert(alert._id)}
                                    className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                  >
                                    <Trash2 className="w-4 h-4 mr-1" />
                                    Delete
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <History className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        No Past Alert Requests
                      </h3>
                      <p className="text-gray-500">You haven't sent any emergency alerts yet</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Self Assessment Tab */}
            <TabsContent value="assessment" className="space-y-6">
              {currentAssessment ? (
                currentAssessment === "phq9" ? (
                  <PHQ9Assessment
                    onComplete={(result) => {
                      setAssessmentResult(result)
                      setCurrentAssessment("results")
                    }}
                    onBack={() => setCurrentAssessment(null)}
                  />
                ) : currentAssessment === "gad7" ? (
                  <GAD7Assessment
                    onComplete={(result) => {
                      setAssessmentResult(result)
                      setCurrentAssessment("results")
                    }}
                    onBack={() => setCurrentAssessment(null)}
                  />
                ) : currentAssessment === "results" ? (
                  <AssessmentResults
                    type={assessmentType}
                    result={assessmentResult}
                    onBack={() => setCurrentAssessment(null)}
                    onReturnToDashboard={() => {
                      setCurrentAssessment(null)
                      setAssessmentResult(null)
                      setAssessmentType("")
                    }}
                  />
                ) : null
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      icon: Brain,
                      title: "Depression Assessment (PHQ-9)",
                      desc: "A 9-question assessment to help identify symptoms of depression and track your mental health.",
                      color: "blue",
                      type: "phq9",
                    },
                    {
                      icon: AlertTriangle,
                      title: "Anxiety Assessment (GAD-7)",
                      desc: "A 7-question screening tool for generalized anxiety disorder and anxiety symptoms.",
                      color: "yellow",
                      type: "gad7",
                    },
                    {
                      icon: Zap,
                      title: "Stress Level Check",
                      desc: "Quick assessment to understand your current stress levels and get personalized recommendations.",
                      color: "red",
                      type: "stress",
                      disabled: true,
                    },
                    {
                      icon: Heart,
                      title: "General Wellness Check",
                      desc: "Comprehensive wellness assessment covering multiple areas of your physical and mental health.",
                      color: "green",
                      type: "wellness",
                      disabled: true,
                    },
                  ].map((assessment, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: assessment.disabled ? 1 : 1.02, y: assessment.disabled ? 0 : -5 }}
                    >
                      <Card
                        className={`hover:shadow-lg transition-all duration-300 ${assessment.disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer group"}`}
                      >
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <assessment.icon className={`w-5 h-5 text-${assessment.color}-500`} />
                            <span>{assessment.title}</span>
                            {assessment.disabled && <Badge variant="secondary">Coming Soon</Badge>}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-600 dark:text-gray-300 mb-4">{assessment.desc}</p>
                          <Button
                            className={`w-full ${assessment.disabled ? "cursor-not-allowed" : `group-hover:bg-${assessment.color}-600`}`}
                            disabled={assessment.disabled}
                            onClick={() => {
                              if (!assessment.disabled) {
                                setAssessmentType(assessment.type)
                                setCurrentAssessment(assessment.type)
                              }
                            }}
                          >
                            {assessment.disabled ? "Coming Soon" : "Start Assessment"}
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
