import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import './src/env';

const nextConfig: NextConfig = {
	allowedDevOrigins: [
		'local.domain',
		'lvh.me',
		'www.lvh.me',
		'app.lvh.me',
		'app.localhost',
		'localhost',
		'sleeptrackly.local',
		'app.sleeptrackly.local',
		'local.sleeptrackly.com',
		'app.local.sleeptrackly.com',
	],
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
	pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [['remark-gfm', { strict: true, throwOnError: true }]],
		rehypePlugins: [],
	},
});

export default withMDX(nextConfig);
