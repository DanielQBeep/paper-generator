/** @type {import('next').NextConfig} */
const nextConfig = {
    // output: 'standalone',
    // cacheDirectory: join(__dirname, 'node_modules', '.puppeteer_cache'),
    // compiler: {
    //     removeConsole: true,
    // },
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
        ],
    },
    experimental: {
        missingSuspenseWithCSRBailout: false,
    }
};

export default nextConfig
