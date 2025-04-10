"use client"

import type React from "react"

import { SessionProvider } from "next-auth/react"
import { Navbar } from "@/components/navbar"
import { usePathname } from "next/navigation"

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const showNavbar = pathname !== "/login"

  return (
    <SessionProvider>
      {showNavbar && <Navbar />}
      {children}
    </SessionProvider>
  )
}
