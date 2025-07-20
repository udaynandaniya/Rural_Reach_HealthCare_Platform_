






// //C:\Users\UDAYN\Downloads\healthcare-platform\app\doctor\dashboard\page.tsx
// "use client"

// import { useState, useEffect } from "react"
// import { motion } from "framer-motion"
// import Swal from "sweetalert2"
// import {
//   Stethoscope,
//   Plus,
//   MessageSquare,
//   Send,
//   Building2,
//   Tag,
//   Calendar,
//   Eye,
//   Edit,
//   Trash2,
//   Megaphone,
//   Home,
// } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
// import { useAuth } from "@/app/contexts/AuthProvider"
// import ThemeToggle from "@/components/ThemeToggle"
// import UserDropdown from "@/components/UserDropdown"
// import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
// import { toast } from "react-hot-toast"
// import Link from "next/link"


// interface Post {
//   _id: string
//   title: string
//   content: string
//   category: string
//   tags: string[]
//   authorType: string
//   postby: string
//   createdAt: string
//   isApproved: boolean
// }

// interface Hospital {
//   _id: string
//   name: string
//   email: string
//   isVerified: boolean
//   specialties: string[]
// }

// interface Announcement {
//   _id: string
//   title: string
//   content: string
//   ownerId: string
//   ownerType: "doctor" | "hospital" | "user"
//   readBy: string[]
//   createdAt: string
// }

// export default function DoctorDashboard() {
//   const { user } = useAuth()
//   const [ownPosts, setOwnPosts] = useState<Post[]>([])
//   const [allOtherPosts, setAllOtherPosts] = useState<Post[]>([])
//   const [hospitals, setHospitals] = useState<Hospital[]>([])
//   const [ownAnnouncements, setOwnAnnouncements] = useState<Announcement[]>([])
//   const [loading, setLoading] = useState(true)
//   const [editingPost, setEditingPost] = useState<Post | null>(null)
//   const [isAnnouncementFormOpen, setIsAnnouncementFormOpen] = useState(false)
//   const [isSavingAnnouncement, setIsSavingAnnouncement] = useState(false)
//   const [newPost, setNewPost] = useState({
//     title: "",
//     content: "",
//     category: "",
//     tags: "",
//   })
//   const [newAnnouncement, setNewAnnouncement] = useState({
//     title: "",
//     content: "",
//   })

//   const categories = [
//     "mental-health",
//     "physical-health",
//     "emergency",
//     "prevention",
//     "lifestyle",
//     "symptoms",
//     "treatment",
//     "cardiology",
//     "neurology",
//     "pediatrics",
//   ]

//   useEffect(() => {
//     fetchDashboardData()
//   }, [])

//   const fetchDashboardData = async () => {
//     try {
//       const [ownPostsRes, allOtherPostsRes, ownAnnouncementsRes] = await Promise.all([
//         fetch("/api/doctor/my-posts"),
//         fetch("/api/posts"),
//         fetch("/api/announcements/own"),
//       ])

//       if (ownPostsRes.ok) {
//         const ownPostsData = await ownPostsRes.json()
//         setOwnPosts(ownPostsData.data || [])
//       }
//       if (allOtherPostsRes.ok) {
//         const allOtherPostsData = await allOtherPostsRes.json()
//         setAllOtherPosts(allOtherPostsData.data || [])
//       }
      
//       if (ownAnnouncementsRes.ok) {
//         const ownAnnouncementsData = await ownAnnouncementsRes.json()
//         setOwnAnnouncements(ownAnnouncementsData.data || [])
//       }
//     } catch (error) {
//       console.error("Error fetching dashboard data:", error)
//       toast.error("Failed to load dashboard data.")
//     } finally {
//       setLoading(false)
//     }
//   }

//   const handleCreatePost = async () => {
//     if (!newPost.title || !newPost.content || !newPost.category) {
//       toast.error("Please fill in all required fields for the post.")
//       return
//     }
//     try {
//       const response = await fetch("/api/doctor/create-post", {
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
//         toast.success("✅ Post created successfully!")
//         setNewPost({ title: "", content: "", category: "", tags: "" })
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
//       const response = await fetch("/api/doctor/edit-post", {
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
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action will delete the post permanently.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     })
//     if (!result.isConfirmed) return
//     try {
//       const response = await fetch("/api/doctor/delete-post", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ postId }),
//       })
//       if (response.ok) {
//         toast.success("✅ Post deleted successfully")
//         fetchDashboardData()
//       } else {
//         toast.error("Failed to delete post")
//       }
//     } catch (error) {
//       toast.error("Error deleting post")
//     }
//   }

//   const handleCreateAnnouncement = async () => {
//     if (!newAnnouncement.title || !newAnnouncement.content) {
//       toast.error("Please fill in all required fields for the announcement.")
//       return
//     }
//     try {
//       const response = await fetch("/api/announcements/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           title: newAnnouncement.title,
//           content: newAnnouncement.content,
//           ownerType: "doctor", // Ensure ownerType is 'doctor'
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
//     }
//   }



//   const handleDeleteAnnouncement = async (announcementId: string) => {
//     const result = await Swal.fire({
//       title: "Are you sure?",
//       text: "This action will delete the announcement permanently.",
//       icon: "warning",
//       showCancelButton: true,
//       confirmButtonColor: "#d33",
//       cancelButtonColor: "#3085d6",
//       confirmButtonText: "Yes, delete it!",
//     })
//     if (!result.isConfirmed) return
//     try {
//       const response = await fetch("/api/announcements/delete", {
//         method: "DELETE",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id: announcementId }),
//       })
//       if (response.ok) {
//         toast.success("✅ Announcement deleted successfully")
//         fetchDashboardData()
//       } else {
//         toast.error("Failed to delete announcement")
//       }
//     } catch (error) {
//       toast.error("Error deleting announcement")
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

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
//         <div className="text-center">
//           <motion.div
//             className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
//             animate={{ rotate: 360 }}
//             transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//           />
//           <p className="text-gray-600 dark:text-gray-400 text-lg">Loading doctor dashboard...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       {/* Header with Animated Icons */}
//       <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
//         <AnimatedHealthIcons />
//         <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
//           <div className="flex items-center space-x-4">

//                                <Link href="/" passHref>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-gray-600 dark:text-gray-400 p-4 sm:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition w-14 h-14"
//               >
//                 <Home className="w-7 h-7 sm:w-6 sm:h-6" />
//                 <span className="sr-only">Home</span>
//               </Button>
//             </Link>
            
            

//             <motion.div
//               className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
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
//               <Stethoscope className="w-6 h-6 text-white" />
//             </motion.div>
//             <div>
//               <h1 className="text-xl font-bold text-gray-900 dark:text-white">Doctor Dashboard</h1>
//               <p className="text-sm text-gray-600 dark:text-gray-400">Share your medical expertise</p>
//             </div>
//           </div>
//           <div className="flex items-center space-x-4">
//             {/* Removed notifications bell and badge */}
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
//           <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome, Dr. {user?.name}! 👨‍⚕️</h2>
//           <p className="text-gray-600 dark:text-gray-400">
//             Share your medical knowledge and connect with hospitals in your network.
//           </p>
//         </motion.div>

//         {/* Quick Stats */}
//         <motion.div
//           className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.1 }}
//         >
//           <motion.div whileHover={{ scale: 1.02, y: -5 }}>
//             <Card className="hover:shadow-lg transition-all duration-300">
//               <CardContent className="p-6">
//                 <div className="flex items-center justify-between">
//                   <div>
//                     <p className="text-sm text-gray-600 dark:text-gray-400">My Posts</p>
//                     <p className="text-2xl font-bold text-green-600">{ownPosts.length}</p>
//                     <p className="text-xs text-gray-500 mt-1">Published content</p>
//                   </div>
//                   <motion.div
//                     className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
//                     animate={{ rotate: [0, 360] }}
//                     transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
//                   >
//                     <MessageSquare className="w-6 h-6 text-green-600" />
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
         
//         </motion.div>

//         {/* Main Content Tabs */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}
//         >
//           <Tabs defaultValue="create" className="space-y-6">
//             <TabsList className="grid w-full grid-cols-4">
//               <TabsTrigger value="create">Create Post</TabsTrigger>
//               <TabsTrigger value="own-posts">My Posts</TabsTrigger>
//               <TabsTrigger value="all-posts">All Posts</TabsTrigger>
//               <TabsTrigger value="announcements">Announcements</TabsTrigger>
//             </TabsList>

//             {/* Create Post Tab */}
//             <TabsContent value="create" className="space-y-6">
//               <Card>
//                 <CardHeader>
//                   <CardTitle className="flex items-center space-x-2">
//                     <Plus className="w-5 h-5" />
//                     <span>Create New Medical Post</span>
//                   </CardTitle>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Post Title *</label>
//                     <Input
//                       value={newPost.title}
//                       onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
//                       placeholder="e.g., 5 Early Signs of Heart Disease You Shouldn't Ignore"
//                       className="w-full"
//                     />
//                   </div>
//                   <div>
//                     <label className="block text-sm font-medium mb-2">Content *</label>
//                     <Textarea
//                       value={newPost.content}
//                       onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
//                       placeholder="Share your medical expertise, tips, or health advice..."
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
//                       placeholder="e.g., cardiology, prevention, symptoms, health-tips"
//                       className="w-full"
//                     />
//                   </div>
//                   <Button
//                     onClick={handleCreatePost}
//                     className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
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
//                     <Stethoscope className="w-5 h-5 text-green-600" />
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
//                                         className="bg-green-600 hover:bg-green-700"
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
//                       <p className="text-gray-500 mb-4">Start sharing your medical expertise with the community</p>
//                       <Button onClick={() => document.querySelector('[value="create"]')?.click()}>
//                         Create Your First Post
//                       </Button>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             </TabsContent>


//             {/* All Posts Tab */} {/* All Posts Tab  */}
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
//                           <DialogTitle>
//                             {"Create New Announcement"}
//                           </DialogTitle>
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
//                               onClick={ handleCreateAnnouncement}
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
//                               </div>
//                             </div>
//                             <div className="flex items-center space-x-2">
                             
//                               <Button
//                                 variant="destructive"
//                                 size="sm"
//                                 onClick={() => handleDeleteAnnouncement(announcement._id)}
//                               >
//                                 <Trash2 className="w-4 h-4" />
//                               </Button>
//                             </div>
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
//     </div>
//   )
// }


"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Swal from "sweetalert2"
import {
  Stethoscope,
  Plus,
  MessageSquare,
  Send,
  Building2,
  Tag,
  Calendar,
  Eye,
  Edit,
  Trash2,
  Megaphone,
  Home,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAuth } from "@/app/contexts/AuthProvider"
import ThemeToggle from "@/components/ThemeToggle"
import UserDropdown from "@/components/UserDropdown"
import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
import { toast } from "react-hot-toast"
import Link from "next/link"

interface Post {
  _id: string
  title: string
  content: string
  category: string
  tags: string[]
  authorType: string
  postby: string
  createdAt: string
  isApproved: boolean
}

interface Hospital {
  _id: string
  name: string
  email: string
  isVerified: boolean
  specialties: string[]
}

interface Announcement {
  _id: string
  title: string
  content: string
  ownerId: string
  ownerType: "doctor" | "hospital" | "user"
  readBy: string[]
  createdAt: string
}

export default function DoctorDashboard() {
  const { user , isLoading } = useAuth()
  const [ownPosts, setOwnPosts] = useState<Post[]>([])
  const [allOtherPosts, setAllOtherPosts] = useState<Post[]>([])
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [ownAnnouncements, setOwnAnnouncements] = useState<Announcement[]>([])
  const [loading, setLoading] = useState(true)
  const [editingPost, setEditingPost] = useState<Post | null>(null)
  const [isAnnouncementFormOpen, setIsAnnouncementFormOpen] = useState(false)
  const [isSavingAnnouncement, setIsSavingAnnouncement] = useState(false)
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  })
  const [newAnnouncement, setNewAnnouncement] = useState({
    title: "",
    content: "",
  })

  const categories = [
    "mental-health",
    "physical-health",
    "emergency",
    "prevention",
    "lifestyle",
    "symptoms",
    "treatment",
    "cardiology",
    "neurology",
    "pediatrics",
  ]

  // useEffect(() => {
  //   fetchDashboardData()
  // }, [])

  useEffect(() => {
  if (user) {
    fetchDashboardData()
  }
}, [user])

if (isLoading) return <p>Loading...</p>

if (!user) return <p>Unauthorized</p>

  const fetchDashboardData = async () => {
    try {
      const [ownPostsRes, allOtherPostsRes, ownAnnouncementsRes] = await Promise.all([
        fetch("/api/doctor/my-posts"),
        fetch("/api/posts"),
        fetch("/api/announcements/own"),
      ])

      if (ownPostsRes.ok) {
        const ownPostsData = await ownPostsRes.json()
        setOwnPosts(ownPostsData.data || [])
      }

      if (allOtherPostsRes.ok) {
        const allOtherPostsData = await allOtherPostsRes.json()
        setAllOtherPosts(allOtherPostsData.data || [])
      }

      if (ownAnnouncementsRes.ok) {
        const ownAnnouncementsData = await ownAnnouncementsRes.json()
        setOwnAnnouncements(ownAnnouncementsData.data || [])
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast.error("Failed to load dashboard data.")
    } finally {
      setLoading(false)
    }
  }

  const handleCreatePost = async () => {
    if (!newPost.title || !newPost.content || !newPost.category) {
      toast.error("Please fill in all required fields for the post.")
      return
    }

    try {
      const response = await fetch("/api/doctor/create-post", {
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
        toast.success("✅ Post created successfully!")
        setNewPost({ title: "", content: "", category: "", tags: "" })
        fetchDashboardData()
      } else {
        toast.error("Failed to create post")
      }
    } catch (error) {
      toast.error("Error creating post")
    }
  }

  const handleEditPost = async (postId: string, updatedData: Partial<Post>) => {
    try {
      const response = await fetch("/api/doctor/edit-post", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId, ...updatedData }),
      })

      if (response.ok) {
        toast.success("✅ Post updated successfully!")
        setEditingPost(null)
        fetchDashboardData()
      } else {
        toast.error("Failed to update post")
      }
    } catch (error) {
      toast.error("Error updating post")
    }
  }

  const handleDeletePost = async (postId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the post permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    })

    if (!result.isConfirmed) return

    try {
      const response = await fetch("/api/doctor/delete-post", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ postId }),
      })

      if (response.ok) {
        toast.success("✅ Post deleted successfully")
        fetchDashboardData()
      } else {
        toast.error("Failed to delete post")
      }
    } catch (error) {
      toast.error("Error deleting post")
    }
  }

  const handleCreateAnnouncement = async () => {
    if (!newAnnouncement.title || !newAnnouncement.content) {
      toast.error("Please fill in all required fields for the announcement.")
      return
    }

    try {
      const response = await fetch("/api/announcements/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newAnnouncement.title,
          content: newAnnouncement.content,
          ownerType: "doctor", // Ensure ownerType is 'doctor'
        }),
      })

      if (response.ok) {
        toast.success("✅ Announcement created successfully!")
        setNewAnnouncement({ title: "", content: "" })
        closeAnnouncementForm()
        fetchDashboardData()
      } else {
        toast.error("Failed to create announcement")
      }
    } catch (error) {
      toast.error("Error creating announcement")
    }
  }

  const handleDeleteAnnouncement = async (announcementId: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This action will delete the announcement permanently.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    })

    if (!result.isConfirmed) return

    try {
      const response = await fetch("/api/announcements/delete", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: announcementId }),
      })

      if (response.ok) {
        toast.success("✅ Announcement deleted successfully")
        fetchDashboardData()
      } else {
        toast.error("Failed to delete announcement")
      }
    } catch (error) {
      toast.error("Error deleting announcement")
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center px-4">
        <div className="text-center">
          <motion.div
            className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-green-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <p className="text-gray-600 dark:text-gray-400 text-base sm:text-lg">Loading doctor dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header with Animated Icons */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
        <AnimatedHealthIcons />
        <div className="container mx-auto px-3 sm:px-6 py-3 sm:py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-2 sm:space-x-4">
            <Link href="/" passHref>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 dark:text-gray-400 p-2 sm:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition w-10 h-10 sm:w-14 sm:h-14"
              >
                <Home className="w-5 h-5 sm:w-7 sm:h-7" />
                <span className="sr-only">Home</span>
              </Button>
            </Link>

            <motion.div
              className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
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
              <Stethoscope className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
            </motion.div>
            <div className="hidden sm:block">
              <h1 className="text-lg sm:text-xl font-bold text-gray-900 dark:text-white">Doctor Dashboard</h1>
              <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">Share your medical expertise</p>
            </div>
            <div className="block sm:hidden">
              <h1 className="text-base font-bold text-gray-900 dark:text-white">Dashboard</h1>
            </div>
          </div>
          <div className="flex items-center space-x-2 sm:space-x-4">
            <ThemeToggle />
            <UserDropdown />
          </div>
        </div>
      </header>

      <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-8">
        {/* Welcome Section */}
        <motion.div
          className="mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white mb-2">
            Welcome, Dr. {user?.name}! 👨‍⚕️
          </h2>
          <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400">
            Share your medical knowledge and connect with hospitals in your network.
          </p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <motion.div whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">My Posts</p>
                    <p className="text-xl sm:text-2xl font-bold text-green-600">{ownPosts.length}</p>
                    <p className="text-xs text-gray-500 mt-1">Published content</p>
                  </div>
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center"
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  >
                    <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div whileHover={{ scale: 1.02, y: -5 }}>
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">My Announcements</p>
                    <p className="text-xl sm:text-2xl font-bold text-blue-600">{ownAnnouncements.length}</p>
                    <p className="text-xs text-gray-500 mt-1">Shared updates</p>
                  </div>
                  <motion.div
                    className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center"
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Megaphone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
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
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Tabs defaultValue="create" className="space-y-4 sm:space-y-6">
            <TabsList className="grid w-full grid-cols-2 sm:grid-cols-4 h-auto">
              <TabsTrigger value="create" className="text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-2">
                Create Post
              </TabsTrigger>
              <TabsTrigger value="own-posts" className="text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-2">
                My Posts
              </TabsTrigger>
              <TabsTrigger value="all-posts" className="text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-2">
                All Posts
              </TabsTrigger>
              <TabsTrigger value="announcements" className="text-xs sm:text-sm px-2 py-2 sm:px-4 sm:py-2">
                Announcements
              </TabsTrigger>
            </TabsList>

            {/* Create Post Tab */}
            <TabsContent value="create" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Create New Medical Post</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Post Title *</label>
                    <Input
                      value={newPost.title}
                      onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                      placeholder="e.g., 5 Early Signs of Heart Disease You Shouldn't Ignore"
                      className="w-full text-sm sm:text-base"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Content *</label>
                    <Textarea
                      value={newPost.content}
                      onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                      placeholder="Share your medical expertise, tips, or health advice..."
                      className="w-full min-h-[150px] sm:min-h-[200px] text-sm sm:text-base"
                    />
                  </div>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Category *</label>
                      <Select
                        value={newPost.category}
                        onValueChange={(value) => setNewPost({ ...newPost, category: value })}
                      >
                        <SelectTrigger className="text-sm sm:text-base">
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
                      placeholder="e.g., cardiology, prevention, symptoms, health-tips"
                      className="w-full text-sm sm:text-base"
                    />
                  </div>
                  <Button
                    onClick={handleCreatePost}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-sm sm:text-base py-2 sm:py-3"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Create Post
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Own Posts Tab */}
            <TabsContent value="own-posts" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                    <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <span>My Posts</span>
                    <Badge variant="secondary" className="text-xs">
                      {ownPosts.length} posts
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {ownPosts.length > 0 ? (
                    <div className="space-y-4">
                      {ownPosts.map((post, index) => (
                        <motion.div
                          key={post._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                          className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 space-y-2 sm:space-y-0">
                            <div className="flex-1">
                              <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">{post.title}</h3>
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {post.category.replace("-", " ")}
                                </Badge>
                                <Badge variant={post.isApproved ? "default" : "destructive"} className="text-xs">
                                  {post.isApproved ? "Approved" : "Pending"}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 self-start">
                              <Dialog>
                                <DialogTrigger asChild>
                                  <Button variant="outline" size="sm" onClick={() => setEditingPost(post)}>
                                    <Edit className="w-3 h-3 sm:w-4 sm:h-4" />
                                  </Button>
                                </DialogTrigger>
                                <DialogContent className="max-w-[95vw] sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                                  <DialogHeader>
                                    <DialogTitle>Edit Post</DialogTitle>
                                  </DialogHeader>
                                  <div className="space-y-4">
                                    <Input
                                      defaultValue={post.title}
                                      placeholder="Post title"
                                      className="text-sm sm:text-base"
                                      onChange={(e) =>
                                        setEditingPost((prev) => (prev ? { ...prev, title: e.target.value } : null))
                                      }
                                    />
                                    <Textarea
                                      defaultValue={post.content}
                                      placeholder="Post content"
                                      className="min-h-[150px] sm:min-h-[200px] text-sm sm:text-base"
                                      onChange={(e) =>
                                        setEditingPost((prev) => (prev ? { ...prev, content: e.target.value } : null))
                                      }
                                    />
                                    <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                                      <Button
                                        onClick={() =>
                                          editingPost &&
                                          handleEditPost(editingPost._id, {
                                            title: editingPost.title,
                                            content: editingPost.content,
                                          })
                                        }
                                        className="bg-green-600 hover:bg-green-700 text-sm sm:text-base"
                                      >
                                        Save Changes
                                      </Button>
                                      <Button
                                        variant="outline"
                                        onClick={() => setEditingPost(null)}
                                        className="text-sm sm:text-base"
                                      >
                                        Cancel
                                      </Button>
                                    </div>
                                  </div>
                                </DialogContent>
                              </Dialog>
                              <Button variant="destructive" size="sm" onClick={() => handleDeletePost(post._id)}>
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 text-sm sm:text-base">
                            {post.content}
                          </p>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {post.tags.map((tag, tagIndex) => (
                              <Badge key={tagIndex} variant="secondary" className="text-xs">
                                <Tag className="w-3 h-3 mr-1" />
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                            <div className="flex items-center space-x-2 text-gray-600">
                              <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span className="text-xs sm:text-sm">View details</span>
                            </div>
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 sm:py-12">
                      <MessageSquare className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        No posts yet
                      </h3>
                      <p className="text-sm sm:text-base text-gray-500 mb-4">
                        Start sharing your medical expertise with the community
                      </p>
                      <Button
                        onClick={() => document.querySelector('[value="create"]')?.click()}
                        className="text-sm sm:text-base"
                      >
                        Create Your First Post
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* All Posts Tab */}
            <TabsContent value="all-posts" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                    <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                    <span>All Posts</span>
                    <Badge variant="secondary" className="text-xs">
                      {allOtherPosts.length} posts
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4 sm:p-6">
                  {allOtherPosts.length > 0 ? (
                    <div className="space-y-4">
                      {allOtherPosts.map((post, index) => (
                        <motion.div
                          key={post._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                          className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 space-y-2 sm:space-y-0">
                            <div className="flex items-center space-x-3">
                              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center flex-shrink-0">
                                {post.authorType === "Doctor" ? (
                                  <Stethoscope className="w-4 h-4 sm:w-5 sm:h-5 text-green-600" />
                                ) : (
                                  <Building2 className="w-4 h-4 sm:w-5 sm:h-5 text-purple-600" />
                                )}
                              </div>
                              <div className="min-w-0">
                                <p className="font-semibold text-sm sm:text-base truncate">
                                  {post.authorType === "Doctor" ? "Dr." : ""} {post.postby}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-500 capitalize">{post.authorType}</p>
                              </div>
                            </div>
                            <div className="flex flex-col sm:flex-row sm:items-center space-y-1 sm:space-y-0 sm:space-x-2">
                              <Badge variant="outline" className="text-xs">
                                {post.category.replace("-", " ")}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {new Date(post.createdAt).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">{post.title}</h3>
                          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 text-sm sm:text-base">
                            {post.content}
                          </p>
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
                    <div className="text-center py-8 sm:py-12">
                      <Stethoscope className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        No post yet
                      </h3>
                      <p className="text-sm sm:text-base text-gray-500">
                        Posts from other hospitals and doctors will appear here
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Announcements Tab */}
            <TabsContent value="announcements" className="space-y-4 sm:space-y-6">
              <Card>
                <CardHeader className="p-4 sm:p-6">
                  <CardTitle className="flex items-center space-x-2 text-base sm:text-lg">
                    <Megaphone className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600" />
                    <span>My Announcements</span>
                    <Badge variant="secondary" className="text-xs">
                      {ownAnnouncements.length} announcements
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 sm:space-y-6 p-4 sm:p-6">
                  <div className="space-y-4 border-b pb-4 mb-4">
                    <h3 className="text-base sm:text-lg font-semibold">Create New Announcement</h3>
                    <Dialog open={isAnnouncementFormOpen} onOpenChange={setIsAnnouncementFormOpen}>
                      <DialogTrigger asChild>
                        <Button
                          onClick={() => openAnnouncementForm(null)}
                          className="w-full text-sm sm:text-base py-2 sm:py-3"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Create New Announcement
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-[95vw] sm:max-w-[425px] max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Create New Announcement</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium mb-2">Title *</label>
                            <Input
                              value={newAnnouncement.title}
                              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, title: e.target.value })}
                              placeholder="e.g., Holiday Notice: Clinic Closed on Dec 25th"
                              className="w-full text-sm sm:text-base"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium mb-2">Content *</label>
                            <Textarea
                              value={newAnnouncement.content}
                              onChange={(e) => setNewAnnouncement({ ...newAnnouncement, content: e.target.value })}
                              placeholder="Share important updates with your network..."
                              className="w-full min-h-[100px] sm:min-h-[120px] text-sm sm:text-base"
                            />
                          </div>
                          <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                            <Button
                              onClick={handleCreateAnnouncement}
                              disabled={isSavingAnnouncement}
                              className="bg-blue-600 hover:bg-blue-700 text-sm sm:text-base"
                            >
                              {isSavingAnnouncement ? "Saving..." : "Save Announcement"}
                            </Button>
                            <Button
                              variant="outline"
                              onClick={closeAnnouncementForm}
                              className="text-sm sm:text-base bg-transparent"
                            >
                              Cancel
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                  <h3 className="text-base sm:text-lg font-semibold mb-4">My Published Announcements</h3>
                  {ownAnnouncements.length > 0 ? (
                    <div className="space-y-4">
                      {ownAnnouncements.map((announcement, index) => (
                        <motion.div
                          key={announcement._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.01 }}
                          className="border rounded-lg p-3 sm:p-4 hover:shadow-md transition-all duration-300"
                        >
                          <div className="flex flex-col sm:flex-row sm:items-start justify-between mb-3 space-y-2 sm:space-y-0">
                            <div className="flex-1">
                              <h3 className="font-semibold text-base sm:text-lg mb-2 line-clamp-2">
                                {announcement.title}
                              </h3>
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge variant="outline" className="text-xs">
                                  {announcement.ownerType}
                                </Badge>
                              </div>
                            </div>
                            <div className="flex items-center space-x-2 self-start">
                              <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => handleDeleteAnnouncement(announcement._id)}
                              >
                                <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3 text-sm sm:text-base">
                            {announcement.content}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2 text-xs text-gray-500">
                              <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{new Date(announcement.createdAt).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 sm:py-12">
                      <Megaphone className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-base sm:text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                        No announcements yet
                      </h3>
                      <p className="text-sm sm:text-base text-gray-500 mb-4">
                        Share important updates with your network
                      </p>
                      <Button onClick={() => openAnnouncementForm(null)} className="text-sm sm:text-base">
                        Create Your First Announcement
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
