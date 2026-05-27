'use client';

import { Divider, SkeletonLoader } from '@/components/UI';

export const SettingsSessionsLoader = () => {
	return (
		<>
			<SkeletonLoader height={200} />
			<Divider />
			<SkeletonLoader height={150} />
		</>
	);
};
