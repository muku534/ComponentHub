import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Ensure the dynamically read registry components are bundled into Vercel Serverless Functions
  outputFileTracingIncludes: {
    '/api/studio/snack/sources': ['./registry/components/**/*'],
    '/api/studio/snack': ['./registry/components/**/*'],
  },
};

export default nextConfig;
