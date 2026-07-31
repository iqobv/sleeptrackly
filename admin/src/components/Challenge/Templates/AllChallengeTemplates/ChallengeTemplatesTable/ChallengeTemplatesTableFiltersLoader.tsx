import { SkeletonLoader } from '@shared/ui';
import styles from './ChallengeTemplatesTable.module.scss';

export const ChallengeTemplatesTableFiltersLoader = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.filters}>
				{Array.from({ length: 2 }).map((_, i) => (
					<div key={i} style={{ width: '100%' }}>
						<SkeletonLoader key={i} height={45} />
					</div>
				))}
			</div>
		</div>
	);
};
