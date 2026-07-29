import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { Event } from "@/models/Event";

// 1. GET ALL EVENTS
export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: events }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

// 2. CREATE A NEW EVENT
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();

    const newEvent = await Event.create(body);
    return NextResponse.json({ success: true, data: newEvent }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}