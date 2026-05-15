'use client';

import { Button } from '@/components/UI';
import { FriendItemMenu } from '../friendItemMenu';

import { QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { Friend } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import styles from './FriendItemMenu.module.scss';

interface FriendItemMenuProps {
	item: FriendItemMenu;
	friend: Friend;
}

const FriendItemMenuButton = ({ item, friend }: FriendItemMenuProps) => {
	const { user } = useAuth();

	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: item.mutationFn,
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: QUERY_KEYS.friends.all(user?.id || ''),
			});
			toast.success(item.successText);
		},
		onError: (error) => {
			toast.error((error as Error).message);
		},
	});

	const handleClick = () => mutate(friend.id);

	return (
		<Button
			variant="text"
			fullWidth
			className={styles['friend-item-menu__item']}
			onClick={handleClick}
			loading={isPending}
			key={item.label}
		>
			{item.label}
		</Button>
	);
};

export default FriendItemMenuButton;
