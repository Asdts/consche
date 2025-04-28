import type { CalendarEvent } from "@/types/calender";

export async function addEventsToCalendar(events: CalendarEvent, accessToken: string | null | undefined) {
      const response = await fetch(
        "https://www.googleapis.com/calendar/v3/calendars/primary/events",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(events),
        }
      );
      // console.log("token", token);
      const data = await response.json();
      console.log("data", data);
  
    return data;
  }
  