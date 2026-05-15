'use client';

import { SkeletonLoader } from '@/components/UI';
import styles from './UploadAvatar.module.scss';

const UploadAvatarLoader = () => {
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

export default UploadAvatarLoader;
