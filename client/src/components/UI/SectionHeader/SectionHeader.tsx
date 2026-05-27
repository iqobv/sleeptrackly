import { pxToRem } from '@/utils';
import clsx from 'clsx';
import { BackButton } from '../BackButton';
import { Typography } from '../Typography';
import styles from './SectionHeader.module.scss';
import { SectionHeaderProps } from './SectionHeader.types';

export const SectionHeader = ({
	title = '',
	description = '',
	containerClassName = '',
	padding = 20,
	gap = 10,
	titleProps,
	descriptionProps,
	textAlign = 'start',
	showBackButton = false,
	backButtonProps,
}: SectionHeaderProps) => {
	const {
		variant: titleVariant = 'h1',
		className: titleClassName,
		...restTitleProps
	} = titleProps || {};

	const {
		variant: descriptionVariant = 'body1',
		className: descriptionClassName,
		...restDescriptionProps
	} = descriptionProps || {};

	return (
		<div
			className={clsx(styles.header, containerClassName)}
			style={
				{
					'--padding': padding ? pxToRem(padding) : undefined,
					'--gap': gap ? pxToRem(gap) : undefined,
					'--text-align': textAlign,
				} as React.CSSProperties
			}
		>
			{showBackButton && <BackButton {...backButtonProps} />}
			<div className={styles.content}>
				<Typography
					variant={titleVariant}
					className={titleClassName}
					{...restTitleProps}
				>
					{title}
				</Typography>
				{!!description && (
					<Typography
						variant={descriptionVariant}
						className={descriptionClassName}
						{...restDescriptionProps}
					>
						{description}
					</Typography>
				)}
			</div>
		</div>
	);
};
