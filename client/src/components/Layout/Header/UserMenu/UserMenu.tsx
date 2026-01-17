'use client';

import NotificationsButton from '@/components/Notification/NotificationsButton/NotificationsButton';
import { Avatar, Button, Divider } from '@/components/UI';
import MenuItem from './MenuItem/MenuItem';
import ThemeSwitcher from './ThemeSwitcher/ThemeSwitcher';
import { USER_MAIN_LINKS, USER_SYSTEM_LINKS } from './userManuLinks';
import styles from './UserMenu.module.scss';
import UserMenuCoins from './UserMenuCoins/UserMenuCoins';
import { useUserMenu } from './useUserMenu';

const UserMenu = () => {
	const userMenuData = useUserMenu();

	if (!userMenuData) return null;

	const { menuRef, open, user, handleOpen, handleLogout } = userMenuData;

	return (
		<div className={styles['user-menu__controls']}>
			<NotificationsButton />
			<div className={styles['user-menu__wrapper']} ref={menuRef}>
				<button onClick={handleOpen} className={styles['user-menu__btn']}>
					<Avatar avatar={user.avatar?.url} size={40} priority />
				</button>
				{open && (
					<div className={styles['user-menu__dropdown']}>
						<UserMenuCoins />
						{USER_MAIN_LINKS(user).map((link) => (
							<MenuItem
								{...link}
								key={link.name}
								onClick={handleOpen}
								icon={link.icon || undefined}
							/>
						))}
						{USER_SYSTEM_LINKS.map((link) => (
							<MenuItem
								{...link}
								key={link.name}
								onClick={handleOpen}
								icon={link.icon || undefined}
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
		</div>
	);
};

export default UserMenu;
