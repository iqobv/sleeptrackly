'use client';

import { ISession } from '@/types';
import { capitalize } from '@/utils';
import styles from './SettingsSessionsInfo.module.scss';

interface SettingsSessionsInfoProps {
	session: ISession;
}

const SettingsSessionsInfo = ({ session }: SettingsSessionsInfoProps) => {
	return (
		<div className={styles['settings-sessions-info']}>
			<p className={styles['settings-sessions-info__device-type']}>
				{session.deviceType ? capitalize(session.deviceType) : 'Desktop'}
			</p>
			<p className={styles['settings-sessions-info__text']}>
				{session.browserName && `${session.browserName}`}
				{session.browserVersion && `, ${session.browserVersion}`}
			</p>
			<div className={styles['settings-sessions-info__text']}>
				{session.city && `${session.city}`}
				{session.country && `, ${session.country}`}
			</div>
		</div>
	);
};

export default SettingsSessionsInfo;
