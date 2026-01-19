'use client';

import { Button, Divider, Dropdown } from '@/components/UI';
import { IUser } from '@/types';
import MenuItem from '../MenuItem/MenuItem';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import UserMenuCoins from '../UserMenuCoins/UserMenuCoins';
import { USER_MAIN_LINKS, USER_SYSTEM_LINKS } from './userManuLinks';
import styles from './UserMenuDropdown.module.scss';

interface UserMenuDropdownProps {
	isOpen: boolean;
	onClose: () => void;
	handleLogout: () => void;
	user: IUser;
	buttonRef: React.RefObject<HTMLDivElement> | null;
}

const WIDTH = 300;

const UserMenuDropdown = ({
	isOpen,
	buttonRef,
	handleLogout,
	onClose,
	user,
}: UserMenuDropdownProps) => {
	return (
		<Dropdown
			isOpen={isOpen}
			buttonRef={buttonRef}
			width={WIDTH}
			onClose={onClose}
		>
			<div className={styles['user-menu__dropdown']}>
				<UserMenuCoins />
				{USER_MAIN_LINKS(user).map((link) => (
					<MenuItem
						{...link}
						key={link.name}
						onClick={onClose}
						icon={link.icon || undefined}
					/>
				))}
				{USER_SYSTEM_LINKS.map((link) => (
					<MenuItem
						{...link}
						key={link.name}
						onClick={onClose}
						icon={link.icon || undefined}
					/>
				))}
				<Divider />
				<ThemeSwitcher />
				<Button onClick={handleLogout} fullWidth>
					Logout
				</Button>
			</div>
		</Dropdown>
	);
};

export default UserMenuDropdown;
