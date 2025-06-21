"use client"

import type React from "react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Heart, MessageCircle, User } from "lucide-react"
import { useState, useEffect } from "react"
import Navigation from "@/components/navigation"
import apiClient from "@/lib/api"

export default function CondolencesPage() {
  const [name, setName] = useState("")
  const [message, setMessage] = useState("")
  const [location, setLocation] = useState("")
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [condolenceMessages, setCondolenceMessages] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadCondolences()
  }, [])

  const loadCondolences = async () => {
    try {
      const data = await apiClient.getPublicCondolences(20)
      setCondolenceMessages(data)
    } catch (error) {
      console.error("Failed to load condolences:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await apiClient.submitCondolence({
        name,
        email,
        location,
        message,
      })

      // Reset form
      setName("")
      setEmail("")
      setMessage("")
      setLocation("")

      alert("Thank you for your condolence message. It has been submitted for review.")
    } catch (error) {
      console.error("Failed to submit condolence:", error)
      alert("Failed to submit condolence. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold">Condolences</h1>
          <p className="text-xl mt-2">Share Your Memories and Messages</p>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Condolence Form */}
          <Card className="p-8 bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Heart className="w-6 h-6 text-green-700" />
              <h2 className="text-3xl font-serif font-bold text-green-800">Leave a Message</h2>
            </div>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Name *
                </label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <Input
                  id="location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="City, Country"
                  disabled={isSubmitting}
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Message *
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  rows={6}
                  placeholder="Share your memories, condolences, or thoughts about Dr. Lungu's legacy..."
                  disabled={isSubmitting}
                />
              </div>
              <Button type="submit" className="w-full bg-green-700 hover:bg-green-800" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit Condolence"}
              </Button>
            </form>
          </Card>

          {/* Guidelines */}
          <Card className="p-8 bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <MessageCircle className="w-6 h-6 text-green-700" />
              <h2 className="text-3xl font-serif font-bold text-green-800">Guidelines</h2>
            </div>
            <div className="space-y-4 text-gray-700">
              <p>
                We welcome messages of condolence, memories, and reflections on Dr. Lungu's life and legacy. Please keep
                your messages respectful and appropriate.
              </p>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2">What to include:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>Personal memories or encounters</li>
                  <li>Reflections on his leadership</li>
                  <li>Messages of support for the family</li>
                  <li>Thoughts on his legacy</li>
                </ul>
              </div>
              <div className="bg-yellow-50 p-4 rounded-lg">
                <h4 className="font-bold text-yellow-800 mb-2">Please note:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm">
                  <li>All messages are moderated before publication</li>
                  <li>Political attacks or inappropriate content will not be published</li>
                  <li>Messages should be respectful and dignified</li>
                  <li>Please be patient as we review submissions</li>
                </ul>
              </div>
            </div>
          </Card>
        </div>

        {/* Condolence Messages */}
        <div className="mt-12">
          <h2 className="text-3xl font-serif font-bold text-green-800 mb-8 text-center">Messages of Condolence</h2>

          {isLoading ? (
            <div className="text-center py-8">
              <div className="w-8 h-8 border-4 border-green-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading condolences...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {condolenceMessages.map((condolence) => (
                <Card key={condolence.id} className="p-6 bg-white shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-green-700" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="font-bold text-gray-900">{condolence.name}</h3>
                        {condolence.location && (
                          <>
                            <span className="text-gray-400">•</span>
                            <span className="text-gray-600 text-sm">{condolence.location}</span>
                          </>
                        )}
                        <span className="text-gray-400">•</span>
                        <span className="text-gray-500 text-sm">
                          {new Date(condolence.submitted_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{condolence.message}</p>
                    </div>
                  </div>
                </Card>
              ))}

              {condolenceMessages.length === 0 && (
                <Card className="p-8 text-center">
                  <p className="text-gray-600">No approved condolences to display yet.</p>
                </Card>
              )}
            </div>
          )}
        </div>

        {/* Memorial Quote */}
        <Card className="p-8 bg-white shadow-sm mt-12">
          <div className="text-center">
            <div className="text-6xl text-green-300 mb-4 font-serif">"</div>
            <blockquote className="text-xl text-gray-700 font-serif leading-relaxed mb-4">
              In times of grief, we find comfort in shared memories and the knowledge that a life well-lived continues
              to inspire others long after it has ended.
            </blockquote>
            <p className="text-gray-500 italic">Thank you for honoring Dr. Lungu's memory</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
