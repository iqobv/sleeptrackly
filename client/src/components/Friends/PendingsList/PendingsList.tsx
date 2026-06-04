'use client';

import { Button, List, SectionHeader, Typography } from '@/components/UI';
import { FriendStatus } from '@/types';
import { PendingsItem } from './PendingsItem/PendingsItem';
import styles from './PendingsList.module.scss';
import { usePendingsList } from './usePendingsList';

export const PendingsList = () => {
	const { data, handleUpdateMany } = usePendingsList();

	return (
		<div>
			<SectionHeader
				title="Friends Requests"
				titleProps={{
					variant: 'h3',
				}}
				showBackButton
			/>
			<div className={styles.buttons}>
				<Button
					className={styles.button}
					onClick={() => handleUpdateMany(FriendStatus.ACCEPTED)}
				>
					Accept All
				</Button>
				<Button
					className={styles.button}
					onClick={() => handleUpdateMany(FriendStatus.REJECTED)}
					variant="outlined"
				>
					Reject All
				</Button>
			</div>
			<div className={styles.list}>
				{data && data.countOfPendingRequests === 0 && (
					<Typography>You don&apos;t have any friends requests</Typography>
				)}
				{data && (
					<List
						items={data.friends}
						renderItem={(friend) => (
							<PendingsItem key={friend.id} friend={friend} />
						)}
					/>
				)}
			</div>
		</div>
	);
};
