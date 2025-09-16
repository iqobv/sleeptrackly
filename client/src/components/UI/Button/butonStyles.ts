import { cva } from 'class-variance-authority';

import styles from './Button.module.scss';

export const buttonVariants = cva(styles['button'], {
	variants: {
		variant: {
			contained: styles['variant--contained'],
			outlined: styles['variant--outlined'],
			text: styles['variant--text'],
			link: styles['variant--link'],
		},
		size: {
			sm: styles['size--sm'],
			md: styles['size--md'],
			lg: styles['size--lg'],
		},
		fullWidth: {
			false: styles['fullWidth--false'],
			true: styles['fullWidth--true'],
		},
		isIcon: {
			false: null,
			true: styles['icon'],
		},
		disabled: {
			false: null,
			true: styles['disabled--true'],
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
