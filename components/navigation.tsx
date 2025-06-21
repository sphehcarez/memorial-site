"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Shield } from "lucide-react"

export default function Navigation() {
  const pathname = usePathname()
  const [isAdminMenuOpen, setIsAdminMenuOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Memorial" },
    { href: "/obituary", label: "Obituary" },
    { href: "/burial-details", label: "Burial Details" },
    { href: "/tribute-wall", label: "Tribute Wall" },
    { href: "/memories-gallery", label: "Memories Gallery" },
    { href: "/livestream", label: "Livestream" },
    { href: "/accreditation", label: "Accreditation" },
    { href: "/condolences", label: "Condolences" },
  ]

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  const isAdminPath = pathname.startsWith("/admin")

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Main Navigation */}
          <div className="flex items-center gap-6 overflow-x-auto text-sm">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap pb-2 transition-colors ${
                  isActive(item.href)
                    ? "text-green-700 border-b-2 border-green-700 font-medium"
                    : "text-gray-600 hover:text-green-700"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Admin Access */}
          <div className="relative">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAdminMenuOpen(!isAdminMenuOpen)}
              className={`${isAdminPath ? "bg-green-100 border-green-300" : ""}`}
            >
              <Shield className="w-4 h-4 mr-2" />
              Admin
            </Button>

            {isAdminMenuOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div className="py-2">
                  <Link
                    href="/admin/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsAdminMenuOpen(false)}
                  >
                    Admin Login
                  </Link>
                  <Link
                    href="/admin/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setIsAdminMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
}
