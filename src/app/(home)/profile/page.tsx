import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import authOptions from "../../api/auth/[...nextauth]/option"
import { UserProfile } from "@/components/user-profile"

export default async function ProfilePage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
      {session.user && <UserProfile user={session.user} />}
    </div>
  )
}
