/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        MONGO_URI: "mongodb+srv://hrikbans:looper@cluster0.jydd6pg.mongodb.net/mern-stack-auth?retryWrites=true&w=majority&appName=Cluster0",
        PORT: 3000,
        TOKEN_SECRET: "Dhakuria"
    }
};

export default nextConfig;
