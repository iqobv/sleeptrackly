'use client';

import { SkeletonLoader } from '@shared/ui';
import styles from './ReportsList.module.scss';

const items = Array.from({ length: 10 }, (_, i) => i + 1);
const paginationItems = Array.from({ length: 5 }, (_, i) => i + 1);

export const ReportsListLoader = () => {
	return (
		<div className={styles['reports__list-wrapper']}>
			<div className={styles['reports__list']}>
				{items.map((el) => (
					<SkeletonLoader
						key={el}
						height={54}
						width={'100%'}
						borderRadius={12}
					/>
				))}
			</div>
			<div
				style={{
					display: 'flex',
					gap: 10,
					justifyContent: 'center',
				}}
			>
				{paginationItems.map((el) => (
					<SkeletonLoader key={el} height={39} width={39} circle />
				))}
			</div>
		</div>
	);
};
