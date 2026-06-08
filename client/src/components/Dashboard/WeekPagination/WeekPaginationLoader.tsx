import { SkeletonLoader } from '@shared/ui';
import styles from './WeekPagination.module.scss';

const WeekPaginationLoader = () => {
	return (
		<div className={styles.weekPagination}>
			<div
				className={styles.container}
				style={{ backgroundColor: 'transparent', padding: 0 }}
			>
				<SkeletonLoader
					width="100%"
					height="100%"
					borderRadius={20}
					containerClassName={styles.skeletonFill}
				/>
			</div>
		</div>
	);
};

export default WeekPaginationLoader;
