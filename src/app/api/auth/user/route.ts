import connect from "@/helper/dbConnect";
import { User } from "@/model/user";
import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

await connect();

export async function POST(req: NextRequest) {
  try {
    const token = await getToken({ req });

    if (!token || !token.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { autoSchedule, contestType } = body;

    let user = await User.findOne({ email: token.email });

    if (user) {
      // Optionally update the fields if provided
      if (typeof autoSchedule === "boolean") {
        user.autoSchedule = autoSchedule;
      }
      if (typeof contestType === "string") {
        user.contestType = contestType;
      }
      await user.save();
      return NextResponse.json(user, { status: 200 });
    }

    // Create new user
    user = new User({
      id: token.sub,
      name: token.name,
      email: token.email,
      accessToken: token.accessToken,
      autoSchedule: typeof autoSchedule === "boolean" ? autoSchedule : false,
      constestType: typeof contestType === "string" ? contestType : "all",
    });

    await user.save();
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    console.error("POST /api/user error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const secret = req.headers.get("x-cron-secret");

  if (!secret || secret !== process.env.CRON_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const users = await User.find({
      autoSchedule: true,
    });

    return NextResponse.json({ users }, { status: 200 });
  } catch (err) {
    console.error("Internal user fetch error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
