'use client';

import { Avatar } from '@/components/UI';
import { PAGES } from '@/config';
import { Friend } from '@/types';
import Link from 'next/link';
import styles from './FriendItemInfo.module.scss';

interface FriendItemProps {
	friend: Friend;
}

export const FriendItemInfo = ({ friend }: FriendItemProps) => {
	return (
		<div className={styles.info}>
			<Avatar avatar={friend.user?.avatar} size={45} />
			<div>
				<Link
					className={styles.username}
					href={PAGES.PROFILE(friend.user.username)}
				>
					{friend.user.username}
				</Link>
				<p className={styles.status}>{friend.user.status}</p>
			</div>
		</div>
	);
};
