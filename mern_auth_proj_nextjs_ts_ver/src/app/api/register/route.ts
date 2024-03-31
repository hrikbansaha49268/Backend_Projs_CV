import { connectMongo } from "@/Database/Connector";
import { NextApiRequest, NextApiResponse } from "next";


export async function POST(response: NextApiResponse, request: NextApiRequest) {
    const dbConnection = await connectMongo();
    if (dbConnection) {
        const user = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password
        };
        if (user) {
            return response.status(200).json({ ...user });
        } else {
            return response.status(404).json({
                status: 'error',
                msg: "User not found"
            });
        }
    } else {
        return response.status(500).json({ status: 'error', msg: 'DB not connected' });
    }
};