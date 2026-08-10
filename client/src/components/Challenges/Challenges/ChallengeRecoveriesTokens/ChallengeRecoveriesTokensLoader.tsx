import { pxToRem, SkeletonLoader } from '@shared/ui';

export const ChallengeRecoveriesTokensLoader = () => (
	<div style={{ height: pxToRem(64), minWidth: pxToRem(240) }}>
		<SkeletonLoader height="100%" width="100%" />
	</div>
);
