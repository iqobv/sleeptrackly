'use client';

import NotificationsButton from '@/components/Notification/NotificationsButton/NotificationsButton';
import { Avatar, Dropdown } from '@/components/UI';
import styles from './UserMenu.module.scss';
import UserMenuDropdown from './UserMenuDropdown/UserMenuDropdown';
import { useUserMenu } from './useUserMenu';

const UserMenu = () => {
	const { user, handleLogout } = useUserMenu();

	const avatar =
		user?.equippedItems.find(
			(ei) => ei.item.type === 'ANIMATED_AVATAR' || ei.item.type === 'AVATAR',
		) || null;

	if (!user) return null;

	return (
		<div className={styles.controls}>
			<NotificationsButton />
			<Dropdown>
				<Dropdown.Trigger asChild>
					<button className={styles.btn}>
						<Avatar
							avatar={avatar ? avatar.item.mediaUrl : user.avatar?.url}
							size={40}
							priority
							isVideo={avatar?.item.isAnimated || false}
						/>
					</button>
				</Dropdown.Trigger>
				<UserMenuDropdown handleLogout={handleLogout} user={user} />
			</Dropdown>
		</div>
	);
};

export default UserMenu;
