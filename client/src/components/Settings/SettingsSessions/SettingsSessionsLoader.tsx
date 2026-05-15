'use client';

import { Divider, SkeletonLoader } from '@/components/UI';

const SettingsSessionsLoader = () => {
	return (
		<>
			<SkeletonLoader height={200} />
			<Divider />
			<SkeletonLoader height={150} />
		</>
	);
};

export default SettingsSessionsLoader;
