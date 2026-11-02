'use client';

import { AddFriendDto } from '@/dto/friend/friend.dto';
import { addFriendSchema } from '@/schemas/friend/addFriend.schema';
import { Form, FormField } from '@shared/form';
import { Button, Input } from '@shared/ui';
import { MdOutlineSearch } from 'react-icons/md';
import styles from './AddFriendSearchContainer.module.scss';

interface AddFriendSearchContainerProps {
	handleSearch: (search: string) => void;
}

export const AddFriendSearchContainer = ({
	handleSearch,
}: AddFriendSearchContainerProps) => {
	const onSubmit = (data: AddFriendDto) => {
		const seach = data.username.trim();

		if (seach && seach.trim().length > 2) handleSearch(seach);
	};

	return (
		<div className={styles.container}>
			<Form<AddFriendDto>
				schema={addFriendSchema}
				onSubmit={onSubmit}
				defaultValues={{
					username: '',
				}}
			>
				<FormField<AddFriendDto> name="username" label="Search by username">
					<Input
						type="text"
						placeholder="Enter a username"
						rightSection={
							<Button
								className={styles.addButton}
								size="sm"
								isIcon
								type="submit"
							>
								<MdOutlineSearch size={18} />
								<span className={styles.text}>Search</span>
							</Button>
						}
					/>
				</FormField>
			</Form>
		</div>
	);
};
