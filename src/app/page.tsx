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
          <h1 className="text-3xl font-bold mb-4 text-center text-primary">Welcome to Codeforces Contest Tracker</h1>
          <p className="text-muted-foreground text-center mb-6">
            Effortlessly track and schedule upcoming Codeforces contests to your Google Calendar.
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
            <p>✅ No personal data stored</p>
            <p>🔒 Secure Google Calendar integration</p>
            <p>📅 Only schedules contests you select</p>
            <Link href="/privacy" className="text-blue-500 hover:underline">
              Privacy Policy
            </Link>
          </div>
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
