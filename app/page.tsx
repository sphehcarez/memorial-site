import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Share, Calendar, Flag, Heart, Users } from "lucide-react"
import Image from "next/image"
import Navigation from "@/components/navigation"
import CondolencesTicker from "@/components/condolences-ticker"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-orange-50">
      {/* Compact Hero Section */}
      <div className="relative overflow-hidden h-[70vh]">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-green-800">
          <div className="absolute inset-0 bg-black/5"></div>
          <div className="absolute inset-0 bg-[url('/zambia-eagle-bg.png')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-4 py-12 h-full flex items-center">
          <div className="text-center text-white w-full">
            {/* Welcome Badge */}
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium backdrop-blur-sm mb-6">
              🕊️ Welcome to Our Memorial
            </Badge>

            <div className="grid md:grid-cols-2 gap-8 items-center">
              {/* Portrait */}
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-40 h-48 bg-white p-2 rounded-2xl shadow-2xl transform hover:scale-105 transition-transform duration-300">
                    <Image
                      src="/memories-gallery/profile%20picture.jpeg"
                      alt="His Excellency Dr. Edgar Chagwa Lungu"
                      width={150}
                      height={180}
                      className="rounded-xl object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-orange-400 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white text-xs">🇿🇲</span>
                  </div>
                </div>
              </div>

              {/* Title and Info */}
              <div className="text-left md:text-left">
                <h1 className="text-3xl md:text-4xl font-serif font-bold leading-tight mb-2">
                  Celebrating the Life of
                </h1>
                <h2 className="text-2xl md:text-3xl font-serif font-bold text-orange-200 mb-3">
                  DR. EDGAR CHAGWA LUNGU
                </h2>
                <p className="text-lg text-green-100 font-medium mb-4">Sixth President of Zambia</p>

                {/* Dates */}
                <div className="flex flex-col gap-2 mb-6 text-sm">
                  <div className="flex items-center gap-2 bg-white/15 px-3 py-2 rounded-full backdrop-blur-sm w-fit">
                    <Calendar className="w-4 h-4 text-orange-300" />
                    <span>11 November 1956 - 5 June 2025</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/15 px-3 py-2 rounded-full backdrop-blur-sm w-fit">
                    <Flag className="w-4 h-4 text-orange-300" />
                    <span>President: 2015 - 2021</span>
                  </div>
                </div>

                {/* Call to Action */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <Link href="/condolences">
                    <Button
                      size="default"
                      className="bg-white text-green-800 hover:bg-green-50 px-6 py-2 font-semibold rounded-full shadow-lg"
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Share Memories
                    </Button>
                  </Link>
                  <Link href="/tribute-wall">
                    <Button
                      size="default"
                      className="bg-orange-500 text-white hover:bg-orange-600 px-6 py-2 font-semibold rounded-full shadow-lg border-2 border-orange-400"
                    >
                      <Users className="w-4 h-4 mr-2" />
                      View Tributes
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation - Now immediately visible */}
      <Navigation />

      {/* Simplified Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Memorial Quote */}
        <Card className="p-8 bg-gradient-to-br from-white to-green-50 border-0 shadow-xl mb-12">
          <div className="text-center">
            <div className="text-6xl text-green-200 mb-4 font-serif leading-none">"</div>
            <blockquote className="text-xl text-gray-700 font-serif leading-relaxed mb-4 -mt-6">
              A leader's legacy is not measured by the years in office, but by the lives touched and the nation
              transformed.
            </blockquote>
            <p className="text-gray-500 italic">In memory of a dedicated servant of Zambia</p>
          </div>
        </Card>

        {/* Quick Summary */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="p-8 bg-white border-0 shadow-lg">
            <h3 className="text-2xl font-serif font-bold mb-4 text-green-800">About Dr. Lungu</h3>
            <p className="text-gray-700 leading-relaxed mb-4">
              His Excellency Dr. Edgar Chagwa Lungu served as the sixth President of the Republic of Zambia from 2015 to
              2021. Born in Ndola in 1956, he dedicated his life to public service and the advancement of the Zambian
              people.
            </p>
            <p className="text-gray-700 leading-relaxed">
              A lawyer by training, he transitioned into politics and served in various ministerial positions before
              becoming President. His legacy continues to inspire the people of Zambia.
            </p>
          </Card>

          <Card className="p-8 bg-white border-0 shadow-lg">
            <h3 className="text-2xl font-serif font-bold mb-4 text-green-800">Key Facts</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Born:</span>
                <span className="text-gray-900">11 November 1956, Ndola</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Education:</span>
                <span className="text-gray-900">LL.B., University of Zambia</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Political Party:</span>
                <span className="text-gray-900">Patriotic Front (PF)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium text-gray-700">Presidential Term:</span>
                <span className="text-gray-900">2015 - 2021</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Call to Action Section */}
        <Card className="p-8 bg-gradient-to-r from-green-600 to-green-700 text-white text-center border-0 shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Join Us in Celebrating His Life</h3>
          <p className="text-green-100 mb-6 max-w-2xl mx-auto">
            Your stories, photos, and memories help keep his spirit alive. Explore his life, share your tributes, and
            connect with others who were touched by his leadership.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/biography">
              <Button variant="secondary" className="bg-white text-green-700 hover:bg-green-50">
                Read Biography
              </Button>
            </Link>
            <Link href="/gallery">
              <Button className="bg-blue-500 text-white hover:bg-blue-600 shadow-lg border-2 border-blue-400">
                View Gallery
              </Button>
            </Link>
            <Link href="/memories-gallery">
              <Button className="bg-purple-500 text-white hover:bg-purple-600 shadow-lg border-2 border-purple-400">
                Memory Gallery
              </Button>
            </Link>
          </div>
        </Card>
      </div>

      {/* Share Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <Button className="bg-green-700 hover:bg-green-800 text-white shadow-2xl rounded-full w-12 h-12 p-0">
          <Share className="w-5 h-5" />
        </Button>
      </div>

      {/* Condolences Ticker */}
      <CondolencesTicker />
    </div>
  )
}
