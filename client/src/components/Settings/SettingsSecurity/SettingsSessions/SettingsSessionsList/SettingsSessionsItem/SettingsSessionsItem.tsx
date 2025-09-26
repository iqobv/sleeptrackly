'use client';

import { terminateAllSessions, terminateSession } from '@/api';
import { Button } from '@/components/UI';
import { useAuth } from '@/hooks';
import { ISession } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import SettingsSessionsDevice from './SettingsSessionsDevice/SettingsSessionsDevice';
import SettingsSessionsInfo from './SettingsSessionsInfo/SettingsSessionsInfo';
import styles from './SettingsSessionsItem.module.scss';

interface SettingsSessionsItemProps {
	session: ISession;
	isActive?: boolean;
}

const SettingsSessionsItem = ({
	session,
	isActive = false,
}: SettingsSessionsItemProps) => {
	const queryClient = useQueryClient();
	const { user } = useAuth();

	const { mutate: terminate, isPending: isTerminating } = useMutation({
		mutationFn: () => terminateSession(session.id),
		mutationKey: ['terminateSession', session.id],
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['sessions', user?.id] });
			toast.success('Session terminated');
		},
	});

	const { mutate: terminateAll, isPending: isTerminatingAll } = useMutation({
		mutationFn: () => terminateAllSessions(isActive ? session.id : ''),
		mutationKey: ['terminateAllSessions', session.id],
		onSuccess() {
			queryClient.invalidateQueries({ queryKey: ['sessions', user?.id] });
			toast.success('All other sessions terminated');
		},
	});

	if (!session) return null;

	return (
		<div
			className={`${styles['settings-sessions-item']} ${
				isActive ? styles['settings-sessions-item--active'] : ''
			}`}
		>
			<div className={styles['settings-sessions-item__content']}>
				<SettingsSessionsDevice deviceType={session?.deviceType || 'desktop'} />
				<SettingsSessionsInfo session={session} />
			</div>
			{isActive ? (
				<Button
					variant="text"
					className={styles['settings-sessions-item__all-terminate']}
					fullWidth
					onClick={terminateAll}
					disabled={isTerminating || isTerminatingAll}
				>
					Terminate all other sessions
				</Button>
			) : (
				<Button
					variant="outlined"
					onClick={terminate}
					className={styles['settings-sessions-item__terminate']}
					disabled={isTerminating || isTerminatingAll}
				>
					Terminate
				</Button>
			)}
		</div>
	);
};

export default SettingsSessionsItem;
