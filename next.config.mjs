/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    // Removed ignoreBuildErrors: true — we want to catch real TypeScript errors
    ignoreBuildErrors: false,
  },
  images: {
    qualities: [70, 75, 80, 85, 90],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'wexraungoigsdrsavgci.supabase.co',
      },
    ],
  },
}


export default nextConfig
