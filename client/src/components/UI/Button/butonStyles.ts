import { cva } from 'class-variance-authority';

import baseStyles from './styles/Button.module.scss';
import buttonProperties from './styles/ButtonProperties.module.scss';
import sizeStyles from './styles/ButtonSize.module.scss';
import variantStyles from './styles/ButtonVariant.module.scss';

export const buttonVariants = cva(baseStyles['button'], {
	variants: {
		variant: {
			contained: variantStyles['variant--contained'],
			outlined: variantStyles['variant--outlined'],
			text: variantStyles['variant--text'],
			link: variantStyles['variant--link'],
			secondary: variantStyles['variant--secondary'],
			danger: variantStyles['variant--danger'],
		},
		size: {
			sm: sizeStyles['size--sm'],
			md: sizeStyles['size--md'],
			lg: sizeStyles['size--lg'],
		},
		fullWidth: {
			false: buttonProperties['fullWidth--false'],
			true: buttonProperties['fullWidth--true'],
		},
		isIcon: {
			false: null,
			true: buttonProperties['icon'],
		},
		disabled: {
			false: null,
			true: buttonProperties['disabled--true'],
		},
	},
	compoundVariants: [
		{ isIcon: false, size: 'sm', className: sizeStyles['padding-sm'] },
		{ isIcon: false, size: 'md', className: sizeStyles['padding-md'] },
		{ isIcon: false, size: 'lg', className: sizeStyles['padding-lg'] },
		{ isIcon: true, size: 'sm', className: sizeStyles['icon-padding-sm'] },
		{ isIcon: true, size: 'md', className: sizeStyles['icon-padding-md'] },
		{ isIcon: true, size: 'lg', className: sizeStyles['icon-padding-lg'] },
	],
	defaultVariants: {
		variant: 'contained',
		size: 'md',
		fullWidth: false,
		isIcon: false,
		disabled: false,
	},
});
