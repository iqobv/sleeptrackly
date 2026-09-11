'use client';

import { pxToRem, Typography, TypographyProps } from '@shared/ui';
import clsx from 'clsx';
import styles from './ChallengeCardContainer.module.scss';

interface ChallengeCardContainerProps {
	children?: React.ReactNode;
	className?: string;
	title?: React.ReactNode;
	gap?: number;
	titleProps?: Omit<TypographyProps, 'children'>;
}

export const ChallengeCardContainer = ({
	children,
	className,
	gap,
	title,
	titleProps,
}: ChallengeCardContainerProps) => {
	const cssStyles = {
		'--challenge-gap': gap !== undefined ? pxToRem(gap) : undefined,
	} as React.CSSProperties;

	return (
		<div style={cssStyles} className={clsx(styles.container, className)}>
			{title && (
				<Typography
					color={titleProps?.color || 'secondary'}
					variant={titleProps?.variant || 'h6'}
					as={titleProps?.as || 'p'}
					{...titleProps}
				>
					{title}
				</Typography>
			)}
			{children}
		</div>
	);
};
