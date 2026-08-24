import { SettingsTabs } from '@/components/Settings/SettingsTabs/SettingsTabs';
import { SectionHeader } from '@shared/ui';
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
			<div>{children}</div>
		</div>
	);
}
