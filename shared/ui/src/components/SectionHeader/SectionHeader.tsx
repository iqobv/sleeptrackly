import clsx from 'clsx';
import { pxToRem } from '../../utils/fromPxToRem.util';
import { Typography } from '../Typography/Typography';
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
	leftSlot,
	rightSlot,
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
					'--padding': padding !== undefined ? pxToRem(padding) : undefined,
					'--gap': gap !== undefined ? pxToRem(gap) : undefined,
					'--text-align': textAlign,
				} as React.CSSProperties
			}
		>
			{leftSlot && <div className={styles.leftSlot}>{leftSlot}</div>}
			<div className={styles.content}>
				{!!title && (
					<Typography
						variant={titleVariant}
						className={titleClassName}
						{...restTitleProps}
					>
						{title}
					</Typography>
				)}
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
			{rightSlot && <div className={styles.rightSlot}>{rightSlot}</div>}
		</div>
	);
};
