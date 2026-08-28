import { cva } from 'class-variance-authority';
import styles from './styles/Typography.module.scss';
import colorStyles from './styles/TypographyColors.module.scss';
import variantStyles from './styles/TypographyVariant.module.scss';

export const typographyVariants = cva(styles.typography, {
	variants: {
		variant: {
			h1: variantStyles.h1,
			h2: variantStyles.h2,
			h3: variantStyles.h3,
			h4: variantStyles.h4,
			h5: variantStyles.h5,
			h6: variantStyles.h6,
			subtitle1: variantStyles.subtitle1,
			subtitle2: variantStyles.subtitle2,
			body1: variantStyles.body1,
			body2: variantStyles.body2,
			caption: variantStyles.caption,
			overline: variantStyles.overline,
		},
		weight: {
			regular: styles.regular,
			medium: styles.medium,
			semibold: styles.semibold,
			bold: styles.bold,
		},
		align: {
			left: styles.left,
			center: styles.center,
			right: styles.right,
			justify: styles.justify,
		},
		color: {
			primary: colorStyles.primary,
			secondary: colorStyles.secondary,
			success: colorStyles.success,
			error: colorStyles.error,
			muted: colorStyles.muted,
			inherit: colorStyles.inherit,
		},
		truncate: {
			true: styles.truncate,
		},
		textTransform: {
			none: null,
			uppercase: styles.uppercase,
			lowercase: styles.lowercase,
			capitalize: styles.capitalize,
		},
	},
	defaultVariants: {
		variant: 'body1',
		color: 'primary',
	},
});
