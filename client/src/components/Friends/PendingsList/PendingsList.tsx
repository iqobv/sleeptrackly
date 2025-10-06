'use client';

import { getPendingFriendRequests, updateManyPendingRequests } from '@/api';
import { Button, SectionHeader } from '@/components/UI';
import { PAGES } from '@/config';
import { FRIEND_STATUS } from '@/constants';
import { useAuth } from '@/hooks';
import { TFriendStatus } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import PendingsItem from './PendingsItem/PendingsItem';
import styles from './PendingsList.module.scss';

const PendingsList = () => {
	const router = useRouter();

	const { user } = useAuth();

	const { data, refetch } = useQuery({
		queryFn: getPendingFriendRequests,
		queryKey: ['pendings', user?.id],
		staleTime: 0,
		enabled: !!user?.id,
	});

	const { mutate: mutateMany } = useMutation({
		mutationFn: ({ status }: { status: TFriendStatus }) =>
			updateManyPendingRequests(status),
		mutationKey: ['pendingsManyChange', user?.id],
		onSuccess: () => {
			refetch();
			router.push(PAGES.FRIENDS);
		},
	});

	const handleUpdateMany = (status: TFriendStatus) => {
		if (data && data.length > 0) mutateMany({ status });
	};

	return (
		<div className={styles['pendings-list']}>
			<SectionHeader title="Friends Requests" titleComponent="h3" />
			<div className={styles['pendings-list__buttons']}>
				<Button
					className={styles['pendings-list__button']}
					onClick={() => handleUpdateMany(FRIEND_STATUS.ACCEPTED)}
				>
					Accept All
				</Button>
				<Button
					className={styles['pendings-list__button']}
					onClick={() => handleUpdateMany(FRIEND_STATUS.REJECTED)}
					variant="outlined"
				>
					Reject All
				</Button>
			</div>
			<div className={styles['pendings-list__list']}>
				{data && data.map((el) => <PendingsItem key={el.id} friend={el} />)}
			</div>
		</div>
	);
};

export default PendingsList;
