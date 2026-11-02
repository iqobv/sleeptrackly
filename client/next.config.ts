import createMDX from '@next/mdx';
import type { NextConfig } from 'next';
import './src/env';

type NextWebpackRule = {
	test?: { test?: (str: string) => boolean };
	issuer?: unknown;
	resourceQuery?: { not?: unknown[] };
	exclude?: RegExp;
};

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
	turbopack: {
		rules: {
			'*.svg': {
				loaders: ['@svgr/webpack'],
				as: '*.js',
			},
		},
	},
	webpack: (config) => {
		const rules = config.module.rules as NextWebpackRule[];

		const fileLoaderRule = rules.find((rule) => rule.test?.test?.('.svg'));

		if (fileLoaderRule) {
			config.module.rules.push(
				{
					...fileLoaderRule,
					test: /\.svg$/i,
					resourceQuery: /url/,
				},
				{
					test: /\.svg$/i,
					issuer: fileLoaderRule.issuer,
					resourceQuery: {
						not: [...(fileLoaderRule.resourceQuery?.not || []), /url/],
					},
					use: [
						{
							loader: '@svgr/webpack',
							options: {
								icon: true,
							},
							replaceAttrValues: {
								'#000000': 'currentColor',
								'#ffffff': 'currentColor',
							},
						},
					],
				},
			);

			config.fileLoaderRule.exclude = /\.svg$/;
		}

		return config;
	},
};

const withMDX = createMDX({
	options: {
		remarkPlugins: [['remark-gfm', { strict: true, throwOnError: true }]],
		rehypePlugins: [],
	},
});

export default withMDX(nextConfig);
