"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  Car,
  Video,
  Shirt,
  NavigationIcon,
  Users,
  AlertCircle,
  CheckCircle,
  Download,
} from "lucide-react"
import Link from "next/link"
import CondolencesTicker from "@/components/condolences-ticker"
import Navigation from "@/components/navigation"

export default function BurialDetailsPage() {
  const [timeToService, setTimeToService] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  // Service date: June 14, 2025, 10:00 AM
  const serviceDate = new Date("2025-06-14T10:00:00Z")

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date()
      const difference = serviceDate.getTime() - now.getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeToService({ days, hours, minutes, seconds })
      }
    }, 1000)

    return () => clearInterval(interval)
  }, [])

  const schedule = [
    {
      time: "8:00 AM",
      event: "Venue preparation and setup",
      location: "FNB Stadium",
      status: "preparation",
    },
    { time: "9:00 AM", event: "VIP and family arrival", location: "Private entrance", status: "vip" },
    { time: "9:30 AM", event: "General public seating begins", location: "Main entrances", status: "public" },
    { time: "10:00 AM", event: "Memorial service commences", location: "Main arena", status: "ceremony" },
    { time: "10:15 AM", event: "Opening prayers and national anthem", location: "Main arena", status: "ceremony" },
    { time: "10:45 AM", event: "Tributes and eulogies", location: "Main arena", status: "ceremony" },
    { time: "11:30 AM", event: "Presidential address", location: "Main arena", status: "ceremony" },
    { time: "12:00 PM", event: "Cultural performances", location: "Main arena", status: "ceremony" },
    { time: "12:30 PM", event: "Final prayers and benediction", location: "Main arena", status: "ceremony" },
    { time: "1:00 PM", event: "Service conclusion", location: "Main arena", status: "ceremony" },
    { time: "2:00 PM", event: "Private burial ceremony", location: "Westpark Cemetery", status: "private" },
  ]

  const speakers = [
    { name: "Most Rev. Alick Banda", title: "Archbishop of Lusaka", time: "10:15 AM" },
    { name: "Hon. Given Lucinda", title: "Acting President Patriotic Front", time: "11:00 AM" },
    { name: "Hon. Tasila Lungu", title: "Family Representative", time: "11:15 AM" },
  ]

  const venues = [
    {
      name: "FNB Stadium",
      type: "Main Venue",
      capacity: "94,000",
      address: "Soccer City, Johannesburg, South Africa",
      facilities: ["Wheelchair Access", "Medical Station", "VIP Lounge", "Media Center"],
      parking: "Limited - Shuttle Service Recommended",
    },
    {
      name: "Westpark Cemetery",
      type: "Burial Site",
      capacity: "Private Ceremony",
      address: "Westpark, Johannesburg, South Africa",
      facilities: ["Family Area", "Security Perimeter", "Media Viewing Area"],
      parking: "Restricted Access",
    },
  ]

  const transportOptions = [
    {
      type: "Free Shuttle Service",
      routes: ["City Center → Stadium", "University → Stadium", "Airport → Stadium"],
      schedule: "Every 15 minutes from 8:00 AM",
      cost: "Free",
    },
    {
      type: "Public Transport",
      routes: ["Bus Routes 1, 5, 12", "Taxi Services Available"],
      schedule: "Regular city schedule",
      cost: "Standard fares apply",
    },
    {
      type: "Private Vehicle",
      routes: ["Independence Avenue", "Great East Road", "Kafue Road"],
      schedule: "Traffic restrictions from 7:00 AM",
      cost: "Parking fees may apply",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50 pb-16">
      {/* Header */}
      <div className="bg-green-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold">Memorial Service Details</h1>
          <p className="text-xl mt-2">Complete Information & Guidelines</p>
        </div>
      </div>

      {/* Navigation */}
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Countdown Timer */}
        <Card className="p-8 bg-gradient-to-r from-green-50 to-blue-50 border-green-200 mb-8">
          <div className="text-center">
            <h2 className="text-2xl font-serif font-bold text-green-800 mb-4">Time Until Memorial Service</h2>
            <div className="grid grid-cols-4 gap-4 max-w-md mx-auto">
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-green-700">{timeToService.days}</div>
                <div className="text-sm text-gray-600">Days</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-green-700">{timeToService.hours}</div>
                <div className="text-sm text-gray-600">Hours</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-green-700">{timeToService.minutes}</div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
              <div className="bg-white p-4 rounded-lg shadow">
                <div className="text-2xl font-bold text-green-700">{timeToService.seconds}</div>
                <div className="text-sm text-gray-600">Seconds</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Enhanced Service Information Tabs */}
        <Tabs defaultValue="overview" className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="programme">Programme</TabsTrigger>
            <TabsTrigger value="speakers">Speakers</TabsTrigger>
            <TabsTrigger value="venues">Venues</TabsTrigger>
            <TabsTrigger value="transport">Transport</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-8">
              <Card className="p-8 bg-white shadow-sm">
                <h2 className="text-3xl font-serif font-bold text-green-800 mb-6">Service Details</h2>
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-6 h-6 text-green-700" />
                    <div>
                      <h3 className="font-bold text-gray-900">Date</h3>
                      <p className="text-gray-600">Saturday, June 14, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-6 h-6 text-green-700" />
                    <div>
                      <h3 className="font-bold text-gray-900">Time</h3>
                      <p className="text-gray-600">10:00 AM - 1:00 PM (CAT)</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-6 h-6 text-green-700" />
                    <div>
                      <h3 className="font-bold text-gray-900">Venue</h3>
                      <p className="text-gray-600">FNB Stadium</p>
                      <p className="text-gray-500 text-sm">Soccer City, Johannesburg, South Africa</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Video className="w-6 h-6 text-green-700" />
                    <div>
                      <h3 className="font-bold text-gray-900">Livestream</h3>
                      <p className="text-gray-600">Available on Grindstone Television</p>
                      <a
                        href="https://www.youtube.com/@grindstonetelevisionzambia163"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-green-700 text-sm hover:underline"
                      >
                        Watch on YouTube →
                      </a>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="w-6 h-6 text-green-700" />
                    <div>
                      <h3 className="font-bold text-gray-900">Expected Attendance</h3>
                      <p className="text-gray-600">50,000+ attendees</p>
                      <p className="text-gray-500 text-sm">Including international dignitaries</p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-8 bg-white shadow-sm">
                <h2 className="text-3xl font-serif font-bold text-green-800 mb-6">Quick Actions</h2>
                <div className="space-y-4">
                  
                  <Link href="/livestream">
                    <Button variant="outline" className="w-full justify-start">
                      <Video className="w-4 h-4 mr-2" />
                      Watch Live Stream
                    </Button>
                  </Link>
                  <Button variant="outline" className="w-full justify-start">
                    <Download className="w-4 h-4 mr-2" />
                    Download Programme PDF
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <NavigationIcon className="w-4 h-4 mr-2" />
                    Get Directions
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-blue-800">Important Notice</h4>
                      <p className="text-sm text-blue-700 mt-1">
                        Security screening begins at 8:00 AM. Please arrive early and bring valid identification.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="programme" className="mt-6">
            <Card className="p-8 bg-white shadow-sm">
              <h2 className="text-3xl font-serif font-bold text-green-800 mb-6">Service Programme</h2>
              <div className="space-y-4">
                {schedule.map((item, index) => (
                  <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg">
                    <Badge
                      className={`min-w-fit ${
                        item.status === "ceremony"
                          ? "bg-green-700"
                          : item.status === "vip"
                            ? "bg-purple-600"
                            : item.status === "private"
                              ? "bg-red-600"
                              : "bg-blue-600"
                      }`}
                    >
                      {item.time}
                    </Badge>
                    <div className="flex-1">
                      <h3 className="font-bold text-gray-900">{item.event}</h3>
                      <p className="text-gray-600 text-sm">{item.location}</p>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {item.status === "ceremony"
                        ? "Main Event"
                        : item.status === "vip"
                          ? "VIP Only"
                          : item.status === "private"
                            ? "Private"
                            : item.status === "public"
                              ? "Public"
                              : "Setup"}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="speakers" className="mt-6">
            <Card className="p-8 bg-white shadow-sm">
              <h2 className="text-3xl font-serif font-bold text-green-800 mb-6">Featured Speakers</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {speakers.map((speaker, index) => (
                  <div key={index} className="p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-bold text-gray-900">{speaker.name}</h3>
                      <Badge variant="outline">{speaker.time}</Badge>
                    </div>
                    <p className="text-gray-600 text-sm">{speaker.title}</p>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="venues" className="mt-6">
            <div className="grid lg:grid-cols-2 gap-8">
              {venues.map((venue, index) => (
                <Card key={index} className="p-8 bg-white shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-6 h-6 text-green-700" />
                    <div>
                      <h2 className="text-2xl font-serif font-bold text-green-800">{venue.name}</h2>
                      <Badge variant="outline">{venue.type}</Badge>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-bold text-gray-900">Capacity</h4>
                      <p className="text-gray-600">{venue.capacity}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Address</h4>
                      <p className="text-gray-600">{venue.address}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Facilities</h4>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {venue.facilities.map((facility, idx) => (
                          <Badge key={idx} variant="secondary" className="text-xs">
                            {facility}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900">Parking</h4>
                      <p className="text-gray-600 text-sm">{venue.parking}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="transport" className="mt-6">
            <div className="space-y-6">
              {transportOptions.map((transport, index) => (
                <Card key={index} className="p-6 bg-white shadow-sm">
                  <div className="flex items-center gap-3 mb-4">
                    <Car className="w-6 h-6 text-green-700" />
                    <h3 className="text-xl font-serif font-bold text-green-800">{transport.type}</h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Routes</h4>
                      <ul className="text-gray-600 text-sm space-y-1">
                        {transport.routes.map((route, idx) => (
                          <li key={idx}>• {route}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Schedule</h4>
                      <p className="text-gray-600 text-sm">{transport.schedule}</p>
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-2">Cost</h4>
                      <p className="text-gray-600 text-sm">{transport.cost}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {/* Protocol and Guidelines */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          <Card className="p-8 bg-white shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <Shirt className="w-6 h-6 text-green-700" />
              <h2 className="text-2xl font-serif font-bold text-green-800">Dress Code & Protocol</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2 text-green-700">Recommended Attire</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Formal business attire (suits, formal dresses)</li>
                  <li>• Traditional Zambian dress welcomed</li>
                  <li>• Dark or muted colors preferred</li>
                  <li>• Comfortable shoes for walking</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-green-700">Protocol Notes</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• Arrive early for security screening</li>
                  <li>• Bring valid identification</li>
                  <li>• Mobile phones on silent mode</li>
                  <li>• Follow ushers' instructions</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-green-700">Security Guidelines</h3>
                <ul className="text-gray-600 text-sm space-y-1">
                  <li>• No large bags or backpacks</li>
                  <li>• Security screening at all entrances</li>
                  <li>• Prohibited items will be confiscated</li>
                  <li>• Cooperate with security personnel</li>
                </ul>
              </div>
            </div>
          </Card>

          <Card className="p-8 bg-white shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-green-800 mb-6">Contact Information</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-green-700" />
                <div>
                  <h3 className="font-bold">Information Hotline</h3>
                  <p className="text-gray-600">+260-211-123-456</p>
                  <p className="text-gray-500 text-sm">Available 24/7</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-700" />
                <div>
                  <h3 className="font-bold">Email Support</h3>
                  <p className="text-gray-600">info@remberingecl.org</p>
                  <p className="text-gray-500 text-sm">Response within 2 hours</p>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-blue-50 p-4 rounded-lg">
              <h4 className="font-bold text-blue-800 mb-2">Emergency Contacts</h4>
              <div className="text-sm text-blue-700 space-y-1">
                <p>Medical Emergency: +260-211-999-111</p>
                <p>Security: +260-211-999-222</p>
                <p>Lost & Found: +260-211-999-333</p>
                <p>Media Queries: +260-211-999-444</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <CondolencesTicker />
    </div>
  )
}
