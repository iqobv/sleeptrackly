'use client';

import { SkeletonLoader } from '@/components/UI';
import styles from './ProfileSkeleton.module.scss';

const ProfileSkeleton = () => {
	return (
		<div className={styles['profile-skeleton']}>
			<SkeletonLoader height={300} width={300} circle />
			<SkeletonLoader height={65} width={300} borderRadius={10} />
			<div className={styles['profile-skeleton__statistics']}>
				<SkeletonLoader height={130} borderRadius={10} />
				<SkeletonLoader height={130} borderRadius={10} />
			</div>
		</div>
	);
};

export default ProfileSkeleton;
