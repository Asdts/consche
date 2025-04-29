import { getServerSession } from "next-auth/next"
import authOptions from "./api/auth/[...nextauth]/option"
import ContestBox from "@/components/contest"
import Hero from "@/components/homepage/hero"

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (!session) {
    return (
      <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <Hero/>
      </main>
    )
  }

  return (

    // <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#a95007] to-[#d19b5d]">
      <ContestBox />
      // </main>
  )
}
