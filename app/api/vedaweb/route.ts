import { NextRequest, NextResponse } from "next/server";

const VEDAWEB_BASE_URL = "https://vedaweb.uni-koeln.de/rigveda/api";

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const locationId = searchParams.get("id");

    if (!locationId) {
      return NextResponse.json(
        { error: "Location ID is required" },
        { status: 400 }
      );
    }

    // Fetch from VedaWeb API
    const response = await fetch(
      `${VEDAWEB_BASE_URL}/document/id/${locationId}`,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        { error: "Document not found" },
        { status: 404 }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("VedaWeb API error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch document" },
      { status: 500 }
    );
  }
}
