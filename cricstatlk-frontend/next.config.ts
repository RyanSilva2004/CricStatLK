import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allows all hostnames
        port: "",
        pathname: "/**", // Allows all paths
      },
    ],
  },
};

export default nextConfig;
