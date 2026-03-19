import type { NextAuthConfig } from 'next-auth';

export const authConfig = {
    pages: {
        signIn: '/login',
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isProtectedRoute = 
                nextUrl.pathname.startsWith('/favorites') ||
                nextUrl.pathname.startsWith('/account-information');
            
            if (isProtectedRoute) return isLoggedIn;

            return true;
        },
    },
    providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;