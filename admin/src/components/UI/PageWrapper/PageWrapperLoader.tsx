import { SkeletonLoader } from '@shared/ui';
import { ReactNode } from 'react';
import styles from './PageWrapper.module.scss';

interface PageWrapperLoaderProps {
	children: ReactNode;
	showBackButton?: boolean;
	showRightButton?: boolean;
	customRightSlot?: ReactNode;
}

export const PageWrapperLoader = ({
	children,
	customRightSlot,
	showBackButton,
	showRightButton,
}: PageWrapperLoaderProps) => (
	<div className={styles.pageWrapper}>
		{showBackButton && <SkeletonLoader height="2rem" width="5.3125rem" />}
		<div className={styles.header}>
			<div>
				<SkeletonLoader
					width="12.5rem"
					height="3rem"
					style={{ marginBottom: 'var(--gap)' }}
				/>
				<SkeletonLoader width="11.25rem" height="1.5rem" />
			</div>
			{!!customRightSlot && customRightSlot}
			{showRightButton && (
				<div className={styles.rightSlot}>
					<SkeletonLoader width="100%" height="100%" />
				</div>
			)}
		</div>
		{children}
	</div>
);
