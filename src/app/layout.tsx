import type React from "react"
import { Inter } from "next/font/google"
// import { ThemeProvider } from "@/components/theme-provider"
import { SonnerProvider } from "@/components/sonner-provider"
import { AuthProvider } from "@/lib/auth-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Codeforces Scheduler",
  description: "Schedule and track your Codeforces contests",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <meta name="google-site-verification" content="RXo5HNTBsxAKNikKeQcgzB1HU6ortK1IRGsO4YOfcJI" />
      <body className={inter.className}>
        {/* <ThemeProvider attribute="class" defaultTheme="system" enableSystem> */}
          <AuthProvider>{children}</AuthProvider>
          <SonnerProvider />
        {/* </ThemeProvider> */}
      </body>
    </html>
  )
}
