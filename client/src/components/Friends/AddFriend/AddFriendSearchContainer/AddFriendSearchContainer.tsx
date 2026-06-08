'use client';

import { Button, Field, Input } from '@shared/ui';
import { MdOutlineSearch } from 'react-icons/md';
import styles from './AddFriendSearchContainer.module.scss';

interface AddFriendSearchContainerProps {
	search: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	handleSearch: () => void;
}

export const AddFriendSearchContainer = ({
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
					rightSection={
						<Button
							className={styles.addButton}
							onClick={handleSearch}
							size="sm"
							isIcon
							type="button"
						>
							<MdOutlineSearch size={18} />
							<span className={styles.text}>Search</span>
						</Button>
					}
				/>
			</Field>
		</div>
	);
};
