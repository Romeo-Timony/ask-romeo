const fs = require('fs');
const path = require('path');

// Manually parse local env files to override OS-level environment variables
function loadEnvOverride() {
  const envFiles = ['.env.development.local', '.env.local', '.env'];
  for (const file of envFiles) {
    const filePath = path.join(__dirname, file);
    if (fs.existsSync(filePath)) {
      const content = fs.readFileSync(filePath, 'utf-8');
      const lines = content.split('\n');
      for (const line of lines) {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const firstEqual = trimmed.indexOf('=');
          const key = trimmed.substring(0, firstEqual).trim();
          const value = trimmed.substring(firstEqual + 1).trim();
          if (key === 'OPENAI_API_KEY' && value) {
            process.env.OPENAI_API_KEY = value;
            return;
          }
        }
      }
    }
  }
}
loadEnvOverride();

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: process.platform === 'win32' ? undefined : 'standalone',
  devIndicators: {
    buildActivity: false,
    appIsrStatus: false,
  },
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
