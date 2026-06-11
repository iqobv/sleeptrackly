'use client';

import { NotificationsButton } from '@/components/Notification/NotificationsButton/NotificationsButton';
import { UserAvatar } from '@/components/UI';
import { Dropdown, DropdownTrigger } from '@shared/ui';
import styles from './UserMenu.module.scss';
import { UserMenuDropdown } from './UserMenuDropdown/UserMenuDropdown';
import { useUserMenu } from './useUserMenu';

export const UserMenu = () => {
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
				<DropdownTrigger asChild>
					<button className={styles.btn}>
						<UserAvatar
							avatarPath={avatar ? avatar.item.mediaUrl : user.avatar?.url}
							size={40}
							isAnimated={avatar?.item.isAnimated}
						/>
					</button>
				</DropdownTrigger>
				<UserMenuDropdown handleLogout={handleLogout} user={user} />
			</Dropdown>
		</div>
	);
};
