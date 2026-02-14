'use client';

import NotificationsButton from '@/components/Notification/NotificationsButton/NotificationsButton';
import { Avatar } from '@/components/UI';
import { useRef } from 'react';
import styles from './UserMenu.module.scss';
import UserMenuDropdown from './UserMenuDropdown/UserMenuDropdown';
import { useUserMenu } from './useUserMenu';

const UserMenu = () => {
	const buttonRef = useRef<HTMLDivElement>(null);

	const { open, user, onClose, handleLogout } = useUserMenu();

	const avatar = user?.equippedItems.find(
		(ei) => ei.item.type === 'ANIMATED_AVATAR' || ei.item.type === 'AVATAR',
	);

	if (!user) return null;

	return (
		<div className={styles['user-menu__controls']}>
			<NotificationsButton />
			<div className={styles['user-menu__wrapper']} ref={buttonRef}>
				<button onClick={onClose} className={styles['user-menu__btn']}>
					<Avatar
						avatar={avatar ? avatar.item.mediaUrl : user.avatar?.url}
						size={40}
						priority
						isVideo={avatar?.item.isAnimated || false}
					/>
				</button>
				<UserMenuDropdown
					isOpen={open}
					onClose={onClose}
					handleLogout={handleLogout}
					user={user}
					buttonRef={buttonRef as React.RefObject<HTMLDivElement>}
				/>
			</div>
		</div>
	);
};

export default UserMenu;
