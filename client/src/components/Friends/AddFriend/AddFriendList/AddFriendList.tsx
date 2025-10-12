'use client';

import { List, SkeletonLoader } from '@/components/UI';
import { IUser } from '@/types';
import AddFriendItem from './AddFriendItem/AddFriendItem';
import styles from './AddFriendList.module.scss';

interface AddFriendListProps {
	data: IUser[] | null | undefined;
	isPending: boolean;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
}

const AddFriendList = ({ data, isPending, setSearch }: AddFriendListProps) => {
	return (
		<div className={styles['add-friend__list']}>
			{isPending && <SkeletonLoader width="100%" height={55} />}
			{data ? (
				data.length > 0 ? (
					<List
						items={data}
						renderItem={(user) => (
							<AddFriendItem key={user.id} user={user} setSearch={setSearch} />
						)}
					/>
				) : (
					<p className={styles['add-friend__list-empty']}>No results</p>
				)
			) : null}
		</div>
	);
};

export default AddFriendList;
