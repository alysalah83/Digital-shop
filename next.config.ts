import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async redirects() {
    return [
      {
        source: "/account",
        destination: "/account/setting",
        permanent: true,
      },
    ];
  },
  cacheComponents: true,
  images: {
    remotePatterns: [
      new URL("https://sgnc93jjcf1xtyta.public.blob.vercel-storage.com/**"),
      new URL("https://lh3.googleusercontent.com/**"),
    ],
  },
};

export default nextConfig;
