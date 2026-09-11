'use client';

import { sendFriendRequest } from '@/api/friend/friend.api';
import { UserAvatar } from '@/components/UI';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { SearchUser } from '@/types/user/user.types';
import { Button } from '@shared/ui';
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
				<UserAvatar avatarPath={user?.avatar?.url} size={50} />
				<Link
					href={PRIVATE_PAGES.PROFILE(user.username)}
					className={styles.username}
				>
					{user.username}
				</Link>
			</div>
			<Button onClick={() => mutate()}>Add</Button>
		</div>
	);
};
