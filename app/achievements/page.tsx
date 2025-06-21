import { Card } from "@/components/ui/card"
import { Trophy, Heart, Building, Zap, Users, Globe } from "lucide-react"
import Link from "next/link"

export default function AchievementsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold">Presidential Achievements</h1>
          <p className="text-xl mt-2">Legacy of Leadership and Service</p>
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
            <Link href="/achievements" className="text-green-700 border-b-2 border-green-700 pb-2 font-medium">
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
        {/* Justice and Human Rights */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Heart className="w-6 h-6 text-green-700" />
            <h2 className="text-3xl font-serif font-bold text-green-800">Justice and Human Rights</h2>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              One of Dr. Lungu's most significant humanitarian achievements was his decision to commute the death
              sentences of 332 prisoners to life imprisonment on 16 July 2015. This landmark decision demonstrated his
              commitment to human rights and criminal justice reform.
            </p>
            <p className="mb-4">
              During the same period, he strongly condemned the massive overcrowding at Mukobeko prison, calling it "an
              affront to basic human dignity." This statement highlighted his concern for prison conditions and the
              treatment of inmates in Zambia's correctional facilities.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mt-6">
              <h4 className="font-bold text-green-800 mb-2">Key Justice Reforms:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Commuted 332 death sentences to life imprisonment</li>
                <li>Advocated for prison reform and improved conditions</li>
                <li>Promoted human dignity in the justice system</li>
                <li>Strengthened rule of law institutions</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Economic Diversification */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Building className="w-6 h-6 text-green-700" />
            <h2 className="text-3xl font-serif font-bold text-green-800">Economic Diversification</h2>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              Dr. Lungu emphasized the critical importance of diversifying Zambia's economy away from its decades-long
              dependence on copper mining. He actively promoted agriculture and other sectors as alternative pillars of
              economic growth and stability.
            </p>
            <p className="mb-4">
              His administration sought investors for Zambia's energy sector, recognizing that it was not safe to depend
              solely on hydro-electricity. He advocated for alternative energy sources, acknowledging that climate
              change created new challenges and opportunities for energy security.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mt-6">
              <h4 className="font-bold text-blue-800 mb-2">Economic Initiatives:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Promoted agricultural development as alternative to mining</li>
                <li>Sought foreign investment in energy sector</li>
                <li>Advocated for renewable energy development</li>
                <li>Emphasized economic diversification strategies</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Energy and Infrastructure */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Zap className="w-6 h-6 text-green-700" />
            <h2 className="text-3xl font-serif font-bold text-green-800">Energy and Infrastructure</h2>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              Recognizing Zambia's vulnerability to climate change and its impact on hydroelectric power generation, Dr.
              Lungu's administration prioritized energy diversification. He declared that it was not safe to depend
              solely on hydro-electricity and actively sought alternative energy solutions.
            </p>
            <p className="mb-4">
              His forward-thinking approach to energy policy acknowledged the need for sustainable and reliable power
              sources to support Zambia's development goals. This included exploring solar, wind, and other renewable
              energy options to complement traditional hydroelectric power.
            </p>
          </div>
        </Card>

        {/* Women's Empowerment */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-green-700" />
            <h2 className="text-3xl font-serif font-bold text-green-800">Women's Empowerment</h2>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              A historic achievement of Dr. Lungu's presidency was the appointment of Inonge Wina as Zambia's first
              female Vice-President in February 2015. This groundbreaking decision demonstrated his commitment to gender
              equality and women's participation in leadership.
            </p>
            <p className="mb-4">
              The appointment of Mrs. Wina broke significant barriers in Zambian politics and served as an inspiration
              to women across the country. It represented a major step forward in achieving gender parity in high-level
              government positions.
            </p>
            <div className="bg-purple-50 p-4 rounded-lg mt-6">
              <h4 className="font-bold text-purple-800 mb-2">Gender Equality Milestones:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Appointed first female Vice-President in Zambian history</li>
                <li>Promoted women's participation in government</li>
                <li>Supported International Women's Day celebrations</li>
                <li>Advanced gender equality initiatives</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Spiritual Leadership */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-green-700" />
            <h2 className="text-3xl font-serif font-bold text-green-800">Spiritual and Moral Leadership</h2>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              In October 2015, facing economic challenges, Dr. Lungu ordered a national day of prayer in hopes of
              preventing further damage to the economy. This initiative brought together top religious and political
              officials and demonstrated his belief in the power of faith and unity.
            </p>
            <p className="mb-4">
              The success of this initiative led to the official registration of 18 October as an annual public holiday
              in Zambia, named the National Day of Prayer, Fasting, Repentance and Reconciliation. This holiday
              continues to be observed, representing a lasting legacy of his presidency.
            </p>
            <div className="bg-yellow-50 p-4 rounded-lg mt-6">
              <h4 className="font-bold text-yellow-800 mb-2">Spiritual Initiatives:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Established National Day of Prayer as public holiday</li>
                <li>Promoted national unity through faith</li>
                <li>Encouraged moral leadership in governance</li>
                <li>Fostered interfaith dialogue and cooperation</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* International Relations */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Globe className="w-6 h-6 text-green-700" />
            <h2 className="text-3xl font-serif font-bold text-green-800">International Relations</h2>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              Dr. Lungu maintained active diplomatic relations with world leaders during his presidency. His meeting
              with French President François Hollande in France in early 2016 strengthened bilateral relations between
              Zambia and France.
            </p>
            <p className="mb-4">
              Perhaps most memorably, his audience with Pope Francis at the Vatican was described by Dr. Lungu as an
              "experience of a lifetime." This meeting highlighted Zambia's position in the global community and Dr.
              Lungu's commitment to international cooperation.
            </p>
            <div className="bg-indigo-50 p-4 rounded-lg mt-6">
              <h4 className="font-bold text-indigo-800 mb-2">Diplomatic Achievements:</h4>
              <ul className="list-disc list-inside space-y-2 text-sm">
                <li>Met with French President François Hollande</li>
                <li>Audience with Pope Francis at the Vatican</li>
                <li>Strengthened international partnerships</li>
                <li>Promoted Zambia's global standing</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Democratic Legacy */}
        <Card className="p-8 bg-white shadow-sm">
          <h2 className="text-3xl font-serif font-bold text-green-800 mb-6">Democratic Legacy</h2>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              One of Dr. Lungu's most important contributions to Zambian democracy was his peaceful concession of defeat
              in the August 2021 election. Despite losing to Hakainde Hichilema, he gracefully accepted the results and
              facilitated a smooth transition of power.
            </p>
            <p className="mb-4">
              This act of statesmanship demonstrated his commitment to democratic principles and the rule of law. His
              peaceful transfer of power strengthened Zambia's democratic institutions and set a positive precedent for
              future elections.
            </p>
            <p>
              Throughout his presidency, Dr. Lungu faced various challenges and criticisms, but his ultimate respect for
              the democratic process and the will of the Zambian people remains a defining aspect of his political
              legacy.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
