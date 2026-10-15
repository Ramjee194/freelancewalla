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
};

export default nextConfig;
