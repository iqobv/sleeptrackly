'use client';

import { ISession } from '@/types';
import { capitalize } from '@/utils';
import styles from './SettingsSessionsInfo.module.scss';

interface SettingsSessionsInfoProps {
	session: ISession;
}

const SettingsSessionsInfo = ({ session }: SettingsSessionsInfoProps) => {
	const countryNameInEnglish = new Intl.DisplayNames(['en'], {
		type: 'region',
	});

	return (
		<div className={styles.info}>
			<p className={styles.deviceType}>
				{session.deviceType ? capitalize(session.deviceType) : 'Desktop'}
			</p>
			<p className={styles.text}>
				{session.browserName && `${session.browserName}`}
				{session.browserVersion && `, ${session.browserVersion}`}
			</p>
			<div className={styles.text}>
				{session.city && `${session.city}`}
				{session.countryCode &&
					`, ${countryNameInEnglish.of(session.countryCode)}`}
			</div>
		</div>
	);
};

export default SettingsSessionsInfo;
