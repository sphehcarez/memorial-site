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
  // Sample messages - in real app, this would come from API
  const sampleMessages: CondolenceMessage[] = [
    {
      id: 1,
      name: "Esther Lungu",
      message: "You were a loving husband and a pillar of strength for our family and nation. Rest in peace, my love.",
      location: "Lusaka",
      timestamp: "2025-06-07T10:30:00Z",
    },
    {
      id: 2,
      name: "Inonge Wina",
      message: "Your leadership and support for women in Zambia will always be remembered. Farewell, my friend.",
      location: "Lusaka",
      timestamp: "2025-06-07T11:15:00Z",
    },
    {
      id: 3,
      name: "Ngosa Simbyakula",
      message: "Thank you for your guidance and wisdom throughout our years of service together.",
      location: "Lusaka",
      timestamp: "2025-06-07T12:00:00Z",
    },
    {
      id: 4,
      name: "Kampamba Mulenga",
      message: "Your encouragement and mentorship shaped my career. You will be missed, Sir.",
      location: "Kitwe",
      timestamp: "2025-06-07T13:45:00Z",
    },
    {
      id: 5,
      name: "Chitalu Chilufya",
      message: "Your vision for a healthy Zambia inspired us all. Rest well, President.",
      location: "Mansa",
      timestamp: "2025-06-07T14:20:00Z",
    },
    {
      id: 6,
      name: "Amos Chanda",
      message: "Your trust and confidence in me was an honor. Thank you for your service.",
      location: "Lusaka",
      timestamp: "2025-06-07T15:00:00Z",
    },
    {
      id: 7,
      name: "Kaizer Zulu",
      message: "You were a true friend and leader. Your legacy will live on.",
      location: "Lusaka",
      timestamp: "2025-06-07T15:30:00Z",
    },
    {
      id: 8,
      name: "Margaret Mwanakatwe",
      message: "Your economic vision and support for businesswomen changed many lives. Rest in peace.",
      location: "Lusaka",
      timestamp: "2025-06-07T16:00:00Z",
    },
    {
      id: 9,
      name: "Freedom Sikazwe",
      message: "Your humility and humor brightened every room. Thank you for your friendship.",
      location: "Mpulungu",
      timestamp: "2025-06-07T16:30:00Z",
    },
    {
      id: 10,
      name: "Stella Libongani",
      message: "Your dedication to peace and security inspired us all. Rest well, Sir.",
      location: "Lusaka",
      timestamp: "2025-06-07T17:00:00Z",
    },
    {
      id: 11,
      name: "Kennedy Kamba",
      message: "Your leadership and vision for the party will never be forgotten.",
      location: "Lusaka",
      timestamp: "2025-06-07T17:30:00Z",
    },
    {
      id: 12,
      name: "Mumbi Phiri",
      message: "Thank you for your unwavering support and guidance. Rest in peace, President.",
      location: "Lusaka",
      timestamp: "2025-06-07T18:00:00Z",
    },
  ]

  useEffect(() => {
    setMessages(sampleMessages)
  }, [])

  if (messages.length === 0) return null

  // Concatenate all messages into a single scrolling line
  const scrollingContent = messages.map((msg, idx) => (
    <span key={msg.id} className="inline-block mr-12">
      <span className="font-medium text-white">{msg.name}</span>
      {msg.location && <span className="text-gray-300 ml-2">({msg.location})</span>}
      <span className="text-gray-100 ml-4">{msg.message}</span>
      <span className="text-gray-400 ml-8">•</span>
    </span>
  ))

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
                animation: "scroll 60s linear infinite",
              }}
            >
              {scrollingContent}
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
          animation: scroll 60s linear infinite;
        }
      `}</style>
    </div>
  )
}
