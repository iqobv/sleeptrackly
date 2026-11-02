'use client';

import { searchByUsername } from '@/api/user/user.api';
import { AddFriendDto } from '@/dto/friend/friend.dto';
import { SectionHeader } from '@shared/ui';
import { useMutation } from '@tanstack/react-query';
import styles from './AddFriend.module.scss';
import { AddFriendList } from './AddFriendList/AddFriendList';
import { AddFriendSearchContainer } from './AddFriendSearchContainer/AddFriendSearchContainer';

export const AddFriend = () => {
	const { mutate, data, isPending } = useMutation({
		mutationFn: ({ username }: AddFriendDto) => searchByUsername(username),
	});

	const handleSearch = (search: string) => mutate({ username: search });

	return (
		<div className={styles.addFriend}>
			<SectionHeader
				title="Add Friend"
				titleProps={{
					variant: 'h3',
				}}
				containerClassName={styles.titleContainer}
				padding={10}
			/>
			<AddFriendSearchContainer handleSearch={handleSearch} />
			<AddFriendList data={data} isPending={isPending} />
		</div>
	);
};
