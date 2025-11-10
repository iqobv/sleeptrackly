import { cva } from 'class-variance-authority';

import styles from './Select.module.scss';

export const selectInputVariants = cva(styles['select__input'], {
	variants: {
		fullWidth: {
			true: styles['full-width--true'],
			false: styles['full-width--false'],
		},
		isClearable: {
			true: styles['select__input--clearable'],
			false: null,
		},
		error: {
			true: styles['error'],
			false: null,
		},
	},
	defaultVariants: {
		fullWidth: false,
		isClearable: false,
		error: false,
	},
});
