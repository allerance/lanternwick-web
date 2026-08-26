import { NextResponse } from "next/server";
import {
  lightLantern,
  listLanterns,
  validateNewLantern,
} from "@/lib/lanterns";

export const dynamic = "force-dynamic";

export async function GET() {
  return NextResponse.json({ lanterns: listLanterns() });
}

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON payload." },
      { status: 400 },
    );
  }

  const result = validateNewLantern(body);
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 422 });
  }

  const lantern = lightLantern(result.value);
  return NextResponse.json({ lantern }, { status: 201 });
}
