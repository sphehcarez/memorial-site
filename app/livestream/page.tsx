"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Play, Users, MessageCircle, Send, Volume2, VolumeX, Maximize, Settings } from "lucide-react"
import CondolencesTicker from "@/components/condolences-ticker"
import Navigation from "@/components/navigation"

interface ChatMessage {
  id: number
  name: string
  message: string
  timestamp: string
  moderated: boolean
}

export default function LivestreamPage() {
  const [isLive, setIsLive] = useState(false)
  // Removed viewerCount state
  const [chatMessage, setChatMessage] = useState("")
  const [userName, setUserName] = useState("")
  const [isMuted, setIsMuted] = useState(false)
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([])
  const [timeToStream, setTimeToStream] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Stream date: June 14, 2025, 10:00 AM
  const streamDate = new Date("2025-06-14T10:00:00Z")

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const difference = streamDate.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeToStream({ days, hours, minutes, seconds })
      } else {
        setIsLive(true)
        // Removed setting of live demo viewer numbers
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  // Sample chat messages
  useEffect(() => {
    const sampleMessages: ChatMessage[] = [
      {
        id: 1,
        name: "Mary K.",
        message: "Rest in peace, Your Excellency. Thank you for your service to Zambia.",
        timestamp: new Date().toISOString(),
        moderated: true,
      },
      {
        id: 2,
        name: "John M.",
        message: "A true leader who served with dignity. His legacy will live on.",
        timestamp: new Date().toISOString(),
        moderated: true,
      },
      {
        id: 3,
        name: "Sarah P.",
        message: "Watching from Kitwe. Dr. Lungu will be remembered forever.",
        timestamp: new Date().toISOString(),
        moderated: true,
      },
    ]
    setChatMessages(sampleMessages)
  }, [])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!chatMessage.trim() || !userName.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now(),
      name: userName,
      message: chatMessage,
      timestamp: new Date().toISOString(),
      moderated: false,
    }

    setChatMessages((prev) => [...prev, newMessage])
    setChatMessage("")
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-green-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold">Memorial Service Livestream</h1>
          <p className="text-xl mt-2">Watch the Service Live Online</p>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Video Player */}
          <div className="lg:col-span-3">
            <Card className="overflow-hidden">
              <div className="aspect-video bg-black relative">
                {/* Always show YouTube livestream embed */}
                <iframe
                  width="100%"
                  height="100%"
                  src="https://www.youtube.com/embed/s1fltIgWBNg?si=Y1H3WIybwz3rx47g"
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                  <div className="flex items-center justify-between text-white">
                    <div className="flex items-center gap-4">
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Play className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-white hover:bg-white/20"
                        onClick={() => setIsMuted(!isMuted)}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </Button>
                      {isLive && (
                        <div className="flex items-center gap-2">
                          <Badge className="bg-red-600">LIVE</Badge>
                          <div className="flex items-center gap-1 text-sm">
                            <Users className="w-4 h-4" />
                            {/* Removed live demo viewer numbers */}
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Settings className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost" className="text-white hover:bg-white/20">
                        <Maximize className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stream Info */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-green-800">
                      Memorial Service for Dr. Edgar Chagwa Lungu
                    </h2>
                    <p className="text-gray-600">National Heroes Stadium, Lusaka</p>
                  </div>
                  {isLive && (
                    <div className="text-right">
                      <Badge className="bg-red-600">LIVE</Badge>
                    </div>
                  )}
                </div>

                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Date & Time</h4>
                    <p className="text-gray-600">Wednesday, 25th June 2025 at 11:00</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Main Celebrant</h4>
                    <p className="text-gray-600">Archbishop Alick Banda of Lusaka-Zambia</p>
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1">Address</h4>
                    <p className="text-gray-600">186 Nugget Street, Hillbrow, Johannesburg, 2001</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Chat Sidebar */}
          <div className="lg:col-span-1">
            <Card className="h-[600px] flex flex-col">
              <div className="p-4 border-b">
                <div className="flex items-center gap-2 mb-4">
                  <MessageCircle className="w-5 h-5 text-green-700" />
                  <h3 className="font-bold text-green-800">Live Chat</h3>
                  {isLive && (
                    <Badge variant="outline" className="text-xs">
                      Moderated
                    </Badge>
                  )}
                </div>

                {/* User Name Input */}
                <Input
                  placeholder="Enter your name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mb-2"
                />
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="text-sm">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-green-700">{msg.name}</span>
                      {!msg.moderated && (
                        <Badge variant="outline" className="text-xs">
                          Pending
                        </Badge>
                      )}
                    </div>
                    <p className="text-gray-700">{msg.message}</p>
                  </div>
                ))}
              </div>

              {/* Chat Input */}
              <div className="p-4 border-t">
                <form onSubmit={handleSendMessage} className="space-y-2">
                  <Textarea
                    placeholder="Share your thoughts respectfully..."
                    value={chatMessage}
                    onChange={(e) => setChatMessage(e.target.value)}
                    rows={2}
                    maxLength={200}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">{chatMessage.length}/200</span>
                    <Button
                      type="submit"
                      size="sm"
                      disabled={!chatMessage.trim() || !userName.trim()}
                      className="bg-green-700 hover:bg-green-800"
                    >
                      <Send className="w-4 h-4 mr-1" />
                      Send
                    </Button>
                  </div>
                </form>
                <p className="text-xs text-gray-500 mt-2">Messages are moderated before appearing in chat</p>
              </div>
            </Card>
          </div>
        </div>

        {/* Additional Information */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="p-6">
            <h3 className="text-xl font-serif font-bold text-green-800 mb-4">Technical Information</h3>
            <div className="space-y-3 text-sm">
              <div>
                <h4 className="font-bold mb-1">Stream Quality</h4>
                <p className="text-gray-600">HD 1080p (auto-adjusts based on connection)</p>
              </div>
              <div>
                <h4 className="font-bold mb-1">Supported Devices</h4>
                <p className="text-gray-600">Desktop, mobile, tablet, smart TV</p>
              </div>
              <div>
                <h4 className="font-bold mb-1">Accessibility</h4>
                <p className="text-gray-600">Closed captions available, sign language interpretation</p>
              </div>
              <div>
                <h4 className="font-bold mb-1">Recording</h4>
                <p className="text-gray-600">Full service will be available for replay after conclusion</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-xl font-serif font-bold text-green-800 mb-4">Chat Guidelines</h3>
            <div className="space-y-2 text-sm text-gray-700">
              <p>• Keep messages respectful and appropriate</p>
              <p>• Share memories and condolences</p>
              <p>• No political arguments or inappropriate content</p>
              <p>• Messages are moderated before appearing</p>
              <p>• Be patient as moderators review submissions</p>
            </div>
            <div className="mt-4 p-3 bg-green-50 rounded-lg">
              <p className="text-xs text-green-700">
                <strong>Note:</strong> This is a memorial service. Please maintain dignity and respect in all
                communications.
              </p>
            </div>
          </Card>
        </div>
      </div>

      <CondolencesTicker />
    </div>
  )
}
