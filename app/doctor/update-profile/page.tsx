"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Loader2, Home, Stethoscope } from "lucide-react"
import { toast } from "react-hot-toast"

import { useAuth } from "@/app/contexts/AuthProvider"
import ThemeToggle from "@/components/ThemeToggle"
import UserDropdown from "@/components/UserDropdown"
import AnimatedHealthIcons from "@/components/AnimatedHealthIcons"
import Link from "next/link"
import { motion } from "framer-motion"
import LocationSelector from "@/components/location-selector"

export default function DoctorManageProfile() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    specialty: "",
    address: {
      street: "",
      area: "",
      village: "",
      subDistrict: "",
      district: "",
    },
  })

  useEffect(() => {
    if (user) {
      setForm({
        name: user.name || "",
        email: user.email || "",
        phone: user.phone || "",
        password: "",
        specialty: user.specialty || "",
        address: {
          street: user.address?.street || "",
          area: user.address?.area || "",
          village: user.address?.village || "",
          subDistrict: user.address?.subDistrict || "",
          district: user.address?.district || "",
        },
      })
    }
  }, [user])

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleUpdate = async () => {
    setLoading(true)
    try {
      const res = await fetch("/api/doctor/update-profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      })

      if (res.ok) {
        toast.success("Profile updated successfully", { duration: 2500 })
      } else {
        toast.error("Failed to update profile")
      }
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <AnimatedHealthIcons />
        <div className="container mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link href="/doctor/dashboard">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 dark:text-gray-400 p-4 sm:p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 w-14 h-14"
              >
                <Home className="w-7 h-7 sm:w-6 sm:h-6" />
                <span className="sr-only">Home</span>
              </Button>
            </Link>
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Stethoscope className="w-6 h-6 text-white" />
            </motion.div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">Manage Profile</h1>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <UserDropdown />
          </div>
        </div>
      </header>

      {/* Form */}
      <div className="max-w-3xl mx-auto mt-6 space-y-6 p-4 sm:p-8 bg-white dark:bg-gray-900 shadow rounded-xl">
        {/* Name */}
        <div>
          <Label>Name</Label>
          <Input value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
        </div>

        {/* Email (Disabled) */}
        <div>
          <Label>Email</Label>
          <Input value={form.email} disabled />
        </div>

        {/* Phone (Disabled) */}
        <div>
          <Label>Phone</Label>
          <Input value={form.phone} disabled />
        </div>

        {/* Password */}
        <div>
          <Label>New Password</Label>
          <Input
            type="password"
            placeholder="Leave blank to keep current password"
            value={form.password}
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </div>

        {/* Specialty */}
        <div>
          <Label>Specialty</Label>
          <Input value={form.specialty} onChange={(e) => handleChange("specialty", e.target.value)} />
        </div>

        {/* Address */}
        <div>
          <Label className="mb-2 block text-md">Address</Label>
          <LocationSelector
            value={form.address}
            onChange={(newAddress) => setForm((prev) => ({ ...prev, address: newAddress }))}
            required
          />
        </div>

        {/* Buttons */}
        <div className="flex gap-4 justify-end pt-4">
          <Button variant="outline" onClick={() => window.location.reload()}>Cancel</Button>
          <Button disabled={loading} onClick={handleUpdate}>
            {loading ? <Loader2 className="animate-spin h-4 w-4" /> : "Update Profile"}
          </Button>
        </div>
      </div>
    </>
  )
}
