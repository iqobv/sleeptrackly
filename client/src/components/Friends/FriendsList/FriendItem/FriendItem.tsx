'use client';

import { Friend } from '@/types/friend/friend.types';
import styles from './FriendItem.module.scss';
import { FriendItemInfo } from './FriendItemInfo/FriendItemInfo';
import { FriendItemMenu } from './FriendItemMenu/FriendItemMenu';

interface FriendItemProps {
	friend: Friend;
}

export const FriendItem = ({ friend }: FriendItemProps) => {
	return (
		<div className={styles.item}>
			<FriendItemInfo friend={friend} />
			<div className={styles.actions}>
				<FriendItemMenu friend={friend} />
			</div>
		</div>
	);
};
