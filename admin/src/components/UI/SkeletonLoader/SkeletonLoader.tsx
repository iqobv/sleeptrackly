import Skeleton, { SkeletonProps } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

export default function SkeletonLoader({
	baseColor = 'var(--skeleton-color)',
	highlightColor = 'var(--skeleton-highlight)',
	borderRadius = 'var(--border-radius)',
	...rest
}: SkeletonProps) {
	return (
		<Skeleton
			baseColor={baseColor}
			highlightColor={highlightColor}
			borderRadius={borderRadius}
			{...rest}
		/>
	);
}
