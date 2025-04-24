import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { page_number = 1, sub_type = "all", type = "contest" } = await req.json();

    const queryParams = new URLSearchParams({
      page_number: String(page_number),
      sub_type,
      type,
    });

    const url = `https://practiceapi.geeksforgeeks.org/api/vr/events/?${queryParams.toString()}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        origin: "https://www.geeksforgeeks.org",
      },
    });

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from GFG API:", error);
    return NextResponse.json(
      { error: "Failed to fetch contests from GFG API" },
      { status: 500 }
    );
  }
}
