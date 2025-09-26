'use client';

import { ISession } from '@/types';
import { capitalize } from '@/utils';
import Image from 'next/image';
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
			<p className={styles['settings-sessions-info__browser']}>
				{session.browserName && `${session.browserName}`}
				{session.browserVersion && `, ${session.browserVersion}`}
			</p>
			<div className={styles['settings-sessions-info__location']}>
				{session.countryCode && (
					<Image
						src={`https://flagsapi.com/${session.countryCode}/flat/64.png`}
						width={24}
						height={24}
						alt="flag"
					/>
				)}
				<p>
					{session.city && `, ${session.city}`}
					{session.region && `, ${session.region}`}
					{session.country && `, ${session.country}`}
				</p>
			</div>
		</div>
	);
};

export default SettingsSessionsInfo;
