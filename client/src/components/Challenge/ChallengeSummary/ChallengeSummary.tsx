'use client';

import { deleteChallenge } from '@/api';
import { Button, ConfirmModal, SectionHeader } from '@/components/UI';
import { PRIVATE_PAGES, QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { IChallengeFull } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import styles from './ChallengeSummary.module.scss';

interface ChallengeSummaryProps {
	data: IChallengeFull;
}

const iconProps: IconBaseProps = {
	size: 22,
};

const ChallengeSummary = ({ data }: ChallengeSummaryProps) => {
	const [open, setOpen] = useState(false);
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const router = useRouter();

	const { mutate } = useMutation({
		mutationFn: () => deleteChallenge(data?.id),
		mutationKey: QUERY_KEYS.challenges.deleteChallenge(data?.id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.challenges.all(user?.id || ''),
			});
			router.push(PRIVATE_PAGES.CHALLENGES.ALL);
		},
	});

	const handleClose = () => setOpen(!open);

	const handleDelete = () => {
		mutate();
		handleClose();
	};

	return (
		<div className={styles['summary']}>
			<SectionHeader
				title={data?.title}
				description={data?.description}
				titleComponent="h2"
			/>
			<div className={styles['summary__buttons']}>
				<Button onClick={handleClose} variant="outlined" fullWidth>
					<MdDeleteOutline {...iconProps} />
					Delete Challenge
				</Button>
				<Button
					href={PRIVATE_PAGES.CHALLENGES.EDIT(data?.id)}
					variant="outlined"
					fullWidth
				>
					<MdOutlineModeEdit {...iconProps} />
					Edit Challenge
				</Button>
			</div>
			<ConfirmModal
				title="Delete Challenge"
				text="Are you sure you want to delete this challenge?"
				isOpen={open}
				onClose={handleClose}
				onCancel={handleClose}
				onConfirm={handleDelete}
			/>
		</div>
	);
};

export default ChallengeSummary;
