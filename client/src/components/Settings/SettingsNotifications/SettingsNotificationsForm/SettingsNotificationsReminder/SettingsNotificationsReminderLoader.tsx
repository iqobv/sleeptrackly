'use client';

import { SkeletonLoader } from '@/components/UI';

export const SettingsNotificationsReminderLoader = () => {
	return (
		<>
			<SkeletonLoader height={46} width="100%" />
			<SkeletonLoader height={100} width="100%" />
		</>
	);
};
