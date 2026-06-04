'use client';

import { sendFriendRequest } from '@/api';
import { Avatar, Button } from '@/components/UI';
import { PAGES, QUERY_KEYS } from '@/config';
import { SearchUser } from '@/types';
import { useMutation } from '@tanstack/react-query';
import Link from 'next/link';
import { toast } from 'react-toastify';
import styles from './AddFriendItem.module.scss';

interface AddFriendItemProps {
	user: SearchUser;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}

export const AddFriendItem = ({ user, setSearch }: AddFriendItemProps) => {
	const { mutate } = useMutation({
		mutationFn: () => sendFriendRequest(user.id),
		mutationKey: QUERY_KEYS.friends.sendFriendRequest(user.id),
		onSuccess() {
			toast.success('Friend request sent');
			setSearch('');
		},
		onError(error) {
			toast.error(error.message);
		},
	});

	return (
		<div className={styles.item}>
			<div className={styles.info}>
				<Avatar avatar={user?.avatar?.url} size={50} />
				<Link href={PAGES.PROFILE(user.username)} className={styles.username}>
					{user.username}
				</Link>
			</div>
			<Button onClick={() => mutate()}>Add</Button>
		</div>
	);
};
