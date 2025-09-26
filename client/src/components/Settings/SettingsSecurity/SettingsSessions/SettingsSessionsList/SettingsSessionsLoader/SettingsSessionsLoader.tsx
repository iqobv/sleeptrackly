'use client';

import { Divider, SkeletonLoader } from '@/components/UI';

const SettingsSessionsLoader = () => {
	return (
		<>
			<SkeletonLoader height={120} />
			<Divider />
			<SkeletonLoader height={70} />
		</>
	);
};

export default SettingsSessionsLoader;
