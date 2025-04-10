import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

const GOOGLE_API = "https://www.googleapis.com/calendar/v3/calendars/primary/events";

export async function DELETE(req: NextRequest) {
  const token = await getToken({ req });

  if (!token || !token.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const url = new URL(req.url);
  const id = url.pathname.split("/").pop(); // Gets the last segment of the path

  if (!id) {
    return NextResponse.json({ error: "Missing event ID" }, { status: 400 });
  }

  try {
    const res = await fetch(`${GOOGLE_API}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token.accessToken}`,
      },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to delete contest" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
