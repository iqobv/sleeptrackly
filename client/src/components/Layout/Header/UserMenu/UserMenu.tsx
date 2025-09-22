'use client';

import { Button, Divider } from '@/components/UI';
import { useAuth, useBlockScroll } from '@/hooks';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import MenuItem from './MenuItem/MenuItem';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';
import styles from './UserMenu.module.scss';
import { USER_MENU_LINKS } from './userManuLinks';

const UserMenu = () => {
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);
	useBlockScroll(open);
	const { logout, user } = useAuth();

	const handleOpen = () => setOpen(!open);

	const handleClickOutside = (event: MouseEvent) => {
		if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
			setOpen(false);
		}
	};

	const handleCloseOnEscape = (event: KeyboardEvent) => {
		if (event.key === 'Escape') setOpen(false);
	};

	const handleLogout = () => {
		setOpen(false);
		logout();
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		document.addEventListener('keydown', handleCloseOnEscape, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
			document.removeEventListener('keydown', handleCloseOnEscape, true);
		};
	}, []);

	if (!user) return null;

	return (
		<div className={styles['user-menu']} ref={menuRef}>
			<button onClick={handleOpen} className={styles['user-menu__btn']}>
				<Image
					src={`/api/images/${user?.avatar?.url || 'default-avatar.png'}`}
					alt="avatar"
					className={styles['user-menu__avatar']}
					width={40}
					height={40}
					priority
				/>
			</button>
			{open && (
				<div className={styles['user-menu__dropdown']}>
					{USER_MENU_LINKS(user).map(({ label, name, path, icon }) => (
						<MenuItem
							icon={icon}
							label={label}
							key={name}
							path={path}
							onClick={handleOpen}
						/>
					))}
					<Divider />
					<ThemeSwitcher />
					<Button onClick={handleLogout} fullWidth>
						Logout
					</Button>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
