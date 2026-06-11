'use client';

import { useAuth } from '@/hooks/useAuth.hook';

export const useUserMenu = () => {
	const { logout, user } = useAuth();

	const handleLogout = () => {
		logout();
	};

	return { open, user, handleLogout };
};
