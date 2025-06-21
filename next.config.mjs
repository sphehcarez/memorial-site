/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // ✅ Enable static export for cPanel/FTP hosting
  trailingSlash: true, // ✅ Ensures proper routing on static hosts like cPanel

  eslint: {
    ignoreDuringBuilds: true, // ✅ Skip ESLint errors during build
  },
  typescript: {
    ignoreBuildErrors: true, // ✅ Ignore TS errors at build time
  },
  images: {
    unoptimized: true, // ✅ Disable Next.js image optimization (needed for export)
  },
}

export default nextConfig
