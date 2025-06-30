import type { NextRequest } from "next/server";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const { query } = await req.json();
    if (!query || typeof query !== "string") {
      return new Response(JSON.stringify({ result: "Invalid query." }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Forward to backend Python API
    const backendRes = await fetch("http://localhost:8000/api/query", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });

    if (!backendRes.ok) {
      return new Response(
        JSON.stringify({ result: "Backend error. Please try again." }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const data = await backendRes.json();
    return new Response(JSON.stringify({ result: data.result }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    return new Response(
      JSON.stringify({ result: "Internal error. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
