"use client"

import { useState } from "react"
import { useSession } from "next-auth/react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import type { CodeforcesContest } from "@/lib/types"

interface ScheduleContestDialogProps {
  contest: CodeforcesContest
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ScheduleContestDialog({ contest, open, onOpenChange }: ScheduleContestDialogProps) {
  const [scheduling, setScheduling] = useState(false)
  const { data: session } = useSession()

  const handleSchedule = async () => {
    if (!session) {
      toast.error("You must be signed in to schedule contests")
      return
    }

    try {
      setScheduling(true)
      const response = await fetch("/api/schedule", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contestId: contest.id,
          startTime: contest.startTimeSeconds,
          duration: contest.durationSeconds,
          name: contest.name,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to schedule contest")
      }

      toast.success("Contest scheduled successfully")
      onOpenChange(false)
    } catch (error) {
      toast.error("Failed to schedule contest")
      console.error("Error scheduling contest:", error)
    } finally {
      setScheduling(false)
    }
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp * 1000).toLocaleString()
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Schedule Contest</DialogTitle>
          <DialogDescription>Add this contest to your Google Calendar</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div>
            <h3 className="font-medium">Contest Name</h3>
            <p>{contest.name}</p>
          </div>
          <div>
            <h3 className="font-medium">Start Time</h3>
            <p>{formatDate(contest.startTimeSeconds)}</p>
          </div>
          <div>
            <h3 className="font-medium">Duration</h3>
            <p>
              {Math.floor(contest.durationSeconds / 3600)}h {Math.floor((contest.durationSeconds % 3600) / 60)}m
            </p>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSchedule} disabled={scheduling}>
            {scheduling ? "Scheduling..." : "Add to Calendar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
