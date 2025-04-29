"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export function LoginForm() {
  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" })
  }

  return (
        <Button onClick={handleGoogleSignIn} className="w-full">
          Sign in with Google
        </Button>
  )
}
