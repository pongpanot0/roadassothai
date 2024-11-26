/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/uploads/:path*",
        destination: "/api/uploads/:path*", // Redirect uploads to the API route
      },
    ];
  },

  serverRuntimeConfig: {
    runtime: "nodejs",
  },
  reactStrictMode: true,
  future: { webpack5: true },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.resolve.alias.canvas = false;
    config.resolve.alias.encoding = false;
    return config;
  },
  /*  eslint: {
    ignoreDuringBuilds: true
  }, */
  images: {
    unoptimized: true,
    domains: [
      "localhost:3000",
      "mcon-oil.mconcrete.co.th",
      "localhost:3000",
      "mcon-oil.mconcrete.co.th",
      "roadassothai.com",
    ],
    minimumCacheTTL: 31536000,
  },
};

module.exports = nextConfig;
