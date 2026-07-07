'use client';

import { getAllSessions } from '@/api/auth/session.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { BackButton, Divider, List, SectionHeader } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { QrScanModal } from '../SettingsSecurity/QrScanModal/QrScanModal';
import styles from './SettingsSessions.module.scss';
import { SettingsSessionsItem } from './SettingsSessionsItem/SettingsSessionsItem';
import { SettingsSessionsLoader } from './SettingsSessionsLoader';

export const SettingsSessions = () => {
	const router = useRouter();

	const {
		data: sessions,
		isLoading,
		error,
	} = useQuery({
		queryFn: getAllSessions,
		queryKey: QUERY_KEYS.sessions.list(),
		gcTime: 0,
		retry: false,
	});

	useEffect(() => {
		if (error?.message === 'Forbidden resource') router.refresh();
	}, [error, router]);

	return (
		<div className={styles.sessions}>
			{isLoading && <SettingsSessionsLoader />}
			{!isLoading && sessions && (
				<>
					<div>
						<div className={styles.actions}>
							<BackButton onClick={() => router.back()} />
							<QrScanModal />
						</div>
						<SectionHeader
							title="Current Session"
							description="Your current session"
							titleProps={{
								variant: 'h2',
							}}
							gap={3}
						/>
						<SettingsSessionsItem
							session={sessions.find((s) => s.isCurrent) || sessions[0]}
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
									titleProps={{
										variant: 'h3',
									}}
									gap={3}
								/>
								<List
									items={sessions}
									className={styles.list}
									renderItem={(session) => (
										<React.Fragment key={session.id}>
											{!session.isCurrent && (
												<SettingsSessionsItem
													key={session.id}
													session={session}
												/>
											)}
										</React.Fragment>
									)}
								/>
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};
