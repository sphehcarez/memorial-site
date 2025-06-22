"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Heart, User, Upload } from "lucide-react"
import Image from "next/image"
import CondolencesTicker from "@/components/condolences-ticker"
import Navigation from "@/components/navigation"

interface Tribute {
  id: number
  name: string
  location?: string
  message: string
  image?: string
  timestamp: string
  approved: boolean
}

export default function TributeWallPage() {
  const [formData, setFormData] = useState({
    name: "",
    location: "",
    email: "",
    phone: "",
    message: "",
    image: null as File | null,
  })

  // Only show approved tributes
  const [tributes] = useState<Tribute[]>([
    {
      id: 2,
      name: "John Mwanza",
      location: "Ndola",
      message:
        "A son of the Copperbelt who never forgot where he came from. Dr. Lungu's journey from Ndola to State House inspired many of us. His legacy will live on in our hearts.",
      timestamp: "2025-06-07T14:15:00Z",
      approved: true,
    },
    {
      id: 3,
      name: "Sarah Phiri",
      location: "Kitwe",
      message:
        "During his presidency, Dr. Lungu showed compassion by commuting death sentences. This act of mercy demonstrated his belief in human dignity and second chances.",
      image: "/placeholder.svg?height=200&width=300",
      timestamp: "2025-06-08T09:20:00Z",
      approved: true,
    },
    {
      id: 5,
      name: "Gugulethu Musonda",
      location: "Livingstone",
      message:
        "The National Day of Prayer he established brought our nation together in faith. Dr. Lungu understood that leadership requires both political wisdom and spiritual guidance.",
      timestamp: "2025-06-01T13:15:00Z",
      approved: true,
    },
  ])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, this would submit to an API for admin approval
    console.log("Tribute submission:", formData)

    alert(
      "Thank you for your tribute! Your message has been submitted for review and will appear on the wall once approved by our administrators.",
    )

    // Reset form
    setFormData({
      name: "",
      location: "",
      email: "",
      phone: "",
      message: "",
      image: null,
    })
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData({ ...formData, image: file })
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-green-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold">My Favourite ECL Moment</h1>
          <p className="text-xl mt-2">Share Your Memories and Tributes</p>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tribute Submission Form */}
          <div className="lg:col-span-1">
            <Card className="p-6 bg-white shadow-sm sticky top-24">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-6 h-6 text-green-700" />
                <h2 className="text-2xl font-serif font-bold text-green-800">Share Your Tribute</h2>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name *
                  </label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    placeholder="Enter your full name"
                  />
                </div>

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
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+260-xxx-xxx-xxx"
                  />
                </div>

                <div>
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <Input
                    id="location"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="City, Country"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Favourite ECL Moment *
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={4}
                    placeholder="Share your favorite memory or moment involving Dr. Lungu..."
                    maxLength={500}
                  />
                  <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters</p>
                </div>

                <div>
                  <label htmlFor="image" className="block text-sm font-medium text-gray-700 mb-2">
                    Upload Image (Optional)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                    <input type="file" id="image" accept="image/*" onChange={handleImageUpload} className="hidden" />
                    <label htmlFor="image" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        {formData.image ? formData.image.name : "Click to upload image"}
                      </p>
                    </label>
                  </div>
                </div>

                <div className="bg-yellow-50 p-3 rounded-lg">
                  <p className="text-xs text-yellow-700">
                    <strong>Note:</strong> All tributes are reviewed by administrators before publication to ensure
                    appropriateness and respect.
                  </p>
                </div>

                <Button type="submit" className="w-full bg-green-700 hover:bg-green-800">
                  Submit Tribute for Review
                </Button>
              </form>
            </Card>
          </div>

          {/* Tribute Wall - Only Approved Tributes */}
          <div className="lg:col-span-2">
            <div className="mb-8">
              <h2 className="text-3xl font-serif font-bold text-green-800 mb-4">Approved Tributes</h2>
              <p className="text-gray-600">
                Read heartfelt tributes and favorite memories shared by people whose lives were touched by Dr. Lungu.
                All tributes have been reviewed and approved by our administrators.
              </p>
            </div>

            <div className="space-y-6">
              {tributes.map((tribute) => (
                <Card key={tribute.id} className="p-6 bg-white shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-6 h-6 text-green-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900">{tribute.name}</h3>
                        {tribute.location && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600 text-sm">{tribute.location}</span>
                          </>
                        )}
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 text-sm">
                          {new Date(tribute.timestamp).toLocaleDateString()}
                        </span>
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

                      <p className="text-gray-700 leading-relaxed mb-3">{tribute.message}</p>

                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          <Heart className="w-3 h-3 mr-1 text-red-500" />
                          Tribute
                        </Badge>
                        <Badge variant="outline" className="text-xs border-green-500 text-green-700">
                          ✓ Approved
                        </Badge>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {/* Load More Button */}
            <div className="text-center mt-8">
              <Button variant="outline" className="px-8">
                Load More Tributes
              </Button>
            </div>
          </div>
        </div>
      </div>

      <CondolencesTicker />
    </div>
  )
}
