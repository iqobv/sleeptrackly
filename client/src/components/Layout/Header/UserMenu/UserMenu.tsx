'use client';

import { Avatar, Button, Divider } from '@/components/UI';
import MenuItem from './MenuItem/MenuItem';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';
import { USER_MENU_LINKS } from './userManuLinks';
import styles from './UserMenu.module.scss';
import { useUserMenu } from './useUserMenu';

const UserMenu = () => {
	const userMenuData = useUserMenu();

	if (!userMenuData) return null;

	const { menuRef, open, user, handleOpen, handleLogout } = userMenuData;

	return (
		<div className={styles['user-menu']} ref={menuRef}>
			<button onClick={handleOpen} className={styles['user-menu__btn']}>
				<Avatar avatar={user.avatar?.url} size={40} priority />
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
