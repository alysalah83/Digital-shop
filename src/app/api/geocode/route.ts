import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get("lat");
  const longitude = searchParams.get("lon");

  if (!latitude || !longitude) {
    return new Response(
      JSON.stringify({ error: "Missing latitude or longitude" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      },
    );
  }

  try {
    if (!process.env.GEOCODE_API_KEY) {
      return new Response(JSON.stringify({ error: "API key not configured" }), {
        status: 500,
        headers: { "Content-Type": "application/json" },
      });
    }

    const response = await fetch(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=${process.env.GEOCODE_API_KEY}`,
    );

    const data = await response.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Geocoding error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch address information" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      },
    );
  }
}
