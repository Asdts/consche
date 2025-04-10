import { NextResponse, NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";
import { getCalendarEvents } from "@/helper/getCalendarEvents";

export async function GET(req: NextRequest) {
  const token = await getToken({ req });

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const events = await getCalendarEvents(token);
  console.log("events", events);

  return NextResponse.json({ events });
}
