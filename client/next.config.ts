import type { NextConfig } from 'next';
import './src/env';

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
	transpilePackages: [
		'@shared/ui',
		'@shared/utils',
		'@shared/types',
		'@shared/hooks',
		'@shared/tables',
		'@shared/forms',
	],
};

export default nextConfig;
