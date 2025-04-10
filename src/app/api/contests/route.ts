import { NextResponse } from "next/server"
import type { CodeforcesContest } from "@/lib/types"

const ITEMS_PER_PAGE = 9

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const page = Number.parseInt(searchParams.get("page") || "1")
  const division = searchParams.get("division") || "all"

  try {
    const response = await fetch("https://codeforces.com/api/contest.list")
    const data = await response.json()

    if (data.status !== "OK") {
      throw new Error("Failed to fetch contests from Codeforces API")
    }

    let contests = data.result as CodeforcesContest[]

    // Filter by division if needed
    if (division !== "all") {
      const divPattern =
        division === "div1"
          ? "Div. 1"
          : division === "div2"
            ? "Div. 2"
            : division === "div3"
              ? "Div. 3"
              : division === "div4"
                ? "Div. 4"
                : ""

      if (division === "other") {
        contests = contests.filter(
          (contest) =>
            !contest.name.includes("Div. 1") &&
            !contest.name.includes("Div. 2") &&
            !contest.name.includes("Div. 3") &&
            !contest.name.includes("Div. 4"),
        )
      } else {
        contests = contests.filter((contest) => contest.name.includes(divPattern))
      }
    }

    // Paginate results
    const startIndex = (page - 1) * ITEMS_PER_PAGE
    const paginatedContests = contests.slice(startIndex, startIndex + ITEMS_PER_PAGE)

    return NextResponse.json({ contests: paginatedContests })
  } catch (error) {
    console.error("Error fetching contests:", error)
    return NextResponse.json({ error: "Failed to fetch contests" }, { status: 500 })
  }
}
