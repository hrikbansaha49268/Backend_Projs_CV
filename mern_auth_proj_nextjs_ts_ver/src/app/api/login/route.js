import { NextResponse } from "next/server";

export async function POST() {
    return NextResponse.json({ msg: "Hello World from login" });
};