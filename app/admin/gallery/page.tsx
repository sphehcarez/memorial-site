"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, ArrowLeft, Plus, Edit, Trash2, ImageIcon, Video } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

interface GalleryItem {
  id: number
  title: string
  description: string
  category: string
  type: "image" | "video"
  url: string
  thumbnail?: string
  year: string
  tags: string[]
  uploadDate: string
}

export default function AdminGalleryPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([])
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [newItem, setNewItem] = useState({
    title: "",
    description: "",
    category: "",
    type: "image" as "image" | "video",
    year: "",
    tags: "",
  })
  const router = useRouter()

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    if (auth === "true") {
      setIsAuthenticated(true)
      // Load sample data with real images
      setGalleryItems([
        {
          id: 1,
          title: "Presidential Victory Rally",
          description: "Dr. Lungu celebrating electoral victory with supporters",
          category: "political",
          type: "image",
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-21%20at%2011.28.25-a8NzzJ2M7l6QILLFiMADFU13COfrkw.jpeg",
          year: "2016",
          tags: ["victory", "rally", "celebration"],
          uploadDate: "2025-06-07T10:00:00Z",
        },
        {
          id: 2,
          title: "Presidential Portrait",
          description: "Official presidential portrait in contemplative pose",
          category: "presidential",
          type: "image",
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-21%20at%2011.28.27-Uer1JOyVewx4NiXrjXmYyIVsTUymx6.jpeg",
          year: "2017",
          tags: ["portrait", "official", "presidential"],
          uploadDate: "2025-06-07T11:00:00Z",
        },
        {
          id: 3,
          title: "Casual Public Appearance",
          description: "Dr. Lungu in casual attire during public engagement",
          category: "public",
          type: "image",
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-21%20at%2011.28.39-b5ZjhnmuhoCd4hs5fuDJ9uO1JLM2A2.jpeg",
          year: "2019",
          tags: ["casual", "public", "engagement"],
          uploadDate: "2025-06-07T12:00:00Z",
        },
        {
          id: 4,
          title: "Formal State Function",
          description: "Dr. Lungu at formal state function in gray suit",
          category: "presidential",
          type: "image",
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-21%20at%2011.28.35-oKcfgF6nFi9bxOsdI6eCbhAj5gmbvF.jpeg",
          year: "2018",
          tags: ["formal", "state", "function"],
          uploadDate: "2025-06-07T13:00:00Z",
        },
        {
          id: 5,
          title: "Presidential Address",
          description: "Dr. Lungu delivering presidential address",
          category: "presidential",
          type: "image",
          url: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/WhatsApp%20Image%202025-06-21%20at%2011.28.28-JxObVIc6J6WuarRiJ4r3CkYmqWc77Q.jpeg",
          year: "2020",
          tags: ["address", "speech", "presidential"],
          uploadDate: "2025-06-07T14:00:00Z",
        },
      ])
    } else {
      router.push("/admin/login")
    }
  }, [router])

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, this would upload the file and save to database
    const newGalleryItem: GalleryItem = {
      id: Date.now(),
      ...newItem,
      url: "/placeholder.svg?height=400&width=600",
      tags: newItem.tags.split(",").map((tag) => tag.trim()),
      uploadDate: new Date().toISOString(),
    }
    setGalleryItems((prev) => [newGalleryItem, ...prev])
    setNewItem({
      title: "",
      description: "",
      category: "",
      type: "image",
      year: "",
      tags: "",
    })
    setShowUploadForm(false)
    alert("Gallery item uploaded successfully!")
  }

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this item?")) {
      setGalleryItems((prev) => prev.filter((item) => item.id !== id))
    }
  }

  if (!isAuthenticated) {
    return <div>Loading...</div>
  }

  const categories = [
    { value: "early-life", label: "Early Life" },
    { value: "political", label: "Political Career" },
    { value: "presidential", label: "Presidential" },
    { value: "international", label: "International" },
    { value: "family", label: "Family" },
    { value: "public", label: "Public Appearances" },
    { value: "legacy", label: "Legacy" },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-800 text-white py-6">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/admin/dashboard">
                <Button variant="outline" size="sm" className="text-green-800 border-white">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              </Link>
              <div>
                <h1 className="text-3xl font-serif font-bold">Gallery Management</h1>
                <p className="text-green-200 mt-1">Upload and manage photos and videos</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => setShowUploadForm(!showUploadForm)}
              className="text-green-800 border-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add New Item
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Upload Form */}
        {showUploadForm && (
          <Card className="p-6 mb-8">
            <h2 className="text-xl font-serif font-bold text-green-800 mb-6">Upload New Gallery Item</h2>
            <form onSubmit={handleUpload} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Title *</label>
                  <Input
                    value={newItem.title}
                    onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                    required
                    placeholder="Enter title"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Year *</label>
                  <Input
                    value={newItem.year}
                    onChange={(e) => setNewItem({ ...newItem, year: e.target.value })}
                    required
                    placeholder="e.g., 2015"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description *</label>
                <Textarea
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  required
                  placeholder="Enter description"
                  rows={3}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category *</label>
                  <Select
                    value={newItem.category}
                    onValueChange={(value) => setNewItem({ ...newItem, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.value} value={cat.value}>
                          {cat.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Type *</label>
                  <Select
                    value={newItem.type}
                    onValueChange={(value: "image" | "video") => setNewItem({ ...newItem, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="image">Image</SelectItem>
                      <SelectItem value="video">Video</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                <Input
                  value={newItem.tags}
                  onChange={(e) => setNewItem({ ...newItem, tags: e.target.value })}
                  placeholder="Enter tags separated by commas"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload File *</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-sm text-gray-500">
                    {newItem.type === "image" ? "PNG, JPG, GIF up to 10MB" : "MP4, MOV up to 100MB"}
                  </p>
                  <input type="file" className="hidden" accept={newItem.type === "image" ? "image/*" : "video/*"} />
                </div>
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="bg-green-700 hover:bg-green-800">
                  Upload Item
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowUploadForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </Card>
        )}

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="aspect-video bg-gray-200 relative">
                <Image src={item.url || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
                {item.type === "video" && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-red-600">
                      <Video className="w-3 h-3 mr-1" />
                      Video
                    </Badge>
                  </div>
                )}
                <div className="absolute top-2 right-2">
                  <Badge variant="secondary">{item.year}</Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="outline" className="text-xs">
                    {categories.find((cat) => cat.value === item.category)?.label || item.category}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    {item.type === "image" ? <ImageIcon className="w-3 h-3" /> : <Video className="w-3 h-3" />}
                  </Badge>
                </div>
                <h3 className="font-serif font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-1 mb-4">
                  {item.tags.slice(0, 3).map((tag) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="w-3 h-3 mr-1" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDelete(item.id)}>
                    <Trash2 className="w-3 h-3 mr-1" />
                    Delete
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
