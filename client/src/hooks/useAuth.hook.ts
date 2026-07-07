'use client';

import { logout as apiLogout } from '@/api/auth/auth.api';
import { useUserStore } from '@/store/useUser.store';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useAuth = () => {
	const queryClient = useQueryClient();

	const [isloading, setIsLoading] = useState(true);
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const router = useRouter();

	const user = useUserStore((state) => state.user);
	const setUser = useUserStore((state) => state.setUser);
	const storeLogout = useUserStore((state) => state.logout);

	useEffect(() => {
		setIsAuthenticated(!!user?.id);
		setIsLoading(false);
	}, [user]);

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
		user,
		isloading,
		setUser,
		logout,
	};
};
