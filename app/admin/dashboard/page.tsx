"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, MessageCircle, ImageIcon, Calendar, Settings, LogOut, Eye, Plus, BarChart3 } from "lucide-react"
import Link from "next/link"
import apiClient from "@/lib/api"

// Add type for recent activity
interface RecentActivityItem {
  id: number;
  type: string;
  user: string;
  action: string;
  time: string;
}

export default function AdminDashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [stats, setStats] = useState([
    { title: "Total Condolences", value: "-", icon: MessageCircle, color: "bg-blue-500" },
    { title: "Pending Tributes", value: "-", icon: Users, color: "bg-yellow-500" },
    { title: "Gallery Items", value: "-", icon: ImageIcon, color: "bg-green-500" },
    { title: "Accreditations", value: "-", icon: Calendar, color: "bg-purple-500" },
  ])
  const [recentActivity, setRecentActivity] = useState<RecentActivityItem[]>([])
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
      // Fetch dashboard data from FastAPI backend
      apiClient.getDashboardData()
        .then((data) => {
          // Example: adjust this mapping to match your backend response
          setStats([
            { title: "Total Condolences", value: data.total_condolences, icon: MessageCircle, color: "bg-blue-500" },
            { title: "Pending Tributes", value: data.pending_tributes, icon: Users, color: "bg-yellow-500" },
            { title: "Gallery Items", value: data.gallery_items, icon: ImageIcon, color: "bg-green-500" },
            { title: "Accreditations", value: data.accreditations, icon: Calendar, color: "bg-purple-500" },
          ])
          setRecentActivity(data.recent_activity || [])
        })
        .catch((err) => {
          console.error("Failed to fetch dashboard data:", err)
        })
    } else {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-serif font-bold">Admin Dashboard</h1>
              <p className="text-green-200 mt-1">Memorial Website Management</p>
            </div>
            <div className="flex items-center gap-4">
              <Link href="/" className="text-green-200 hover:text-white">
                View Site
              </Link>
              <Button variant="outline" onClick={handleLogout} className="text-green-800 border-white">
                <LogOut className="w-4 h-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon
            return (
              <Card key={index} className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Management Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Content Management */}
          <Card className="p-6">
            <h2 className="text-xl font-serif font-bold text-green-800 mb-6">Content Management</h2>
            <div className="space-y-4">
              <Link
                href="/admin/condolences"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <MessageCircle className="w-5 h-5 text-green-700" />
                  <div>
                    <h3 className="font-medium">Condolences</h3>
                    <p className="text-sm text-gray-600">Moderate and manage condolence messages</p>
                  </div>
                </div>
                <Badge variant="outline">23 pending</Badge>
              </Link>

              <Link
                href="/admin/tributes"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Users className="w-5 h-5 text-green-700" />
                  <div>
                    <h3 className="font-medium">Tribute Wall</h3>
                    <p className="text-sm text-gray-600">Review and approve tribute submissions</p>
                  </div>
                </div>
                <Badge variant="outline">8 pending</Badge>
              </Link>

              <Link
                href="/admin/gallery"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <ImageIcon className="w-5 h-5 text-green-700" />
                  <div>
                    <h3 className="font-medium">Gallery</h3>
                    <p className="text-sm text-gray-600">Upload and manage photos and videos</p>
                  </div>
                </div>
                <Badge variant="outline">156 items</Badge>
              </Link>

              <Link
                href="/admin/accreditations"
                className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-green-700" />
                  <div>
                    <h3 className="font-medium">Accreditations</h3>
                    <p className="text-sm text-gray-600">Manage service access registrations</p>
                  </div>
                </div>
                <Badge variant="outline">89 registered</Badge>
              </Link>
            </div>
          </Card>

          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="text-xl font-serif font-bold text-green-800 mb-6">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    {activity.type === "condolence" && <MessageCircle className="w-4 h-4 text-green-700" />}
                    {activity.type === "tribute" && <Users className="w-4 h-4 text-green-700" />}
                    {activity.type === "accreditation" && <Calendar className="w-4 h-4 text-green-700" />}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm">
                      <span className="font-medium">{activity.user}</span> {activity.action}
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activity
            </Button>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6">
          <h2 className="text-xl font-serif font-bold text-green-800 mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Button className="bg-green-700 hover:bg-green-800">
              <Plus className="w-4 h-4 mr-2" />
              Add Gallery Item
            </Button>
            <Button variant="outline">
              <BarChart3 className="w-4 h-4 mr-2" />
              View Analytics
            </Button>
            <Button variant="outline">
              <Settings className="w-4 h-4 mr-2" />
              Site Settings
            </Button>
            <Button variant="outline">
              <Eye className="w-4 h-4 mr-2" />
              Preview Site
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}
