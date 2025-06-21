import { Card } from "@/components/ui/card"
import { Calendar, GraduationCap, Briefcase, Scale } from "lucide-react"
import Link from "next/link"

export default function BiographyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold">Biography</h1>
          <p className="text-xl mt-2">The Life and Times of Dr. Edgar Chagwa Lungu</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-center gap-8 py-4 overflow-x-auto">
            <Link href="/" className="text-gray-600 hover:text-green-700 pb-2">
              Memorial
            </Link>
            <Link href="/biography" className="text-green-700 border-b-2 border-green-700 pb-2 font-medium">
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
            <Link href="/service" className="text-gray-600 hover:text-green-700 pb-2">
              Memorial Service
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Early Life */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="w-6 h-6 text-green-700" />
            <h2 className="text-3xl font-serif font-bold text-green-800">Early Life</h2>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              Edgar Chagwa Lungu was born on 11 November 1956 at Ndola Central Hospital in the Copperbelt Province of
              Northern Rhodesia (now Zambia). Growing up during the final years of colonial rule and the early years of
              Zambian independence, young Edgar witnessed firsthand the transformation of his nation.
            </p>
            <p className="mb-4">
              His formative years were shaped by the political and social changes occurring in Zambia during the 1960s
              and 1970s. The struggle for independence and the early challenges of nation-building would later influence
              his own approach to leadership and governance.
            </p>
          </div>
        </Card>

        {/* Education */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <GraduationCap className="w-6 h-6 text-green-700" />
            <h2 className="text-3xl font-serif font-bold text-green-800">Education</h2>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              Dr. Lungu pursued his higher education at the University of Zambia, where he studied law. In 1981, he
              graduated with a Bachelor of Laws (LL.B.) degree, marking the beginning of his professional career in the
              legal field.
            </p>
            <p className="mb-4">
              His legal education provided him with a strong foundation in constitutional law, governance, and justice
              systems - knowledge that would prove invaluable throughout his political career. The University of Zambia,
              being the country's premier institution of higher learning, exposed him to diverse perspectives and
              prepared him for leadership roles.
            </p>
            <p>
              Following his graduation, Dr. Lungu also underwent military officer training at Miltez in Kabwe under the
              Zambia National Service (ZNS), which instilled in him discipline and a deeper understanding of national
              security matters.
            </p>
          </div>
        </Card>

        {/* Legal Career */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Scale className="w-6 h-6 text-green-700" />
            <h2 className="text-3xl font-serif font-bold text-green-800">Legal Career</h2>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              After graduating from university, Dr. Lungu joined the prestigious law firm Andrea Masiye and Company in
              Lusaka. This position allowed him to gain practical experience in various areas of law and to build a
              reputation as a competent legal practitioner.
            </p>
            <p className="mb-4">
              During his time in private practice, he handled a wide range of legal matters, from commercial law to
              civil litigation. His work brought him into contact with various sectors of Zambian society, giving him
              insights into the challenges facing ordinary citizens and businesses.
            </p>
            <p className="mb-4">
              However, his legal career faced a significant challenge in 2010 when the Law Association of Zambia
              suspended his practicing license due to professional misconduct. This setback marked a turning point in
              his career, leading him to focus more intensively on his political activities.
            </p>
          </div>
        </Card>

        {/* Personal Life */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Briefcase className="w-6 h-6 text-green-700" />
            <h2 className="text-3xl font-serif font-bold text-green-800">Personal Character</h2>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              Throughout his life, Dr. Lungu was known for his resilience and determination. His journey from a young
              man in Ndola to the highest office in the land demonstrated his ability to overcome challenges and adapt
              to changing circumstances.
            </p>
            <p className="mb-4">
              Colleagues and associates often described him as a pragmatic leader who was willing to make difficult
              decisions when necessary. His legal background instilled in him a respect for constitutional processes and
              the rule of law, even when facing political opposition.
            </p>
            <p>
              Dr. Lungu's faith played an important role in his life and leadership style. His declaration of a National
              Day of Prayer, Fasting, Repentance and Reconciliation in 2015 reflected his belief in the importance of
              spiritual guidance in national affairs.
            </p>
          </div>
        </Card>

        {/* Legacy */}
        <Card className="p-8 bg-white shadow-sm">
          <h2 className="text-3xl font-serif font-bold text-green-800 mb-6">Legacy</h2>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              Dr. Edgar Chagwa Lungu's life story is one of perseverance, public service, and dedication to Zambia. From
              his humble beginnings in Ndola to his service as President, he remained committed to the ideals of
              democracy and national development.
            </p>
            <p className="mb-4">
              His passing on 5 June 2025 in Pretoria, South Africa, marked the end of an era in Zambian politics. While
              his presidency faced various challenges, his contribution to Zambian democracy and his role in peaceful
              transitions of power will be remembered as part of his enduring legacy.
            </p>
            <p>
              Dr. Lungu's life serves as an inspiration to young Zambians, demonstrating that with education,
              determination, and service to others, one can rise to serve their nation at the highest level.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
