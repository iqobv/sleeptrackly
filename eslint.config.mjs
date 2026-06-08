import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
	{
		ignores: [
			'shared/types/src/schema.d.ts',
			'shared/types/dist/**',
			'**/node_modules/**',
			'**/dist/**',
			'**/.next/**',
		],
	},
	eslint.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			'@typescript-eslint/no-explicit-any': 'error',
			'@typescript-eslint/no-unused-vars': [
				'error',
				{
					args: 'all',
					argsIgnorePattern: '^_',
					caughtErrors: 'all',
					caughtErrorsIgnorePattern: '^_',
					destructuredArrayIgnorePattern: '^_',
					varsIgnorePattern: '^_',
					ignoreRestSiblings: true,
				},
			],
		},
	},
);
