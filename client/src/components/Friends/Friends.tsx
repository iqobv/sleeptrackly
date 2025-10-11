'use client';

import AddFriend from './AddFriend/AddFriend';
import styles from './Friends.module.scss';
import FriendsList from './FriendsList/FriendsList';

const Friends = () => {
	return (
		<div className={styles['friends']}>
			<AddFriend />
			<FriendsList />
		</div>
	);
};

export default Friends;
