import clsx from 'clsx';
import { ElementType } from 'react';
import styles from './styles/Typography.module.scss';
import { TypographyProps, TypographyVariants } from './Typography.types';
import { typographyVariants } from './typographyVariants';

const defaultElementMapping: Record<
	NonNullable<TypographyVariants['variant']>,
	ElementType
> = {
	h1: 'h1',
	h2: 'h2',
	h3: 'h3',
	h4: 'h4',
	h5: 'h5',
	h6: 'h6',
	subtitle1: 'h6',
	subtitle2: 'h6',
	body1: 'p',
	body2: 'p',
	caption: 'span',
	overline: 'span',
};

export const Typography = ({
	children,
	variant = 'body1',
	as,
	weight,
	align,
	color,
	truncate = false,
	maxLines,
	className,
	style,
	...rest
}: TypographyProps) => {
	const Component = as || defaultElementMapping[variant || 'body1'];

	const typographyStyle = maxLines
		? {
				...style,
				WebkitLineClamp: maxLines,
			}
		: style;

	return (
		<Component
			className={clsx(
				typographyVariants({ variant, weight, align, color, truncate }),
				maxLines && styles.lineClamp,
				className,
			)}
			style={typographyStyle}
			{...rest}
		>
			{children}
		</Component>
	);
};
