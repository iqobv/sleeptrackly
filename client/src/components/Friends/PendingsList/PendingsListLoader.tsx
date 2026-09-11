import { SectionHeaderLoader, SkeletonLoader } from '@shared/ui';
import { PendingsItemLoader } from './PendingsItem/PendingsItemLoader';
import styles from './PendingsList.module.scss';

export const PendingsListLoader = () => (
	<div className={styles.list}>
		{Array.from({ length: 3 }).map((_, i) => (
			<PendingsItemLoader key={i} />
		))}
	</div>
);

export const PendingsPageLoader = () => {
	return (
		<div>
			<SectionHeaderLoader
				leftSlot={<SkeletonLoader width={86} height={32} />}
			/>
			<div className={styles.buttons}>
				<SkeletonLoader width={120} height={44} />
				<SkeletonLoader width={100} height={44} />
			</div>
			<PendingsListLoader />
		</div>
	);
};
