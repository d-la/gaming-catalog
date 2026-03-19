import NextAuth from 'next-auth';
import { authConfig } from './auth.config';

export default NextAuth(authConfig).auth;
 
// https://nextjs.org/docs/app/api-reference/file-conventions/proxy#matcher
export const config = {
    matcher: [
        '/favorites/:path*',
        '/account-information/:path*'
    ]
};