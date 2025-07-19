



// "use client"
// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import {
//   AlertTriangle,
//   Building2,
//   Plus,
//   MessageSquare,
//   Bell,
//   Send,
//   UserCheck,
//   Tag,
//   Calendar,
//   Eye,
//   Edit,
//   Trash2,
//   Clock,
//   Shield,
//   Activity,
//   Stethoscope,
//   User,
//   Phone,
//   Mail,
//   Navigation,
//   Timer,
//   RefreshCw,
//   CheckCircle,
//   XCircle,
//   Map,
//   MapPin,
//   ExternalLink,
//   Megaphone,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import ThemeToggle from "@/components/ThemeToggle"
// import UserDropdown from "@/components/UserDropdown"
// import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
// import { toast } from "react-hot-toast"
// import Swal from "sweetalert2"
// import { useAuth } from "@/app/contexts/AuthProvider"

// interface Post {
//   _id: string
//   title: string
//   content: string
//   category: string
//   tags: string[]
//   authorType: "Doctor" | "Hospital"
//   postby: string
//   email: string
//   createdAt: string
//   isApproved: boolean
// }

// interface Doctor {
//   _id: string
//   name: string
//   email: string
//   specialty: string
//   isVerified: boolean
// }

// interface EmergencyAlert {
//   _id: string
//   userInfo: {
//     name: string
//     email: string
//     phone: string
//   }
//   userId?: {
//     name: string
//     email: string
//     phone: string
//     address: any
//   }
//   location: {
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
//   message: string
//   priority: string
//   status: string
//   createdAt: string
//   distance?: number
//   proximityMethod?: string
//   acceptedBy?: {
//     _id: string
//     name: string
//   }
//   hospitalAlertStatus?: "pending" | "read" | "accepted" | "declined" | "timedOut"
// }

// interface HospitalData {
//   _id: string
//   name: string
//   email: string
//   phone: string
//   isAvailable: boolean
//   isHandleEmergency: boolean
//   isVerified: boolean
//   address: any
//   location: {
//     lat?: number
//     lng?: number
//   }
// }

// interface Announcement {
//   _id: string
//   ownerEmail: string
//   ownerType: "doctor" | "hospital" | "user"
//   title: string
//   content: string
//   announcedBy: string
//   readBy: string[]
//   createdAt: string
//   updatedAt: string
// }

// export default function HospitalDashboard() {
//   const { user } = useAuth()
//   const [ownPosts, setOwnPosts] = useState<Post[]>([])
//   const [allOtherPosts, setAllOtherPosts] = useState<Post[]>([])
//   const [doctors, setDoctors] = useState<Doctor[]>([])
//   const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
//   const [ownAnnouncements, setOwnAnnouncements] = useState<Announcement[]>([])
//   const [loading, setLoading] = useState(true)
//   const [notifications, setNotifications] = useState(0)
//   const [hospital, setHospital] = useState<HospitalData | null>(null)
//   const [isHandleEmergency, setIsHandleEmergency] = useState<boolean>(false)
//   const [isAvailable, setIsAvailable] = useState<boolean>(false)
//   const [editingPost, setEditingPost] = useState<Post | null>(null)
//   const [selectedAlert, setSelectedAlert] = useState<EmergencyAlert | null>(null)
//   const [showAlertDialog, setShowAlertDialog] = useState(false)
//   const [responding, setResponding] = useState(false)
//   const [lastChecked, setLastChecked] = useState<Date>(new Date())
//   const [autoRefresh, setAutoRefresh] = useState(true)

//   // State for the fixed hospital location (from DB, geocoded from address)
//   const [fixedLocation, setFixedLocation] = useState<{ lat: number; lng: number } | null>(null)

//   // Post creation state
//   const [newPost, setNewPost] = useState({
//     title: "",
//     content: "",
//     category: "",
//     tags: "",
//   })
//   // Announcement creation state
//   const [newAnnouncement, setNewAnnouncement] = useState({
//     title: "",
//     content: "",
//   })
//   const [isAnnouncementFormOpen, setIsAnnouncementFormOpen] = useState(false)
//   const [isSavingAnnouncement, setIsSavingAnnouncement] = useState(false)

//   const categories = [
//     "emergency-care",
//     "hospital-services",
//     "health-tips",
//     "prevention",
//     "treatment",
//     "facilities",
//     "announcements",
//     "cardiology",
//     "neurology",
//     "pediatrics",
//   ]

//   // Initial data fetching and emergency alert polling
//   useEffect(() => {
//     fetchHospitalData()
//     fetchDashboardData()

//     const interval = setInterval(() => {
//       if (autoRefresh && isHandleEmergency) {
//         fetchEmergencyAlerts()
//       }
//     }, 30000)
//     return () => clearInterval(interval)
//   }, [autoRefresh, isHandleEmergency])

//   // Effect to trigger fixed location geocoding after a delay if not already set
//   useEffect(() => {
//     if (hospital && !hospital.location?.lat && !hospital.location?.lng) {
//       console.log("Hospital fixed location not set. Initiating geocoding in 4 minutes...")
//       // Using 5 seconds for demonstration. For production, use 4 * 60 * 1000 (4 minutes).
//       const geocodeTimer = setTimeout(() => {
//         console.log("4 minutes passed. Attempting to geocode hospital address.")
//         triggerFixedLocationGeocoding(hospital._id)
//       }, 5 * 1000)

//       return () => clearTimeout(geocodeTimer)
//     }
//   }, [hospital]) // Re-run when hospital data changes

//   const triggerFixedLocationGeocoding = async (hospitalId: string) => {
//     try {
//       const response = await fetch("/api/hospital/update-fixed-location", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ hospitalId }),
//       })
//       const data = await response.json()
//       if (response.ok && data.success) {
//         // No toast message here, just update the UI
//         fetchHospitalData() // Re-fetch hospital data to update the UI with the new fixed location
//       } else {
//         console.error("Failed to update fixed location:", data.message)
//         // Optionally, log this error but don't show a toast to the user for this background process
//       }
//     } catch (error) {
//       console.error("Error triggering fixed location geocoding:", error)
//       // Optionally, log this error
//     }
//   }

//   const fetchHospitalData = async () => {
//     try {
//       const response = await fetch("/api/hospital/me")
//       if (response.ok) {
//         const result = await response.json()
//         if (result.success) {
//           setHospital(result.data)
//           setIsHandleEmergency(result.data.isHandleEmergency)
//           setIsAvailable(result.data.isAvailable)
//           // Set fixed location from fetched hospital data if available
//           if (result.data.location?.lat && result.data.location?.lng) {
//             setFixedLocation(result.data.location)
//           }
//           console.log("Hospital data:", result.data)
//           console.log("isHandleEmergency:", result.data.isHandleEmergency)
//         }
//       } else {
//         console.error("Failed to fetch hospital data")
//         toast.error("Failed to load hospital settings")
//       }
//     } catch (error) {
//       console.error("Error fetching hospital data:", error)
//       toast.error("Error loading hospital data")
//     } finally {
//       setLoading(false) // Ensure loading is set to false after initial data fetch
//     }
//   }

//   const fetchDashboardData = async () => {
//     try {
//       const requests = [
//         fetch("/api/hospital/own-posts"),
//         fetch("/api/posts"), // Fetch all posts for "All Posts" tab
//         fetch("/api/announcements/own"), // Fetch own announcements
//       ]
//       // Only fetch emergency alerts if hospital handles emergencies
//       if (isHandleEmergency) {
//         requests.push(fetch("/api/hospital/emergency-alerts"))
//       }
//       const responses = await Promise.all(requests)
//       const [ownPostsRes, allOtherPostsRes, ownAnnouncementsRes, alertsRes] = responses

//       if (ownPostsRes.ok) {
//         const ownPostsData = await ownPostsRes.json()
//         setOwnPosts(ownPostsData.data || [])
//       }
//       if (allOtherPostsRes.ok) {
//         const allOtherPostsData = await allOtherPostsRes.json()
//         // Filter out own posts from allOtherPosts based on user's email
//         setAllOtherPosts(allOtherPostsData.data.filter((post: Post) => post.email !== user?.email) || [])
//       }
//       if (ownAnnouncementsRes.ok) {
//         const ownAnnouncementsData = await ownAnnouncementsRes.json()
//         setOwnAnnouncements(ownAnnouncementsData.data || [])
//       }
//       if (alertsRes && alertsRes.ok) {
//         const alertsData = await alertsRes.json()
//         const relevantAlerts =
//           alertsData.alerts?.filter(
//             (alert: EmergencyAlert) =>
//               alert.hospitalAlertStatus === "pending" ||
//               alert.hospitalAlertStatus === "read" ||
//               alert.status === "accepted",
//           ) || []
//         setEmergencyAlerts(relevantAlerts)
//         setNotifications(
//           relevantAlerts.filter((alert: EmergencyAlert) => alert.hospitalAlertStatus === "pending").length || 0,
//         )
//         setLastChecked(new Date())
//       }
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error)
//       toast.error("Failed to load dashboard data.")
//     } finally {
//       // setLoading(false) // Moved to fetchHospitalData to ensure hospital data is loaded first
//     }
//   }

//   const fetchEmergencyAlerts = async () => {
//     if (!isHandleEmergency) return
//     try {
//       console.log("🔄 Fetching emergency alerts...")
//       const response = await fetch("/api/hospital/emergency-alerts")
//       const data = await response.json()
//       if (response.ok) {
//         const relevantAlerts =
//           data.alerts?.filter(
//             (alert: EmergencyAlert) =>
//               alert.hospitalAlertStatus === "pending" ||
//               alert.hospitalAlertStatus === "read" ||
//               alert.status === "accepted",
//           ) || []
//         setEmergencyAlerts(relevantAlerts)
//         setNotifications(
//           relevantAlerts.filter((alert: EmergencyAlert) => alert.hospitalAlertStatus === "pending").length || 0,
//         )
//         setLastChecked(new Date())
//         console.log(`✅ Found ${relevantAlerts.length || 0} nearby emergency alerts`)
//         if (relevantAlerts.length > 0) {
//           const criticalPendingAlerts = relevantAlerts.filter(
//             (alert: EmergencyAlert) => alert.priority === "critical" && alert.hospitalAlertStatus === "pending",
//           )
//           if (criticalPendingAlerts.length > 0) {
//             toast.error(`🚨 ${criticalPendingAlerts.length} CRITICAL emergency alert(s) nearby!`, {
//               duration: 8000,
//             })
//           }
//         }
//       } else {
//         console.error("❌ Failed to fetch emergency alerts:", data.message)
//       }
//     } catch (error) {
//       console.error("💥 Error fetching emergency alerts:", error)
//     }
//   }

//   const handleCreatePost = async () => {
//     if (!newPost.title || !newPost.content || !newPost.category) {
//       toast.error("Please fill in all required fields")
//       return
//     }
//     try {
//       console.log("\n in /api/hospital/create-post Creating new post:", newPost)
//       const response = await fetch("/api/hospital/create-post", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: newPost.title,
//           content: newPost.content,
//           category: newPost.category,
//           tags: newPost.tags
//             .split(",")
//             .map((tag) => tag.trim())
//             .filter((tag) => tag),
//         }),
//       })
//       if (response.ok) {
//         toast.success("✅ Post created successfully! Awaiting admin approval.")
//         setNewPost({
//           title: "",
//           content: "",
//           category: "",
//           tags: "",
//         })
//         fetchDashboardData()
//       } else {
//         toast.error("Failed to create post")
//       }
//     } catch (error) {
//       toast.error("Error creating post")
//     }
//   }

//   const handleEditPost = async (postId: string, updatedData: Partial<Post>) => {
//     try {
//       const response = await fetch("/api/hospital/edit-post", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId, ...updatedData }),
//       })
//       if (response.ok) {
//         toast.success("✅ Post updated successfully!")
//         setEditingPost(null)
//         fetchDashboardData()
//       } else {
//         toast.error("Failed to update post")
//       }
//     } catch (error) {
//       toast.error("Error updating post")
//     }
//   }

//   const handleDeletePost = async (postId: string) => {
//     const confirmation = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action will permanently delete the post.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     })
//     if (!confirmation.isConfirmed) return
//     try {
//       const response = await fetch("/api/hospital/delete-post", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId }),
//       })
//       if (response.ok) {
//         Swal.fire("Deleted!", "Your post has been deleted.", "success")
//         fetchDashboardData()
//       } else {
//         Swal.fire("Failed", "Unable to delete post.", "error")
//       }
//     } catch (error) {
//       Swal.fire("Error", "An error occurred while deleting the post.", "error")
//     }
//   }

//   const handleToggleAvailability = async () => {
//     try {
//       const response = await fetch("/api/hospital/toggle-availability", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ isAvailable: !isAvailable }),
//       })
//       if (response.ok) {
//         setIsAvailable(!isAvailable)
//         toast.success(`🏥 Hospital is now ${!isAvailable ? "available" : "unavailable"} for emergencies`)
//       } else {
//         toast.error("Failed to update availability")
//       }
//     } catch (error) {
//       toast.error("Error updating availability")
//     }
//   }

//   const handleAlertClick = (alert: EmergencyAlert) => {
//     setSelectedAlert(alert)
//     setShowAlertDialog(true)
//   }

//   const handleResponse = async (action: "accept" | "deny") => {
//     if (!selectedAlert) return
//     setResponding(true)
//     try {
//       const response = await fetch("/api/hospital/emergency-alerts/respond", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           alertId: selectedAlert._id,
//           action,
//         }),
//       })
//       const data = response.headers.get("content-type")?.includes("application/json")
//         ? await response.json()
//         : { message: response.statusText || "An unexpected error occurred." }
//       if (response.ok) {
//         if (action === "accept") {
//           toast.success(`✅ Emergency accepted! Patient: ${selectedAlert.userInfo.name}`)
//           toast.success("🚑 Ambulance dispatched! Patient will be notified.")
//         } else {
//           toast.success("❌ Emergency declined")
//         }
//         setShowAlertDialog(false)
//         setSelectedAlert(null)
//         fetchEmergencyAlerts() // Refresh the list
//       } else {
//         toast.error(data.message || "Failed to respond to emergency")
//       }
//     } catch (error) {
//       console.error("Error responding to emergency:", error)
//       toast.error("Failed to respond to emergency")
//     } finally {
//       setResponding(false)
//     }
//   }

//   const handleDeleteAlert = async (alertId: string) => {
//     const result = await Swal.fire({
//       title: "⚠️ Delete Emergency Alert?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it",
//     })
//     if (!result.isConfirmed) return
//     try {
//       const response = await fetch("/api/hospital/emergency-alerts/delete", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ alertId }),
//       })
//       if (response.ok) {
//         Swal.fire("Deleted!", "Emergency alert was successfully deleted.", "success")
//         fetchEmergencyAlerts()
//       } else {
//         Swal.fire("Failed", "Unable to delete the alert.", "error")
//       }
//     } catch (error) {
//       Swal.fire("Error", "Something went wrong while deleting the alert.", "error")
//     }
//   }

//   const handleCreateAnnouncement = async () => {
//     if (!newAnnouncement.title || !newAnnouncement.content) {
//       toast.error("Please fill in all required fields for the announcement.")
//       return
//     }
//     setIsSavingAnnouncement(true)
//     try {
//       const response = await fetch("/api/announcements/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: newAnnouncement.title,
//           content: newAnnouncement.content,
//           ownerType: "hospital",
//         }),
//       })
//       if (response.ok) {
//         toast.success("✅ Announcement created successfully!")
//         setNewAnnouncement({ title: "", content: "" })
//         closeAnnouncementForm()
//         fetchDashboardData()
//       } else {
//         toast.error("Failed to create announcement")
//       }
//     } catch (error) {
//       toast.error("Error creating announcement")
//     } finally {
//       setIsSavingAnnouncement(false)
//     }
//   }

//   const handleDeleteAnnouncement = async (announcementId: string) => {
//     const result = await Swal.fire({
//       title: "🗑️ Delete Announcement?",
//       text: "Are you sure you want to permanently delete this announcement?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it",
//     })
//     if (!result.isConfirmed) return
//     try {
//       const response = await fetch("/api/announcements/delete", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: announcementId }),
//       })
//       if (response.ok) {
//         Swal.fire("Deleted!", "Announcement has been deleted.", "success")
//         fetchDashboardData()
//       } else {
//         Swal.fire("Failed", "Unable to delete announcement.", "error")
//       }
//     } catch (error) {
//       Swal.fire("Error", "Something went wrong while deleting the announcement.", "error")
//     }
//   }

//   const openAnnouncementForm = (announcement: Announcement | null) => {
//     setNewAnnouncement({
//       title: announcement?.title || "",
//       content: announcement?.content || "",
//     })
//     setIsAnnouncementFormOpen(true)
//   }

//   const closeAnnouncementForm = () => {
//     setIsAnnouncementFormOpen(false)
//     setNewAnnouncement({ title: "", content: "" })
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

//   const formatLocationAddress = (address: any) => {
//     if (!address) return ""
//     const parts = [
//       address.street,
//       address.area,
//       address.village,
//       address.subDistrict,
//       address.district,
//       address.state || "Gujarat",
//       address.pincode,
//     ].filter(Boolean)
//     return parts.join(", ")
//   }

//   const openGoogleMaps = (location: { lat?: number; lng?: number; address?: any }) => {
//     if (!location || (!location.lat && !location.lng && !location.address)) {
//       toast.error("Location data not available for mapping.")
//       return
//     }
//     let googleMapsUrl = ""
//     if (location.lat && location.lng) {
//       googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
//       toast.success("🗺️ Opening location in Google Maps via GPS...")
//     } else if (location.address) {
//       const searchQuery = formatLocationAddress(location.address)
//       if (searchQuery) {
//         googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
//         toast.success("🗺️ Opening location in Google Maps via address...")
//       } else {
//         toast.error("Insufficient address details for mapping.")
//         return
//       }
//     } else {
//       toast.error("No valid location data to open in Google Maps.")
//       return
//     }
//     window.open(googleMapsUrl, "_blank")
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <motion.div
//             className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           />
//           <p className="text-gray-600 dark:text-gray-400 text-lg">Loading hospital dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   const quickStatsGridCols = isHandleEmergency ? "grid-cols-1 md:grid-cols-5" : "grid-cols-1 md:grid-cols-4"
//   const tabsListGridCols = isHandleEmergency ? "grid-cols-5" : "grid-cols-4"

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       {/* Header with Animated Icons */}
//       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
//         <AnimatedHealthIcons />
//         <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
//           <div className="flex items-center space-x-4">
//             <motion.div
//               className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
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
//               <Building2 className="w-6 h-6 text-white" />
//             </motion.div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900 dark:text-white">Hospital Dashboard</h1>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {isHandleEmergency ? "Manage emergency care & health content" : "Manage health content"}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             {/* Emergency controls - Only show if hospital handles emergencies */}
//             {isHandleEmergency && (
//               <>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//                   <Clock className="w-4 h-4" />
//                   <span>Last checked: {lastChecked.toLocaleTimeString()}</span>
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={fetchEmergencyAlerts}
//                   className="flex items-center space-x-2 bg-transparent"
//                 >
//                   <RefreshCw className="w-4 h-4" />
//                   <span>Refresh</span>
//                 </Button>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-sm text-gray-600 dark:text-gray-400">Available for emergencies</span>
//                   <Switch
//                     checked={isAvailable}
//                     onCheckedChange={handleToggleAvailability}
//                     disabled={!isHandleEmergency}
//                   />
//                 </div>
//               </>
//             )}
//             <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//               <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
//               {notifications > 0 && isHandleEmergency && (
//                 <motion.span
//                   className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   {notifications}
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
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome, {user?.name}! 🏥</h2>
//           <p className="text-gray-600 dark:text-gray-400">
//             {isHandleEmergency
//               ? "Manage emergency responses and share important health information with the community."
//               : "Share important health information and connect with the medical community."}
//           </p>
//           {/* Debug info - remove in production */}
//           <div className="mt-2 text-xs text-gray-500">
//             Emergency Handling: {isHandleEmergency ? "Enabled" : "Disabled"} | Available: {isAvailable ? "Yes" : "No"}
//           </div>
//           {/* Display fixed location */}
//           {fixedLocation ? (
//             <p className="text-sm text-gray-500 mt-2">
//               📍 Fixed Location (from address): {fixedLocation.lat.toFixed(4)}, {fixedLocation.lng.toFixed(4)}
//             </p>
//           ) : (
//             <p className="text-sm text-gray-500 mt-2">📍 Fixed Location: Not yet available</p>
//           )}
//         </motion.div>
//         {/* Emergency Alerts Banner - Only show if hospital handles emergencies */}
//         {notifications > 0 && isHandleEmergency && (
//           <motion.div
//             className="mb-8"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//           >
//             <Card className="border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <motion.div
//                       className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
//                       animate={{
//                         boxShadow: [
//                           "0 0 0 0 rgba(239, 68, 68, 0.7)",
//                           "0 0 0 10px rgba(239, 68, 68, 0)",
//                           "0 0 0 0 rgba(239, 68, 68, 0)",
//                         ],
//                       }}
//                       transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                     >
//                       <AlertTriangle className="w-6 h-6 text-white" />
//                     </motion.div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
//                         {notifications} Pending Emergency Alert{notifications > 1 ? "s" : ""}
//                       </h3>
//                       <p className="text-red-600 dark:text-red-300">Patients need immediate assistance</p>
//                     </div>
//                   </div>
//                   <Button
//                     onClick={() => document.querySelector('[value="emergencies"]')?.click()}
//                     className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2"
//                   >
//                     View Alerts
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}
//         {/* Quick Stats */}
//         <motion.div
//           className={`grid ${quickStatsGridCols} gap-6 mb-8`}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           {/* Emergency Alerts Card - Only show if hospital handles emergencies */}
//           {isHandleEmergency && (
//             <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//               <Card className="hover:shadow-lg transition-all duration-300">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">Emergency Alerts</p>
//                       <p className="text-2xl font-bold text-red-600">{emergencyAlerts.length}</p>
//                       <p className="text-xs text-gray-500">{notifications} pending</p>
//                     </div>
//                     <motion.div
//                       className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center"
//                       animate={{
//                         scale: notifications > 0 ? [1, 1.2, 1] : 1,
//                       }}
//                       transition={{ duration: 2, repeat: notifications > 0 ? Number.POSITIVE_INFINITY : 0 }}
//                     >
//                       <AlertTriangle className="w-6 h-6 text-red-600" />
//                     </motion.div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">My Posts</p>
//                     <p className="text-2xl font-bold text-purple-600">{ownPosts.length}</p>
//                     <p className="text-xs text-gray-500">Published content</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
//                     animate={{ rotate: [0, 360] }}
//                     transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                   >
//                     <MessageSquare className="w-6 h-6 text-purple-600" />
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
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Associated Doctors</p>
//                     <p className="text-2xl font-bold text-green-600">{doctors.length}</p>
//                     <p className="text-xs text-gray-500">Network partners</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       y: [0, -5, 0],
//                     }}
//                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <UserCheck className="w-6 h-6 text-green-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//           {/* My Announcements Card */}
//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">My Announcements</p>
//                     <p className="text-2xl font-bold text-blue-600">{ownAnnouncements.length}</p>
//                     <p className="text-xs text-gray-500 mt-1">Shared updates</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       y: [0, -5, 0],
//                     }}
//                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <Megaphone className="w-6 h-6 text-blue-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//           {/* Status Card - Only show if hospital handles emergencies */}
//           {isHandleEmergency && (
//             <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//               <Card className="hover:shadow-lg transition-all duration-300">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
//                       <p className={`text-2xl font-bold ${isAvailable ? "text-green-600" : "text-red-600"}`}>
//                         {isAvailable ? "Available" : "Unavailable"}
//                       </p>
//                       <p className="text-xs text-gray-500">Emergency services</p>
//                     </div>
//                     <motion.div
//                       className={`w-12 h-12 ${
//                         isAvailable ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
//                       } rounded-full flex items-center justify-center`}
//                       animate={{
//                         rotate: [0, 10, -10, 0],
//                       }}
//                       transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//                     >
//                       <Activity className={`w-6 h-6 ${isAvailable ? "text-green-600" : "text-red-600"}`} />
//                     </motion.div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//         </motion.div>
//         {/* Main Content Tabs */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//         >
//           <Tabs defaultValue={isHandleEmergency ? "emergencies" : "create"} className="space-y-6">
//             <TabsList className={`grid w-full ${tabsListGridCols}`}>
//               {isHandleEmergency && <TabsTrigger value="emergencies">Emergency Alerts</TabsTrigger>}
//               <TabsTrigger value="create">Create Post</TabsTrigger>
//               <TabsTrigger value="own-posts">Own Posts</TabsTrigger>
//               <TabsTrigger value="all-posts">All Posts</TabsTrigger>
//               <TabsTrigger value="announcements">Announcements</TabsTrigger>
//             </TabsList>
//             {/* Emergency Alerts Tab - Only show if hospital handles emergencies */}
//             {isHandleEmergency && (
//               <TabsContent value="emergencies" className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <Shield className="w-5 h-5" />
//                         <span>Emergency Alerts</span>
//                         <Badge variant="destructive">{notifications} pending</Badge>
//                       </div>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setAutoRefresh(!autoRefresh)}
//                         className={autoRefresh ? "bg-green-50 border-green-200" : ""}
//                       >
//                         Auto-refresh {autoRefresh ? "ON" : "OFF"}
//                       </Button>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     {emergencyAlerts.length > 0 ? (
//                       <div className="space-y-4">
//                         {emergencyAlerts.map((alert, index) => (
//                           <motion.div
//                             key={alert._id}
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: index * 0.1 }}
//                             className={`border rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer ${
//                               alert.hospitalAlertStatus === "pending"
//                                 ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
//                                 : alert.hospitalAlertStatus === "read"
//                                   ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
//                                   : alert.status === "accepted"
//                                     ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
//                                     : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
//                             }`}
//                             onClick={() => handleAlertClick(alert)}
//                           >
//                             <div className="flex items-start justify-between">
//                               <div className="flex-1">
//                                 <div className="flex items-center space-x-3 mb-3">
//                                   <motion.div
//                                     className={`w-3 h-3 rounded-full ${
//                                       alert.hospitalAlertStatus === "pending"
//                                         ? "bg-red-500"
//                                         : alert.hospitalAlertStatus === "read"
//                                           ? "bg-yellow-500"
//                                           : alert.status === "accepted"
//                                             ? "bg-green-500"
//                                             : "bg-gray-500"
//                                     }`}
//                                     animate={{ scale: alert.hospitalAlertStatus === "pending" ? [1, 1.2, 1] : 1 }}
//                                     transition={{
//                                       duration: 1,
//                                       repeat: alert.hospitalAlertStatus === "pending" ? Number.POSITIVE_INFINITY : 0,
//                                     }}
//                                   />
//                                   <h3
//                                     className={`font-semibold text-lg ${
//                                       alert.hospitalAlertStatus === "pending"
//                                         ? "text-red-800 dark:text-red-200"
//                                         : alert.hospitalAlertStatus === "read"
//                                           ? "text-yellow-800 dark:text-yellow-200"
//                                           : alert.status === "accepted"
//                                             ? "text-green-800 dark:text-green-200"
//                                             : "text-gray-800 dark:text-gray-200"
//                                     }`}
//                                   >
//                                     🚨 EMERGENCY ALERT
//                                   </h3>
//                                   <Badge className={getPriorityColor(alert.priority)}>
//                                     {alert.priority.toUpperCase()}
//                                   </Badge>
//                                   {alert.status === "accepted" && (
//                                     <Badge variant="default" className="bg-green-600">
//                                       ACCEPTED
//                                     </Badge>
//                                   )}
//                                   {alert.hospitalAlertStatus === "read" && alert.status === "pending" && (
//                                     <Badge variant="outline" className="bg-yellow-600 text-white">
//                                       VIEWED
//                                     </Badge>
//                                   )}
//                                 </div>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                   <div>
//                                     <h4 className="font-medium text-gray-900 dark:text-white mb-2">
//                                       Patient Information
//                                     </h4>
//                                     <div className="space-y-1 text-sm">
//                                       <div className="flex items-center space-x-2">
//                                         <User className="w-4 h-4 text-gray-500" />
//                                         <span>{alert.userInfo.name}</span>
//                                       </div>
//                                       <div className="flex items-center space-x-2">
//                                         <Phone className="w-4 h-4 text-gray-500" />
//                                         <span>{alert.userInfo.phone}</span>
//                                       </div>
//                                       <div className="flex items-center space-x-2">
//                                         <Mail className="w-4 h-4 text-gray-500" />
//                                         <span>{alert.userInfo.email}</span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <h4 className="font-medium text-gray-900 dark:text-white mb-2">
//                                       Location & Distance
//                                     </h4>
//                                     <div className="space-y-1 text-sm">
//                                       {alert.distance && (
//                                         <div className="flex items-center space-x-2">
//                                           <Navigation className="w-4 h-4 text-green-500" />
//                                           <span className="font-semibold text-green-600">{alert.distance}km away</span>
//                                           {alert.proximityMethod && (
//                                             <span className="text-xs text-gray-500">({alert.proximityMethod})</span>
//                                           )}
//                                         </div>
//                                       )}
//                                       {/* Google Maps Integration */}
//                                       {/* <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
//                                         <div className="flex items-start space-x-2">
//                                           <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
//                                           <div className="flex-1">
//                                             <p className="font-medium text-blue-800 dark:text-blue-200 text-sm">
//                                               Patient Location:
//                                             </p>
//                                             <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
//                                               📍{" "}
//                                               {alert.location?.lat && alert.location?.lng
//                                                 ? `GPS: ${alert.location.lat.toFixed(4)}, ${alert.location.lng.toFixed(4)}`
//                                                 : formatLocationAddress(alert.location?.address) ||
//                                                   "Location details not available"}
//                                             </p>
                                          
//                                             <motion.button
//                                               whileHover={{ scale: 1.02 }}
//                                               whileTap={{ scale: 0.98 }}
//                                               onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 openGoogleMaps(alert.location)
//                                               }}
//                                               className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2 transition-colors"
//                                             >
//                                               <Map className="w-4 h-4" />
//                                               <span>Open in Google Maps</span>
//                                               <ExternalLink className="w-3 h-3" />
//                                             </motion.button>
//                                             {alert.location?.lat && alert.location?.lng && (
//                                               <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
//                                                 GPS: {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
//                                               </p>
//                                             )}
//                                           </div>
//                                         </div>
//                                       </div> */}
        




//                               {/* Google Maps Integration */}
//                               <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
//                                 <div className="flex items-start space-x-2">
//                                   <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
//                                   <div className="flex-1">
//                                     <p className="font-medium text-blue-800 dark:text-blue-200 text-sm">
//                                       Patient Location:
//                                     </p>

//                                     {/* Show GPS if available */}
//                                     {alert.location?.lat && alert.location?.lng && (
//                                       <p className="text-blue-700 dark:text-blue-300 text-sm mb-1">
//                                         📍 GPS: {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
//                                       </p>
//                                     )}

//                                   {/* Show formatted address if available */}
//                                   {formatLocationAddress(alert.location?.address) && (
//                                     <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
//                                       Address: {formatLocationAddress(alert.location?.address)}
//                                     </p>
//                                   )}

//                                   {/* Google Maps Rectangle Button */}
//                                   <motion.button
//                                     whileHover={{ scale: 1.02 }}
//                                     whileTap={{ scale: 0.98 }}
//                                     onClick={(e) => {
//                                       e.stopPropagation()
//                                       if (alert.location?.lat && alert.location?.lng) {
//                                         const mapsUrl = `https://www.google.com/maps?q=${alert.location.lat},${alert.location.lng}`
//                                         window.open(mapsUrl, "_blank")
//                                       }
//                                     }}
//                                     className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2 transition-colors"
//                                   >
//                                     <Map className="w-4 h-4" />
//                                     <span>Open in Google Maps</span>
//                                     <ExternalLink className="w-3 h-3" />
//                                   </motion.button>
//                                 </div>
//                               </div>
//                             </div>






//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                   <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//                                     <Timer className="w-4 h-4" />
//                                     <span>{formatTimeAgo(alert.createdAt)}</span>
//                                   </div>
//                                   <div className="flex space-x-2">
//                                     {alert.hospitalAlertStatus === "pending" && (
//                                       <Button
//                                         size="sm"
//                                         variant="destructive"
//                                         onClick={(e) => {
//                                           e.stopPropagation()
//                                           handleAlertClick(alert)
//                                         }}
//                                         className="animate-pulse"
//                                       >
//                                         🚨 RESPOND NOW
//                                       </Button>
//                                     )}
//                                     <Button
//                                       size="sm"
//                                       variant="outline"
//                                       onClick={(e) => {
//                                         e.stopPropagation()
//                                         handleDeleteAlert(alert._id)
//                                       }}
//                                       className="text-red-600 hover:text-red-800 hover:bg-red-50"
//                                     >
//                                       <Trash2 className="w-4 h-4" />
//                                       Delete
//                                     </Button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
//                           No Emergency Alerts
//                         </h3>
//                         <p className="text-gray-500">No emergency alerts in your area at the moment</p>
//                         <p className="text-sm text-gray-400 mt-2">System checks every 30 seconds for new alerts</p>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             )}
//             {/* Create Post Tab */}
//             <TabsContent value="create" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Plus className="w-5 h-5" />
//                     <span>Create New Hospital Post</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Post Title *</label>
//                     <Input
//                       value={newPost.title}
//                       onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//                       placeholder="e.g., New Emergency Department Now Open 24/7"
//                       className="w-full"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Content *</label>
//                     <Textarea
//                       value={newPost.content}
//                       onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//                       placeholder="Share hospital updates, health tips, or important announcements..."
//                       className="w-full min-h-[200px]"
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Category *</label>
//                       <Select
//                         value={newPost.category}
//                         onValueChange={(value) => setNewPost({ ...newPost, category: value })}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {categories.map((category) => (
//                             <SelectItem key={category} value={category}>
//                               {category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
//                     <Input
//                       value={newPost.tags}
//                       onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
//                       placeholder="e.g., emergency-care, cardiology, 24-7-service, health-tips"
//                       className="w-full"
//                     />
//                   </div>
//                   <Button
//                     onClick={handleCreatePost}
//                     className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
//                   >
//                     <Send className="w-4 h-4 mr-2" />
//                     Create Post
//                   </Button>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             {/* Own Posts Tab */}
//             <TabsContent value="own-posts" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Building2 className="w-5 h-5 text-purple-600" />
//                     <span>My Posts</span>
//                     <Badge variant="secondary">{ownPosts.length} posts</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {ownPosts.length > 0 ? (
//                     <div className="space-y-4">
//                       {ownPosts.map((post, index) => (
//                         <motion.div
//                           key={post._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex-1">
//                               <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
//                               <div className="flex items-center space-x-2 mb-2">
//                                 <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
//                                 <Badge variant={post.isApproved ? "default" : "destructive"}>
//                                   {post.isApproved ? "Approved" : "Pending"}
//                                 </Badge>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <Dialog>
//                                 <DialogTrigger asChild>
//                                   <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
//                                     <Edit className="w-4 h-4" />
//                                   </Button>
//                                 </DialogTrigger>
//                                 <DialogContent className="max-w-2xl">
//                                   <DialogHeader>
//                                     <DialogTitle>Edit Post</DialogTitle>
//                                   </DialogHeader>
//                                   <div className="space-y-4">
//                                     <Input
//                                       defaultValue={post.title}
//                                       placeholder="Post title"
//                                       onChange={(e) =>
//                                         setEditingPost((prev) => (prev ? { ...prev, title: e.target.value } : null))
//                                       }
//                                     />
//                                     <Textarea
//                                       defaultValue={post.content}
//                                       placeholder="Post content"
//                                       className="min-h-[200px]"
//                                       onChange={(e) =>
//                                         setEditingPost((prev) => (prev ? { ...prev, content: e.target.value } : null))
//                                       }
//                                     />
//                                     <div className="flex space-x-2">
//                                       <Button
//                                         onClick={() =>
//                                           editingPost &&
//                                           handleEditPost(editingPost._id, {
//                                             title: editingPost.title,
//                                             content: editingPost.content,
//                                           })
//                                         }
//                                         className="bg-purple-600 hover:bg-purple-700"
//                                       >
//                                         Save Changes
//                                       </Button>
//                                       <Button variant="outline" onClick={() => setEditingPost(null)}>
//                                         Cancel
//                                       </Button>
//                                     </div>
//                                   </div>
//                                 </DialogContent>
//                               </Dialog>
//                               <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post._id)}>
//                                 <Trash2 className="w-4 h-4" />
//                               </Button>
//                             </div>
//                           </div>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{post.content}</p>
//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {post.tags.map((tag, tagIndex) => (
//                               <Badge key={tagIndex} variant="secondary" className="text-xs">
//                                 <Tag className="w-3 h-3 mr-1" />
//                                 {tag}
//                               </Badge>
//                             ))}
//                           </div>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2 text-gray-600">
//                               <Eye className="w-4 h-4" />
//                               <span className="text-sm">View details</span>
//                             </div>
//                             <div className="flex items-center space-x-2 text-xs text-gray-500">
//                               <Calendar className="w-4 h-4" />
//                               <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No posts yet</h3>
//                       <p className="text-gray-500 mb-4">Start sharing hospital updates and health information</p>
//                       <Button onClick={() => document.querySelector('[value="create"]')?.click()}>
//                         Create Your First Post
//                       </Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             {/* All Posts Tab (formerly Doctor Posts Tab) */}
//             <TabsContent value="all-posts" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Stethoscope className="w-5 h-5 text-green-600" />
//                     <span>All Posts</span>
//                     <Badge variant="secondary">{allOtherPosts.length} posts</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {allOtherPosts.length > 0 ? (
//                     <div className="space-y-4">
//                       {allOtherPosts.map((post, index) => (
//                         <motion.div
//                           key={post._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex items-center space-x-3">
//                               <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
//                                 {post.authorType === "Doctor" ? (
//                                   <Stethoscope className="w-5 h-5 text-green-600" />
//                                 ) : (
//                                   <Building2 className="w-5 h-5 text-purple-600" />
//                                 )}
//                               </div>
//                               <div>
//                                 <p className="font-semibold">
//                                   {post.authorType === "Doctor" ? "Dr." : ""} {post.postby}
//                                 </p>
//                                 <p className="text-sm text-gray-500 capitalize">{post.authorType}</p>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
//                               <span className="text-xs text-gray-500">
//                                 {new Date(post.createdAt).toLocaleDateString()}
//                               </span>
//                             </div>
//                           </div>
//                           <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {post.tags.map((tag, tagIndex) => (
//                               <Badge key={tagIndex} variant="secondary" className="text-xs">
//                                 #{tag}
//                               </Badge>
//                             ))}
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No posts yet</h3>
//                       <p className="text-gray-500">Posts from other hospitals and doctors will appear here</p>
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
//                     <span>My Announcements</span>
//                     <Badge variant="secondary">{ownAnnouncements.length} announcements</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4 border-b pb-4 mb-4">
//                     <h3 className="text-lg font-semibold">Create New Announcement</h3>
//                     <Dialog open={isAnnouncementFormOpen} onOpenChange={setIsAnnouncementFormOpen}>
//                       <DialogTrigger asChild>
//                         <Button onClick={() => openAnnouncementForm(null)} className="w-full">
//                           <Plus className="w-4 h-4 mr-2" />
//                           Create New Announcement
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent className="sm:max-w-[425px]">
//                         <DialogHeader>
//                           <DialogTitle>{"Create New Announcement"}</DialogTitle>
//                         </DialogHeader>
//                         <div className="space-y-4">
//                           <div>
//                             <label className="block text-sm font-medium mb-2">Title *</label>
//                             <Input
//                               value={newAnnouncement.title}
//                               onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
//                               placeholder="e.g., Holiday Notice: Clinic Closed on Dec 25th"
//                               className="w-full"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium mb-2">Content *</label>
//                             <Textarea
//                               value={newAnnouncement.content}
//                               onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
//                               placeholder="Share important updates with your network..."
//                               className="w-full min-h-[120px]"
//                             />
//                           </div>
//                           <div className="flex space-x-2">
//                             <Button
//                               onClick={handleCreateAnnouncement}
//                               disabled={isSavingAnnouncement}
//                               className="bg-blue-600 hover:bg-blue-700"
//                             >
//                               {isSavingAnnouncement ? "Saving..." : "Save Announcement"}
//                             </Button>
//                             <Button variant="outline" onClick={closeAnnouncementForm}>
//                               Cancel
//                             </Button>
//                           </div>
//                         </div>
//                       </DialogContent>
//                     </Dialog>
//                   </div>
//                   <h3 className="text-lg font-semibold mb-4">My Published Announcements</h3>
//                   {ownAnnouncements.length > 0 ? (
//                     <div className="space-y-4">
//                       {ownAnnouncements.map((announcement, index) => (
//                         <motion.div
//                           key={announcement._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex-1">
//                               <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
//                               <div className="flex items-center space-x-2 mb-2">
//                                 <Badge variant="outline">{announcement.ownerType}</Badge>
//                                 <span className="text-sm text-gray-500">Announced by: {announcement.announcedBy}</span>
//                               </div>
//                             </div>
//                             <Button
//                               variant="destructive"
//                               size="sm"
//                               onClick={() => handleDeleteAnnouncement(announcement._id)}
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </Button>
//                           </div>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{announcement.content}</p>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2 text-xs text-gray-500">
//                               <Calendar className="w-4 h-4" />
//                               <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
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
//                       <p className="text-gray-500 mb-4">Share important updates with your network</p>
//                       <Button onClick={() => openAnnouncementForm(null)}>Create Your First Announcement</Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </motion.div>
//       </div>
//       {/* Emergency Alert Response Dialog */}
//       <Dialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle className="flex items-center space-x-2">
//               <AlertTriangle className="w-5 h-5 text-red-500" />
//               <span>Emergency Alert Response</span>
//             </DialogTitle>
//           </DialogHeader>
//           {selectedAlert && (
//             <div className="space-y-6">
//               <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
//                 <AlertTriangle className="h-4 w-4" />
//                 <AlertDescription className="font-semibold">
//                   🚨 EMERGENCY: Immediate medical attention required
//                 </AlertDescription>
//               </Alert>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="font-semibold mb-3">Patient Information</h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex items-center space-x-2">
//                       <User className="w-4 h-4 text-gray-500" />
//                       <span className="font-medium">{selectedAlert.userInfo.name}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Phone className="w-4 h-4 text-gray-500" />
//                       <span>{selectedAlert.userInfo.phone}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Mail className="w-4 h-4 text-gray-500" />
//                       <span>{selectedAlert.userInfo.email}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold mb-3">Emergency Details</h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex items-center space-x-2">
//                       <Badge className={getPriorityColor(selectedAlert.priority)}>
//                         {selectedAlert.priority.toUpperCase()} PRIORITY
//                       </Badge>
//                     </div>
//                     {selectedAlert.distance && (
//                       <div className="flex items-center space-x-2">
//                         <Navigation className="w-4 h-4 text-green-500" />
//                         <span className="font-semibold text-green-600">{selectedAlert.distance}km away</span>
//                       </div>
//                     )}
//                     <div className="flex items-center space-x-2">
//                       <Timer className="w-4 h-4 text-gray-500" />
//                       <span>{formatTimeAgo(selectedAlert.createdAt)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-semibold mb-3">Location</h3>
//                 <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
//                   <div className="flex items-start space-x-2">
//                     <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
//                     <div className="flex-1">
//                       <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">
//                         📍 {formatLocationAddress(selectedAlert.location?.address)}
//                       </p>
//                       <Button
//                         onClick={() => openGoogleMaps(selectedAlert.location?.address)}
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3"
//                       >
//                         <Map className="w-4 h-4 mr-2" />
//                         Open in Google Maps
//                         <ExternalLink className="w-3 h-3 ml-2" />
//                       </Button>
//                       {selectedAlert.location?.lat && selectedAlert.location?.lng && (
//                         <p className="text-xs text-blue-600 dark:text-blue-400">
//                           GPS Coordinates: {selectedAlert.location.lat.toFixed(6)},{" "}
//                           {selectedAlert.location.lng.toFixed(6)}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {selectedAlert.message && (
//                 <div>
//                   <h3 className="font-semibold mb-3">Emergency Message</h3>
//                   <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                     <p className="text-gray-700 dark:text-gray-300">{selectedAlert.message}</p>
//                   </div>
//                 </div>
//               )}
//               {selectedAlert.status === "pending" && (
//                 <div className="flex space-x-4 pt-4 border-t">
//                   <Button
//                     onClick={() => handleResponse("accept")}
//                     disabled={responding}
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
//                   >
//                     {responding ? (
//                       <>
//                         <motion.div
//                           className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                         />
//                         Accepting...
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle className="w-5 h-5 mr-2" />🚑 ACCEPT & DISPATCH AMBULANCE
//                       </>
//                     )}
//                   </Button>
//                   <Button
//                     onClick={() => handleResponse("deny")}
//                     disabled={responding}
//                     variant="destructive"
//                     className="flex-1 font-semibold py-3"
//                   >
//                     {responding ? (
//                       "Processing..."
//                     ) : (
//                       <>
//                         <XCircle className="w-5 h-5 mr-2" />
//                         DECLINE
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               )}
//               {selectedAlert.status === "accepted" && (
//                 <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
//                   <div className="flex items-center space-x-2">
//                     <CheckCircle className="w-5 h-5 text-green-600" />
//                     <span className="font-semibold text-green-800 dark:text-green-200">
//                       Emergency Accepted - Ambulance Dispatched
//                     </span>
//                   </div>
//                   {selectedAlert.acceptedBy && (
//                     <p className="text-sm text-green-700 dark:text-green-300 mt-2">
//                       Handled by: {selectedAlert.acceptedBy.name}
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }




// //C:\Users\UDAYN\Downloads\healthcare-platform - Copy\app\hospital\dashboard\page.tsx

// "use client"
// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import Link from "next/link" // Import Link
// import {
//   AlertTriangle,
//   Building2,
//   Plus,
//   MessageSquare,
//   Bell,
//   Send,
//   UserCheck,
//   Tag,
//   Calendar,
//   Eye,
//   Edit,
//   Trash2,
//   Clock,
//   Shield,
//   Activity,
//   Stethoscope,
//   User,
//   Phone,
//   Mail,
//   Navigation,
//   Timer,
//   RefreshCw,
//   CheckCircle,
//   XCircle,
//   Map,
//   MapPin,
//   ExternalLink,
//   Megaphone,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import ThemeToggle from "@/components/ThemeToggle"
// import UserDropdown from "@/components/UserDropdown"
// import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
// import { toast } from "react-hot-toast"
// import Swal from "sweetalert2"
// import { useAuth } from "@/app/contexts/AuthProvider"

// interface Post {
//   _id: string
//   title: string
//   content: string
//   category: string
//   tags: string[]
//   authorType: "Doctor" | "Hospital"
//   postby: string
//   email: string
//   createdAt: string
//   isApproved: boolean
// }

// interface Doctor {
//   _id: string
//   name: string
//   email: string
//   specialty: string
//   isVerified: boolean
// }

// interface EmergencyAlert {
//   _id: string
//   userInfo: {
//     name: string
//     email: string
//     phone: string
//   }
//   userId?: {
//     name: string
//     email: string
//     phone: string
//     address: any
//   }
//   location: {
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
//   message: string
//   priority: string
//   status: string
//   createdAt: string
//   distance?: number
//   proximityMethod?: string
//   acceptedBy?: {
//     _id: string
//     name: string
//   }
//   hospitalAlertStatus?: "pending" | "read" | "accepted" | "declined" | "timedOut"
// }

// interface HospitalData {
//   _id: string
//   name: string
//   email: string
//   phone: string
//   isAvailable: boolean
//   isHandleEmergency: boolean
//   isVerified: boolean
//   address: any
//   location: {
//     lat?: number
//     lng?: number
//   }
// }

// interface Announcement {
//   _id: string
//   ownerEmail: string
//   ownerType: "doctor" | "hospital" | "user"
//   title: string
//   content: string
//   announcedBy: string
//   readBy: string[]
//   createdAt: string
//   updatedAt: string
// }

// export default function HospitalDashboard() {
//   const { user } = useAuth()
//   const [ownPosts, setOwnPosts] = useState<Post[]>([])
//   const [allOtherPosts, setAllOtherPosts] = useState<Post[]>([])
//   const [doctors, setDoctors] = useState<Doctor[]>([])
//   const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
//   const [ownAnnouncements, setOwnAnnouncements] = useState<Announcement[]>([])
//   const [loading, setLoading] = useState(true)
//   const [notifications, setNotifications] = useState(0)
//   const [hospital, setHospital] = useState<HospitalData | null>(null)
//   const [isHandleEmergency, setIsHandleEmergency] = useState<boolean>(false)
//   const [isAvailable, setIsAvailable] = useState<boolean>(false)
//   const [editingPost, setEditingPost] = useState<Post | null>(null)
//   const [selectedAlert, setSelectedAlert] = useState<EmergencyAlert | null>(null)
//   const [showAlertDialog, setShowAlertDialog] = useState(false)
//   const [responding, setResponding] = useState(false)
//   const [lastChecked, setLastChecked] = useState<Date>(new Date())
//   const [autoRefresh, setAutoRefresh] = useState(true)

//   // State for the fixed hospital location (from DB, geocoded from address)
//   const [fixedLocation, setFixedLocation] = useState<{ lat: number; lng: number } | null>(null)

//   // Post creation state
//   const [newPost, setNewPost] = useState({
//     title: "",
//     content: "",
//     category: "",
//     tags: "",
//   })
//   // Announcement creation state
//   const [newAnnouncement, setNewAnnouncement] = useState({
//     title: "",
//     content: "",
//   })
//   const [isAnnouncementFormOpen, setIsAnnouncementFormOpen] = useState(false)
//   const [isSavingAnnouncement, setIsSavingAnnouncement] = useState(false)

//   const categories = [
//     "emergency-care",
//     "hospital-services",
//     "health-tips",
//     "prevention",
//     "treatment",
//     "facilities",
//     "announcements",
//     "cardiology",
//     "neurology",
//     "pediatrics",
//   ]

//   // Initial data fetching and emergency alert polling
//   useEffect(() => {
//     fetchHospitalData()
//     fetchDashboardData()

//     const interval = setInterval(() => {
//       if (autoRefresh && isHandleEmergency) {
//         fetchEmergencyAlerts()
//       }
//     }, 30000)
//     return () => clearInterval(interval)
//   }, [autoRefresh, isHandleEmergency])

//   // Effect to trigger fixed location geocoding after a delay if not already set
//   useEffect(() => {
//     if (hospital && !hospital.location?.lat && !hospital.location?.lng) {
//       console.log("Hospital fixed location not set. Initiating geocoding in 4 minutes...")
//       // Using 5 seconds for demonstration. For production, use 4 * 60 * 1000 (4 minutes).
//       const geocodeTimer = setTimeout(() => {
//         console.log("4 minutes passed. Attempting to geocode hospital address.")
//         triggerFixedLocationGeocoding(hospital._id)
//       }, 5 * 1000)

//       return () => clearTimeout(geocodeTimer)
//     }
//   }, [hospital]) // Re-run when hospital data changes

//   const triggerFixedLocationGeocoding = async (hospitalId: string) => {
//     try {
//       const response = await fetch("/api/hospital/update-fixed-location", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ hospitalId }),
//       })
//       const data = await response.json()
//       if (response.ok && data.success) {
//         // No toast message here, just update the UI
//         fetchHospitalData() // Re-fetch hospital data to update the UI with the new fixed location
//       } else {
//         console.error("Failed to update fixed location:", data.message)
//         // Optionally, log this error but don't show a toast to the user for this background process
//       }
//     } catch (error) {
//       console.error("Error triggering fixed location geocoding:", error)
//       // Optionally, log this error
//     }
//   }

//   const fetchHospitalData = async () => {
//     try {
//       const response = await fetch("/api/hospital/me")
//       if (response.ok) {
//         const result = await response.json()
//         if (result.success) {
//           setHospital(result.data)
//           setIsHandleEmergency(result.data.isHandleEmergency)
//           setIsAvailable(result.data.isAvailable)
//           // Set fixed location from fetched hospital data if available
//           if (result.data.location?.lat && result.data.location?.lng) {
//             setFixedLocation(result.data.location)
//           }
//           console.log("Hospital data:", result.data)
//           console.log("isHandleEmergency:", result.data.isHandleEmergency)
//         }
//       } else {
//         console.error("Failed to fetch hospital data")
//         toast.error("Failed to load hospital settings")
//       }
//     } catch (error) {
//       console.error("Error fetching hospital data:", error)
//       toast.error("Error loading hospital data")
//     } finally {
//       setLoading(false) // Ensure loading is set to false after initial data fetch
//     }
//   }

//   const fetchDashboardData = async () => {
//     try {
//       const requests = [
//         fetch("/api/hospital/own-posts"),
//         fetch("/api/posts"), // Fetch all posts for "All Posts" tab
//         fetch("/api/announcements/own"), // Fetch own announcements
//       ]
//       // Only fetch emergency alerts if hospital handles emergencies
//       if (isHandleEmergency) {
//         requests.push(fetch("/api/hospital/emergency-alerts"))
//       }
//       const responses = await Promise.all(requests)
//       const [ownPostsRes, allOtherPostsRes, ownAnnouncementsRes, alertsRes] = responses

//       if (ownPostsRes.ok) {
//         const ownPostsData = await ownPostsRes.json()
//         setOwnPosts(ownPostsData.data || [])
//       }
//       if (allOtherPostsRes.ok) {
//         const allOtherPostsData = await allOtherPostsRes.json()
//         // Filter out own posts from allOtherPosts based on user's email
//         setAllOtherPosts(allOtherPostsData.data.filter((post: Post) => post.email !== user?.email) || [])
//       }
//       if (ownAnnouncementsRes.ok) {
//         const ownAnnouncementsData = await ownAnnouncementsRes.json()
//         setOwnAnnouncements(ownAnnouncementsData.data || [])
//       }
//       if (alertsRes && alertsRes.ok) {
//         const alertsData = await alertsRes.json()
//         const relevantAlerts =
//           alertsData.alerts?.filter(
//             (alert: EmergencyAlert) =>
//               alert.hospitalAlertStatus === "pending" ||
//               alert.hospitalAlertStatus === "read" ||
//               alert.status === "accepted",
//           ) || []
//         setEmergencyAlerts(relevantAlerts)
//         setNotifications(
//           relevantAlerts.filter((alert: EmergencyAlert) => alert.hospitalAlertStatus === "pending").length || 0,
//         )
//         setLastChecked(new Date())
//       }
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error)
//       toast.error("Failed to load dashboard data.")
//     } finally {
//       // setLoading(false) // Moved to fetchHospitalData to ensure hospital data is loaded first
//     }
//   }

//   const fetchEmergencyAlerts = async () => {
//     if (!isHandleEmergency) return
//     try {
//       console.log("🔄 Fetching emergency alerts...")
//       const response = await fetch("/api/hospital/emergency-alerts")
//       const data = await response.json()
//       if (response.ok) {
//         const relevantAlerts =
//           data.alerts?.filter(
//             (alert: EmergencyAlert) =>
//               alert.hospitalAlertStatus === "pending" ||
//               alert.hospitalAlertStatus === "read" ||
//               alert.status === "accepted",
//           ) || []
//         setEmergencyAlerts(relevantAlerts)
//         setNotifications(
//           relevantAlerts.filter((alert: EmergencyAlert) => alert.hospitalAlertStatus === "pending").length || 0,
//         )
//         setLastChecked(new Date())
//         console.log(`✅ Found ${relevantAlerts.length || 0} nearby emergency alerts`)
//         if (relevantAlerts.length > 0) {
//           const criticalPendingAlerts = relevantAlerts.filter(
//             (alert: EmergencyAlert) => alert.priority === "critical" && alert.hospitalAlertStatus === "pending",
//           )
//           if (criticalPendingAlerts.length > 0) {
//             toast.error(`🚨 ${criticalPendingAlerts.length} CRITICAL emergency alert(s) nearby!`, {
//               duration: 8000,
//             })
//           }
//         }
//       } else {
//         console.error("❌ Failed to fetch emergency alerts:", data.message)
//       }
//     } catch (error) {
//       console.error("💥 Error fetching emergency alerts:", error)
//     }
//   }

//   const handleCreatePost = async () => {
//     if (!newPost.title || !newPost.content || !newPost.category) {
//       toast.error("Please fill in all required fields")
//       return
//     }
//     try {
//       console.log("\n in /api/hospital/create-post Creating new post:", newPost)
//       const response = await fetch("/api/hospital/create-post", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: newPost.title,
//           content: newPost.content,
//           category: newPost.category,
//           tags: newPost.tags
//             .split(",")
//             .map((tag) => tag.trim())
//             .filter((tag) => tag),
//         }),
//       })
//       if (response.ok) {
//         toast.success("✅ Post created successfully! Awaiting admin approval.")
//         setNewPost({
//           title: "",
//           content: "",
//           category: "",
//           tags: "",
//         })
//         fetchDashboardData()
//       } else {
//         toast.error("Failed to create post")
//       }
//     } catch (error) {
//       toast.error("Error creating post")
//     }
//   }

//   const handleEditPost = async (postId: string, updatedData: Partial<Post>) => {
//     try {
//       const response = await fetch("/api/hospital/edit-post", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId, ...updatedData }),
//       })
//       if (response.ok) {
//         toast.success("✅ Post updated successfully!")
//         setEditingPost(null)
//         fetchDashboardData()
//       } else {
//         toast.error("Failed to update post")
//       }
//     } catch (error) {
//       toast.error("Error updating post")
//     }
//   }

//   const handleDeletePost = async (postId: string) => {
//     const confirmation = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action will permanently delete the post.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     })
//     if (!confirmation.isConfirmed) return
//     try {
//       const response = await fetch("/api/hospital/delete-post", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId }),
//       })
//       if (response.ok) {
//         Swal.fire("Deleted!", "Your post has been deleted.", "success")
//         fetchDashboardData()
//       } else {
//         Swal.fire("Failed", "Unable to delete post.", "error")
//       }
//     } catch (error) {
//       Swal.fire("Error", "An error occurred while deleting the post.", "error")
//     }
//   }

//   const handleToggleAvailability = async () => {
//     try {
//       const response = await fetch("/api/hospital/toggle-availability", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ isAvailable: !isAvailable }),
//       })
//       if (response.ok) {
//         setIsAvailable(!isAvailable)
//         toast.success(`🏥 Hospital is now ${!isAvailable ? "available" : "unavailable"} for emergencies`)
//       } else {
//         toast.error("Failed to update availability")
//       }
//     } catch (error) {
//       toast.error("Error updating availability")
//     }
//   }

//   const handleAlertClick = (alert: EmergencyAlert) => {
//     setSelectedAlert(alert)
//     setShowAlertDialog(true)
//   }

//   const handleResponse = async (action: "accept" | "deny") => {
//     if (!selectedAlert) return
//     setResponding(true)
//     try {
//       const response = await fetch("/api/hospital/emergency-alerts/respond", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           alertId: selectedAlert._id,
//           action,
//         }),
//       })
//       const data = response.headers.get("content-type")?.includes("application/json")
//         ? await response.json()
//         : { message: response.statusText || "An unexpected error occurred." }
//       if (response.ok) {
//         if (action === "accept") {
//           toast.success(`✅ Emergency accepted! Patient: ${selectedAlert.userInfo.name}`)
//           toast.success("🚑 Ambulance dispatched! Patient will be notified.")
//         } else {
//           toast.success("❌ Emergency declined")
//         }
//         setShowAlertDialog(false)
//         setSelectedAlert(null)
//         fetchEmergencyAlerts() // Refresh the list
//       } else {
//         toast.error(data.message || "Failed to respond to emergency")
//       }
//     } catch (error) {
//       console.error("Error responding to emergency:", error)
//       toast.error("Failed to respond to emergency")
//     } finally {
//       setResponding(false)
//     }
//   }

//   const handleDeleteAlert = async (alertId: string) => {
//     const result = await Swal.fire({
//       title: "⚠️ Delete Emergency Alert?",
//       text: "This action cannot be undone.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it",
//     })
//     if (!result.isConfirmed) return
//     try {
//       const response = await fetch("/api/hospital/emergency-alerts/delete", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ alertId }),
//       })
//       if (response.ok) {
//         Swal.fire("Deleted!", "Emergency alert was successfully deleted.", "success")
//         fetchEmergencyAlerts()
//       } else {
//         Swal.fire("Failed", "Unable to delete the alert.", "error")
//       }
//     } catch (error) {
//       Swal.fire("Error", "Something went wrong while deleting the alert.", "error")
//     }
//   }

//   const handleCreateAnnouncement = async () => {
//     if (!newAnnouncement.title || !newAnnouncement.content) {
//       toast.error("Please fill in all required fields for the announcement.")
//       return
//     }
//     setIsSavingAnnouncement(true)
//     try {
//       const response = await fetch("/api/announcements/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: newAnnouncement.title,
//           content: newAnnouncement.content,
//           ownerType: "hospital",
//         }),
//       })
//       if (response.ok) {
//         toast.success("✅ Announcement created successfully!")
//         setNewAnnouncement({ title: "", content: "" })
//         closeAnnouncementForm()
//         fetchDashboardData()
//       } else {
//         toast.error("Failed to create announcement")
//       }
//     } catch (error) {
//       toast.error("Error creating announcement")
//     } finally {
//       setIsSavingAnnouncement(false)
//     }
//   }

//   const handleDeleteAnnouncement = async (announcementId: string) => {
//     const result = await Swal.fire({
//       title: "🗑️ Delete Announcement?",
//       text: "Are you sure you want to permanently delete this announcement?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it",
//     })
//     if (!result.isConfirmed) return
//     try {
//       const response = await fetch("/api/announcements/delete", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: announcementId }),
//       })
//       if (response.ok) {
//         Swal.fire("Deleted!", "Announcement has been deleted.", "success")
//         fetchDashboardData()
//       } else {
//         Swal.fire("Failed", "Unable to delete announcement.", "error")
//       }
//     } catch (error) {
//       Swal.fire("Error", "Something went wrong while deleting the announcement.", "error")
//     }
//   }

//   const openAnnouncementForm = (announcement: Announcement | null) => {
//     setNewAnnouncement({
//       title: announcement?.title || "",
//       content: announcement?.content || "",
//     })
//     setIsAnnouncementFormOpen(true)
//   }

//   const closeAnnouncementForm = () => {
//     setIsAnnouncementFormOpen(false)
//     setNewAnnouncement({ title: "", content: "" })
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

//   const formatLocationAddress = (address: any) => {
//     if (!address) return ""
//     const parts = [
//       address.street,
//       address.area,
//       address.townOrVillage,
//       address.taluka,
//       address.district,
//       address.state || "Gujarat",
//       address.pincode,
//     ].filter(Boolean)
//     return parts.join(", ")
//   }

//   const openGoogleMaps = (location: { lat?: number; lng?: number; address?: any }) => {
//     if (!location || (!location.lat && !location.lng && !location.address)) {
//       toast.error("Location data not available for mapping.")
//       return
//     }
//     let googleMapsUrl = ""
//     if (location.lat && location.lng) {
//       googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
//       toast.success("🗺️ Opening location in Google Maps via GPS...")
//     } else if (location.address) {
//       const searchQuery = formatLocationAddress(location.address)
//       if (searchQuery) {
//         googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
//         toast.success("🗺️ Opening location in Google Maps via address...")
//       } else {
//         toast.error("Insufficient address details for mapping.")
//         return
//       }
//     } else {
//       toast.error("No valid location data to open in Google Maps.")
//       return
//     }
//     window.open(googleMapsUrl, "_blank")
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <motion.div
//             className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           />
//           <p className="text-gray-600 dark:text-gray-400 text-lg">Loading hospital dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   const quickStatsGridCols = isHandleEmergency ? "grid-cols-1 md:grid-cols-5" : "grid-cols-1 md:grid-cols-4"
//   const tabsListGridCols = isHandleEmergency ? "grid-cols-5" : "grid-cols-4"

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       {/* Header with Animated Icons */}
//       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
//         <AnimatedHealthIcons />
//         <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
//           <div className="flex items-center space-x-4">
//             <motion.div
//               className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
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
//               <Building2 className="w-6 h-6 text-white" />
//             </motion.div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900 dark:text-white">Hospital Dashboard</h1>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {isHandleEmergency ? "Manage emergency care & health content" : "Manage health content"}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             {/* Emergency controls - Only show if hospital handles emergencies */}
//             {isHandleEmergency && (
//               <>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//                   <Clock className="w-4 h-4" />
//                   <span>Last checked: {lastChecked.toLocaleTimeString()}</span>
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={fetchEmergencyAlerts}
//                   className="flex items-center space-x-2 bg-transparent"
//                 >
//                   <RefreshCw className="w-4 h-4" />
//                   <span>Refresh</span>
//                 </Button>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-sm text-gray-600 dark:text-gray-400">Available for emergencies</span>
//                   <Switch
//                     checked={isAvailable}
//                     onCheckedChange={handleToggleAvailability}
//                     disabled={!isHandleEmergency}
//                   />
//                 </div>
//               </>
//             )}
//             <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//               <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
//               {notifications > 0 && isHandleEmergency && (
//                 <motion.span
//                   className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   {notifications}
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
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome, {user?.name}! 🏥</h2>
//           <p className="text-gray-600 dark:text-gray-400">
//             {isHandleEmergency
//               ? "Manage emergency responses and share important health information with the community."
//               : "Share important health information and connect with the medical community."}
//           </p>
//           {/* Debug info - remove in production */}
//           <div className="mt-2 text-xs text-gray-500">
//             Emergency Handling: {isHandleEmergency ? "Enabled" : "Disabled"} | Available: {isAvailable ? "Yes" : "No"}
//           </div>
//           {/* Display fixed location */}
//           {fixedLocation ? (
//             <p className="text-sm text-gray-500 mt-2">
//               📍 Fixed Location (from address): {fixedLocation.lat.toFixed(4)}, {fixedLocation.lng.toFixed(4)}
//             </p>
//           ) : (
//             <p className="text-sm text-gray-500 mt-2">📍 Fixed Location: Not yet available</p>
//           )}
//           {/* Link to All Hospitals Page */}
//           <Link href="/all-hospitals" passHref>
//             <Button variant="outline" className="mt-4 bg-transparent">
//               <Building2 className="w-4 h-4 mr-2" /> View All Hospitals
//             </Button>
//           </Link>
//         </motion.div>
//         {/* Emergency Alerts Banner - Only show if hospital handles emergencies */}
//         {notifications > 0 && isHandleEmergency && (
//           <motion.div
//             className="mb-8"
//             initial={{ opacity: 0, scale: 0.9 }}
//             animate={{ opacity: 1, scale: 1 }}
//             transition={{ duration: 0.6, delay: 0.1 }}
//           >
//             <Card className="border-red-200 dark:border-red-800 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div className="flex items-center space-x-4">
//                     <motion.div
//                       className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg"
//                       animate={{
//                         boxShadow: [
//                           "0 0 0 0 rgba(239, 68, 68, 0.7)",
//                           "0 0 0 10px rgba(239, 68, 68, 0)",
//                           "0 0 0 0 rgba(239, 68, 68, 0)",
//                         ],
//                       }}
//                       transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
//                     >
//                       <AlertTriangle className="w-6 h-6 text-white" />
//                     </motion.div>
//                     <div>
//                       <h3 className="text-lg font-semibold text-red-800 dark:text-red-200">
//                         {notifications} Pending Emergency Alert{notifications > 1 ? "s" : ""}
//                       </h3>
//                       <p className="text-red-600 dark:text-red-300">Patients need immediate assistance</p>
//                     </div>
//                   </div>
//                   <Button
//                     onClick={() => document.querySelector('[value="emergencies"]')?.click()}
//                     className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-2"
//                   >
//                     View Alerts
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//         )}
//         {/* Quick Stats */}
//         <motion.div
//           className={`grid ${quickStatsGridCols} gap-6 mb-8`}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           {/* Emergency Alerts Card - Only show if hospital handles emergencies */}
//           {isHandleEmergency && (
//             <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//               <Card className="hover:shadow-lg transition-all duration-300">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">Emergency Alerts</p>
//                       <p className="text-2xl font-bold text-red-600">{emergencyAlerts.length}</p>
//                       <p className="text-xs text-gray-500">{notifications} pending</p>
//                     </div>
//                     <motion.div
//                       className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center"
//                       animate={{
//                         scale: notifications > 0 ? [1, 1.2, 1] : 1,
//                       }}
//                       transition={{ duration: 2, repeat: notifications > 0 ? Number.POSITIVE_INFINITY : 0 }}
//                     >
//                       <AlertTriangle className="w-6 h-6 text-red-600" />
//                     </motion.div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">My Posts</p>
//                     <p className="text-2xl font-bold text-purple-600">{ownPosts.length}</p>
//                     <p className="text-xs text-gray-500">Published content</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
//                     animate={{ rotate: [0, 360] }}
//                     transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                   >
//                     <MessageSquare className="w-6 h-6 text-purple-600" />
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
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Associated Doctors</p>
//                     <p className="text-2xl font-bold text-green-600">{doctors.length}</p>
//                     <p className="text-xs text-gray-500">Network partners</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       y: [0, -5, 0],
//                     }}
//                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <UserCheck className="w-6 h-6 text-green-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//           {/* My Announcements Card */}
//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">My Announcements</p>
//                     <p className="text-2xl font-bold text-blue-600">{ownAnnouncements.length}</p>
//                     <p className="text-xs text-gray-500 mt-1">Shared updates</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       y: [0, -5, 0],
//                     }}
//                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <Megaphone className="w-6 h-6 text-blue-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//           {/* Status Card - Only show if hospital handles emergencies */}
//           {isHandleEmergency && (
//             <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//               <Card className="hover:shadow-lg transition-all duration-300">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
//                       <p className={`text-2xl font-bold ${isAvailable ? "text-green-600" : "text-red-600"}`}>
//                         {isAvailable ? "Available" : "Unavailable"}
//                       </p>
//                       <p className="text-xs text-gray-500">Emergency services</p>
//                     </div>
//                     <motion.div
//                       className={`w-12 h-12 ${
//                         isAvailable ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
//                       } rounded-full flex items-center justify-center`}
//                       animate={{
//                         rotate: [0, 10, -10, 0],
//                       }}
//                       transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//                     >
//                       <Activity className={`w-6 h-6 ${isAvailable ? "text-green-600" : "text-red-600"}`} />
//                     </motion.div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//         </motion.div>
//         {/* Main Content Tabs */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//         >
//           <Tabs defaultValue={isHandleEmergency ? "emergencies" : "create"} className="space-y-6">
//             <TabsList className={`grid w-full ${tabsListGridCols}`}>
//               {isHandleEmergency && <TabsTrigger value="emergencies">Emergency Alerts</TabsTrigger>}
//               <TabsTrigger value="create">Create Post</TabsTrigger>
//               <TabsTrigger value="own-posts">Own Posts</TabsTrigger>
//               <TabsTrigger value="all-posts">All Posts</TabsTrigger>
//               <TabsTrigger value="announcements">Announcements</TabsTrigger>
//             </TabsList>
//             {/* Emergency Alerts Tab - Only show if hospital handles emergencies */}
//             {isHandleEmergency && (
//               <TabsContent value="emergencies" className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <Shield className="w-5 h-5" />
//                         <span>Emergency Alerts</span>
//                         <Badge variant="destructive">{notifications} pending</Badge>
//                       </div>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setAutoRefresh(!autoRefresh)}
//                         className={autoRefresh ? "bg-green-50 border-green-200" : ""}
//                       >
//                         Auto-refresh {autoRefresh ? "ON" : "OFF"}
//                       </Button>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     {emergencyAlerts.length > 0 ? (
//                       <div className="space-y-4">
//                         {emergencyAlerts.map((alert, index) => (
//                           <motion.div
//                             key={alert._id}
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: index * 0.1 }}
//                             className={`border rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer ${
//                               alert.hospitalAlertStatus === "pending"
//                                 ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
//                                 : alert.hospitalAlertStatus === "read"
//                                   ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
//                                   : alert.status === "accepted"
//                                     ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
//                                     : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
//                             }`}
//                             onClick={() => handleAlertClick(alert)}
//                           >
//                             <div className="flex items-start justify-between">
//                               <div className="flex-1">
//                                 <div className="flex items-center space-x-3 mb-3">
//                                   <motion.div
//                                     className={`w-3 h-3 rounded-full ${
//                                       alert.hospitalAlertStatus === "pending"
//                                         ? "bg-red-500"
//                                         : alert.hospitalAlertStatus === "read"
//                                           ? "bg-yellow-500"
//                                           : alert.status === "accepted"
//                                             ? "bg-green-500"
//                                             : "bg-gray-500"
//                                     }`}
//                                     animate={{ scale: alert.hospitalAlertStatus === "pending" ? [1, 1.2, 1] : 1 }}
//                                     transition={{
//                                       duration: 1,
//                                       repeat: alert.hospitalAlertStatus === "pending" ? Number.POSITIVE_INFINITY : 0,
//                                     }}
//                                   />
//                                   <h3
//                                     className={`font-semibold text-lg ${
//                                       alert.hospitalAlertStatus === "pending"
//                                         ? "text-red-800 dark:text-red-200"
//                                         : alert.hospitalAlertStatus === "read"
//                                           ? "text-yellow-800 dark:text-yellow-200"
//                                           : alert.status === "accepted"
//                                             ? "text-green-800 dark:text-green-200"
//                                             : "text-gray-800 dark:text-gray-200"
//                                     }`}
//                                   >
//                                     🚨 EMERGENCY ALERT
//                                   </h3>
//                                   <Badge className={getPriorityColor(alert.priority)}>
//                                     {alert.priority.toUpperCase()}
//                                   </Badge>
//                                   {alert.status === "accepted" && (
//                                     <Badge variant="default" className="bg-green-600">
//                                       ACCEPTED
//                                     </Badge>
//                                   )}
//                                   {alert.hospitalAlertStatus === "read" && alert.status === "pending" && (
//                                     <Badge variant="outline" className="bg-yellow-600 text-white">
//                                       VIEWED
//                                     </Badge>
//                                   )}
//                                 </div>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                   <div>
//                                     <h4 className="font-medium text-gray-900 dark:text-white mb-2">
//                                       Patient Information
//                                     </h4>
//                                     <div className="space-y-1 text-sm">
//                                       <div className="flex items-center space-x-2">
//                                         <User className="w-4 h-4 text-gray-500" />
//                                         <span>{alert.userInfo.name}</span>
//                                       </div>
//                                       <div className="flex items-center space-x-2">
//                                         <Phone className="w-4 h-4 text-gray-500" />
//                                         <span>{alert.userInfo.phone}</span>
//                                       </div>
//                                       <div className="flex items-center space-x-2">
//                                         <Mail className="w-4 h-4 text-gray-500" />
//                                         <span>{alert.userInfo.email}</span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <h4 className="font-medium text-gray-900 dark:text-white mb-2">
//                                       Location & Distance
//                                     </h4>
//                                     <div className="space-y-1 text-sm">
//                                       {alert.distance && (
//                                         <div className="flex items-center space-x-2">
//                                           <Navigation className="w-4 h-4 text-green-500" />
//                                           <span className="font-semibold text-green-600">{alert.distance}km away</span>
//                                           {alert.proximityMethod && (
//                                             <span className="text-xs text-gray-500">({alert.proximityMethod})</span>
//                                           )}
//                                         </div>
//                                       )}
//                                       {/* Google Maps Integration */}
//                                       <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
//                                         <div className="flex items-start space-x-2">
//                                           <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
//                                           <div className="flex-1">
//                                             <p className="font-medium text-blue-800 dark:text-blue-200 text-sm">
//                                               Patient Location:
//                                             </p>
//                                             <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
//                                               📍{" "}
//                                               {alert.location?.lat && alert.location?.lng
//                                                 ? `GPS: ${alert.location.lat.toFixed(4)}, ${alert.location.lng.toFixed(4)}`
//                                                 : formatLocationAddress(alert.location?.address) ||
//                                                   "Location details not available"}
//                                             </p>
//                                             {/* Google Maps Rectangle Button */}
//                                             <motion.button
//                                               whileHover={{ scale: 1.02 }}
//                                               whileTap={{ scale: 0.98 }}
//                                               onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 openGoogleMaps(alert.location)
//                                               }}
//                                               className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2 transition-colors"
//                                             >
//                                               <Map className="w-4 h-4" />
//                                               <span>Open in Google Maps</span>
//                                               <ExternalLink className="w-3 h-3" />
//                                             </motion.button>
//                                             {alert.location?.lat && alert.location?.lng && (
//                                               <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
//                                                 GPS: {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
//                                               </p>
//                                             )}
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                   <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//                                     <Timer className="w-4 h-4" />
//                                     <span>{formatTimeAgo(alert.createdAt)}</span>
//                                   </div>
//                                   <div className="flex space-x-2">
//                                     {alert.hospitalAlertStatus === "pending" && (
//                                       <Button
//                                         size="sm"
//                                         variant="destructive"
//                                         onClick={(e) => {
//                                           e.stopPropagation()
//                                           handleAlertClick(alert)
//                                         }}
//                                         className="animate-pulse"
//                                       >
//                                         🚨 RESPOND NOW
//                                       </Button>
//                                     )}
//                                     <Button
//                                       size="sm"
//                                       variant="outline"
//                                       onClick={(e) => {
//                                         e.stopPropagation()
//                                         handleDeleteAlert(alert._id)
//                                       }}
//                                       className="text-red-600 hover:text-red-800 hover:bg-red-50"
//                                     >
//                                       <Trash2 className="w-4 h-4" />
//                                       Delete
//                                     </Button>
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
//                           No Emergency Alerts
//                         </h3>
//                         <p className="text-gray-500">No emergency alerts in your area at the moment</p>
//                         <p className="text-sm text-gray-400 mt-2">System checks every 30 seconds for new alerts</p>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             )}
//             {/* Create Post Tab */}
//             <TabsContent value="create" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Plus className="w-5 h-5" />
//                     <span>Create New Hospital Post</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Post Title *</label>
//                     <Input
//                       value={newPost.title}
//                       onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//                       placeholder="e.g., New Emergency Department Now Open 24/7"
//                       className="w-full"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Content *</label>
//                     <Textarea
//                       value={newPost.content}
//                       onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//                       placeholder="Share hospital updates, health tips, or important announcements..."
//                       className="w-full min-h-[200px]"
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Category *</label>
//                       <Select
//                         value={newPost.category}
//                         onValueChange={(value) => setNewPost({ ...newPost, category: value })}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {categories.map((category) => (
//                             <SelectItem key={category} value={category}>
//                               {category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
//                     <Input
//                       value={newPost.tags}
//                       onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
//                       placeholder="e.g., emergency-care, cardiology, 24-7-service, health-tips"
//                       className="w-full"
//                     />
//                   </div>
//                   <Button
//                     onClick={handleCreatePost}
//                     className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
//                   >
//                     <Send className="w-4 h-4 mr-2" />
//                     Create Post
//                   </Button>
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             {/* Own Posts Tab */}
//             <TabsContent value="own-posts" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Building2 className="w-5 h-5 text-purple-600" />
//                     <span>My Posts</span>
//                     <Badge variant="secondary">{ownPosts.length} posts</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {ownPosts.length > 0 ? (
//                     <div className="space-y-4">
//                       {ownPosts.map((post, index) => (
//                         <motion.div
//                           key={post._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex-1">
//                               <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
//                               <div className="flex items-center space-x-2 mb-2">
//                                 <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
//                                 <Badge variant={post.isApproved ? "default" : "destructive"}>
//                                   {post.isApproved ? "Approved" : "Pending"}
//                                 </Badge>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <Dialog>
//                                 <DialogTrigger asChild>
//                                   <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
//                                     <Edit className="w-4 h-4" />
//                                   </Button>
//                                 </DialogTrigger>
//                                 <DialogContent className="max-w-2xl">
//                                   <DialogHeader>
//                                     <DialogTitle>Edit Post</DialogTitle>
//                                   </DialogHeader>
//                                   <div className="space-y-4">
//                                     <Input
//                                       defaultValue={post.title}
//                                       placeholder="Post title"
//                                       onChange={(e) =>
//                                         setEditingPost((prev) => (prev ? { ...prev, title: e.target.value } : null))
//                                       }
//                                     />
//                                     <Textarea
//                                       defaultValue={post.content}
//                                       placeholder="Post content"
//                                       className="min-h-[200px]"
//                                       onChange={(e) =>
//                                         setEditingPost((prev) => (prev ? { ...prev, content: e.target.value } : null))
//                                       }
//                                     />
//                                     <div className="flex space-x-2">
//                                       <Button
//                                         onClick={() =>
//                                           editingPost &&
//                                           handleEditPost(editingPost._id, {
//                                             title: editingPost.title,
//                                             content: editingPost.content,
//                                           })
//                                         }
//                                         className="bg-purple-600 hover:bg-purple-700"
//                                       >
//                                         Save Changes
//                                       </Button>
//                                       <Button variant="outline" onClick={() => setEditingPost(null)}>
//                                         Cancel
//                                       </Button>
//                                     </div>
//                                   </div>
//                                 </DialogContent>
//                               </Dialog>
//                               <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post._id)}>
//                                 <Trash2 className="w-4 h-4" />
//                               </Button>
//                             </div>
//                           </div>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{post.content}</p>
//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {post.tags.map((tag, tagIndex) => (
//                               <Badge key={tagIndex} variant="secondary" className="text-xs">
//                                 <Tag className="w-3 h-3 mr-1" />
//                                 {tag}
//                               </Badge>
//                             ))}
//                           </div>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2 text-gray-600">
//                               <Eye className="w-4 h-4" />
//                               <span className="text-sm">View details</span>
//                             </div>
//                             <div className="flex items-center space-x-2 text-xs text-gray-500">
//                               <Calendar className="w-4 h-4" />
//                               <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No posts yet</h3>
//                       <p className="text-gray-500 mb-4">Start sharing hospital updates and health information</p>
//                       <Button onClick={() => document.querySelector('[value="create"]')?.click()}>
//                         Create Your First Post
//                       </Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>
//             {/* All Posts Tab (formerly Doctor Posts Tab) */}
//             <TabsContent value="all-posts" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Stethoscope className="w-5 h-5 text-green-600" />
//                     <span>All Posts</span>
//                     <Badge variant="secondary">{allOtherPosts.length} posts</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {allOtherPosts.length > 0 ? (
//                     <div className="space-y-4">
//                       {allOtherPosts.map((post, index) => (
//                         <motion.div
//                           key={post._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex items-center space-x-3">
//                               <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
//                                 {post.authorType === "Doctor" ? (
//                                   <Stethoscope className="w-5 h-5 text-green-600" />
//                                 ) : (
//                                   <Building2 className="w-5 h-5 text-purple-600" />
//                                 )}
//                               </div>
//                               <div>
//                                 <p className="font-semibold">
//                                   {post.authorType === "Doctor" ? "Dr." : ""} {post.postby}
//                                 </p>
//                                 <p className="text-sm text-gray-500 capitalize">{post.authorType}</p>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
//                               <span className="text-xs text-gray-500">
//                                 {new Date(post.createdAt).toLocaleDateString()}
//                               </span>
//                             </div>
//                           </div>
//                           <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {post.tags.map((tag, tagIndex) => (
//                               <Badge key={tagIndex} variant="secondary" className="text-xs">
//                                 #{tag}
//                               </Badge>
//                             ))}
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No posts yet</h3>
//                       <p className="text-gray-500">Posts from other hospitals and doctors will appear here</p>
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
//                     <span>My Announcements</span>
//                     <Badge variant="secondary">{ownAnnouncements.length} announcements</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4 border-b pb-4 mb-4">
//                     <h3 className="text-lg font-semibold">Create New Announcement</h3>
//                     <Dialog open={isAnnouncementFormOpen} onOpenChange={setIsAnnouncementFormOpen}>
//                       <DialogTrigger asChild>
//                         <Button onClick={() => openAnnouncementForm(null)} className="w-full">
//                           <Plus className="w-4 h-4 mr-2" />
//                           Create New Announcement
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent className="sm:max-w-[425px]">
//                         <DialogHeader>
//                           <DialogTitle>{"Create New Announcement"}</DialogTitle>
//                         </DialogHeader>
//                         <div className="space-y-4">
//                           <div>
//                             <label className="block text-sm font-medium mb-2">Title *</label>
//                             <Input
//                               value={newAnnouncement.title}
//                               onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
//                               placeholder="e.g., Holiday Notice: Clinic Closed on Dec 25th"
//                               className="w-full"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium mb-2">Content *</label>
//                             <Textarea
//                               value={newAnnouncement.content}
//                               onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
//                               placeholder="Share important updates with your network..."
//                               className="w-full min-h-[120px]"
//                             />
//                           </div>
//                           <div className="flex space-x-2">
//                             <Button
//                               onClick={handleCreateAnnouncement}
//                               disabled={isSavingAnnouncement}
//                               className="bg-blue-600 hover:bg-blue-700"
//                             >
//                               {isSavingAnnouncement ? "Saving..." : "Save Announcement"}
//                             </Button>
//                             <Button variant="outline" onClick={closeAnnouncementForm}>
//                               Cancel
//                             </Button>
//                           </div>
//                         </div>
//                       </DialogContent>
//                     </Dialog>
//                   </div>
//                   <h3 className="text-lg font-semibold mb-4">My Published Announcements</h3>
//                   {ownAnnouncements.length > 0 ? (
//                     <div className="space-y-4">
//                       {ownAnnouncements.map((announcement, index) => (
//                         <motion.div
//                           key={announcement._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex-1">
//                               <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
//                               <div className="flex items-center space-x-2 mb-2">
//                                 <Badge variant="outline">{announcement.ownerType}</Badge>
//                                 <span className="text-sm text-gray-500">Announced by: {announcement.announcedBy}</span>
//                               </div>
//                             </div>
//                             <Button
//                               variant="destructive"
//                               size="sm"
//                               onClick={() => handleDeleteAnnouncement(announcement._id)}
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </Button>
//                           </div>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{announcement.content}</p>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2 text-xs text-gray-500">
//                               <Calendar className="w-4 h-4" />
//                               <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
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
//                       <p className="text-gray-500 mb-4">Share important updates with your network</p>
//                       <Button onClick={() => openAnnouncementForm(null)}>Create Your First Announcement</Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </motion.div>
//       </div>
//       {/* Emergency Alert Response Dialog */}
//       <Dialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle className="flex items-center space-x-2">
//               <AlertTriangle className="w-5 h-5 text-red-500" />
//               <span>Emergency Alert Response</span>
//             </DialogTitle>
//           </DialogHeader>
//           {selectedAlert && (
//             <div className="space-y-6">
//               <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
//                 <AlertTriangle className="h-4 w-4" />
//                 <AlertDescription className="font-semibold">
//                   🚨 EMERGENCY: Immediate medical attention required
//                 </AlertDescription>
//               </Alert>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="font-semibold mb-3">Patient Information</h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex items-center space-x-2">
//                       <User className="w-4 h-4 text-gray-500" />
//                       <span className="font-medium">{selectedAlert.userInfo.name}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Phone className="w-4 h-4 text-gray-500" />
//                       <span>{selectedAlert.userInfo.phone}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Mail className="w-4 h-4 text-gray-500" />
//                       <span>{selectedAlert.userInfo.email}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold mb-3">Emergency Details</h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex items-center space-x-2">
//                       <Badge className={getPriorityColor(selectedAlert.priority)}>
//                         {selectedAlert.priority.toUpperCase()} PRIORITY
//                       </Badge>
//                     </div>
//                     {selectedAlert.distance && (
//                       <div className="flex items-center space-x-2">
//                         <Navigation className="w-4 h-4 text-green-500" />
//                         <span className="font-semibold text-green-600">{selectedAlert.distance}km away</span>
//                       </div>
//                     )}
//                     <div className="flex items-center space-x-2">
//                       <Timer className="w-4 h-4 text-gray-500" />
//                       <span>{formatTimeAgo(selectedAlert.createdAt)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-semibold mb-3">Location</h3>
//                 <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
//                   <div className="flex items-start space-x-2">
//                     <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
//                     <div className="flex-1">
//                       <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">
//                         📍 {formatLocationAddress(selectedAlert.location?.address)}
//                       </p>
//                       <Button
//                         onClick={() => openGoogleMaps(selectedAlert.location?.address)}
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3"
//                       >
//                         <Map className="w-4 h-4 mr-2" />
//                         Open in Google Maps
//                         <ExternalLink className="w-3 h-3 ml-2" />
//                       </Button>
//                       {selectedAlert.location?.lat && selectedAlert.location?.lng && (
//                         <p className="text-xs text-blue-600 dark:text-blue-400">
//                           GPS Coordinates: {selectedAlert.location.lat.toFixed(6)},{" "}
//                           {selectedAlert.location.lng.toFixed(6)}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {selectedAlert.message && (
//                 <div>
//                   <h3 className="font-semibold mb-3">Emergency Message</h3>
//                   <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                     <p className="text-gray-700 dark:text-gray-300">{selectedAlert.message}</p>
//                   </div>
//                 </div>
//               )}
//               {selectedAlert.status === "pending" && (
//                 <div className="flex space-x-4 pt-4 border-t">
//                   <Button
//                     onClick={() => handleResponse("accept")}
//                     disabled={responding}
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
//                   >
//                     {responding ? (
//                       <>
//                         <motion.div
//                           className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                         />
//                         Accepting...
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle className="w-5 h-5 mr-2" />🚑 ACCEPT & DISPATCH AMBULANCE
//                       </>
//                     )}
//                   </Button>
//                   <Button
//                     onClick={() => handleResponse("deny")}
//                     disabled={responding}
//                     variant="destructive"
//                     className="flex-1 font-semibold py-3"
//                   >
//                     {responding ? (
//                       "Processing..."
//                     ) : (
//                       <>
//                         <XCircle className="w-5 h-5 mr-2" />
//                         DECLINE
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               )}
//               {selectedAlert.status === "accepted" && (
//                 <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
//                   <div className="flex items-center space-x-2">
//                     <CheckCircle className="w-5 h-5 text-green-600" />
//                     <span className="font-semibold text-green-800 dark:text-green-200">
//                       Emergency Accepted - Ambulance Dispatched
//                     </span>
//                   </div>
//                   {selectedAlert.acceptedBy && (
//                     <p className="text-sm text-green-700 dark:text-green-300 mt-2">
//                       Handled by: {selectedAlert.acceptedBy.name}
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }


















// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import Link from "next/link" // Import Link
// import {
//   AlertTriangle,
//   Building2,
//   Plus,
//   MessageSquare,
//   Bell,
//   Send,
//   UserCheck,
//   Tag,
//   Calendar,
//   Eye,
//   Edit,
//   Trash2,
//   Clock,
//   Shield,
//   Activity,
//   Stethoscope,
//   User,
//   Phone,
//   Mail,
//   Navigation,
//   Timer,
//   RefreshCw,
//   CheckCircle,
//   XCircle,
//   Map,
//   MapPin,
//   ExternalLink,
//   Megaphone,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import ThemeToggle from "@/components/ThemeToggle"
// import UserDropdown from "@/components/UserDropdown"
// import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
// import { toast } from "react-hot-toast"
// import Swal from "sweetalert2"
// import { useAuth } from "@/app/contexts/AuthProvider"

// interface Post {
//   _id: string
//   title: string
//   content: string
//   category: string
//   tags: string[]
//   authorType: "Doctor" | "Hospital"
//   postby: string
//   email: string
//   createdAt: string
//   isApproved: boolean
// }

// interface Doctor {
//   _id: string
//   name: string
//   email: string
//   specialty: string
//   isVerified: boolean
// }

// interface EmergencyAlert {
//   _id: string
//   userInfo: {
//     name: string
//     email: string
//     phone: string
//   }
//   userId?: {
//     name: string
//     email: string
//     phone: string
//     address: any
//   }
//   location: {
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
//   message: string
//   priority: string
//   status: string // "pending" | "accepted" | "declined" | "cancelled" | "no_response_all_contacted"
//   createdAt: string
//   distance?: number
//   proximityMethod?: string
//   acceptedBy?: {
//     _id: string
//     name: string
//   }
//   hospitalAlertStatus?: "pending" | "read" | "accepted" | "declined" | "timedOut"
// }

// interface HospitalData {
//   _id: string
//   name: string
//   email: string
//   phone: string
//   isAvailable: boolean
//   isHandleEmergency: boolean
//   isVerified: boolean
//   address: any
//   location: {
//     lat?: number
//     lng?: number
//   }
// }

// interface Announcement {
//   _id: string
//   ownerEmail: string
//   ownerType: "doctor" | "hospital" | "user"
//   title: string
//   content: string
//   announcedBy: string
//   readBy: string[]
//   createdAt: string
//   updatedAt: string
// }

// export default function HospitalDashboard() {
//   const { user } = useAuth()
//   const [ownPosts, setOwnPosts] = useState<Post[]>([])
//   const [allOtherPosts, setAllOtherPosts] = useState<Post[]>([])
//   const [doctors, setDoctors] = useState<Doctor[]>([])
//   const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
//   const [ownAnnouncements, setOwnAnnouncements] = useState<Announcement[]>([])
//   const [loading, setLoading] = useState(true)
//   const [notifications, setNotifications] = useState(0)
//   const [hospital, setHospital] = useState<HospitalData | null>(null)
//   const [isHandleEmergency, setIsHandleEmergency] = useState<boolean>(false)
//   const [isAvailable, setIsAvailable] = useState<boolean>(false)
//   const [editingPost, setEditingPost] = useState<Post | null>(null)
//   const [selectedAlert, setSelectedAlert] = useState<EmergencyAlert | null>(null)
//   const [showAlertDialog, setShowAlertDialog] = useState(false)
//   const [responding, setResponding] = useState(false)
//   const [lastChecked, setLastChecked] = useState<Date>(new Date())
//   const [autoRefresh, setAutoRefresh] = useState(true)
//   const [activeTab, setActiveTab] = useState<string | undefined>(undefined) // State to control active tab

//   // State for the fixed hospital location (from DB, geocoded from address)
//   const [fixedLocation, setFixedLocation] = useState<{ lat: number; lng: number } | null>(null)

//   // Post creation state
//   const [newPost, setNewPost] = useState({
//     title: "",
//     content: "",
//     category: "",
//     tags: "",
//   })

//   // Announcement creation state
//   const [newAnnouncement, setNewAnnouncement] = useState({
//     title: "",
//     content: "",
//   })
//   const [isAnnouncementFormOpen, setIsAnnouncementFormOpen] = useState(false)
//   const [isSavingAnnouncement, setIsSavingAnnouncement] = useState(false)

//   const categories = [
//     "emergency-care",
//     "hospital-services",
//     "health-tips",
//     "prevention",
//     "treatment",
//     "facilities",
//     "announcements",
//     "cardiology",
//     "neurology",
//     "pediatrics",
//   ]

//   // Initial data fetching and emergency alert polling
//   useEffect(() => {
//     const initDashboard = async () => {
//       setLoading(true)
//       // Fetch hospital data first to determine emergency handling capability
//       const hospitalData = await fetchHospitalData()
//       if (hospitalData?.isHandleEmergency) {
//         setActiveTab("emergencies") // Set default tab to emergencies if handling them
//       } else {
//         setActiveTab("create") // Otherwise, default to create post
//       }

//       // Staggered fetching of other dashboard data
//       setTimeout(async () => {
//         await fetchOwnPostsAndAnnouncements()
//       }, 1000) // 1 second delay

//       setTimeout(async () => {
//         await fetchAllOtherPosts()
//       }, 2000) // 2 second delay

//       if (hospitalData?.isHandleEmergency) {
//         setTimeout(async () => {
//           await fetchEmergencyAlerts() // Fetch alerts only if handling emergencies
//         }, 3000) // 3 second delay
//       }
//       setLoading(false) // Set loading to false after all initial fetches are initiated
//     }

//     initDashboard()

//     // Polling for alerts (existing logic)
//     const interval = setInterval(() => {
//       if (autoRefresh && isHandleEmergency) {
//         fetchEmergencyAlerts()
//       }
//     }, 30000)
//     return () => clearInterval(interval)
//   }, [autoRefresh, isHandleEmergency])

//   // Effect to trigger fixed location geocoding after a delay if not already set
//   useEffect(() => {
//     if (hospital && !hospital.location?.lat && !hospital.location?.lng) {
//       console.log("Hospital fixed location not set. Initiating geocoding in 4 minutes...")
//       // Using 5 seconds for demonstration. For production, use 4 * 60 * 1000 (4 minutes).
//       const geocodeTimer = setTimeout(() => {
//         console.log("4 minutes passed. Attempting to geocode hospital address.")
//         triggerFixedLocationGeocoding(hospital._id)
//       }, 5 * 1000)
//       return () => clearTimeout(geocodeTimer)
//     }
//   }, [hospital]) // Re-run when hospital data changes

//   const triggerFixedLocationGeocoding = async (hospitalId: string) => {
//     try {
//       const response = await fetch("/api/hospital/update-fixed-location", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ hospitalId }),
//       })
//       const data = await response.json()
//       if (response.ok && data.success) {
//         // No toast message here, just update the UI
//         fetchHospitalData() // Re-fetch hospital data to update the UI with the new fixed location
//       } else {
//         console.error("Failed to update fixed location:", data.message)
//         // Optionally, log this error but don't show a toast to the user for this background process
//       }
//     } catch (error) {
//       console.error("Error triggering fixed location geocoding:", error)
//       // Optionally, log this error
//     }
//   }

//   const fetchHospitalData = async () => {
//     try {
//       const response = await fetch("/api/hospital/me")
//       if (response.ok) {
//         const result = await response.json()
//         if (result.success) {
//           setHospital(result.data)
//           setIsHandleEmergency(result.data.isHandleEmergency)
//           setIsAvailable(result.data.isAvailable)
//           // Set fixed location from fetched hospital data if available
//           if (result.data.location?.lat && result.data.location?.lng) {
//             setFixedLocation(result.data.location)
//           }
//           console.log("Hospital data:", result.data)
//           console.log("isHandleEmergency:", result.data.isHandleEmergency)
//           return result.data // Return hospital data for initial tab setting
//         }
//       } else {
//         console.error("Failed to fetch hospital data")
//         toast.error("Failed to load hospital settings")
//       }
//     } catch (error) {
//       console.error("Error fetching hospital data:", error)
//       toast.error("Error loading hospital data")
//     }
//     return null
//   }

//   const fetchOwnPostsAndAnnouncements = async () => {
//     try {
//       const [ownPostsRes, ownAnnouncementsRes] = await Promise.all([
//         fetch("/api/hospital/own-posts"),
//         fetch("/api/announcements/own"), // Fetch own announcements
//       ])

//       if (ownPostsRes.ok) {
//         const ownPostsData = await ownPostsRes.json()
//         setOwnPosts(ownPostsData.data || [])
//       }
//       if (ownAnnouncementsRes.ok) {
//         const ownAnnouncementsData = await ownAnnouncementsRes.json()
//         setOwnAnnouncements(ownAnnouncementsData.data || [])
//       }
//     } catch (error) {
//       console.error("Error fetching own posts or announcements:", error)
//     }
//   }

//   const fetchAllOtherPosts = async () => {
//     try {
//       const allOtherPostsRes = await fetch("/api/posts") // Fetch all posts for "All Posts" tab
//       if (allOtherPostsRes.ok) {
//         const allOtherPostsData = await allOtherPostsRes.json()
//         // Filter out own posts from allOtherPosts based on user's email
//         setAllOtherPosts(allOtherPostsData.data.filter((post: Post) => post.email !== user?.email) || [])
//       }
//     } catch (error) {
//       console.error("Error fetching all other posts:", error)
//     }
//   }

//   const fetchEmergencyAlerts = async () => {
//     if (!isHandleEmergency) return
//     try {
//       console.log("🔄 Fetching emergency alerts...")
//       const response = await fetch("/api/hospital/emergency-alerts")
//       const data = await response.json()
//       if (response.ok) {
//         const relevantAlerts =
//           data.alerts?.filter(
//             (alert: EmergencyAlert) =>
//               alert.hospitalAlertStatus === "pending" ||
//               alert.hospitalAlertStatus === "read" ||
//               alert.status === "accepted",
//           ) || []
//         setEmergencyAlerts(relevantAlerts)
//         setNotifications(
//           relevantAlerts.filter((alert: EmergencyAlert) => alert.hospitalAlertStatus === "pending").length || 0,
//         )
//         setLastChecked(new Date())
//         console.log(`✅ Found ${relevantAlerts.length || 0} nearby emergency alerts`)
//         if (relevantAlerts.length > 0) {
//           const criticalPendingAlerts = relevantAlerts.filter(
//             (alert: EmergencyAlert) => alert.priority === "critical" && alert.hospitalAlertStatus === "pending",
//           )
//           if (criticalPendingAlerts.length > 0) {
//             toast.error(`🚨 ${criticalPendingAlerts.length} CRITICAL emergency alert(s) nearby!`, {
//               duration: 8000,
//             })
//           }
//         }
//       } else {
//         console.error("❌ Failed to fetch emergency alerts:", data.message)
//       }
//     } catch (error) {
//       console.error("💥 Error fetching emergency alerts:", error)
//     }
//   }

//   const handleCreatePost = async () => {
//     if (!newPost.title || !newPost.content || !newPost.category) {
//       toast.error("Please fill in all required fields")
//       return
//     }
//     try {
//       console.log("\n in /api/hospital/create-post Creating new post:", newPost)
//       const response = await fetch("/api/hospital/create-post", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: newPost.title,
//           content: newPost.content,
//           category: newPost.category,
//           tags: newPost.tags
//             .split(",")
//             .map((tag) => tag.trim())
//             .filter((tag) => tag),
//         }),
//       })
//       if (response.ok) {
//         toast.success("✅ Post created successfully! Awaiting admin approval.")
//         setNewPost({
//           title: "",
//           content: "",
//           category: "",
//           tags: "",
//         })
//         fetchOwnPostsAndAnnouncements() // Refresh own posts
//       } else {
//         toast.error("Failed to create post")
//       }
//     } catch (error) {
//       toast.error("Error creating post")
//     }
//   }

//   const handleEditPost = async (postId: string, updatedData: Partial<Post>) => {
//     try {
//       const response = await fetch("/api/hospital/edit-post", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId, ...updatedData }),
//       })
//       if (response.ok) {
//         toast.success("✅ Post updated successfully!")
//         setEditingPost(null)
//         fetchOwnPostsAndAnnouncements() // Refresh own posts
//       } else {
//         toast.error("Failed to update post")
//       }
//     } catch (error) {
//       toast.error("Error updating post")
//     }
//   }

//   const handleDeletePost = async (postId: string) => {
//     const confirmation = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action will permanently delete the post.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     })
//     if (!confirmation.isConfirmed) return
//     try {
//       const response = await fetch("/api/hospital/delete-post", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId }),
//       })
//       if (response.ok) {
//         Swal.fire("Deleted!", "Your post has been deleted.", "success")
//         fetchOwnPostsAndAnnouncements() // Refresh own posts
//       } else {
//         Swal.fire("Failed", "Unable to delete post.", "error")
//       }
//     } catch (error) {
//       Swal.fire("Error", "An error occurred while deleting the post.", "error")
//     }
//   }

//   const handleToggleAvailability = async () => {
//     try {
//       const response = await fetch("/api/hospital/toggle-availability", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ isAvailable: !isAvailable }),
//       })
//       if (response.ok) {
//         setIsAvailable(!isAvailable)
//         toast.success(`🏥 Hospital is now ${!isAvailable ? "available" : "unavailable"} for emergencies`)
//       } else {
//         toast.error("Failed to update availability")
//       }
//     } catch (error) {
//       toast.error("Error updating availability")
//     }
//   }

//   const handleAlertClick = (alert: EmergencyAlert) => {
//     setSelectedAlert(alert)
//     setShowAlertDialog(true)
//   }

//   const handleResponse = async (action: "accept" | "deny") => {
//     if (!selectedAlert) return
//     setResponding(true)
//     try {
//       const response = await fetch("/api/hospital/emergency-alerts/respond", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           alertId: selectedAlert._id,
//           action,
//         }),
//       })
//       const data = response.headers.get("content-type")?.includes("application/json")
//         ? await response.json()
//         : { message: response.statusText || "An unexpected error occurred." }
//       if (response.ok) {
//         if (action === "accept") {
//           toast.success(`✅ Emergency accepted! Patient: ${selectedAlert.userInfo.name}`)
//           toast.success("🚑 Ambulance dispatched! Patient will be notified.")
//         } else {
//           toast.success("❌ Emergency declined")
//         }
//         setShowAlertDialog(false)
//         setSelectedAlert(null)
//         fetchEmergencyAlerts() // Refresh the list
//       } else {
//         toast.error(data.message || "Failed to respond to emergency")
//       }
//     } catch (error) {
//       console.error("Error responding to emergency:", error)
//       toast.error("Failed to respond to emergency")
//     } finally {
//       setResponding(false)
//     }
//   }

//   // Removed handleDeleteAlert for hospital alerts as per user request
//   // const handleDeleteAlert = async (alertId: string) => {
//   //   const result = await Swal.fire({
//   //     title: "⚠️ Delete Emergency Alert?",
//   //     text: "This action cannot be undone.",
//   //     icon: "warning",
//   //     showCancelButton: true,
//   //     confirmButtonColor: "#d33",
//   //     cancelButtonColor: "#3085d6",
//   //     confirmButtonText: "Yes, delete it",
//   //   })
//   //   if (!result.isConfirmed) return
//   //   try {
//   //     const response = await fetch("/api/hospital/emergency-alerts/delete", {
//   //       method: "DELETE",
//   //       headers: { "Content-Type": "application/json" },
//   //       body: JSON.stringify({ alertId }),
//   //     })
//   //     if (response.ok) {
//   //       Swal.fire("Deleted!", "Emergency alert was successfully deleted.", "success")
//   //       fetchEmergencyAlerts()
//   //     } else {
//   //       Swal.fire("Failed", "Unable to delete the alert.", "error")
//   //     }
//   //   } catch (error) {
//   //     Swal.fire("Error", "Something went wrong while deleting the alert.", "error")
//   //   }
//   // }

//   const handleCreateAnnouncement = async () => {
//     if (!newAnnouncement.title || !newAnnouncement.content) {
//       toast.error("Please fill in all required fields for the announcement.")
//       return
//     }
//     setIsSavingAnnouncement(true)
//     try {
//       const response = await fetch("/api/announcements/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: newAnnouncement.title,
//           content: newAnnouncement.content,
//           ownerType: "hospital",
//         }),
//       })
//       if (response.ok) {
//         toast.success("✅ Announcement created successfully!")
//         setNewAnnouncement({ title: "", content: "" })
//         closeAnnouncementForm()
//         fetchOwnPostsAndAnnouncements() // Refresh own announcements
//       } else {
//         toast.error("Failed to create announcement")
//       }
//     } catch (error) {
//       toast.error("Error creating announcement")
//     } finally {
//       setIsSavingAnnouncement(false)
//     }
//   }

//   const handleDeleteAnnouncement = async (announcementId: string) => {
//     const result = await Swal.fire({
//       title: "🗑️ Delete Announcement?",
//       text: "Are you sure you want to permanently delete this announcement?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it",
//     })
//     if (!result.isConfirmed) return
//     try {
//       const response = await fetch("/api/announcements/delete", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: announcementId }),
//       })
//       if (response.ok) {
//         Swal.fire("Deleted!", "Announcement has been deleted.", "success")
//         fetchOwnPostsAndAnnouncements() // Refresh own announcements
//       } else {
//         Swal.fire("Failed", "Unable to delete announcement.", "error")
//       }
//     } catch (error) {
//       Swal.fire("Error", "Something went wrong while deleting the announcement.", "error")
//     }
//   }

//   const openAnnouncementForm = (announcement: Announcement | null) => {
//     setNewAnnouncement({
//       title: announcement?.title || "",
//       content: announcement?.content || "",
//     })
//     setIsAnnouncementFormOpen(true)
//   }

//   const closeAnnouncementForm = () => {
//     setIsAnnouncementFormOpen(false)
//     setNewAnnouncement({ title: "", content: "" })
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

//   const formatLocationAddress = (address: any) => {
//     if (!address) return ""
//     const parts = [
//       address.street,
//       address.area,
//       address.townOrVillage,
//       address.taluka,
//       address.district,
//       address.state || "Gujarat",
//       address.pincode,
//     ].filter(Boolean)
//     return parts.join(", ")
//   }

//   const openGoogleMaps = (location: { lat?: number; lng?: number; address?: any }) => {
//     if (!location || (!location.lat && !location.lng && !location.address)) {
//       toast.error("Location data not available for mapping.")
//       return
//     }
//     let googleMapsUrl = ""
//     if (location.lat && location.lng) {
//       googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
//       toast.success("🗺️ Opening location in Google Maps via GPS...")
//     } else if (location.address) {
//       const searchQuery = formatLocationAddress(location.address)
//       if (searchQuery) {
//         googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
//         toast.success("🗺️ Opening location in Google Maps via address...")
//       } else {
//         toast.error("Insufficient address details for mapping.")
//         return
//       }
//     } else {
//       toast.error("No valid location data to open in Google Maps.")
//       return
//     }
//     window.open(googleMapsUrl, "_blank")
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <motion.div
//             className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           />
//           <p className="text-gray-600 dark:text-gray-400 text-lg">Loading hospital dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   const quickStatsGridCols = isHandleEmergency ? "grid-cols-1 md:grid-cols-5" : "grid-cols-1 md:grid-cols-4"
//   const tabsListGridCols = isHandleEmergency ? "grid-cols-5" : "grid-cols-4"

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       {/* Header with Animated Icons */}
//       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
//         <AnimatedHealthIcons />
//         <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
//           <div className="flex items-center space-x-4">
//             <motion.div
//               className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
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
//               <Building2 className="w-6 h-6 text-white" />
//             </motion.div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900 dark:text-white">Hospital Dashboard</h1>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {isHandleEmergency ? "Manage emergency care & health content" : "Manage health content"}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             {/* Emergency controls - Only show if hospital handles emergencies */}
//             {isHandleEmergency && (
//               <>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//                   <Clock className="w-4 h-4" />
//                   <span>Last checked: {lastChecked.toLocaleTimeString()}</span>
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={fetchEmergencyAlerts}
//                   className="flex items-center space-x-2 bg-transparent"
//                 >
//                   <RefreshCw className="w-4 h-4" />
//                   <span>Refresh</span>
//                 </Button>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-sm text-gray-600 dark:text-gray-400">Available for emergencies</span>
//                   <Switch
//                     checked={isAvailable}
//                     onCheckedChange={handleToggleAvailability}
//                     disabled={!isHandleEmergency}
//                   />
//                 </div>
//               </>
//             )}
//             <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//               <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
//               {notifications > 0 && isHandleEmergency && (
//                 <motion.span
//                   className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   {notifications}
//                 </motion.span>
//               )}
//             </motion.div>
//             <ThemeToggle />
//             <UserDropdown />
//           </div>
//         </div>
//       </header>

//       {/* Emergency Alerts Banner - Only show if hospital handles emergencies and there are pending alerts */}
//       {notifications > 0 && isHandleEmergency && (
//         <motion.div
//           className="bg-red-500 text-white py-2 px-6 flex items-center justify-between sticky top-[70px] z-30 shadow-md" // Adjusted top for header height
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="flex items-center space-x-3">
//             <AlertTriangle className="w-5 h-5" />
//             <span className="font-semibold">
//               {notifications} New Emergency Alert{notifications > 1 ? "s" : ""}!
//             </span>
//           </div>
//           <Button
//             onClick={() => setActiveTab("emergencies")} // Set active tab to emergencies
//             className="bg-white text-red-600 hover:bg-gray-100 px-4 py-1 rounded-md text-sm font-medium"
//           >
//             View Alerts
//           </Button>
//         </motion.div>
//       )}

//       <div className="container mx-auto px-6 py-8">
//         {/* Welcome Section */}
//         <motion.div
//           className="mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome, {user?.name}! 🏥</h2>
//           <p className="text-gray-600 dark:text-gray-400">
//             {isHandleEmergency
//               ? "Manage emergency responses and share important health information with the community."
//               : "Share important health information and connect with the medical community."}
//           </p>
//           {/* Debug info - remove in production */}
//           <div className="mt-2 text-xs text-gray-500">
//             Emergency Handling: {isHandleEmergency ? "Enabled" : "Disabled"} | Available: {isAvailable ? "Yes" : "No"}
//           </div>
//           {/* Display fixed location */}
//           {fixedLocation ? (
//             <p className="text-sm text-gray-500 mt-2">
//               📍 Fixed Location (from address): {fixedLocation.lat.toFixed(4)}, {fixedLocation.lng.toFixed(4)}
//             </p>
//           ) : (
//             <p className="text-sm text-gray-500 mt-2">📍 Fixed Location: Not yet available</p>
//           )}
//           {/* Link to All Hospitals Page */}
//           <Link href="/all-hospitals" passHref>
//             <Button variant="outline" className="mt-4 bg-transparent">
//               <Building2 className="w-4 h-4 mr-2" /> View All Hospitals
//             </Button>
//           </Link>
//         </motion.div>

//         {/* Quick Stats */}
//         <motion.div
//           className={`grid ${quickStatsGridCols} gap-6 mb-8`}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           {/* Emergency Alerts Card - Only show if hospital handles emergencies */}
//           {isHandleEmergency && (
//             <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//               <Card className="hover:shadow-lg transition-all duration-300">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">Emergency Alerts</p>
//                       <p className="text-2xl font-bold text-red-600">{emergencyAlerts.length}</p>
//                       <p className="text-xs text-gray-500">{notifications} pending</p>
//                     </div>
//                     <motion.div
//                       className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center"
//                       animate={{
//                         scale: notifications > 0 ? [1, 1.2, 1] : 1,
//                       }}
//                       transition={{ duration: 2, repeat: notifications > 0 ? Number.POSITIVE_INFINITY : 0 }}
//                     >
//                       <AlertTriangle className="w-6 h-6 text-red-600" />
//                     </motion.div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">My Posts</p>
//                     <p className="text-2xl font-bold text-purple-600">{ownPosts.length}</p>
//                     <p className="text-xs text-gray-500">Published content</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
//                     animate={{ rotate: [0, 360] }}
//                     transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                   >
//                     <MessageSquare className="w-6 h-6 text-purple-600" />
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
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Associated Doctors</p>
//                     <p className="text-2xl font-bold text-green-600">{doctors.length}</p>
//                     <p className="text-xs text-gray-500">Network partners</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       y: [0, -5, 0],
//                     }}
//                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <UserCheck className="w-6 h-6 text-green-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//           {/* My Announcements Card */}
//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">My Announcements</p>
//                     <p className="text-2xl font-bold text-blue-600">{ownAnnouncements.length}</p>
//                     <p className="text-xs text-gray-500 mt-1">Shared updates</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       y: [0, -5, 0],
//                     }}
//                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <Megaphone className="w-6 h-6 text-blue-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//           {/* Status Card - Only show if hospital handles emergencies */}
//           {isHandleEmergency && (
//             <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//               <Card className="hover:shadow-lg transition-all duration-300">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
//                       <p className={`text-2xl font-bold ${isAvailable ? "text-green-600" : "text-red-600"}`}>
//                         {isAvailable ? "Available" : "Unavailable"}
//                       </p>
//                       <p className="text-xs text-gray-500">Emergency services</p>
//                     </div>
//                     <motion.div
//                       className={`w-12 h-12 ${
//                         isAvailable ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
//                       } rounded-full flex items-center justify-center`}
//                       animate={{
//                         rotate: [0, 10, -10, 0],
//                       }}
//                       transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//                     >
//                       <Activity className={`w-6 h-6 ${isAvailable ? "text-green-600" : "text-red-600"}`} />
//                     </motion.div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//         </motion.div>

//         {/* Main Content Tabs */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//         >
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//             <TabsList className={`grid w-full ${tabsListGridCols}`}>
//               {isHandleEmergency && <TabsTrigger value="emergencies">Emergency Alerts</TabsTrigger>}
//               <TabsTrigger value="create">Create Post</TabsTrigger>
//               <TabsTrigger value="own-posts">Own Posts</TabsTrigger>
//               <TabsTrigger value="all-posts">All Posts</TabsTrigger>
//               <TabsTrigger value="announcements">Announcements</TabsTrigger>
//             </TabsList>

//             {/* Emergency Alerts Tab - Only show if hospital handles emergencies */}
//             {isHandleEmergency && (
//               <TabsContent value="emergencies" className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <Shield className="w-5 h-5" />
//                         <span>Emergency Alerts</span>
//                         <Badge variant="destructive">{notifications} pending</Badge>
//                       </div>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setAutoRefresh(!autoRefresh)}
//                         className={autoRefresh ? "bg-green-50 border-green-200" : ""}
//                       >
//                         Auto-refresh {autoRefresh ? "ON" : "OFF"}
//                       </Button>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     {emergencyAlerts.length > 0 ? (
//                       <div className="space-y-4">
//                         {emergencyAlerts.map((alert, index) => (
//                           <motion.div
//                             key={alert._id}
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: index * 0.1 }}
//                             className={`border rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer ${
//                               alert.hospitalAlertStatus === "pending"
//                                 ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
//                                 : alert.hospitalAlertStatus === "read"
//                                   ? "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20"
//                                   : alert.status === "accepted"
//                                     ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
//                                     : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800"
//                             }`}
//                             onClick={() => handleAlertClick(alert)}
//                           >
//                             <div className="flex items-start justify-between">
//                               <div className="flex-1">
//                                 <div className="flex items-center space-x-3 mb-3">
//                                   <motion.div
//                                     className={`w-3 h-3 rounded-full ${
//                                       alert.hospitalAlertStatus === "pending"
//                                         ? "bg-red-500"
//                                         : alert.hospitalAlertStatus === "read"
//                                           ? "bg-yellow-500"
//                                           : alert.status === "accepted"
//                                             ? "bg-green-500"
//                                             : "bg-gray-500"
//                                     }`}
//                                     animate={{ scale: alert.hospitalAlertStatus === "pending" ? [1, 1.2, 1] : 1 }}
//                                     transition={{
//                                       duration: 1,
//                                       repeat: alert.hospitalAlertStatus === "pending" ? Number.POSITIVE_INFINITY : 0,
//                                     }}
//                                   />
//                                   <h3
//                                     className={`font-semibold text-lg ${
//                                       alert.hospitalAlertStatus === "pending"
//                                         ? "text-red-800 dark:text-red-200"
//                                         : alert.hospitalAlertStatus === "read"
//                                           ? "text-yellow-800 dark:text-yellow-200"
//                                           : alert.status === "accepted"
//                                             ? "text-green-800 dark:text-green-200"
//                                             : "text-gray-800 dark:text-gray-200"
//                                     }`}
//                                   >
//                                     🚨 EMERGENCY ALERT
//                                   </h3>
//                                   <Badge className={getPriorityColor(alert.priority)}>
//                                     {alert.priority.toUpperCase()}
//                                   </Badge>
//                                   {alert.status === "accepted" && (
//                                     <Badge variant="default" className="bg-green-600">
//                                       ACCEPTED
//                                     </Badge>
//                                   )}
//                                   {alert.hospitalAlertStatus === "read" && alert.status === "pending" && (
//                                     <Badge variant="outline" className="bg-yellow-600 text-white">
//                                       VIEWED
//                                     </Badge>
//                                   )}
//                                 </div>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                   <div>
//                                     <h4 className="font-medium text-gray-900 dark:text-white mb-2">
//                                       Patient Information
//                                     </h4>
//                                     <div className="space-y-1 text-sm">
//                                       <div className="flex items-center space-x-2">
//                                         <User className="w-4 h-4 text-gray-500" />
//                                         <span>{alert.userInfo.name}</span>
//                                       </div>
//                                       <div className="flex items-center space-x-2">
//                                         <Phone className="w-4 h-4 text-gray-500" />
//                                         <span>{alert.userInfo.phone}</span>
//                                       </div>
//                                       <div className="flex items-center space-x-2">
//                                         <Mail className="w-4 h-4 text-gray-500" />
//                                         <span>{alert.userInfo.email}</span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <h4 className="font-medium text-gray-900 dark:text-white mb-2">
//                                       Location & Distance
//                                     </h4>
//                                     <div className="space-y-1 text-sm">
//                                       {alert.distance && (
//                                         <div className="flex items-center space-x-2">
//                                           <Navigation className="w-4 h-4 text-green-500" />
//                                           <span className="font-semibold text-green-600">{alert.distance}km away</span>
//                                           {alert.proximityMethod && (
//                                             <span className="text-xs text-gray-500">({alert.proximityMethod})</span>
//                                           )}
//                                         </div>
//                                       )}
//                                       {/* Google Maps Integration */}
//                                       <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
//                                         <div className="flex items-start space-x-2">
//                                           <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
//                                           <div className="flex-1">
//                                             <p className="font-medium text-blue-800 dark:text-blue-200 text-sm">
//                                               Patient Location:
//                                             </p>
//                                             <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
//                                               📍{" "}
//                                               {alert.location?.lat && alert.location?.lng
//                                                 ? `GPS: ${alert.location.lat.toFixed(4)}, ${alert.location.lng.toFixed(4)}`
//                                                 : formatLocationAddress(alert.location?.address) ||
//                                                   "Location details not available"}
//                                             </p>
//                                             {/* Google Maps Rectangle Button */}
//                                             <motion.button
//                                               whileHover={{ scale: 1.02 }}
//                                               whileTap={{ scale: 0.98 }}
//                                               onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 openGoogleMaps(alert.location)
//                                               }}
//                                               className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2 transition-colors"
//                                             >
//                                               <Map className="w-4 h-4" />
//                                               <span>Open in Google Maps</span>
//                                               <ExternalLink className="w-3 h-3" />
//                                             </motion.button>
//                                             {alert.location?.lat && alert.location?.lng && (
//                                               <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
//                                                 GPS: {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
//                                               </p>
//                                             )}
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                   <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//                                     <Timer className="w-4 h-4" />
//                                     <span>{formatTimeAgo(alert.createdAt)}</span>
//                                   </div>
//                                   <div className="flex space-x-2">
//                                     {alert.hospitalAlertStatus === "pending" && (
//                                       <Button
//                                         size="sm"
//                                         variant="destructive"
//                                         onClick={(e) => {
//                                           e.stopPropagation()
//                                           handleAlertClick(alert)
//                                         }}
//                                         className="animate-pulse"
//                                       >
//                                         🚨 RESPOND NOW
//                                       </Button>
//                                     )}
//                                     {/* Removed delete button for hospital alerts */}
//                                     {/* <Button
//                                       size="sm"
//                                       variant="outline"
//                                       onClick={(e) => {
//                                         e.stopPropagation()
//                                         handleDeleteAlert(alert._id)
//                                       }}
//                                       className="text-red-600 hover:text-red-800 hover:bg-red-50"
//                                     >
//                                       <Trash2 className="w-4 h-4" />
//                                       Delete
//                                     </Button> */}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
//                           No Emergency Alerts
//                         </h3>
//                         <p className="text-gray-500">No emergency alerts in your area at the moment</p>
//                         <p className="text-sm text-gray-400 mt-2">System checks every 30 seconds for new alerts</p>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             )}

//             {/* Create Post Tab */}
//             <TabsContent value="create" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Plus className="w-5 h-5" />
//                     <span>Create New Hospital Post</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Post Title *</label>
//                     <Input
//                       value={newPost.title}
//                       onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//                       placeholder="e.g., New Emergency Department Now Open 24/7"
//                       className="w-full"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Content *</label>
//                     <Textarea
//                       value={newPost.content}
//                       onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//                       placeholder="Share hospital updates, health tips, or important announcements..."
//                       className="w-full min-h-[200px]"
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Category *</label>
//                       <Select
//                         value={newPost.category}
//                         onValueChange={(value) => setNewPost({ ...newPost, category: value })}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {categories.map((category) => (
//                             <SelectItem key={category} value={category}>
//                               {category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
//                     <Input
//                       value={newPost.tags}
//                       onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
//                       placeholder="e.g., emergency-care, cardiology, 24-7-service, health-tips"
//                       className="w-full"
//                     />
//                   </div>
//                   <Button
//                     onClick={handleCreatePost}
//                     className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
//                   >
//                     <Send className="w-4 h-4 mr-2" />
//                     Create Post
//                   </Button>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Own Posts Tab */}
//             <TabsContent value="own-posts" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Building2 className="w-5 h-5 text-purple-600" />
//                     <span>My Posts</span>
//                     <Badge variant="secondary">{ownPosts.length} posts</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {ownPosts.length > 0 ? (
//                     <div className="space-y-4">
//                       {ownPosts.map((post, index) => (
//                         <motion.div
//                           key={post._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex-1">
//                               <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
//                               <div className="flex items-center space-x-2 mb-2">
//                                 <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
//                                 <Badge variant={post.isApproved ? "default" : "destructive"}>
//                                   {post.isApproved ? "Approved" : "Pending"}
//                                 </Badge>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <Dialog>
//                                 <DialogTrigger asChild>
//                                   <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
//                                     <Edit className="w-4 h-4" />
//                                   </Button>
//                                 </DialogTrigger>
//                                 <DialogContent className="max-w-2xl">
//                                   <DialogHeader>
//                                     <DialogTitle>Edit Post</DialogTitle>
//                                   </DialogHeader>
//                                   <div className="space-y-4">
//                                     <Input
//                                       defaultValue={post.title}
//                                       placeholder="Post title"
//                                       onChange={(e) =>
//                                         setEditingPost((prev) => (prev ? { ...prev, title: e.target.value } : null))
//                                       }
//                                     />
//                                     <Textarea
//                                       defaultValue={post.content}
//                                       placeholder="Post content"
//                                       className="min-h-[200px]"
//                                       onChange={(e) =>
//                                         setEditingPost((prev) => (prev ? { ...prev, content: e.target.value } : null))
//                                       }
//                                     />
//                                     <div className="flex space-x-2">
//                                       <Button
//                                         onClick={() =>
//                                           editingPost &&
//                                           handleEditPost(editingPost._id, {
//                                             title: editingPost.title,
//                                             content: editingPost.content,
//                                           })
//                                         }
//                                         className="bg-purple-600 hover:bg-purple-700"
//                                       >
//                                         Save Changes
//                                       </Button>
//                                       <Button variant="outline" onClick={() => setEditingPost(null)}>
//                                         Cancel
//                                       </Button>
//                                     </div>
//                                   </div>
//                                 </DialogContent>
//                               </Dialog>
//                               <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post._id)}>
//                                 <Trash2 className="w-4 h-4" />
//                               </Button>
//                             </div>
//                           </div>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{post.content}</p>
//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {post.tags.map((tag, tagIndex) => (
//                               <Badge key={tagIndex} variant="secondary" className="text-xs">
//                                 <Tag className="w-3 h-3 mr-1" />
//                                 {tag}
//                               </Badge>
//                             ))}
//                           </div>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2 text-gray-600">
//                               <Eye className="w-4 h-4" />
//                               <span className="text-sm">View details</span>
//                             </div>
//                             <div className="flex items-center space-x-2 text-xs text-gray-500">
//                               <Calendar className="w-4 h-4" />
//                               <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No posts yet</h3>
//                       <p className="text-gray-500 mb-4">Start sharing hospital updates and health information</p>
//                       <Button onClick={() => setActiveTab("create")}>Create Your First Post</Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* All Posts Tab (formerly Doctor Posts Tab) */}
//             <TabsContent value="all-posts" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Stethoscope className="w-5 h-5 text-green-600" />
//                     <span>All Posts</span>
//                     <Badge variant="secondary">{allOtherPosts.length} posts</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {allOtherPosts.length > 0 ? (
//                     <div className="space-y-4">
//                       {allOtherPosts.map((post, index) => (
//                         <motion.div
//                           key={post._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex items-center space-x-3">
//                               <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
//                                 {post.authorType === "Doctor" ? (
//                                   <Stethoscope className="w-5 h-5 text-green-600" />
//                                 ) : (
//                                   <Building2 className="w-5 h-5 text-purple-600" />
//                                 )}
//                               </div>
//                               <div>
//                                 <p className="font-semibold">
//                                   {post.authorType === "Doctor" ? "Dr." : ""} {post.postby}
//                                 </p>
//                                 <p className="text-sm text-gray-500 capitalize">{post.authorType}</p>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
//                               <span className="text-xs text-gray-500">
//                                 {new Date(post.createdAt).toLocaleDateString()}
//                               </span>
//                             </div>
//                           </div>
//                           <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {post.tags.map((tag, tagIndex) => (
//                               <Badge key={tagIndex} variant="secondary" className="text-xs">
//                                 #{tag}
//                               </Badge>
//                             ))}
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No posts yet</h3>
//                       <p className="text-gray-500">Posts from other hospitals and doctors will appear here</p>
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
//                     <span>My Announcements</span>
//                     <Badge variant="secondary">{ownAnnouncements.length} announcements</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4 border-b pb-4 mb-4">
//                     <h3 className="text-lg font-semibold">Create New Announcement</h3>
//                     <Dialog open={isAnnouncementFormOpen} onOpenChange={setIsAnnouncementFormOpen}>
//                       <DialogTrigger asChild>
//                         <Button onClick={() => openAnnouncementForm(null)} className="w-full">
//                           <Plus className="w-4 h-4 mr-2" />
//                           Create New Announcement
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent className="sm:max-w-[425px]">
//                         <DialogHeader>
//                           <DialogTitle>{"Create New Announcement"}</DialogTitle>
//                         </DialogHeader>
//                         <div className="space-y-4">
//                           <div>
//                             <label className="block text-sm font-medium mb-2">Title *</label>
//                             <Input
//                               value={newAnnouncement.title}
//                               onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
//                               placeholder="e.g., Holiday Notice: Clinic Closed on Dec 25th"
//                               className="w-full"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium mb-2">Content *</label>
//                             <Textarea
//                               value={newAnnouncement.content}
//                               onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
//                               placeholder="Share important updates with your network..."
//                               className="w-full min-h-[120px]"
//                             />
//                           </div>
//                           <div className="flex space-x-2">
//                             <Button
//                               onClick={handleCreateAnnouncement}
//                               disabled={isSavingAnnouncement}
//                               className="bg-blue-600 hover:bg-blue-700"
//                             >
//                               {isSavingAnnouncement ? "Saving..." : "Save Announcement"}
//                             </Button>
//                             <Button variant="outline" onClick={closeAnnouncementForm}>
//                               Cancel
//                             </Button>
//                           </div>
//                         </div>
//                       </DialogContent>
//                     </Dialog>
//                   </div>
//                   <h3 className="text-lg font-semibold mb-4">My Published Announcements</h3>
//                   {ownAnnouncements.length > 0 ? (
//                     <div className="space-y-4">
//                       {ownAnnouncements.map((announcement, index) => (
//                         <motion.div
//                           key={announcement._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex-1">
//                               <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
//                               <div className="flex items-center space-x-2 mb-2">
//                                 <Badge variant="outline">{announcement.ownerType}</Badge>
//                                 <span className="text-sm text-gray-500">Announced by: {announcement.announcedBy}</span>
//                               </div>
//                             </div>
//                             <Button
//                               variant="destructive"
//                               size="sm"
//                               onClick={() => handleDeleteAnnouncement(announcement._id)}
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </Button>
//                           </div>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{announcement.content}</p>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2 text-xs text-gray-500">
//                               <Calendar className="w-4 h-4" />
//                               <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
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
//                       <p className="text-gray-500 mb-4">Share important updates with your network</p>
//                       <Button onClick={() => openAnnouncementForm(null)}>Create Your First Announcement</Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </motion.div>
//       </div>

//       {/* Emergency Alert Response Dialog */}
//       <Dialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle className="flex items-center space-x-2">
//               <AlertTriangle className="w-5 h-5 text-red-500" />
//               <span>Emergency Alert Response</span>
//             </DialogTitle>
//           </DialogHeader>
//           {selectedAlert && (
//             <div className="space-y-6">
//               <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
//                 <AlertTriangle className="h-4 w-4" />
//                 <AlertDescription className="font-semibold">
//                   🚨 EMERGENCY: Immediate medical attention required
//                 </AlertDescription>
//               </Alert>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="font-semibold mb-3">Patient Information</h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex items-center space-x-2">
//                       <User className="w-4 h-4 text-gray-500" />
//                       <span className="font-medium">{selectedAlert.userInfo.name}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Phone className="w-4 h-4 text-gray-500" />
//                       <span>{selectedAlert.userInfo.phone}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Mail className="w-4 h-4 text-gray-500" />
//                       <span>{selectedAlert.userInfo.email}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold mb-3">Emergency Details</h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex items-center space-x-2">
//                       <Badge className={getPriorityColor(selectedAlert.priority)}>
//                         {selectedAlert.priority.toUpperCase()} PRIORITY
//                       </Badge>
//                     </div>
//                     {selectedAlert.distance && (
//                       <div className="flex items-center space-x-2">
//                         <Navigation className="w-4 h-4 text-green-500" />
//                         <span className="font-semibold text-green-600">{selectedAlert.distance}km away</span>
//                       </div>
//                     )}
//                     <div className="flex items-center space-x-2">
//                       <Timer className="w-4 h-4 text-gray-500" />
//                       <span>{formatTimeAgo(selectedAlert.createdAt)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-semibold mb-3">Location</h3>
//                 <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
//                   <div className="flex items-start space-x-2">
//                     <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
//                     <div className="flex-1">
//                       <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">
//                         📍 {formatLocationAddress(selectedAlert.location?.address)}
//                       </p>
//                       <Button
//                         onClick={() => openGoogleMaps(selectedAlert.location?.address)}
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3"
//                       >
//                         <Map className="w-4 h-4 mr-2" />
//                         Open in Google Maps
//                         <ExternalLink className="w-3 h-3 ml-2" />
//                       </Button>
//                       {selectedAlert.location?.lat && selectedAlert.location?.lng && (
//                         <p className="text-xs text-blue-600 dark:text-blue-400">
//                           GPS Coordinates: {selectedAlert.location.lat.toFixed(6)},{" "}
//                           {selectedAlert.location.lng.toFixed(6)}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {selectedAlert.message && (
//                 <div>
//                   <h3 className="font-semibold mb-3">Emergency Message</h3>
//                   <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                     <p className="text-gray-700 dark:text-gray-300">{selectedAlert.message}</p>
//                   </div>
//                 </div>
//               )}
//               {selectedAlert.status === "pending" && (
//                 <div className="flex space-x-4 pt-4 border-t">
//                   <Button
//                     onClick={() => handleResponse("accept")}
//                     disabled={responding}
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
//                   >
//                     {responding ? (
//                       <>
//                         <motion.div
//                           className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                         />
//                         Accepting...
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle className="w-5 h-5 mr-2" />🚑 ACCEPT & DISPATCH AMBULANCE
//                       </>
//                     )}
//                   </Button>
//                   <Button
//                     onClick={() => handleResponse("deny")}
//                     disabled={responding}
//                     variant="destructive"
//                     className="flex-1 font-semibold py-3"
//                   >
//                     {responding ? (
//                       "Processing..."
//                     ) : (
//                       <>
//                         <XCircle className="w-5 h-5 mr-2" />
//                         DECLINE
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               )}
//               {selectedAlert.status === "accepted" && (
//                 <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
//                   <div className="flex items-center space-x-2">
//                     <CheckCircle className="w-5 h-5 text-green-600" />
//                     <span className="font-semibold text-green-800 dark:text-green-200">
//                       Emergency Accepted - Ambulance Dispatched
//                     </span>
//                   </div>
//                   {selectedAlert.acceptedBy && (
//                     <p className="text-sm text-green-700 dark:text-green-300 mt-2">
//                       Handled by: {selectedAlert.acceptedBy.name}
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }





// //C:\Users\UDAYN\Downloads\healthcare-platform - Copy\app\hospital\dashboard\page.tsx
// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import Link from "next/link" // Import Link
// import {
//   AlertTriangle,
//   Building2,
//   Plus,
//   MessageSquare,
//   Bell,
//   Send,
//   UserCheck,
//   Tag,
//   Calendar,
//   Eye,
//   Edit,
//   Trash2,
//   Clock,
//   Shield,
//   Activity,
//   Stethoscope,
//   User,
//   Phone,
//   Mail,
//   Navigation,
//   Timer,
//   RefreshCw,
//   CheckCircle,
//   XCircle,
//   Map,
//   MapPin,
//   ExternalLink,
//   Megaphone,
//   Share2,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import ThemeToggle from "@/components/ThemeToggle"
// import UserDropdown from "@/components/UserDropdown"
// import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
// import { toast } from "react-hot-toast"
// import Swal from "sweetalert2"
// import { useAuth } from "@/app/contexts/AuthProvider"

// interface Post {
//   _id: string
//   title: string
//   content: string
//   category: string
//   tags: string[]
//   authorType: "Doctor" | "Hospital"
//   postby: string
//   email: string
//   createdAt: string
//   isApproved: boolean
// }

// interface Doctor {
//   _id: string
//   name: string
//   email: string
//   specialty: string
//   isVerified: boolean
// }

// interface EmergencyAlert {
//   _id: string
//   userInfo: {
//     name: string
//     email: string
//     phone: string
//   }
//   userId?: {
//     name: string
//     email: string
//     phone: string
//     address: any
//   }
//   location: {
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
//   message: string
//   priority: string
//   status: string // "pending" | "accepted" | "declined" | "cancelled" | "no_response_all_contacted"
//   createdAt: string
//   distance?: number
//   proximityMethod?: string
//   acceptedBy?: {
//     _id: string
//     name: string
//   }
//   hospitalAlertStatus?: "pending" | "read" | "accepted" | "declined" | "timedOut"
// }

// interface HospitalData {
//   _id: string
//   name: string
//   email: string
//   phone: string
//   isAvailable: boolean
//   isHandleEmergency: boolean
//   isVerified: boolean
//   address: any
//   location: {
//     lat?: number
//     lng?: number
//   }
// }

// interface Announcement {
//   _id: string
//   ownerEmail: string
//   ownerType: "doctor" | "hospital" | "user"
//   title: string
//   content: string
//   announcedBy: string
//   readBy: string[]
//   createdAt: string
//   updatedAt: string
// }

// export default function HospitalDashboard() {
//   const { user } = useAuth()
//   const [ownPosts, setOwnPosts] = useState<Post[]>([])
//   const [allOtherPosts, setAllOtherPosts] = useState<Post[]>([])
//   const [doctors, setDoctors] = useState<Doctor[]>([])
//   const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
//   const [ownAnnouncements, setOwnAnnouncements] = useState<Announcement[]>([])
//   const [loading, setLoading] = useState(true)
//   const [notifications, setNotifications] = useState(0)
//   const [hospital, setHospital] = useState<HospitalData | null>(null)
//   const [isHandleEmergency, setIsHandleEmergency] = useState<boolean>(false)
//   const [isAvailable, setIsAvailable] = useState<boolean>(false)
//   const [editingPost, setEditingPost] = useState<Post | null>(null)
//   const [selectedAlert, setSelectedAlert] = useState<EmergencyAlert | null>(null)
//   const [showAlertDialog, setShowAlertDialog] = useState(false)
//   const [responding, setResponding] = useState(false)
//   const [lastChecked, setLastChecked] = useState<Date>(new Date())
//   const [autoRefresh, setAutoRefresh] = useState(true)
//   const [activeTab, setActiveTab] = useState<string | undefined>(undefined) // State to control active tab

//   // State for the fixed hospital location (from DB, geocoded from address)
//   const [fixedLocation, setFixedLocation] = useState<{ lat: number; lng: number } | null>(null)

//   // Post creation state
//   const [newPost, setNewPost] = useState({
//     title: "",
//     content: "",
//     category: "",
//     tags: "",
//   })

//   // Announcement creation state
//   const [newAnnouncement, setNewAnnouncement] = useState({
//     title: "",
//     content: "",
//   })
//   const [isAnnouncementFormOpen, setIsAnnouncementFormOpen] = useState(false)
//   const [isSavingAnnouncement, setIsSavingAnnouncement] = useState(false)

//   const categories = [
//     "emergency-care",
//     "hospital-services",
//     "health-tips",
//     "prevention",
//     "treatment",
//     "facilities",
//     "announcements",
//     "cardiology",
//     "neurology",
//     "pediatrics",
//   ]

//   // Initial data fetching and emergency alert polling
//   useEffect(() => {
//     const initDashboard = async () => {
//       setLoading(true)
//       // Fetch hospital data first to determine emergency handling capability
//       const hospitalData = await fetchHospitalData()
//       if (hospitalData?.isHandleEmergency) {
//         setActiveTab("emergencies") // Set default tab to emergencies if handling them
//       } else {
//         setActiveTab("create") // Otherwise, default to create post
//       }

//       // Staggered fetching of other dashboard data
//       setTimeout(async () => {
//         await fetchOwnPostsAndAnnouncements()
//       }, 1000) // 1 second delay

//       setTimeout(async () => {
//         await fetchAllOtherPosts()
//       }, 2000) // 2 second delay

//       if (hospitalData?.isHandleEmergency) {
//         setTimeout(async () => {
//           await fetchEmergencyAlerts() // Fetch alerts only if handling emergencies
//         }, 3000) // 3 second delay
//       }
//       setLoading(false) // Set loading to false after all initial fetches are initiated
//     }

//     initDashboard()

//     // Polling for alerts (existing logic)
//     const interval = setInterval(() => {
//       if (autoRefresh && isHandleEmergency) {
//         fetchEmergencyAlerts()
//       }
//     }, 30000)
//     return () => clearInterval(interval)
//   }, [autoRefresh, isHandleEmergency])

//   // Effect to trigger fixed location geocoding after a delay if not already set
//   useEffect(() => {
//     if (hospital && !hospital.location?.lat && !hospital.location?.lng) {
//       console.log("Hospital fixed location not set. Initiating geocoding in 4 minutes...")
//       // Using 5 seconds for demonstration. For production, use 4 * 60 * 1000 (4 minutes).
//       const geocodeTimer = setTimeout(() => {
//         console.log("4 minutes passed. Attempting to geocode hospital address.")
//         triggerFixedLocationGeocoding(hospital._id)
//       }, 5 * 1000)
//       return () => clearTimeout(geocodeTimer)
//     }
//   }, [hospital]) // Re-run when hospital data changes

//   const triggerFixedLocationGeocoding = async (hospitalId: string) => {
//     try {
//       const response = await fetch("/api/hospital/update-fixed-location", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ hospitalId }),
//       })
//       const data = await response.json()
//       if (response.ok && data.success) {
//         // No toast message here, just update the UI
//         fetchHospitalData() // Re-fetch hospital data to update the UI with the new fixed location
//       } else {
//         console.error("Failed to update fixed location:", data.message)
//         // Optionally, log this error but don't show a toast to the user for this background process
//       }
//     } catch (error) {
//       console.error("Error triggering fixed location geocoding:", error)
//       // Optionally, log this error
//     }
//   }

//   const fetchHospitalData = async () => {
//     try {
//       const response = await fetch("/api/hospital/me")
//       if (response.ok) {
//         const result = await response.json()
//         if (result.success) {
//           setHospital(result.data)
//           setIsHandleEmergency(result.data.isHandleEmergency)
//           setIsAvailable(result.data.isAvailable)
//           // Set fixed location from fetched hospital data if available
//           if (result.data.location?.lat && result.data.location?.lng) {
//             setFixedLocation(result.data.location)
//           }
//           console.log("Hospital data:", result.data)
//           console.log("isHandleEmergency:", result.data.isHandleEmergency)
//           return result.data // Return hospital data for initial tab setting
//         }
//       } else {
//         console.error("Failed to fetch hospital data")
//         toast.error("Failed to load hospital settings")
//       }
//     } catch (error) {
//       console.error("Error fetching hospital data:", error)
//       toast.error("Error loading hospital data")
//     }
//     return null
//   }

//   const fetchOwnPostsAndAnnouncements = async () => {
//     try {
//       const [ownPostsRes, ownAnnouncementsRes] = await Promise.all([
//         fetch("/api/hospital/own-posts"),
//         fetch("/api/announcements/own"), // Fetch own announcements
//       ])

//       if (ownPostsRes.ok) {
//         const ownPostsData = await ownPostsRes.json()
//         setOwnPosts(ownPostsData.data || [])
//       }
//       if (ownAnnouncementsRes.ok) {
//         const ownAnnouncementsData = await ownAnnouncementsRes.json()
//         setOwnAnnouncements(ownAnnouncementsData.data || [])
//       }
//     } catch (error) {
//       console.error("Error fetching own posts or announcements:", error)
//     }
//   }

//   const fetchAllOtherPosts = async () => {
//     try {
//       const allOtherPostsRes = await fetch("/api/posts") // Fetch all posts for "All Posts" tab
//       if (allOtherPostsRes.ok) {
//         const allOtherPostsData = await allOtherPostsRes.json()
//         // Filter out own posts from allOtherPosts based on user's email
//         setAllOtherPosts(allOtherPostsData.data.filter((post: Post) => post.email !== user?.email) || [])
//       }
//     } catch (error) {
//       console.error("Error fetching all other posts:", error)
//     }
//   }

//   const fetchEmergencyAlerts = async () => {
//     if (!isHandleEmergency) return
//     try {
//       console.log("🔄 Fetching emergency alerts...")
//       const response = await fetch("/api/hospital/emergency-alerts")
//       const data = await response.json()
//       if (response.ok) {
//         // Only show pending, read, or accepted alerts
//         const relevantAlerts =
//           data.alerts?.filter(
//             (alert: EmergencyAlert) =>
//               alert.hospitalAlertStatus === "pending" ||
//               alert.hospitalAlertStatus === "read" ||
//               alert.status === "accepted",
//           ) || []
//         setEmergencyAlerts(relevantAlerts)
//         setNotifications(
//           relevantAlerts.filter((alert: EmergencyAlert) => alert.hospitalAlertStatus === "pending").length || 0,
//         )
//         setLastChecked(new Date())
//         console.log(`✅ Found ${relevantAlerts.length || 0} nearby emergency alerts`)
//         if (relevantAlerts.length > 0) {
//           const criticalPendingAlerts = relevantAlerts.filter(
//             (alert: EmergencyAlert) => alert.priority === "critical" && alert.hospitalAlertStatus === "pending",
//           )
//           if (criticalPendingAlerts.length > 0) {
//             toast.error(`🚨 ${criticalPendingAlerts.length} CRITICAL emergency alert(s) nearby!`, {
//               duration: 8000,
//             })
//           }
//         }
//       } else {
//         console.error("❌ Failed to fetch emergency alerts:", data.message)
//       }
//     } catch (error) {
//       console.error("💥 Error fetching emergency alerts:", error)
//     }
//   }

//   const handleCreatePost = async () => {
//     if (!newPost.title || !newPost.content || !newPost.category) {
//       toast.error("Please fill in all required fields")
//       return
//     }
//     try {
//       console.log("\n in /api/hospital/create-post Creating new post:", newPost)
//       const response = await fetch("/api/hospital/create-post", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: newPost.title,
//           content: newPost.content,
//           category: newPost.category,
//           tags: newPost.tags
//             .split(",")
//             .map((tag) => tag.trim())
//             .filter((tag) => tag),
//         }),
//       })
//       if (response.ok) {
//         toast.success("✅ Post created successfully! Awaiting admin approval.")
//         setNewPost({
//           title: "",
//           content: "",
//           category: "",
//           tags: "",
//         })
//         fetchOwnPostsAndAnnouncements() // Refresh own posts
//       } else {
//         toast.error("Failed to create post")
//       }
//     } catch (error) {
//       toast.error("Error creating post")
//     }
//   }

//   const handleEditPost = async (postId: string, updatedData: Partial<Post>) => {
//     try {
//       const response = await fetch("/api/hospital/edit-post", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId, ...updatedData }),
//       })
//       if (response.ok) {
//         toast.success("✅ Post updated successfully!")
//         setEditingPost(null)
//         fetchOwnPostsAndAnnouncements() // Refresh own posts
//       } else {
//         toast.error("Failed to update post")
//       }
//     } catch (error) {
//       toast.error("Error updating post")
//     }
//   }

//   const handleDeletePost = async (postId: string) => {
//     const confirmation = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action will permanently delete the post.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     })
//     if (!confirmation.isConfirmed) return
//     try {
//       const response = await fetch("/api/hospital/delete-post", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId }),
//       })
//       if (response.ok) {
//         Swal.fire("Deleted!", "Your post has been deleted.", "success")
//         fetchOwnPostsAndAnnouncements() // Refresh own posts
//       } else {
//         Swal.fire("Failed", "Unable to delete post.", "error")
//       }
//     } catch (error) {
//       Swal.fire("Error", "An error occurred while deleting the post.", "error")
//     }
//   }

//   const handleToggleAvailability = async () => {
//     try {
//       const response = await fetch("/api/hospital/toggle-availability", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ isAvailable: !isAvailable }),
//       })
//       if (response.ok) {
//         setIsAvailable(!isAvailable)
//         toast.success(`🏥 Hospital is now ${!isAvailable ? "available" : "unavailable"} for emergencies`)
//       } else {
//         toast.error("Failed to update availability")
//       }
//     } catch (error) {
//       toast.error("Error updating availability")
//     }
//   }

//   const handleAlertClick = (alert: EmergencyAlert) => {
//     setSelectedAlert(alert)
//     setShowAlertDialog(true)
//   }

//   const handleResponse = async (action: "accept" | "deny") => {
//     if (!selectedAlert) return
//     setResponding(true)
//     try {
//       const response = await fetch("/api/hospital/emergency-alerts/respond", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           alertId: selectedAlert._id,
//           action,
//         }),
//       })
//       const data = response.headers.get("content-type")?.includes("application/json")
//         ? await response.json()
//         : { message: response.statusText || "An unexpected error occurred." }
//       if (response.ok) {
//         if (action === "accept") {
//           toast.success(`✅ Emergency accepted! Patient: ${selectedAlert.userInfo.name}`)
//           toast.success("🚑 Ambulance dispatched! Patient will be notified.")
//           // Alert remains in list, its status will be updated on next fetchEmergencyAlerts
//         } else {
//           toast.success("❌ Emergency declined")
//           // Remove declined alert from local state immediately
//           setEmergencyAlerts((prevAlerts) => prevAlerts.filter((alert) => alert._id !== selectedAlert._id))
//         }
//         setShowAlertDialog(false)
//         setSelectedAlert(null)
//         fetchEmergencyAlerts() // Refresh the list to reflect status changes
//       } else {
//         toast.error(data.message || "Failed to respond to emergency")
//       }
//     } catch (error) {
//       console.error("Error responding to emergency:", error)
//       toast.error("Failed to respond to emergency")
//     } finally {
//       setResponding(false)
//     }
//   }

//   const handleRemoveAlertFromView = async (alertId: string) => {
//     const result = await Swal.fire({
//       title: "Remove Alert?",
//       text: "This will remove the alert from your dashboard view. It will not affect the patient's alert status.",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, remove it!",
//     })
//     if (!result.isConfirmed) return

//     setEmergencyAlerts((prevAlerts) => prevAlerts.filter((alert) => alert._id !== alertId))
//     toast.success("Alert removed from view.")
//   }

//   const handleCreateAnnouncement = async () => {
//     if (!newAnnouncement.title || !newAnnouncement.content) {
//       toast.error("Please fill in all required fields for the announcement.")
//       return
//     }
//     setIsSavingAnnouncement(true)
//     try {
//       const response = await fetch("/api/announcements/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: newAnnouncement.title,
//           content: newAnnouncement.content,
//           ownerType: "hospital",
//         }),
//       })
//       if (response.ok) {
//         toast.success("✅ Announcement created successfully!")
//         setNewAnnouncement({ title: "", content: "" })
//         closeAnnouncementForm()
//         fetchOwnPostsAndAnnouncements() // Refresh own announcements
//       } else {
//         toast.error("Failed to create announcement")
//       }
//     } catch (error) {
//       toast.error("Error creating announcement")
//     } finally {
//       setIsSavingAnnouncement(false)
//     }
//   }

//   const handleDeleteAnnouncement = async (announcementId: string) => {
//     const result = await Swal.fire({
//       title: "🗑️ Delete Announcement?",
//       text: "Are you sure you want to permanently delete this announcement?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it",
//     })
//     if (!result.isConfirmed) return
//     try {
//       const response = await fetch("/api/announcements/delete", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: announcementId }),
//       })
//       if (response.ok) {
//         Swal.fire("Deleted!", "Announcement has been deleted.", "success")
//         fetchOwnPostsAndAnnouncements() // Refresh own announcements
//       } else {
//         Swal.fire("Failed", "Unable to delete announcement.", "error")
//       }
//     } catch (error) {
//       Swal.fire("Error", "Something went wrong while deleting the announcement.", "error")
//     }
//   }

//   const openAnnouncementForm = (announcement: Announcement | null) => {
//     setNewAnnouncement({
//       title: announcement?.title || "",
//       content: announcement?.content || "",
//     })
//     setIsAnnouncementFormOpen(true)
//   }

//   const closeAnnouncementForm = () => {
//     setIsAnnouncementFormOpen(false)
//     setNewAnnouncement({ title: "", content: "" })
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

//   const formatLocationAddress = (address: any) => {
//     if (!address) return ""
//     const parts = [
//       address.street,
//       address.area,
//       address.townOrVillage,
//       address.taluka,
//       address.district,
//       address.state || "Gujarat",
//       address.pincode,
//     ].filter(Boolean)
//     return parts.join(", ")
//   }

//   const openGoogleMaps = (location: { lat?: number; lng?: number; address?: any }) => {
//     if (!location || (!location.lat && !location.lng && !location.address)) {
//       toast.error("Location data not available for mapping.")
//       return
//     }
//     let googleMapsUrl = ""
//     if (location.lat && location.lng) {
//       googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
//       toast.success("🗺️ Opening location in Google Maps via GPS...")
//     } else if (location.address) {
//       const searchQuery = formatLocationAddress(location.address)
//       if (searchQuery) {
//         googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
//         toast.success("🗺️ Opening location in Google Maps via address...")
//       } else {
//         toast.error("Insufficient address details for mapping.")
//         return
//       }
//     } else {
//       toast.error("No valid location data to open in Google Maps.")
//       return
//     }
//     window.open(googleMapsUrl, "_blank")
//   }

//   const handleShareAlert = (alert: EmergencyAlert) => {
//     const patientName = alert.userInfo.name
//     const patientPhone = alert.userInfo.phone
//     const patientAddress = alert.location?.address ? formatLocationAddress(alert.location.address) : "N/A"
//     const lat = alert.location?.lat?.toFixed(6) || "N/A"
//     const lng = alert.location?.lng?.toFixed(6) || "N/A"

//     let message = `🚨 Emergency Patient Details:\n`
//     message += `Name: ${patientName}\n`
//     message += `Phone: ${patientPhone}\n`
//     message += `Address: ${patientAddress}\n`
//     if (alert.location?.lat && alert.location?.lng) {
//       message += `GPS: ${lat}, ${lng}\n`
//       message += `Google Maps: https://www.google.com/maps/search/?api=1&query=${lat},${lng}\n`
//     }
//     message += `Message: ${alert.message || "Immediate assistance needed!"}`

//     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
//     window.open(whatsappUrl, "_blank")
//     toast.success("Sharing patient details via WhatsApp!")
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <motion.div
//             className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           />
//           <p className="text-gray-600 dark:text-gray-400 text-lg">Loading hospital dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   const quickStatsGridCols = isHandleEmergency ? "grid-cols-1 md:grid-cols-5" : "grid-cols-1 md:grid-cols-4"
//   const tabsListGridCols = isHandleEmergency ? "grid-cols-5" : "grid-cols-4"

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       {/* Header with Animated Icons */}
//       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
//         <AnimatedHealthIcons />
//         <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
//           <div className="flex items-center space-x-4">
//             <motion.div
//               className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
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
//               <Building2 className="w-6 h-6 text-white" />
//             </motion.div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900 dark:text-white">Hospital Dashboard</h1>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {isHandleEmergency ? "Manage emergency care & health content" : "Manage health content"}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             {/* Emergency controls - Only show if hospital handles emergencies */}
//             {isHandleEmergency && (
//               <>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//                   <Clock className="w-4 h-4" />
//                   <span>Last checked: {lastChecked.toLocaleTimeString()}</span>
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={fetchEmergencyAlerts}
//                   className="flex items-center space-x-2 bg-transparent"
//                 >
//                   <RefreshCw className="w-4 h-4" />
//                   <span>Refresh</span>
//                 </Button>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-sm text-gray-600 dark:text-gray-400">Available for emergencies</span>
//                   <Switch
//                     checked={isAvailable}
//                     onCheckedChange={handleToggleAvailability}
//                     disabled={!isHandleEmergency}
//                   />
//                 </div>
//               </>
//             )}
//             <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//               <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
//               {notifications > 0 && isHandleEmergency && (
//                 <motion.span
//                   className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   {notifications}
//                 </motion.span>
//               )}
//             </motion.div>
//             <ThemeToggle />
//             <UserDropdown />
//           </div>
//         </div>
//       </header>

//       {/* Emergency Alerts Banner - Only show if hospital handles emergencies and there are pending alerts */}
//       {notifications > 0 && isHandleEmergency && (
//         <motion.div
//           className="bg-red-500 text-white py-2 px-6 flex items-center justify-between sticky top-[70px] z-30 shadow-md" // Adjusted top for header height
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="flex items-center space-x-3">
//             <AlertTriangle className="w-5 h-5" />
//             <span className="font-semibold">
//               {notifications} New Emergency Alert{notifications > 1 ? "s" : ""}!
//             </span>
//           </div>
//           <Button
//             onClick={() => setActiveTab("emergencies")} // Set active tab to emergencies
//             className="bg-white text-red-600 hover:bg-gray-100 px-4 py-1 rounded-md text-sm font-medium"
//           >
//             View Alerts
//           </Button>
//         </motion.div>
//       )}

//       <div className="container mx-auto px-6 py-8">
//         {/* Welcome Section */}
//         <motion.div
//           className="mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome, {user?.name}! 🏥</h2>
//           <p className="text-gray-600 dark:text-gray-400">
//             {isHandleEmergency
//               ? "Manage emergency responses and share important health information with the community."
//               : "Share important health information and connect with the medical community."}
//           </p>
//           {/* Debug info - remove in production */}
//           <div className="mt-2 text-xs text-gray-500">
//             Emergency Handling: {isHandleEmergency ? "Enabled" : "Disabled"} | Available: {isAvailable ? "Yes" : "No"}
//           </div>
//           {/* Display fixed location */}
//           {fixedLocation ? (
//             <p className="text-sm text-gray-500 mt-2">
//               📍 Fixed Location (from address): {fixedLocation.lat.toFixed(4)}, {fixedLocation.lng.toFixed(4)}
//             </p>
//           ) : (
//             <p className="text-sm text-gray-500 mt-2">📍 Fixed Location: Not yet available</p>
//           )}
//           {/* Link to All Hospitals Page */}
//           <Link href="/all-hospitals" passHref>
//             <Button variant="outline" className="mt-4 bg-transparent">
//               <Building2 className="w-4 h-4 mr-2" /> View All Hospitals
//             </Button>
//           </Link>
//         </motion.div>

//         {/* Quick Stats */}
//         <motion.div
//           className={`grid ${quickStatsGridCols} gap-6 mb-8`}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           {/* Emergency Alerts Card - Only show if hospital handles emergencies */}
//           {isHandleEmergency && (
//             <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//               <Card className="hover:shadow-lg transition-all duration-300">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">Emergency Alerts</p>
//                       <p className="text-2xl font-bold text-red-600">{emergencyAlerts.length}</p>
//                       <p className="text-xs text-gray-500">{notifications} pending</p>
//                     </div>
//                     <motion.div
//                       className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center"
//                       animate={{
//                         scale: notifications > 0 ? [1, 1.2, 1] : 1,
//                       }}
//                       transition={{ duration: 2, repeat: notifications > 0 ? Number.POSITIVE_INFINITY : 0 }}
//                     >
//                       <AlertTriangle className="w-6 h-6 text-red-600" />
//                     </motion.div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">My Posts</p>
//                     <p className="text-2xl font-bold text-purple-600">{ownPosts.length}</p>
//                     <p className="text-xs text-gray-500">Published content</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
//                     animate={{ rotate: [0, 360] }}
//                     transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                   >
//                     <MessageSquare className="w-6 h-6 text-purple-600" />
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
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Associated Doctors</p>
//                     <p className="text-2xl font-bold text-green-600">{doctors.length}</p>
//                     <p className="text-xs text-gray-500">Network partners</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       y: [0, -5, 0],
//                     }}
//                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <UserCheck className="w-6 h-6 text-green-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//           {/* My Announcements Card */}
//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">My Announcements</p>
//                     <p className="text-2xl font-bold text-blue-600">{ownAnnouncements.length}</p>
//                     <p className="text-xs text-gray-500 mt-1">Shared updates</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       y: [0, -5, 0],
//                     }}
//                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <Megaphone className="w-6 h-6 text-blue-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>
//           {/* Status Card - Only show if hospital handles emergencies */}
//           {isHandleEmergency && (
//             <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//               <Card className="hover:shadow-lg transition-all duration-300">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
//                       <p className={`text-2xl font-bold ${isAvailable ? "text-green-600" : "text-red-600"}`}>
//                         {isAvailable ? "Available" : "Unavailable"}
//                       </p>
//                       <p className="text-xs text-gray-500">Emergency services</p>
//                     </div>
//                     <motion.div
//                       className={`w-12 h-12 ${
//                         isAvailable ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
//                       } rounded-full flex items-center justify-center`}
//                       animate={{
//                         rotate: [0, 10, -10, 0],
//                       }}
//                       transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//                     >
//                       <Activity className={`w-6 h-6 ${isAvailable ? "text-green-600" : "text-red-600"}`} />
//                     </motion.div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//         </motion.div>

//         {/* Main Content Tabs */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//         >
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//             <TabsList className={`grid w-full ${tabsListGridCols}`}>
//               {isHandleEmergency && <TabsTrigger value="emergencies">Emergency Alerts</TabsTrigger>}
//               <TabsTrigger value="create">Create Post</TabsTrigger>
//               <TabsTrigger value="own-posts">Own Posts</TabsTrigger>
//               <TabsTrigger value="all-posts">All Posts</TabsTrigger>
//               <TabsTrigger value="announcements">Announcements</TabsTrigger>
//             </TabsList>

//             {/* Emergency Alerts Tab - Only show if hospital handles emergencies */}
//             {isHandleEmergency && (
//               <TabsContent value="emergencies" className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <Shield className="w-5 h-5" />
//                         <span>Emergency Alerts</span>
//                         <Badge variant="destructive">{notifications} pending</Badge>
//                       </div>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setAutoRefresh(!autoRefresh)}
//                         className={autoRefresh ? "bg-green-50 border-green-200" : ""}
//                       >
//                         Auto-refresh {autoRefresh ? "ON" : "OFF"}
//                       </Button>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     {emergencyAlerts.length > 0 ? (
//                       <div className="space-y-4">
//                         {emergencyAlerts.map((alert, index) => (
//                           <motion.div
//                             key={alert._id}
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: index * 0.1 }}
//                             className={`border rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer ${
//                               alert.hospitalAlertStatus === "pending"
//                                 ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
//                                 : alert.status === "accepted"
//                                   ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
//                                   : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800" // Default for read/other
//                             }`}
//                             onClick={() => handleAlertClick(alert)}
//                           >
//                             <div className="flex items-start justify-between">
//                               <div className="flex-1">
//                                 <div className="flex items-center space-x-3 mb-3">
//                                   <motion.div
//                                     className={`w-3 h-3 rounded-full ${
//                                       alert.hospitalAlertStatus === "pending"
//                                         ? "bg-red-500"
//                                         : alert.status === "accepted"
//                                           ? "bg-green-500"
//                                           : "bg-gray-500"
//                                     }`}
//                                     animate={{ scale: alert.hospitalAlertStatus === "pending" ? [1, 1.2, 1] : 1 }}
//                                     transition={{
//                                       duration: 1,
//                                       repeat: alert.hospitalAlertStatus === "pending" ? Number.POSITIVE_INFINITY : 0,
//                                     }}
//                                   />
//                                   <h3
//                                     className={`font-semibold text-lg ${
//                                       alert.hospitalAlertStatus === "pending"
//                                         ? "text-red-800 dark:text-red-200"
//                                         : alert.status === "accepted"
//                                           ? "text-green-800 dark:text-green-200"
//                                           : "text-gray-800 dark:text-gray-200"
//                                     }`}
//                                   >
//                                     🚨 EMERGENCY ALERT
//                                   </h3>
//                                   <Badge className={getPriorityColor(alert.priority)}>
//                                     {alert.priority.toUpperCase()}
//                                   </Badge>
//                                   {alert.status === "accepted" && (
//                                     <Badge variant="default" className="bg-green-600">
//                                       ACCEPTED
//                                     </Badge>
//                                   )}
//                                   {alert.hospitalAlertStatus === "read" && alert.status === "pending" && (
//                                     <Badge variant="outline" className="bg-yellow-600 text-white">
//                                       VIEWED
//                                     </Badge>
//                                   )}
//                                 </div>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                   <div>
//                                     <h4 className="font-medium text-gray-900 dark:text-white mb-2">
//                                       Patient Information
//                                     </h4>
//                                     <div className="space-y-1 text-sm">
//                                       <div className="flex items-center space-x-2">
//                                         <User className="w-4 h-4 text-gray-500" />
//                                         <span>{alert.userInfo.name}</span>
//                                       </div>
//                                       <div className="flex items-center space-x-2">
//                                         <Phone className="w-4 h-4 text-gray-500" />
//                                         <span>{alert.userInfo.phone}</span>
//                                       </div>
//                                       <div className="flex items-center space-x-2">
//                                         <Mail className="w-4 h-4 text-gray-500" />
//                                         <span>{alert.userInfo.email}</span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <h4 className="font-medium text-gray-900 dark:text-white mb-2">
//                                       Location & Distance
//                                     </h4>
//                                     <div className="space-y-1 text-sm">
//                                       {alert.distance && (
//                                         <div className="flex items-center space-x-2">
//                                           <Navigation className="w-4 h-4 text-green-500" />
//                                           <span className="font-semibold text-green-600">{alert.distance}km away</span>
//                                           {alert.proximityMethod && (
//                                             <span className="text-xs text-gray-500">({alert.proximityMethod})</span>
//                                           )}
//                                         </div>
//                                       )}
//                                       {/* Google Maps Integration */}
//                                       <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
//                                         <div className="flex items-start space-x-2">
//                                           <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
//                                           <div className="flex-1">
//                                             <p className="font-medium text-blue-800 dark:text-blue-200 text-sm">
//                                               Patient Location:
//                                             </p>
//                                             <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
//                                               📍{" "}
//                                               {alert.location?.lat && alert.location?.lng
//                                                 ? `GPS: ${alert.location.lat.toFixed(4)}, ${alert.location.lng.toFixed(4)}`
//                                                 : formatLocationAddress(alert.location?.address) ||
//                                                   "Location details not available"}
//                                             </p>
//                                             {/* Google Maps Rectangle Button */}
//                                             <motion.button
//                                               whileHover={{ scale: 1.02 }}
//                                               whileTap={{ scale: 0.98 }}
//                                               onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 openGoogleMaps(alert.location)
//                                               }}
//                                               className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2 transition-colors"
//                                             >
//                                               <Map className="w-4 h-4" />
//                                               <span>Open in Google Maps</span>
//                                               <ExternalLink className="w-3 h-3" />
//                                             </motion.button>
//                                             {alert.location?.lat && alert.location?.lng && (
//                                               <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
//                                                 GPS: {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
//                                               </p>
//                                             )}
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                   <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//                                     <Timer className="w-4 h-4" />
//                                     <span>{formatTimeAgo(alert.createdAt)}</span>
//                                   </div>
//                                   <div className="flex space-x-2">
//                                     {alert.hospitalAlertStatus === "pending" && (
//                                       <Button
//                                         size="sm"
//                                         variant="destructive"
//                                         onClick={(e) => {
//                                           e.stopPropagation()
//                                           handleAlertClick(alert)
//                                         }}
//                                         className="animate-pulse"
//                                       >
//                                         🚨 RESPOND NOW
//                                       </Button>
//                                     )}
//                                     {alert.status === "accepted" && (
//                                       <>
//                                         <Button
//                                           size="sm"
//                                           variant="outline"
//                                           onClick={(e) => {
//                                             e.stopPropagation()
//                                             handleShareAlert(alert)
//                                           }}
//                                           className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
//                                         >
//                                           <Share2 className="w-4 h-4 mr-1" />
//                                           Share
//                                         </Button>
//                                         <Button
//                                           size="sm"
//                                           variant="outline"
//                                           onClick={(e) => {
//                                             e.stopPropagation()
//                                             handleRemoveAlertFromView(alert._id)
//                                           }}
//                                           className="text-red-600 hover:text-red-800 hover:bg-red-50"
//                                         >
//                                           <Trash2 className="w-4 h-4" />
//                                           Remove
//                                         </Button>
//                                       </>
//                                     )}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
//                           No Emergency Alerts
//                         </h3>
//                         <p className="text-gray-500">No emergency alerts in your area at the moment</p>
//                         <p className="text-sm text-gray-400 mt-2">System checks every 30 seconds for new alerts</p>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             )}

//             {/* Create Post Tab */}
//             <TabsContent value="create" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Plus className="w-5 h-5" />
//                     <span>Create New Hospital Post</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Post Title *</label>
//                     <Input
//                       value={newPost.title}
//                       onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//                       placeholder="e.g., New Emergency Department Now Open 24/7"
//                       className="w-full"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Content *</label>
//                     <Textarea
//                       value={newPost.content}
//                       onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//                       placeholder="Share hospital updates, health tips, or important announcements..."
//                       className="w-full min-h-[200px]"
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Category *</label>
//                       <Select
//                         value={newPost.category}
//                         onValueChange={(value) => setNewPost({ ...newPost, category: value })}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {categories.map((category) => (
//                             <SelectItem key={category} value={category}>
//                               {category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
//                     <Input
//                       value={newPost.tags}
//                       onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
//                       placeholder="e.g., emergency-care, cardiology, 24-7-service, health-tips"
//                       className="w-full"
//                     />
//                   </div>
//                   <Button
//                     onClick={handleCreatePost}
//                     className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
//                   >
//                     <Send className="w-4 h-4 mr-2" />
//                     Create Post
//                   </Button>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Own Posts Tab */}
//             <TabsContent value="own-posts" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Building2 className="w-5 h-5 text-purple-600" />
//                     <span>My Posts</span>
//                     <Badge variant="secondary">{ownPosts.length} posts</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {ownPosts.length > 0 ? (
//                     <div className="space-y-4">
//                       {ownPosts.map((post, index) => (
//                         <motion.div
//                           key={post._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex-1">
//                               <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
//                               <div className="flex items-center space-x-2 mb-2">
//                                 <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
//                                 <Badge variant={post.isApproved ? "default" : "destructive"}>
//                                   {post.isApproved ? "Approved" : "Pending"}
//                                 </Badge>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <Dialog>
//                                 <DialogTrigger asChild>
//                                   <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
//                                     <Edit className="w-4 h-4" />
//                                   </Button>
//                                 </DialogTrigger>
//                                 <DialogContent className="max-w-2xl">
//                                   <DialogHeader>
//                                     <DialogTitle>Edit Post</DialogTitle>
//                                   </DialogHeader>
//                                   <div className="space-y-4">
//                                     <Input
//                                       defaultValue={post.title}
//                                       placeholder="Post title"
//                                       onChange={(e) =>
//                                         setEditingPost((prev) => (prev ? { ...prev, title: e.target.value } : null))
//                                       }
//                                     />
//                                     <Textarea
//                                       defaultValue={post.content}
//                                       placeholder="Post content"
//                                       className="min-h-[200px]"
//                                       onChange={(e) =>
//                                         setEditingPost((prev) => (prev ? { ...prev, content: e.target.value } : null))
//                                       }
//                                     />
//                                     <div className="flex space-x-2">
//                                       <Button
//                                         onClick={() =>
//                                           editingPost &&
//                                           handleEditPost(editingPost._id, {
//                                             title: editingPost.title,
//                                             content: editingPost.content,
//                                           })
//                                         }
//                                         className="bg-purple-600 hover:bg-purple-700"
//                                       >
//                                         Save Changes
//                                       </Button>
//                                       <Button variant="outline" onClick={() => setEditingPost(null)}>
//                                         Cancel
//                                       </Button>
//                                     </div>
//                                   </div>
//                                 </DialogContent>
//                               </Dialog>
//                               <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post._id)}>
//                                 <Trash2 className="w-4 h-4" />
//                               </Button>
//                             </div>
//                           </div>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{post.content}</p>
//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {post.tags.map((tag, tagIndex) => (
//                               <Badge key={tagIndex} variant="secondary" className="text-xs">
//                                 <Tag className="w-3 h-3 mr-1" />
//                                 {tag}
//                               </Badge>
//                             ))}
//                           </div>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2 text-gray-600">
//                               <Eye className="w-4 h-4" />
//                               <span className="text-sm">View details</span>
//                             </div>
//                             <div className="flex items-center space-x-2 text-xs text-gray-500">
//                               <Calendar className="w-4 h-4" />
//                               <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No posts yet</h3>
//                       <p className="text-gray-500 mb-4">Start sharing hospital updates and health information</p>
//                       <Button onClick={() => setActiveTab("create")}>Create Your First Post</Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* All Posts Tab (formerly Doctor Posts Tab) */}
//             <TabsContent value="all-posts" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Stethoscope className="w-5 h-5 text-green-600" />
//                     <span>All Posts</span>
//                     <Badge variant="secondary">{allOtherPosts.length} posts</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {allOtherPosts.length > 0 ? (
//                     <div className="space-y-4">
//                       {allOtherPosts.map((post, index) => (
//                         <motion.div
//                           key={post._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex items-center space-x-3">
//                               <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
//                                 {post.authorType === "Doctor" ? (
//                                   <Stethoscope className="w-5 h-5 text-green-600" />
//                                 ) : (
//                                   <Building2 className="w-5 h-5 text-purple-600" />
//                                 )}
//                               </div>
//                               <div>
//                                 <p className="font-semibold">
//                                   {post.authorType === "Doctor" ? "Dr." : ""} {post.postby}
//                                 </p>
//                                 <p className="text-sm text-gray-500 capitalize">{post.authorType}</p>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
//                               <span className="text-xs text-gray-500">
//                                 {new Date(post.createdAt).toLocaleDateString()}
//                               </span>
//                             </div>
//                           </div>
//                           <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {post.tags.map((tag, tagIndex) => (
//                               <Badge key={tagIndex} variant="secondary" className="text-xs">
//                                 #{tag}
//                               </Badge>
//                             ))}
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No posts yet</h3>
//                       <p className="text-gray-500">Posts from other hospitals and doctors will appear here</p>
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
//                     <span>My Announcements</span>
//                     <Badge variant="secondary">{ownAnnouncements.length} announcements</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4 border-b pb-4 mb-4">
//                     <h3 className="text-lg font-semibold">Create New Announcement</h3>
//                     <Dialog open={isAnnouncementFormOpen} onOpenChange={setIsAnnouncementFormOpen}>
//                       <DialogTrigger asChild>
//                         <Button onClick={() => openAnnouncementForm(null)} className="w-full">
//                           <Plus className="w-4 h-4 mr-2" />
//                           Create New Announcement
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent className="sm:max-w-[425px]">
//                         <DialogHeader>
//                           <DialogTitle>{"Create New Announcement"}</DialogTitle>
//                         </DialogHeader>
//                         <div className="space-y-4">
//                           <div>
//                             <label className="block text-sm font-medium mb-2">Title *</label>
//                             <Input
//                               value={newAnnouncement.title}
//                               onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
//                               placeholder="e.g., Holiday Notice: Clinic Closed on Dec 25th"
//                               className="w-full"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium mb-2">Content *</label>
//                             <Textarea
//                               value={newAnnouncement.content}
//                               onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
//                               placeholder="Share important updates with your network..."
//                               className="w-full min-h-[120px]"
//                             />
//                           </div>
//                           <div className="flex space-x-2">
//                             <Button
//                               onClick={handleCreateAnnouncement}
//                               disabled={isSavingAnnouncement}
//                               className="bg-blue-600 hover:bg-blue-700"
//                             >
//                               {isSavingAnnouncement ? "Saving..." : "Save Announcement"}
//                             </Button>
//                             <Button variant="outline" onClick={closeAnnouncementForm}>
//                               Cancel
//                             </Button>
//                           </div>
//                         </div>
//                       </DialogContent>
//                     </Dialog>
//                   </div>
//                   <h3 className="text-lg font-semibold mb-4">My Published Announcements</h3>
//                   {ownAnnouncements.length > 0 ? (
//                     <div className="space-y-4">
//                       {ownAnnouncements.map((announcement, index) => (
//                         <motion.div
//                           key={announcement._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex-1">
//                               <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
//                               <div className="flex items-center space-x-2 mb-2">
//                                 <Badge variant="outline">{announcement.ownerType}</Badge>
//                                 <span className="text-sm text-gray-500">Announced by: {announcement.announcedBy}</span>
//                               </div>
//                             </div>
//                             <Button
//                               variant="destructive"
//                               size="sm"
//                               onClick={() => handleDeleteAnnouncement(announcement._id)}
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </Button>
//                           </div>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{announcement.content}</p>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2 text-xs text-gray-500">
//                               <Calendar className="w-4 h-4" />
//                               <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
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
//                       <p className="text-gray-500 mb-4">Share important updates with your network</p>
//                       <Button onClick={() => openAnnouncementForm(null)}>Create Your First Announcement</Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </motion.div>
//       </div>

//       {/* Emergency Alert Response Dialog */}
//       <Dialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle className="flex items-center space-x-2">
//               <AlertTriangle className="w-5 h-5 text-red-500" />
//               <span>Emergency Alert Response</span>
//             </DialogTitle>
//           </DialogHeader>
//           {selectedAlert && (
//             <div className="space-y-6">
//               <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
//                 <AlertTriangle className="h-4 w-4" />
//                 <AlertDescription className="font-semibold">
//                   🚨 EMERGENCY: Immediate medical attention required
//                 </AlertDescription>
//               </Alert>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="font-semibold mb-3">Patient Information</h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex items-center space-x-2">
//                       <User className="w-4 h-4 text-gray-500" />
//                       <span className="font-medium">{selectedAlert.userInfo.name}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Phone className="w-4 h-4 text-gray-500" />
//                       <span>{selectedAlert.userInfo.phone}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Mail className="w-4 h-4 text-gray-500" />
//                       <span>{selectedAlert.userInfo.email}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold mb-3">Emergency Details</h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex items-center space-x-2">
//                       <Badge className={getPriorityColor(selectedAlert.priority)}>
//                         {selectedAlert.priority.toUpperCase()} PRIORITY
//                       </Badge>
//                     </div>
//                     {selectedAlert.distance && (
//                       <div className="flex items-center space-x-2">
//                         <Navigation className="w-4 h-4 text-green-500" />
//                         <span className="font-semibold text-green-600">{selectedAlert.distance}km away</span>
//                       </div>
//                     )}
//                     <div className="flex items-center space-x-2">
//                       <Timer className="w-4 h-4 text-gray-500" />
//                       <span>{formatTimeAgo(selectedAlert.createdAt)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-semibold mb-3">Location</h3>
//                 <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
//                   <div className="flex items-start space-x-2">
//                     <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
//                     <div className="flex-1">
//                       <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">
//                         📍 {formatLocationAddress(selectedAlert.location?.address)}
//                       </p>
//                       <Button
//                         onClick={() => openGoogleMaps(selectedAlert.location?.address)}
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3"
//                       >
//                         <Map className="w-4 h-4 mr-2" />
//                         Open in Google Maps
//                         <ExternalLink className="w-3 h-3 ml-2" />
//                       </Button>
//                       {selectedAlert.location?.lat && selectedAlert.location?.lng && (
//                         <p className="text-xs text-blue-600 dark:text-blue-400">
//                           GPS Coordinates: {selectedAlert.location.lat.toFixed(6)},{" "}
//                           {selectedAlert.location.lng.toFixed(6)}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {selectedAlert.message && (
//                 <div>
//                   <h3 className="font-semibold mb-3">Emergency Message</h3>
//                   <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                     <p className="text-gray-700 dark:text-gray-300">{selectedAlert.message}</p>
//                   </div>
//                 </div>
//               )}
//               {selectedAlert.status === "pending" && (
//                 <div className="flex space-x-4 pt-4 border-t">
//                   <Button
//                     onClick={() => handleResponse("accept")}
//                     disabled={responding}
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
//                   >
//                     {responding ? (
//                       <>
//                         <motion.div
//                           className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                         />
//                         Accepting...
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle className="w-5 h-5 mr-2" />🚑 ACCEPT & DISPATCH AMBULANCE
//                       </>
//                     )}
//                   </Button>
//                   <Button
//                     onClick={() => handleResponse("deny")}
//                     disabled={responding}
//                     variant="destructive"
//                     className="flex-1 font-semibold py-3"
//                   >
//                     {responding ? (
//                       "Processing..."
//                     ) : (
//                       <>
//                         <XCircle className="w-5 h-5 mr-2" />
//                         DECLINE
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               )}
//               {selectedAlert.status === "accepted" && (
//                 <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
//                   <div className="flex items-center space-x-2">
//                     <CheckCircle className="w-5 h-5 text-green-600" />
//                     <span className="font-semibold text-green-800 dark:text-green-200">
//                       Emergency Accepted - Ambulance Dispatched
//                     </span>
//                   </div>
//                   {selectedAlert.acceptedBy && (
//                     <p className="text-sm text-green-700 dark:text-green-300 mt-2">
//                       Handled by: {selectedAlert.acceptedBy.name}
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }














// "use client"
// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import Link from "next/link" // Import Link
// import {
//   AlertTriangle,
//   Building2,
//   Plus,
//   MessageSquare,
//   Bell,
//   Send,
//   UserCheck,
//   Tag,
//   Calendar,
//   Eye,
//   Edit,
//   Trash2,
//   Clock,
//   Shield,
//   Activity,
//   Stethoscope,
//   User,
//   Phone,
//   Mail,
//   Navigation,
//   Timer,
//   RefreshCw,
//   CheckCircle,
//   XCircle,
//   Map,
//   MapPin,
//   ExternalLink,
//   Megaphone,
//   Share2,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Switch } from "@/components/ui/switch"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import ThemeToggle from "@/components/ThemeToggle"
// import UserDropdown from "@/components/UserDropdown"
// import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
// import { toast } from "react-hot-toast"
// import Swal from "sweetalert2"
// import { useAuth } from "@/app/contexts/AuthProvider"

// interface Post {
//   _id: string
//   title: string
//   content: string
//   category: string
//   tags: string[]
//   authorType: "Doctor" | "Hospital"
//   postby: string
//   email: string
//   createdAt: string
//   isApproved: boolean
// }

// interface Doctor {
//   _id: string
//   name: string
//   email: string
//   specialty: string
//   isVerified: boolean
// }

// interface EmergencyAlert {
//   _id: string
//   userInfo: {
//     name: string
//     email: string
//     phone: string
//   }
//   userId?: {
//     name: string
//     email: string
//     phone: string
//     address: any
//   }
//   location: {
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
//   message: string
//   priority: string
//   status: string // "pending" | "accepted" | "declined" | "cancelled" | "no_response_all_contacted"
//   createdAt: string
//   distance?: number
//   proximityMethod?: string
//   acceptedBy?: {
//     _id: string
//     name: string
//   }
//   hospitalAlertStatus?: "pending" | "read" | "accepted" | "declined" | "timedOut"
// }

// interface HospitalData {
//   _id: string
//   name: string
//   email: string
//   phone: string
//   isAvailable: boolean
//   isHandleEmergency: boolean
//   isVerified: boolean
//   address: any
//   location: {
//     lat?: number
//     lng?: number
//   }
// }

// interface Announcement {
//   _id: string
//   ownerEmail: string
//   ownerType: "doctor" | "hospital" | "user"
//   title: string
//   content: string
//   announcedBy: string
//   readBy: string[]
//   createdAt: string
//   updatedAt: string
// }

// export default function HospitalDashboard() {
//   const { user } = useAuth()
//   const [ownPosts, setOwnPosts] = useState<Post[]>([])
//   const [allOtherPosts, setAllOtherPosts] = useState<Post[]>([])
//   const [doctors, setDoctors] = useState<Doctor[]>([])
//   const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
//   const [ownAnnouncements, setOwnAnnouncements] = useState<Announcement[]>([])
//   const [loading, setLoading] = useState(true)
//   const [notifications, setNotifications] = useState(0)
//   const [hospital, setHospital] = useState<HospitalData | null>(null)
//   const [isHandleEmergency, setIsHandleEmergency] = useState<boolean>(false)
//   const [isAvailable, setIsAvailable] = useState<boolean>(false)
//   const [editingPost, setEditingPost] = useState<Post | null>(null)
//   const [selectedAlert, setSelectedAlert] = useState<EmergencyAlert | null>(null)
//   const [showAlertDialog, setShowAlertDialog] = useState(false)
//   const [responding, setResponding] = useState(false)
//   const [lastChecked, setLastChecked] = useState<Date>(new Date())
//   const [autoRefresh, setAutoRefresh] = useState(true)
//   const [activeTab, setActiveTab] = useState<string | undefined>(undefined) // State to control active tab

//   // State for the fixed hospital location (from DB, geocoded from address)
//   const [fixedLocation, setFixedLocation] = useState<{ lat: number; lng: number } | null>(null)

//   // Post creation state
//   const [newPost, setNewPost] = useState({
//     title: "",
//     content: "",
//     category: "",
//     tags: "",
//   })

//   // Announcement creation state
//   const [newAnnouncement, setNewAnnouncement] = useState({
//     title: "",
//     content: "",
//   })
//   const [isAnnouncementFormOpen, setIsAnnouncementFormOpen] = useState(false)
//   const [isSavingAnnouncement, setIsSavingAnnouncement] = useState(false)

//   const categories = [
//     "emergency-care",
//     "hospital-services",
//     "health-tips",
//     "prevention",
//     "treatment",
//     "facilities",
//     "announcements",
//     "cardiology",
//     "neurology",
//     "pediatrics",
//   ]

//   // Initial data fetching and emergency alert polling
//   useEffect(() => {
//     const initDashboard = async () => {
//       setLoading(true)
//       // Fetch hospital data first to determine emergency handling capability
//       const hospitalData = await fetchHospitalData()

//       if (hospitalData?.isHandleEmergency) {
//         setActiveTab("emergencies") // Set default tab to emergencies if handling them
//       } else {
//         setActiveTab("create") // Otherwise, default to create post
//       }

//       // Staggered fetching of other dashboard data
//       setTimeout(async () => {
//         await fetchOwnPostsAndAnnouncements()
//       }, 1000) // 1 second delay

//       setTimeout(async () => {
//         await fetchAllOtherPosts()
//       }, 2000) // 2 second delay

//       if (hospitalData?.isHandleEmergency) {
//         setTimeout(async () => {
//           await fetchEmergencyAlerts() // Fetch alerts only if handling emergencies
//         }, 3000) // 3 second delay
//       }
//       setLoading(false) // Set loading to false after all initial fetches are initiated
//     }

//     initDashboard()

//     // Polling for alerts (existing logic)
//     const interval = setInterval(() => {
//       if (autoRefresh && isHandleEmergency) {
//         fetchEmergencyAlerts()
//       }
//     }, 30000)

//     return () => clearInterval(interval)
//   }, [autoRefresh, isHandleEmergency])

//   // Effect to trigger fixed location geocoding after a delay if not already set
//   useEffect(() => {
//     if (hospital && !hospital.location?.lat && !hospital.location?.lng) {
//       console.log("Hospital fixed location not set. Initiating geocoding in 4 minutes...")
//       // Using 5 seconds for demonstration. For production, use 4 * 60 * 1000 (4 minutes).
//       const geocodeTimer = setTimeout(() => {
//         console.log("4 minutes passed. Attempting to geocode hospital address.")
//         triggerFixedLocationGeocoding(hospital._id)
//       }, 5 * 1000)
//       return () => clearTimeout(geocodeTimer)
//     }
//   }, [hospital]) // Re-run when hospital data changes

//   const triggerFixedLocationGeocoding = async (hospitalId: string) => {
//     try {
//       const response = await fetch("/api/hospital/update-fixed-location", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ hospitalId }),
//       })
//       const data = await response.json()
//       if (response.ok && data.success) {
//         // No toast message here, just update the UI
//         fetchHospitalData() // Re-fetch hospital data to update the UI with the new fixed location
//       } else {
//         console.error("Failed to update fixed location:", data.message)
//         // Optionally, log this error but don't show a toast to the user for this background process
//       }
//     } catch (error) {
//       console.error("Error triggering fixed location geocoding:", error)
//       // Optionally, log this error
//     }
//   }

//   const fetchHospitalData = async () => {
//     try {
//       const response = await fetch("/api/hospital/me")
//       if (response.ok) {
//         const result = await response.json()
//         if (result.success) {
//           setHospital(result.data)
//           setIsHandleEmergency(result.data.isHandleEmergency)
//           setIsAvailable(result.data.isAvailable)
//           // Set fixed location from fetched hospital data if available
//           if (result.data.location?.lat && result.data.location?.lng) {
//             setFixedLocation(result.data.location)
//           }
//           console.log("Hospital data:", result.data)
//           console.log("isHandleEmergency:", result.data.isHandleEmergency)
//           return result.data // Return hospital data for initial tab setting
//         }
//       } else {
//         console.error("Failed to fetch hospital data")
//         toast.error("Failed to load hospital settings")
//       }
//     } catch (error) {
//       console.error("Error fetching hospital data:", error)
//       toast.error("Error loading hospital data")
//     }
//     return null
//   }

//   const fetchOwnPostsAndAnnouncements = async () => {
//     try {
//       const [ownPostsRes, ownAnnouncementsRes] = await Promise.all([
//         fetch("/api/hospital/own-posts"),
//         fetch("/api/announcements/own"), // Fetch own announcements
//       ])

//       if (ownPostsRes.ok) {
//         const ownPostsData = await ownPostsRes.json()
//         setOwnPosts(ownPostsData.data || [])
//       }
//       if (ownAnnouncementsRes.ok) {
//         const ownAnnouncementsData = await ownAnnouncementsRes.json()
//         setOwnAnnouncements(ownAnnouncementsData.data || [])
//       }
//     } catch (error) {
//       console.error("Error fetching own posts or announcements:", error)
//     }
//   }

//   const fetchAllOtherPosts = async () => {
//     try {
//       const allOtherPostsRes = await fetch("/api/posts") // Fetch all posts for "All Posts" tab
//       if (allOtherPostsRes.ok) {
//         const allOtherPostsData = await allOtherPostsRes.json()
//         // Filter out own posts from allOtherPosts based on user's email
//         setAllOtherPosts(allOtherPostsData.data.filter((post: Post) => post.email !== user?.email) || [])
//       }
//     } catch (error) {
//       console.error("Error fetching all other posts:", error)
//     }
//   }

//   const fetchEmergencyAlerts = async () => {
//     if (!isHandleEmergency) return

//     try {
//       console.log("🔄 Fetching emergency alerts...")
//       const response = await fetch("/api/hospital/emergency-alerts")
//       const data = await response.json()

//       if (response.ok) {
//         // Only show pending, read, or accepted alerts
//         const relevantAlerts =
//           data.alerts?.filter(
//             (alert: EmergencyAlert) =>
//               alert.hospitalAlertStatus === "pending" ||
//               alert.hospitalAlertStatus === "read" ||
//               alert.status === "accepted",
//           ) || []
//         setEmergencyAlerts(relevantAlerts)
//         setNotifications(
//           relevantAlerts.filter((alert: EmergencyAlert) => alert.hospitalAlertStatus === "pending").length || 0,
//         )
//         setLastChecked(new Date())
//         console.log(`✅ Found ${relevantAlerts.length || 0} nearby emergency alerts`)

//         if (relevantAlerts.length > 0) {
//           const criticalPendingAlerts = relevantAlerts.filter(
//             (alert: EmergencyAlert) => alert.priority === "critical" && alert.hospitalAlertStatus === "pending",
//           )
//           if (criticalPendingAlerts.length > 0) {
//             toast.error(`🚨 ${criticalPendingAlerts.length} CRITICAL emergency alert(s) nearby!`, {
//               duration: 8000,
//             })
//           }
//         }
//       } else {
//         console.error("❌ Failed to fetch emergency alerts:", data.message)
//       }
//     } catch (error) {
//       console.error("💥 Error fetching emergency alerts:", error)
//     }
//   }

//   const handleCreatePost = async () => {
//     if (!newPost.title || !newPost.content || !newPost.category) {
//       toast.error("Please fill in all required fields")
//       return
//     }

//     try {
//       console.log("\n in /api/hospital/create-post Creating new post:", newPost)
//       const response = await fetch("/api/hospital/create-post", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: newPost.title,
//           content: newPost.content,
//           category: newPost.category,
//           tags: newPost.tags
//             .split(",")
//             .map((tag) => tag.trim())
//             .filter((tag) => tag),
//         }),
//       })

//       if (response.ok) {
//         toast.success("✅ Post created successfully! Awaiting admin approval.")
//         setNewPost({
//           title: "",
//           content: "",
//           category: "",
//           tags: "",
//         })
//         fetchOwnPostsAndAnnouncements() // Refresh own posts
//       } else {
//         toast.error("Failed to create post")
//       }
//     } catch (error) {
//       toast.error("Error creating post")
//     }
//   }

//   const handleEditPost = async (postId: string, updatedData: Partial<Post>) => {
//     try {
//       const response = await fetch("/api/hospital/edit-post", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId, ...updatedData }),
//       })

//       if (response.ok) {
//         toast.success("✅ Post updated successfully!")
//         setEditingPost(null)
//         fetchOwnPostsAndAnnouncements() // Refresh own posts
//       } else {
//         toast.error("Failed to update post")
//       }
//     } catch (error) {
//       toast.error("Error updating post")
//     }
//   }

//   const handleDeletePost = async (postId: string) => {
//     const confirmation = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action will permanently delete the post.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     })

//     if (!confirmation.isConfirmed) return

//     try {
//       const response = await fetch("/api/hospital/delete-post", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId }),
//       })

//       if (response.ok) {
//         Swal.fire("Deleted!", "Your post has been deleted.", "success")
//         fetchOwnPostsAndAnnouncements() // Refresh own posts
//       } else {
//         Swal.fire("Failed", "Unable to delete post.", "error")
//       }
//     } catch (error) {
//       Swal.fire("Error", "An error occurred while deleting the post.", "error")
//     }
//   }

//   const handleToggleAvailability = async () => {
//     try {
//       const response = await fetch("/api/hospital/toggle-availability", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ isAvailable: !isAvailable }),
//       })

//       if (response.ok) {
//         setIsAvailable(!isAvailable)
//         toast.success(`🏥 Hospital is now ${!isAvailable ? "available" : "unavailable"} for emergencies`)
//       } else {
//         toast.error("Failed to update availability")
//       }
//     } catch (error) {
//       toast.error("Error updating availability")
//     }
//   }

//   const handleAlertClick = (alert: EmergencyAlert) => {
//     setSelectedAlert(alert)
//     setShowAlertDialog(true)
//   }

//   const handleResponse = async (action: "accept" | "deny") => {
//     if (!selectedAlert) return
//     setResponding(true)

//     try {
//       const response = await fetch("/api/hospital/emergency-alerts/respond", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           alertId: selectedAlert._id,
//           action,
//         }),
//       })
//       const data = response.headers.get("content-type")?.includes("application/json")
//         ? await response.json()
//         : { message: response.statusText || "An unexpected error occurred." }

//       if (response.ok) {
//         if (action === "accept") {
//           toast.success(`✅ Emergency accepted! Patient: ${selectedAlert.userInfo.name}`)
//           toast.success("🚑 Ambulance dispatched! Patient will be notified.")
//           // Alert remains in list, its status will be updated on next fetchEmergencyAlerts
//         } else {
//           toast.success("❌ Emergency declined")
//           // Remove declined alert from local state immediately
//           setEmergencyAlerts((prevAlerts) => prevAlerts.filter((alert) => alert._id !== selectedAlert._id))
//         }
//         setShowAlertDialog(false)
//         setSelectedAlert(null)
//         fetchEmergencyAlerts() // Refresh the list to reflect status changes
//       } else {
//         toast.error(data.message || "Failed to respond to emergency")
//       }
//     } catch (error) {
//       console.error("Error responding to emergency:", error)
//       toast.error("Failed to respond to emergency")
//     } finally {
//       setResponding(false)
//     }
//   }

//   const handleRemoveAlertFromView = async (alertId: string) => {
//     const result = await Swal.fire({
//       title: "Remove Alert?",
//       text: "This will remove the alert from your dashboard view. It will not affect the patient's alert status.",
//       icon: "question",
//       showCancelButton: true,
//       confirmButtonColor: "#3085d6",
//       cancelButtonColor: "#d33",
//       confirmButtonText: "Yes, remove it!",
//     })

//     if (!result.isConfirmed) return

//     setEmergencyAlerts((prevAlerts) => prevAlerts.filter((alert) => alert._id !== alertId))
//     toast.success("Alert removed from view.")
//   }

//   const handleCreateAnnouncement = async () => {
//     if (!newAnnouncement.title || !newAnnouncement.content) {
//       toast.error("Please fill in all required fields for the announcement.")
//       return
//     }
//     setIsSavingAnnouncement(true)
//     try {
//       const response = await fetch("/api/announcements/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: newAnnouncement.title,
//           content: newAnnouncement.content,
//           ownerType: "hospital",
//         }),
//       })

//       if (response.ok) {
//         toast.success("✅ Announcement created successfully!")
//         setNewAnnouncement({ title: "", content: "" })
//         closeAnnouncementForm()
//         fetchOwnPostsAndAnnouncements() // Refresh own announcements
//       } else {
//         toast.error("Failed to create announcement")
//       }
//     } catch (error) {
//       toast.error("Error creating announcement")
//     } finally {
//       setIsSavingAnnouncement(false)
//     }
//   }

//   const handleDeleteAnnouncement = async (announcementId: string) => {
//     const result = await Swal.fire({
//       title: "🗑️ Delete Announcement?",
//       text: "Are you sure you want to permanently delete this announcement?",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it",
//     })

//     if (!result.isConfirmed) return

//     try {
//       const response = await fetch("/api/announcements/delete", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: announcementId }),
//       })

//       if (response.ok) {
//         Swal.fire("Deleted!", "Announcement has been deleted.", "success")
//         fetchOwnPostsAndAnnouncements() // Refresh own announcements
//       } else {
//         Swal.fire("Failed", "Unable to delete announcement.", "error")
//       }
//     } catch (error) {
//       Swal.fire("Error", "Something went wrong while deleting the announcement.", "error")
//     }
//   }

//   const openAnnouncementForm = (announcement: Announcement | null) => {
//     setNewAnnouncement({
//       title: announcement?.title || "",
//       content: announcement?.content || "",
//     })
//     setIsAnnouncementFormOpen(true)
//   }

//   const closeAnnouncementForm = () => {
//     setIsAnnouncementFormOpen(false)
//     setNewAnnouncement({ title: "", content: "" })
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

//   const formatLocationAddress = (address: any) => {
//     if (!address) return ""
//     const parts = [
//       address.street,
//       address.area,
//       address.townOrVillage,
//       address.taluka,
//       address.district,
//       address.state || "Gujarat",
//       address.pincode,
//     ].filter(Boolean)
//     return parts.join(", ")
//   }

//   const openGoogleMaps = (location: { lat?: number; lng?: number; address?: any }) => {
//     if (!location || (!location.lat && !location.lng && !location.address)) {
//       toast.error("Location data not available for mapping.")
//       return
//     }

//     let googleMapsUrl = ""
//     if (location.lat && location.lng) {
//       googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
//       toast.success("🗺️ Opening location in Google Maps via GPS...")
//     } else if (location.address) {
//       const searchQuery = formatLocationAddress(location.address)
//       if (searchQuery) {
//         googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
//         toast.success("🗺️ Opening location in Google Maps via address...")
//       } else {
//         toast.error("Insufficient address details for mapping.")
//         return
//       }
//     } else {
//       toast.error("No valid location data to open in Google Maps.")
//       return
//     }
//     window.open(googleMapsUrl, "_blank")
//   }

//   const handleShareAlert = (alert: EmergencyAlert) => {
//     const patientName = alert.userInfo.name
//     const patientPhone = alert.userInfo.phone
//     const patientAddress = alert.location?.address ? formatLocationAddress(alert.location.address) : "N/A"
//     const lat = alert.location?.lat?.toFixed(6) || "N/A"
//     const lng = alert.location?.lng?.toFixed(6) || "N/A"

//     let message = `🚨 Emergency Patient Details:\n`
//     message += `Name: ${patientName}\n`
//     message += `Phone: ${patientPhone}\n`
//     message += `Address: ${patientAddress}\n`
//     if (alert.location?.lat && alert.location?.lng) {
//       message += `GPS: ${lat}, ${lng}\n`
//       message += `Google Maps: https://www.google.com/maps/search/?api=1&query=${lat},${lng}\n`
//     }
//     message += `Message: ${alert.message || "Immediate assistance needed!"}`

//     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
//     window.open(whatsappUrl, "_blank")
//     toast.success("Sharing patient details via WhatsApp!")
//   }

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <motion.div
//             className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           />
//           <p className="text-gray-600 dark:text-gray-400 text-lg">Loading hospital dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   const quickStatsGridCols = isHandleEmergency ? "grid-cols-1 md:grid-cols-5" : "grid-cols-1 md:grid-cols-4"
//   const tabsListGridCols = isHandleEmergency ? "grid-cols-5" : "grid-cols-4"

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       {/* Header with Animated Icons */}
//       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
//         <AnimatedHealthIcons />
//         <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
//           <div className="flex items-center space-x-4">
//             <motion.div
//               className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
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
//               <Building2 className="w-6 h-6 text-white" />
//             </motion.div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900 dark:text-white">Hospital Dashboard</h1>
//               <p className="text-sm text-gray-600 dark:text-gray-400">
//                 {isHandleEmergency ? "Manage emergency care & health content" : "Manage health content"}
//               </p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             {/* Emergency controls - Only show if hospital handles emergencies */}
//             {isHandleEmergency && (
//               <>
//                 <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//                   <Clock className="w-4 h-4" />
//                   <span>Last checked: {lastChecked.toLocaleTimeString()}</span>
//                 </div>
//                 <Button
//                   variant="outline"
//                   size="sm"
//                   onClick={fetchEmergencyAlerts}
//                   className="flex items-center space-x-2 bg-transparent"
//                 >
//                   <RefreshCw className="w-4 h-4" />
//                   <span>Refresh</span>
//                 </Button>
//                 <div className="flex items-center space-x-2">
//                   <span className="text-sm text-gray-600 dark:text-gray-400">Available for emergencies</span>
//                   <Switch
//                     checked={isAvailable}
//                     onCheckedChange={handleToggleAvailability}
//                     disabled={!isHandleEmergency}
//                   />
//                 </div>
//               </>
//             )}
//             <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
//               <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
//               {notifications > 0 && isHandleEmergency && (
//                 <motion.span
//                   className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
//                   animate={{ scale: [1, 1.2, 1] }}
//                   transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
//                 >
//                   {notifications}
//                 </motion.span>
//               )}
//             </motion.div>
//             <ThemeToggle />
//             <UserDropdown />
//           </div>
//         </div>
//       </header>

//       {/* Emergency Alerts Banner - Only show if hospital handles emergencies and there are pending alerts */}
//       {notifications > 0 && isHandleEmergency && (
//         <motion.div
//           className="bg-red-500 text-white py-2 px-6 flex items-center justify-between sticky top-[70px] z-30 shadow-md" // Adjusted top for header height
//           initial={{ opacity: 0, y: -50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <div className="flex items-center space-x-3">
//             <AlertTriangle className="w-5 h-5" />
//             <span className="font-semibold">
//               {notifications} New Emergency Alert{notifications > 1 ? "s" : ""}!
//             </span>
//           </div>
//           <Button
//             onClick={() => setActiveTab("emergencies")} // Set active tab to emergencies
//             className="bg-white text-red-600 hover:bg-gray-100 px-4 py-1 rounded-md text-sm font-medium"
//           >
//             View Alerts
//           </Button>
//         </motion.div>
//       )}

//       <div className="container mx-auto px-6 py-8">
//         {/* Welcome Section */}
//         <motion.div
//           className="mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6 }}
//         >
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome, {user?.name}! 🏥</h2>
//           <p className="text-gray-600 dark:text-gray-400">
//             {isHandleEmergency
//               ? "Manage emergency responses and share important health information with the community."
//               : "Share important health information and connect with the medical community."}
//           </p>
//           {/* Debug info - remove in production */}
//           <div className="mt-2 text-xs text-gray-500">
//             Emergency Handling: {isHandleEmergency ? "Enabled" : "Disabled"} | Available: {isAvailable ? "Yes" : "No"}
//           </div>
//           {/* Display fixed location */}
//           {fixedLocation ? (
//             <p className="text-sm text-gray-500 mt-2">
//               📍 Fixed Location (from address): {fixedLocation.lat.toFixed(4)}, {fixedLocation.lng.toFixed(4)}
//             </p>
//           ) : (
//             <p className="text-sm text-gray-500 mt-2">📍 Fixed Location: Not yet available</p>
//           )}
//           {/* Link to All Hospitals Page */}
//           <Link href="/all-hospitals" passHref>
//             <Button variant="outline" className="mt-4 bg-transparent">
//               <Building2 className="w-4 h-4 mr-2" /> View All Hospitals
//             </Button>
//           </Link>
//         </motion.div>

//         {/* Quick Stats */}
//         <motion.div
//           className={`grid ${quickStatsGridCols} gap-6 mb-8`}
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           {/* Emergency Alerts Card - Only show if hospital handles emergencies */}
//           {isHandleEmergency && (
//             <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//               <Card className="hover:shadow-lg transition-all duration-300">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">Emergency Alerts</p>
//                       <p className="text-2xl font-bold text-red-600">{emergencyAlerts.length}</p>
//                       <p className="text-xs text-gray-500">{notifications} pending</p>
//                     </div>
//                     <motion.div
//                       className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center"
//                       animate={{
//                         scale: notifications > 0 ? [1, 1.2, 1] : 1,
//                       }}
//                       transition={{ duration: 2, repeat: notifications > 0 ? Number.POSITIVE_INFINITY : 0 }}
//                     >
//                       <AlertTriangle className="w-6 h-6 text-red-600" />
//                     </motion.div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}

//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">My Posts</p>
//                     <p className="text-2xl font-bold text-purple-600">{ownPosts.length}</p>
//                     <p className="text-xs text-gray-500">Published content</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
//                     animate={{ rotate: [0, 360] }}
//                     transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                   >
//                     <MessageSquare className="w-6 h-6 text-purple-600" />
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
//                     <p className="text-sm text-gray-600 dark:text-gray-400">Associated Doctors</p>
//                     <p className="text-2xl font-bold text-green-600">{doctors.length}</p>
//                     <p className="text-xs text-gray-500">Network partners</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       y: [0, -5, 0],
//                     }}
//                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <UserCheck className="w-6 h-6 text-green-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* My Announcements Card */}
//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">My Announcements</p>
//                     <p className="text-2xl font-bold text-blue-600">{ownAnnouncements.length}</p>
//                     <p className="text-xs text-gray-500 mt-1">Shared updates</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
//                     animate={{
//                       y: [0, -5, 0],
//                     }}
//                     transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
//                   >
//                     <Megaphone className="w-6 h-6 text-blue-600" />
//                   </motion.div>
//                 </div>
//               </CardContent>
//             </Card>
//           </motion.div>

//           {/* Status Card - Only show if hospital handles emergencies */}
//           {isHandleEmergency && (
//             <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//               <Card className="hover:shadow-lg transition-all duration-300">
//                 <CardContent className="p-6">
//                   <div className="flex items-center justify-between">
//                     <div>
//                       <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
//                       <p className={`text-2xl font-bold ${isAvailable ? "text-green-600" : "text-red-600"}`}>
//                         {isAvailable ? "Available" : "Unavailable"}
//                       </p>
//                       <p className="text-xs text-gray-500">Emergency services</p>
//                     </div>
//                     <motion.div
//                       className={`w-12 h-12 ${
//                         isAvailable ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
//                       } rounded-full flex items-center justify-center`}
//                       animate={{
//                         rotate: [0, 10, -10, 0],
//                       }}
//                       transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
//                     >
//                       <Activity className={`w-6 h-6 ${isAvailable ? "text-green-600" : "text-red-600"}`} />
//                     </motion.div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </motion.div>
//           )}
//         </motion.div>

//         {/* Main Content Tabs */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.3 }}
//         >
//           <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
//             <TabsList className={`grid w-full ${tabsListGridCols}`}>
//               {isHandleEmergency && <TabsTrigger value="emergencies">Emergency Alerts</TabsTrigger>}
//               <TabsTrigger value="create">Create Post</TabsTrigger>
//               <TabsTrigger value="own-posts">Own Posts</TabsTrigger>
//               <TabsTrigger value="all-posts">All Posts</TabsTrigger>
//               <TabsTrigger value="announcements">Announcements</TabsTrigger>
//             </TabsList>

//             {/* Emergency Alerts Tab - Only show if hospital handles emergencies */}
//             {isHandleEmergency && (
//               <TabsContent value="emergencies" className="space-y-6">
//                 <Card>
//                   <CardHeader>
//                     <CardTitle className="flex items-center justify-between">
//                       <div className="flex items-center space-x-2">
//                         <Shield className="w-5 h-5" />
//                         <span>Emergency Alerts</span>
//                         <Badge variant="destructive">{notifications} pending</Badge>
//                       </div>
//                       <Button
//                         variant="outline"
//                         size="sm"
//                         onClick={() => setAutoRefresh(!autoRefresh)}
//                         className={autoRefresh ? "bg-green-50 border-green-200" : ""}
//                       >
//                         Auto-refresh {autoRefresh ? "ON" : "OFF"}
//                       </Button>
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     {emergencyAlerts.length > 0 ? (
//                       <div className="space-y-4">
//                         {emergencyAlerts.map((alert, index) => (
//                           <motion.div
//                             key={alert._id}
//                             initial={{ opacity: 0, x: -20 }}
//                             animate={{ opacity: 1, x: 0 }}
//                             transition={{ delay: index * 0.1 }}
//                             className={`border rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer ${
//                               alert.hospitalAlertStatus === "pending"
//                                 ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
//                                 : alert.status === "accepted"
//                                   ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
//                                   : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800" // Default for read/other
//                             }`}
//                             onClick={() => handleAlertClick(alert)}
//                           >
//                             <div className="flex items-start justify-between">
//                               <div className="flex-1">
//                                 <div className="flex items-center space-x-3 mb-3">
//                                   <motion.div
//                                     className={`w-3 h-3 rounded-full ${
//                                       alert.hospitalAlertStatus === "pending"
//                                         ? "bg-red-500"
//                                         : alert.status === "accepted"
//                                           ? "bg-green-500"
//                                           : "bg-gray-500"
//                                     }`}
//                                     animate={{ scale: alert.hospitalAlertStatus === "pending" ? [1, 1.2, 1] : 1 }}
//                                     transition={{
//                                       duration: 1,
//                                       repeat: alert.hospitalAlertStatus === "pending" ? Number.POSITIVE_INFINITY : 0,
//                                     }}
//                                   />
//                                   <h3
//                                     className={`font-semibold text-lg ${
//                                       alert.hospitalAlertStatus === "pending"
//                                         ? "text-red-800 dark:text-red-200"
//                                         : alert.status === "accepted"
//                                           ? "text-green-800 dark:text-green-200"
//                                           : "text-gray-800 dark:text-gray-200"
//                                     }`}
//                                   >
//                                     🚨 EMERGENCY ALERT
//                                   </h3>
//                                   <Badge className={getPriorityColor(alert.priority)}>
//                                     {alert.priority.toUpperCase()}
//                                   </Badge>
//                                   {alert.status === "accepted" && (
//                                     <Badge variant="default" className="bg-green-600">
//                                       ACCEPTED
//                                     </Badge>
//                                   )}
//                                   {alert.hospitalAlertStatus === "read" && alert.status === "pending" && (
//                                     <Badge variant="outline" className="bg-yellow-600 text-white">
//                                       VIEWED
//                                     </Badge>
//                                   )}
//                                 </div>
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
//                                   <div>
//                                     <h4 className="font-medium text-gray-900 dark:text-white mb-2">
//                                       Patient Information
//                                     </h4>
//                                     <div className="space-y-1 text-sm">
//                                       <div className="flex items-center space-x-2">
//                                         <User className="w-4 h-4 text-gray-500" />
//                                         <span>{alert.userInfo.name}</span>
//                                       </div>
//                                       <div className="flex items-center space-x-2">
//                                         <Phone className="w-4 h-4 text-gray-500" />
//                                         <span>{alert.userInfo.phone}</span>
//                                       </div>
//                                       <div className="flex items-center space-x-2">
//                                         <Mail className="w-4 h-4 text-gray-500" />
//                                         <span>{alert.userInfo.email}</span>
//                                       </div>
//                                     </div>
//                                   </div>
//                                   <div>
//                                     <h4 className="font-medium text-gray-900 dark:text-white mb-2">
//                                       Location & Distance
//                                     </h4>
//                                     <div className="space-y-1 text-sm">
//                                       {alert.distance && (
//                                         <div className="flex items-center space-x-2">
//                                           <Navigation className="w-4 h-4 text-green-500" />
//                                           <span className="font-semibold text-green-600">{alert.distance}km away</span>
//                                           {alert.proximityMethod && (
//                                             <span className="text-xs text-gray-500">({alert.proximityMethod})</span>
//                                           )}
//                                         </div>
//                                       )}
//                                       {/* Google Maps Integration */}
//                                       <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
//                                         <div className="flex items-start space-x-2">
//                                           <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
//                                           <div className="flex-1">
//                                             <p className="font-medium text-blue-800 dark:text-blue-200 text-sm">
//                                               Patient Location:
//                                             </p>
//                                             <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
//                                               📍{" "}
//                                               {alert.location?.lat && alert.location?.lng
//                                                 ? `GPS: ${alert.location.lat.toFixed(4)}, ${alert.location.lng.toFixed(4)}`
//                                                 : formatLocationAddress(alert.location?.address) ||
//                                                   "Location details not available"}
//                                             </p>
//                                             {/* Google Maps Rectangle Button */}
//                                             <motion.button
//                                               whileHover={{ scale: 1.02 }}
//                                               whileTap={{ scale: 0.98 }}
//                                               onClick={(e) => {
//                                                 e.stopPropagation()
//                                                 openGoogleMaps(alert.location)
//                                               }}
//                                               className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2 transition-colors"
//                                             >
//                                               <Map className="w-4 h-4" />
//                                               <span>Open in Google Maps</span>
//                                               <ExternalLink className="w-3 h-3" />
//                                             </motion.button>
//                                             {alert.location?.lat && alert.location?.lng && (
//                                               <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
//                                                 GPS: {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
//                                               </p>
//                                             )}
//                                           </div>
//                                         </div>
//                                       </div>
//                                     </div>
//                                   </div>
//                                 </div>
//                                 <div className="flex items-center justify-between">
//                                   <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
//                                     <Timer className="w-4 h-4" />
//                                     <span>{formatTimeAgo(alert.createdAt)}</span>
//                                   </div>
//                                   <div className="flex space-x-2">
//                                     {alert.hospitalAlertStatus === "pending" && (
//                                       <Button
//                                         size="sm"
//                                         variant="destructive"
//                                         onClick={(e) => {
//                                           e.stopPropagation()
//                                           handleAlertClick(alert)
//                                         }}
//                                         className="animate-pulse"
//                                       >
//                                         🚨 RESPOND NOW
//                                       </Button>
//                                     )}
//                                     {alert.status === "accepted" && (
//                                       <>
//                                         <Button
//                                           size="sm"
//                                           variant="outline"
//                                           onClick={(e) => {
//                                             e.stopPropagation()
//                                             handleShareAlert(alert)
//                                           }}
//                                           className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
//                                         >
//                                           <Share2 className="w-4 h-4 mr-1" />
//                                           Share
//                                         </Button>
//                                         <Button
//                                           size="sm"
//                                           variant="outline"
//                                           onClick={(e) => {
//                                             e.stopPropagation()
//                                             handleRemoveAlertFromView(alert._id)
//                                           }}
//                                           className="text-red-600 hover:text-red-800 hover:bg-red-50"
//                                         >
//                                           <Trash2 className="w-4 h-4" />
//                                           Remove
//                                         </Button>
//                                       </>
//                                     )}
//                                   </div>
//                                 </div>
//                               </div>
//                             </div>
//                           </motion.div>
//                         ))}
//                       </div>
//                     ) : (
//                       <div className="text-center py-12">
//                         <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                         <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
//                           No Emergency Alerts
//                         </h3>
//                         <p className="text-gray-500">No emergency alerts in your area at the moment</p>
//                         <p className="text-sm text-gray-400 mt-2">System checks every 30 seconds for new alerts</p>
//                       </div>
//                     )}
//                   </CardContent>
//                 </Card>
//               </TabsContent>
//             )}

//             {/* Create Post Tab */}
//             <TabsContent value="create" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Plus className="w-5 h-5" />
//                     <span>Create New Hospital Post</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Post Title *</label>
//                     <Input
//                       value={newPost.title}
//                       onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//                       placeholder="e.g., New Emergency Department Now Open 24/7"
//                       className="w-full"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Content *</label>
//                     <Textarea
//                       value={newPost.content}
//                       onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//                       placeholder="Share hospital updates, health tips, or important announcements..."
//                       className="w-full min-h-[200px]"
//                     />
//                   </div>
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div>
//                       <label className="block text-sm font-medium mb-2">Category *</label>
//                       <Select
//                         value={newPost.category}
//                         onValueChange={(value) => setNewPost({ ...newPost, category: value })}
//                       >
//                         <SelectTrigger>
//                           <SelectValue placeholder="Select category" />
//                         </SelectTrigger>
//                         <SelectContent>
//                           {categories.map((category) => (
//                             <SelectItem key={category} value={category}>
//                               {category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
//                             </SelectItem>
//                           ))}
//                         </SelectContent>
//                       </Select>
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
//                     <Input
//                       value={newPost.tags}
//                       onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
//                       placeholder="e.g., emergency-care, cardiology, 24-7-service, health-tips"
//                       className="w-full"
//                     />
//                   </div>
//                   <Button
//                     onClick={handleCreatePost}
//                     className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
//                   >
//                     <Send className="w-4 h-4 mr-2" />
//                     Create Post
//                   </Button>
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* Own Posts Tab */}
//             <TabsContent value="own-posts" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Building2 className="w-5 h-5 text-purple-600" />
//                     <span>My Posts</span>
//                     <Badge variant="secondary">{ownPosts.length} posts</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {ownPosts.length > 0 ? (
//                     <div className="space-y-4">
//                       {ownPosts.map((post, index) => (
//                         <motion.div
//                           key={post._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex-1">
//                               <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
//                               <div className="flex items-center space-x-2 mb-2">
//                                 <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
//                                 <Badge variant={post.isApproved ? "default" : "destructive"}>
//                                   {post.isApproved ? "Approved" : "Pending"}
//                                 </Badge>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <Dialog>
//                                 <DialogTrigger asChild>
//                                   <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
//                                     <Edit className="w-4 h-4" />
//                                   </Button>
//                                 </DialogTrigger>
//                                 <DialogContent className="max-w-2xl">
//                                   <DialogHeader>
//                                     <DialogTitle>Edit Post</DialogTitle>
//                                   </DialogHeader>
//                                   <div className="space-y-4">
//                                     <Input
//                                       defaultValue={post.title}
//                                       placeholder="Post title"
//                                       onChange={(e) =>
//                                         setEditingPost((prev) => (prev ? { ...prev, title: e.target.value } : null))
//                                       }
//                                     />
//                                     <Textarea
//                                       defaultValue={post.content}
//                                       placeholder="Post content"
//                                       className="min-h-[200px]"
//                                       onChange={(e) =>
//                                         setEditingPost((prev) => (prev ? { ...prev, content: e.target.value } : null))
//                                       }
//                                     />
//                                     <div className="flex space-x-2">
//                                       <Button
//                                         onClick={() =>
//                                           editingPost &&
//                                           handleEditPost(editingPost._id, {
//                                             title: editingPost.title,
//                                             content: editingPost.content,
//                                           })
//                                         }
//                                         className="bg-purple-600 hover:bg-purple-700"
//                                       >
//                                         Save Changes
//                                       </Button>
//                                       <Button variant="outline" onClick={() => setEditingPost(null)}>
//                                         Cancel
//                                       </Button>
//                                     </div>
//                                   </div>
//                                 </DialogContent>
//                               </Dialog>
//                               <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post._id)}>
//                                 <Trash2 className="w-4 h-4" />
//                               </Button>
//                             </div>
//                           </div>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{post.content}</p>
//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {post.tags.map((tag, tagIndex) => (
//                               <Badge key={tagIndex} variant="secondary" className="text-xs">
//                                 <Tag className="w-3 h-3 mr-1" />
//                                 {tag}
//                               </Badge>
//                             ))}
//                           </div>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2 text-gray-600">
//                               <Eye className="w-4 h-4" />
//                               <span className="text-sm">View details</span>
//                             </div>
//                             <div className="flex items-center space-x-2 text-xs text-gray-500">
//                               <Calendar className="w-4 h-4" />
//                               <span>{new Date(post.createdAt).toLocaleDateString()}</span>
//                             </div>
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No posts yet</h3>
//                       <p className="text-gray-500 mb-4">Start sharing hospital updates and health information</p>
//                       <Button onClick={() => setActiveTab("create")}>Create Your First Post</Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>

//             {/* All Posts Tab (formerly Doctor Posts Tab) */}
//             <TabsContent value="all-posts" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Stethoscope className="w-5 h-5 text-green-600" />
//                     <span>All Posts</span>
//                     <Badge variant="secondary">{allOtherPosts.length} posts</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent>
//                   {allOtherPosts.length > 0 ? (
//                     <div className="space-y-4">
//                       {allOtherPosts.map((post, index) => (
//                         <motion.div
//                           key={post._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex items-center space-x-3">
//                               <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
//                                 {post.authorType === "Doctor" ? (
//                                   <Stethoscope className="w-5 h-5 text-green-600" />
//                                 ) : (
//                                   <Building2 className="w-5 h-5 text-purple-600" />
//                                 )}
//                               </div>
//                               <div>
//                                 <p className="font-semibold">
//                                   {post.authorType === "Doctor" ? "Dr." : ""} {post.postby}
//                                 </p>
//                                 <p className="text-sm text-gray-500 capitalize">{post.authorType}</p>
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
//                               <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
//                               <span className="text-xs text-gray-500">
//                                 {new Date(post.createdAt).toLocaleDateString()}
//                               </span>
//                             </div>
//                           </div>
//                           <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
//                           <div className="flex flex-wrap gap-2 mb-4">
//                             {post.tags.map((tag, tagIndex) => (
//                               <Badge key={tagIndex} variant="secondary" className="text-xs">
//                                 #{tag}
//                               </Badge>
//                             ))}
//                           </div>
//                         </motion.div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="text-center py-12">
//                       <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
//                       <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No posts yet</h3>
//                       <p className="text-gray-500">Posts from other hospitals and doctors will appear here</p>
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
//                     <span>My Announcements</span>
//                     <Badge variant="secondary">{ownAnnouncements.length} announcements</Badge>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4 border-b pb-4 mb-4">
//                     <h3 className="text-lg font-semibold">Create New Announcement</h3>
//                     <Dialog open={isAnnouncementFormOpen} onOpenChange={setIsAnnouncementFormOpen}>
//                       <DialogTrigger asChild>
//                         <Button onClick={() => openAnnouncementForm(null)} className="w-full">
//                           <Plus className="w-4 h-4 mr-2" />
//                           Create New Announcement
//                         </Button>
//                       </DialogTrigger>
//                       <DialogContent className="sm:max-w-[425px]">
//                         <DialogHeader>
//                           <DialogTitle>{"Create New Announcement"}</DialogTitle>
//                         </DialogHeader>
//                         <div className="space-y-4">
//                           <div>
//                             <label className="block text-sm font-medium mb-2">Title *</label>
//                             <Input
//                               value={newAnnouncement.title}
//                               onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
//                               placeholder="e.g., Holiday Notice: Clinic Closed on Dec 25th"
//                               className="w-full"
//                             />
//                           </div>
//                           <div>
//                             <label className="block text-sm font-medium mb-2">Content *</label>
//                             <Textarea
//                               value={newAnnouncement.content}
//                               onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
//                               placeholder="Share important updates with your network..."
//                               className="w-full min-h-[120px]"
//                             />
//                           </div>
//                           <div className="flex space-x-2">
//                             <Button
//                               onClick={handleCreateAnnouncement}
//                               disabled={isSavingAnnouncement}
//                               className="bg-blue-600 hover:bg-blue-700"
//                             >
//                               {isSavingAnnouncement ? "Saving..." : "Save Announcement"}
//                             </Button>
//                             <Button variant="outline" onClick={closeAnnouncementForm}>
//                               Cancel
//                             </Button>
//                           </div>
//                         </div>
//                       </DialogContent>
//                     </Dialog>
//                   </div>
//                   <h3 className="text-lg font-semibold mb-4">My Published Announcements</h3>
//                   {ownAnnouncements.length > 0 ? (
//                     <div className="space-y-4">
//                       {ownAnnouncements.map((announcement, index) => (
//                         <motion.div
//                           key={announcement._id}
//                           initial={{ opacity: 0, y: 20 }}
//                           animate={{ opacity: 1, y: 0 }}
//                           transition={{ delay: index * 0.1 }}
//                           whileHover={{ scale: 1.01 }}
//                           className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
//                         >
//                           <div className="flex items-start justify-between mb-3">
//                             <div className="flex-1">
//                               <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
//                               <div className="flex items-center space-x-2 mb-2">
//                                 <Badge variant="outline">{announcement.ownerType}</Badge>
//                                 <span className="text-sm text-gray-500">Announced by: {announcement.announcedBy}</span>
//                               </div>
//                             </div>
//                             <Button
//                               variant="destructive"
//                               size="sm"
//                               onClick={() => handleDeleteAnnouncement(announcement._id)}
//                             >
//                               <Trash2 className="w-4 h-4" />
//                             </Button>
//                           </div>
//                           <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{announcement.content}</p>
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center space-x-2 text-xs text-gray-500">
//                               <Calendar className="w-4 h-4" />
//                               <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
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
//                       <p className="text-gray-500 mb-4">Share important updates with your network</p>
//                       <Button onClick={() => openAnnouncementForm(null)}>Create Your First Announcement</Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>
//           </Tabs>
//         </motion.div>
//       </div>

//       {/* Emergency Alert Response Dialog */}
//       <Dialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
//         <DialogContent className="max-w-2xl">
//           <DialogHeader>
//             <DialogTitle className="flex items-center space-x-2">
//               <AlertTriangle className="w-5 h-5 text-red-500" />
//               <span>Emergency Alert Response</span>
//             </DialogTitle>
//           </DialogHeader>
//           {selectedAlert && (
//             <div className="space-y-6">
//               <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
//                 <AlertTriangle className="h-4 w-4" />
//                 <AlertDescription className="font-semibold">
//                   🚨 EMERGENCY: Immediate medical attention required
//                 </AlertDescription>
//               </Alert>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                 <div>
//                   <h3 className="font-semibold mb-3">Patient Information</h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex items-center space-x-2">
//                       <User className="w-4 h-4 text-gray-500" />
//                       <span className="font-medium">{selectedAlert.userInfo.name}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Phone className="w-4 h-4 text-gray-500" />
//                       <span>{selectedAlert.userInfo.phone}</span>
//                     </div>
//                     <div className="flex items-center space-x-2">
//                       <Mail className="w-4 h-4 text-gray-500" />
//                       <span>{selectedAlert.userInfo.email}</span>
//                     </div>
//                   </div>
//                 </div>
//                 <div>
//                   <h3 className="font-semibold mb-3">Emergency Details</h3>
//                   <div className="space-y-2 text-sm">
//                     <div className="flex items-center space-x-2">
//                       <Badge className={getPriorityColor(selectedAlert.priority)}>
//                         {selectedAlert.priority.toUpperCase()} PRIORITY
//                       </Badge>
//                     </div>
//                     {selectedAlert.distance && (
//                       <div className="flex items-center space-x-2">
//                         <Navigation className="w-4 h-4 text-green-500" />
//                         <span className="font-semibold text-green-600">{selectedAlert.distance}km away</span>
//                       </div>
//                     )}
//                     <div className="flex items-center space-x-2">
//                       <Timer className="w-4 h-4 text-gray-500" />
//                       <span>{formatTimeAgo(selectedAlert.createdAt)}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div>
//                 <h3 className="font-semibold mb-3">Location</h3>
//                 <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
//                   <div className="flex items-start space-x-2">
//                     <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
//                     <div className="flex-1">
//                       <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">
//                         📍 {formatLocationAddress(selectedAlert.location?.address)}
//                       </p>
//                       <Button
//                         onClick={() => openGoogleMaps(selectedAlert.location?.address)}
//                         className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3"
//                       >
//                         <Map className="w-4 h-4 mr-2" />
//                         Open in Google Maps
//                         <ExternalLink className="w-3 h-3 ml-2" />
//                       </Button>
//                       {selectedAlert.location?.lat && selectedAlert.location?.lng && (
//                         <p className="text-xs text-blue-600 dark:text-blue-400">
//                           GPS Coordinates: {selectedAlert.location.lat.toFixed(6)},{" "}
//                           {selectedAlert.location.lng.toFixed(6)}
//                         </p>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {selectedAlert.message && (
//                 <div>
//                   <h3 className="font-semibold mb-3">Emergency Message</h3>
//                   <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
//                     <p className="text-gray-700 dark:text-gray-300">{selectedAlert.message}</p>
//                   </div>
//                 </div>
//               )}
//               {selectedAlert.status === "pending" && (
//                 <div className="flex space-x-4 pt-4 border-t">
//                   <Button
//                     onClick={() => handleResponse("accept")}
//                     disabled={responding}
//                     className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
//                   >
//                     {responding ? (
//                       <>
//                         <motion.div
//                           className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
//                           animate={{ rotate: 360 }}
//                           transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                         />
//                         Accepting...
//                       </>
//                     ) : (
//                       <>
//                         <CheckCircle className="w-5 h-5 mr-2" />🚑 ACCEPT & DISPATCH AMBULANCE
//                       </>
//                     )}
//                   </Button>
//                   <Button
//                     onClick={() => handleResponse("deny")}
//                     disabled={responding}
//                     variant="destructive"
//                     className="flex-1 font-semibold py-3"
//                   >
//                     {responding ? (
//                       "Processing..."
//                     ) : (
//                       <>
//                         <XCircle className="w-5 h-5 mr-2" />
//                         DECLINE
//                       </>
//                     )}
//                   </Button>
//                 </div>
//               )}
//               {selectedAlert.status === "accepted" && (
//                 <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
//                   <div className="flex items-center space-x-2">
//                     <CheckCircle className="w-5 h-5 text-green-600" />
//                     <span className="font-semibold text-green-800 dark:text-green-200">
//                       Emergency Accepted - Ambulance Dispatched
//                     </span>
//                   </div>
//                   {selectedAlert.acceptedBy && (
//                     <p className="text-sm text-green-700 dark:text-green-300 mt-2">
//                       Handled by: {selectedAlert.acceptedBy.name}
//                     </p>
//                   )}
//                 </div>
//               )}
//             </div>
//           )}
//         </DialogContent>
//       </Dialog>
//     </div>
//   )
// }











"use client"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link" // Import Link
import {
  AlertTriangle,
  Building2,
  Plus,
  MessageSquare,
  Bell,
  Send,
  UserCheck,
  Tag,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Clock,
  Shield,
  Activity,
  Stethoscope,
  User,
  Phone,
  Mail,
  Navigation,
  Timer,
  RefreshCw,
  CheckCircle,
  XCircle,
  Map,
  MapPin,
  ExternalLink,
  Megaphone,
  Share2,
  Home,
  BookOpen,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Alert, AlertDescription } from "@/components/ui/alert"
import ThemeToggle from "@/components/ThemeToggle"
import UserDropdown from "@/components/UserDropdown"
import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
import { toast } from "react-hot-toast"
import Swal from "sweetalert2"
import { useAuth } from "@/app/contexts/AuthProvider"

interface Post {
  _id: string
  title: string
  content: string
  category: string
  tags: string[]
  authorType: "Doctor" | "Hospital"
  postby: string
  email: string
  createdAt: string
  isApproved: boolean
}

interface Doctor {
  _id: string
  name: string
  email: string
  specialty: string
  isVerified: boolean
}

interface EmergencyAlert {
  _id: string
  userInfo: {
    name: string
    email: string
    phone: string
  }
  userId?: {
    name: string
    email: string
    phone: string
    address: any
  }
  location: {
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
  message: string
  priority: string
  status: string // "pending" | "accepted" | "declined" | "cancelled" | "no_response_all_contacted"
  createdAt: string
  distance?: number
  proximityMethod?: string
  acceptedBy?: {
    _id: string
    name: string
  }
  hospitalAlertStatus?: "pending" | "read" | "accepted" | "declined" | "timedOut"
}

interface HospitalData {
  _id: string
  name: string
  email: string
  phone: string
  isAvailable: boolean
  isHandleEmergency: boolean
  isVerified: boolean
  address: any
  location: {
    lat?: number
    lng?: number
  }
}

interface Announcement {
  _id: string
  ownerEmail: string
  ownerType: "doctor" | "hospital" | "user"
  title: string
  content: string
  announcedBy: string
  readBy: string[]
  createdAt: string
  updatedAt: string
}

export default function HospitalDashboard() {
  const { user } = useAuth()
  const [ownPosts, setOwnPosts] = useState<Post[]>([])
  const [allOtherPosts, setAllOtherPosts] = useState<Post[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
  const [ownAnnouncements, setOwnAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [notifications, setNotifications] = useState(0)
  const [hospital, setHospital] = useState<HospitalData | null>(null)
  const [isHandleEmergency, setIsHandleEmergency] = useState<boolean>(false)
  const [isAvailable, setIsAvailable] = useState<boolean>(false)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [selectedAlert, setSelectedAlert] = useState<EmergencyAlert | null>(null)
  const [showAlertDialog, setShowAlertDialog] = useState(false)
  const [responding, setResponding] = useState(false)
  const [lastChecked, setLastChecked] = useState<Date>(new Date())
  const [autoRefresh, setAutoRefresh] = useState(true)
  const [activeTab, setActiveTab] = useState<string | undefined>(undefined) // State to control active tab

  // State for the fixed hospital location (from DB, geocoded from address)
  const [fixedLocation, setFixedLocation] = useState<{ lat: number; lng: number } | null>(null)

  // Post creation state
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  })

  // Announcement creation state
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  })
  const [isAnnouncementFormOpen, setIsAnnouncementFormOpen] = useState(false)
  const [isSavingAnnouncement, setIsSavingAnnouncement] = useState(false)

  const categories = [
    "emergency-care",
    "hospital-services",
    "health-tips",
    "prevention",
    "treatment",
    "facilities",
    "announcements",
    "cardiology",
    "neurology",
    "pediatrics",
  ]

  // Initial data fetching and emergency alert polling
  useEffect(() => {
    const initDashboard = async () => {
      setLoading(true)
      // Fetch hospital data first to determine emergency handling capability
      const hospitalData = await fetchHospitalData()

      if (hospitalData?.isHandleEmergency) {
        setActiveTab("emergencies") // Set default tab to emergencies if handling them
      } else {
        setActiveTab("create") // Otherwise, default to create post
      }

      // Staggered fetching of other dashboard data
      setTimeout(async () => {
        await fetchOwnPostsAndAnnouncements()
      }, 1000) // 1 second delay

      setTimeout(async () => {
        await fetchAllOtherPosts()
      }, 2000) // 2 second delay

      if (hospitalData?.isHandleEmergency) {
        setTimeout(async () => {
          await fetchEmergencyAlerts() // Fetch alerts only if handling emergencies
        }, 3000) // 3 second delay
      }
      setLoading(false) // Set loading to false after all initial fetches are initiated
    }

    initDashboard()

    // Polling for alerts (existing logic)
    const interval = setInterval(() => {
      if (autoRefresh && isHandleEmergency) {
        fetchEmergencyAlerts()
      }
    }, 30000)

    return () => clearInterval(interval)
  }, [autoRefresh, isHandleEmergency])

  // Effect to trigger fixed location geocoding after a delay if not already set
  useEffect(() => {
    if (hospital && !hospital.location?.lat && !hospital.location?.lng) {
      console.log("Hospital fixed location not set. Initiating geocoding in 4 minutes...")
      // Using 5 seconds for demonstration. For production, use 4 * 60 * 1000 (4 minutes).
      const geocodeTimer = setTimeout(() => {
        console.log("4 minutes passed. Attempting to geocode hospital address.")
        triggerFixedLocationGeocoding(hospital._id)
      }, 5 * 1000)
      return () => clearTimeout(geocodeTimer)
    }
  }, [hospital]) // Re-run when hospital data changes

  const triggerFixedLocationGeocoding = async (hospitalId: string) => {
    try {
      const response = await fetch("/api/hospital/update-fixed-location", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ hospitalId }),
      })
      const data = await response.json()
      if (response.ok && data.success) {
        // No toast message here, just update the UI
        fetchHospitalData() // Re-fetch hospital data to update the UI with the new fixed location
      } else {
        console.error("Failed to update fixed location:", data.message)
        // Optionally, log this error but don't show a toast to the user for this background process
      }
    } catch (error) {
      console.error("Error triggering fixed location geocoding:", error)
      // Optionally, log this error
    }
  }

  const fetchHospitalData = async () => {
    try {
      const response = await fetch("/api/hospital/me")
      if (response.ok) {
        const result = await response.json()
        if (result.success) {
          setHospital(result.data)
          setIsHandleEmergency(result.data.isHandleEmergency)
          setIsAvailable(result.data.isAvailable)
          // Set fixed location from fetched hospital data if available
          if (result.data.location?.lat && result.data.location?.lng) {
            setFixedLocation(result.data.location)
          }
          console.log("Hospital data:", result.data)
          console.log("isHandleEmergency:", result.data.isHandleEmergency)
          return result.data // Return hospital data for initial tab setting
        }
      } else {
        console.error("Failed to fetch hospital data")
        toast.error("Failed to load hospital settings")
      }
    } catch (error) {
      console.error("Error fetching hospital data:", error)
      toast.error("Error loading hospital data")
    }
    return null
  }

  const fetchOwnPostsAndAnnouncements = async () => {
    try {
      const [ownPostsRes, ownAnnouncementsRes] = await Promise.all([
        fetch("/api/hospital/own-posts"),
        fetch("/api/announcements/own"), // Fetch own announcements
      ])

      if (ownPostsRes.ok) {
        const ownPostsData = await ownPostsRes.json()
        setOwnPosts(ownPostsData.data || [])
      }
      if (ownAnnouncementsRes.ok) {
        const ownAnnouncementsData = await ownAnnouncementsRes.json()
        setOwnAnnouncements(ownAnnouncementsData.data || [])
      }
    } catch (error) {
      console.error("Error fetching own posts or announcements:", error)
    }
  }

  const fetchAllOtherPosts = async () => {
    try {
      const allOtherPostsRes = await fetch("/api/posts") // Fetch all posts for "All Posts" tab
      if (allOtherPostsRes.ok) {
        const allOtherPostsData = await allOtherPostsRes.json()
        // Filter out own posts from allOtherPosts based on user's email
        setAllOtherPosts(allOtherPostsData.data.filter((post: Post) => post.email !== user?.email) || [])
      }
    } catch (error) {
      console.error("Error fetching all other posts:", error)
    }
  }

  // const fetchEmergencyAlerts = async () => {
  //   if (!isHandleEmergency) return

  //   try {
  //     console.log("🔄 Fetching emergency alerts...")
  //     const response = await fetch("/api/hospital/emergency-alerts")
  //     const data = await response.json()

  //     if (response.ok) {
  //       // Only show pending, read, or accepted alerts
  //       const relevantAlerts =
  //         data.alerts?.filter(
  //           (alert: EmergencyAlert) =>
  //             alert.hospitalAlertStatus === "pending" ||
  //             alert.hospitalAlertStatus === "read" ||
  //             alert.status === "accepted",
  //         ) || []
  //       setEmergencyAlerts(relevantAlerts)
  //       setNotifications(
  //         relevantAlerts.filter((alert: EmergencyAlert) => alert.hospitalAlertStatus === "pending").length || 0,
  //       )
  //       setLastChecked(new Date())
  //       console.log(`✅ Found ${relevantAlerts.length || 0} nearby emergency alerts`)

  //       if (relevantAlerts.length > 0) {
  //         const criticalPendingAlerts = relevantAlerts.filter(
  //           (alert: EmergencyAlert) => alert.priority === "critical" && alert.hospitalAlertStatus === "pending",
  //         )
  //         if (criticalPendingAlerts.length > 0) {
  //           toast.error(`🚨 ${criticalPendingAlerts.length} CRITICAL emergency alert(s) nearby!`, {
  //             duration: 8000,
  //           })
  //         }
  //       }
  //     } else {
  //       console.error("❌ Failed to fetch emergency alerts:", data.message)
  //     }
  //   } catch (error) {
  //     console.error("💥 Error fetching emergency alerts:", error)
  //   }
  // }




  const fetchEmergencyAlerts = async () => {
  if (!isHandleEmergency || !isAvailable) return

  try {
    console.log("🔄 Fetching emergency alerts...")
    const response = await fetch("/api/hospital/emergency-alerts")

    if (!response.ok) {
      console.error("❌ Failed to fetch alerts:", response.status)
      return
    }

    const data = await response.json()

    const relevantAlerts =
      data.alerts?.filter(
        (alert: EmergencyAlert) =>
          alert.hospitalAlertStatus === "pending" ||
          alert.hospitalAlertStatus === "read" ||
          alert.status === "accepted",
      ) || []

    setEmergencyAlerts(relevantAlerts)
    setNotifications(
      relevantAlerts.filter((alert: EmergencyAlert) => alert.hospitalAlertStatus === "pending").length || 0,
    )
    setLastChecked(new Date())
    console.log(`✅ Found ${relevantAlerts.length || 0} nearby emergency alerts`)

    const criticalPendingAlerts = relevantAlerts.filter(
      (alert: EmergencyAlert) => alert.priority === "critical" && alert.hospitalAlertStatus === "pending",
    )

    if (criticalPendingAlerts.length > 0) {
      toast.error(`🚨 ${criticalPendingAlerts.length} CRITICAL emergency alert(s) nearby!`, {
        duration: 8000,
      })
    }
  } catch (error) {
    console.error("💥 Error fetching emergency alerts:", error)
  }
}



  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content || !newPost.category) {
      toast.error("Please fill in all required fields")
      return
    }

    try {
      console.log("\n in /api/hospital/create-post Creating new post:", newPost)
      const response = await fetch("/api/hospital/create-post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newPost.title,
          content: newPost.content,
          category: newPost.category,
          tags: newPost.tags
            .split(",")
            .map((tag) => tag.trim())
            .filter((tag) => tag),
        }),
      })

      if (response.ok) {
        toast.success("✅ Post created successfully! Awaiting admin approval.")
        setNewPost({
          title: "",
          content: "",
          category: "",
          tags: "",
        })
        fetchOwnPostsAndAnnouncements() // Refresh own posts
      } else {
        toast.error("Failed to create post")
      }
    } catch (error) {
      toast.error("Error creating post")
    }
  }

  const handleEditPost = async (postId: string, updatedData: Partial<Post>) => {
    try {
      const response = await fetch("/api/hospital/edit-post", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, ...updatedData }),
      })

      if (response.ok) {
        toast.success("✅ Post updated successfully!")
        setEditingPost(null)
        fetchOwnPostsAndAnnouncements() // Refresh own posts
      } else {
        toast.error("Failed to update post")
      }
    } catch (error) {
      toast.error("Error updating post")
    }
  }

  const handleDeletePost = async (postId: string) => {
    const confirmation = await Swal.fire({
      title: "Are you sure?",
      text: "This action will permanently delete the post.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    })

    if (!confirmation.isConfirmed) return

    try {
      const response = await fetch("/api/hospital/delete-post", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      })

      if (response.ok) {
        Swal.fire("Deleted!", "Your post has been deleted.", "success")
        fetchOwnPostsAndAnnouncements() // Refresh own posts
      } else {
        Swal.fire("Failed", "Unable to delete post.", "error")
      }
    } catch (error) {
      Swal.fire("Error", "An error occurred while deleting the post.", "error")
    }
  }

  const handleToggleAvailability = async () => {
    try {
      const response = await fetch("/api/hospital/toggle-availability", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isAvailable: !isAvailable }),
      })

      if (response.ok) {
        setIsAvailable(!isAvailable)
        toast.success(`🏥 Hospital is now ${!isAvailable ? "available" : "unavailable"} for emergencies`)
      } else {
        toast.error("Failed to update availability")
      }
    } catch (error) {
      toast.error("Error updating availability")
    }
  }

  const handleAlertClick = (alert: EmergencyAlert) => {
    setSelectedAlert(alert)
    setShowAlertDialog(true)
  }

  const handleResponse = async (action: "accept" | "deny") => {
    if (!selectedAlert) return
    setResponding(true)

    try {
      const response = await fetch("/api/hospital/emergency-alerts/respond", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          alertId: selectedAlert._id,
          action,
        }),
      })
      const data = response.headers.get("content-type")?.includes("application/json")
        ? await response.json()
        : { message: response.statusText || "An unexpected error occurred." }

      if (response.ok) {
        if (action === "accept") {
          toast.success(`✅ Emergency accepted! Patient: ${selectedAlert.userInfo.name}`)
          toast.success("🚑 Ambulance dispatched! Patient will be notified.")
          // Alert remains in list, its status will be updated on next fetchEmergencyAlerts
        } else {
          toast.success("❌ Emergency declined")
          // Remove declined alert from local state immediately
          setEmergencyAlerts((prevAlerts) => prevAlerts.filter((alert) => alert._id !== selectedAlert._id))
        }
        setShowAlertDialog(false)
        setSelectedAlert(null)
        fetchEmergencyAlerts() // Refresh the list to reflect status changes
      } else {
        toast.error(data.message || "Failed to respond to emergency")
      }
    } catch (error) {
      console.error("Error responding to emergency:", error)
      toast.error("Failed to respond to emergency")
    } finally {
      setResponding(false)
    }
  }

  const handleRemoveAlertFromView = async (alertId: string) => {
    const result = await Swal.fire({
      title: "Remove Alert?",
      text: "This will remove the alert from your dashboard view. It will not affect the patient's alert status.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
    })

    if (!result.isConfirmed) return

    setEmergencyAlerts((prevAlerts) => prevAlerts.filter((alert) => alert._id !== alertId))
    toast.success("Alert removed from view.")
  }

  const handleCreateAnnouncement = async () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast.error("Please fill in all required fields for the announcement.")
      return
    }
    setIsSavingAnnouncement(true)
    try {
      const response = await fetch("/api/announcements/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newAnnouncement.title,
          content: newAnnouncement.content,
          ownerType: "hospital",
        }),
      })

      if (response.ok) {
        toast.success("✅ Announcement created successfully!")
        setNewAnnouncement({ title: "", content: "" })
        closeAnnouncementForm()
        fetchOwnPostsAndAnnouncements() // Refresh own announcements
      } else {
        toast.error("Failed to create announcement")
      }
    } catch (error) {
      toast.error("Error creating announcement")
    } finally {
      setIsSavingAnnouncement(false)
    }
  }

  const handleDeleteAnnouncement = async (announcementId: string) => {
    const result = await Swal.fire({
      title: "🗑️ Delete Announcement?",
      text: "Are you sure you want to permanently delete this announcement?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it",
    })

    if (!result.isConfirmed) return

    try {
      const response = await fetch("/api/announcements/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: announcementId }),
      })

      if (response.ok) {
        Swal.fire("Deleted!", "Announcement has been deleted.", "success")
        fetchOwnPostsAndAnnouncements() // Refresh own announcements
      } else {
        Swal.fire("Failed", "Unable to delete announcement.", "error")
      }
    } catch (error) {
      Swal.fire("Error", "Something went wrong while deleting the announcement.", "error")
    }
  }

  const openAnnouncementForm = (announcement: Announcement | null) => {
    setNewAnnouncement({
      title: announcement?.title || "",
      content: announcement?.content || "",
    })
    setIsAnnouncementFormOpen(true)
  }

  const closeAnnouncementForm = () => {
    setIsAnnouncementFormOpen(false)
    setNewAnnouncement({ title: "", content: "" })
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

  const formatLocationAddress = (address: any) => {
    if (!address) return ""
    const parts = [
      address.street,
      address.area,
      address.townOrVillage,
      address.taluka,
      address.district,
      address.state || "Gujarat",
      address.pincode,
    ].filter(Boolean)
    return parts.join(", ")
  }

  // const openGoogleMaps = (location: { lat?: number; lng?: number; address?: any }) => {
  //   if (!location || (!location.lat && !location.lng && !location.address)) {
  //     toast.error("Location data not available for mapping.")
  //     return
  //   }

  //   let googleMapsUrl = ""
  //   if (location.lat && location.lng) {
  //     googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
  //     toast.success("🗺️ Opening location in Google Maps via GPS...")
  //   } else if (location.address) {
  //     const searchQuery = formatLocationAddress(location.address)
  //     if (searchQuery) {
  //       googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(searchQuery)}`
  //       toast.success("🗺️ Opening location in Google Maps via address...")
  //     } else {
  //       toast.error("Insufficient address details for mapping.")
  //       return
  //     }
  //   } else {
  //     toast.error("No valid location data to open in Google Maps.")
  //     return
  //   }
  //   window.open(googleMapsUrl, "_blank")
  // }


  const openGoogleMaps = (location: { lat?: number; lng?: number; address?: any }) => {
  if (!location || (!location.lat && !location.lng && !location.address)) {
    toast.error("⚠️ Location data not available for mapping.");
    return;
  }

  let googleMapsUrl = "";

  // Prefer GPS coordinates
  if (location.lat && location.lng) {
    googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`;
    toast.success("📍 Opening location in Google Maps via GPS...");
  } 
  
  // Fallback to formatted address
  else if (location.address) {
    const formattedAddress = formatLocationAddress(location.address);
    if (formattedAddress && formattedAddress.trim() !== "") {
      googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(formattedAddress)}`;
      toast.success("🏠 Opening location in Google Maps via address...");
    } else {
      toast.error("⚠️ Insufficient address details for mapping.");
      return;
    }
  } 
  
  // Safety fallback
  else {
    toast.error("⚠️ No valid location data to open in Google Maps.");
    return;
  }

  window.open(googleMapsUrl, "_blank");
};


  const handleShareAlert = (alert: EmergencyAlert) => {
    const patientName = alert.userInfo.name
    const patientPhone = alert.userInfo.phone
    const patientAddress = alert.location?.address ? formatLocationAddress(alert.location.address) : "N/A"
    const lat = alert.location?.lat?.toFixed(6) || "N/A"
    const lng = alert.location?.lng?.toFixed(6) || "N/A"

    let message = `🚨 Emergency Patient Details:\n`
    message += `Name: ${patientName}\n`
    message += `Phone: ${patientPhone}\n`
    message += `Address: ${patientAddress}\n`
    if (alert.location?.lat && alert.location?.lng) {
      message += `GPS: ${lat}, ${lng}\n`
      message += `Google Maps: https://www.google.com/maps/search/?api=1&query=${lat},${lng}\n`
    }
    message += `Message: ${alert.message || "Immediate assistance needed!"}`

    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
    toast.success("Sharing patient details via WhatsApp!")
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading hospital dashboard...</p>
        </div>
      </div>
    )
  }

  const quickStatsGridCols = isHandleEmergency ? "grid-cols-1 md:grid-cols-5" : "grid-cols-1 md:grid-cols-4"
  const tabsListGridCols = isHandleEmergency ? "grid-cols-5" : "grid-cols-4"

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header with Animated Icons */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
        <AnimatedHealthIcons />
        <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">

                     {/* <Link href="/" passHref>
                          <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400">
                            <Home className="w-6 h-6" />
                            <span className="sr-only">Home</span>
                          </Button>
                        </Link> */}

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



            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
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
              <Building2 className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Hospital Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {isHandleEmergency ? "Manage emergency care & health content" : "Manage health content"}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            {/* Emergency controls - Only show if hospital handles emergencies */}
            {isHandleEmergency && (
              <>
                <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                  <Clock className="w-4 h-4" />
                  <span>Last checked: {lastChecked.toLocaleTimeString()}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={fetchEmergencyAlerts}
                  className="flex items-center space-x-2 bg-transparent"
                >
                  <RefreshCw className="w-4 h-4" />
                  <span>Refresh</span>
                </Button>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">Available for emergencies</span>
                  <Switch
                    checked={isAvailable}
                    onCheckedChange={handleToggleAvailability}
                    disabled={!isHandleEmergency}
                  />
                </div>
              </>
            )}
            <motion.div className="relative" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Bell className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              {notifications > 0 && isHandleEmergency && (
                <motion.span
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
                >
                  {notifications}
                </motion.span>
              )}
            </motion.div>
            <ThemeToggle />
            <UserDropdown />
          </div>
        </div>
      </header>

      {/* Emergency Alerts Banner - Only show if hospital handles emergencies and there are pending alerts */}
      {notifications > 0 && isHandleEmergency && (
        <motion.div
          className="bg-red-500 text-white py-2 px-6 flex items-center justify-between sticky top-[70px] z-30 shadow-md" // Adjusted top for header height
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5" />
            <span className="font-semibold">
              {notifications} New Emergency Alert{notifications > 1 ? "s" : ""}!
            </span>
          </div>
          <Button
            onClick={() => setActiveTab("emergencies")} // Set active tab to emergencies
            className="bg-white text-red-600 hover:bg-gray-100 px-4 py-1 rounded-md text-sm font-medium"
          >
            View Alerts
          </Button>
        </motion.div>
      )}

      <div className="container mx-auto px-6 py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome, {user?.name}! 🏥</h2>
          <p className="text-gray-600 dark:text-gray-400">
            {isHandleEmergency
              ? "Manage emergency responses and share important health information with the community."
              : "Share important health information and connect with the medical community."}
          </p>
          {/* Debug info - remove in production */}
          <div className="mt-2 text-xs text-gray-500">
            Emergency Handling: {isHandleEmergency ? "Enabled" : "Disabled"} | Available: {isAvailable ? "Yes" : "No"}
          </div>
          {/* Display fixed location */}
          {fixedLocation ? (
            <p className="text-sm text-gray-500 mt-2">
              📍 Fixed Location (from address): {fixedLocation.lat.toFixed(4)}, {fixedLocation.lng.toFixed(4)}
            </p>
          ) : (
            <p className="text-sm text-gray-500 mt-2">📍 Fixed Location: Not yet available</p>
          )}
          {/* Link to All Hospitals Page */}
          <Link href="/all-hospitals" passHref>
            <Button variant="outline" className="mt-4 bg-transparent">
              <Building2 className="w-4 h-4 mr-2" /> View All Hospitals
            </Button>
          </Link>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className={`grid ${quickStatsGridCols} gap-6 mb-8`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Emergency Alerts Card - Only show if hospital handles emergencies */}
          {isHandleEmergency && (
            <motion.div whileHover={{ scale: 1.02, y: -5 }}>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Emergency Alerts</p>
                      <p className="text-2xl font-bold text-red-600">{emergencyAlerts.length}</p>
                      <p className="text-xs text-gray-500">{notifications} pending</p>
                    </div>
                    <motion.div
                      className="w-12 h-12 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center"
                      animate={{
                        scale: notifications > 0 ? [1, 1.2, 1] : 1,
                      }}
                      transition={{ duration: 2, repeat: notifications > 0 ? Number.POSITIVE_INFINITY : 0 }}
                    >
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          <motion.div whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">My Posts</p>
                    <p className="text-2xl font-bold text-purple-600">{ownPosts.length}</p>
                    <p className="text-xs text-gray-500">Published content</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <MessageSquare className="w-6 h-6 text-purple-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* All Posts Card */}
          <motion.div whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">All Posts</p>
                    <p className="text-2xl font-bold text-blue-600">{allOtherPosts.length}</p>
                    <p className="text-xs text-gray-500">Community content</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
          {/* My Announcements Card */}
          <motion.div whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">My Announcements</p>
                    <p className="text-2xl font-bold text-blue-600">{ownAnnouncements.length}</p>
                    <p className="text-xs text-gray-500 mt-1">Shared updates</p>
                  </div>
                  <motion.div
                    className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Megaphone className="w-6 h-6 text-blue-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Status Card - Only show if hospital handles emergencies */}
          {isHandleEmergency && (
            <motion.div whileHover={{ scale: 1.02, y: -5 }}>
              <Card className="hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                      <p className={`text-2xl font-bold ${isAvailable ? "text-green-600" : "text-red-600"}`}>
                        {isAvailable ? "Available" : "Unavailable"}
                      </p>
                      <p className="text-xs text-gray-500">Emergency services</p>
                    </div>
                    <motion.div
                      className={`w-12 h-12 ${
                        isAvailable ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                      } rounded-full flex items-center justify-center`}
                      animate={{
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Activity className={`w-6 h-6 ${isAvailable ? "text-green-600" : "text-red-600"}`} />
                    </motion.div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className={`grid w-full ${tabsListGridCols}`}>
              {isHandleEmergency && <TabsTrigger value="emergencies">Emergency Alerts</TabsTrigger>}
              <TabsTrigger value="create">Create Post</TabsTrigger>
              <TabsTrigger value="own-posts">Own Posts</TabsTrigger>
              <TabsTrigger value="all-posts">All Posts</TabsTrigger>
              <TabsTrigger value="announcements">Announcements</TabsTrigger>
            </TabsList>

            {/* Emergency Alerts Tab - Only show if hospital handles emergencies */}
            {isHandleEmergency && (
              <TabsContent value="emergencies" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Shield className="w-5 h-5" />
                        <span>Emergency Alerts</span>
                        <Badge variant="destructive">{notifications} pending</Badge>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setAutoRefresh(!autoRefresh)}
                        className={autoRefresh ? "bg-green-50 border-green-200" : ""}
                      >
                        Auto-refresh {autoRefresh ? "ON" : "OFF"}
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {emergencyAlerts.length > 0 ? (
                      <div className="space-y-4">
                        {emergencyAlerts.map((alert, index) => (
                          <motion.div
                            key={alert._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className={`border rounded-lg p-4 hover:shadow-lg transition-all duration-300 cursor-pointer ${
                              alert.hospitalAlertStatus === "pending"
                                ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
                                : alert.status === "accepted"
                                  ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                                  : "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800" // Default for read/other
                            }`}
                            onClick={() => handleAlertClick(alert)}
                          >
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center space-x-3 mb-3">
                                  <motion.div
                                    className={`w-3 h-3 rounded-full ${
                                      alert.hospitalAlertStatus === "pending"
                                        ? "bg-red-500"
                                        : alert.status === "accepted"
                                          ? "bg-green-500"
                                          : "bg-gray-500"
                                    }`}
                                    animate={{ scale: alert.hospitalAlertStatus === "pending" ? [1, 1.2, 1] : 1 }}
                                    transition={{
                                      duration: 1,
                                      repeat: alert.hospitalAlertStatus === "pending" ? Number.POSITIVE_INFINITY : 0,
                                    }}
                                  />
                                  <h3
                                    className={`font-semibold text-lg ${
                                      alert.hospitalAlertStatus === "pending"
                                        ? "text-red-800 dark:text-red-200"
                                        : alert.status === "accepted"
                                          ? "text-green-800 dark:text-green-200"
                                          : "text-gray-800 dark:text-gray-200"
                                    }`}
                                  >
                                    🚨 EMERGENCY ALERT
                                  </h3>
                                  <Badge className={getPriorityColor(alert.priority)}>
                                    {alert.priority.toUpperCase()}
                                  </Badge>
                                  {alert.status === "accepted" && (
                                    <Badge variant="default" className="bg-green-600">
                                      ACCEPTED
                                    </Badge>
                                  )}
                                  {alert.hospitalAlertStatus === "read" && alert.status === "pending" && (
                                    <Badge variant="outline" className="bg-yellow-600 text-white">
                                      VIEWED
                                    </Badge>
                                  )}
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                  <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                      Patient Information
                                    </h4>
                                    <div className="space-y-1 text-sm">
                                      <div className="flex items-center space-x-2">
                                        <User className="w-4 h-4 text-gray-500" />
                                        <span>{alert.userInfo.name}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Phone className="w-4 h-4 text-gray-500" />
                                        <span>{alert.userInfo.phone}</span>
                                      </div>
                                      <div className="flex items-center space-x-2">
                                        <Mail className="w-4 h-4 text-gray-500" />
                                        <span>{alert.userInfo.email}</span>
                                      </div>
                                    </div>
                                  </div>
                                  <div>
                                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                                      Location & Distance
                                    </h4>
                                    <div className="space-y-1 text-sm">
                                      {alert.distance && (
                                        <div className="flex items-center space-x-2">
                                          <Navigation className="w-4 h-4 text-green-500" />
                                          <span className="font-semibold text-green-600">{alert.distance}km away</span>
                                          {alert.proximityMethod && (
                                            <span className="text-xs text-gray-500">({alert.proximityMethod})</span>
                                          )}
                                        </div>
                                      )}
                                      {/* Google Maps Integration */}
                                      <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                                        <div className="flex items-start space-x-2">
                                          <MapPin className="w-4 h-4 text-blue-500 mt-0.5" />
                                          <div className="flex-1">
                                            <p className="font-medium text-blue-800 dark:text-blue-200 text-sm">
                                              Patient Location:
                                            </p>
                                            <p className="text-blue-700 dark:text-blue-300 text-sm mb-2">
                                              📍{" "}
                                              {alert.location?.lat && alert.location?.lng
                                                ? `GPS: ${alert.location.lat.toFixed(4)}, ${alert.location.lng.toFixed(4)}`
                                                : formatLocationAddress(alert.location?.address) ||
                                                  "Location details not available"}
                                            </p>
                                            {/* Google Maps Rectangle Button */}
                                            <motion.button
                                              whileHover={{ scale: 1.02 }}
                                              whileTap={{ scale: 0.98 }}
                                              onClick={(e) => {
                                                e.stopPropagation()
                                                openGoogleMaps(alert.location)
                                              }}
                                              className="w-full bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md text-sm font-medium flex items-center justify-center space-x-2 transition-colors"
                                            >
                                              <Map className="w-4 h-4" />
                                              <span>Open in Google Maps</span>
                                              <ExternalLink className="w-3 h-3" />
                                            </motion.button>
                                            {alert.location?.lat && alert.location?.lng && (
                                              <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
                                                GPS: {alert.location.lat.toFixed(4)}, {alert.location.lng.toFixed(4)}
                                              </p>
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center justify-between">
                                  <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                    <Timer className="w-4 h-4" />
                                    <span>{formatTimeAgo(alert.createdAt)}</span>
                                  </div>
                                  <div className="flex space-x-2">
                                    {alert.hospitalAlertStatus === "pending" && (
                                      <Button
                                        size="sm"
                                        variant="destructive"
                                        onClick={(e) => {
                                          e.stopPropagation()
                                          handleAlertClick(alert)
                                        }}
                                        className="animate-pulse"
                                      >
                                        🚨 RESPOND NOW
                                      </Button>
                                    )}
                                    {alert.status === "accepted" && (
                                      <>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleShareAlert(alert)
                                          }}
                                          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50"
                                        >
                                          <Share2 className="w-4 h-4 mr-1" />
                                          Share
                                        </Button>
                                        <Button
                                          size="sm"
                                          variant="outline"
                                          onClick={(e) => {
                                            e.stopPropagation()
                                            handleRemoveAlertFromView(alert._id)
                                          }}
                                          className="text-red-600 hover:text-red-800 hover:bg-red-50"
                                        >
                                          <Trash2 className="w-4 h-4" />
                                          Remove
                                        </Button>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <AlertTriangle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                          No Emergency Alerts
                        </h3>
                        <p className="text-gray-500">No emergency alerts in your area at the moment</p>
                        <p className="text-sm text-gray-400 mt-2">System checks every 30 seconds for new alerts</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
            )}

            {/* Create Post Tab */}
            <TabsContent value="create" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Plus className="w-5 h-5" />
                    <span>Create New Hospital Post</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Post Title *</label>
                    <Input
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      placeholder="e.g., New Emergency Department Now Open 24/7"
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Content *</label>
                    <Textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      placeholder="Share hospital updates, health tips, or important announcements..."
                      className="w-full min-h-[200px]"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category *</label>
                      <Select
                        value={newPost.category}
                        onValueChange={(value) => setNewPost({ ...newPost, category: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category.replace("-", " ").replace(/\b\w/g, (l) => l.toUpperCase())}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
                    <Input
                      value={newPost.tags}
                      onChange={(e) => setNewPost({ ...newPost, tags: e.target.value })}
                      placeholder="e.g., emergency-care, cardiology, 24-7-service, health-tips"
                      className="w-full"
                    />
                  </div>
                  <Button
                    onClick={handleCreatePost}
                    className="w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Create Post
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Own Posts Tab */}
            <TabsContent value="own-posts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building2 className="w-5 h-5 text-purple-600" />
                    <span>My Posts</span>
                    <Badge variant="secondary">{ownPosts.length} posts</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {ownPosts.length > 0 ? (
                    <div className="space-y-4">
                      {ownPosts.map((post, index) => (
                        <motion.div
                          key={post._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                          className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
                                <Badge variant={post.isApproved ? "default" : "destructive"}>
                                  {post.isApproved ? "Approved" : "Pending"}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
                                    <Edit className="w-4 h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-2xl">
                                  <DialogHeader>
                                    <DialogTitle>Edit Post</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <Input
                                      defaultValue={post.title}
                                      placeholder="Post title"
                                      onChange={(e) =>
                                        setEditingPost((prev) => (prev ? { ...prev, title: e.target.value } : null))
                                      }
                                    />
                                    <Textarea
                                      defaultValue={post.content}
                                      placeholder="Post content"
                                      className="min-h-[200px]"
                                      onChange={(e) =>
                                        setEditingPost((prev) => (prev ? { ...prev, content: e.target.value } : null))
                                      }
                                    />
                                    <div className="flex space-x-2">
                                      <Button
                                        onClick={() =>
                                          editingPost &&
                                          handleEditPost(editingPost._id, {
                                            title: editingPost.title,
                                            content: editingPost.content,
                                          })
                                        }
                                        className="bg-purple-600 hover:bg-purple-700"
                                      >
                                        Save Changes
                                      </Button>
                                      <Button variant="outline" onClick={() => setEditingPost(null)}>
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post._id)}>
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{post.content}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Eye className="w-4 h-4" />
                              <span className="text-sm">View details</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No posts yet</h3>
                      <p className="text-gray-500 mb-4">Start sharing hospital updates and health information</p>
                      <Button onClick={() => setActiveTab("create")}>Create Your First Post</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* All Posts Tab (formerly Doctor Posts Tab) */}
            <TabsContent value="all-posts" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Stethoscope className="w-5 h-5 text-green-600" />
                    <span>All Posts</span>
                    <Badge variant="secondary">{allOtherPosts.length} posts</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {allOtherPosts.length > 0 ? (
                    <div className="space-y-4">
                      {allOtherPosts.map((post, index) => (
                        <motion.div
                          key={post._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                          className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-center space-x-3">
                              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                                {post.authorType === "Doctor" ? (
                                  <Stethoscope className="w-5 h-5 text-green-600" />
                                ) : (
                                  <Building2 className="w-5 h-5 text-purple-600" />
                                )}
                              </div>
                              <div>
                                <p className="font-semibold">
                                  {post.authorType === "Doctor" ? "Dr." : ""} {post.postby}
                                </p>
                                <p className="text-sm text-gray-500 capitalize">{post.authorType}</p>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge variant="outline">{post.category.replace("-", " ")}</Badge>
                              <span className="text-xs text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <h3 className="font-semibold text-lg mb-2">{post.title}</h3>
                          <p className="text-gray-700 dark:text-gray-300 mb-4">{post.content}</p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                #{tag}
                              </Badge>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Stethoscope className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">No posts yet</h3>
                      <p className="text-gray-500">Posts from other hospitals and doctors will appear here</p>
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
                    <span>My Announcements</span>
                    <Badge variant="secondary">{ownAnnouncements.length} announcements</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4 border-b pb-4 mb-4">
                    <h3 className="text-lg font-semibold">Create New Announcement</h3>
                    <Dialog open={isAnnouncementFormOpen} onOpenChange={setIsAnnouncementFormOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => openAnnouncementForm(null)} className="w-full">
                          <Plus className="w-4 h-4 mr-2" />
                          Create New Announcement
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>{"Create New Announcement"}</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Title *</label>
                            <Input
                              value={newAnnouncement.title}
                              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                              placeholder="e.g., Holiday Notice: Clinic Closed on Dec 25th"
                              className="w-full"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Content *</label>
                            <Textarea
                              value={newAnnouncement.content}
                              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                              placeholder="Share important updates with your network..."
                              className="w-full min-h-[120px]"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <Button
                              onClick={handleCreateAnnouncement}
                              disabled={isSavingAnnouncement}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              {isSavingAnnouncement ? "Saving..." : "Save Announcement"}
                            </Button>
                            <Button variant="outline" onClick={closeAnnouncementForm}>
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <h3 className="text-lg font-semibold mb-4">My Published Announcements</h3>
                  {ownAnnouncements.length > 0 ? (
                    <div className="space-y-4">
                      {ownAnnouncements.map((announcement, index) => (
                        <motion.div
                          key={announcement._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                          className="border rounded-lg p-4 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex-1">
                              <h3 className="font-semibold text-lg mb-2">{announcement.title}</h3>
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline">{announcement.ownerType}</Badge>
                                <span className="text-sm text-gray-500">Announced by: {announcement.announcedBy}</span>
                              </div>
                            </div>
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleDeleteAnnouncement(announcement._id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">{announcement.content}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
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
                      <p className="text-gray-500 mb-4">Share important updates with your network</p>
                      <Button onClick={() => openAnnouncementForm(null)}>Create Your First Announcement</Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>

      {/* Emergency Alert Response Dialog */}
      {/* <Dialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Emergency Alert Response</span>
            </DialogTitle>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-6">
              <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="font-semibold">
                  🚨 EMERGENCY: Immediate medical attention required
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Patient Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{selectedAlert.userInfo.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{selectedAlert.userInfo.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{selectedAlert.userInfo.email}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Emergency Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(selectedAlert.priority)}>
                        {selectedAlert.priority.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                    {selectedAlert.distance && (
                      <div className="flex items-center space-x-2">
                        <Navigation className="w-4 h-4 text-green-500" />
                        <span className="font-semibold text-green-600">{selectedAlert.distance}km away</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Timer className="w-4 h-4 text-gray-500" />
                      <span>{formatTimeAgo(selectedAlert.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-3">Location</h3>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
                    <div className="flex-1">
                      <p className="font-medium text-blue-800 dark:text-blue-200 mb-2">
                        📍 {formatLocationAddress(selectedAlert.location?.address)}
                      </p>
                      <Button
                        onClick={() => openGoogleMaps(selectedAlert.location?.address)}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white mb-3"
                      >
                        <Map className="w-4 h-4 mr-2" />
                        Open in Google Maps
                        <ExternalLink className="w-3 h-3 ml-2" />
                      </Button>
                      {selectedAlert.location?.lat && selectedAlert.location?.lng && (
                        <p className="text-xs text-blue-600 dark:text-blue-400">
                          GPS Coordinates: {selectedAlert.location.lat.toFixed(6)},{" "}
                          {selectedAlert.location.lng.toFixed(6)}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              {selectedAlert.message && (
                <div>
                  <h3 className="font-semibold mb-3">Emergency Message</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300">{selectedAlert.message}</p>
                  </div>
                </div>
              )}
              {selectedAlert.status === "pending" && (
                <div className="flex space-x-4 pt-4 border-t">
                  <Button
                    onClick={() => handleResponse("accept")}
                    disabled={responding}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                  >
                    {responding ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        Accepting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />🚑 ACCEPT & DISPATCH AMBULANCE
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleResponse("deny")}
                    disabled={responding}
                    variant="destructive"
                    className="flex-1 font-semibold py-3"
                  >
                    {responding ? (
                      "Processing..."
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 mr-2" />
                        DECLINE
                      </>
                    )}
                  </Button>
                </div>
              )}
              {selectedAlert.status === "accepted" && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800 dark:text-green-200">
                      Emergency Accepted - Ambulance Dispatched
                    </span>
                  </div>
                  {selectedAlert.acceptedBy && (
                    <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                      Handled by: {selectedAlert.acceptedBy.name}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog> */}








       <Dialog open={showAlertDialog} onOpenChange={setShowAlertDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5 text-red-500" />
              <span>Emergency Alert Response</span>
            </DialogTitle>
          </DialogHeader>
          {selectedAlert && (
            <div className="space-y-6">
              <Alert className="border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20">
                <AlertTriangle className="h-4 w-4" />
                <AlertDescription className="font-semibold">
                  🚨 EMERGENCY: Immediate medical attention required
                </AlertDescription>
              </Alert>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-3">Patient Information</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <User className="w-4 h-4 text-gray-500" />
                      <span className="font-medium">{selectedAlert.userInfo.name}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-500" />
                      <span>{selectedAlert.userInfo.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-4 h-4 text-gray-500" />
                      <span>{selectedAlert.userInfo.email}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold mb-3">Emergency Details</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Badge className={getPriorityColor(selectedAlert.priority)}>
                        {selectedAlert.priority.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                    {selectedAlert.distance && (
                      <div className="flex items-center space-x-2">
                        <Navigation className="w-4 h-4 text-green-500" />
                        <span className="font-semibold text-green-600">{selectedAlert.distance}km away</span>
                      </div>
                    )}
                    <div className="flex items-center space-x-2">
                      <Timer className="w-4 h-4 text-gray-500" />
                      <span>{formatTimeAgo(selectedAlert.createdAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div>
  <h3 className="font-semibold mb-3">Location</h3>
  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
    <div className="flex items-start space-x-2">
      <MapPin className="w-5 h-5 text-blue-500 mt-0.5" />
      <div className="flex-1 space-y-2">
        {selectedAlert.location?.lat && selectedAlert.location?.lng ? (
          <>
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              📍 GPS Coordinates: {selectedAlert.location.lat.toFixed(6)}, {selectedAlert.location.lng.toFixed(6)}
            </p>

            <Button
              onClick={() =>
                openGoogleMaps({
                  lat: selectedAlert.location.lat,
                  lng: selectedAlert.location.lng
                })
              }
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Map className="w-4 h-4 mr-2" />
              Open in Google Maps
              <ExternalLink className="w-3 h-3 ml-2" />
            </Button>

            {selectedAlert.location?.address && (
              <p className="text-sm text-blue-700 dark:text-blue-400">
                      {formatLocationAddress(selectedAlert.location.address)}
<br />
                      🏠 This is the patient’s home address. If GPS is not accurate, please call the patient to confirm:
          <br />
          👉 Ask: “Are you currently at your home address?”
          <br />
          ✅ If yes, use this address.
          <br />
          ❌ If not, ask for the current location.
              </p>
            )}
          </>
        ) : (
          <>
            <p className="text-sm font-medium text-red-600">
              ⚠️ GPS coordinates not available.
            </p>
            {selectedAlert.location?.address && (
              <p className="text-sm text-blue-700 dark:text-blue-400">
                🏠 Reported address: <br />
                {formatLocationAddress(selectedAlert.location.address)}
              </p>
            )}
          </>
        )}
      </div>
    </div>
  </div>
</div>

              {selectedAlert.message && (
                <div>
                  <h3 className="font-semibold mb-3">Emergency Message</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <p className="text-gray-700 dark:text-gray-300">{selectedAlert.message}</p>
                  </div>
                </div>
              )}
              {selectedAlert.status === "pending" && (
                <div className="flex space-x-4 pt-4 border-t">
                  <Button
                    onClick={() => handleResponse("accept")}
                    disabled={responding}
                    className="flex-1 bg-green-600 hover:bg-green-700 text-white font-semibold py-3"
                  >
                    {responding ? (
                      <>
                        <motion.div
                          className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        />
                        Accepting...
                      </>
                    ) : (
                      <>
                        <CheckCircle className="w-5 h-5 mr-2" />🚑 ACCEPT & DISPATCH AMBULANCE
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={() => handleResponse("deny")}
                    disabled={responding}
                    variant="destructive"
                    className="flex-1 font-semibold py-3"
                  >
                    {responding ? (
                      "Processing..."
                    ) : (
                      <>
                        <XCircle className="w-5 h-5 mr-2" />
                        DECLINE
                      </>
                    )}
                  </Button>
                </div>
              )}
              {selectedAlert.status === "accepted" && (
                <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-800 dark:text-green-200">
                      Emergency Accepted - Ambulance Dispatched
                    </span>
                  </div>
                  {selectedAlert.acceptedBy && (
                    <p className="text-sm text-green-700 dark:text-green-300 mt-2">
                      Handled by: {selectedAlert.acceptedBy.name}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

    </div>
  )
}
