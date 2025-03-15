import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.boffo-global.com", // Replace with your actual backend domain
      },
    ],
  },
};

export default nextConfig;
