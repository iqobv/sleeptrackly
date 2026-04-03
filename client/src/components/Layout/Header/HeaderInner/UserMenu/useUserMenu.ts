'use client';

import { useAuth } from '@/hooks';
import { useState } from 'react';

export const useUserMenu = () => {
	const [open, setOpen] = useState(false);

	const { logout, user } = useAuth();

	const onClose = () => setOpen(!open);

	const handleLogout = () => {
		setOpen(false);
		logout();
	};

	return { open, user, onClose, handleLogout };
};
