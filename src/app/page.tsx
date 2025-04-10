import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { ContestList } from "@/components/contest-list"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect("/login")
  }

  return (
    <main className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Codeforces Contests</h1>
      <ContestList />
    </main>
  )
}
