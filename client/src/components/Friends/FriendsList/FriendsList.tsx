'use client';

import { getAllFriends } from '@/api/friend/friend.api';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Button, List, SectionHeader } from '@shared/ui';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { FriendItem } from './FriendItem/FriendItem';
import styles from './FriendsList.module.scss';

export const FriendsList = () => {
	const { data } = useQuery({
		queryKey: QUERY_KEYS.friends.list(),
		queryFn: getAllFriends,
	});

	return (
		<div className={styles.friends}>
			<SectionHeader
				title="My Friends"
				titleProps={{
					variant: 'h3',
				}}
			/>
			{data && (
				<>
					<Button variant="outlined" asChild>
						<Link href={PRIVATE_PAGES.FRIENDS.REQUESTS}>
							View Pending Requests
							{data?.countOfPendingRequests > 0 &&
								` (${data.countOfPendingRequests})`}
						</Link>
					</Button>
					<List
						items={data.friends}
						renderItem={(item) => <FriendItem key={item.id} friend={item} />}
						style={{
							paddingTop: '1.25rem',
						}}
					/>
				</>
			)}
		</div>
	);
};
