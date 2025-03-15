import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.boffo-global.com", // Keep this as is
      },
      {
        protocol: "https",
        hostname: "i.ibb.co", // Corrected domain
      },
    ],
  },
};

export default nextConfig;
