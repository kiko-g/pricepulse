import { NextResponse } from "next/server"

export async function GET() {
  const data = { message: "Hello from our API" }

  return NextResponse.json(data, { status: 200 })
}
