import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ['cashfree-pg'],
  async headers() {
    return [
      {
        // Apply to all routes — needed for Cashfree checkout popup to work
        source: "/(.*)",
        headers: [
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin-allow-popups",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/about',
        destination: '/about-us',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/contact-us',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
