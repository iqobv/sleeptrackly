'use client';

import { logout as apiLogout, getUser } from '@/api/auth/auth.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { User } from '@shared/types';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const { data: user, isLoading } = useQuery({
		queryKey: QUERY_KEYS.user.me(),
		queryFn: getUser,
		retry: false,
		staleTime: 1000 * 60 * 5,
	});

	const isAuthenticated = !!user?.id;

	const { mutate: logout } = useMutation({
		mutationFn: apiLogout,
		onSuccess: () => {
			queryClient.clear();
			router.refresh();
		},
	});

	const setUser = (user: User) => {
		queryClient.setQueryData(QUERY_KEYS.user.me(), user);
	};

	return {
		isAuthenticated,
		isLoading,
		user,
		setUser,
		logout,
	};
};
