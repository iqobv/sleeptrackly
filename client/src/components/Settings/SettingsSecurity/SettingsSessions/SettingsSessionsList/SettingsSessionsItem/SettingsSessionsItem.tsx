'use client';

import { Button } from '@/components/UI';
import { ISession } from '@/types';
import SettingsSessionsDevice from './SettingsSessionsDevice/SettingsSessionsDevice';
import SettingsSessionsInfo from './SettingsSessionsInfo/SettingsSessionsInfo';
import styles from './SettingsSessionsItem.module.scss';
import { useSettingsSessionsItem } from './useSettingsSessionsItem';

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

export default SettingsSessionsItem;
