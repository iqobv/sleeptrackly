'use client';

import { getPendingFriendRequests, updateManyPendingRequests } from '@/api';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { FriendStatus } from '@/types';
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
		if (data && data.length > 0) mutateMany({ status });
	};

	return {
		data,
		handleUpdateMany,
	};
};
