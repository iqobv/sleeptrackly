'use client';

import { useAuth, useBlockScroll } from '@/hooks';
import { useEffect, useRef, useState } from 'react';

export const useUserMenu = () => {
	const menuRef = useRef<HTMLDivElement>(null);

	const [open, setOpen] = useState(false);

	const { logout, user } = useAuth();
	useBlockScroll(open);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setOpen(false);
			}
		};

		document.addEventListener('click', handleClickOutside, true);
		document.addEventListener('keydown', handleCloseOnEscape, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
			document.removeEventListener('keydown', handleCloseOnEscape, true);
		};
	}, []);

	const handleOpen = () => setOpen(!open);

	const handleCloseOnEscape = (event: KeyboardEvent) => {
		if (event.key === 'Escape') setOpen(false);
	};

	const handleLogout = () => {
		setOpen(false);
		logout();
	};

	if (!user) return null;

	return { menuRef, open, user, handleOpen, handleLogout };
};
