'use client';

import { changeRequestStatus } from '@/api/friend/friend.api';
import { UserAvatar } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useAuth } from '@/hooks/useAuth.hook';
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
				<UserAvatar avatarPath={friend.user?.avatar} size={45} />
				<Link href={PAGES.PROFILE(friend.user.username)}>
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
