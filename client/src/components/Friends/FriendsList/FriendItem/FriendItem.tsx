'use client';

import { Avatar, Button } from '@/components/UI';
import { PAGES } from '@/config';
import { IFriend } from '@/types';
import Link from 'next/link';
import { MdOutlineMoreVert } from 'react-icons/md';
import styles from './FriendItem.module.scss';
import FriendItemMenu from './FriendItemMenu/FriendItemMenu';
import { useFriendItemMenu } from './useFriendItemMenu';

interface FriendItemProps {
	friend: IFriend;
}

const FriendItem = ({ friend }: FriendItemProps) => {
	const { containerRef, menuRef, menuOpen, handleOpenMenu, menuUp } =
		useFriendItemMenu();

	return (
		<div className={styles['friend-item']}>
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
						{friend.user.isSleeping ? 'Sleeping' : 'Offline'}
					</p>
				</div>
			</div>
			<div ref={containerRef} className={styles['friend-item__actions']}>
				<Button onClick={handleOpenMenu} variant="text" isIcon>
					<MdOutlineMoreVert size={24} />
				</Button>
				{menuOpen && (
					<FriendItemMenu menuRef={menuRef} friend={friend} menuUp={menuUp} />
				)}
			</div>
		</div>
	);
};

export default FriendItem;
