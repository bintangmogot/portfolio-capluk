import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  generateBuildId: async () => {
    return 'fixed-build-id';
  },
};

export default nextConfig;
