import { SkeletonLoader } from '@shared/ui';

interface ChallengeCardContainerLoaderProps {
	width?: number | string;
	height?: number | string;
}

export const ChallengeCardContainerLoader = ({
	height,
	width,
}: ChallengeCardContainerLoaderProps) => (
	<div style={{ width: width ?? '100%', height: height ?? '100%' }}>
		<SkeletonLoader height="100%" width="100%" />
	</div>
);
