'use client';

import { NotificationsButton } from '@/components/Notification/NotificationsButton/NotificationsButton';
import { UserAvatar } from '@/components/UI';
import { useAuth } from '@/hooks/useAuth.hook';
import { Dropdown, DropdownTrigger } from '@shared/ui';
import styles from './UserMenu.module.scss';
import { UserMenuDropdown } from './UserMenuDropdown/UserMenuDropdown';
import { UserMenuLoader } from './UserMenuLoader';

export const UserMenu = () => {
	const { logout, user, isLoading } = useAuth();

	if (isLoading && !user) return <UserMenuLoader />;
	if (!user) return null;

	const avatar =
		user.equippedItems?.find(
			(ei) => ei.item.type === 'ANIMATED_AVATAR' || ei.item.type === 'AVATAR',
		) || null;

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
				<UserMenuDropdown handleLogout={logout} user={user} />
			</Dropdown>
		</div>
	);
};
