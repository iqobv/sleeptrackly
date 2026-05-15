import { SettingsTabs } from '@/components/Settings';
import { SectionHeader } from '@/components/UI';
import styles from './settingsLayout.module.scss';

export default function SettingsLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className={`${styles.container} container`}>
			<div>
				<SectionHeader title="Settings" />
				<SettingsTabs />
			</div>
			<div className={styles.content}>{children}</div>
		</div>
	);
}
