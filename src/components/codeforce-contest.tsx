/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import { useState, useEffect } from "react"
import { useInView } from "react-intersection-observer"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import { ScheduleContestDialog } from "@/components/schedule-contest-dialog"
import type { CodeforcesContest } from "@/lib/types"

export function CodeForceList() {
  const [contests, setContests] = useState<CodeforcesContest[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [division, setDivision] = useState("all")
  const [selectedContest, setSelectedContest] = useState<CodeforcesContest | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { ref, inView } = useInView()

  const fetchContests = async (pageNum: number, reset = false) => {
    try {
      setLoading(true)
      const response = await fetch(`/api/contests?page=${pageNum}&division=${division}`)
      const data = await response.json()

      if (data.contests.length === 0) {
        setHasMore(false)
      } else {
        setContests(reset ? data.contests : [...contests, ...data.contests])
        setPage(pageNum)
      }
    } catch (error) {
      toast.error("Failed to fetch contests")
      console.error("Error fetching contests:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchContests(1, true)
  }, [division])

  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchContests(page + 1)
    }
  }, [inView, hasMore, loading])

  const handleSchedule = (contest: CodeforcesContest) => {
    setSelectedContest(contest)
    setDialogOpen(true)
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString()
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  const getDivisionFromName = (name: string) => {
    if (name.includes("Div. 1")) return "Div. 1"
    if (name.includes("Div. 2")) return "Div. 2"
    if (name.includes("Div. 3")) return "Div. 3"
    if (name.includes("Div. 4")) return "Div. 4"
    return "Other"
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-transparent">
        <div className="w-48 bg-transparent">
          <Select value={division} onValueChange={setDivision}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by division" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Divisions</SelectItem>
              <SelectItem value="div1">Division 1</SelectItem>
              <SelectItem value="div2">Division 2</SelectItem>
              <SelectItem value="div3">Division 3</SelectItem>
              <SelectItem value="div4">Division 4</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 bg-transparent">
        {contests.map((contest) => (
          <Card key={contest.id} className="bg-transparent">
            <CardHeader>
              <CardTitle className="line-clamp-2">{contest.name}</CardTitle>
              <div className="text-sm text-muted-foreground">{getDivisionFromName(contest.name)}</div>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <div className="text-sm font-medium">Start Time</div>
                <div>{formatDate(contest.startTimeSeconds)}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Duration</div>
                <div>{formatDuration(contest.durationSeconds)}</div>
              </div>
              <div>
                <div className="text-sm font-medium">Type</div>
                <div className="capitalize">{contest.type}</div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => handleSchedule(contest)} className="w-full">
                Schedule
              </Button>
            </CardFooter>
          </Card>
        ))}

        {loading && (
          <>
            {[1, 2, 3].map((i) => (
              <Card key={`skeleton-${i}`}>
                <CardHeader>
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-24 mt-2" />
                </CardHeader>
                <CardContent className="space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                </CardContent>
                <CardFooter>
                  <Skeleton className="h-10 w-full" />
                </CardFooter>
              </Card>
            ))}
          </>
        )}
      </div>

      {!loading && contests.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No contests found</p>
        </div>
      )}

      {hasMore && (
        <div ref={ref} className="py-4 flex justify-center">
          {loading && <p>Loading more...</p>}
        </div>
      )}

      {selectedContest && (
        <ScheduleContestDialog contest={selectedContest} open={dialogOpen} onOpenChange={setDialogOpen} />
      )}
    </div>
  )
}
