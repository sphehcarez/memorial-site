/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Enable static HTML export (replaces `next export`)
  output: 'export',

  // ✅ Ensures URLs work correctly on static file hosts like cPanel
  trailingSlash: true,

  // ✅ Build optimizations for environments without full Node toolchains (e.g., FTP, cPanel)
  eslint: {
    ignoreDuringBuilds: true, // Skip ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // Allow builds even if TS has issues
  },

  // ✅ Disable Next.js image optimization to allow standard <img> use in static builds
  images: {
    unoptimized: true,
  },
}

export default nextConfig
