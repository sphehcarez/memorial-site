import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, MapPin, Users, Phone, Mail } from "lucide-react"
import Link from "next/link"

export default function ServicePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold">Memorial Service</h1>
          <p className="text-xl mt-2">Celebrating a Life of Service</p>
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
            <Link href="/gallery" className="text-gray-600 hover:text-green-700 pb-2">
              Gallery
            </Link>
            <Link href="/condolences" className="text-gray-600 hover:text-green-700 pb-2">
              Condolences
            </Link>
            <Link href="/service" className="text-green-700 border-b-2 border-green-700 pb-2 font-medium">
              Memorial Service
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Main Service Information */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-serif font-bold text-green-800 mb-4">State Memorial Service</h2>
            <p className="text-xl text-gray-600">In Honor of His Excellency Dr. Edgar Chagwa Lungu</p>
            <p className="text-lg text-gray-500 mt-2">Sixth President of the Republic of Zambia</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
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
                  <p className="text-gray-600">10:00 AM - 1:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-6 h-6 text-green-700" />
                <div>
                  <h3 className="font-bold text-gray-900">Venue</h3>
                  <p className="text-gray-600">National Heroes Stadium</p>
                  <p className="text-gray-500 text-sm">Lusaka, Zambia</p>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Users className="w-6 h-6 text-green-700" />
                <div>
                  <h3 className="font-bold text-gray-900">Attendance</h3>
                  <p className="text-gray-600">Open to the Public</p>
                  <p className="text-gray-500 text-sm">Free admission</p>
                </div>
              </div>
              <div className="bg-green-50 p-4 rounded-lg">
                <h4 className="font-bold text-green-800 mb-2">Dress Code</h4>
                <p className="text-sm text-gray-700">Formal attire recommended. Traditional Zambian dress welcomed.</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Program Schedule */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <h2 className="text-3xl font-serif font-bold text-green-800 mb-6">Service Program</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <Badge className="bg-green-700">9:30 AM</Badge>
              <div>
                <h3 className="font-bold">Arrival and Seating</h3>
                <p className="text-gray-600 text-sm">Guests arrival and seating arrangements</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <Badge className="bg-green-700">10:00 AM</Badge>
              <div>
                <h3 className="font-bold">Opening Ceremony</h3>
                <p className="text-gray-600 text-sm">National Anthem and moment of silence</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <Badge className="bg-green-700">10:15 AM</Badge>
              <div>
                <h3 className="font-bold">Religious Service</h3>
                <p className="text-gray-600 text-sm">Interfaith prayers and hymns</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <Badge className="bg-green-700">10:45 AM</Badge>
              <div>
                <h3 className="font-bold">Tributes</h3>
                <p className="text-gray-600 text-sm">Speeches from family, friends, and colleagues</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <Badge className="bg-green-700">11:30 AM</Badge>
              <div>
                <h3 className="font-bold">Presidential Address</h3>
                <p className="text-gray-600 text-sm">Address by His Excellency President Hakainde Hichilema</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <Badge className="bg-green-700">12:00 PM</Badge>
              <div>
                <h3 className="font-bold">Cultural Performances</h3>
                <p className="text-gray-600 text-sm">Traditional Zambian music and dance</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <Badge className="bg-green-700">12:30 PM</Badge>
              <div>
                <h3 className="font-bold">Final Tributes</h3>
                <p className="text-gray-600 text-sm">Closing remarks and benediction</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-gray-50 rounded-lg">
              <Badge className="bg-green-700">1:00 PM</Badge>
              <div>
                <h3 className="font-bold">Conclusion</h3>
                <p className="text-gray-600 text-sm">Service conclusion and departure</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Expected Attendees */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <h2 className="text-3xl font-serif font-bold text-green-800 mb-6">Expected Attendees</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-bold text-lg mb-4 text-green-700">Government Officials</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• President Hakainde Hichilema</li>
                <li>• Vice President Mutale Nalumango</li>
                <li>• Cabinet Ministers</li>
                <li>• Members of Parliament</li>
                <li>• Provincial Ministers</li>
                <li>• Traditional Leaders</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-4 text-green-700">International Dignitaries</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• SADC Heads of State</li>
                <li>• African Union Representatives</li>
                <li>• Commonwealth Officials</li>
                <li>• Diplomatic Corps</li>
                <li>• International Partners</li>
                <li>• Former Presidents</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Practical Information */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="p-8 bg-white shadow-sm">
            <h2 className="text-2xl font-serif font-bold text-green-800 mb-6">Practical Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2">Transportation</h3>
                <p className="text-gray-600 text-sm">
                  Free shuttle buses will operate from major points in Lusaka to the stadium. Parking will be limited at
                  the venue.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Security</h3>
                <p className="text-gray-600 text-sm">
                  Enhanced security measures will be in place. Please arrive early and bring valid identification.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Accessibility</h3>
                <p className="text-gray-600 text-sm">
                  Special arrangements have been made for elderly and disabled attendees. Contact organizers for
                  assistance.
                </p>
              </div>
              <div>
                <h3 className="font-bold mb-2">Media Coverage</h3>
                <p className="text-gray-600 text-sm">
                  The service will be broadcast live on ZNBC and other national media outlets.
                </p>
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
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-green-700" />
                <div>
                  <h3 className="font-bold">Email</h3>
                  <p className="text-gray-600">memorial@gov.zm</p>
                </div>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg mt-6">
                <h4 className="font-bold text-blue-800 mb-2">Special Requests</h4>
                <p className="text-sm text-gray-700">
                  For special accommodation requests or media accreditation, please contact the organizing committee at
                  least 48 hours in advance.
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Memorial Message */}
        <Card className="p-8 bg-white shadow-sm mt-8">
          <div className="text-center">
            <div className="text-6xl text-green-300 mb-4 font-serif">"</div>
            <blockquote className="text-xl text-gray-700 font-serif leading-relaxed mb-4">
              We gather not to mourn what we have lost, but to celebrate what we have been given - a leader who served
              with dedication, a man who loved his country, and a legacy that will inspire generations to come.
            </blockquote>
            <p className="text-gray-500 italic">Join us in honoring Dr. Edgar Chagwa Lungu</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
