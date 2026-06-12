'use client';

import { QUERY_KEYS } from '@/config/queryClient.config';
import { useAuth } from '@/hooks/useAuth.hook';
import { Friend } from '@/types/friend/friend.types';
import { Button, DropdownItem } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { FriendItemMenu } from './friendItemMenu';

interface FriendItemMenuProps {
	item: FriendItemMenu;
	friend: Friend;
}

export const FriendItemMenuButton = ({ item, friend }: FriendItemMenuProps) => {
	const { user } = useAuth();

	const queryClient = useQueryClient();

	const { mutate } = useMutation({
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
		<DropdownItem onClick={handleClick} asChild>
			<Button
				fullWidth
				variant="text"
				style={{ justifyContent: 'flex-start', padding: '0.75rem 0.625rem' }}
			>
				{item.label}
			</Button>
		</DropdownItem>
	);
};
