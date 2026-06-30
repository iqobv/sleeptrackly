import { SkeletonLoader } from '@shared/ui';
import { TimerContent } from './TimerContent';
import styles from './TimerContent.module.scss';

export const TimerContentLoader = () => (
	<TimerContent time={['00', '00', '00']} />
);

export const TimerContentSkeleton = () => (
	<div className={styles.container}>
		{Array.from({ length: 3 }).map((_, i) => (
			<div key={i} className={styles.item}>
				<SkeletonLoader
					height={80}
					style={{
						width: '100%',
					}}
					containerClassName={styles.loader}
				/>
				<SkeletonLoader width={60} height={24} />
			</div>
		))}
	</div>
);
