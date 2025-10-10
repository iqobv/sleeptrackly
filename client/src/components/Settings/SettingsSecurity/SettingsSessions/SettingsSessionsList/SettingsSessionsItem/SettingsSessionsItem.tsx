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
	disableAllButton?: boolean;
	isActive?: boolean;
}

const SettingsSessionsItem = ({
	session,
	disableAllButton = false,
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

	const handleTerminateAll = () => {
		if (!disableAllButton) terminateAll();
	};

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
				<>
					{!disableAllButton && (
						<Button
							variant="text"
							className={styles['settings-sessions-item__all-terminate']}
							fullWidth
							onClick={handleTerminateAll}
							disabled={isTerminating || isTerminatingAll || disableAllButton}
						>
							Terminate all other sessions
						</Button>
					)}
				</>
			) : (
				<Button
					variant="outlined"
					onClick={() => terminate()}
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
