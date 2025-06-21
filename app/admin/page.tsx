"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import {
  Users,
  MessageCircle,
  ImageIcon,
  Calendar,
  LogOut,
  Eye,
  Plus,
  Search,
  TrendingUp,
  Activity,
  Shield,
  Bell,
  Filter,
  RefreshCw,
  Check,
  X,
} from "lucide-react"
import Link from "next/link"
import apiClient from "@/lib/api"

interface DashboardStats {
  condolences: { total: number; pending: number }
  tributes: { total: number; pending: number }
  accreditations: { total: number; pending: number }
  gallery: { total: number }
}

interface AdminUser {
  id: number
  username: string
  fullName: string
  role: string
  email: string
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [user, setUser] = useState<AdminUser | null>(null)
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchTerm, setSearchTerm] = useState("")
  const [refreshing, setRefreshing] = useState(false)

  // Content data
  const [condolences, setCondolences] = useState<any[]>([])
  const [tributes, setTributes] = useState<any[]>([])
  const [accreditations, setAccreditations] = useState<any[]>([])

  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("adminToken")
      if (!token) {
        router.push("/admin/login")
        return
      }

      const data = await apiClient.getDashboardData()
      setStats(data.stats)
      setIsAuthenticated(true)

      // Get user info from localStorage
      const userInfo = JSON.parse(localStorage.getItem("adminUser") || "{}")
      setUser(userInfo)

      // Load content data
      await loadContentData()
    } catch (error) {
      console.error("Auth check failed:", error)
      localStorage.removeItem("adminToken")
      localStorage.removeItem("adminUser")
      router.push("/admin/login")
    } finally {
      setIsLoading(false)
    }
  }

  const loadContentData = async () => {
    try {
      const [condolencesData, tributesData, accreditationsData] = await Promise.all([
        apiClient.getCondolences("pending", 10),
        apiClient.getTributes("pending", 10),
        apiClient.getAccreditations("pending", undefined, 10),
      ])

      setCondolences(condolencesData)
      setTributes(tributesData)
      setAccreditations(accreditationsData)
    } catch (error) {
      console.error("Failed to load content data:", error)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUser")
    router.push("/admin/login")
  }

  const refreshData = async () => {
    setRefreshing(true)
    await checkAuth()
    setRefreshing(false)
  }

  const handleApproveCondolence = async (id: number) => {
    try {
      await apiClient.updateCondolenceStatus(id, "approved")
      await loadContentData()
      await checkAuth() // Refresh stats
    } catch (error) {
      console.error("Failed to approve condolence:", error)
    }
  }

  const handleRejectCondolence = async (id: number) => {
    try {
      await apiClient.updateCondolenceStatus(id, "rejected")
      await loadContentData()
      await checkAuth() // Refresh stats
    } catch (error) {
      console.error("Failed to reject condolence:", error)
    }
  }

  const handleApproveTribute = async (id: number) => {
    try {
      await apiClient.updateTributeStatus(id, "approved")
      await loadContentData()
      await checkAuth() // Refresh stats
    } catch (error) {
      console.error("Failed to approve tribute:", error)
    }
  }

  const handleRejectTribute = async (id: number) => {
    try {
      await apiClient.updateTributeStatus(id, "rejected")
      await loadContentData()
      await checkAuth() // Refresh stats
    } catch (error) {
      console.error("Failed to reject tribute:", error)
    }
  }

  const handleApproveAccreditation = async (id: number) => {
    try {
      await apiClient.updateAccreditationStatus(id, "approved")
      await loadContentData()
      await checkAuth() // Refresh stats
    } catch (error) {
      console.error("Failed to approve accreditation:", error)
    }
  }

  const handleRejectAccreditation = async (id: number) => {
    try {
      await apiClient.updateAccreditationStatus(id, "rejected")
      await loadContentData()
      await checkAuth() // Refresh stats
    } catch (error) {
      console.error("Failed to reject accreditation:", error)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated || !stats) {
    return null
  }

  const totalPending = stats.condolences.pending + stats.tributes.pending + stats.accreditations.pending

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Modern Header */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-green-600 to-green-700 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">Memorial Admin</h1>
                <p className="text-slate-600 text-sm">Welcome back, {user?.fullName}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              {totalPending > 0 && (
                <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 border border-amber-200 rounded-lg">
                  <Bell className="w-4 h-4 text-amber-600" />
                  <span className="text-sm font-medium text-amber-800">{totalPending} pending</span>
                </div>
              )}

              <Button variant="outline" onClick={refreshData} disabled={refreshing}>
                <RefreshCw className={`w-4 h-4 mr-2 ${refreshing ? "animate-spin" : ""}`} />
                Refresh
              </Button>

              <Link href="/" className="text-slate-600 hover:text-slate-900 text-sm">
                View Site
              </Link>

              <Button variant="outline" onClick={handleLogout} className="text-red-600 border-red-200 hover:bg-red-50">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Modern Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-700 text-sm font-medium mb-1">Condolences</p>
                <p className="text-3xl font-bold text-blue-900">{stats.condolences.total}</p>
                {stats.condolences.pending > 0 && (
                  <p className="text-blue-600 text-sm">{stats.condolences.pending} pending</p>
                )}
              </div>
              <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-700 text-sm font-medium mb-1">Tributes</p>
                <p className="text-3xl font-bold text-green-900">{stats.tributes.total}</p>
                {stats.tributes.pending > 0 && (
                  <p className="text-green-600 text-sm">{stats.tributes.pending} pending</p>
                )}
              </div>
              <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-700 text-sm font-medium mb-1">Accreditations</p>
                <p className="text-3xl font-bold text-purple-900">{stats.accreditations.total}</p>
                {stats.accreditations.pending > 0 && (
                  <p className="text-purple-600 text-sm">{stats.accreditations.pending} pending</p>
                )}
              </div>
              <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-700 text-sm font-medium mb-1">Gallery Items</p>
                <p className="text-3xl font-bold text-orange-900">{stats.gallery.total}</p>
                <p className="text-orange-600 text-sm">Active items</p>
              </div>
              <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center">
                <ImageIcon className="w-6 h-6 text-white" />
              </div>
            </div>
          </Card>
        </div>

        {/* Modern Tabs Interface */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList className="grid w-full max-w-md grid-cols-3 bg-slate-100">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white">
                Overview
              </TabsTrigger>
              <TabsTrigger value="content" className="data-[state=active]:bg-white">
                Content
              </TabsTrigger>
              <TabsTrigger value="pending" className="data-[state=active]:bg-white">
                Pending ({totalPending})
              </TabsTrigger>
            </TabsList>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
                <Input
                  placeholder="Search..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Quick Actions */}
            <Card className="p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-6">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button
                  className="h-auto p-4 flex flex-col items-center gap-2 bg-blue-600 hover:bg-blue-700"
                  onClick={() => setActiveTab("pending")}
                >
                  <MessageCircle className="w-6 h-6" />
                  <span>Review Condolences</span>
                  {stats.condolences.pending > 0 && (
                    <Badge variant="secondary">{stats.condolences.pending} pending</Badge>
                  )}
                </Button>

                <Button
                  className="h-auto p-4 flex flex-col items-center gap-2 bg-green-600 hover:bg-green-700"
                  onClick={() => setActiveTab("pending")}
                >
                  <Users className="w-6 h-6" />
                  <span>Review Tributes</span>
                  {stats.tributes.pending > 0 && <Badge variant="secondary">{stats.tributes.pending} pending</Badge>}
                </Button>

                <Button
                  className="h-auto p-4 flex flex-col items-center gap-2 bg-purple-600 hover:bg-purple-700"
                  onClick={() => setActiveTab("pending")}
                >
                  <Calendar className="w-6 h-6" />
                  <span>Review Accreditations</span>
                  {stats.accreditations.pending > 0 && (
                    <Badge variant="secondary">{stats.accreditations.pending} pending</Badge>
                  )}
                </Button>

                <Button className="h-auto p-4 flex flex-col items-center gap-2 bg-orange-600 hover:bg-orange-700">
                  <Plus className="w-6 h-6" />
                  <span>Add Gallery Item</span>
                </Button>
              </div>
            </Card>

            {/* Recent Activity */}
            <div className="grid lg:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">Recent Activity</h3>
                  <Activity className="w-5 h-5 text-slate-500" />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">New condolence submitted</p>
                      <p className="text-xs text-slate-500">2 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-4 h-4 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Tribute approved</p>
                      <p className="text-xs text-slate-500">15 minutes ago</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                    <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <Calendar className="w-4 h-4 text-purple-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium">Accreditation registered</p>
                      <p className="text-xs text-slate-500">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-bold text-slate-900">System Status</h3>
                  <TrendingUp className="w-5 h-5 text-green-500" />
                </div>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Python Backend</span>
                    <Badge className="bg-green-100 text-green-800">Healthy</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Database</span>
                    <Badge className="bg-green-100 text-green-800">Connected</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">API Status</span>
                    <Badge className="bg-green-100 text-green-800">Online</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Last Backup</span>
                    <Badge className="bg-blue-100 text-blue-800">2h ago</Badge>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="content" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Content Management Cards */}
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <MessageCircle className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Condolences</h3>
                    <p className="text-sm text-slate-600">Moderate messages</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total</span>
                    <span className="font-medium">{stats.condolences.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pending</span>
                    <Badge variant={stats.condolences.pending > 0 ? "destructive" : "secondary"}>
                      {stats.condolences.pending}
                    </Badge>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" onClick={() => setActiveTab("pending")}>
                  <Eye className="w-4 h-4 mr-2" />
                  Manage Condolences
                </Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Tributes</h3>
                    <p className="text-sm text-slate-600">Review submissions</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total</span>
                    <span className="font-medium">{stats.tributes.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pending</span>
                    <Badge variant={stats.tributes.pending > 0 ? "destructive" : "secondary"}>
                      {stats.tributes.pending}
                    </Badge>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" onClick={() => setActiveTab("pending")}>
                  <Eye className="w-4 h-4 mr-2" />
                  Manage Tributes
                </Button>
              </Card>

              <Card className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900">Accreditations</h3>
                    <p className="text-sm text-slate-600">Process applications</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Total</span>
                    <span className="font-medium">{stats.accreditations.total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pending</span>
                    <Badge variant={stats.accreditations.pending > 0 ? "destructive" : "secondary"}>
                      {stats.accreditations.pending}
                    </Badge>
                  </div>
                </div>
                <Button className="w-full mt-4" variant="outline" onClick={() => setActiveTab("pending")}>
                  <Eye className="w-4 h-4 mr-2" />
                  Manage Accreditations
                </Button>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            {/* Pending Condolences */}
            {condolences.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Pending Condolences ({condolences.length})</h3>
                <div className="space-y-4">
                  {condolences.slice(0, 5).map((condolence) => (
                    <div key={condolence.id} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-slate-900">{condolence.name}</h4>
                          <p className="text-sm text-slate-600">{condolence.email}</p>
                          {condolence.location && <p className="text-sm text-slate-500">{condolence.location}</p>}
                        </div>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                      <p className="text-sm text-slate-700 mb-3 line-clamp-2">{condolence.message}</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproveCondolence(condolence.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleRejectCondolence(condolence.id)}>
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Pending Tributes */}
            {tributes.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">Pending Tributes ({tributes.length})</h3>
                <div className="space-y-4">
                  {tributes.slice(0, 5).map((tribute) => (
                    <div key={tribute.id} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-slate-900">{tribute.name}</h4>
                          <p className="text-sm text-slate-600">{tribute.email}</p>
                          {tribute.location && <p className="text-sm text-slate-500">{tribute.location}</p>}
                        </div>
                        <Badge variant="secondary">Pending</Badge>
                      </div>
                      <p className="text-sm text-slate-700 mb-3 line-clamp-2">{tribute.message}</p>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproveTribute(tribute.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button size="sm" variant="destructive" onClick={() => handleRejectTribute(tribute.id)}>
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {/* Pending Accreditations */}
            {accreditations.length > 0 && (
              <Card className="p-6">
                <h3 className="text-lg font-bold text-slate-900 mb-4">
                  Pending Accreditations ({accreditations.length})
                </h3>
                <div className="space-y-4">
                  {accreditations.slice(0, 5).map((accreditation) => (
                    <div key={accreditation.id} className="p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium text-slate-900">
                            {accreditation.first_name} {accreditation.last_name}
                          </h4>
                          <p className="text-sm text-slate-600">{accreditation.organization}</p>
                          <p className="text-sm text-slate-500">{accreditation.position}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant="secondary">Pending</Badge>
                          <p className="text-xs text-slate-500 mt-1">{accreditation.category}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => handleApproveAccreditation(accreditation.id)}
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Check className="w-4 h-4 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleRejectAccreditation(accreditation.id)}
                        >
                          <X className="w-4 h-4 mr-1" />
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            )}

            {totalPending === 0 && (
              <Card className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">All Caught Up!</h3>
                <p className="text-slate-600">No pending items require your attention at this time.</p>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
