"use client"

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function LoginForm() {
  const handleGoogleSignIn = async () => {
    await signIn("google", { callbackUrl: "/" })
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col space-y-4">
        <Button onClick={handleGoogleSignIn} className="w-full">
          Sign in with Google
        </Button>
      </div>
    </Card>
  )
}
