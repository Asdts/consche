/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from "next/server";
import { addEventsToCalendar } from "@/helper/addEventToCalender";
import { fetchUpcomingContests } from "@/helper/codeforceFetch";
import { getServerSession } from "next-auth/next";
import authOptions from "../auth/[...nextauth]/option";

export async function POST(req: NextRequest) {
  const token = await getServerSession(authOptions);
  if (!token || !token.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const preferredDiv = body.preferredDiv || "Any"; // fallback to "Any"

    const allContests = await fetchUpcomingContests();

    // 🧠 Filter contests by preferred division
    const filteredContests = allContests.filter((contest: any) => {
      if (preferredDiv === "Any") return true;
      return contest.name.toLowerCase().includes(preferredDiv.toLowerCase());
    });
    // console.log("filteredContests", filteredContests);
    const now = Date.now() / 1000;
    const upcomingContests = filteredContests.filter(
      (contest: any) => contest.startTimeSeconds > now
    );
    // console.log("upcomingContests", upcomingContests);
    const events = upcomingContests.map((contest: any) => {
      const startDateTime = new Date(contest.startTimeSeconds * 1000).toISOString();
      const endDateTime = new Date(
        (contest.startTimeSeconds + contest.durationSeconds) * 1000
      ).toISOString();
      return {
        summary: contest.name,
        description: `Codeforces contest: ${contest.name}`,
        start: {
          dateTime: startDateTime,
          timeZone: "Asia/Kolkata",
        },
        end: {
          dateTime: endDateTime,
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
    });

    // console.log("events", events);

    const responses = await Promise.all(
      events.map((event: any) => addEventsToCalendar(event, token.accessToken))
    );

    const calendarEventIds = responses.map((response: any) => response.id);

    return NextResponse.json({
      success: true,
      calendarEventIds,
    });
  } catch (error) {
    console.error("Error scheduling contests:", error);
    return NextResponse.json(
      { error: "Failed to schedule contests" },
      { status: 500 }
    );
  }
}
