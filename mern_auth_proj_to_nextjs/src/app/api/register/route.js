import { connectMongo } from "@/Database/Connector";
import { NextResponse } from "next/server";


export async function POST(request) {
    const dbConnection = await connectMongo();
    if (dbConnection) {
        const formData = new FormData();
        const user = {
            name: formData.get("name"),
            email: formData.get("email"),
            password: formData.get("password")
        };
        return NextResponse.json(user);
    } else {
        return NextResponse.json({ status: 'error', msg: 'DB not connected' });
    }
};