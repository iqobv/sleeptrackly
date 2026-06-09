import clsx from 'clsx';
import { defaultElementMapping, defaultWeights } from './defaults';
import styles from './styles/Typography.module.scss';
import { TypographyProps } from './Typography.types';
import { typographyVariants } from './typographyVariants';

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

	const appliedWeight = weight || defaultWeights[variant || 'body1'];

	const typographyStyle = maxLines
		? {
				...style,
				WebkitLineClamp: maxLines,
			}
		: style;

	return (
		<Component
			className={clsx(
				typographyVariants({
					variant,
					weight: appliedWeight,
					align,
					color,
					truncate,
				}),
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
