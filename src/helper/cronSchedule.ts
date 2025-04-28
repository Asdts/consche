import { fetchUpcomingContests } from "./codeforceFetch";
import { addEventsToCalendar } from "@/helper/addEventToCalender";
// import { filterContestsByDivision } from "./filter";
import type { CalendarEvent } from "@/types/calender";
// import { use } from "react";

const CRON_SECRET = process.env.CRON_SECRET;
const Internal_API = process.env.NEXT_URL;

async function fetchUsers() {
  const response = await fetch(`${Internal_API}/api/auth/user`, {
    method: "GET",
    headers: {
      "x-cron-secret": CRON_SECRET || "",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch users");
  }

  const data = await response.json();
  return data.users;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function filterContests(contests: any[], type: string) {
    if (type === "all") return contests;
    return contests.filter((c) => c.name.toLowerCase().includes(`div. ${type}`));
  }

export async function dailyCron() {
  try {
    const users = await fetchUsers();
    const contests = await fetchUpcomingContests();
    if (!users || !contests) {
      throw new Error("Failed to fetch users or contests");
    }
    console.log("Fetched users:", users);
    for (const user of users) {
      const { accessToken, autoSchedule, contestType = "all" } = user;
      if (!autoSchedule || !accessToken) continue;
      let filteredContests = filterContests(contests, contestType);

      if (contestType !== "all") {
        filteredContests = filteredContests.filter((contest) =>
          contest.name.toLowerCase().includes(`div. ${contestType}`)
        );
      }
      console.log("Filtered contests:", filteredContests);
      for (const contest of filteredContests) {
        const startTime = new Date(contest.startTimeSeconds * 1000).toISOString();
        const endTime = new Date((contest.startTimeSeconds + contest.durationSeconds) * 1000).toISOString();

        const event: CalendarEvent = {
          summary: contest.name,
          description: `Codeforces contest: ${contest.name}`,
          start: {
            dateTime: startTime,
            timeZone: "Asia/Kolkata",
          },
          end: {
            dateTime: endTime,
            timeZone: "Asia/Kolkata",
          },
          reminders: {
            useDefault: false,
            overrides: [
              { method: "email", minutes: 60 },
              { method: "popup", minutes: 30 },
            ],
          },
        };

        // console.log(`📅 Scheduling ${contest.name} for ${user.email}`);
        const data = await addEventsToCalendar(event, user);
        console.log(`✅ Scheduled ${contest.name} for ${user.email}`, data);
      }
    }
  } catch (error) {
    console.error("❌ Error in daily cron job:", error);
  }
}
