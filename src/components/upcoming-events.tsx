/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useState, useEffect } from "react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Link from "next/link"

interface ScheduledContest {
  id: string
  contestId: number
  name: string
  startTime: number
  duration: number
  calendarEventId: string
}

interface UpcomingEventsProps {
  userId: string
}

export function UpcomingEvents({ userId }: UpcomingEventsProps) {
  const [events, setEvents] = useState<ScheduledContest[]>([])
  const [loading, setLoading] = useState(true)

  const fetchEvents = async () => {
    try {
      setLoading(true)
      const response = await fetch("/api/scheduled-contests")
      const data = await response.json()
  
      const mappedEvents: ScheduledContest[] = (data.events || []).map((event: any) => {
        const start = new Date(event.start.dateTime).getTime() / 1000
        const end = new Date(event.end.dateTime).getTime() / 1000
        return {
          id: event.id,
          contestId: 0, // not available from Google Calendar, so placeholder
          name: event.summary,
          startTime: start,
          duration: end - start,
          calendarEventId: event.id,
        }
      })
  
      setEvents(mappedEvents)
    } catch (error) {
      toast.error("Failed to fetch scheduled contests")
      console.error("Error fetching scheduled contests:", error,userId)
    } finally {
      setLoading(false)
    }
  }
  

  useEffect(() => {
    fetchEvents()
  }, [])

  const handleRemove = async (id: string) => {
    try {
      const response = await fetch(`/api/scheduled-contests/${id}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Failed to remove scheduled contest")
      }

      setEvents(events.filter((event) => event.id !== id))
      toast.success("Contest removed from calendar")
    } catch (error) {
      toast.error("Failed to remove scheduled contest")
      console.error("Error removing scheduled contest:", error)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString()
  }

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 bg-transparent">
        {[1, 2, 3].map((i) => (
          <Card key={`skeleton-${i}`} className="bg-transparent">
            <CardHeader>
              <Skeleton className="h-6 w-full" />
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-full" />
            </CardFooter>
          </Card>
        ))}
      </div>
    )
  }

  if (events.length === 0) {
    return (
      <div className="text-center py-12 bg-transparent">
        <p className="text-muted-foreground">No scheduled contests found</p>
        <Button className="mt-4" asChild>
          <Link href="/">Browse Contests</Link>
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 bg-transparent">
      {events.map((event) => (
        <Card key={event.id} className="bg-transparent">
          <CardHeader>
            <CardTitle className="line-clamp-2">{event.name}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <div>
              <div className="text-sm font-medium">Start Time</div>
              <div>{formatDate(event.startTime)}</div>
            </div>
            <div>
              <div className="text-sm font-medium">Duration</div>
              <div>{formatDuration(event.duration)}</div>
            </div>
          </CardContent>
          <CardFooter >
            <Button variant="outline" className="hover:bg-red-600 bg-violet-600 w-full" onClick={() => handleRemove(event.id)}>
              Remove from Calendar
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
