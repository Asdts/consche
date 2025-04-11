import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { ContestList } from "@/components/contest-list"
import Link from "next/link"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-muted px-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white p-8 shadow-xl">
          <h1 className="text-3xl font-bold mb-4 text-center text-primary">Welcome to Codeforces Contest Scheduler</h1>
          <p className="text-muted-foreground text-center mb-6">
            Automatically track and schedule Codeforces contests to your Google Calendar.
          </p>
          <div className="flex justify-center mb-6">
            <Link
              href="/login"
              className="inline-block rounded-lg bg-blue-600 px-6 py-2 text-white font-semibold hover:bg-blue-700 transition-colors"
            >
              Log in with Google
            </Link>
          </div>

          <div className="border-t pt-4 text-sm text-muted-foreground space-y-2 text-center">
            <p>✅ No personal data is stored</p>
            <p>🔒 We only request access to your Google Calendar to schedule contests</p>
            <p>📅 You control what contests get added</p>
            <p>🌐 Hosted securely on a verified domain</p>
            <Link href="/privacy" className="text-blue-500 hover:underline">
              Read our Privacy Policy
            </Link>
          </div>

          <p className="text-center text-sm text-muted-foreground mt-6">
            Built with ❤️ by <strong>Abhishek Dubey</strong> — for competitive programmers, by a competitive programmer.
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">Upcoming Codeforces Contests</h1>
      <ContestList />
    </main>
  )
}
