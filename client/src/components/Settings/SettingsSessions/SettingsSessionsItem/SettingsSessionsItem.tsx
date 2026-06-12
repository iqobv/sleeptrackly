'use client';

import { Session } from '@/types/auth/session.types';
import { Button } from '@shared/ui';
import { SettingsSessionsDevice } from './SettingsSessionsDevice/SettingsSessionsDevice';
import { SettingsSessionsInfo } from './SettingsSessionsInfo/SettingsSessionsInfo';
import styles from './SettingsSessionsItem.module.scss';
import { useSettingsSessionsItem } from './useSettingsSessionsItem';

interface SettingsSessionsItemProps {
	session: Session;
	disableAllButton?: boolean;
	isActive?: boolean;
}

export const SettingsSessionsItem = ({
	session,
	disableAllButton = false,
	isActive = false,
}: SettingsSessionsItemProps) => {
	const {
		isTerminating,
		isTerminatingAll,
		handleTerminateAll,
		handleTerminate,
	} = useSettingsSessionsItem(session, disableAllButton);

	if (!session) return null;

	return (
		<div className={`${styles.item} ${isActive ? styles.active : ''}`}>
			<div className={styles.content}>
				<SettingsSessionsDevice deviceType={session?.deviceType || 'desktop'} />
				<SettingsSessionsInfo session={session} />
			</div>
			{isActive ? (
				<>
					{!disableAllButton && (
						<Button
							className={styles.allTerminate}
							variant="text"
							fullWidth
							onClick={handleTerminateAll}
							disabled={isTerminating || isTerminatingAll || disableAllButton}
							loading={isTerminatingAll}
						>
							Terminate all other sessions
						</Button>
					)}
				</>
			) : (
				<Button
					variant="outlined"
					onClick={handleTerminate}
					className={styles.terminate}
					disabled={isTerminating || isTerminatingAll}
					loading={isTerminating}
				>
					Terminate
				</Button>
			)}
		</div>
	);
};
