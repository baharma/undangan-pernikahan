import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
      {
        protocol: "https",
        hostname: "www.bcalife.co.id",
      },
      {
        protocol: "https",
        hostname: "images.tokopedia.net",
      },
    ],
  },
};

export default nextConfig;
