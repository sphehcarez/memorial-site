"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Users, Shield, Camera, Building } from "lucide-react"
import CondolencesTicker from "@/components/condolences-ticker"
import Navigation from "@/components/navigation"

type AccreditationCategory = "media" | "guest" | "all-access" | "mp" | "party-official"

export default function AccreditationPage() {
  const [selectedCategory, setSelectedCategory] = useState<AccreditationCategory | "">("")
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    email: "",
    contactNumber: "",
    organisation: "",
    notes: "",
    consent: false,
  })

  const categories = [
    {
      id: "media" as const,
      title: "Media",
      description: "Journalists, Photographers, and Media personnel",
      icon: Camera,
      color: "bg-blue-500",
    },
    {
      id: "guest" as const,
      title: "Guest",
      description: "Legal Fraternity, Former Ministers, Former aides/staff",
      icon: Users,
      color: "bg-green-500",
    },
    {
      id: "all-access" as const,
      title: "All Access / Event Management",
      description: "Event Organizers and Management Personnel",
      icon: Shield,
      color: "bg-purple-500",
    },
    {
      id: "mp" as const,
      title: "Member of Parliament",
      description: "Current and Former Members of Parliament",
      icon: Building,
      color: "bg-red-500",
    },
    {
      id: "party-official" as const,
      title: "Party Official",
      description: "Political Party Officials and Representatives",
      icon: Users,
      color: "bg-orange-500",
    },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedCategory || !formData.consent) {
      alert("Please select a category and provide consent.")
      return
    }

    // In a real app, this would submit to an API
    console.log("Accreditation submission:", {
      category: selectedCategory,
      ...formData,
    })

    alert("Accreditation request submitted successfully! You will receive a confirmation email shortly.")

    // Reset form
    setSelectedCategory("")
    setFormData({
      fullName: "",
      idNumber: "",
      email: "",
      contactNumber: "",
      organisation: "",
      notes: "",
      consent: false,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-green-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold">Accreditation Registration</h1>
          <p className="text-xl mt-2">Memorial Service Access Registration</p>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Important Notice */}
        <Card className="p-6 bg-yellow-50 border-yellow-200 mb-8">
          <h3 className="font-bold text-yellow-800 mb-2">Important Notice</h3>
          <p className="text-yellow-700 text-sm">
            The following categories are <strong>excluded</strong> from this registration portal and should not apply:
          </p>
          <div className="flex gap-2 mt-2">
            <Badge variant="outline" className="border-red-500 text-red-700">
              Family Members
            </Badge>
            <Badge variant="outline" className="border-red-500 text-red-700">
              VVIP
            </Badge>
          </div>
        </Card>

        {!selectedCategory ? (
          /* Category Selection */
          <div>
            <h2 className="text-3xl font-serif font-bold text-green-800 mb-8 text-center">Select Your Category</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Card
                    key={category.id}
                    className="p-6 cursor-pointer hover:shadow-lg transition-shadow border-2 hover:border-green-300"
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="text-center">
                      <div
                        className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4`}
                      >
                        <IconComponent className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                      <p className="text-gray-600 text-sm">{category.description}</p>
                    </div>
                  </Card>
                )
              })}
            </div>
          </div>
        ) : (
          /* Registration Form */
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-serif font-bold text-green-800">Registration Form</h2>
                <p className="text-gray-600 mt-2">
                  Category: <Badge className="ml-2">{categories.find((c) => c.id === selectedCategory)?.title}</Badge>
                </p>
              </div>
              <Button variant="outline" onClick={() => setSelectedCategory("")}>
                Change Category
              </Button>
            </div>

            <Card className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label htmlFor="idNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      ID / Passport Number *
                    </label>
                    <Input
                      id="idNumber"
                      value={formData.idNumber}
                      onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                      required
                      placeholder="Enter ID or passport number"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      required
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="contactNumber" className="block text-sm font-medium text-gray-700 mb-2">
                      Contact Number *
                    </label>
                    <Input
                      id="contactNumber"
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      required
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="organisation" className="block text-sm font-medium text-gray-700 mb-2">
                    Organisation / Affiliation *
                  </label>
                  <Input
                    id="organisation"
                    value={formData.organisation}
                    onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                    required
                    placeholder="Enter your organisation or affiliation"
                  />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Optional Notes
                  </label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    placeholder="Any special requirements (dietary, accessibility, etc.)"
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="consent"
                    checked={formData.consent}
                    onCheckedChange={(checked) => setFormData({ ...formData, consent: checked as boolean })}
                  />
                  <label htmlFor="consent" className="text-sm text-gray-700">
                    I consent to the processing of my personal data for accreditation purposes and understand that this
                    information will be used solely for memorial service access management. *
                  </label>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">What happens next?</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Your application will be reviewed by our team</li>
                    <li>• You will receive an email confirmation within 24-48 hours</li>
                    <li>• Approved applicants will receive accreditation details and instructions</li>
                    <li>• Please bring valid ID and confirmation email to the venue</li>
                  </ul>
                </div>

                <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={!formData.consent}>
                  Submit Accreditation Request
                </Button>
              </form>
            </Card>
          </div>
        )}
      </div>

      <CondolencesTicker />
    </div>
  )
}
