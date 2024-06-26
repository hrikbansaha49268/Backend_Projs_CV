import { connectMongo } from "@/Database/Connector";
import { NextResponse } from "next/server";


export async function POST(request) {
    const dbConnection = await connectMongo();
    if (dbConnection) {
        const user = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        };
        if (user) {
            return NextResponse.json({ ...user });
        } else {
            return NextResponse.json({
                status: 'error',
                msg: "User not found"
            });
        }
    } else {
        return NextResponse.json({ status: 'error', msg: 'DB not connected' });
    }
};