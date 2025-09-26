import { NextResponse } from 'next/server';

// Simple health endpoint to verify deployment and basic runtime.
// Returns 200 JSON with timestamp. Extend with deeper checks (DB, auth) later.
export async function GET() {
  return NextResponse.json({ ok: true, time: new Date().toISOString() });
}
