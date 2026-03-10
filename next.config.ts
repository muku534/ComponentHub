import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Transpile the Expo Snack SDK so that Next bundles it safely for the production client
  transpilePackages: ['snack-sdk'],

  // Ensure the dynamically read registry components are bundled into Vercel Serverless Functions
  outputFileTracingIncludes: {
    '/api/studio/snack/sources': ['./registry/components/**/*'],
    '/api/studio/snack': ['./registry/components/**/*'],
  },
};

export default nextConfig;
