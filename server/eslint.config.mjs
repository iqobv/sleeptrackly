import eslintConfigPrettier from 'eslint-config-prettier';
import oxlint from 'eslint-plugin-oxlint';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import baseConfig from '../eslint.base.mjs';

const uniqueDecorators = [
	'Auth',
	'ApiBody',
	'ApiConsumes',
	'ApiOperation',
	'ApiOkResponse',
	'ApiCreatedResponse',
	'HttpCode',
	'UseInterceptors',
	'UseGuards',
	'UsePipes',
	'UseFilters',
];

const duplicateDecoratorRules = uniqueDecorators.map((name) => ({
	selector: `MethodDefinition > Decorator[expression.callee.name="${name}"] ~ Decorator[expression.callee.name="${name}"]`,
	message: `Duplicate @${name} decorators are not allowed on a single method.`,
}));

const httpMethodRule = {
	selector:
		'MethodDefinition > Decorator:matches([expression.callee.name=/^(Get|Post|Put|Delete|Patch|Options|Head)$/], [expression.name=/^(Get|Post|Put|Delete|Patch|Options|Head)$/]) ~ Decorator:matches([expression.callee.name=/^(Get|Post|Put|Delete|Patch|Options|Head)$/], [expression.name=/^(Get|Post|Put|Delete|Patch|Options|Head)$/])',
	message:
		'Multiple HTTP method decorators on a single method are not allowed.',
};

export default tseslint.config(
	{
		ignores: ['eslint.config.mjs', 'dist/**', 'generated/**'],
	},
	...baseConfig,
	...tseslint.configs.recommendedTypeChecked,
	oxlint.configs['flat/recommended'],
	eslintConfigPrettier,
	{
		languageOptions: {
			globals: {
				...globals.node,
				...globals.jest,
			},
			sourceType: 'commonjs',
			parserOptions: {
				projectService: true,
				tsconfigRootDir: import.meta.dirname,
			},
		},
	},
	{
		rules: {
			'@typescript-eslint/explicit-function-return-type': [
				'error',
				{
					allowExpressions: true,
					allowTypedFunctionExpressions: true,
				},
			],
			'@typescript-eslint/explicit-member-accessibility': [
				'error',
				{
					accessibility: 'explicit',
					overrides: {
						constructors: 'no-public',
						properties: 'off',
					},
				},
			],
			'@typescript-eslint/parameter-properties': 'off',
			'@typescript-eslint/no-floating-promises': 'warn',
			'@typescript-eslint/no-unsafe-argument': 'warn',
			'no-restricted-syntax': [
				'error',
				httpMethodRule,
				...duplicateDecoratorRules,
			],
		},
	},
);
