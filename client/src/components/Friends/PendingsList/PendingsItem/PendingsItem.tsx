'use client';

import { changeRequestStatus } from '@/api';
import { Avatar, Button } from '@/components/UI';
import { PAGES } from '@/config';
import { FRIEND_STATUS } from '@/constants';
import { useAuth } from '@/hooks';
import { IFriend, TFriendStatus } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import styles from './PendingsItem.module.scss';

interface PendingsItemProps {
	friend: IFriend;
}

const PendingsItem = ({ friend }: PendingsItemProps) => {
	const { user } = useAuth();

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: ({ id, status }: { id: string; status: TFriendStatus }) =>
			changeRequestStatus(id, status),
		mutationKey: ['pendingsChange', user?.id],
		onSuccess: () =>
			queryClient.invalidateQueries({ queryKey: ['pendings', user?.id] }),
	});

	const handleUpdate = (id: string, status: TFriendStatus) => {
		if (id) mutate({ id, status });
	};

	return (
		<div key={friend.id} className={styles['pendings-list-item']}>
			<div className={styles['pendings-list-item__user']}>
				<Avatar avatar={friend.user?.avatar} size={45} />
				<Link href={PAGES.PROFILE(friend.user.username)}>
					{friend.user.username}
				</Link>
			</div>
			<div className={styles['pendings-list-item__actions']}>
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
