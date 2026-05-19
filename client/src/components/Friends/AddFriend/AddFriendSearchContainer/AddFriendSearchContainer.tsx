'use client';

import { Button, Field, Input } from '@/components/UI';
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
		<div className={styles.container}>
			<Field label="Search by username">
				<Input
					type="text"
					placeholder="Enter a username"
					value={search}
					onChange={onChange}
				/>
			</Field>
			<Button className={styles.addButton} onClick={handleSearch}>
				<MdOutlinePersonAdd />
				Search
			</Button>
		</div>
	);
};

export default AddFriendSearchContainer;
