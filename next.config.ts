import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
  async redirects() {
    return [
      {
        source: '/guides/how-loan-interest-calculated',
        destination: '/guides/loan-interest-formula-explained/',
        permanent: true,
      },
      {
        source: '/guides/how-loan-interest-calculated/',
        destination: '/guides/loan-interest-formula-explained/',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
