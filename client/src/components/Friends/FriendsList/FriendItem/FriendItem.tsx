'use client';

import { Button } from '@/components/UI';
import { IFriend } from '@/types';
import { MdOutlineMoreVert } from 'react-icons/md';
import styles from './FriendItem.module.scss';
import FriendItemInfo from './FriendItemInfo/FriendItemInfo';
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
			<FriendItemInfo friend={friend} />
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
