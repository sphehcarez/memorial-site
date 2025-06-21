"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Check,
  X,
  Search,
  ArrowLeft,
  Download,
  Eye,
  User,
  Calendar,
  MapPin,
  Phone,
  Mail,
  Building,
  FileText,
} from "lucide-react"
import Link from "next/link"
import apiClient from "@/lib/api"

interface AccreditationSubmission {
  id: number
  // Personal Information
  firstName: string
  lastName: string
  email: string
  phone: string
  nationality: string
  idNumber: string
  dateOfBirth: string

  // Professional Information
  organization: string
  position: string
  category: "media" | "diplomatic" | "government" | "religious" | "traditional" | "international" | "family"
  accreditationType: "vip" | "media" | "general" | "family"

  // Contact Information
  address: string
  city: string
  country: string
  emergencyContact: string
  emergencyPhone: string

  // Additional Information
  specialRequirements?: string
  vehicleRegistration?: string
  accompaniedBy?: string

  // Submission Details
  timestamp: string
  status: "pending" | "approved" | "rejected"
  ipAddress?: string
  documents?: string[]

  // Admin Notes
  adminNotes?: string
  approvedBy?: string
  approvedDate?: string
}

export default function AdminAccreditationsPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState<string>("all")
  const [accreditations, setAccreditations] = useState<AccreditationSubmission[]>([])
  const [selectedAccreditation, setSelectedAccreditation] = useState<AccreditationSubmission | null>(null)
  const [showDetails, setShowDetails] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  // Fetch accreditations from backend
  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
      setLoading(true)
      setError(null)
      apiClient.getAccreditations()
        .then((data: any[]) => {
          setAccreditations(
            data.map((item: any) => ({
              id: item.id,
              firstName: item.first_name,
              lastName: item.last_name,
              email: item.email,
              phone: item.phone,
              nationality: item.nationality,
              idNumber: item.id_number,
              dateOfBirth: item.date_of_birth,
              organization: item.organization,
              position: item.position,
              category: item.category,
              accreditationType: item.accreditation_type,
              address: item.address,
              city: item.city,
              country: item.country,
              emergencyContact: item.emergency_contact,
              emergencyPhone: item.emergency_phone,
              specialRequirements: item.special_requirements,
              vehicleRegistration: item.vehicle_registration,
              accompaniedBy: item.accompanied_by,
              timestamp: item.submitted_at,
              status: item.status,
              ipAddress: item.ip_address,
              documents: item.documents || [],
              adminNotes: item.admin_notes,
              approvedBy: item.reviewed_by_name,
              approvedDate: item.reviewed_at,
            }))
          )
          setLoading(false)
        })
        .catch((_err: any) => {
          setError("Failed to load accreditations.")
          setLoading(false)
        })
    } else {
      router.push("/admin/login")
    }
  }, [router])

  // Approve accreditation
  const handleApprove = async (id: number) => {
    try {
      await apiClient.updateAccreditationStatus(id, "approved")
      setAccreditations((prev) =>
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                status: "approved",
                approvedBy: "You",
                approvedDate: new Date().toISOString(),
              }
            : item,
        ),
      )
    } catch (e) {
      setError("Failed to approve accreditation.")
    }
  }

  // Reject accreditation
  const handleReject = async (id: number) => {
    try {
      await apiClient.updateAccreditationStatus(id, "rejected")
      setAccreditations((prev) => prev.map((item) => (item.id === id ? { ...item, status: "rejected" } : item)))
    } catch (e) {
      setError("Failed to reject accreditation.")
    }
  }

  const handleViewDetails = (accreditation: AccreditationSubmission) => {
    setSelectedAccreditation(accreditation)
    setShowDetails(true)
  }

  const exportToExcel = () => {
    alert("Exporting accreditations to Excel...")
  }

  const filteredAccreditations = accreditations.filter((item) => {
    const matchesSearch =
      item.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.organization.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesCategory = filterCategory === "all" || item.category === filterCategory

    return matchesSearch && matchesCategory
  })

  const pendingCount = accreditations.filter((item) => item.status === "pending").length
  const approvedCount = accreditations.filter((item) => item.status === "approved").length
  const rejectedCount = accreditations.filter((item) => item.status === "rejected").length

  if (loading) {
    return <div>Loading accreditations...</div>
  }
  if (error) {
    return <div className="text-red-600">{error}</div>
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "media":
        return "bg-blue-100 text-blue-800"
      case "diplomatic":
        return "bg-purple-100 text-purple-800"
      case "government":
        return "bg-green-100 text-green-800"
      case "religious":
        return "bg-yellow-100 text-yellow-800"
      case "traditional":
        return "bg-orange-100 text-orange-800"
      case "international":
        return "bg-indigo-100 text-indigo-800"
      case "family":
        return "bg-pink-100 text-pink-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const AccreditationCard = ({ accreditation }: { accreditation: AccreditationSubmission }) => (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-3">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
            <User className="w-6 h-6 text-green-700" />
          </div>
          <div>
            <h3 className="font-bold text-lg">
              {accreditation.firstName} {accreditation.lastName}
            </h3>
            <p className="text-gray-600">{accreditation.position}</p>
            <p className="text-gray-600 text-sm">{accreditation.organization}</p>
            <div className="flex items-center gap-2 mt-1">
              <Badge className={getCategoryColor(accreditation.category)}>{accreditation.category}</Badge>
              <Badge variant="outline" className="text-xs">
                {accreditation.accreditationType}
              </Badge>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={
              accreditation.status === "approved"
                ? "default"
                : accreditation.status === "rejected"
                  ? "destructive"
                  : "secondary"
            }
          >
            {accreditation.status}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <Calendar className="w-3 h-3" />
            {new Date(accreditation.timestamp).toLocaleDateString()}
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
        <div className="flex items-center gap-2 text-gray-600">
          <Mail className="w-4 h-4" />
          {accreditation.email}
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Phone className="w-4 h-4" />
          {accreditation.phone}
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <MapPin className="w-4 h-4" />
          {accreditation.city}, {accreditation.country}
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <Building className="w-4 h-4" />
          {accreditation.nationality}
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        <Button size="sm" variant="outline" onClick={() => handleViewDetails(accreditation)}>
          <Eye className="w-4 h-4 mr-1" />
          View Full Details
        </Button>
        {accreditation.status === "pending" && (
          <>
            <Button
              size="sm"
              onClick={() => handleApprove(accreditation.id)}
              className="bg-green-600 hover:bg-green-700"
            >
              <Check className="w-4 h-4 mr-1" />
              Approve
            </Button>
            <Button size="sm" variant="destructive" onClick={() => handleReject(accreditation.id)}>
              <X className="w-4 h-4 mr-1" />
              Reject
            </Button>
          </>
        )}
        {accreditation.status === "rejected" && (
          <Button size="sm" onClick={() => handleApprove(accreditation.id)} className="bg-green-600 hover:bg-green-700">
            <Check className="w-4 h-4 mr-1" />
            Approve
          </Button>
        )}
        {accreditation.status === "approved" && (
          <Button size="sm" variant="destructive" onClick={() => handleReject(accreditation.id)}>
            <X className="w-4 h-4 mr-1" />
            Revoke
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
                <h1 className="text-3xl font-serif font-bold">Accreditation Management</h1>
                <p className="text-green-200 mt-1">Review and approve service access registrations</p>
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
              <div className="text-2xl font-bold text-gray-900">{accreditations.length}</div>
              <div className="text-sm text-gray-600">Total Applications</div>
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

        {/* Filters */}
        <Card className="p-4 mb-6">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search by name, email, or organization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="media">Media</SelectItem>
                <SelectItem value="diplomatic">Diplomatic</SelectItem>
                <SelectItem value="government">Government</SelectItem>
                <SelectItem value="religious">Religious</SelectItem>
                <SelectItem value="traditional">Traditional</SelectItem>
                <SelectItem value="international">International</SelectItem>
                <SelectItem value="family">Family</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </Card>

        {/* Accreditations Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({accreditations.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {filteredAccreditations.map((accreditation) => (
                <AccreditationCard key={accreditation.id} accreditation={accreditation} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="space-y-4">
              {filteredAccreditations
                .filter((item) => item.status === "pending")
                .map((accreditation) => (
                  <AccreditationCard key={accreditation.id} accreditation={accreditation} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <div className="space-y-4">
              {filteredAccreditations
                .filter((item) => item.status === "approved")
                .map((accreditation) => (
                  <AccreditationCard key={accreditation.id} accreditation={accreditation} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            <div className="space-y-4">
              {filteredAccreditations
                .filter((item) => item.status === "rejected")
                .map((accreditation) => (
                  <AccreditationCard key={accreditation.id} accreditation={accreditation} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Accreditation Details Modal */}
      {showDetails && selectedAccreditation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-serif font-bold text-green-800">Accreditation Details</h2>
                <Button variant="outline" onClick={() => setShowDetails(false)}>
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Personal Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Full Name</label>
                        <p className="text-gray-900">
                          {selectedAccreditation.firstName} {selectedAccreditation.lastName}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Email</label>
                        <p className="text-gray-900">{selectedAccreditation.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Phone</label>
                        <p className="text-gray-900">{selectedAccreditation.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Nationality</label>
                        <p className="text-gray-900">{selectedAccreditation.nationality}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">ID Number</label>
                        <p className="text-gray-900">{selectedAccreditation.idNumber}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Date of Birth</label>
                        <p className="text-gray-900">
                          {new Date(selectedAccreditation.dateOfBirth).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Emergency Contact</label>
                        <p className="text-gray-900">{selectedAccreditation.emergencyContact}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Emergency Phone</label>
                        <p className="text-gray-900">{selectedAccreditation.emergencyPhone}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Professional Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Professional Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Organization</label>
                        <p className="text-gray-900">{selectedAccreditation.organization}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Position</label>
                        <p className="text-gray-900">{selectedAccreditation.position}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Category</label>
                        <Badge className={getCategoryColor(selectedAccreditation.category)}>
                          {selectedAccreditation.category}
                        </Badge>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Accreditation Type</label>
                        <Badge variant="outline">{selectedAccreditation.accreditationType}</Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Address Information */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Address Information</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Address</label>
                        <p className="text-gray-900">{selectedAccreditation.address}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">City</label>
                        <p className="text-gray-900">{selectedAccreditation.city}</p>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Country</label>
                        <p className="text-gray-900">{selectedAccreditation.country}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                {(selectedAccreditation.specialRequirements ||
                  selectedAccreditation.vehicleRegistration ||
                  selectedAccreditation.accompaniedBy) && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Additional Information</h3>
                    <div className="space-y-3">
                      {selectedAccreditation.specialRequirements && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Special Requirements</label>
                          <p className="text-gray-900">{selectedAccreditation.specialRequirements}</p>
                        </div>
                      )}
                      {selectedAccreditation.vehicleRegistration && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Vehicle Registration</label>
                          <p className="text-gray-900">{selectedAccreditation.vehicleRegistration}</p>
                        </div>
                      )}
                      {selectedAccreditation.accompaniedBy && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Accompanied By</label>
                          <p className="text-gray-900">{selectedAccreditation.accompaniedBy}</p>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Documents */}
                {selectedAccreditation.documents && selectedAccreditation.documents.length > 0 && (
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Submitted Documents</h3>
                    <div className="grid md:grid-cols-2 gap-2">
                      {selectedAccreditation.documents.map((doc, index) => (
                        <div key={index} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                          <FileText className="w-4 h-4 text-gray-600" />
                          <span className="text-sm text-gray-900">{doc}</span>
                          <Button size="sm" variant="outline" className="ml-auto">
                            <Download className="w-3 h-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submission Details */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900 mb-4 border-b pb-2">Submission Details</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-gray-600">Submission Date</label>
                        <p className="text-gray-900">{new Date(selectedAccreditation.timestamp).toLocaleString()}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-600">Status</label>
                        <Badge
                          className={`${
                            selectedAccreditation.status === "approved"
                              ? "bg-green-600"
                              : selectedAccreditation.status === "rejected"
                                ? "bg-red-600"
                                : "bg-yellow-600"
                          }`}
                        >
                          {selectedAccreditation.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="space-y-3">
                      {selectedAccreditation.ipAddress && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">IP Address</label>
                          <p className="text-gray-900">{selectedAccreditation.ipAddress}</p>
                        </div>
                      )}
                      {selectedAccreditation.approvedBy && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Approved By</label>
                          <p className="text-gray-900">{selectedAccreditation.approvedBy}</p>
                        </div>
                      )}
                      {selectedAccreditation.approvedDate && (
                        <div>
                          <label className="text-sm font-medium text-gray-600">Approved Date</label>
                          <p className="text-gray-900">
                            {new Date(selectedAccreditation.approvedDate).toLocaleString()}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-4 pt-4 border-t">
                  {selectedAccreditation.status === "pending" && (
                    <>
                      <Button
                        onClick={() => {
                          handleApprove(selectedAccreditation.id)
                          setShowDetails(false)
                        }}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Check className="w-4 h-4 mr-2" />
                        Approve Accreditation
                      </Button>
                      <Button
                        variant="destructive"
                        onClick={() => {
                          handleReject(selectedAccreditation.id)
                          setShowDetails(false)
                        }}
                      >
                        <X className="w-4 h-4 mr-2" />
                        Reject Application
                      </Button>
                    </>
                  )}
                  {selectedAccreditation.status === "approved" && (
                    <Button
                      variant="destructive"
                      onClick={() => {
                        handleReject(selectedAccreditation.id)
                        setShowDetails(false)
                      }}
                    >
                      <X className="w-4 h-4 mr-2" />
                      Revoke Accreditation
                    </Button>
                  )}
                  {selectedAccreditation.status === "rejected" && (
                    <Button
                      onClick={() => {
                        handleApprove(selectedAccreditation.id)
                        setShowDetails(false)
                      }}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Check className="w-4 h-4 mr-2" />
                      Approve Accreditation
                    </Button>
                  )}
                  <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Generate Badge
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
