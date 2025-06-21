import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Flag, Users, Gavel, Shield } from "lucide-react"
import Link from "next/link"

export default function PoliticalCareerPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-green-800 text-white py-8">
        <div className="max-w-6xl mx-auto px-4">
          <h1 className="text-4xl font-serif font-bold">Political Career</h1>
          <p className="text-xl mt-2">A Journey Through Zambian Politics</p>
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
            <Link href="/political-career" className="text-green-700 border-b-2 border-green-700 pb-2 font-medium">
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
        {/* Early Political Involvement */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-green-700" />
            <h2 className="text-3xl font-serif font-bold text-green-800">Early Political Involvement</h2>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              Dr. Lungu's entry into politics began in 1996 when he stood as an independent candidate in the Chawama
              constituency during the general election. Although he was not successful in this first attempt, losing to
              Christon Tembo of the MMD, this experience marked the beginning of his political journey.
            </p>
            <p className="mb-4">
              Following the formation of the United Party for National Development (UPND) in December 1998, Dr. Lungu
              joined the party, demonstrating his commitment to opposition politics and democratic participation.
              However, his political allegiances would continue to evolve as the Zambian political landscape changed.
            </p>
            <p>
              In 2001, after the formation of the Patriotic Front (PF), Dr. Lungu made another significant political
              move by joining this new party. He again contested the Chawama constituency in the 2001 general election
              as the PF candidate, though he finished seventh out of eleven candidates with 2.43% of the vote.
            </p>
          </div>
        </Card>

        {/* Parliamentary Success */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Flag className="w-6 h-6 text-green-700" />
            <h2 className="text-3xl font-serif font-bold text-green-800">Parliamentary Success</h2>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              Dr. Lungu's persistence in the Chawama constituency finally paid off in the 2011 general election when he
              won the parliamentary seat as the Patriotic Front candidate. This victory marked a significant milestone
              in his political career and opened the door to higher office.
            </p>
            <p className="mb-4">
              The 2011 election was particularly significant as it brought the Patriotic Front to power under President
              Michael Sata, ending the Movement for Multi-Party Democracy's (MMD) long rule. Dr. Lungu's success was
              part of a broader wave of change that swept across Zambia.
            </p>
            <div className="bg-green-50 p-4 rounded-lg mt-6">
              <h4 className="font-bold text-green-800 mb-2">Key Political Positions Held:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Badge variant="outline" className="mb-2">
                    2011-2012
                  </Badge>
                  <p className="text-sm">Junior Minister in the Vice-President's office</p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">
                    2012-2013
                  </Badge>
                  <p className="text-sm">Minister of Home Affairs</p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">
                    2013-2014
                  </Badge>
                  <p className="text-sm">Minister of Defence</p>
                </div>
                <div>
                  <Badge variant="outline" className="mb-2">
                    2014
                  </Badge>
                  <p className="text-sm">PF Secretary General & Minister of Justice</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Ministerial Roles */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Gavel className="w-6 h-6 text-green-700" />
            <h2 className="text-3xl font-serif font-bold text-green-800">Ministerial Responsibilities</h2>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              After the PF's victory in 2011, Dr. Lungu was appointed as Junior Minister in the Vice-President's office,
              beginning his executive career. His performance in this role led to his promotion to Minister of Home
              Affairs on 9 July 2012, where he was responsible for internal security and immigration matters.
            </p>
            <p className="mb-4">
              On 24 December 2013, following Geoffrey Bwalya Mwamba's resignation, Dr. Lungu was appointed Minister of
              Defence. This role was particularly significant as it came during a period when President Sata's health
              was declining, and Dr. Lungu often functioned as Acting President during Sata's absences for medical
              treatment.
            </p>
            <p>
              His most crucial appointment came on 28 August 2014, when he was named PF Secretary General and Minister
              of Justice, replacing Wynter Kabimba who had been dismissed. This dual role positioned him as one of the
              most powerful figures in the PF and the government.
            </p>
          </div>
        </Card>

        {/* Path to Presidency */}
        <Card className="p-8 bg-white shadow-sm mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Shield className="w-6 h-6 text-green-700" />
            <h2 className="text-3xl font-serif font-bold text-green-800">Path to the Presidency</h2>
          </div>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              The death of President Michael Sata on 28 October 2014 created a constitutional crisis and succession
              battle within the Patriotic Front. Dr. Lungu emerged as one of the leading contenders to succeed Sata,
              despite initial challenges from within his own party.
            </p>
            <p className="mb-4">
              Acting President Guy Scott's dismissal of Dr. Lungu as PF Secretary General on 3 November 2014, followed
              by his reinstatement the next day, highlighted the internal party tensions. However, Dr. Lungu's political
              acumen and party support ultimately prevailed.
            </p>
            <p className="mb-4">
              On 30 November 2014, Dr. Lungu was elected as President of the Patriotic Front at a national convention in
              Kabwe. Although the convention was unusual with no formal voting taking place, the unaccredited delegates
              elected him by raising hands, demonstrating his grassroots support.
            </p>
            <div className="bg-blue-50 p-4 rounded-lg mt-6">
              <h4 className="font-bold text-blue-800 mb-2">Presidential Elections:</h4>
              <div className="space-y-3">
                <div>
                  <Badge className="mb-2 bg-blue-600">January 2015</Badge>
                  <p className="text-sm">
                    Won presidential by-election with 48.33% of votes, defeating Hakainde Hichilema by 27,757 votes
                  </p>
                </div>
                <div>
                  <Badge className="mb-2 bg-blue-600">August 2016</Badge>
                  <p className="text-sm">
                    Re-elected for full term with 50.32% of votes, increasing margin to 100,530 votes over Hichilema
                  </p>
                </div>
                <div>
                  <Badge className="mb-2 bg-red-600">August 2021</Badge>
                  <p className="text-sm">Defeated by Hakainde Hichilema, receiving almost a million fewer votes</p>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Post-Presidency Politics */}
        <Card className="p-8 bg-white shadow-sm">
          <h2 className="text-3xl font-serif font-bold text-green-800 mb-6">Post-Presidency Political Activities</h2>
          <div className="prose max-w-none text-gray-700 leading-relaxed">
            <p className="text-lg mb-4">
              After leaving office in August 2021, Dr. Lungu initially announced his retirement from active politics,
              leaving Given Lubinda as the Patriotic Front's acting president. However, his political journey was far
              from over.
            </p>
            <p className="mb-4">
              On 28 October 2023, Dr. Lungu made a dramatic return to active politics, reclaiming leadership of the
              Patriotic Front. This return was complicated by internal party divisions, with Miles Sampa having been
              declared PF president at a controversial extraordinary general conference earlier that October.
            </p>
            <p className="mb-4">
              The party split into two factions led to legal battles and political uncertainty. Dr. Lungu's faction
              joined the United Kwacha Alliance (UKA) in early 2024, and later the Tonse Alliance in November 2024,
              where he was appointed alliance chairperson and chosen as the presidential candidate for the 2026 general
              election.
            </p>
            <p>
              However, on 10 December 2024, the Constitutional Court barred Dr. Lungu from running again for president,
              ruling that he had already served the maximum of two terms. Despite this setback, he remained active in
              party politics until his passing in June 2025.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}
