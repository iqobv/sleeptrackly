import SkeletonLoader from '../SkeletonLoader/SkeletonLoader';
import styles from './Pagination.module.scss';

const PaginationLoader = () => {
	return (
		<div className={styles['pagination']}>
			{Array.from({ length: 7 }).map((_, index) => (
				<SkeletonLoader key={index} width={44} height={44} />
			))}
		</div>
	);
};

export default PaginationLoader;
