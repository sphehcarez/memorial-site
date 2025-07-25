"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X, Search, ArrowLeft, Download, Eye, User, Calendar, MapPin } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import apiClient from "@/lib/api"

interface Tribute {
  id: number
  name: string
  location?: string
  email: string
  phone?: string
  message: string
  image?: string
  timestamp: string
  status: "pending" | "approved" | "rejected"
  ipAddress?: string
  userAgent?: string
}

export default function AdminTributesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [tributes, setTributes] = useState<Tribute[]>([])
  const [selectedTribute, setSelectedTribute] = useState<Tribute | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
      setLoading(true)
      setError(null)
      apiClient.getTributes()
        .then((data: any[]) => {
          setTributes(
            data.map((item: any) => ({
              id: item.id,
              name: item.name,
              location: item.location,
              email: item.email,
              phone: item.phone,
              message: item.message,
              image: item.images && item.images.length > 0 ? item.images[0] : undefined,
              timestamp: item.submitted_at,
              status: item.status,
              ipAddress: item.ip_address,
              userAgent: item.user_agent,
            }))
          )
          setLoading(false)
        })
        .catch((_err: any) => {
          setError("Failed to load tributes.")
          setLoading(false)
        })
    } else {
      router.push("/admin/login")
    }
  }, [router])

  const handleApprove = async (id: number) => {
    try {
      await apiClient.updateTributeStatus(id, "approved")
      setTributes((prev) => prev.map((item) => (item.id === id ? { ...item, status: "approved" } : item)))
    } catch (e) {
      setError("Failed to approve tribute.")
    }
  }

  const handleReject = async (id: number) => {
    try {
      await apiClient.updateTributeStatus(id, "rejected")
      setTributes((prev) => prev.map((item) => (item.id === id ? { ...item, status: "rejected" } : item)))
    } catch (e) {
      setError("Failed to reject tribute.")
    }
  }

  const handleViewDetails = (tribute: Tribute) => {
    setSelectedTribute(tribute)
    setShowDetails(true)
  }

  const exportToExcel = () => {
    alert("Exporting tributes to Excel...")
  }

  const filteredTributes = tributes.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const pendingCount = tributes.filter((item) => item.status === "pending").length
  const approvedCount = tributes.filter((item) => item.status === "approved").length
  const rejectedCount = tributes.filter((item) => item.status === "rejected").length

  if (loading) {
    return <div>Loading tributes...</div>
  }
  if (error) {
    return <div className="text-red-600">{error}</div>
  }

  const TributeCard = ({ tribute }: { tribute: Tribute }) => (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <h3 className="font-bold text-lg">{tribute.name}</h3>
            {tribute.location && (
              <div className="flex items-center gap-1 text-gray-600 text-sm">
                <MapPin className="w-3 h-3" />
                {tribute.location}
              </div>
            )}
            <p className="text-gray-500 text-xs">{tribute.email}</p>
            {tribute.phone && <p className="text-gray-500 text-xs">{tribute.phone}</p>}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={
              tribute.status === "approved" ? "default" : tribute.status === "rejected" ? "destructive" : "secondary"
            }
          >
            {tribute.status}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            {new Date(tribute.timestamp).toLocaleDateString()}
          </div>
        </div>
      </div>

      {tribute.image && (
        <div className="mb-4">
          <Image
            src={tribute.image || "/placeholder.svg"}
            alt="Tribute image"
            width={300}
            height={200}
            className="rounded-lg object-cover"
          />
        </div>
      )}

      <p className="text-gray-700 mb-4 line-clamp-3">{tribute.message}</p>

      <div className="flex gap-2 flex-wrap">
        <Button size="sm" variant="outline" onClick={() => handleViewDetails(tribute)}>
          <Eye className="w-4 h-4 mr-1" />
          View Details
        </Button>
        {tribute.status === "pending" && (
          <>
            <Button size="sm" onClick={() => handleApprove(tribute.id)} className="bg-green-600 hover:bg-green-700">
              <Check className="w-4 h-4 mr-1" />
              Approve
            </Button>
            <Button size="sm" variant="destructive" onClick={() => handleReject(tribute.id)}>
              <X className="w-4 h-4 mr-1" />
              Reject
            </Button>
          </>
        )}
        {tribute.status === "rejected" && (
          <Button size="sm" onClick={() => handleApprove(tribute.id)} className="bg-green-600 hover:bg-green-700">
            <Check className="w-4 h-4 mr-1" />
            Approve
          </Button>
        )}
        {tribute.status === "approved" && (
          <Button size="sm" variant="destructive" onClick={() => handleReject(tribute.id)}>
            <X className="w-4 h-4 mr-1" />
            Reject
          </Button>
        )}
      </div>
    </Card>
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm" className="text-green-800 border-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-serif font-bold">Tribute Management</h1>
                <p className="text-green-200 mt-1">Review and approve tribute submissions</p>
              </div>
            </div>
            <Button variant="outline" onClick={exportToExcel} className="text-green-800 border-white">
              <Download className="w-4 h-4 mr-2" />
              Export Excel
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{tributes.length}</div>
              <div className="text-sm text-gray-600">Total Tributes</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{pendingCount}</div>
              <div className="text-sm text-gray-600">Pending Review</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{approvedCount}</div>
              <div className="text-sm text-gray-600">Approved</div>
            </div>
          </Card>
          <Card className="p-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{rejectedCount}</div>
              <div className="text-sm text-gray-600">Rejected</div>
            </div>
          </Card>
        </div>

        {/* Search */}
        <Card className="p-4 mb-6">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search tributes by name, location, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Tributes Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({tributes.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {filteredTributes.map((tribute) => (
                <TributeCard key={tribute.id} tribute={tribute} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="space-y-4">
              {filteredTributes
                .filter((item) => item.status === "pending")
                .map((tribute) => (
                  <TributeCard key={tribute.id} tribute={tribute} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <div className="space-y-4">
              {filteredTributes
                .filter((item) => item.status === "approved")
                .map((tribute) => (
                  <TributeCard key={tribute.id} tribute={tribute} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            <div className="space-y-4">
              {filteredTributes
                .filter((item) => item.status === "rejected")
                .map((tribute) => (
                  <TributeCard key={tribute.id} tribute={tribute} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Tribute Details Modal */}
      {showDetails && selectedTribute && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold text-green-800">Tribute Details</h2>
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* User Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Submitter Information</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Name:</span> {selectedTribute.name}
                      </p>
                      {selectedTribute.location && (
                        <p>
                          <span className="font-medium">Location:</span> {selectedTribute.location}
                        </p>
                      )}
                      <p>
                        <span className="font-medium">Email:</span> {selectedTribute.email}
                      </p>
                      {selectedTribute.phone && (
                        <p>
                          <span className="font-medium">Phone:</span> {selectedTribute.phone}
                        </p>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Submission Details</h3>
                    <div className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Date:</span>{" "}
                        {new Date(selectedTribute.timestamp).toLocaleString()}
                      </p>
                      <p>
                        <span className="font-medium">Status:</span>
                        <Badge
                          className={`ml-2 ${
                            selectedTribute.status === "approved"
                              ? "bg-green-600"
                              : selectedTribute.status === "rejected"
                                ? "bg-red-600"
                                : "bg-yellow-600"
                          }`}
                        >
                          {selectedTribute.status}
                        </Badge>
                      </p>
                      {selectedTribute.ipAddress && (
                        <p>
                          <span className="font-medium">IP Address:</span> {selectedTribute.ipAddress}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                {/* Image */}
                {selectedTribute.image && (
                  <div>
                    <h3 className="font-bold text-gray-900 mb-2">Attached Image</h3>
                    <Image
                      src={selectedTribute.image || "/placeholder.svg"}
                      alt="Tribute image"
                      width={400}
                      height={300}
                      className="rounded-lg object-cover"
                    />
                  </div>
                )}

                {/* Message */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Tribute Message</h3>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700 leading-relaxed">{selectedTribute.message}</p>
                  </div>
                </div>

                {/* Technical Details */}
                <div>
                  <h3 className="font-bold text-gray-900 mb-2">Technical Information</h3>
                  <div className="bg-gray-50 p-4 rounded-lg text-sm">
                    {selectedTribute.userAgent && (
                      <p>
                        <span className="font-medium">User Agent:</span> {selectedTribute.userAgent}
                      </p>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t">
                  {selectedTribute.status === "pending" && (
                    <>
                      <Button
                        onClick={() => {
                          handleApprove(selectedTribute.id)
                          setShowDetails(false)
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Approve Tribute
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          handleReject(selectedTribute.id)
                          setShowDetails(false)
                        }}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject Tribute
                      </Button>
                    </>
                  )}
                  {selectedTribute.status === "approved" && (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleReject(selectedTribute.id)
                        setShowDetails(false)
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Reject Tribute
                    </Button>
                  )}
                  {selectedTribute.status === "rejected" && (
                    <Button
                      onClick={() => {
                        handleApprove(selectedTribute.id)
                        setShowDetails(false)
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve Tribute
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
