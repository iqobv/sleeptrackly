'use client';

import { SkeletonLoader } from '@shared/ui';
import styles from './ProfileSkeleton.module.scss';

const ProfileSkeleton = () => {
	return (
		<div className={styles.profileSkeleton}>
			<SkeletonLoader height={300} width={300} circle />
			<SkeletonLoader height={65} width={300} borderRadius={10} />
			<div className={styles.statistics}>
				<SkeletonLoader height={130} borderRadius={10} />
				<SkeletonLoader height={130} borderRadius={10} />
			</div>
		</div>
	);
};

export default ProfileSkeleton;
