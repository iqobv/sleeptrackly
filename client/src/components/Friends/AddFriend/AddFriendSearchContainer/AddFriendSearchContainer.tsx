'use client';

import { Button, TextField } from '@/components/UI';
import { MdOutlinePersonAdd } from 'react-icons/md';
import styles from './AddFriendSearchContainer.module.scss';

interface AddFriendSearchContainerProps {
	search: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSearch: () => void;
}

const AddFriendSearchContainer = ({
	search,
	onChange,
	handleSearch,
}: AddFriendSearchContainerProps) => {
	return (
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
	);
};

export default AddFriendSearchContainer;
