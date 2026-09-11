import clsx from 'clsx';
import { CustomCSSProperties } from '../../types/customCSS.types';
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
	leftSlotClassName,
	rightSlotClassName,
	wrapperClassName,
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

	const customStyles: CustomCSSProperties = {
		...(padding !== undefined && { '--padding': pxToRem(padding) }),
		...(gap !== undefined && { '--gap': pxToRem(gap) }),
		...(textAlign !== undefined && { '--text-align': textAlign }),
	};

	return (
		<div
			className={clsx(styles.header, containerClassName)}
			style={customStyles}
		>
			{leftSlot && (
				<div className={clsx(styles.leftSlot, leftSlotClassName)}>
					{leftSlot}
				</div>
			)}
			<div className={clsx(styles.wrapper, wrapperClassName)}>
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
				{rightSlot && (
					<div className={clsx(styles.rightSlot, rightSlotClassName)}>
						{rightSlot}
					</div>
				)}
			</div>
		</div>
	);
};
