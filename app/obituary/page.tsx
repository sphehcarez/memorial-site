"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Download, Calendar, GraduationCap, Briefcase, Award, Heart, FileText, Share2 } from "lucide-react"
import CondolencesTicker from "@/components/condolences-ticker"
import Navigation from "@/components/navigation"

export default function ObituaryPage() {
  const milestones = [
    {
      year: "1956",
      title: "Birth",
      description: "Born on 11 November at Ndola Central Hospital",
      icon: Calendar,
      color: "bg-blue-500",
    },
    {
      year: "1981",
      title: "Education",
      description: "Graduated with LL.B. from University of Zambia",
      icon: GraduationCap,
      color: "bg-green-500",
    },
    {
      year: "1981-2010",
      title: "Legal Career",
      description: "Practiced law at Andrea Masiye and Company",
      icon: Briefcase,
      color: "bg-purple-500",
    },
    {
      year: "1996",
      title: "Political Entry",
      description: "First contested as independent candidate in Chawama",
      icon: Award,
      color: "bg-orange-500",
    },
    {
      year: "2011",
      title: "Parliamentary Victory",
      description: "Won Chawama constituency for Patriotic Front",
      icon: Award,
      color: "bg-red-500",
    },
    {
      year: "2011-2014",
      title: "Ministerial Roles",
      description: "Served as Minister of Home Affairs, Defence, and Justice",
      icon: Briefcase,
      color: "bg-indigo-500",
    },
    {
      year: "2015",
      title: "Presidential Victory",
      description: "Won presidential by-election, became 6th President",
      icon: Award,
      color: "bg-yellow-500",
    },
    {
      year: "2016",
      title: "Re-election",
      description: "Re-elected for full presidential term",
      icon: Award,
      color: "bg-green-600",
    },
    {
      year: "2015-2021",
      title: "Presidential Legacy",
      description: "Served as President, promoted democracy and development",
      icon: Heart,
      color: "bg-red-600",
    },
    {
      year: "2021-2025",
      title: "Elder Statesman",
      description: "Continued political involvement and party leadership",
      icon: Briefcase,
      color: "bg-gray-500",
    },
    {
      year: "2025",
      title: "Eternal Rest",
      description: "Passed away on 5 June in Pretoria, South Africa",
      icon: Heart,
      color: "bg-black",
    },
  ]

  const downloadObituaryPDF = async () => {
    try {
      const response = await fetch("/api/obituary/download-pdf", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })

      if (!response.ok) {
        throw new Error("Failed to generate obituary PDF")
      }

      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `dr-edgar-lungu-obituary-${new Date().toISOString().split("T")[0]}.pdf`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    } catch (error) {
      console.error("Error downloading obituary PDF:", error)
      alert("Failed to download obituary PDF. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-green-50 to-blue-50 pb-16">
      {/* Modern Header */}
      <div className="bg-gradient-to-r from-green-900 via-green-800 to-green-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('/zambia-eagle-bg.png')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 py-16">
          <div className="text-center">
            <Badge className="bg-white/20 text-white border-white/30 px-4 py-2 text-sm font-medium mb-6">
              Official Document
            </Badge>
            <h1 className="text-5xl md:text-6xl font-serif font-bold mb-4">Official Obituary</h1>
            <p className="text-xl md:text-2xl text-green-100 mb-8">The Life and Legacy of Dr. Edgar Chagwa Lungu</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={downloadObituaryPDF}
                size="lg"
                className="bg-white text-green-800 hover:bg-green-50 px-8 py-3 text-lg font-semibold"
              >
                <Download className="w-5 h-5 mr-2" />
                Download Official PDF
              </Button>
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 text-lg font-semibold shadow-lg"
              >
                <Share2 className="w-5 h-5 mr-2" />
                Share Obituary
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Navigation />

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Download Section */}
        <Card className="p-8 bg-gradient-to-r from-green-50 via-blue-50 to-green-50 border-green-200 mb-12 shadow-xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="text-center lg:text-left">
              <div className="flex items-center justify-center lg:justify-start gap-3 mb-4">
                <FileText className="w-8 h-8 text-green-700" />
                <h3 className="text-2xl font-bold text-green-800">Official Obituary Programme</h3>
              </div>
              <p className="text-gray-600 text-lg mb-4">
                Download the complete memorial service programme and official obituary document
              </p>
              <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                <Badge variant="outline" className="border-green-500 text-green-700">
                  Professional Biography
                </Badge>
                <Badge variant="outline" className="border-blue-500 text-blue-700">
                  Life Timeline
                </Badge>
                <Badge variant="outline" className="border-purple-500 text-purple-700">
                  Service Information
                </Badge>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              <Button onClick={downloadObituaryPDF} size="lg" className="bg-green-700 hover:bg-green-800 px-8 py-3">
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </Button>
              <p className="text-sm text-gray-500 text-center">High-quality PDF • 12 pages • 2.3 MB</p>
            </div>
          </div>
        </Card>

        {/* Professional Biography */}
        <Card className="p-10 bg-white shadow-xl mb-12 border-0">
          <h2 className="text-4xl font-serif font-bold text-green-800 mb-8 text-center">Professional Biography</h2>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <div className="text-center mb-8">
              <p className="text-xl text-gray-600 italic">
                His Excellency Dr. Edgar Chagwa Lungu, the sixth President of the Republic of Zambia, passed away
                peacefully on 5 June 2025 in Pretoria, South Africa, following complications from surgery. He was 68
                years old.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6" />
                  Early Life and Education
                </h3>
                <p className="mb-4 text-lg">
                  Born on 11 November 1956 at Ndola Central Hospital in the Copperbelt Province, Edgar Chagwa Lungu grew
                  up during Zambia's formative years as an independent nation. His early life was shaped by the
                  aspirations and challenges of a young African democracy finding its place in the world.
                </p>
                <p className="mb-6 text-lg">
                  Dr. Lungu pursued his higher education at the University of Zambia, where he distinguished himself as
                  a dedicated student of law. In 1981, he graduated with a Bachelor of Laws (LL.B.) degree, laying the
                  foundation for what would become a distinguished career in both law and public service.
                </p>

                <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                  <Briefcase className="w-6 h-6" />
                  Legal Career
                </h3>
                <p className="mb-4 text-lg">
                  Following his graduation, Dr. Lungu joined the esteemed law firm Andrea Masiye and Company in Lusaka,
                  where he honed his legal skills and developed a deep understanding of Zambian jurisprudence. His legal
                  practice exposed him to the challenges facing ordinary Zambians and instilled in him a commitment to
                  justice and the rule of law.
                </p>
                <p className="mb-6 text-lg">
                  In addition to his legal training, Dr. Lungu underwent military officer training at Miltez in Kabwe
                  under the Zambia National Service (ZNS), an experience that instilled in him discipline and a profound
                  understanding of national security matters.
                </p>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                  <Award className="w-6 h-6" />
                  Political Journey
                </h3>
                <p className="mb-4 text-lg">
                  Dr. Lungu's entry into politics began in 1996 when he contested the Chawama constituency as an
                  independent candidate. Though unsuccessful in this first attempt, his political journey had begun. He
                  subsequently joined the United Party for National Development (UPND) in 1998, before eventually
                  finding his political home with the Patriotic Front (PF) in 2001.
                </p>
                <p className="mb-6 text-lg">
                  His persistence and dedication to public service were rewarded in 2011 when he successfully won the
                  Chawama constituency seat for the Patriotic Front, marking the beginning of his rapid rise through the
                  ranks of government.
                </p>

                <h3 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                  <Heart className="w-6 h-6" />
                  Presidential Leadership
                </h3>
                <p className="mb-4 text-lg">
                  Following the untimely death of President Michael Sata in October 2014, Dr. Lungu emerged as the
                  Patriotic Front's candidate for the presidential by-election. On 20 January 2015, he was elected as
                  Zambia's sixth President, defeating his closest rival by a narrow margin and demonstrating the
                  competitive nature of Zambian democracy.
                </p>
                <p className="mb-4 text-lg">
                  Dr. Lungu was subsequently re-elected for a full term in August 2016, again in a closely contested
                  election that underscored the vibrancy of Zambia's democratic institutions. His presidency was marked
                  by significant achievements in various sectors of national development.
                </p>
                <p className="mb-6 text-lg">
                  Among his notable accomplishments was the historic appointment of Inonge Wina as Zambia's first female
                  Vice-President, breaking significant barriers and advancing gender equality in leadership. He also
                  commuted the death sentences of 332 prisoners to life imprisonment, demonstrating his commitment to
                  human rights and criminal justice reform.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-green-50 rounded-xl">
              <h3 className="text-2xl font-bold text-green-700 mb-4">Legacy and Final Years</h3>
              <p className="mb-4 text-lg">
                Dr. Lungu's presidency concluded in August 2021 following his defeat in the general election. In a
                testament to his commitment to democratic principles, he gracefully conceded defeat and facilitated a
                peaceful transition of power, strengthening Zambia's democratic institutions.
              </p>
              <p className="mb-4 text-lg">
                Even after leaving office, Dr. Lungu remained active in Zambian politics, returning to lead the
                Patriotic Front and continuing to contribute to national discourse until his passing.
              </p>
              <p className="text-lg font-medium text-green-800">
                Dr. Edgar Chagwa Lungu's life was one of service, dedication, and unwavering commitment to the people of
                Zambia. His legacy as a lawyer, politician, and statesman will continue to inspire future generations of
                Zambians to serve their nation with honor and integrity.
              </p>
            </div>
          </div>
        </Card>

        {/* Enhanced Timeline/Milestones */}
        <Card className="p-10 bg-white shadow-xl border-0">
          <h2 className="text-4xl font-serif font-bold text-green-800 mb-12 text-center">Life Milestones</h2>
          <div className="space-y-8">
            {milestones.map((milestone, index) => {
              const IconComponent = milestone.icon
              return (
                <div
                  key={index}
                  className="flex gap-8 items-start group hover:bg-gray-50 p-4 rounded-xl transition-colors"
                >
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-16 h-16 ${milestone.color} rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    {index < milestones.length - 1 && <div className="w-0.5 h-16 bg-gray-300 mt-4" />}
                  </div>
                  <div className="flex-1 pb-8">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-3">
                      <Badge variant="outline" className="font-bold text-lg px-4 py-2 w-fit">
                        {milestone.year}
                      </Badge>
                      <h3 className="text-2xl font-bold text-gray-900">{milestone.title}</h3>
                    </div>
                    <p className="text-gray-600 text-lg leading-relaxed">{milestone.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      <CondolencesTicker />
    </div>
  )
}
