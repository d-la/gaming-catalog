import NextAuth from 'next-auth';
import { authConfig } from './auth.config';
import CredentialsProvider from "next-auth/providers/credentials";

export const { auth, signIn, signOut, handlers } = NextAuth({
    ...authConfig,
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials) return null;

                // Since this is a portfolio project we'll check for this specific email/password combination
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