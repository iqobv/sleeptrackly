'use client';

import { SectionHeader } from '@shared/ui';
import styles from './AddFriend.module.scss';
import { AddFriendList } from './AddFriendList';
import { AddFriendSearchContainer } from './AddFriendSearchContainer/AddFriendSearchContainer';
import { useAddFriend } from './useAddFriend';

export const AddFriend = () => {
	const { search, setSearch, onChange, handleSearch, data, isPending } =
		useAddFriend();

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
			<AddFriendSearchContainer
				search={search}
				onChange={onChange}
				handleSearch={handleSearch}
			/>
			<AddFriendList data={data} isPending={isPending} setSearch={setSearch} />
		</div>
	);
};
