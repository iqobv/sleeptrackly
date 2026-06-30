import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { pxToRem } from '../../utils/fromPxToRem.util';

export const SkeletonLoader = ({
	baseColor = 'var(--skeleton-color)',
	highlightColor = 'var(--skeleton-highlight)',
	borderRadius = 'var(--border-radius)',
	height,
	width,
	...rest
}: SkeletonProps) => {
	return (
		<Skeleton
			baseColor={baseColor}
			highlightColor={highlightColor}
			borderRadius={borderRadius}
			height={typeof height === 'number' ? pxToRem(height) : height}
			width={typeof width === 'number' ? pxToRem(width) : width}
			{...rest}
		/>
	);
};
