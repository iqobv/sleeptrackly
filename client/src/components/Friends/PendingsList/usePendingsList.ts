'use client';

import {
	getPendingFriendRequests,
	updateManyPendingRequests,
} from '@/api/friend/friend.api';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { FriendStatus } from '@/types/friend/friendStatus.types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const usePendingsList = () => {
	const router = useRouter();

	const { data, refetch } = useQuery({
		queryFn: getPendingFriendRequests,
		queryKey: QUERY_KEYS.friends.pendings(),
		staleTime: 0,
	});

	const { mutate: mutateMany } = useMutation({
		mutationFn: ({ status }: { status: FriendStatus }) =>
			updateManyPendingRequests(status),
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
