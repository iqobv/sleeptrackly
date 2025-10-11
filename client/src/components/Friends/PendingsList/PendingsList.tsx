'use client';

import { Button, SectionHeader } from '@/components/UI';
import { FRIEND_STATUS } from '@/constants';
import PendingsItem from './PendingsItem/PendingsItem';
import styles from './PendingsList.module.scss';
import { usePendingsList } from './usePendingsList';

const PendingsList = () => {
	const { data, handleUpdateMany } = usePendingsList();

	return (
		<div className={styles['pendings-list']}>
			<SectionHeader title="Friends Requests" titleComponent="h3" />
			<div className={styles['pendings-list__buttons']}>
				<Button
					className={styles['pendings-list__button']}
					onClick={() => handleUpdateMany(FRIEND_STATUS.ACCEPTED)}
				>
					Accept All
				</Button>
				<Button
					className={styles['pendings-list__button']}
					onClick={() => handleUpdateMany(FRIEND_STATUS.REJECTED)}
					variant="outlined"
				>
					Reject All
				</Button>
			</div>
			<div className={styles['pendings-list__list']}>
				{data && data.length === 0 && (
					<SectionHeader
						description="You don't have any friends requests"
						descriptionClassName={styles['pendings-list__empty']}
					/>
				)}
				{data && data.map((el) => <PendingsItem key={el.id} friend={el} />)}
			</div>
		</div>
	);
};

export default PendingsList;
