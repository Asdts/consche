import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/api/auth/[...nextauth]/option"
import { UpcomingEvents } from "@/components/upcoming-events"

export default async function UpcomingPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="flex flex-col h-full py-6 bg-gradient-to-b from-[#a95007] to-[#d19b5d]">
      <h1 className="text-3xl font-bold mb-6">Upcoming Scheduled Contests</h1>
      { session.user && <UpcomingEvents userId={session.user.email || ""} />}
    </div>
  )
}
