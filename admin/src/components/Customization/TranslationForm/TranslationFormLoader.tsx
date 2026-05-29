import { SkeletonLoader } from '@/components/UI';
import styles from './TranslationForm.module.scss';

export const TranslationFormLoader = () => {
	return (
		<div className={styles.translations}>
			{Array.from({ length: 2 }).map((_, i) => (
				<SkeletonLoader key={i} height={95} />
			))}
			<SkeletonLoader height={44} width={150} />
		</div>
	);
};
