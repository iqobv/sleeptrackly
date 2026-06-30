'use client';

import { SkeletonLoader } from '@shared/ui';

export const TimerButtonLoader = () => {
	return (
		<div style={{ margin: '0 auto' }}>
			<SkeletonLoader width={120} height={44} borderRadius={12} />
		</div>
	);
};
