import User from "@/Database/Schema";
import connectMongo from "@/Database/Connector";
import { passwordHasher } from "@/utilities/passwordUtil";


export async function POST(request: Request) {
    const dbConnection = await connectMongo();
    if (dbConnection) {
        const userBody = await request.json();
        if (userBody) {
            const userExists = await User.exists({ email: userBody.email });
            if (!userExists) {
                try {
                    const user = await User.create({
                        name: userBody.name,
                        email: userBody.email,
                        password: passwordHasher(userBody.password)
                    });
                    user.save();
                    return Response.json({ status: 'ok', user: user });
                } catch (error) {
                    return Response.json({ status: 'error', error: 'Internal Server Error' });
                };
            } else {
                return Response.json({ status: 'error', error: 'Duplicate Email' });
            };
        } else {
            return Response.json({
                status: 'error',
                msg: "User not found"
            });
        }
    } else {
        return Response.json({ status: 'error', msg: 'DB not connected' });
    }
};