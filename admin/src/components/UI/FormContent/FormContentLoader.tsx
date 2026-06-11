import { SkeletonLoader } from '@shared/ui';
import styles from './FormContent.module.scss';

interface FormContentLoaderProps {
	children: React.ReactNode;
	isEdit?: boolean;
}

export const FormContentLoader = ({
	children,
	isEdit = false,
}: FormContentLoaderProps) => (
	<div className={styles.fields}>
		{children}
		<div className={styles.buttons}>
			{isEdit && <SkeletonLoader height="2.75rem" width="5.3125rem" />}
			<SkeletonLoader width="10rem" height="2.75rem" />
		</div>
	</div>
);
