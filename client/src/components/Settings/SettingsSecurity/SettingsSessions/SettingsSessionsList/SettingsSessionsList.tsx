'use client';

import { getAllSessions } from '@/api';
import { Divider, SectionHeader } from '@/components/UI';
import { useAuth } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import SettingsSessionsItem from './SettingsSessionsItem/SettingsSessionsItem';
import styles from './SettingsSessionsList.module.scss';
import SettingsSessionsLoader from './SettingsSessionsLoader/SettingsSessionsLoader';

const SettingsSessionsList = () => {
	const { user } = useAuth();
	const router = useRouter();

	const {
		data: sessions,
		isLoading,
		error,
	} = useQuery({
		queryFn: getAllSessions,
		queryKey: ['sessions', user?.id],
		enabled: !!user,
		gcTime: 0,
		retry: false,
	});

	useEffect(() => {
		if (error?.message === 'Forbidden resource') router.refresh();
	}, [error, router]);

	return (
		<div className={styles['settings-sessions']}>
			{isLoading && <SettingsSessionsLoader />}
			{!isLoading && sessions && (
				<>
					<div>
						<SectionHeader
							title="Current Session"
							description="Your current session"
							titleComponent="h3"
							containerClassName={styles['settings-sessions__header']}
						/>
						<SettingsSessionsItem
							session={sessions.find((s) => s.current) || sessions[0]}
							disableAllButton={sessions.length < 2}
							isActive
						/>
					</div>
					{sessions.length >= 2 && (
						<>
							<Divider />
							<div>
								<SectionHeader
									title="Other Sessions"
									description="Your other sessions"
									titleComponent="h3"
									containerClassName={styles['settings-sessions__header']}
								/>
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
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default SettingsSessionsList;
