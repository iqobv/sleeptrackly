'use client';

import { useAuth } from '@/hooks';

export const useUserMenu = () => {
	const { logout, user } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return { open, user, handleLogout };
};
