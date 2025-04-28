/* eslint-disable @typescript-eslint/no-explicit-any */

export async function getCalendarEvents(accessToken: string | undefined | null) {
  if (!accessToken) return null;

  const res = await fetch("https://www.googleapis.com/calendar/v3/calendars/primary/events", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
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
