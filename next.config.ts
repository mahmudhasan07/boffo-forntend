import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized : true
    // remotePatterns: [
    //   {
    //     protocol: "https",
    //     hostname: "api.boffo-global.com", // Keep this as is
    //   },
    // ],
  },
};

export default nextConfig;
