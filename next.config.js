/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // appDir: true, // Esta opción ya no es necesaria en Next.js 14
  },
  // Configuración para evitar warnings de hidratación
  reactStrictMode: true,
  // Configuración para el favicon
  async headers() {
    return [
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig 