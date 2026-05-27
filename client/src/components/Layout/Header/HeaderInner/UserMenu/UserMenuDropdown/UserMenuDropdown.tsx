'use client';

import {
	Button,
	DropdownContent,
	DropdownItem,
	DropdownSeparator,
} from '@/components/UI';
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
		<DropdownContent align="end" sideOffset={10} className={styles.content}>
			<UserMenuCoins />
			{USER_MAIN_LINKS(user).map((link) => (
				<MenuItem {...link} key={link.name} icon={link.icon || undefined} />
			))}
			{USER_SYSTEM_LINKS.map((link) => (
				<MenuItem {...link} key={link.name} icon={link.icon || undefined} />
			))}
			<DropdownSeparator />
			<ThemeSwitcher />
			<DropdownItem asChild>
				<Button onClick={handleLogout} fullWidth>
					Logout
				</Button>
			</DropdownItem>
		</DropdownContent>
	);
};

export default UserMenuDropdown;
