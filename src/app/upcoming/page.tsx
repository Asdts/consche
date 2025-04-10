import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { UpcomingEvents } from "@/components/upcoming-events"

export default async function UpcomingPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Upcoming Scheduled Contests</h1>
      <UpcomingEvents userId={session.user.id} />
    </div>
  )
}
