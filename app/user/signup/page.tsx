// // // // //C:\Users\UDAYN\Downloads\healthcare-platform\app\user\signup\page.tsx

// // // // "use client"

// // // // import type React from "react"

// // // // import { useState } from "react"
// // // // import { useRouter } from "next/navigation"
// // // // import Link from "next/link"
// // // // import { Eye, EyeOff, Users, ArrowLeft, Mail, Phone, MapPin } from "lucide-react"
// // // // import { Button } from "@/components/ui/button"
// // // // import { Input } from "@/components/ui/input"
// // // // import { Label } from "@/components/ui/label"
// // // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // // import ThemeToggle from "@/components/ThemeToggle"
// // // // import { toast } from "react-hot-toast"

// // // // export default function UserSignupPage() {
// // // //   const [step, setStep] = useState(1)
// // // //   const [formData, setFormData] = useState({
// // // //     name: "",
// // // //     email: "",
// // // //     phone: "",
// // // //     password: "",
// // // //     confirmPassword: "",
// // // //     address: {
// // // //       street: "",
// // // //       area: "",
// // // //       townOrVillage: "",
// // // //       taluka: "",
// // // //       district: "",
// // // //       pincode: "",
// // // //     },
// // // //   })
// // // //   const [otp, setOtp] = useState("")
// // // //   const [showPassword, setShowPassword] = useState(false)
// // // //   const [isLoading, setIsLoading] = useState(false)
// // // //   const router = useRouter()

// // // //   const handleSendOTP = async (e: React.FormEvent) => {
// // // //     e.preventDefault()
// // // //     if (formData.password !== formData.confirmPassword) {
// // // //       toast.error("Passwords do not match")
// // // //       return
// // // //     }

// // // //     setIsLoading(true)
// // // //     try {
// // // //       const response = await fetch("/api/auth/send-otp", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ email: formData.email, role: "user" }),
// // // //       })

// // // //       const data = await response.json()
// // // //       if (data.success) {
// // // //         toast.success("OTP sent to your email!")
// // // //         setStep(2)
// // // //       } else {
// // // //         toast.error(data.message || "Failed to send OTP")
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error("Something went wrong")
// // // //     } finally {
// // // //       setIsLoading(false)
// // // //     }
// // // //   }

// // // //   const handleVerifyOTP = async (e: React.FormEvent) => {
// // // //     e.preventDefault()
// // // //     setIsLoading(true)

// // // //     try {
// // // //       const response = await fetch("/api/auth/verify-otp", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify({ email: formData.email, otp }),
// // // //       })

// // // //       const data = await response.json()
// // // //       if (data.success) {
// // // //         toast.success("Email verified!")
// // // //         setStep(3)
// // // //       } else {
// // // //         toast.error(data.message || "Invalid OTP")
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error("Something went wrong")
// // // //     } finally {
// // // //       setIsLoading(false)
// // // //     }
// // // //   }

// // // //   const handleCompleteSignup = async (e: React.FormEvent) => {
// // // //     e.preventDefault()
// // // //     setIsLoading(true)

// // // //     try {
// // // //       const response = await fetch("/api/user/signup", {
// // // //         method: "POST",
// // // //         headers: { "Content-Type": "application/json" },
// // // //         body: JSON.stringify(formData),
// // // //       })

// // // //       const data = await response.json()
// // // //       if (data.success) {
// // // //         toast.success("Account created successfully!")

// // // //           const isAdmin = data.user?.isAdmin;

// // // //         if (isAdmin) {
// // // //     router.push("/admin/dashboard")
// // // //         } else {
// // // //         router.push("/user/dashboard")
// // // //         }
// // // //       } else {
// // // //         toast.error(data.message || "Signup failed")
// // // //       }
// // // //     } catch (error) {
// // // //       toast.error("Something went wrong")
// // // //     } finally {
// // // //       setIsLoading(false)
// // // //     }
// // // //   }

// // // //   return (
// // // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
// // // //       <div className="absolute top-6 left-6">
// // // //         <Link href="/">
// // // //           <Button variant="outline" size="sm" className="gap-2 bg-transparent">
// // // //             <ArrowLeft className="w-4 h-4" />
// // // //             Back to Home
// // // //           </Button>
// // // //         </Link>
// // // //       </div>

// // // //       <div className="absolute top-6 right-6">
// // // //         <ThemeToggle />
// // // //       </div>

// // // //       <Card className="w-full max-w-md">
// // // //         <CardHeader className="text-center">
// // // //           <div className="flex justify-center mb-4">
// // // //             <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
// // // //               <Users className="w-8 h-8 text-white" />
// // // //             </div>
// // // //           </div>
// // // //           <CardTitle className="text-2xl font-bold">Join as User</CardTitle>
// // // //           <p className="text-gray-600 dark:text-gray-400">
// // // //             Step {step} of 3: {step === 1 ? "Basic Info" : step === 2 ? "Verify Email" : "Address Details"}
// // // //           </p>
// // // //         </CardHeader>

// // // //         <CardContent>
// // // //           {step === 1 && (
// // // //             <form onSubmit={handleSendOTP} className="space-y-4">
// // // //               <div>
// // // //                 <Label htmlFor="name">Full Name</Label>
// // // //                 <Input
// // // //                   id="name"
// // // //                   value={formData.name}
// // // //                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// // // //                   required
// // // //                 />
// // // //               </div>

// // // //               <div>
// // // //                 <Label htmlFor="email">Email</Label>
// // // //                 <div className="relative">
// // // //                   <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
// // // //                   <Input
// // // //                     id="email"
// // // //                     type="email"
// // // //                     className="pl-10"
// // // //                     value={formData.email}
// // // //                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// // // //                     required
// // // //                   />
// // // //                 </div>
// // // //               </div> 

// // // //               <div>
// // // //                 <Label htmlFor="phone">Phone Number</Label>
// // // //                 <div className="relative">
// // // //                   <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
// // // //                   <Input
// // // //                     id="phone"
// // // //                     type="tel"
// // // //                     className="pl-10"
// // // //                     value={formData.phone}
// // // //                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
// // // //                     required
// // // //                   />
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <Label htmlFor="password">Password</Label>
// // // //                 <div className="relative">
// // // //                   <Input
// // // //                     id="password"
// // // //                     type={showPassword ? "text" : "password"}
// // // //                     value={formData.password}
// // // //                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
// // // //                     required
// // // //                   />
// // // //                   <Button
// // // //                     type="button"
// // // //                     variant="ghost"
// // // //                     size="sm"
// // // //                     className="absolute right-0 top-0 h-full px-3"
// // // //                     onClick={() => setShowPassword(!showPassword)}
// // // //                   >
// // // //                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// // // //                   </Button>
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <Label htmlFor="confirmPassword">Confirm Password</Label>
// // // //                 <Input
// // // //                   id="confirmPassword"
// // // //                   type="password"
// // // //                   value={formData.confirmPassword}
// // // //                   onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
// // // //                   required
// // // //                 />
// // // //               </div>

// // // //               <Button
// // // //                 type="submit"
// // // //                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
// // // //                 disabled={isLoading}
// // // //               >
// // // //                 {isLoading ? "Sending OTP..." : "Send Verification Code"}
// // // //               </Button>
// // // //             </form>
// // // //           )}

// // // //           {step === 2 && (
// // // //             <form onSubmit={handleVerifyOTP} className="space-y-4">
// // // //               <div className="text-center mb-4">
// // // //                 <p className="text-sm text-gray-600 dark:text-gray-400">
// // // //                   We've sent a verification code to
// // // //                   <br />
// // // //                   <strong>{formData.email}</strong>
// // // //                 </p>
// // // //               </div>

// // // //               <div>
// // // //                 <Label htmlFor="otp">Verification Code</Label>
// // // //                 <Input
// // // //                   id="otp"
// // // //                   type="text"
// // // //                   maxLength={6}
// // // //                   className="text-center text-2xl tracking-widest"
// // // //                   value={otp}
// // // //                   onChange={(e) => setOtp(e.target.value)}
// // // //                   required
// // // //                 />
// // // //               </div>

// // // //               <Button
// // // //                 type="submit"
// // // //                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
// // // //                 disabled={isLoading}
// // // //               >
// // // //                 {isLoading ? "Verifying..." : "Verify Email"}
// // // //               </Button>

// // // //               <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => setStep(1)}>
// // // //                 Back to Previous Step
// // // //               </Button>
// // // //             </form>
// // // //           )}

// // // //           {step === 3 && (
// // // //             <form onSubmit={handleCompleteSignup} className="space-y-4">
// // // //               <div className="grid grid-cols-2 gap-4">
// // // //                 <div>
// // // //                   <Label htmlFor="street">Street</Label>
// // // //                   <Input
// // // //                     id="street"
// // // //                     value={formData.address.street}
// // // //                     onChange={(e) =>
// // // //                       setFormData({
// // // //                         ...formData,
// // // //                         address: { ...formData.address, street: e.target.value },
// // // //                       })
// // // //                     }
// // // //                     required
// // // //                   />
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label htmlFor="area">Area</Label>
// // // //                   <Input
// // // //                     id="area"
// // // //                     value={formData.address.area}
// // // //                     onChange={(e) =>
// // // //                       setFormData({
// // // //                         ...formData,
// // // //                         address: { ...formData.address, area: e.target.value },
// // // //                       })
// // // //                     }
// // // //                     required
// // // //                   />
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <Label htmlFor="townOrVillage">Town/Village</Label>
// // // //                 <Input
// // // //                   id="townOrVillage"
// // // //                   value={formData.address.townOrVillage}
// // // //                   onChange={(e) =>
// // // //                     setFormData({
// // // //                       ...formData,
// // // //                       address: { ...formData.address, townOrVillage: e.target.value },
// // // //                     })
// // // //                   }
// // // //                   required
// // // //                 />
// // // //               </div>

// // // //               <div className="grid grid-cols-2 gap-4">
// // // //                 <div>
// // // //                   <Label htmlFor="taluka">Taluka</Label>
// // // //                   <Input
// // // //                     id="taluka"
// // // //                     value={formData.address.taluka}
// // // //                     onChange={(e) =>
// // // //                       setFormData({
// // // //                         ...formData,
// // // //                         address: { ...formData.address, taluka: e.target.value },
// // // //                       })
// // // //                     }
// // // //                     required
// // // //                   />
// // // //                 </div>
// // // //                 <div>
// // // //                   <Label htmlFor="district">District</Label>
// // // //                   <Input
// // // //                     id="district"
// // // //                     value={formData.address.district}
// // // //                     onChange={(e) =>
// // // //                       setFormData({
// // // //                         ...formData,
// // // //                         address: { ...formData.address, district: e.target.value },
// // // //                       })
// // // //                     }
// // // //                     required
// // // //                   />
// // // //                 </div>
// // // //               </div>

// // // //               <div>
// // // //                 <Label htmlFor="pincode">Pincode</Label>
// // // //                 <div className="relative">
// // // //                   <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
// // // //                   <Input
// // // //                     id="pincode"
// // // //                     className="pl-10"
// // // //                     value={formData.address.pincode}
// // // //                     onChange={(e) =>
// // // //                       setFormData({
// // // //                         ...formData,
// // // //                         address: { ...formData.address, pincode: e.target.value },
// // // //                       })
// // // //                     }
// // // //                     required
// // // //                   />
// // // //                 </div>
// // // //               </div>

// // // //               <Button
// // // //                 type="submit"
// // // //                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
// // // //                 disabled={isLoading}
// // // //               >
// // // //                 {isLoading ? "Creating Account..." : "Complete Registration"}
// // // //               </Button>

// // // //               <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => setStep(2)}>
// // // //                 Back to Previous Step
// // // //               </Button>
// // // //             </form>
// // // //           )}

// // // //           <div className="mt-6 text-center">
// // // //             <p className="text-sm text-gray-600 dark:text-gray-400">
// // // //               Already have an account?{" "}
// // // //               <Link href="/auth/login" className="text-blue-600 hover:underline">
// // // //                 Sign in here
// // // //               </Link>
// // // //             </p>
// // // //           </div>
// // // //         </CardContent>
// // // //       </Card>
// // // //     </div>
// // // //   )
// // // // }



// // // "use client"

// // // import type React from "react"
// // // import { useState } from "react"
// // // import { useRouter } from "next/navigation"
// // // import Link from "next/link"
// // // import { Eye, EyeOff, Users, ArrowLeft, Mail, Phone } from "lucide-react"
// // // import { Button } from "@/components/ui/button"
// // // import { Input } from "@/components/ui/input"
// // // import { Label } from "@/components/ui/label"
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // import LocationSelector from "@/components/location-selector"
// // // import { toast } from "react-hot-toast"

// // // interface LocationData {
// // //   state: string
// // //   district: string
// // //   taluka: string
// // //   village: string
// // // }

// // // export default function UserSignupPage() {
// // //   const [step, setStep] = useState(1)
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     email: "",
// // //     phone: "",
// // //     password: "",
// // //     confirmPassword: "",
// // //     location: {
// // //       state: "Gujarat",
// // //       district: "",
// // //       taluka: "",
// // //       village: "",
// // //     } as LocationData,
// // //   })
// // //   const [otp, setOtp] = useState("")
// // //   const [showPassword, setShowPassword] = useState(false)
// // //   const [isLoading, setIsLoading] = useState(false)
// // //   const router = useRouter()

// // //   const handleSendOTP = async (e: React.FormEvent) => {
// // //     e.preventDefault()
// // //     if (formData.password !== formData.confirmPassword) {
// // //       toast.error("Passwords do not match")
// // //       return
// // //     }
// // //     setIsLoading(true)
// // //     try {
// // //       const response = await fetch("/api/auth/send-otp", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ email: formData.email, role: "user" }),
// // //       })
// // //       const data = await response.json()
// // //       if (data.success) {
// // //         toast.success("OTP sent to your email!")
// // //         setStep(2)
// // //       } else {
// // //         toast.error(data.message || "Failed to send OTP")
// // //       }
// // //     } catch (error) {
// // //       toast.error("Something went wrong")
// // //     } finally {
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   const handleVerifyOTP = async (e: React.FormEvent) => {
// // //     e.preventDefault()
// // //     setIsLoading(true)
// // //     try {
// // //       const response = await fetch("/api/auth/verify-otp", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify({ email: formData.email, otp }),
// // //       })
// // //       const data = await response.json()
// // //       if (data.success) {
// // //         toast.success("Email verified!")
// // //         setStep(3)
// // //       } else {
// // //         toast.error(data.message || "Invalid OTP")
// // //       }
// // //     } catch (error) {
// // //       toast.error("Something went wrong")
// // //     } finally {
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   const handleCompleteSignup = async (e: React.FormEvent) => {
// // //     e.preventDefault()

// // //     // Validate location
// // //     if (!formData.location.district || !formData.location.taluka || !formData.location.village) {
// // //       toast.error("Please select complete location details")
// // //       return
// // //     }

// // //     setIsLoading(true)
// // //     try {
// // //       const response = await fetch("/api/user/signup", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(formData),
// // //       })
// // //       const data = await response.json()
// // //       if (data.success) {
// // //         toast.success("Account created successfully!")
// // //         const isAdmin = data.user?.isAdmin
// // //         if (isAdmin) {
// // //           router.push("/admin/dashboard")
// // //         } else {
// // //           router.push("/user/dashboard")
// // //         }
// // //       } else {
// // //         toast.error(data.message || "Signup failed")
// // //       }
// // //     } catch (error) {
// // //       toast.error("Something went wrong")
// // //     } finally {
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   const handleLocationChange = (location: LocationData) => {
// // //     setFormData({ ...formData, location })
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
// // //       <div className="absolute top-6 left-6">
// // //         <Link href="/">
// // //           <Button variant="outline" size="sm" className="gap-2 bg-transparent">
// // //             <ArrowLeft className="w-4 h-4" />
// // //             Back to Home
// // //           </Button>
// // //         </Link>
// // //       </div>

// // //       <Card className="w-full max-w-md">
// // //         <CardHeader className="text-center">
// // //           <div className="flex justify-center mb-4">
// // //             <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
// // //               <Users className="w-8 h-8 text-white" />
// // //             </div>
// // //           </div>
// // //           <CardTitle className="text-2xl font-bold">Join as User</CardTitle>
// // //           <p className="text-gray-600 dark:text-gray-400">
// // //             Step {step} of 3: {step === 1 ? "Basic Info" : step === 2 ? "Verify Email" : "Location Details"}
// // //           </p>
// // //         </CardHeader>
// // //         <CardContent>
// // //           {step === 1 && (
// // //             <form onSubmit={handleSendOTP} className="space-y-4">
// // //               <div>
// // //                 <Label htmlFor="name">Full Name</Label>
// // //                 <Input
// // //                   id="name"
// // //                   value={formData.name}
// // //                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// // //                   required
// // //                 />
// // //               </div>
// // //               <div>
// // //                 <Label htmlFor="email">Email</Label>
// // //                 <div className="relative">
// // //                   <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
// // //                   <Input
// // //                     id="email"
// // //                     type="email"
// // //                     className="pl-10"
// // //                     value={formData.email}
// // //                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// // //                     required
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div>
// // //                 <Label htmlFor="phone">Phone Number</Label>
// // //                 <div className="relative">
// // //                   <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
// // //                   <Input
// // //                     id="phone"
// // //                     type="tel"
// // //                     className="pl-10"
// // //                     value={formData.phone}
// // //                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
// // //                     required
// // //                   />
// // //                 </div>
// // //               </div>
// // //               <div>
// // //                 <Label htmlFor="password">Password</Label>
// // //                 <div className="relative">
// // //                   <Input
// // //                     id="password"
// // //                     type={showPassword ? "text" : "password"}
// // //                     value={formData.password}
// // //                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
// // //                     required
// // //                   />
// // //                   <Button
// // //                     type="button"
// // //                     variant="ghost"
// // //                     size="sm"
// // //                     className="absolute right-0 top-0 h-full px-3"
// // //                     onClick={() => setShowPassword(!showPassword)}
// // //                   >
// // //                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// // //                   </Button>
// // //                 </div>
// // //               </div>
// // //               <div>
// // //                 <Label htmlFor="confirmPassword">Confirm Password</Label>
// // //                 <Input
// // //                   id="confirmPassword"
// // //                   type="password"
// // //                   value={formData.confirmPassword}
// // //                   onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
// // //                   required
// // //                 />
// // //               </div>
// // //               <Button
// // //                 type="submit"
// // //                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
// // //                 disabled={isLoading}
// // //               >
// // //                 {isLoading ? "Sending OTP..." : "Send Verification Code"}
// // //               </Button>
// // //             </form>
// // //           )}

// // //           {step === 2 && (
// // //             <form onSubmit={handleVerifyOTP} className="space-y-4">
// // //               <div className="text-center mb-4">
// // //                 <p className="text-sm text-gray-600 dark:text-gray-400">
// // //                   We've sent a verification code to
// // //                   <br />
// // //                   <strong>{formData.email}</strong>
// // //                 </p>
// // //               </div>
// // //               <div>
// // //                 <Label htmlFor="otp">Verification Code</Label>
// // //                 <Input
// // //                   id="otp"
// // //                   type="text"
// // //                   maxLength={6}
// // //                   className="text-center text-2xl tracking-widest"
// // //                   value={otp}
// // //                   onChange={(e) => setOtp(e.target.value)}
// // //                   required
// // //                 />
// // //               </div>
// // //               <Button
// // //                 type="submit"
// // //                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
// // //                 disabled={isLoading}
// // //               >
// // //                 {isLoading ? "Verifying..." : "Verify Email"}
// // //               </Button>
// // //               <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => setStep(1)}>
// // //                 Back to Previous Step
// // //               </Button>
// // //             </form>
// // //           )}

// // //           {step === 3 && (
// // //             <form onSubmit={handleCompleteSignup} className="space-y-4">
// // //               <LocationSelector value={formData.location} onChange={handleLocationChange} required />
// // //               <Button
// // //                 type="submit"
// // //                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
// // //                 disabled={isLoading}
// // //               >
// // //                 {isLoading ? "Creating Account..." : "Complete Registration"}
// // //               </Button>
// // //               <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => setStep(2)}>
// // //                 Back to Previous Step
// // //               </Button>
// // //             </form>
// // //           )}

// // //           <div className="mt-6 text-center">
// // //             <p className="text-sm text-gray-600 dark:text-gray-400">
// // //               Already have an account?{" "}
// // //               <Link href="/auth/login" className="text-blue-600 hover:underline">
// // //                 Sign in here
// // //               </Link>
// // //             </p>
// // //           </div>
// // //         </CardContent>
// // //       </Card>
// // //     </div>
// // //   )
// // // }

// // "use client"

// // import type React from "react"
// // import { useState } from "react"
// // import { useRouter } from "next/navigation"
// // import Link from "next/link"
// // import { Eye, EyeOff, Users, ArrowLeft, Mail, Phone } from "lucide-react"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import LocationSelector from "@/components/location-selector"
// // import { toast } from "react-hot-toast"

// // interface AddressData {
// //   street: string
// //   area: string
// //   townOrVillage: string
// //   taluka: string
// //   district: string
// //   pincode: string
// // }

// // export default function UserSignupPage() {
// //   const [step, setStep] = useState(1)
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     password: "",
// //     confirmPassword: "",
// //     address: {
// //       street: "",
// //       area: "",
// //       townOrVillage: "",
// //       taluka: "",
// //       district: "",
// //       pincode: "",
// //     } as AddressData,
// //   })
// //   const [otp, setOtp] = useState("")
// //   const [showPassword, setShowPassword] = useState(false)
// //   const [isLoading, setIsLoading] = useState(false)
// //   const router = useRouter()

// //   const handleSendOTP = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     if (formData.password !== formData.confirmPassword) {
// //       toast.error("Passwords do not match")
// //       return
// //     }
// //     setIsLoading(true)
// //     try {
// //       const response = await fetch("/api/auth/send-otp", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email: formData.email, role: "user" }),
// //       })
// //       const data = await response.json()
// //       if (data.success) {
// //         toast.success("OTP sent to your email!")
// //         setStep(2)
// //       } else {
// //         toast.error(data.message || "Failed to send OTP")
// //       }
// //     } catch (error) {
// //       toast.error("Something went wrong")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const handleVerifyOTP = async (e: React.FormEvent) => {
// //     e.preventDefault()
// //     setIsLoading(true)
// //     try {
// //       const response = await fetch("/api/auth/verify-otp", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify({ email: formData.email, otp }),
// //       })
// //       const data = await response.json()
// //       if (data.success) {
// //         toast.success("Email verified!")
// //         setStep(3)
// //       } else {
// //         toast.error(data.message || "Invalid OTP")
// //       }
// //     } catch (error) {
// //       toast.error("Something went wrong")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const handleCompleteSignup = async (e: React.FormEvent) => {
// //     e.preventDefault()

// //     // Validate address
// //     const { street, area, townOrVillage, taluka, district, pincode } = formData.address
// //     if (!street || !area || !townOrVillage || !taluka || !district || !pincode) {
// //       toast.error("Please fill in all address details")
// //       return
// //     }

// //     // Validate pincode format
// //     if (!/^\d{6}$/.test(pincode)) {
// //       toast.error("Please enter a valid 6-digit pincode")
// //       return
// //     }

// //     setIsLoading(true)
// //     try {
// //       const response = await fetch("/api/user/signup", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       })
// //       const data = await response.json()
// //       if (data.success) {
// //         toast.success("Account created successfully!")
// //         const isAdmin = data.user?.isAdmin
// //         if (isAdmin) {
// //           router.push("/admin/dashboard")
// //         } else {
// //           router.push("/user/dashboard")
// //         }
// //       } else {
// //         toast.error(data.message || "Signup failed")
// //       }
// //     } catch (error) {
// //       toast.error("Something went wrong")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   const handleAddressChange = (address: AddressData) => {
// //     setFormData({ ...formData, address })
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
// //       <div className="absolute top-6 left-6">
// //         <Link href="/">
// //           <Button variant="outline" size="sm" className="gap-2 bg-transparent">
// //             <ArrowLeft className="w-4 h-4" />
// //             Back to Home
// //           </Button>
// //         </Link>
// //       </div>

// //       <Card className="w-full max-w-lg">
// //         <CardHeader className="text-center">
// //           <div className="flex justify-center mb-4">
// //             <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
// //               <Users className="w-8 h-8 text-white" />
// //             </div>
// //           </div>
// //           <CardTitle className="text-2xl font-bold">Join as User</CardTitle>
// //           <p className="text-gray-600 dark:text-gray-400">
// //             Step {step} of 3: {step === 1 ? "Basic Info" : step === 2 ? "Verify Email" : "Address Details"}
// //           </p>
// //         </CardHeader>
// //         <CardContent>
// //           {step === 1 && (
// //             <form onSubmit={handleSendOTP} className="space-y-4">
// //               <div>
// //                 <Label htmlFor="name">Full Name</Label>
// //                 <Input
// //                   id="name"
// //                   value={formData.name}
// //                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                   required
// //                 />
// //               </div>
// //               <div>
// //                 <Label htmlFor="email">Email</Label>
// //                 <div className="relative">
// //                   <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
// //                   <Input
// //                     id="email"
// //                     type="email"
// //                     className="pl-10"
// //                     value={formData.email}
// //                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //               <div>
// //                 <Label htmlFor="phone">Phone Number</Label>
// //                 <div className="relative">
// //                   <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
// //                   <Input
// //                     id="phone"
// //                     type="tel"
// //                     className="pl-10"
// //                     value={formData.phone}
// //                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
// //                     required
// //                   />
// //                 </div>
// //               </div>
// //               <div>
// //                 <Label htmlFor="password">Password</Label>
// //                 <div className="relative">
// //                   <Input
// //                     id="password"
// //                     type={showPassword ? "text" : "password"}
// //                     value={formData.password}
// //                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
// //                     required
// //                   />
// //                   <Button
// //                     type="button"
// //                     variant="ghost"
// //                     size="sm"
// //                     className="absolute right-0 top-0 h-full px-3"
// //                     onClick={() => setShowPassword(!showPassword)}
// //                   >
// //                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
// //                   </Button>
// //                 </div>
// //               </div>
// //               <div>
// //                 <Label htmlFor="confirmPassword">Confirm Password</Label>
// //                 <Input
// //                   id="confirmPassword"
// //                   type="password"
// //                   value={formData.confirmPassword}
// //                   onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
// //                   required
// //                 />
// //               </div>
// //               <Button
// //                 type="submit"
// //                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
// //                 disabled={isLoading}
// //               >
// //                 {isLoading ? "Sending OTP..." : "Send Verification Code"}
// //               </Button>
// //             </form>
// //           )}

// //           {step === 2 && (
// //             <form onSubmit={handleVerifyOTP} className="space-y-4">
// //               <div className="text-center mb-4">
// //                 <p className="text-sm text-gray-600 dark:text-gray-400">
// //                   We've sent a verification code to
// //                   <br />
// //                   <strong>{formData.email}</strong>
// //                 </p>
// //               </div>
// //               <div>
// //                 <Label htmlFor="otp">Verification Code</Label>
// //                 <Input
// //                   id="otp"
// //                   type="text"
// //                   maxLength={6}
// //                   className="text-center text-2xl tracking-widest"
// //                   value={otp}
// //                   onChange={(e) => setOtp(e.target.value)}
// //                   required
// //                 />
// //               </div>
// //               <Button
// //                 type="submit"
// //                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
// //                 disabled={isLoading}
// //               >
// //                 {isLoading ? "Verifying..." : "Verify Email"}
// //               </Button>
// //               <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => setStep(1)}>
// //                 Back to Previous Step
// //               </Button>
// //             </form>
// //           )}

// //           {step === 3 && (
// //             <form onSubmit={handleCompleteSignup} className="space-y-4">
// //               <div className="text-center mb-4">
// //                 <h3 className="text-lg font-semibold">Complete Your Address</h3>
// //                 <p className="text-sm text-gray-600 dark:text-gray-400">Fill in your complete address details</p>
// //               </div>

// //               <LocationSelector value={formData.address} onChange={handleAddressChange} required />

// //               <Button
// //                 type="submit"
// //                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
// //                 disabled={isLoading}
// //               >
// //                 {isLoading ? "Creating Account..." : "Complete Registration"}
// //               </Button>
// //               <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => setStep(2)}>
// //                 Back to Previous Step
// //               </Button>
// //             </form>
// //           )}

// //           <div className="mt-6 text-center">
// //             <p className="text-sm text-gray-600 dark:text-gray-400">
// //               Already have an account?{" "}
// //               <Link href="/auth/login" className="text-blue-600 hover:underline">
// //                 Sign in here
// //               </Link>
// //             </p>
// //           </div>
// //         </CardContent>
// //       </Card>
// //     </div>
// //   )
// // }


// "use client"

// import type React from "react"
// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Eye, EyeOff, Users, ArrowLeft, Mail, Phone } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import LocationSelector from "@/components/location-selector"
// import { toast } from "react-hot-toast"

// interface AddressData {
//   district: string
//   subDistrict: string
//   village: string
//   street: string
//   area: string
// }

// export default function UserSignupPage() {
//   const [step, setStep] = useState(1)
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     confirmPassword: "",
//     address: {
//       district: "",
//       subDistrict: "",
//       village: "",
//       street: "",
//       area: "",
//     } as AddressData,
//   })
//   const [otp, setOtp] = useState("")
//   const [showPassword, setShowPassword] = useState(false)
//   const [isLoading, setIsLoading] = useState(false)
//   const router = useRouter()

//   const handleSendOTP = async (e: React.FormEvent) => {
//     e.preventDefault()
//     if (formData.password !== formData.confirmPassword) {
//       toast.error("Passwords do not match")
//       return
//     }
//     setIsLoading(true)
//     try {
//       const response = await fetch("/api/auth/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: formData.email, role: "user" }),
//       })
//       const data = await response.json()
//       if (data.success) {
//         toast.success("OTP sent to your email!")
//         setStep(2)
//       } else {
//         toast.error(data.message || "Failed to send OTP")
//       }
//     } catch (error) {
//       toast.error("Something went wrong")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleVerifyOTP = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsLoading(true)
//     try {
//       const response = await fetch("/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email: formData.email, otp }),
//       })
//       const data = await response.json()
//       if (data.success) {
//         toast.success("Email verified!")
//         setStep(3)
//       } else {
//         toast.error(data.message || "Invalid OTP")
//       }
//     } catch (error) {
//       toast.error("Something went wrong")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleCompleteSignup = async (e: React.FormEvent) => {
//     e.preventDefault()

//     // Validate address
//     const { district, subDistrict, village, street, area } = formData.address;

//     console.log("Address Data:", formData.address);
//     if (!district || !subDistrict || !village || !street || !area ) {
//       toast.error("Please fill in all address details..")
//       return
//     }

   

//     setIsLoading(true)
//     try {
//       const response = await fetch("/api/user/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       })
//       const data = await response.json()
//       if (data.success) {
//         toast.success("Account created successfully!")
//         const isAdmin = data.user?.isAdmin
//         if (isAdmin) {
//           router.push("/admin/dashboard")
//         } else {
//           router.push("/user/dashboard")
//         }
//       } else {
//         toast.error(data.message || "Signup failed")
//       }
//     } catch (error) {
//       toast.error("Something went wrong")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleAddressChange = (address: AddressData) => {
//     setFormData({ ...formData, address })
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
//       <div className="absolute top-6 left-6">
//         <Link href="/">
//           <Button variant="outline" size="sm" className="gap-2 bg-transparent">
//             <ArrowLeft className="w-4 h-4" />
//             Back to Home
//           </Button>
//         </Link>
//       </div>

//       <Card className="w-full max-w-lg">
//         <CardHeader className="text-center">
//           <div className="flex justify-center mb-4">
//             <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
//               <Users className="w-8 h-8 text-white" />
//             </div>
//           </div>
//           <CardTitle className="text-2xl font-bold">Join as User</CardTitle>
//           <p className="text-gray-600 dark:text-gray-400">
//             Step {step} of 3: {step === 1 ? "Basic Info" : step === 2 ? "Verify Email" : "Address Details"}
//           </p>
//         </CardHeader>
//         <CardContent>
//           {step === 1 && (
//             <form onSubmit={handleSendOTP} className="space-y-4">
//               <div>
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input
//                   id="name"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   required
//                 />
//               </div>
//               <div>
//                 <Label htmlFor="email">Email</Label>
//                 <div className="relative">
//                   <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                   <Input
//                     id="email"
//                     type="email"
//                     className="pl-10"
//                     value={formData.email}
//                     onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <div className="relative">
//                   <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
//                   <Input
//                     id="phone"
//                     type="tel"
//                     className="pl-10"
//                     value={formData.phone}
//                     onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
//                     required
//                   />
//                 </div>
//               </div>
//               <div>
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     type={showPassword ? "text" : "password"}
//                     value={formData.password}
//                     onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                     required
//                   />
//                   <Button
//                     type="button"
//                     variant="ghost"
//                     size="sm"
//                     className="absolute right-0 top-0 h-full px-3"
//                     onClick={() => setShowPassword(!showPassword)}
//                   >
//                     {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
//                   </Button>
//                 </div>
//               </div>
//               <div>
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <Input
//                   id="confirmPassword"
//                   type="password"
//                   value={formData.confirmPassword}
//                   onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                   required
//                 />
//               </div>
//               <Button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Sending OTP..." : "Send Verification Code"}
//               </Button>
//             </form>
//           )}

//           {step === 2 && (
//             <form onSubmit={handleVerifyOTP} className="space-y-4">
//               <div className="text-center mb-4">
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   We've sent a verification code to
//                   <br />
//                   <strong>{formData.email}</strong>
//                 </p>
//               </div>
//               <div>
//                 <Label htmlFor="otp">Verification Code</Label>
//                 <Input
//                   id="otp"
//                   type="text"
//                   maxLength={6}
//                   className="text-center text-2xl tracking-widest"
//                   value={otp}
//                   onChange={(e) => setOtp(e.target.value)}
//                   required
//                 />
//               </div>
//               <Button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Verifying..." : "Verify Email"}
//               </Button>
//               <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => setStep(1)}>
//                 Back to Previous Step
//               </Button>
//             </form>
//           )}

//           {step === 3 && (
//             <form onSubmit={handleCompleteSignup} className="space-y-4">
//               <div className="text-center mb-4">
//                 <h3 className="text-lg font-semibold">Complete Your Address</h3>
//                 <p className="text-sm text-gray-600 dark:text-gray-400">Fill in your complete address details</p>
//               </div>

//               <LocationSelector value={formData.address} onChange={handleAddressChange} required />

//               <Button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
//                 disabled={isLoading}
//               >
//                 {isLoading ? "Creating Account..." : "Complete Registration"}
//               </Button>
//               <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => setStep(2)}>
//                 Back to Previous Step
//               </Button>
//             </form>
//           )}

//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Already have an account?{" "}
//               <Link href="/auth/login" className="text-blue-600 hover:underline">
//                 Sign in here
//               </Link>
//             </p>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   )
// }


"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Users, ArrowLeft, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import LocationSelector from "@/components/location-selector"
import { toast } from "react-hot-toast"

interface AddressData {
  street: string
  area: string
  district: string
  subDistrict: string
  village: string
}

export default function UserSignupPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    address: {
      street: "",
      area: "",
      district: "",
      subDistrict: "",
      village: "",
    } as AddressData,
  })
  const [otp, setOtp] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSendOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, role: "user" }),
      })
      const data = await response.json()
      if (data.success) {
        toast.success("OTP sent to your email!")
        setStep(2)
      } else {
        toast.error(data.message || "Failed to send OTP")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, otp }),
      })
      const data = await response.json()
      if (data.success) {
        toast.success("Email verified!")
        setStep(3)
      } else {
        toast.error(data.message || "Invalid OTP")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCompleteSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate address
    const { street, area, district, subDistrict, village } = formData.address
    if (!street || !area || !district || !subDistrict || !village) {
      toast.error("Please fill in all address details")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/user/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data.success) {
        toast.success("Account created successfully!")
        const isAdmin = data.user?.isAdmin
        if (isAdmin) {
          router.push("/admin/dashboard")
        } else {
          router.push("/user/dashboard")
        }
      } else {
        toast.error(data.message || "Signup failed")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddressChange = (address: AddressData) => {
    setFormData({ ...formData, address })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Join as User</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            Step {step} of 3: {step === 1 ? "Basic Info" : step === 2 ? "Verify Email" : "Address Details"}
          </p>
        </CardHeader>
        <CardContent>
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Send Verification Code"}
              </Button>
            </form>
          )}

          {step === 2 && (
            <form onSubmit={handleVerifyOTP} className="space-y-4">
              <div className="text-center mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  We've sent a verification code to
                  <br />
                  <strong>{formData.email}</strong>
                </p>
              </div>
              <div>
                <Label htmlFor="otp">Verification Code</Label>
                <Input
                  id="otp"
                  type="text"
                  maxLength={6}
                  className="text-center text-2xl tracking-widest"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  required
                />
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>
              <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => setStep(1)}>
                Back to Previous Step
              </Button>
            </form>
          )}

          {step === 3 && (
            <form onSubmit={handleCompleteSignup} className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">Complete Your Address</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fill in your complete address details</p>
              </div>

              <LocationSelector value={formData.address} onChange={handleAddressChange} required />

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                disabled={isLoading}
              >
                {isLoading ? "Creating Account..." : "Complete Registration"}
              </Button>
              <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => setStep(2)}>
                Back to Previous Step
              </Button>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-600 hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
