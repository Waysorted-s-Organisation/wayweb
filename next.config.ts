import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Enable standalone output so the deployment workflow can ship a minimal server bundle
  output: 'standalone',
};

export default nextConfig;
