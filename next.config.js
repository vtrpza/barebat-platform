/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'cdn.builder.io',
      'via.placeholder.com',
    ],
  },
  experimental: {
    serverActions: true,
  },
  typescript: {
    // Temporarily disable type checking during development for faster feedback
    ignoreBuildErrors: process.env.NODE_ENV === 'development',
  },
}

module.exports = nextConfig 