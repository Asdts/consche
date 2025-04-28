import { NextRequest, NextResponse } from "next/server"
import type { CalendarEvent } from "@/types/calender"
import { addEventsToCalendar } from "@/helper/addEventToCalender"
import { getServerSession } from "next-auth/next"
import authOptions from "@/app/api/auth/[...nextauth]/option"

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { contestId, startTime, duration, name } = await req.json()

    // Convert Unix timestamp to ISO string
    const startDateTime = new Date(startTime * 1000).toISOString()
    const endDateTime = new Date((startTime + duration) * 1000).toISOString()

    // Create calendar event object
    const event: CalendarEvent = {
      summary: name,
      description: `Codeforces contest: ${name}`,
      start: {
        dateTime: startDateTime,
        timeZone: "Asia/Kolkata", // Adjust as needed
      },
      end: {
        dateTime: endDateTime,
        timeZone: "Asia/Kolkata", // Adjust as needed
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 60 },
          { method: "popup", minutes: 30 },
        ],
      },
    }

    // Create Google Calendar event
    const response = await addEventsToCalendar(event, session.accessToken)

    // const calendarEvent = await response.json()

    // Store the scheduled contest in your database
    // This is a placeholder - you would implement this with your database

    return NextResponse.json({
      success: true,
      eventId: response.id,
      contestId
    })
  } catch (error) {
    console.error("Error scheduling contest:", error)
    return NextResponse.json({ error: "Failed to schedule contest" }, { status: 500 })
  }
}
