'use client';

import { Button } from '@/components/UI';
import { useAuth, useBlockScroll } from '@/hooks';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import MenuItem from './MenuItem/MenuItem';
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

	const handleLogout = () => {
		setOpen(false);
		logout();
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	}, []);

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
					{USER_MENU_LINKS.map((link) => (
						<MenuItem item={link} key={link.label} onClick={handleOpen} />
					))}
					<Button onClick={handleLogout} fullWidth>
						Logout
					</Button>
				</div>
			)}
		</div>
	);
};

export default UserMenu;
