import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
	allowedDevOrigins: ['local.domain'],
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
