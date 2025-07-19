// // // //C:\Users\UDAYN\Downloads\healthcare-platform\app\doctor\signup\page.tsx
// // // "use client"

// // // import type React from "react"

// // // import { useState } from "react"
// // // import { useRouter } from "next/navigation"
// // // import Link from "next/link"
// // // import { Eye, EyeOff, UserCheck, ArrowLeft, Mail, Phone, MapPin, Stethoscope } from "lucide-react"
// // // import { Button } from "@/components/ui/button"
// // // import { Input } from "@/components/ui/input"
// // // import { Label } from "@/components/ui/label"
// // // import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// // // import ThemeToggle from "@/components/ThemeToggle"
// // // import { toast } from "react-hot-toast"

// // // export default function DoctorSignupPage() {
// // //   const [step, setStep] = useState(1)
// // //   const [formData, setFormData] = useState({
// // //     name: "",
// // //     email: "",
// // //     phone: "",
// // //     password: "",
// // //     confirmPassword: "",
// // //     specialty: "",
// // //     address: {
// // //       street: "",
// // //       area: "",
// // //       townOrVillage: "",
// // //       taluka: "",
// // //       district: "",
// // //       pincode: "",
// // //     },
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
// // //         body: JSON.stringify({ email: formData.email, role: "doctor" }),
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
// // //     setIsLoading(true)

// // //     try {
// // //       const response = await fetch("/api/doctor/signup", {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json" },
// // //         body: JSON.stringify(formData),
// // //       })

// // //       const data = await response.json()
// // //       if (data.success) {
// // //         toast.success("Account created successfully!")
// // //         router.push("/doctor/dashboard")
// // //       } else {
// // //         toast.error(data.message || "Signup failed")
// // //       }
// // //     } catch (error) {
// // //       toast.error("Something went wrong")
// // //     } finally {
// // //       setIsLoading(false)
// // //     }
// // //   }

// // //   return (
// // //     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
// // //       <div className="absolute top-6 left-6">
// // //         <Link href="/">
// // //           <Button variant="outline" size="sm" className="gap-2 bg-transparent">
// // //             <ArrowLeft className="w-4 h-4" />
// // //             Back to Home
// // //           </Button>
// // //         </Link>
// // //       </div>

// // //       <div className="absolute top-6 right-6">
// // //         <ThemeToggle />
// // //       </div>

// // //       <Card className="w-full max-w-md">
// // //         <CardHeader className="text-center">
// // //           <div className="flex justify-center mb-4">
// // //             <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
// // //               <UserCheck className="w-8 h-8 text-white" />
// // //             </div>
// // //           </div>
// // //           <CardTitle className="text-2xl font-bold">Join as Doctor</CardTitle>
// // //           <p className="text-gray-600 dark:text-gray-400">
// // //             Step {step} of 3: {step === 1 ? "Professional Info" : step === 2 ? "Verify Email" : "Address Details"}
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
// // //                 <Label htmlFor="specialty">Medical Specialty</Label>
// // //                 <div className="relative">
// // //                   <Stethoscope className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
// // //                   <Input
// // //                     id="specialty"
// // //                     className="pl-10"
// // //                     placeholder="e.g., General Medicine, Cardiology"
// // //                     value={formData.specialty}
// // //                     onChange={(e) => setFormData({ ...formData, specialty: e.target.value })}
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
// // //                 className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
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
// // //                 className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
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
// // //               <div className="grid grid-cols-2 gap-4">
// // //                 <div>
// // //                   <Label htmlFor="street">Street</Label>
// // //                   <Input
// // //                     id="street"
// // //                     value={formData.address.street}
// // //                     onChange={(e) =>
// // //                       setFormData({
// // //                         ...formData,
// // //                         address: { ...formData.address, street: e.target.value },
// // //                       })
// // //                     }
// // //                     required
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <Label htmlFor="area">Area</Label>
// // //                   <Input
// // //                     id="area"
// // //                     value={formData.address.area}
// // //                     onChange={(e) =>
// // //                       setFormData({
// // //                         ...formData,
// // //                         address: { ...formData.address, area: e.target.value },
// // //                       })
// // //                     }
// // //                     required
// // //                   />
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <Label htmlFor="townOrVillage">Town/Village</Label>
// // //                 <Input
// // //                   id="townOrVillage"
// // //                   value={formData.address.townOrVillage}
// // //                   onChange={(e) =>
// // //                     setFormData({
// // //                       ...formData,
// // //                       address: { ...formData.address, townOrVillage: e.target.value },
// // //                     })
// // //                   }
// // //                   required
// // //                 />
// // //               </div>

// // //               <div className="grid grid-cols-2 gap-4">
// // //                 <div>
// // //                   <Label htmlFor="taluka">Taluka</Label>
// // //                   <Input
// // //                     id="taluka"
// // //                     value={formData.address.taluka}
// // //                     onChange={(e) =>
// // //                       setFormData({
// // //                         ...formData,
// // //                         address: { ...formData.address, taluka: e.target.value },
// // //                       })
// // //                     }
// // //                     required
// // //                   />
// // //                 </div>
// // //                 <div>
// // //                   <Label htmlFor="district">District</Label>
// // //                   <Input
// // //                     id="district"
// // //                     value={formData.address.district}
// // //                     onChange={(e) =>
// // //                       setFormData({
// // //                         ...formData,
// // //                         address: { ...formData.address, district: e.target.value },
// // //                       })
// // //                     }
// // //                     required
// // //                   />
// // //                 </div>
// // //               </div>

// // //               <div>
// // //                 <Label htmlFor="pincode">Pincode</Label>
// // //                 <div className="relative">
// // //                   <MapPin className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
// // //                   <Input
// // //                     id="pincode"
// // //                     className="pl-10"
// // //                     value={formData.address.pincode}
// // //                     onChange={(e) =>
// // //                       setFormData({
// // //                         ...formData,
// // //                         address: { ...formData.address, pincode: e.target.value },
// // //                       })
// // //                     }
// // //                     required
// // //                   />
// // //                 </div>
// // //               </div>

// // //               <Button
// // //                 type="submit"
// // //                 className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
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
// // //               <Link href="/auth/login" className="text-green-600 hover:underline">
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

// // import { useState } from "react"
// // import { useRouter } from "next/navigation"
// // import { useToast } from "@/components/ui/use-toast"
// // import { Button } from "@/components/ui/button"
// // import { Input } from "@/components/ui/input"
// // import { Label } from "@/components/ui/label"
// // import { cn } from "@/lib/utils"

// // import { zodResolver } from "@hookform/resolvers/zod"
// // import { useForm } from "react-hook-form"
// // import * as z from "zod"
// // import { Textarea } from "@/components/ui/textarea"
// // import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// // import { Calendar } from "@/components/ui/calendar"
// // import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
// // import { format } from "date-fns"
// // import { CalendarIcon } from "lucide-react"
// // import { Checkbox } from "@/components/ui/checkbox"
// // // import { supabase } from "@/lib/supabase"
// // import LocationSelector from "@/components/location-selector"
// // import { Icons } from "@/components/icons"
// // import { Stethoscope } from "lucide-react";

// // const genderOptions = [
// //   { value: "male", label: "Male" },
// //   { value: "female", label: "Female" },
// //   { value: "other", label: "Other" },
// // ]

// // const specializationOptions = [
// //   { value: "cardiology", label: "Cardiology" },
// //   { value: "dermatology", label: "Dermatology" },
// //   { value: "endocrinology", label: "Endocrinology" },
// //   { value: "gastroenterology", label: "Gastroenterology" },
// //   { value: "neurology", label: "Neurology" },
// //   { value: "oncology", label: "Oncology" },
// //   { value: "ophthalmology", label: "Ophthalmology" },
// //   { value: "orthopedics", label: "Orthopedics" },
// //   { value: "pediatrics", label: "Pediatrics" },
// //   { value: "psychiatry", label: "Psychiatry" },
// //   { value: "radiology", label: "Radiology" },
// //   { value: "urology", label: "Urology" },
// // ]

// // interface AddressData {
// //   address: {
// //     street: ""
// //     area: ""
// //     district: ""
// //     subDistrict: ""
// //     village: ""
// //   }
// // }

// // const SignupFormSchema = z.object({
// //   name: z.string().min(2, {
// //     message: "Name must be at least 2 characters.",
// //   }),
// //   email: z.string().email({
// //     message: "Please enter a valid email.",
// //   }),
// //   password: z.string().min(8, {
// //     message: "Password must be at least 8 characters.",
// //   }),
// //   gender: z.string().min(1, {
// //     message: "Please select a gender.",
// //   }),
// //   dob: z.date({
// //     required_error: "Please select a date of birth.",
// //   }),
// //   phone: z.string().regex(/^(\+?\d{1,4}[\s-])?(?!0+\s)(?!0{3,}\s)[\d\s-]+$/, {
// //     message: "Please enter a valid phone number.",
// //   }),
// //   specialization: z.string().min(1, {
// //     message: "Please select a specialization.",
// //   }),
// //   experience: z.string().min(1, {
// //     message: "Please enter your experience.",
// //   }),
// //   bio: z.string().min(10, {
// //     message: "Bio must be at least 10 characters.",
// //   }),
// //   address: z.object({
// //     street: z.string().min(2, {
// //       message: "Street must be at least 2 characters.",
// //     }),
// //     area: z.string().min(2, {
// //       message: "Area must be at least 2 characters.",
// //     }),
// //     district: z.string().min(2, {
// //       message: "District must be at least 2 characters.",
// //     }),
// //     subDistrict: z.string().min(2, {
// //       message: "Sub District must be at least 2 characters.",
// //     }),
// //     village: z.string().min(2, {
// //       message: "Village must be at least 2 characters.",
// //     }),
// //   }),
// //   terms: z.boolean().refine((value) => value === true, {
// //     message: "You must accept the terms and conditions.",
// //   }),
// // })

// // export default function DoctorSignupPage() {
// //   const [isLoading, setIsLoading] = useState<boolean>(false)
// //   const [step, setStep] = useState<number>(1)
// //   const [formData, setFormData] = useState({
// //     name: "",
// //     email: "",
// //     password: "",
// //     gender: "",
// //     dob: new Date(),
// //     phone: "",
// //     specialization: "",
// //     experience: "",
// //     bio: "",
// //     address: {
// //       street: "",
// //       area: "",
// //       district: "",
// //       subDistrict: "",
// //       village: "",
// //     },
// //     terms: false,
// //   })

// //   const router = useRouter()
// //   const { toast } = useToast()

// //   const form = useForm<z.infer<typeof SignupFormSchema>>({
// //     resolver: zodResolver(SignupFormSchema),
// //     defaultValues: {
// //       name: "",
// //       email: "",
// //       password: "",
// //       gender: "",
// //       dob: new Date(),
// //       phone: "",
// //       specialization: "",
// //       experience: "",
// //       bio: "",
// //       address: {
// //         street: "",
// //         area: "",
// //         district: "",
// //         subDistrict: "",
// //         village: "",
// //       },
// //       terms: false,
// //     },
// //   })

// //   function handleNext() {
// //     setStep(step + 1)
// //   }

// //   function handlePrev() {
// //     setStep(step - 1)
// //   }

// //   async function handleCompleteSignup() {
// //     try {
// //       setIsLoading(true)
// //       const { name, email, password, gender, dob, phone, specialization, experience, bio, address } = formData

// //       const { street, area, district, subDistrict, village } = formData.address
// //       if (!street || !area || !district || !subDistrict || !village) {
// //         toast.error("Please fill in all address details")
// //         return
// //       }

// //       const { data, error } = await supabase.auth.signUp({
// //         email,
// //         password,
// //         options: {
// //           data: {
// //             name,
// //             gender,
// //             dob: dob.toISOString(),
// //             phone,
// //             specialization,
// //             experience,
// //             bio,
// //             address,
// //             role: "doctor",
// //           },
// //         },
// //       })

// //       if (error) {
// //         toast.error(error.message)
// //       } else {
// //         toast.success("Signup successful! Please check your email to verify your account.")
// //         router.push("/sign-in")
// //       }
// //     } catch (error) {
// //       toast.error("Something went wrong. Please try again.")
// //     } finally {
// //       setIsLoading(false)
// //     }
// //   }

// //   return (
// //     // <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:border-r lg:px-0">
// //     //   <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
// //     //     <div className="flex flex-col space-y-2 text-center">
// //     //       <Icons.logo className="mx-auto h-6 w-6" />
// //     //       <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
// //     //       <p className="text-sm text-muted-foreground">
// //     //         {step === 1
// //     //           ? "Enter your basic information to create an account"
// //     //           : step === 2
// //     //             ? "Tell us more about your professional details"
// //     //             : "Almost there! Provide your address and agree to our terms"}
// //     //       </p>
// //     //     </div>

// //      <div className="container relative h-[800px] flex-col items-center justify-center md:grid lg:max-w-none lg:border-r lg:px-0">
// //     <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
// //       <div className="flex flex-col space-y-2 text-center">
// //         <div className="flex justify-center mb-4">
// //           <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center">
// //             <Stethoscope className="w-8 h-8 text-white" />
// //           </div>
// //         </div>
// //         <h1 className="text-2xl font-bold">Join as Doctor</h1>
// //         <p className="text-sm text-muted-foreground">
// //           {step === 1
// //             ? "Enter your basic information to create an account"
// //             : step === 2
// //               ? "Tell us more about your professional details"
// //               : "Almost there! Provide your address and agree to our terms"}
// //         </p>
// //       </div>
// //         <div className="grid gap-6">
// //           {step === 1 && (
// //             <>
// //               <div className="grid gap-2">
// //                 <Label htmlFor="name">Name</Label>
// //                 <Input
// //                   id="name"
// //                   placeholder="John Doe"
// //                   type="text"
// //                   value={formData.name}
// //                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
// //                   required
// //                 />
// //               </div>
// //               <div className="grid gap-2">
// //                 <Label htmlFor="email">Email</Label>
// //                 <Input
// //                   id="email"
// //                   placeholder="name@example.com"
// //                   type="email"
// //                   autoCapitalize="none"
// //                   autoComplete="email"
// //                   value={formData.email}
// //                   onChange={(e) => setFormData({ ...formData, email: e.target.value })}
// //                   required
// //                 />
// //               </div>
// //               <div className="grid gap-2">
// //                 <Label htmlFor="password">Password</Label>
// //                 <Input
// //                   id="password"
// //                   placeholder="Password"
// //                   type="password"
// //                   value={formData.password}
// //                   onChange={(e) => setFormData({ ...formData, password: e.target.value })}
// //                   required
// //                 />
// //               </div>
// //               <div className="grid gap-2">
// //                 <Label htmlFor="gender">Gender</Label>
// //                 <Select onValueChange={(value) => setFormData({ ...formData, gender: value })}>
// //                   <SelectTrigger className="w-full">
// //                     <SelectValue placeholder="Select a gender" defaultValue={formData.gender} />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     {genderOptions.map((option) => (
// //                       <SelectItem key={option.value} value={option.value}>
// //                         {option.label}
// //                       </SelectItem>
// //                     ))}
// //                   </SelectContent>
// //                 </Select>
// //               </div>
// //               <div className="grid gap-2">
// //                 <Label htmlFor="dob">Date of Birth</Label>
// //                 <Popover>
// //                   <PopoverTrigger asChild>
// //                     <Button
// //                       variant={"outline"}
// //                       className={cn(
// //                         "w-[280px] justify-start text-left font-normal",
// //                         !formData.dob && "text-muted-foreground",
// //                       )}
// //                     >
// //                       <CalendarIcon className="mr-2 h-4 w-4" />
// //                       {formData.dob ? format(formData.dob, "PPP") : <span>Pick a date</span>}
// //                     </Button>
// //                   </PopoverTrigger>
// //                   <PopoverContent className="w-auto p-0" align="start">
// //                     <Calendar
// //                       mode="single"
// //                       selected={formData.dob}
// //                       onSelect={(date) => setFormData({ ...formData, dob: date as Date })}
// //                       disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
// //                       initialFocus
// //                     />
// //                   </PopoverContent>
// //                 </Popover>
// //               </div>
// //             </>
// //           )}
// //           {step === 2 && (
// //             <>
// //               <div className="grid gap-2">
// //                 <Label htmlFor="phone">Phone Number</Label>
// //                 <Input
// //                   id="phone"
// //                   placeholder="9876543210"
// //                   type="tel"
// //                   value={formData.phone}
// //                   onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
// //                   required
// //                 />
// //               </div>
// //               <div className="grid gap-2">
// //                 <Label htmlFor="specialization">Specialization</Label>
// //                 <Select onValueChange={(value) => setFormData({ ...formData, specialization: value })}>
// //                   <SelectTrigger className="w-full">
// //                     <SelectValue placeholder="Select a specialization" defaultValue={formData.specialization} />
// //                   </SelectTrigger>
// //                   <SelectContent>
// //                     {specializationOptions.map((option) => (
// //                       <SelectItem key={option.value} value={option.value}>
// //                         {option.label}
// //                       </SelectItem>
// //                     ))}
// //                   </SelectContent>
// //                 </Select>
// //               </div>
// //               <div className="grid gap-2">
// //                 <Label htmlFor="experience">Years of Experience</Label>
// //                 <Input
// //                   id="experience"
// //                   placeholder="5"
// //                   type="number"
// //                   value={formData.experience}
// //                   onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
// //                   required
// //                 />
// //               </div>
// //               <div className="grid gap-2">
// //                 <Label htmlFor="bio">Bio</Label>
// //                 <Textarea
// //                   id="bio"
// //                   placeholder="Write a short bio about yourself"
// //                   value={formData.bio}
// //                   onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
// //                   required
// //                 />
// //               </div>
// //             </>
// //           )}
// //           {step === 3 && (
// //             <>
// //               <LocationSelector
// //                 value={formData.address}
// //                 onChange={(address) => setFormData({ ...formData, address })}
// //                 required
// //               />
// //               <div className="flex items-center space-x-2">
// //                 <Checkbox
// //                   id="terms"
// //                   checked={formData.terms}
// //                   onCheckedChange={(checked) => setFormData({ ...formData, terms: checked as boolean })}
// //                 />
// //                 <div className="grid gap-0.5">
// //                   <Label htmlFor="terms">
// //                     I agree to the{" "}
// //                     <a href="#" className="underline underline-offset-2">
// //                       terms and conditions
// //                     </a>
// //                   </Label>
// //                 </div>
// //               </div>
// //             </>
// //           )}
// //           {step === 1 && (
// //             <Button onClick={handleNext}>
// //               Next <Icons.arrowRight className="ml-2 h-4 w-4" />
// //             </Button>
// //           )}
// //           {step === 2 && (
// //             <div className="flex justify-between">
// //               <Button variant="secondary" onClick={handlePrev}>
// //                 <Icons.arrowLeft className="mr-2 h-4 w-4" /> Previous
// //               </Button>
// //               <Button onClick={handleNext}>
// //                 Next <Icons.arrowRight className="ml-2 h-4 w-4" />
// //               </Button>
// //             </div>
// //           )}
// //           {step === 3 && (
// //             <div className="flex justify-between">
// //               <Button variant="secondary" onClick={handlePrev}>
// //                 <Icons.arrowLeft className="mr-2 h-4 w-4" /> Previous
// //               </Button>
// //               <Button disabled={isLoading} onClick={handleCompleteSignup}>
// //                 {isLoading ? (
// //                   <>
// //                     <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
// //                     Please wait
// //                   </>
// //                 ) : (
// //                   "Complete Signup"
// //                 )}
// //               </Button>
// //             </div>
// //           )}
// //         </div>
// //       </div>
// //     </div>
// //   )
// // }















// "use client"

// import { useState } from "react"
// import { useRouter } from "next/navigation"
// import Link from "next/link"
// import { Eye, EyeOff, ArrowLeft, Stethoscope } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import ThemeToggle from "@/components/ThemeToggle"
// import { useToast } from "@/components/ui/use-toast"
// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import * as z from "zod"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import LocationSelector from "@/components/location-selector"
// import { Icons } from "@/components/icons"

// const specialtyOptions = [
//   { value: "cardiology", label: "Cardiology" },
//   { value: "dermatology", label: "Dermatology" },
//   { value: "endocrinology", label: "Endocrinology" },
//   { value: "gastroenterology", label: "Gastroenterology" },
//   { value: "neurology", label: "Neurology" },
//   { value: "oncology", label: "Oncology" },
//   { value: "ophthalmology", label: "Ophthalmology" },
//   { value: "orthopedics", label: "Orthopedics" },
//   { value: "pediatrics", label: "Pediatrics" },
//   { value: "psychiatry", label: "Psychiatry" },
//   { value: "radiology", label: "Radiology" },
//   { value: "urology", label: "Urology" },
// ]

// const SignupFormSchema = z
//   .object({
//     name: z.string().min(2, {
//       message: "Name must be at least 2 characters.",
//     }),
//     email: z.string().email({
//       message: "Please enter a valid email.",
//     }),
//     password: z.string().min(8, {
//       message: "Password must be at least 8 characters.",
//     }),
//     confirmPassword: z.string().min(8, {
//       message: "Confirm password must be at least 8 characters.",
//     }),
//     phone: z.string().regex(/^(\+?\d{1,4}[\s-])?(?!0+\s)(?!0{3,}\s)[\d\s-]+$/, {
//       message: "Please enter a valid phone number.",
//     }),
//     specialty: z.string().min(1, {
//       message: "Please select a specialty.",
//     }),
//     address: z.object({
//       street: z.string().min(2, {
//         message: "Street must be at least 2 characters.",
//       }),
//       area: z.string().min(2, {
//         message: "Area must be at least 2 characters.",
//       }),
//       district: z.string().min(2, {
//         message: "District must be at least 2 characters.",
//       }),
//       subDistrict: z.string().min(2, {
//         message: "Sub District must be at least 2 characters.",
//       }),
//       village: z.string().min(2, {
//         message: "Village must be at least 2 characters.",
//       }),
//     }),
//     terms: z.boolean().refine((value) => value === true, {
//       message: "You must accept the terms and conditions.",
//     }),
//   })
//   .refine((data) => data.password === data.confirmPassword, {
//     message: "Passwords do not match.",
//     path: ["confirmPassword"],
//   })

// export default function DoctorSignupPage() {
//   const [isLoading, setIsLoading] = useState<boolean>(false)
//   const [step, setStep] = useState<number>(1)
//   const [otp, setOtp] = useState<string>("")
//   const [showPassword, setShowPassword] = useState<boolean>(false)

//   const router = useRouter()
//   const { toast } = useToast()

//   const form = useForm<z.infer<typeof SignupFormSchema>>({
//     resolver: zodResolver(SignupFormSchema),
//     defaultValues: {
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       phone: "",
//       specialty: "",
//       address: {
//         street: "",
//         area: "",
//         district: "",
//         subDistrict: "",
//         village: "",
//       },
//       terms: false,
//     },
//   })

//   const handleSendOTP = async () => {
//     // Validate step 1 fields before sending OTP
//     const isValid = await form.trigger(["name", "email", "password", "confirmPassword", "phone", "specialty"])

//     if (!isValid) {
//       toast.error("Please fill in all required fields correctly for Step 1.")
//       return
//     }

//     setIsLoading(true)
//     try {
//       const email = form.getValues("email")
//       const response = await fetch("/api/auth/send-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, role: "doctor" }),
//       })
//       const data = await response.json()
//       if (data.success) {
//         toast.success("OTP sent to your email!")
//         setStep(2) // Move to OTP verification step
//       } else {
//         toast.error(data.message || "Failed to send OTP")
//       }
//     } catch (error) {
//       toast.error("Something went wrong while sending OTP.")
//       console.error("Send OTP error:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleVerifyOTP = async () => {
//     if (!otp) {
//       toast.error("Please enter the OTP.")
//       return
//     }

//     setIsLoading(true)
//     try {
//       const email = form.getValues("email")
//       const response = await fetch("/api/auth/verify-otp", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, otp }),
//       })
//       const data = await response.json()
//       if (data.success) {
//         toast.success("Email verified!")
//         setStep(3) // Move to address details step
//       } else {
//         toast.error(data.message || "Invalid OTP")
//       }
//     } catch (error) {
//       toast.error("Something went wrong during OTP verification.")
//       console.error("Verify OTP error:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleCompleteSignup = async () => {
//     // Validate step 3 fields before completing signup
//     const isValid = await form.trigger([
//       "address.street",
//       "address.area",
//       "address.district",
//       "address.subDistrict",
//       "address.village",
//       "terms",
//     ])

//     if (!isValid) {
//       toast.error("Please fill in all address details and accept the terms.")
//       return
//     }

//     setIsLoading(true)
//     try {
//       const formData = form.getValues() // Get all form data
//       const { name, email, password, phone, specialty, address } = formData

//       const response = await fetch("/api/doctor/signup", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name,
//           email,
//           password,
//           phone,
//           specialty,
//           address,
//         }),
//       })
//       const data = await response.json()
//       if (data.success) {
//         toast.success("Signup successful! You can now log in.")
//         router.push("/auth/login") // Redirect to login page
//       } else {
//         toast.error(data.message || "Signup failed")
//       }
//     } catch (error) {
//       toast.error("Something went wrong. Please try again.")
//       console.error("Signup error:", error)
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
//       <div className="absolute top-6 left-6">
//         <Link href="/">
//           <Button variant="outline" size="sm" className="gap-2 bg-transparent">
//             <ArrowLeft className="w-4 h-4" />
//             Back to Home
//           </Button>
//         </Link>
//       </div>
//       <div className="absolute top-6 right-6">
//         <ThemeToggle />
//       </div>
//       <Card className="w-full max-w-md">
//         <CardHeader className="text-center">
//           <div className="flex justify-center mb-4">
//             <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
//               <Stethoscope className="w-8 h-8 text-white" />
//             </div>
//           </div>
//           <CardTitle className="text-2xl font-bold">Join as Doctor</CardTitle>
//           <p className="text-sm text-gray-600 dark:text-gray-400">
//             Step {step} of 3:{" "}
//             {step === 1 ? "Basic & Professional Info" : step === 2 ? "Verify Email" : "Address Details & Terms"}
//           </p>
//         </CardHeader>
//         <CardContent>
//           {step === 1 && (
//             <form onSubmit={form.handleSubmit(handleSendOTP)} className="space-y-4">
//               <div className="grid gap-2">
//                 <Label htmlFor="name">Full Name</Label>
//                 <Input id="name" placeholder="Dr. Jane Doe" type="text" {...form.register("name")} required />
//                 {form.formState.errors.name && (
//                   <p className="text-red-500 text-sm">{form.formState.errors.name.message}</p>
//                 )}
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="email">Email</Label>
//                 <Input
//                   id="email"
//                   placeholder="name@example.com"
//                   type="email"
//                   autoCapitalize="none"
//                   autoComplete="email"
//                   {...form.register("email")}
//                   required
//                 />
//                 {form.formState.errors.email && (
//                   <p className="text-red-500 text-sm">{form.formState.errors.email.message}</p>
//                 )}
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="password">Password</Label>
//                 <div className="relative">
//                   <Input
//                     id="password"
//                     placeholder="Password"
//                     type={showPassword ? "text" : "password"}
//                     {...form.register("password")}
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
//                 {form.formState.errors.password && (
//                   <p className="text-red-500 text-sm">{form.formState.errors.password.message}</p>
//                 )}
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="confirmPassword">Confirm Password</Label>
//                 <Input
//                   id="confirmPassword"
//                   placeholder="Confirm Password"
//                   type="password"
//                   {...form.register("confirmPassword")}
//                   required
//                 />
//                 {form.formState.errors.confirmPassword && (
//                   <p className="text-red-500 text-sm">{form.formState.errors.confirmPassword.message}</p>
//                 )}
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="phone">Phone Number</Label>
//                 <Input id="phone" placeholder="9876543210" type="tel" {...form.register("phone")} required />
//                 {form.formState.errors.phone && (
//                   <p className="text-red-500 text-sm">{form.formState.errors.phone.message}</p>
//                 )}
//               </div>
//               <div className="grid gap-2">
//                 <Label htmlFor="specialty">Specialty</Label>
//                 <Select
//                   onValueChange={(value) => form.setValue("specialty", value, { shouldValidate: true })}
//                   value={form.watch("specialty")}
//                 >
//                   <SelectTrigger className="w-full">
//                     <SelectValue placeholder="Select a specialty" />
//                   </SelectTrigger>
//                   <SelectContent>
//                     {specialtyOptions.map((option) => (
//                       <SelectItem key={option.value} value={option.value}>
//                         {option.label}
//                       </SelectItem>
//                     ))}
//                   </SelectContent>
//                 </Select>
//                 {form.formState.errors.specialty && (
//                   <p className="text-red-500 text-sm">{form.formState.errors.specialty.message}</p>
//                 )}
//               </div>
//               <Button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//                     Sending OTP...
//                   </>
//                 ) : (
//                   "Send Verification Code"
//                 )}
//               </Button>
//             </form>
//           )}
//           {step === 2 && (
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault()
//                 handleVerifyOTP()
//               }}
//               className="space-y-4"
//             >
//               <div className="text-center mb-4">
//                 <p className="text-sm text-gray-600 dark:text-gray-400">
//                   We've sent a verification code to
//                   <br />
//                   <strong>{form.getValues("email")}</strong>
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
//                 className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
//                 disabled={isLoading}
//               >
//                 {isLoading ? (
//                   <>
//                     <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//                     Verifying...
//                   </>
//                 ) : (
//                   "Verify Email"
//                 )}
//               </Button>
//               <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => setStep(1)}>
//                 <Icons.arrowLeft className="mr-2 h-4 w-4" /> Back to Previous Step
//               </Button>
//             </form>
//           )}
//           {step === 3 && (
//             <form onSubmit={form.handleSubmit(handleCompleteSignup)} className="space-y-4">
//               <LocationSelector
//                 value={form.watch("address")}
//                 onChange={(address) => form.setValue("address", address, { shouldValidate: true })}
//                 required
//               />
//               {form.formState.errors.address && (
//                 <p className="text-red-500 text-sm">{form.formState.errors.address.message}</p>
//               )}
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   id="terms"
//                   checked={form.watch("terms")}
//                   onCheckedChange={(checked) => form.setValue("terms", checked as boolean, { shouldValidate: true })}
//                 />
//                 <div className="grid gap-0.5">
//                   <Label htmlFor="terms">
//                     I agree to the{" "}
//                     <a href="#" className="underline underline-offset-2">
//                       terms and conditions
//                     </a>
//                   </Label>
//                 </div>
//               </div>
//               {form.formState.errors.terms && (
//                 <p className="text-red-500 text-sm">{form.formState.errors.terms.message}</p>
//               )}
//               <div className="flex justify-between">
//                 <Button variant="secondary" onClick={() => setStep(2)}>
//                   <Icons.arrowLeft className="mr-2 h-4 w-4" /> Previous
//                 </Button>
//                 <Button
//                   type="submit"
//                   disabled={isLoading}
//                   className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
//                 >
//                   {isLoading ? (
//                     <>
//                       <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
//                       Please wait
//                     </>
//                   ) : (
//                     "Complete Registration"
//                   )}
//                 </Button>
//               </div>
//             </form>
//           )}
//           <div className="mt-6 text-center">
//             <p className="text-sm text-gray-600 dark:text-gray-400">
//               Already have an account?{" "}
//               <Link href="/auth/login" className="text-green-600 hover:underline">
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
import { Eye, EyeOff, Stethoscope, ArrowLeft, Mail, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import LocationSelector from "@/components/location-selector"
import { toast } from "react-hot-toast"
import ThemeToggle from "@/components/ThemeToggle"
import { Icons } from "@/components/icons"

interface AddressData {
  street: string
  area: string
  district: string
  subDistrict: string
  village: string
}

export default function DoctorSignupPage() {
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
    terms: false,
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
    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      toast.error("Please fill in all required basic information.")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/auth/send-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: formData.email, role: "doctor" }),
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
    if (!otp) {
      toast.error("Please enter the OTP.")
      return
    }
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
    if (!formData.terms) {
      toast.error("Please accept the terms and conditions")
      return
    }

    setIsLoading(true)
    try {
      const response = await fetch("/api/doctor/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          password: formData.password,
          address: formData.address,
             specialty: "General Practice", // Placeholder/default if not collected via form
        }),
      })
      const data = await response.json()
      if (data.success) {
        toast.success("Account created successfully!")
        router.push("/doctor/dashboard")
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
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
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
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center">
              <Stethoscope className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Join as Doctor</CardTitle>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Step {step} of 3: {step === 1 ? "Basic Info" : step === 2 ? "Verify Email" : "Address Details & Terms"}
          </p>
        </CardHeader>
        <CardContent>
          {/* Step 1: Basic Info */}
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
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Sending OTP...
                  </>
                ) : (
                  "Send Verification Code"
                )}
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
                className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  "Verify Email"
                )}
              </Button>
              <Button type="button" variant="outline" className="w-full bg-transparent" onClick={() => setStep(1)}>
                <Icons.arrowLeft className="mr-2 h-4 w-4" /> Back to Previous Step
              </Button>
            </form>
          )}

          {/* Step 3: Address Details */}
          {step === 3 && (
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
                  <Link href="/terms" className="text-green-600 hover:underline">
                    Terms and Conditions
                  </Link>
                </Label>
              </div>

              <div className="flex justify-between">
                <Button variant="secondary" onClick={() => setStep(2)} disabled={isLoading}>
                  <Icons.arrowLeft className="mr-2 h-4 w-4" /> Back
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
              <Link href="/auth/login" className="text-green-600 hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
