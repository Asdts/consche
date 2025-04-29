import { redirect } from "next/navigation"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/api/auth/[...nextauth]/option"
import { LoginForm } from "@/components/login-form"
import Link from "next/link"

export default async function LoginPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b  from-[#a95007] to-[#d19b5d]">
      <div className="mx-auto w-full max-w-md p-8 space-y-8 bg-transparent rounded-lg shadow-lg">
        <div className="text-center">
          <h1 className="text-3xl font-bold">Welcome</h1>
          <p className="text-muted-foreground mt-2">Sign in to schedule Codeforces contests</p>
        </div>
        <LoginForm />
        <Link href="/" className="text-blue-500 hover:underline mt-4">
          Back to Home
        </Link>
      </div>
    </div>
  )
}
