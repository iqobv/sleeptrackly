'use client';

import { logout as apiLogout } from '@/api/auth/auth.api';
import { useUserStore } from '@/store/useUser.store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

export const useAuth = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	const user = useUserStore((state) => state.user);
	const setUser = useUserStore((state) => state.setUser);
	const storeLogout = useUserStore((state) => state.logout);

	const isAuthenticated = !!user?.id;
	const isloading = user === undefined;

	const { mutate: logout } = useMutation({
		mutationFn: apiLogout,
		onSuccess: () => {
			storeLogout();
			router.refresh();
			queryClient.clear();
		},
	});

	return {
		isAuthenticated,
		isloading,
		user,
		setUser,
		logout,
	};
};
