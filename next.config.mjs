/** @type {import('next').NextConfig} */
const nextConfig = {
  // ✅ Use static HTML export (Next.js 13+ replaces deprecated `next export`)
  output: 'export',

  // ✅ Append trailing slashes to all routes for static hosting compatibility (e.g., cPanel, FTP servers)
  trailingSlash: true,

  // ✅ Skip ESLint during production builds (useful in CI/CD pipelines)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // ✅ Allow production builds to complete even with TypeScript errors (not recommended for final production)
  typescript: {
    ignoreBuildErrors: true,
  },

  // ✅ Disable Next.js Image Optimization for static exports using regular <img> tags
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
