'use client';

import { SearchUser } from '@/types/user/user.types';
import { List, SkeletonLoader } from '@shared/ui';
import { AddFriendItem } from './AddFriendItem/AddFriendItem';
import styles from './AddFriendList.module.scss';

interface AddFriendListProps {
	data: SearchUser[] | null | undefined;
	isPending: boolean;
}

export const AddFriendList = ({ data, isPending }: AddFriendListProps) => {
	return (
		<div className={styles.list}>
			{isPending && <SkeletonLoader width="100%" height={55} />}
			{data ? (
				data.length > 0 ? (
					<List
						items={data}
						renderItem={(user) => <AddFriendItem key={user.id} user={user} />}
					/>
				) : (
					<p className={styles.empty}>No results</p>
				)
			) : null}
		</div>
	);
};
