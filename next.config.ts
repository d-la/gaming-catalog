import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.cloudflare.steamstatic.com',
        pathname: '/steam/apps/**'
      },
      {
        protocol: 'https',
        hostname: 'media.rawg.io',
        pathname: '/media/**'
      }
    ]
  }
};

export default nextConfig;
