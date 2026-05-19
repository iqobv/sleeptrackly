'use client';

import { Button, Dropdown } from '@/components/UI';
import { User } from '@/types';
import MenuItem from '../MenuItem/MenuItem';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import UserMenuCoins from '../UserMenuCoins/UserMenuCoins';
import { USER_MAIN_LINKS, USER_SYSTEM_LINKS } from './userManuLinks';
import styles from './UserMenuDropdown.module.scss';

interface UserMenuDropdownProps {
	handleLogout: () => void;
	user: User;
}

const UserMenuDropdown = ({ handleLogout, user }: UserMenuDropdownProps) => {
	return (
		<Dropdown.Content align="end" sideOffset={10} className={styles.content}>
			<UserMenuCoins />
			{USER_MAIN_LINKS(user).map((link) => (
				<MenuItem {...link} key={link.name} icon={link.icon || undefined} />
			))}
			{USER_SYSTEM_LINKS.map((link) => (
				<MenuItem {...link} key={link.name} icon={link.icon || undefined} />
			))}
			<Dropdown.Separator />
			<ThemeSwitcher />
			<Dropdown.Item asChild>
				<Button onClick={handleLogout} fullWidth>
					Logout
				</Button>
			</Dropdown.Item>
		</Dropdown.Content>
	);
};

export default UserMenuDropdown;
