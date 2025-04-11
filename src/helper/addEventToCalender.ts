import type { CalendarEvent } from "@/type/calender";
import { JWT } from "next-auth/jwt";

export async function addEventsToCalendar(events: CalendarEvent, token: JWT | null) {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token?.accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(events),
        }
      );
      console.log("token", token);
      const data = await response.json();
  
    return data;
  }
  