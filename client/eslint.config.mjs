import { FlatCompat } from '@eslint/eslintrc';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../eslint.base.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
	baseDirectory: __dirname,
});

const eslintConfig = [
	...baseConfig,
	...compat.extends('next/core-web-vitals', 'next/typescript'),
	{
		plugins: {
			react: (await import('eslint-plugin-react')).default,
			'react-hooks': (await import('eslint-plugin-react-hooks')).default,
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
];

export default eslintConfig;
