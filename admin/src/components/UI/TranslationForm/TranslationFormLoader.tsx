import { SkeletonLoader } from '@shared/ui';
import styles from './TranslationForm.module.scss';

interface TranslationFormLoaderProps {
	rows: number;
}

export const TranslationFormLoader = ({ rows }: TranslationFormLoaderProps) => {
	return (
		<div className={styles.translations}>
			<div className={styles.item}>
				<div className={styles.fields}>
					{Array.from({ length: rows }).map((_, i) => (
						<SkeletonLoader
							key={i}
							height={95}
							style={{ margin: '0.5rem 0' }}
						/>
					))}
				</div>
				<SkeletonLoader height={50} width={50} />
			</div>
			<SkeletonLoader height={44} width={150} />
		</div>
	);
};
