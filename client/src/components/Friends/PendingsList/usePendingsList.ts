'use client';

import {
	getPendingFriendRequests,
	updateManyPendingRequests,
} from '@/api/friend/friend.api';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useAuth } from '@/hooks/useAuth.hook';
import { FriendStatus } from '@/types/friend/friendStatus.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const usePendingsList = () => {
	const router = useRouter();

	const { user } = useAuth();

	const { data, refetch } = useQuery({
		queryFn: getPendingFriendRequests,
		queryKey: QUERY_KEYS.friends.pendings(user?.id || ''),
		staleTime: 0,
		enabled: !!user?.id,
	});

	const { mutate: mutateMany } = useMutation({
		mutationFn: ({ status }: { status: FriendStatus }) =>
			updateManyPendingRequests(status),
		mutationKey: QUERY_KEYS.friends.pendingsManyChange(user?.id || ''),
		onSuccess: () => {
			refetch();
			router.push(PRIVATE_PAGES.FRIENDS.ALL);
		},
	});

	const handleUpdateMany = (status: FriendStatus) => {
		if (data && data.countOfPendingRequests > 0) mutateMany({ status });
	};

	return {
		data,
		handleUpdateMany,
	};
};
