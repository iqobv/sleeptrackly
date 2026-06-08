'use client';

import { List, SkeletonLoader } from '@shared/ui';
import styles from './Timer.module.scss';

const TimerLoader = () => {
	return (
		<List
			items={[0, 1, 2]}
			isHorizontal
			className={styles['timer__time-container-inner']}
			renderItem={(el) => (
				<div className={styles['timer__time-item']} key={el}>
					<div
						style={{
							display: 'block',
							width: '100%',
						}}
					>
						<SkeletonLoader height={80} width={'100%'} borderRadius={12} />
					</div>
					<SkeletonLoader height={20} width={80} />
				</div>
			)}
		/>
	);
};

export default TimerLoader;
