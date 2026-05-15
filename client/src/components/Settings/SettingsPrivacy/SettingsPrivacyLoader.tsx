import { SkeletonLoader } from '@/components/UI';
import styles from '../SettingsForm/SettingsForm.module.scss';

const cards = Array.from({ length: 4 }, (_, i) => i);

const SettingsPrivacyLoader = () => {
	return (
		<div className={styles.form}>
			{cards.map((_, i) => (
				<SkeletonLoader key={i} height={70} />
			))}
		</div>
	);
};

export default SettingsPrivacyLoader;
