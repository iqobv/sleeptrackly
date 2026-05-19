'use client';

import { Button, List, SectionHeader } from '@/components/UI';
import { FRIEND_STATUS } from '@/constants';
import PendingsItem from './PendingsItem/PendingsItem';
import styles from './PendingsList.module.scss';
import { usePendingsList } from './usePendingsList';

const PendingsList = () => {
	const { data, handleUpdateMany } = usePendingsList();

	return (
		<div>
			<SectionHeader title="Friends Requests" titleComponent="h3" />
			<div className={styles.buttons}>
				<Button
					className={styles.button}
					onClick={() => handleUpdateMany(FRIEND_STATUS.ACCEPTED)}
				>
					Accept All
				</Button>
				<Button
					className={styles.button}
					onClick={() => handleUpdateMany(FRIEND_STATUS.REJECTED)}
					variant="outlined"
				>
					Reject All
				</Button>
			</div>
			<div className={styles.list}>
				{data && data.length === 0 && (
					<SectionHeader
						description="You don't have any friends requests"
						descriptionClassName={styles.empty}
					/>
				)}
				{data && (
					<List
						items={data}
						renderItem={(friend) => (
							<PendingsItem key={friend.id} friend={friend} />
						)}
					/>
				)}
			</div>
		</div>
	);
};

export default PendingsList;
