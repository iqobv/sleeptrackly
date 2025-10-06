'use client';

import { searchByUsername } from '@/api';
import {
	Button,
	SectionHeader,
	SkeletonLoader,
	TextField,
} from '@/components/UI';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { MdOutlinePersonAdd } from 'react-icons/md';
import styles from './AddFriend.module.scss';
import AddFriendItem from './AddFriendItem/AddFriendItem';

const AddFriend = () => {
	const [search, setSearch] = useState('');

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setSearch(e.target.value);

	const { mutate, data, isPending } = useMutation({
		mutationFn: ({ username }: { username: string }) =>
			searchByUsername(username),
		mutationKey: ['search', search],
	});

	const handleSearch = () => {
		if (search.trim().length >= 3) mutate({ username: search });
	};

	return (
		<div className={styles['add-friend']}>
			<SectionHeader
				title="Add Friend"
				titleComponent="h3"
				titleClassName={styles['add-friend__title']}
				containerClassName={styles['add-friend__title-container']}
			/>
			<div className={styles['add-friend__input-container']}>
				<TextField
					type="text"
					className={styles['add-friend__input']}
					placeholder="Enter a username"
					value={search}
					onChange={onChange}
					fullWidth
				/>
				<Button className={styles['add-friend__btn']} onClick={handleSearch}>
					<MdOutlinePersonAdd />
					Search
				</Button>
			</div>
			<div className={styles['add-friend__list']}>
				{isPending && <SkeletonLoader width="100%" height={55} />}
				{data &&
					data.length > 0 &&
					data.map((user) => (
						<AddFriendItem key={user.id} user={user} setSearch={setSearch} />
					))}
			</div>
		</div>
	);
};

export default AddFriend;
