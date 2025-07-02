"use client"
import { useEffect, useState } from "react"
import { Share } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ScrollToTopOnBottom() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.innerHeight + window.scrollY
      const threshold = document.body.offsetHeight - 10
      setShow(scrollPosition >= threshold)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  if (!show) return null
  return (
    <div className="fixed bottom-24 right-6 z-40">
      <Button
        className="bg-green-700 hover:bg-green-800 text-white shadow-2xl rounded-full w-12 h-12 p-0"
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <Share className="w-5 h-5" />
      </Button>
    </div>
  )
}
