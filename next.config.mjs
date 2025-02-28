/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  transpilePackages: ["portfolioui"],
  images: {
    remotePatterns: [
      {
        hostname: "raw.githubusercontent.com",
      },
      { hostname: "assets.aceternity.com" },
    ],
  },
  
};

export default nextConfig;
