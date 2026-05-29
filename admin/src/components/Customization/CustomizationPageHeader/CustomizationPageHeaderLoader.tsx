import { SkeletonLoader } from '@/components/UI';
import styles from './CustomizationPageHeader.module.scss';

export const CustomizationPageHeaderLoader = () => {
	return (
		<div className={styles.header}>
			<SkeletonLoader
				width={200}
				height={82}
				style={{
					margin: '1.25rem 0',
				}}
			/>
			<SkeletonLoader width={44} height={44} />
		</div>
	);
};
