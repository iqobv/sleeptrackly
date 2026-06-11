'use client';

import { logout as apiLogout } from '@/api/auth/auth.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { useUserStore } from '@/store/useUser.store';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useAuth = () => {
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
		mutationKey: QUERY_KEYS.auth.logout(user?.id || ''),
		onSuccess: () => {
			storeLogout();
			router.refresh();
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
