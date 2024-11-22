/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'utfs.io',
            port: '',
            pathname: '/f/**',
          },
        ],
      },
};

export default nextConfig;
