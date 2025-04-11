// app/api/cron/run/route.ts
import { NextRequest, NextResponse } from "next/server";
import { dailyCron } from "@/helper/cronSchedule";

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-cron-secret");

  if (secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await dailyCron();
  return NextResponse.json({ status: "success", message: "Daily cron job executed." });
}
