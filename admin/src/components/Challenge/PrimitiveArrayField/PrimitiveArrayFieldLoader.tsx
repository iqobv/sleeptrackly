import { SkeletonLoader } from '@shared/ui';
import styles from './PrimitiveArrayField.module.scss';

interface PrimitiveArrayFieldLoaderProps {
	rows?: number;
}

export const PrimitiveArrayFieldLoader = ({
	rows = 1,
}: PrimitiveArrayFieldLoaderProps) => {
	return (
		<div className={styles.fieldset}>
			<SkeletonLoader height={18} width={90} />
			<div className={styles.list}>
				{Array.from({ length: rows }).map((_, i) => (
					<div key={i} className={styles.item}>
						<div style={{ width: '100%' }}>
							<SkeletonLoader height={45} />
						</div>
						<SkeletonLoader height={46} width={46} />
					</div>
				))}
			</div>
			<SkeletonLoader width={150} height={44} />
		</div>
	);
};
