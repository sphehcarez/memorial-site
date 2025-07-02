"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import {
  Play,
  ImageIcon,
  Calendar,
  Users,
  Award,
  Heart,
  ChevronLeft,
  ChevronRight,
  Search,
  Download,
  Share2,
  X,
  Grid3X3,
  List,
} from "lucide-react"
import Image from "next/image"
import CondolencesTicker from "@/components/condolences-ticker"
import Navigation from "@/components/navigation"

interface MediaItem {
  id: number
  title: string
  description: string
  category: string
  type: "image" | "video"
  url: string
  thumbnail?: string
  year: string
  tags: string[]
  photographer?: string
  location?: string
}

export default function MemoriesGalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState<"date" | "title" | "category">("date")
  const [isLoading, setIsLoading] = useState(false)

  const mediaItems: MediaItem[] = [
    // Removed placeholder images as requested
    {
      id: 3,
      title: "Campaign Rally 2016",
      description: "Dr. Lungu addressing supporters during the 2016 election campaign",
      category: "political",
      type: "video",
      url: "/memories-gallery/Campaign%20Rally%202016.mp4",
      year: "2016",
      tags: ["campaign", "rally", "supporters"],
      location: "Lusaka",
    },
    // Removed University of Zambia Graduation placeholder entry
    {
      id: 5,
      title: "Appointing First Female VP",
      description: "Historic moment appointing Inonge Wina as Zambia's first female Vice-President",
      category: "presidential",
      type: "image",
      url: "/memories-gallery/first%20lady.jpg",
      year: "2015",
      tags: ["historic", "women", "appointment"],
      photographer: "State House Photographer",
      location: "State House, Lusaka",
    },
    {
      id: 6,
      title: "National Day of Prayer",
      description: "Leading the first National Day of Prayer, Fasting, Repentance and Reconciliation",
      category: "presidential",
      type: "image",
      url: "/memories-gallery/Zambia%20_%20President_Praying.jpg",
      year: "2015",
      tags: ["prayer", "faith", "national"],
      location: "Cathedral of the Holy Cross",
    },
    {
      id: 7,
      title: "COVID-19 National Address",
      description: "In the midst of the global pandemic, President Edgar Chagwa Lungu stood as a symbol of calm and responsibility.",
      category: "presidential",
      type: "image",
      url: "/memories-gallery/National%20Address.jpeg",
      year: "2020",
      tags: ["covid19", "leadership", "health", "crisis-response"],
      location: "State House, Lusaka",
    },
  ];

  // Only include categories that have at least one item
  const availableCategories = [
    { id: "all", name: "All", icon: ImageIcon },
    { id: "political", name: "Political Career", icon: Users },
    { id: "presidential", name: "Presidential", icon: Award },
  ];
  const categories = availableCategories.map((cat) => ({
    ...cat,
    count: cat.id === "all" ? mediaItems.length : mediaItems.filter((item) => item.category === cat.id).length,
  })).filter((cat) => cat.count > 0 || cat.id === "all");

  const filteredItems = mediaItems
    .filter((item) => selectedCategory === "all" || item.category === selectedCategory)
    .filter(
      (item) =>
        searchQuery === "" ||
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
    )
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.title.localeCompare(b.title)
        case "category":
          return a.category.localeCompare(b.category)
        case "date":
        default:
          return Number.parseInt(b.year) - Number.parseInt(a.year)
      }
    })

  const openLightbox = (item: MediaItem) => {
    setSelectedItem(item)
  }

  const closeLightbox = () => {
    setSelectedItem(null)
  }

  const navigateLightbox = (direction: "prev" | "next") => {
    if (!selectedItem) return

    const currentIndex = filteredItems.findIndex((item) => item.id === selectedItem.id)
    let newIndex

    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredItems.length - 1
    } else {
      newIndex = currentIndex < filteredItems.length - 1 ? currentIndex + 1 : 0
    }

    setSelectedItem(filteredItems[newIndex])
  }

  const downloadPDF = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/gallery/download-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          category: selectedCategory,
          items: filteredItems.map((item) => ({
            id: item.id,
            title: item.title,
            description: item.description,
            year: item.year,
            url: item.url,
          })),
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate PDF")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `memories-gallery-${selectedCategory}-${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading PDF:", error)
      alert("Failed to download PDF. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-green-50">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-green-800 via-green-700 to-green-800 text-white">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="text-center">
            <h1 className="text-5xl font-serif font-bold mb-4">Memories Gallery</h1>
            <p className="text-xl text-green-100 mb-6">A Visual Journey Through a Life of Service and Leadership</p>
            <div className="flex justify-center gap-4">
              <Badge variant="secondary" className="px-4 py-2 text-lg">
                {filteredItems.length} {filteredItems.length === 1 ? "Memory" : "Memories"}
              </Badge>
              <Badge variant="secondary" className="px-4 py-2 text-lg">
                {categories.length - 1} Categories
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <Navigation />

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Enhanced Controls */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search memories, tags, or descriptions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12 border-2 border-gray-200 focus:border-green-500"
              />
            </div>

            {/* Controls */}
            <div className="flex items-center gap-3">
              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-500 outline-none"
                aria-label="Sort memories by"
              >
                <option value="date">Sort by Date</option>
                <option value="title">Sort by Title</option>
                <option value="category">Sort by Category</option>
              </select>

              {/* View Mode */}
              <div className="flex border-2 border-gray-200 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 ${viewMode === "grid" ? "bg-green-500 text-white" : "bg-white text-gray-600"}`}
                  title="Grid view"
                >
                  <Grid3X3 className="w-5 h-5" />
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 ${viewMode === "list" ? "bg-green-500 text-white" : "bg-white text-gray-600"}`}
                  title="List view"
                >
                  <List className="w-5 h-5" />
                </button>
                </button>
              </div>

            {/* Download PDF removed as requested */}
            </div>
          </div>
        </div>

        <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full">
          {/* Enhanced Category Tabs */}
          <TabsList className="grid w-full grid-cols-6 mb-8 h-auto bg-white shadow-lg rounded-xl p-2">
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <TabsTrigger
                  key={category.id}
                  value={category.id}
                  className="flex flex-col gap-2 py-4 px-3 data-[state=active]:bg-green-500 data-[state=active]:text-white rounded-lg transition-all duration-200"
                >
                  <IconComponent className="w-6 h-6" />
                  <span className="font-medium">{category.name}</span>
                  <Badge variant={selectedCategory === category.id ? "secondary" : "outline"} className="text-xs">
                    {category.count}
                  </Badge>
                </TabsTrigger>
              )
            })}
          </TabsList>

          {/* Gallery Content */}
          <TabsContent value={selectedCategory} className="mt-0">
            {viewMode === "grid" ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="group overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:-translate-y-2 bg-white"
                    onClick={() => openLightbox(item)}
                  >
                    <div className="aspect-[4/3] bg-gray-100 relative overflow-hidden">
                      {item.type === "video" ? (
                        <div className="relative w-full h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); openLightbox(item); }}>
                          <video
                            src={item.url}
                            poster={item.thumbnail}
                            className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-300"
                            controls
                            playsInline
                          />
                        </div>
                      ) : (
                        <Image
                          src={item.url}
                          alt={item.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-300"
                        />
                      )}
                      <div className="absolute top-3 right-3">
                        <Badge className="bg-black/70 text-white border-0">{item.year}</Badge>
                      </div>
                      <div className="absolute top-3 left-3">
                        <Badge variant="secondary" className="bg-white/90">
                          {item.type === "video" ? "Video" : "Photo"}
                        </Badge>
                      </div>
                    </div>
                    <div className="p-5">
                      <h3 className="font-serif font-bold text-lg mb-2 line-clamp-2 group-hover:text-green-700 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                      {item.location && (
                        <p className="text-gray-500 text-xs mb-3 flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {item.location}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-1">
                        {item.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {item.tags.length > 3 && (
                          <Badge variant="outline" className="text-xs">
                            +{item.tags.length - 3} more
                          </Badge>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredItems.map((item) => (
                  <Card
                    key={item.id}
                    className="group overflow-hidden hover:shadow-lg transition-all duration-200 cursor-pointer bg-white"
                    onClick={() => openLightbox(item)}
                  >
                    <div className="flex">
                      <div className="w-48 h-32 bg-gray-100 relative overflow-hidden flex-shrink-0">
                        {item.type === "video" ? (
                          <div className="relative w-full h-full cursor-pointer" onClick={(e) => { e.stopPropagation(); openLightbox(item); }}>
                            <video
                              src={item.url}
                              poster={item.thumbnail}
                              className="object-cover w-full h-full"
                              controls
                              playsInline
                            />
                          </div>
                        ) : (
                          <Image
                            src={item.url}
                            alt={item.title}
                            fill
                            className="object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 p-6">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="font-serif font-bold text-xl group-hover:text-green-700 transition-colors">
                            {item.title}
                          </h3>
                          <Badge className="ml-4">{item.year}</Badge>
                        </div>
                        <p className="text-gray-600 mb-3">{item.description}</p>
                        {item.location && (
                          <p className="text-gray-500 text-sm mb-3 flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {item.location}
                          </p>
                        )}
                        <div className="flex flex-wrap gap-2">
                          {item.tags.map((tag) => (
                            <Badge key={tag} variant="outline" className="text-sm">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}

            {filteredItems.length === 0 && (
              <div className="text-center py-16">
                <ImageIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-600 mb-2">No memories found</h3>
                <p className="text-gray-500">Try adjusting your search or category filter</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Enhanced Lightbox Modal */}
      {selectedItem && (
        <Dialog open={!!selectedItem} onOpenChange={closeLightbox}>
          <DialogContent className="relative max-w-2xl w-full p-0 overflow-visible">
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
              title="Close"
            >
              <X className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateLightbox("prev")}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
              title="Previous"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={() => navigateLightbox("next")}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-colors"
              title="Next"
            >
              <ChevronRight className="w-6 h-6" />
            </button>

            <div className="aspect-video relative bg-black">
              {selectedItem.type === "video" ? (
                <video
                  src={selectedItem.url}
                  poster={selectedItem.thumbnail}
                  controls
                  autoPlay
                  className="object-contain w-full h-full"
                />
              ) : (
                <Image
                  src={selectedItem.url || "/placeholder.svg"}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                />
              )}
            </div>

            <div className="p-6 bg-white">
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline">{selectedItem.year}</Badge>
                <Badge variant="outline">{selectedItem.type}</Badge>
                {selectedItem.photographer && <Badge variant="outline">📸 {selectedItem.photographer}</Badge>}
              </div>
              <h3 className="text-3xl font-serif font-bold mb-3">{selectedItem.title}</h3>
              <p className="text-gray-600 mb-4 text-lg">{selectedItem.description}</p>
              {selectedItem.location && (
                <p className="text-gray-500 mb-4 flex items-center">
                  <Calendar className="w-5 h-5 mr-2" />
                  {selectedItem.location}
                </p>
              )}
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedItem.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-sm">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div className="flex gap-3">
                <Button variant="outline" className="flex items-center gap-2">
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  Download
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
