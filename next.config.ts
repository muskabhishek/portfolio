import type { NextConfig } from "next";
import { networkInterfaces } from "node:os";

// Every IPv4 address this machine currently has, so phones/tablets on the same
// network can load dev assets and hot reload, whatever Wi-Fi you're on.
const lanAddresses = Object.values(networkInterfaces())
  .flat()
  .filter((n) => n && n.family === "IPv4" && !n.internal)
  .map((n) => n!.address);

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  allowedDevOrigins: [
    ...lanAddresses,
    // Common private-network ranges and mDNS hostnames as a fallback.
    "192.168.*.*",
    "10.*.*.*",
    "172.*.*.*",
    "*.local",
  ],
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
