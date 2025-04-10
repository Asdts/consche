/* eslint-disable @typescript-eslint/no-explicit-any */
import { JWT } from "next-auth/jwt";

export async function getCalendarEvents(token: JWT | null) {
  if (!token || !token.accessToken) return null;

  const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    headers: {
      Authorization: `Bearer ${token.accessToken}`,
    },
  });

  const data = await res.json();
//   console.log(data)
  const codeforcesEvents = (data.items || []).filter((event: any) =>
    event.summary?.toLowerCase().includes("codeforces")
  );
//   console.log("codeforcesEvents", codeforcesEvents);
  return codeforcesEvents || [];
}
