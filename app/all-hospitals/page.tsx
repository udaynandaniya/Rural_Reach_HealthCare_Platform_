"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { toast } from "react-hot-toast"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, Phone, Mail, Activity, Shield, Home, Building2 } from "lucide-react"
import ThemeToggle from "@/components/ThemeToggle"
import UserDropdown from "@/components/UserDropdown"


interface HospitalData {
  _id: string
  name: string
  email: string
  phone: string
  isAvailable: boolean
  isHandleEmergency: boolean
  isVerified: boolean
  address: {
    street?: string
    area?: string
    village?: string
    subDistrict?: string
    district?: string
    pincode?: string
    state?: string
    geoLocation?: {
      lat?: number
      lng?: number
    }
  }
  location?: {
    lat?: number
    lng?: number
  }
}

export default function AllHospitalsPage() {
  const [hospitals, setHospitals] = useState<HospitalData[]>([])
  const [loading, setLoading] = useState(true)
  const [filters, setFilters] = useState({
    name: "",
    village: "",
    subDistrict: "",
    district: "",
    state: "",
    emergency: "all",
    available: "all",
  })

  const fetchHospitals = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "all") params.append(key, value)
      })

      const res = await fetch(`/api/hospital?${params.toString()}`)
      const data = await res.json()

      if (data.success) setHospitals(data.data)
      else toast.error("Failed to fetch hospitals.")
    } catch (err) {
      console.error(err)
      toast.error("Something went wrong.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchHospitals()
  }, [filters])

  const updateFilter = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  const formatFullAddress = (address: HospitalData["address"]): string => {
    const parts = [
      address?.street,
      address?.area,
      address?.village,
      address?.subDistrict,
      address?.district,
      address?.state,
      address?.pincode,
    ].filter(Boolean)
    return parts.join(", ") || "Address not available"
  }

  const openGoogleMaps = async (hospital: HospitalData) => {
    let url = ""
    const { location, address } = hospital
    if (location?.lat && location?.lng) {
      url = `https://www.google.com/maps/search/?api=1&query=${location.lat},${location.lng}`
    } else if (address?.geoLocation?.lat && address?.geoLocation?.lng) {
      url = `https://www.google.com/maps/search/?api=1&query=${address.geoLocation.lat},${address.geoLocation.lng}`
    } else {
      const addressQuery = formatFullAddress(address)
      if (addressQuery !== "Address not available") {
        url = `https://www.google.com/maps/search/${encodeURIComponent(addressQuery)}`
      }
    }
    if (url) {
      toast.success(`Opening ${hospital.name} in Google Maps...`)
      setTimeout(() => {
        window.open(url, "_blank")
      }, 800)
    } else {
      toast.error("Location data unavailable.")
    }
  }

  const handleCall = (phone: string) => {
    if (phone) {
      window.location.href = `tel:${phone}`
    } else {
      toast.error("Phone number not available.")
    }
  }

  const handleEmail = (email: string) => {
    if (email) {
      window.location.href = `mailto:${email}`
    } else {
      toast.error("Email not available.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40 relative">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between relative z-10">
          <div className="flex items-center space-x-4">
            <Link href="/" passHref>
              <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-400">
                <Home className="w-12 h-12" />
                <span className="sr-only">Home</span>
              </Button>
            </Link>
            <motion.div
              className="w-10 h-10 bg-gradient-to-br from-blue-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
            >
              <Building2 className="w-6 h-6 text-white" />
            </motion.div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">All Hospitals</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">Explore healthcare providers</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <ThemeToggle />
            <UserDropdown />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-6">
        <motion.div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Input placeholder="Hospital Name" onChange={(e) => updateFilter("name", e.target.value)} />
          <Input placeholder="Village" onChange={(e) => updateFilter("village", e.target.value)} />
          <Input placeholder="Subdistrict" onChange={(e) => updateFilter("subDistrict", e.target.value)} />
          <Input placeholder="District" onChange={(e) => updateFilter("district", e.target.value)} />
          <Input placeholder="State" onChange={(e) => updateFilter("state", e.target.value)} />

          <Select onValueChange={(val) => updateFilter("emergency", val)}>
            <SelectTrigger><SelectValue placeholder="Handles Emergency" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>

          <Select onValueChange={(val) => updateFilter("available", val)}>
            <SelectTrigger><SelectValue placeholder="Availability" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="yes">Available</SelectItem>
              <SelectItem value="no">Unavailable</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {loading ? (
          <div className="text-center py-20 text-gray-600 dark:text-gray-400">Loading hospitals...</div>
        ) : hospitals.length === 0 ? (
          <div className="text-center py-20 text-gray-500">No hospitals found.</div>
        ) : (
          <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
            {hospitals.map((hospital, index) => (
              <motion.div key={hospital._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }}>
                <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">{hospital.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-sm text-gray-700 dark:text-gray-300 space-y-2">
                    <p><MapPin className="inline w-4 h-4 mr-1" /> {formatFullAddress(hospital.address)}</p>
                    <p><Phone className="inline w-4 h-4 mr-1" /> {hospital.phone || "N/A"}</p>
                    <p><Mail className="inline w-4 h-4 mr-1" /> {hospital.email || "N/A"}</p>
                    <p><Activity className="inline w-4 h-4 mr-1" /> Status: {hospital.isAvailable ? "Available" : "Unavailable"}</p>
                    <p><Shield className="inline w-4 h-4 mr-1" /> Emergency: {hospital.isHandleEmergency ? "Yes" : "No"}</p>
                    <div className="pt-2 flex flex-wrap gap-2 border-t border-gray-100 dark:border-gray-700 mt-2">
                      <Button variant="outline" size="sm" onClick={() => openGoogleMaps(hospital)} className="text-blue-600 hover:text-blue-800 dark:hover:text-blue-300">
                        <MapPin className="w-4 h-4 mr-1" /> Map
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleCall(hospital.phone)} disabled={!hospital.phone} className="text-green-600 hover:text-green-800 dark:hover:text-green-300">
                        <Phone className="w-4 h-4 mr-1" /> Call
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEmail(hospital.email)} disabled={!hospital.email} className="text-purple-600 hover:text-purple-800 dark:hover:text-purple-300">
                        <Mail className="w-4 h-4 mr-1" /> Email
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        )}
      </main>
    </div>
  )
}
