import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import Link from "next/link"

export default function GalleryPage() {
  const galleryItems = [
    {
      id: 1,
      title: "Presidential Inauguration 2015",
      description: "Sworn in as sixth President of Zambia at National Heroes Stadium",
      category: "Presidential",
      year: "2015",
    },
    {
      id: 2,
      title: "Meeting with Pope Francis",
      description: "Historic audience with Pope Francis at the Vatican",
      category: "International",
      year: "2016",
    },
    {
      id: 3,
      title: "National Day of Prayer",
      description: "Leading the first National Day of Prayer, Fasting, Repentance and Reconciliation",
      category: "Spiritual",
      year: "2015",
    },
    {
      id: 4,
      title: "With French President Hollande",
      description: "Diplomatic meeting with French President François Hollande",
      category: "International",
      year: "2016",
    },
    {
      id: 5,
      title: "Appointing First Female VP",
      description: "Historic appointment of Inonge Wina as first female Vice-President",
      category: "Historic",
      year: "2015",
    },
    {
      id: 6,
      title: "Campaign Trail 2016",
      description: "Campaigning for re-election across Zambia",
      category: "Political",
      year: "2016",
    },
    {
      id: 7,
      title: "University of Zambia Graduation",
      description: "Young Edgar Lungu at his law degree graduation",
      category: "Personal",
      year: "1981",
    },
    {
      id: 8,
      title: "Patriotic Front Leadership",
      description: "As Secretary General of the Patriotic Front",
      category: "Political",
      year: "2014",
    },
    {
      id: 9,
      title: "Peaceful Transition 2021",
      description: "Conceding defeat and ensuring peaceful transfer of power",
      category: "Democratic",
      year: "2021",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold">Photo Gallery</h1>
          <p className="text-xl mt-2">Moments from a Life of Service</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 py-4 overflow-x-auto">
            <Link href="/" className="text-gray-600 hover:text-green-700 pb-2">
              Memorial
            </Link>
            <Link href="/biography" className="text-gray-600 hover:text-green-700 pb-2">
              Biography
            </Link>
            <Link href="/political-career" className="text-gray-600 hover:text-green-700 pb-2">
              Political Career
            </Link>
            <Link href="/achievements" className="text-gray-600 hover:text-green-700 pb-2">
              Achievements
            </Link>
            <Link href="/gallery" className="text-green-700 border-b-2 border-green-700 pb-2 font-medium">
              Gallery
            </Link>
            <Link href="/condolences" className="text-gray-600 hover:text-green-700 pb-2">
              Condolences
            </Link>
            <Link href="/service" className="text-gray-600 hover:text-green-700 pb-2">
              Memorial Service
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video bg-gray-200 relative">
                <Image src={`/placeholder.svg?height=300&width=400`} alt={item.title} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary">{item.year}</Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge
                    variant="outline"
                    className={
                      item.category === "Presidential"
                        ? "border-green-500 text-green-700"
                        : item.category === "International"
                          ? "border-blue-500 text-blue-700"
                          : item.category === "Spiritual"
                            ? "border-purple-500 text-purple-700"
                            : item.category === "Historic"
                              ? "border-orange-500 text-orange-700"
                              : item.category === "Political"
                                ? "border-red-500 text-red-700"
                                : item.category === "Personal"
                                  ? "border-gray-500 text-gray-700"
                                  : "border-indigo-500 text-indigo-700"
                    }
                  >
                    {item.category}
                  </Badge>
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Memorial Quote */}
        <Card className="p-8 bg-white shadow-sm mt-12">
          <div className="text-center">
            <div className="text-6xl text-green-300 mb-4 font-serif">"</div>
            <blockquote className="text-xl text-gray-700 font-serif leading-relaxed mb-4">
              A picture is worth a thousand words, but the memories captured here tell the story of a life dedicated to
              serving Zambia and its people.
            </blockquote>
            <p className="text-gray-500 italic">In loving memory of Dr. Edgar Chagwa Lungu</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
