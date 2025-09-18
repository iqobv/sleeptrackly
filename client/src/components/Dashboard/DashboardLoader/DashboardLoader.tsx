'use client';

import { SkeletonLoader } from '@/components/UI';
import styles from './DashboardLoader.module.scss';

const DashboardLoader = () => {
	return (
		<div className={styles['dashboard-loader']}>
			<SkeletonLoader height={60} />
			<SkeletonLoader height={60} />
			<SkeletonLoader height={500} />
			<SkeletonLoader height={250} />
		</div>
	);
};

export default DashboardLoader;
