
"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import {
  Users,
  Building2,
  UserCheck,
  Shield,
  AlertTriangle,
  Check,
  X,
  Ban,
  UnlockKeyhole,
  BarChart3,
  Activity,
  MapPin,
  Clock,
  Search,
  FileText,
  Eye,
  Mail,
  Phone,
  Calendar,
  Stethoscope,
  Award,
  MapPinIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useAuth } from "@/app/contexts/AuthProvider"
import ThemeToggle from "@/components/ThemeToggle"
import UserDropdown from "@/components/UserDropdown"
import { toast } from "react-hot-toast"

interface DashboardStats {
  totalUsers: number
  totalHospitals: number
  totalDoctors: number
  activeEmergencies: number
  pendingApprovals: number
  blockedUsers: number
  totalHealthTips: number
  emergenciesToday: number
  verifiedHospitals: number
  verifiedDoctors: number
  emergencyCapableHospitals: number
}

interface User {
  _id: string
  name: string
  email: string
  phone: string
  role: string
  isVerified: boolean
  createdAt: string
  lastActive?: string
  address?: {
    street: string
    area: string
    townOrVillage: string
    taluka: string
    district: string
    pincode: string
  }
}

interface Doctor {
  _id: string
  name: string
  email: string
  phone: string
  specialty: string
  isVerified: boolean
  createdAt: string
  address: {
    street: string
    area: string
    townOrVillage: string
    taluka: string
    district: string
    pincode: string
  }
  hospitalId?: {
    _id: string
    name: string
  }
}

interface Hospital {
  _id: string
  name: string
  email: string
  phone: string
  isVerified: boolean
  isAvailable: boolean
  isHandleEmergency: boolean
  createdAt: string
  address: {
    street: string
    area: string
    townOrVillage: string
    taluka: string
    district: string
    pincode: string
  }
  location?: {
    lat: number
    lng: number
  }
}

interface EmergencyAlert {
  _id: string
  userId: {
    name: string
    email: string
  }
  status: string
  priority: string
  location: {
    lat?: number
    lng?: number
    address?: any
  }
  createdAt: string
  acceptedBy?: {
    name: string
  }
}

interface HealthTip {
  _id: string
  title: string
  content: string
  category: string
  authorType: string
  authorId: {
    name: string
  }
  isApproved: boolean
  createdAt: string
}

interface BlockedUser {
  _id: string
  email: string
  phone: string
  reason: string
  role: string
  addedAt: string
}

export default function AdminDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalHospitals: 0,
    totalDoctors: 0,
    activeEmergencies: 0,
    pendingApprovals: 0,
    blockedUsers: 0,
    totalHealthTips: 0,
    emergenciesToday: 0,
    verifiedHospitals: 0,
    verifiedDoctors: 0,
    emergencyCapableHospitals: 0,
  })

  const [users, setUsers] = useState<User[]>([])
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [hospitals, setHospitals] = useState<Hospital[]>([])
  const [emergencyAlerts, setEmergencyAlerts] = useState<EmergencyAlert[]>([])
  const [healthTips, setHealthTips] = useState<HealthTip[]>([])
  const [blockedUsers, setBlockedUsers] = useState<BlockedUser[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterRole, setFilterRole] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null)
  const [selectedHospital, setSelectedHospital] = useState<Hospital | null>(null)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const [statsRes, usersRes, doctorsRes, hospitalsRes, alertsRes, tipsRes, blockedRes] = await Promise.all([
        fetch("/api/admin/stats"),
        fetch("/api/admin/users"),
        fetch("/api/admin/doctors"),
        fetch("/api/admin/hospitals"),
        fetch("/api/admin/emergency-alerts"),
        fetch("/api/admin/health-tips"),
        fetch("/api/admin/blocked-users"),
      ])

      if (statsRes.ok) {
        const statsData = await statsRes.json()
        setStats(statsData.data)
      }

      if (usersRes.ok) {
        const usersData = await usersRes.json()
        setUsers(usersData.data || [])
      }

      if (doctorsRes.ok) {
        const doctorsData = await doctorsRes.json()
        setDoctors(doctorsData.data || [])
      }

      if (hospitalsRes.ok) {
        const hospitalsData = await hospitalsRes.json()
        setHospitals(hospitalsData.data || [])
      }

      if (alertsRes.ok) {
        const alertsData = await alertsRes.json()
        setEmergencyAlerts(alertsData.data || [])
      }

      if (tipsRes.ok) {
        const tipsData = await tipsRes.json()
        setHealthTips(tipsData.data || [])
      }

      if (blockedRes.ok) {
        const blockedData = await blockedRes.json()
        setBlockedUsers(blockedData.data || [])
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error)
      toast.error("Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  const handleBlockUser = async (userId: string, email: string, phone: string, role: string) => {
    try {
      const reason = prompt("Enter reason for blocking this user:")
      if (!reason) return

      const response = await fetch("/api/admin/block-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, email, phone, role, reason }),
      })

      if (response.ok) {
        toast.success("User blocked successfully")
        fetchDashboardData()
      } else {
        toast.error("Failed to block user")
      }
    } catch (error) {
      toast.error("Error blocking user")
    }
  }

  const handleVerifyProvider = async (providerId: string, providerType: "doctor" | "hospital", verify: boolean) => {
    try {
      const response = await fetch("/api/admin/verify-provider", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ providerId, providerType, verify }),
      })

      if (response.ok) {
        toast.success(`${providerType} ${verify ? "verified" : "unverified"} successfully`)
        fetchDashboardData()
      } else {
        toast.error(`Failed to ${verify ? "verify" : "unverify"} ${providerType}`)
      }
    } catch (error) {
      toast.error("Error updating verification status")
    }
  }

  const handleUnblockUser = async (blockedId: string) => {
    try {
      const response = await fetch("/api/admin/unblock-user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ blockedId }),
      })

      if (response.ok) {
        toast.success("User unblocked successfully")
        fetchDashboardData()
      } else {
        toast.error("Failed to unblock user")
      }
    } catch (error) {
      toast.error("Error unblocking user")
    }
  }

  const handleApproveHealthTip = async (tipId: string, approve: boolean) => {
    try {
      const response = await fetch("/api/admin/approve-health-tip", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tipId, approve }),
      })

      if (response.ok) {
        toast.success(`Health tip ${approve ? "approved" : "rejected"} successfully`)
        fetchDashboardData()
      } else {
        toast.error("Failed to update health tip")
      }
    } catch (error) {
      toast.error("Error updating health tip")
    }
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const filteredHospitals = hospitals.filter((hospital) => {
    const matchesSearch =
      hospital.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      hospital.email.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const filteredEmergencies = emergencyAlerts.filter((alert) => {
    const matchesStatus = filterStatus === "all" || alert.status === filterStatus
    return matchesStatus
  })

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <motion.div
            className="w-16 h-16 border-4 border-red-500 border-t-transparent rounded-full mx-auto mb-4"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          />
          <p className="text-gray-600 dark:text-gray-400 text-lg">Loading admin dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b border-gray-200 dark:border-gray-700 sticky top-0 z-40">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-orange-500 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">RuralReach Platform Management</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
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
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Welcome, Admin {user?.name}! 🛡️</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Monitor platform activity and manage users, healthcare providers, content, and emergency responses.
          </p>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.totalUsers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Hospitals</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.totalHospitals}</p>
                  <p className="text-xs text-gray-500">{stats.verifiedHospitals} verified</p>
                </div>
                <Building2 className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Doctors</p>
                  <p className="text-2xl font-bold text-green-600">{stats.totalDoctors}</p>
                  <p className="text-xs text-gray-500">{stats.verifiedDoctors} verified</p>
                </div>
                <UserCheck className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Active Emergencies</p>
                  <p className="text-2xl font-bold text-red-600">{stats.activeEmergencies}</p>
                  <p className="text-xs text-gray-500">{stats.emergencyCapableHospitals} emergency hospitals</p>
                </div>
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Secondary Stats */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Pending Approvals</p>
                  <p className="text-lg font-bold text-yellow-600">{stats.pendingApprovals}</p>
                </div>
                <Clock className="w-6 h-6 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Blocked Users</p>
                  <p className="text-lg font-bold text-red-600">{stats.blockedUsers}</p>
                </div>
                <Ban className="w-6 h-6 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Health Tips</p>
                  <p className="text-lg font-bold text-blue-600">{stats.totalHealthTips}</p>
                </div>
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">Emergencies Today</p>
                  <p className="text-lg font-bold text-orange-600">{stats.emergenciesToday}</p>
                </div>
                <Activity className="w-6 h-6 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Tabs defaultValue="users" className="space-y-6">
            <TabsList className="grid w-full grid-cols-7">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="doctors">Doctors</TabsTrigger>
              <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
              <TabsTrigger value="emergencies">Emergencies</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="blocked">Blocked</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Users Management Tab */}
            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Users className="w-5 h-5" />
                      <span>Platform Users ({filteredUsers.length})</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredUsers.map((user) => (
                      <div
                        key={user._id}
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                            <Users className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                            <p className="text-xs text-gray-500">{user.phone}</p>
                            {user.address && (
                              <p className="text-xs text-gray-500">
                                {user.address.district}, {user.address.pincode}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge variant={user.isVerified ? "default" : "secondary"}>
                            {user.isVerified ? "Verified" : "Unverified"}
                          </Badge>
                          <p className="text-xs text-gray-500">
                            Joined: {new Date(user.createdAt).toLocaleDateString()}
                          </p>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => handleBlockUser(user._id, user.email, user.phone, "user")}
                          >
                            <Ban className="w-4 h-4 mr-1" />
                            Block
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Doctors Management Tab */}
            <TabsContent value="doctors" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <UserCheck className="w-5 h-5" />
                      <span>Doctors ({filteredDoctors.length})</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search doctors..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredDoctors.map((doctor) => (
                      <div
                        key={doctor._id}
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                            <Stethoscope className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-medium text-lg">Dr. {doctor.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {doctor.email}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {doctor.phone}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                <Award className="w-3 h-3 mr-1" />
                                {doctor.specialty}
                              </Badge>
                              {doctor.hospitalId && (
                                <Badge variant="secondary" className="text-xs">
                                  {doctor.hospitalId.name}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <Badge variant={doctor.isVerified ? "default" : "secondary"}>
                              {doctor.isVerified ? "Verified" : "Pending"}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              {new Date(doctor.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedDoctor(doctor)}>
                                  <Eye className="w-4 h-4 mr-1" />
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Doctor Details</DialogTitle>
                                </DialogHeader>
                                {selectedDoctor && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="font-semibold mb-2">Personal Information</h4>
                                        <p>
                                          <strong>Name:</strong> Dr. {selectedDoctor.name}
                                        </p>
                                        <p>
                                          <strong>Email:</strong> {selectedDoctor.email}
                                        </p>
                                        <p>
                                          <strong>Phone:</strong> {selectedDoctor.phone}
                                        </p>
                                        <p>
                                          <strong>Specialty:</strong> {selectedDoctor.specialty}
                                        </p>
                                        <p>
                                          <strong>Status:</strong>{" "}
                                          {selectedDoctor.isVerified ? "Verified" : "Pending Verification"}
                                        </p>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold mb-2">Address</h4>
                                        <p>
                                          {selectedDoctor.address.street}, {selectedDoctor.address.area}
                                        </p>
                                        <p>{selectedDoctor.address.townOrVillage}</p>
                                        <p>
                                          {selectedDoctor.address.taluka}, {selectedDoctor.address.district}
                                        </p>
                                        <p>PIN: {selectedDoctor.address.pincode}</p>
                                      </div>
                                    </div>
                                    {selectedDoctor.hospitalId && (
                                      <div>
                                        <h4 className="font-semibold mb-2">Hospital Affiliation</h4>
                                        <p>{selectedDoctor.hospitalId.name}</p>
                                      </div>
                                    )}
                                    <div>
                                      <p>
                                        <strong>Registration Date:</strong>{" "}
                                        {new Date(selectedDoctor.createdAt).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            {!doctor.isVerified ? (
                              <Button
                                size="sm"
                                onClick={() => handleVerifyProvider(doctor._id, "doctor", true)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Verify
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleVerifyProvider(doctor._id, "doctor", false)}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Unverify
                              </Button>
                            )}
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleBlockUser(doctor._id, doctor.email, doctor.phone, "doctor")}
                            >
                              <Ban className="w-4 h-4 mr-1" />
                              Block
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Hospitals Management Tab */}
            <TabsContent value="hospitals" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Building2 className="w-5 h-5" />
                      <span>Hospitals ({filteredHospitals.length})</span>
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Search className="w-4 h-4 text-gray-400" />
                      <Input
                        placeholder="Search hospitals..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-64"
                      />
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredHospitals.map((hospital) => (
                      <div
                        key={hospital._id}
                        className="flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center">
                            <Building2 className="w-6 h-6" />
                          </div>
                          <div>
                            <p className="font-medium text-lg">{hospital.name}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                              <Mail className="w-4 h-4 mr-1" />
                              {hospital.email}
                            </p>
                            <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                              <Phone className="w-4 h-4 mr-1" />
                              {hospital.phone}
                            </p>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant={hospital.isAvailable ? "default" : "secondary"}>
                                {hospital.isAvailable ? "Available" : "Unavailable"}
                              </Badge>
                              {hospital.isHandleEmergency && (
                                <Badge variant="destructive" className="text-xs">
                                  <AlertTriangle className="w-3 h-3 mr-1" />
                                  Emergency Care
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <Badge variant={hospital.isVerified ? "default" : "secondary"}>
                              {hospital.isVerified ? "Verified" : "Pending"}
                            </Badge>
                            <p className="text-xs text-gray-500 mt-1">
                              <Calendar className="w-3 h-3 inline mr-1" />
                              {new Date(hospital.createdAt).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex flex-col space-y-2">
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button variant="outline" size="sm" onClick={() => setSelectedHospital(hospital)}>
                                  <Eye className="w-4 h-4 mr-1" />
                                  View Details
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Hospital Details</DialogTitle>
                                </DialogHeader>
                                {selectedHospital && (
                                  <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                      <div>
                                        <h4 className="font-semibold mb-2">Hospital Information</h4>
                                        <p>
                                          <strong>Name:</strong> {selectedHospital.name}
                                        </p>
                                        <p>
                                          <strong>Email:</strong> {selectedHospital.email}
                                        </p>
                                        <p>
                                          <strong>Phone:</strong> {selectedHospital.phone}
                                        </p>
                                        <p>
                                          <strong>Status:</strong>{" "}
                                          {selectedHospital.isVerified ? "Verified" : "Pending Verification"}
                                        </p>
                                        <p>
                                          <strong>Availability:</strong>{" "}
                                          {selectedHospital.isAvailable ? "Available" : "Unavailable"}
                                        </p>
                                        <p>
                                          <strong>Emergency Care:</strong>{" "}
                                          {selectedHospital.isHandleEmergency ? "Yes" : "No"}
                                        </p>
                                      </div>
                                      <div>
                                        <h4 className="font-semibold mb-2">Address</h4>
                                        <p>
                                          {selectedHospital.address.street}, {selectedHospital.address.area}
                                        </p>
                                        <p>{selectedHospital.address.townOrVillage}</p>
                                        <p>
                                          {selectedHospital.address.taluka}, {selectedHospital.address.district}
                                        </p>
                                        <p>PIN: {selectedHospital.address.pincode}</p>
                                        {selectedHospital.location && (
                                          <p className="text-sm text-gray-600 mt-2">
                                            <MapPinIcon className="w-4 h-4 inline mr-1" />
                                            {selectedHospital.location.lat.toFixed(4)},{" "}
                                            {selectedHospital.location.lng.toFixed(4)}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                    <div>
                                      <p>
                                        <strong>Registration Date:</strong>{" "}
                                        {new Date(selectedHospital.createdAt).toLocaleString()}
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </DialogContent>
                            </Dialog>
                            {!hospital.isVerified ? (
                              <Button
                                size="sm"
                                onClick={() => handleVerifyProvider(hospital._id, "hospital", true)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Verify
                              </Button>
                            ) : (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleVerifyProvider(hospital._id, "hospital", false)}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Unverify
                              </Button>
                            )}
                            <Button
                              variant="destructive"
                              size="sm"
                              onClick={() => handleBlockUser(hospital._id, hospital.email, hospital.phone, "hospital")}
                            >
                              <Ban className="w-4 h-4 mr-1" />
                              Block
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Emergency Alerts Tab */}
            <TabsContent value="emergencies" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="w-5 h-5" />
                      <span>Emergency Alerts Monitor</span>
                    </CardTitle>
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="accepted">Accepted</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {filteredEmergencies.map((alert) => (
                      <div key={alert._id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-3 h-3 rounded-full ${
                                alert.status === "accepted"
                                  ? "bg-green-500"
                                  : alert.status === "pending"
                                    ? "bg-yellow-500"
                                    : alert.status === "completed"
                                      ? "bg-blue-500"
                                      : "bg-gray-500"
                              }`}
                            />
                            <div>
                              <p className="font-medium">{alert.userId.name}</p>
                              <p className="text-sm text-gray-600 dark:text-gray-400">{alert.userId.email}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge
                              variant={
                                alert.priority === "critical"
                                  ? "destructive"
                                  : alert.priority === "high"
                                    ? "default"
                                    : "secondary"
                              }
                            >
                              {alert.priority}
                            </Badge>
                            <Badge variant="outline">{alert.status}</Badge>
                          </div>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Time</p>
                            <p>{new Date(alert.createdAt).toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Location</p>
                            <p className="flex items-center">
                              <MapPin className="w-4 h-4 mr-1" />
                              {alert.location.lat
                                ? `${alert.location.lat.toFixed(4)}, ${alert.location.lng?.toFixed(4)}`
                                : "Address provided"}
                            </p>
                          </div>
                          <div>
                            <p className="text-gray-600 dark:text-gray-400">Handled By</p>
                            <p>{alert.acceptedBy?.name || "Not assigned"}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Content Moderation Tab */}
            <TabsContent value="content" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="w-5 h-5" />
                    <span>Health Tips Moderation</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {healthTips
                      .filter((tip) => !tip.isApproved)
                      .map((tip) => (
                        <div key={tip._id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="font-medium text-lg">{tip.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                                By {tip.authorId.name} ({tip.authorType})
                              </p>
                              <Badge variant="outline">{tip.category}</Badge>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Button
                                size="sm"
                                onClick={() => handleApproveHealthTip(tip._id, true)}
                                className="bg-green-600 hover:bg-green-700"
                              >
                                <Check className="w-4 h-4 mr-1" />
                                Approve
                              </Button>
                              <Button
                                size="sm"
                                variant="destructive"
                                onClick={() => handleApproveHealthTip(tip._id, false)}
                              >
                                <X className="w-4 h-4 mr-1" />
                                Reject
                              </Button>
                            </div>
                          </div>
                          <p className="text-gray-700 dark:text-gray-300 text-sm line-clamp-3">{tip.content}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            Submitted: {new Date(tip.createdAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Blocked Users Tab */}
            <TabsContent value="blocked" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Ban className="w-5 h-5" />
                    <span>Blocked Users Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {blockedUsers.map((blocked) => (
                      <div
                        key={blocked._id}
                        className="flex items-center justify-between p-4 border border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20 rounded-lg"
                      >
                        <div>
                          <p className="font-medium text-red-800 dark:text-red-200">{blocked.email}</p>
                          <p className="text-sm text-red-600 dark:text-red-300">{blocked.phone}</p>
                          <p className="text-xs text-red-500 dark:text-red-400">Reason: {blocked.reason}</p>
                          <p className="text-xs text-red-500 dark:text-red-400">
                            Blocked: {new Date(blocked.addedAt).toLocaleString()}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="destructive" className="capitalize">
                            {blocked.role}
                          </Badge>
                          <Button size="sm" variant="outline" onClick={() => handleUnblockUser(blocked._id)}>
                            <UnlockKeyhole className="w-4 h-4 mr-1" />
                            Unblock
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="w-5 h-5" />
                      <span>Platform Growth</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">User Registrations</span>
                        <span className="font-medium">+{stats.totalUsers} total</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Healthcare Providers</span>
                        <span className="font-medium">+{stats.totalHospitals + stats.totalDoctors} total</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Emergency Responses</span>
                        <span className="font-medium">{stats.emergenciesToday} today</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Verified Providers</span>
                        <span className="font-medium">{stats.verifiedHospitals + stats.verifiedDoctors} total</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-5 h-5" />
                      <span>System Health</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Active Emergencies</span>
                        <Badge variant={stats.activeEmergencies > 0 ? "destructive" : "default"}>
                          {stats.activeEmergencies}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Pending Approvals</span>
                        <Badge variant={stats.pendingApprovals > 0 ? "secondary" : "default"}>
                          {stats.pendingApprovals}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Content Published</span>
                        <span className="font-medium">{stats.totalHealthTips}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-400">Emergency Hospitals</span>
                        <span className="font-medium">{stats.emergencyCapableHospitals}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  )
}
