import { cva } from 'class-variance-authority';

import styles from './TextField.module.scss';

export const textFieldVariants = cva(styles['text-field'], {
	variants: {
		fullWidth: {
			true: styles['full-width--true'],
			false: styles['full-width--false'],
		},
		disabled: {
			true: styles['disabled'],
			false: null,
		},
		error: {
			true: styles['error'],
			false: null,
		},
		leftIcon: {
			true: styles['icon--input-left'],
			false: null,
		},
		rightIcon: {
			true: styles['icon--input-right'],
			false: null,
		},
	},
	defaultVariants: {
		fullWidth: false,
		disabled: false,
		error: false,
		leftIcon: false,
		rightIcon: false,
	},
});
