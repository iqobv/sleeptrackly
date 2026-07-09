import nextVitals from 'eslint-config-next/core-web-vitals';
import oxlint from 'eslint-plugin-oxlint';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../eslint.config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = [
	...baseConfig,
	...nextVitals,
	{
		rules: {
			'no-restricted-imports': [
				'error',
				{
					paths: [
						{
							name: 'zod',
							importNames: ['default'],
							message:
								"Always use named import for Zod: import { z } from 'zod'.",
						},
					],
				},
			],
		},
		settings: {
			next: {
				rootDir: __dirname,
			},
		},
	},
	{
		ignores: [
			'node_modules/**',
			'.next/**',
			'out/**',
			'build/**',
			'next-env.d.ts',
		],
	},
	...oxlint.configs['flat/recommended'],
];

export default eslintConfig;
