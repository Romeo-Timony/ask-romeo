/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  images: {
    domains: ['images.unsplash.com', 'assets.aceternity.com'],
  },
  eslint: {
    // Ne bloque PAS le build en cas d'erreurs eslint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Small VPS builds OOM during full typecheck; CI/local can still run tsc.
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
