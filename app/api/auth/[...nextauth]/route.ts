import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) return null;

                if (credentials?.email === "test@test.com" && credentials?.password === "password") {
                    return {
                        id: "1",
                        name: "Demo User",
                        email: "test@test.com"
                    }
                }

                return null;
            }
        })
    ],
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET
});

export { handler as GET, handler as POST };