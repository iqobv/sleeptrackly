import { SkeletonLoader } from '@shared/ui';
import styles from './UserMenu.module.scss';

export const UserMenuLoader = () => (
	<div className={styles.controls}>
		<SkeletonLoader width={38} height={38} />
		<SkeletonLoader width={40} height={40} borderRadius="50%" />
	</div>
);
