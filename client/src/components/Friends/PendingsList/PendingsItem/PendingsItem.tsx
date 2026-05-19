'use client';

import { changeRequestStatus } from '@/api';
import { Avatar, Button } from '@/components/UI';
import { PAGES, QUERY_KEYS } from '@/config';
import { FRIEND_STATUS } from '@/constants';
import { useAuth } from '@/hooks';
import { Friend, FriendStatus } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import styles from './PendingsItem.module.scss';

interface PendingsItemProps {
	friend: Friend;
}

const PendingsItem = ({ friend }: PendingsItemProps) => {
	const { user } = useAuth();

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: ({ id, status }: { id: string; status: FriendStatus }) =>
			changeRequestStatus(id, status),
		mutationKey: QUERY_KEYS.friends.pendingsChange(user?.id || ''),
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.friends.pendings(user?.id || ''),
			}),
	});

	const handleUpdate = (id: string, status: FriendStatus) => {
		if (id) mutate({ id, status });
	};

	return (
		<div key={friend.id} className={styles.item}>
			<div className={styles.user}>
				<Avatar avatar={friend.user?.avatar} size={45} />
				<Link href={PAGES.PROFILE(friend.user.username)}>
					{friend.user.username}
				</Link>
			</div>
			<div className={styles.actions}>
				<Button
					fullWidth
					onClick={() => handleUpdate(friend.id, FRIEND_STATUS.ACCEPTED)}
				>
					Accept
				</Button>
				<Button
					variant="outlined"
					fullWidth
					onClick={() => handleUpdate(friend.id, FRIEND_STATUS.REJECTED)}
				>
					Reject
				</Button>
			</div>
		</div>
	);
};

export default PendingsItem;
