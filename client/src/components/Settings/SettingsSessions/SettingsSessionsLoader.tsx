'use client';

import { Divider, SkeletonLoader } from '@shared/ui';

export const SettingsSessionsLoader = () => {
	return (
		<>
			<SkeletonLoader height={200} />
			<Divider />
			<SkeletonLoader height={150} />
		</>
	);
};
