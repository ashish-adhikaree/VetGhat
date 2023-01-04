/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
      {
        protocol: "https",
        hostname: "assets-cdn.kantipurdaily.com",
      },
      {
        protocol: "https",
        hostname: "assets-cdn-api.kantipurdaily.com",
      },
    ],
  },
  env: {
    STRAPI_URL: process.env.STRAPI_URL,
    SITE_URL: process.env.SITE_URL
  },
};

module.exports = nextConfig;
