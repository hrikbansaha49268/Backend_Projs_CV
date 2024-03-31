import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json({ msg: "Hello World from Quotes GET" });
};

export async function POST() {
    return NextResponse.json({ msg: "Hello World from Quotes POST" });
};