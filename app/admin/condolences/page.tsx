"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Check, X, Search, ArrowLeft, Download } from "lucide-react"
import Link from "next/link"

interface CondolenceMessage {
  id: number
  name: string
  location?: string
  message: string
  email: string
  timestamp: string
  status: "pending" | "approved" | "rejected"
}

export default function AdminCondolencesPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [condolences, setCondolences] = useState<CondolenceMessage[]>([])
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
      // Load sample data
      setCondolences([
        {
          id: 1,
          name: "Mary Banda",
          location: "Lusaka",
          message: "A true leader who served Zambia with dedication. Rest in peace, Your Excellency.",
          email: "mary.banda@email.com",
          timestamp: "2025-06-07T10:30:00Z",
          status: "pending",
        },
        {
          id: 2,
          name: "John Mwanza",
          location: "Ndola",
          message: "Dr. Lungu's legacy will forever inspire future generations of Zambians.",
          email: "john.mwanza@email.com",
          timestamp: "2025-06-07T11:15:00Z",
          status: "approved",
        },
        {
          id: 3,
          name: "Sarah Phiri",
          location: "Kitwe",
          message: "Thank you for your service to our nation. Your memory lives on in our hearts.",
          email: "sarah.phiri@email.com",
          timestamp: "2025-06-07T12:00:00Z",
          status: "approved",
        },
        {
          id: 4,
          name: "David Tembo",
          location: "Livingstone",
          message: "A statesman who believed in democracy and peaceful transitions. Forever remembered.",
          email: "david.tembo@email.com",
          timestamp: "2025-06-07T13:45:00Z",
          status: "pending",
        },
      ])
    } else {
      router.push("/admin/login")
    }
  }, [router])

  const handleApprove = (id: number) => {
    setCondolences((prev) => prev.map((item) => (item.id === id ? { ...item, status: "approved" } : item)))
  }

  const handleReject = (id: number) => {
    setCondolences((prev) => prev.map((item) => (item.id === id ? { ...item, status: "rejected" } : item)))
  }

  const exportToExcel = () => {
    // In a real app, this would generate an Excel file
    alert("Exporting condolences to Excel...")
  }

  const filteredCondolences = condolences.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.location && item.location.toLowerCase().includes(searchTerm.toLowerCase())),
  )

  const pendingCount = condolences.filter((item) => item.status === "pending").length
  const approvedCount = condolences.filter((item) => item.status === "approved").length
  const rejectedCount = condolences.filter((item) => item.status === "rejected").length

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  const CondolenceCard = ({ condolence }: { condolence: CondolenceMessage }) => (
    <Card className="p-6">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-bold text-lg">{condolence.name}</h3>
          {condolence.location && <p className="text-gray-600 text-sm">{condolence.location}</p>}
          <p className="text-gray-500 text-xs">{condolence.email}</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge
            variant={
              condolence.status === "approved"
                ? "default"
                : condolence.status === "rejected"
                  ? "destructive"
                  : "secondary"
            }
          >
            {condolence.status}
          </Badge>
          <span className="text-xs text-gray-500">{new Date(condolence.timestamp).toLocaleDateString()}</span>
        </div>
      </div>

      <p className="text-gray-700 mb-4">{condolence.message}</p>

      {condolence.status === "pending" && (
        <div className="flex gap-2">
          <Button size="sm" onClick={() => handleApprove(condolence.id)} className="bg-green-600 hover:bg-green-700">
            <Check className="w-4 h-4 mr-1" />
            Approve
          </Button>
          <Button size="sm" variant="destructive" onClick={() => handleReject(condolence.id)}>
            <X className="w-4 h-4 mr-1" />
            Reject
          </Button>
        </div>
      )}
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
                <h1 className="text-3xl font-serif font-bold">Condolences Management</h1>
                <p className="text-green-200 mt-1">Review and moderate condolence messages</p>
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
              <div className="text-2xl font-bold text-gray-900">{condolences.length}</div>
              <div className="text-sm text-gray-600">Total Messages</div>
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
              placeholder="Search condolences by name, location, or message..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </Card>

        {/* Condolences Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">All ({condolences.length})</TabsTrigger>
            <TabsTrigger value="pending">Pending ({pendingCount})</TabsTrigger>
            <TabsTrigger value="approved">Approved ({approvedCount})</TabsTrigger>
            <TabsTrigger value="rejected">Rejected ({rejectedCount})</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <div className="space-y-4">
              {filteredCondolences.map((condolence) => (
                <CondolenceCard key={condolence.id} condolence={condolence} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="pending" className="mt-6">
            <div className="space-y-4">
              {filteredCondolences
                .filter((item) => item.status === "pending")
                .map((condolence) => (
                  <CondolenceCard key={condolence.id} condolence={condolence} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="approved" className="mt-6">
            <div className="space-y-4">
              {filteredCondolences
                .filter((item) => item.status === "approved")
                .map((condolence) => (
                  <CondolenceCard key={condolence.id} condolence={condolence} />
                ))}
            </div>
          </TabsContent>

          <TabsContent value="rejected" className="mt-6">
            <div className="space-y-4">
              {filteredCondolences
                .filter((item) => item.status === "rejected")
                .map((condolence) => (
                  <CondolenceCard key={condolence.id} condolence={condolence} />
                ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
