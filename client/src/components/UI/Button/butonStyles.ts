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
	defaultVariants: {
		variant: 'contained',
		size: 'md',
		fullWidth: false,
		isIcon: false,
		disabled: false,
	},
});
