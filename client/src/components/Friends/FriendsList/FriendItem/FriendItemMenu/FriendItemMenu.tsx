'use client';

import { Friend } from '@/types';
import { FRIEND_ITEM_MENU } from '../friendItemMenu';
import styles from './FriendItemMenu.module.scss';
import FriendItemMenuButton from './FriendItemMenuButton';

interface FriendItemMenuProps {
	menuRef: React.RefObject<HTMLDivElement | null>;
	menuUp: boolean;
	friend: Friend;
}

const FriendItemMenu = ({ menuRef, friend, menuUp }: FriendItemMenuProps) => {
	return (
		<div
			ref={menuRef}
			className={`${styles['friend-item-menu']} ${
				menuUp
					? styles['friend-item-menu--up']
					: styles['friend-item-menu--down']
			}`}
		>
			{FRIEND_ITEM_MENU.map((item) => (
				<FriendItemMenuButton key={item.label} item={item} friend={friend} />
			))}
		</div>
	);
};

export default FriendItemMenu;
