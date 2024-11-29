// next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com'], // Allow images from Cloudinary
  },
  reactStrictMode: true, // Optional: Enables React's Strict Mode
  swcMinify: true, // Optional: Enables SWC minification
  // Add other Next.js configurations here
};

export default nextConfig;
