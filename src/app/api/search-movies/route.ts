import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("s");

  if (!query) {
    return NextResponse.json(
      { error: "Missing search query" },
      { status: 400 }
    );
  }

  try {
    const apiKey = process.env.OMDB_API_KEY;
    const res = await fetch(
      `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`
    );
    const data = await res.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch data from OMDb" },
      { status: 500 }
    );
  }
}
