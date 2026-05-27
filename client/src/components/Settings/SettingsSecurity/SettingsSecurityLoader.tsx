import { SkeletonLoader } from '@/components/UI';
import styles from './SettingsSecurity.module.scss';

const cards = Array.from({ length: 3 }, (_, i) => i);

export const SettingsSecurityLoader = () => {
	return (
		<div className={styles.settingsSecurity}>
			{cards.map((_, i) => (
				<SkeletonLoader key={i} height={70} />
			))}
		</div>
	);
};
