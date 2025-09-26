'use client';

import { getAllSessions } from '@/api';
import { Divider } from '@/components/UI';
import { useAuth } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import React from 'react';
import SettingsSessionsItem from './SettingsSessionsItem/SettingsSessionsItem';
import styles from './SettingsSessionsList.module.scss';
import SettingsSessionsLoader from './SettingsSessionsLoader/SettingsSessionsLoader';

const SettingsSessionsList = () => {
	const { user } = useAuth();

	const { data: sessions, isLoading } = useQuery({
		queryFn: getAllSessions,
		queryKey: ['sessions', user?.id],
		enabled: !!user,
	});

	return (
		<div className={styles['settings-sessions']}>
			{isLoading && <SettingsSessionsLoader />}
			{!isLoading && sessions && (
				<>
					<SettingsSessionsItem
						session={sessions.find((s) => s.current) || sessions[0]}
						isActive
					/>
					{sessions.length >= 2 && (
						<>
							<Divider />
							<div className={styles['settings-sessions__list']}>
								{sessions.map((session) => (
									<React.Fragment key={session.id}>
										{!session.current && (
											<SettingsSessionsItem
												key={session.id}
												session={session}
											/>
										)}
									</React.Fragment>
								))}
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default SettingsSessionsList;
