'use client';

import { SkeletonLoader } from '@shared/ui';
import styles from './UploadAvatar.module.scss';

export const UploadAvatarLoader = () => {
	return (
		<div className={styles.container}>
			<SkeletonLoader height={120} width={'100%'} />
			<SkeletonLoader
				height={250}
				width={250}
				circle
				style={{
					display: 'flex',
					margin: '0 auto',
				}}
			/>
		</div>
	);
};
