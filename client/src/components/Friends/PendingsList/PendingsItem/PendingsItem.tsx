'use client';

import { changeRequestStatus } from '@/api/friend/friend.api';
import { UserAvatar } from '@/components/UI';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { FriendRequest } from '@/types/friend/friend.types';
import { FriendStatus } from '@/types/friend/friendStatus.types';
import { Button } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import styles from './PendingsItem.module.scss';

interface PendingsItemProps {
	friend: FriendRequest;
}

export const PendingsItem = ({ friend }: PendingsItemProps) => {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: ({ id, status }: { id: string; status: FriendStatus }) =>
			changeRequestStatus(id, status),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.friends.pendings(),
			});
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.friends.list(),
			});
		},
	});

	const handleUpdate = (id: string, status: FriendStatus) => {
		if (id) mutate({ id, status });
	};

	return (
		<div key={friend.id} className={styles.item}>
			<div className={styles.user}>
				<UserAvatar avatarPath={friend.user?.avatar} size={45} />
				<Link href={PRIVATE_PAGES.PROFILE(friend.user.username)}>
					{friend.user.username}
				</Link>
			</div>
			<div className={styles.actions}>
				<Button
					fullWidth
					onClick={() => handleUpdate(friend.id, FriendStatus.ACCEPTED)}
				>
					Accept
				</Button>
				<Button
					variant="outlined"
					fullWidth
					onClick={() => handleUpdate(friend.id, FriendStatus.REJECTED)}
				>
					Reject
				</Button>
			</div>
		</div>
	);
};
