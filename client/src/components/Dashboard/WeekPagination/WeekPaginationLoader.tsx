import { SkeletonLoader } from '@/components/UI';
import styles from './WeekPagination.module.scss';

const WeekPaginationLoader = () => {
	return (
		<div className={styles['week-pagination']}>
			<div
				className={styles['week-pagination__container']}
				style={{ backgroundColor: 'transparent', padding: 0 }}
			>
				<SkeletonLoader
					width="100%"
					height="100%"
					borderRadius={20}
					containerClassName={styles['skeleton-fill']}
				/>
			</div>
		</div>
	);
};

export default WeekPaginationLoader;
