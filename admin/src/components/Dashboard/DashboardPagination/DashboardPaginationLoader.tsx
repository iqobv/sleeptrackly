import { SkeletonLoader } from '@shared/ui';
import styles from './DashboardPagination.module.scss';

export const DashboardPaginationLoader = () => (
	<div className={styles.container}>
		<SkeletonLoader width={42} height={42} borderRadius={100} />
		<SkeletonLoader width={100} height={24} />
		<SkeletonLoader width={42} height={42} borderRadius={100} />
	</div>
);
