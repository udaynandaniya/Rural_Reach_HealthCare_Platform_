// // //C:\Users\UDAYN\Downloads\healthcare-platform\app\hospital\signup\page.tsx
// // "use client"

// // import type React from "react"

// // import { useState } from "react"
// // import { useRouter } from "next/navigation"
// // import Link from "next/link"
// // import { Eye, EyeOff, Building2, ArrowLeft, Mail, Phone, MapPin, AlertTriangle } from "lucide-react"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // import { Checkbox } from "@/components/ui/checkbox"
// // import ThemeToggle from "@/components/ThemeToggle"
// // import { toast } from "react-hot-toast"

// // export default function HospitalSignupPage() {
// //   const [step, setStep] = useState(1)
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     phone: "",
// //     password: "",
// //     confirmPassword: "",
// //     isHandleEmergency: false,
// //     address: {
// //       street: "",
// //       area: "",
// //       townOrVillage: "",
// //       taluka: "",
// //       district: "",
// //       pincode: "",
// //     },
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
// //         body: JSON.stringify({ email: formData.email, role: "hospital" }),
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
// //     setIsLoading(true)

// //     try {
// //       const response = await fetch("/api/hospital/signup", {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json" },
// //         body: JSON.stringify(formData),
// //       })

// //       const data = await response.json()
// //       if (data.success) {
// //         toast.success("Account created successfully!")
// //         router.push("/hospital/dashboard")
// //       } else {
// //         toast.error(data.message || "Signup failed")
// //       }
// //     } catch (error) {
// //       toast.error("Something went wrong")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   return (
// //     <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
// //       <div className="absolute top-6 left-6">
// //         <Link href="/">
// //           <Button variant="outline" size="sm" className="gap-2 bg-transparent">
// //             <ArrowLeft className="w-4 h-4" />
// //             Back to Home
// //           </Button>
// //         </Link>
// //       </div>

// //       <div className="absolute top-6 right-6">
// //         <ThemeToggle />
// //       </div>

// //       <Card className="w-full max-w-md">
// //         <CardHeader className="text-center">
// //           <div className="flex justify-center mb-4">
// //             <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
// //               <Building2 className="w-8 h-8 text-white" />
// //             </div>
// //           </div>
// //           <CardTitle className="text-2xl font-bold">Join as Hospital</CardTitle>
// //           <p className="text-gray-600 dark:text-gray-400">
// //             Step {step} of 3: {step === 1 ? "Hospital Info" : step === 2 ? "Verify Email" : "Address Details"}
// //           </p>
// //         </CardHeader>

// //         <CardContent>
// //           {step === 1 && (
// //             <form onSubmit={handleSendOTP} className="space-y-4">
// //               <div>
// //                 <Label htmlFor="name">Hospital Name</Label>
// //                 <Input
// //                   id="name"
// //                   value={formData.name}
// //                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                   required
// //                 />
// //               </div>

// //               <div>
// //                 <Label htmlFor="email">Official Email</Label>
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
// //                 <Label htmlFor="phone">Contact Number</Label>
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

// //               <div className="flex items-center space-x-2 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
// //                 <Checkbox
// //                   id="emergency"
// //                   checked={formData.isHandleEmergency}
// //                   onCheckedChange={(checked) => setFormData({ ...formData, isHandleEmergency: checked as boolean })}
// //                 />
// //                 <div className="flex items-center gap-2">
// //                   <AlertTriangle className="w-4 h-4 text-orange-600" />
// //                   <Label htmlFor="emergency" className="text-sm font-medium">
// //                     We can handle emergency cases
// //                   </Label>
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
// //                 className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
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
// //                 className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
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
// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <Label htmlFor="street">Street</Label>
// //                   <Input
// //                     id="street"
// //                     value={formData.address.street}
// //                     onChange={(e) =>
// //                       setFormData({
// //                         ...formData,
// //                         address: { ...formData.address, street: e.target.value },
// //                       })
// //                     }
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <Label htmlFor="area">Area</Label>
// //                   <Input
// //                     id="area"
// //                     value={formData.address.area}
// //                     onChange={(e) =>
// //                       setFormData({
// //                         ...formData,
// //                         address: { ...formData.address, area: e.target.value },
// //                       })
// //                     }
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <Label htmlFor="townOrVillage">Town/Village</Label>
// //                 <Input
// //                   id="townOrVillage"
// //                   value={formData.address.townOrVillage}
// //                   onChange={(e) =>
// //                     setFormData({
// //                       ...formData,
// //                       address: { ...formData.address, townOrVillage: e.target.value },
// //                     })
// //                   }
// //                   required
// //                 />
// //               </div>

// //               <div className="grid grid-cols-2 gap-4">
// //                 <div>
// //                   <Label htmlFor="taluka">Taluka</Label>
// //                   <Input
// //                     id="taluka"
// //                     value={formData.address.taluka}
// //                     onChange={(e) =>
// //                       setFormData({
// //                         ...formData,
// //                         address: { ...formData.address, taluka: e.target.value },
// //                       })
// //                     }
// //                     required
// //                   />
// //                 </div>
// //                 <div>
// //                   <Label htmlFor="district">District</Label>
// //                   <Input
// //                     id="district"
// //                     value={formData.address.district}
// //                     onChange={(e) =>
// //                       setFormData({
// //                         ...formData,
// //                         address: { ...formData.address, district: e.target.value },
// //                       })
// //                     }
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               <div>
// //                 <Label htmlFor="pincode">Pincode</Label>
// //                 <div className="relative">
// //                   <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
// //                   <Input
// //                     id="pincode"
// //                     className="pl-10"
// //                     value={formData.address.pincode}
// //                     onChange={(e) =>
// //                       setFormData({
// //                         ...formData,
// //                         address: { ...formData.address, pincode: e.target.value },
// //                       })
// //                     }
// //                     required
// //                   />
// //                 </div>
// //               </div>

// //               <Button
// //                 type="submit"
// //                 className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
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
// //               <Link href="/auth/login" className="text-purple-600 hover:underline">
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
// import { useToast } from "@/components/ui/use-toast"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { cn } from "@/lib/utils"
// import { Icons } from "@/components/icons"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import Link from "next/link"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea"
// import LocationSelector from "@/components/location-selector"

// interface AddressData {
//   address: {
//     street: ""
//     area: ""
//     district: ""
//     subDistrict: ""
//     village: ""
//   }
// }

// interface SignupFormProps {
//   searchParams: { [key: string]: string | string[] | undefined }
// }

// const SignupForm: React.FC<SignupFormProps> = ({ searchParams }) => {
//   const [isLoading, setIsLoading] = useState<boolean>(false)
//   const [step, setStep] = useState<number>(1)
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phoneNumber: "",
//     hospitalType: "Government",
//     description: "",
//     address: {
//       street: "",
//       area: "",
//       district: "",
//       subDistrict: "",
//       village: "",
//     },
//     terms: false,
//   })
//   const router = useRouter()
//   const { toast } = useToast()

//   const handleNext = () => {
//     if (step === 1) {
//       if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword) {
//         toast({
//           title: "Error",
//           description: "Please fill in all required fields.",
//           variant: "destructive",
//         })
//         return
//       }
//       if (formData.password !== formData.confirmPassword) {
//         toast({
//           title: "Error",
//           description: "Passwords do not match.",
//           variant: "destructive",
//         })
//         return
//       }
//       setStep(2)
//     } else if (step === 2) {
//       if (!formData.phoneNumber || !formData.hospitalType || !formData.description) {
//         toast({
//           title: "Error",
//           description: "Please fill in all required fields.",
//           variant: "destructive",
//         })
//         return
//       }
//       setStep(3)
//     }
//   }

//   const handleBack = () => {
//     setStep(step - 1)
//   }

//   const handleCompleteSignup = async () => {
//     setIsLoading(true)
//     const { street, area, district, subDistrict, village } = formData.address
//     if (!street || !area || !district || !subDistrict || !village) {
//       toast.error("Please fill in all address details")
//       return
//     }

//     if (!formData.terms) {
//       toast.error("Please accept the terms and conditions")
//       return
//     }

//     // Here you would typically send the form data to your backend
//     // For this example, we'll just simulate a successful signup
//     await new Promise((resolve) => setTimeout(resolve, 1000))

//     setIsLoading(false)
//     toast({
//       title: "Success",
//       description: "Your account has been created.",
//     })
//     router.push("/login")
//   }

//   return (
//     <div className="container grid h-screen w-screen gap-10 place-items-center lg:max-w-none lg:px-0 lg:grid-cols-2">
//       <div className="relative hidden h-full flex-col p-6 text-muted-foreground antialiased  lg:flex">
//         <div className="relative h-full w-full">
//           <img src="/hospital-signup.svg" alt="Sign up" className="absolute object-cover" />
//         </div>
//       </div>
//       <div className="lg:p-8">
//         <Card className="w-[500px]">
//           <CardHeader className="space-y-1">
//             <CardTitle className="text-2xl">Create an account</CardTitle>
//           </CardHeader>
//           <CardContent className="grid gap-4">
//             <div className={cn(step !== 1 && "hidden")}>
//               <div className="grid gap-2">
//                 <Label htmlFor="name">Name</Label>
//                 <Input
//                   id="name"
//                   placeholder="Enter your name"
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   disabled={isLoading}
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   placeholder="Enter your email"
//                   type="email"
//                   value={formData.email}
//                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
//                   disabled={isLoading}
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="password">Password</Label>
//                 <Input
//                   id="password"
//                   placeholder="Enter your password"
//                   type="password"
//                   value={formData.password}
//                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
//                   disabled={isLoading}
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <Input
//                   id="confirmPassword"
//                   placeholder="Confirm your password"
//                   type="password"
//                   value={formData.confirmPassword}
//                   onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
//                   disabled={isLoading}
//                 />
//               </div>
//             </div>

//             <div className={cn(step !== 2 && "hidden")}>
//               <div className="grid gap-2">
//                 <Label htmlFor="phoneNumber">Phone Number</Label>
//                 <Input
//                   id="phoneNumber"
//                   placeholder="Enter your phone number"
//                   type="tel"
//                   value={formData.phoneNumber}
//                   onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
//                   disabled={isLoading}
//                 />
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="hospitalType">Hospital Type</Label>
//                 <Select onValueChange={(value) => setFormData({ ...formData, hospitalType: value })}>
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select hospital type" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     <SelectItem value="Government">Government</SelectItem>
//                     <SelectItem value="Private">Private</SelectItem>
//                     <SelectItem value="Trust">Trust</SelectItem>
//                   </SelectContent>
//                 </Select>
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="description">Description</Label>
//                 <Textarea
//                   id="description"
//                   placeholder="Enter hospital description"
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   disabled={isLoading}
//                 />
//               </div>
//             </div>

//             <div className={cn(step !== 3 && "hidden")}>
//               <LocationSelector
//                 value={formData.address}
//                 onChange={(address) => setFormData({ ...formData, address })}
//                 required
//               />
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="terms"
//                   checked={formData.terms}
//                   onCheckedChange={(checked) => setFormData({ ...formData, terms: !!checked })}
//                 />
//                 <Label htmlFor="terms">
//                   I agree to the <Link href="/terms">Terms and Conditions</Link>
//                 </Label>
//               </div>
//             </div>

//             <div className="flex justify-between">
//               {step > 1 && (
//                 <Button variant="secondary" onClick={handleBack} disabled={isLoading}>
//                   Back
//                 </Button>
//               )}
//               {step < 3 ? (
//                 <Button onClick={handleNext} disabled={isLoading}>
//                   Next
//                 </Button>
//               ) : (
//                 <Button onClick={handleCompleteSignup} disabled={isLoading}>
//                   {isLoading && <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />}
//                   Sign Up
//                 </Button>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export default SignupForm

"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Eye, EyeOff, Building2, ArrowLeft, Mail, Phone, AlertTriangle, Icon, icons } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import LocationSelector from "@/components/location-selector"
import { toast } from "react-hot-toast" // Using react-hot-toast as per user's previous usage
import ThemeToggle from "@/components/ThemeToggle" // Re-adding ThemeToggle
// import Icons from "@/components/icons" // Declaring Icons variable
import { Icons } from "@/components/icons" // Importing Icons from components/icons

interface AddressData {
  street: string
  area: string
  district: string
  subDistrict: string
  village: string
}

export default function HospitalSignupPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "", // Changed from phoneNumber to phone for API consistency
    password: "",
    confirmPassword: "",
    isHandleEmergency: false, // Added from commented version
    hospitalType: "Government", // Retained from current version
    description: "", // Retained from current version
    address: {
      street: "",
      area: "",
      district: "",
      subDistrict: "",
      village: "",
    } as AddressData,
    terms: false, // Retained from current version
  })
  const [otp, setOtp] = useState("") // Added for OTP flow
  const [showPassword, setShowPassword] = useState(false) // Added for password visibility
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
        body: JSON.stringify({ email: formData.email, role: "hospital" }),
      })
      const data = await response.json()
      if (data.success) {
        toast.success("OTP sent to your email!")
        setStep(2) // Move to OTP verification step
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
        setStep(3) // Move to additional hospital details step
      } else {
        toast.error(data.message || "Invalid OTP")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setIsLoading(false)
    }
  }

  const handleNextStep = () => {
    if (step === 1) {
      // This step is handled by handleSendOTP
    } else if (step === 2) {
      // This step is handled by handleVerifyOTP
    } else if (step === 3) {
      if (!formData.hospitalType || !formData.description) {
        toast.error("Please fill in all required hospital details.")
        return
      }
      setStep(4) // Move to address details step
    }
  }

  const handleBackStep = () => {
    setStep(step - 1)
  }

  const handleCompleteSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate address
    const { street, area, district, subDistrict, village } = formData.address
    if (!street || !area || !district || !subDistrict || !village) {
      toast.error("Please fill in all address details")
      return
    }
    if (!formData.terms) {
      toast.error("Please accept the terms and conditions")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/hospital/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })
      const data = await response.json()
      if (data.success) {
        toast.success("Account created successfully!")
        router.push("/hospital/dashboard") // Redirect to hospital dashboard
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
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="absolute top-6 left-6">
        <Link href="/">
          <Button variant="outline" size="sm" className="gap-2 bg-transparent">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      <div className="absolute top-6 right-6">
        <ThemeToggle />
      </div>

      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center">
              <Building2 className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Join as Hospital</CardTitle>
          <p className="text-gray-600 dark:text-gray-400">
            Step {step} of 4:{" "}
            {step === 1
              ? "Hospital Info"
              : step === 2
                ? "Verify Email"
                : step === 3
                  ? "Additional Details"
                  : "Address Details"}
          </p>
        </CardHeader>
        <CardContent>
          {/* Step 1: Hospital Info */}
          {step === 1 && (
            <form onSubmit={handleSendOTP} className="space-y-4">
              <div>
                <Label htmlFor="name">Hospital Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">Official Email</Label>
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
                <Label htmlFor="phone">Contact Number</Label>
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
              <div className="flex items-center space-x-2 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
                <Checkbox
                  id="emergency"
                  checked={formData.isHandleEmergency}
                  onCheckedChange={(checked) => setFormData({ ...formData, isHandleEmergency: checked as boolean })}
                />
                <div className="flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 text-orange-600" />
                  <Label htmlFor="emergency" className="text-sm font-medium">
                    We can handle emergency cases
                  </Label>
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
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? "Sending OTP..." : "Send Verification Code"}
              </Button>
            </form>
          )}

          {/* Step 2: Verify OTP */}
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
                className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>
              <Button type="button" variant="outline" className="w-full bg-transparent" onClick={handleBackStep}>
                Back to Previous Step
              </Button>
            </form>
          )}

          {/* Step 3: Additional Hospital Details */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="hospitalType">Hospital Type</Label>
                <Select onValueChange={(value) => setFormData({ ...formData, hospitalType: value })}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select hospital type" defaultValue={formData.hospitalType} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Government">Government</SelectItem>
                    <SelectItem value="Private">Private</SelectItem>
                    <SelectItem value="Trust">Trust</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter hospital description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>
              <div className="flex justify-between">
                <Button variant="secondary" onClick={handleBackStep} disabled={isLoading}>
                  Back
                </Button>
                <Button onClick={handleNextStep} disabled={isLoading}>
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Address Details */}
          {step === 4 && (
            <form onSubmit={handleCompleteSignup} className="space-y-4">
              <div className="text-center mb-4">
                <h3 className="text-lg font-semibold">Complete Your Address</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">Fill in your complete address details</p>
              </div>

              <LocationSelector value={formData.address} onChange={handleAddressChange} required />

              <div className="flex items-center space-x-2">
                <Checkbox
                  id="terms"
                  checked={formData.terms}
                  onCheckedChange={(checked) => setFormData({ ...formData, terms: !!checked })}
                  required
                />
                <Label htmlFor="terms">
                  I agree to the{" "}
                  <Link href="/terms" className="text-purple-600 hover:underline">
                    Terms and Conditions
                  </Link>
                </Label>
              </div>

              <div className="flex justify-between">
                <Button variant="secondary" onClick={handleBackStep} disabled={isLoading}>
                  Back
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading ? (
                    <>
                      <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                      Creating Account...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </Button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-purple-600 hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
