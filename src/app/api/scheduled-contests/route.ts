/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextResponse, NextRequest } from "next/server";
import { getCalendarEvents } from "@/helper/getCalendarEvents";
import { getServerSession } from "next-auth/next";
import authOptions from "@/app/api/auth/[...nextauth]/option";

export async function GET(req: NextRequest) {
  const token = await getServerSession(authOptions);

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const events = await getCalendarEvents(token.accessToken);
  console.log("events", events);

  return NextResponse.json({ events });
}
