"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

interface CondolenceMessage {
  id: number
  name: string
  message: string
  location?: string
  timestamp: string
}

export default function CondolencesTicker() {
  const [messages, setMessages] = useState<CondolenceMessage[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)

  // Sample messages - in real app, this would come from API
  const sampleMessages: CondolenceMessage[] = [
    {
      id: 1,
      name: "Mary Banda",
      message: "A true leader who served Zambia with dedication. Rest in peace, Your Excellency.",
      location: "Lusaka",
      timestamp: "2025-06-07T10:30:00Z",
    },
    {
      id: 2,
      name: "John Mwanza",
      message: "Dr. Lungu's legacy will forever inspire future generations of Zambians.",
      location: "Ndola",
      timestamp: "2025-06-07T11:15:00Z",
    },
    {
      id: 3,
      name: "Sarah Phiri",
      message: "Thank you for your service to our nation. Your memory lives on in our hearts.",
      location: "Kitwe",
      timestamp: "2025-06-07T12:00:00Z",
    },
    {
      id: 4,
      name: "David Tembo",
      message: "A statesman who believed in democracy and peaceful transitions. Forever remembered.",
      location: "Livingstone",
      timestamp: "2025-06-07T13:45:00Z",
    },
    {
      id: 5,
      name: "Grace Mulenga",
      message: "His Excellency's commitment to women's empowerment will never be forgotten.",
      location: "Kabwe",
      timestamp: "2025-06-07T14:20:00Z",
    },
  ]

  useEffect(() => {
    setMessages(sampleMessages)
  }, [])

  useEffect(() => {
    if (messages.length === 0) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % messages.length)
    }, 8000) // Change message every 8 seconds

    return () => clearInterval(interval)
  }, [messages.length])

  if (messages.length === 0) return null

  const currentMessage = messages[currentIndex]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white z-40">
      <div className="relative overflow-hidden h-12">
        <div className="absolute inset-0 bg-gradient-to-r from-green-800 via-red-600 to-orange-500 opacity-20" />
        <div className="relative flex items-center h-full px-4">
          <div className="flex items-center gap-2 mr-4">
            <Heart className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-sm font-bold text-green-400">CONDOLENCES</span>
          </div>
          <div className="flex-1 overflow-hidden">
            <div
              className="animate-scroll whitespace-nowrap text-sm"
              style={{
                animation: "scroll 30s linear infinite",
              }}
            >
              <span className="font-medium text-white">{currentMessage.name}</span>
              {currentMessage.location && <span className="text-gray-300 ml-2">({currentMessage.location})</span>}
              <span className="text-gray-100 ml-4">{currentMessage.message}</span>
              <span className="text-gray-400 ml-8">•</span>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </div>
  )
}
