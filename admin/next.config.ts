import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: `${process.env.API_URL}/:path*`,
			},
		];
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'flagsapi.com',
			},
			{
				protocol: 'https',
				hostname: 'cdn.sleeptrackly.site',
			},
			{
				protocol: 'https',
				hostname: 'cdn.sleeptrackly.com',
			},
		],
	},
};

export default nextConfig;
