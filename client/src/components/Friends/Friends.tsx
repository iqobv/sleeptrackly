'use client';

import { AddFriend } from './AddFriend/AddFriend';
import { FriendsList } from './FriendsList/FriendsList';

export const Friends = () => {
	return (
		<>
			<AddFriend />
			<FriendsList />
		</>
	);
};
