'use client';

import { SectionHeader } from '@/components/UI';
import styles from './AddFriend.module.scss';
import AddFriendList from './AddFriendList/AddFriendList';
import AddFriendSearchContainer from './AddFriendSearchContainer/AddFriendSearchContainer';
import { useAddFriend } from './useAddFriend';

const AddFriend = () => {
	const { search, setSearch, onChange, handleSearch, data, isPending } =
		useAddFriend();

	return (
		<div className={styles['add-friend']}>
			<SectionHeader
				title="Add Friend"
				titleComponent="h3"
				titleClassName={styles['add-friend__title']}
				containerClassName={styles['add-friend__title-container']}
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

export default AddFriend;
