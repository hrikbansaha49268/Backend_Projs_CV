import User from "@/Database/Schema";
import connectMongo from "@/Database/Connector";
import { passwordHasher } from "@/utilities/passwordUtil";
import { NextResponse } from "next/server";


export async function POST(request: Request) {
    const dbConnection = await connectMongo();
    if (dbConnection) {
        const { name, email, password } = await request.json();
        if (name && email && password) {
            const userExists = await User.exists({ email: email });
            if (!userExists) {
                try {
                    const user = await User.create({
                        name, email,
                        password: passwordHasher(password)
                    });
                    user.save();
                    return NextResponse.json(
                        { ...user._doc },
                        { status: 201, statusText: 'User created' }
                    );
                } catch (error) {
                    return NextResponse.json(
                        { error: 'Internal Server Error' },
                        { status: 500 }
                    );
                };
            } else {
                return NextResponse.json(
                    { error: 'This email exists already' },
                    { status: 409, statusText: 'Duplicate Email' }
                );
            };
        } else {
            return NextResponse.json(
                { error: 'Data is missing' },
                { status: 204, statusText: 'Content rejected' }
            );
        };
    } else {
        return NextResponse.json(
            { error: 'Database not connected' },
            { status: 500, statusText: 'Internal Server Error' }
        );
    };
};