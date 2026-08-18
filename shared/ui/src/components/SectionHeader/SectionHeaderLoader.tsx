import clsx from 'clsx';
import { CustomCSSProperties } from '../../types/customCSS.types';
import { pxToRem } from '../../utils/fromPxToRem.util';
import { SkeletonLoader } from '../SkeletonLoader/SkeletonLoader';
import styles from './SectionHeader.module.scss';
import { SectionHeaderLoaderProps } from './SectionHeader.types';

export const SectionHeaderLoader = ({
	containerClassName,
	descriptionHeight = 24,
	descriptionWidth = 160,
	padding = 20,
	gap = 10,
	hasDescription,
	textAlign,
	titleHeight = 48,
	titleWidth = 160,
	leftSlot,
	rightSlot,
}: SectionHeaderLoaderProps) => {
	const transformSize = (size: string | number) =>
		typeof size === 'number' ? pxToRem(size) : size;

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
			{leftSlot && <div className={styles.leftSlot}>{leftSlot}</div>}
			<div className={styles.wrapper}>
				<div className={styles.content}>
					<SkeletonLoader
						width={transformSize(titleWidth)}
						height={transformSize(titleHeight)}
					/>
					{hasDescription && (
						<SkeletonLoader
							width={transformSize(descriptionWidth)}
							height={transformSize(descriptionHeight)}
						/>
					)}
				</div>
				{rightSlot && <div className={styles.rightSlot}>{rightSlot}</div>}
			</div>
		</div>
	);
};
