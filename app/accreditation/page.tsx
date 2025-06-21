"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Users, Camera, Building, Briefcase, Scale, AlertTriangle } from "lucide-react"
import CondolencesTicker from "@/components/condolences-ticker"
import Navigation from "@/components/navigation"

type AccreditationCategory = "service-provider" | "media" | "mp" | "party-official" | "guest"

export default function AccreditationPage() {
  const [selectedCategory, setSelectedCategory] = useState<AccreditationCategory | "">("")
  const [formData, setFormData] = useState({
    fullName: "",
    idNumber: "",
    email: "",
    contactNumber: "",
    organisation: "",
    position: "",
    notes: "",
    consent: false,
  })

  const categories = [
    {
      id: "service-provider" as const,
      title: "Service Provider",
      description: "Event services, security, catering, technical support",
      icon: Briefcase,
      color: "bg-black",
      textColor: "text-white",
      borderColor: "border-black",
    },
    {
      id: "media" as const,
      title: "Media",
      description: "Journalists, photographers, broadcasters, media personnel",
      icon: Camera,
      color: "bg-red-500",
      textColor: "text-white",
      borderColor: "border-red-500",
    },
    {
      id: "mp" as const,
      title: "Member of Parliament",
      description: "Current and former Members of Parliament",
      icon: Building,
      color: "bg-orange-500",
      textColor: "text-white",
      borderColor: "border-orange-500",
    },
    {
      id: "party-official" as const,
      title: "Party Official",
      description: "Political party officials and representatives",
      icon: Users,
      color: "bg-green-500",
      textColor: "text-white",
      borderColor: "border-green-500",
    },
    {
      id: "guest" as const,
      title: "Guest",
      description: "Legal fraternity, clergy, former ministers, former officials",
      icon: Scale,
      color: "bg-yellow-500",
      textColor: "text-black",
      borderColor: "border-yellow-500",
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

    alert(
      "Accreditation request submitted successfully! You will receive a confirmation email once your application is approved and verified.",
    )

    // Reset form
    setSelectedCategory("")
    setFormData({
      fullName: "",
      idNumber: "",
      email: "",
      contactNumber: "",
      organisation: "",
      position: "",
      notes: "",
      consent: false,
    })
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-green-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold">Accreditation Portal</h1>
          <p className="text-xl mt-2">Memorial Service Access Registration</p>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Important Notice */}
        <Card className="p-6 bg-red-50 border-red-200 mb-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="font-bold text-red-800 mb-3">Important Notice</h3>
              <div className="space-y-3 text-red-700 text-sm">
                <p>
                  <strong>Family</strong> and <strong>VIP-Friends</strong> categories are <strong>NOT</strong> available
                  through this public portal.
                </p>
                <p>
                  All other attendees must be accredited through this portal or will be seated in{" "}
                  <strong>General Access</strong>.
                </p>
                <p className="font-semibold">
                  All applications are subject to <strong>vetting and verification</strong>. A confirmation email will
                  be sent once approval is granted and your accreditation tag will be made available.
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Excluded Categories Notice */}
        <Card className="p-4 bg-purple-50 border-purple-200 mb-8">
          <h4 className="font-bold text-purple-800 mb-2">Categories NOT Available in This Portal:</h4>
          <div className="flex gap-2">
            <Badge className="bg-purple-500 text-white">Family</Badge>
            <Badge className="bg-white text-black border border-gray-300">VIP - Friends</Badge>
          </div>
          <p className="text-purple-700 text-xs mt-2">These categories use separate invitation processes</p>
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
                    className={`p-6 cursor-pointer hover:shadow-lg transition-all duration-200 border-2 hover:${category.borderColor} hover:scale-105`}
                    onClick={() => setSelectedCategory(category.id)}
                  >
                    <div className="text-center">
                      <div
                        className={`w-16 h-16 ${category.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      >
                        <IconComponent className={`w-8 h-8 ${category.textColor}`} />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{category.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{category.description}</p>
                      <Badge className={`${category.color} ${category.textColor} shadow-sm`}>{category.title}</Badge>
                    </div>
                  </Card>
                )
              })}
            </div>

            {/* General Access Notice */}
            <Card className="p-4 bg-gray-100 border-gray-300 mt-8">
              <div className="text-center">
                <h4 className="font-bold text-gray-800 mb-2">General Access</h4>
                <p className="text-gray-600 text-sm">
                  Attendees without accreditation will be seated in the general access area
                </p>
              </div>
            </Card>
          </div>
        ) : (
          /* Registration Form */
          <div>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl font-serif font-bold text-green-800">Accreditation Application</h2>
                <p className="text-gray-600 mt-2">
                  Category:
                  <Badge
                    className={`ml-2 ${categories.find((c) => c.id === selectedCategory)?.color} ${categories.find((c) => c.id === selectedCategory)?.textColor}`}
                  >
                    {categories.find((c) => c.id === selectedCategory)?.title}
                  </Badge>
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

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="organisation" className="block text-sm font-medium text-gray-700 mb-2">
                      Organisation / Affiliation *
                    </label>
                    <Input
                      id="organisation"
                      value={formData.organisation}
                      onChange={(e) => setFormData({ ...formData, organisation: e.target.value })}
                      required
                      placeholder="Enter your organisation"
                    />
                  </div>
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">
                      Position / Title *
                    </label>
                    <Input
                      id="position"
                      value={formData.position}
                      onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                      required
                      placeholder="Enter your position or title"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Information
                  </label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    rows={3}
                    placeholder="Any special requirements, dietary needs, accessibility requirements, etc."
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
                    information will be used solely for memorial service access management. I acknowledge that all
                    applications are subject to vetting and verification. *
                  </label>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">Vetting & Verification Process</h4>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Your application will be reviewed and verified by our security team</li>
                    <li>• You will receive a confirmation email within 48-72 hours if approved</li>
                    <li>• Approved applicants will receive accreditation details and access instructions</li>
                    <li>• Please bring valid ID and confirmation email to the venue</li>
                    <li>• Your accreditation tag will be available for collection at the venue</li>
                  </ul>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-green-700 hover:bg-green-800 text-lg py-3"
                  disabled={!formData.consent}
                >
                  Submit Accreditation Application
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
