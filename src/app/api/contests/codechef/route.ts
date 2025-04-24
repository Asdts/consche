import { NextResponse } from "next/server"

type Contest = {
  contest_name: string
  contest_code: string
  contest_start_date: string
  contest_end_date: string
  contest_type?: "skill" | "normal"
}

type Input = {
  contests: Contest[]
}

export async function POST(req: Request) {
  try {
    const reqBody = await req.json()
    const { type } = reqBody
    const codechef = await fetch("https://codechef.com/api/list/contests/all")
    const body = (await codechef.json()) as Input
    const now = new Date()

    let filteredContests: Contest[]

    if (type === "future") {
      filteredContests = body.contests.filter(
        (c) => new Date(c.contest_start_date) > now && c.contest_type !== "skill"
      )
    } else if (type === "past") {
      filteredContests = body.contests.filter(
        (c) => new Date(c.contest_end_date) < now && c.contest_type !== "skill"
      )
    } else if (type === "skill") {
      filteredContests = body.contests.filter((c) => c.contest_type === "skill")
    } else {
      filteredContests = body.contests
    }

    return NextResponse.json({ contests: filteredContests })
  } catch (error) {
    console.error("Error:", error)
    return NextResponse.json({ error: "Invalid request or internal error" }, { status: 400 })
  }
}
