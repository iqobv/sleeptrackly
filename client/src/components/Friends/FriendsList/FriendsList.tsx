'use client';

import { getAllFriends } from '@/api';
import { Button, List, SectionHeader } from '@/components/UI';
import { PAGES, QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import FriendItem from './FriendItem/FriendItem';
import styles from './FriendsList.module.scss';

const FriendsList = () => {
	const { user } = useAuth();

	const { data } = useQuery({
		queryKey: QUERY_KEYS.friends.all(user?.id || ''),
		queryFn: getAllFriends,
		enabled: !!user?.id,
	});

	return (
		<div className={styles['friends']}>
			<SectionHeader title="My Friends" titleComponent="h3" />
			{data && user && (
				<>
					<Button href={PAGES.FRIENDS_REQUESTS} variant="outlined">
						View Pending Requests
						{data?.countOfPendingRequests > 0 &&
							` (${data.countOfPendingRequests})`}
					</Button>
					<List
						items={data.friends}
						renderItem={(item) => <FriendItem key={item.id} friend={item} />}
						style={{
							paddingTop: '20px',
						}}
					/>
				</>
			)}
		</div>
	);
};

export default FriendsList;
