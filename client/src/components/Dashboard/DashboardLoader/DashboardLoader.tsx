'use client';

import { SkeletonLoader } from '@shared/ui';
import styles from './DashboardLoader.module.scss';

const DashboardLoader = () => {
	return (
		<div className={styles.dashboardLoader}>
			<SkeletonLoader height={60} />
			<SkeletonLoader height={60} />
			<SkeletonLoader height={500} />
		</div>
	);
};

export default DashboardLoader;
