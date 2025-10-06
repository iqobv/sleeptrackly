'use client';

import { getAllFriends } from '@/api';
import { Button, SectionHeader } from '@/components/UI';
import { PAGES } from '@/config';
import { useAuth } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import FriendItem from './FriendItem/FriendItem';
import styles from './FriendsList.module.scss';

const FriendsList = () => {
	const { user } = useAuth();

	const { data } = useQuery({
		queryKey: ['friends', user?.id],
		queryFn: getAllFriends,
		enabled: !!user?.id,
	});

	return (
		<div className={styles['friends']}>
			<SectionHeader title="My Friends" titleComponent="h3" />
			{data && (
				<>
					<Button href={PAGES.FRIENDS_REQUESTS} variant="outlined">
						View Pending Requests
						{data?.countOfPendingRequests > 0 &&
							` (${data.countOfPendingRequests})`}
					</Button>
					<ul className={styles['friends__list']}>
						{data.friends.map((friend) => (
							<FriendItem key={friend.id} friend={friend} />
						))}
					</ul>
				</>
			)}
		</div>
	);
};

export default FriendsList;
