import { NextResponse , NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"

const GOOGLE_API = "https://www.googleapis.com/calendar/v3/calendars/primary/events";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getToken({ req})

  if (!session || !session.accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const id = await params.id
    const results = await fetch(`${GOOGLE_API}/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${session.accessToken}`,
          },
        })
    if(results.status !== 204) {
      return NextResponse.json({ error: "Failed to delete scheduled contest" }, { status: 500 })
    }
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting scheduled contest:", error)
    return NextResponse.json({ error: "Failed to delete scheduled contest" }, { status: 500 })
  }
}
