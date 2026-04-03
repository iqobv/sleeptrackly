'use client';

import { Avatar } from '@/components/UI';
import { PAGES } from '@/config';
import { IFriend } from '@/types';
import Link from 'next/link';
import styles from './FriendItemInfo.module.scss';

interface FriendItemProps {
	friend: IFriend;
}

const FriendItemInfo = ({ friend }: FriendItemProps) => {
	return (
		<div className={styles['friend-item__info']}>
			<Avatar avatar={friend.user?.avatar} size={45} />
			<div>
				<Link
					className={styles['friend-item__username']}
					href={PAGES.PROFILE(friend.user.username)}
				>
					{friend.user.username}
				</Link>
				<p className={styles['friend-item__status']}>
					{friend.user.status}
				</p>
			</div>
		</div>
	);
};

export default FriendItemInfo;
