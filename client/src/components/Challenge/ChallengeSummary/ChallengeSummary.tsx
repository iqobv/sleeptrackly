'use client';

import { deleteChallenge } from '@/api/challenge/challenge.api';
import { PRIVATE_PAGES } from '@/config/privatePages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { ChallengeFull } from '@/types/challenge/challenge.types';
import { Button, ConfirmModal, SectionHeader } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { IconBaseProps } from 'react-icons';
import { MdDeleteOutline, MdOutlineModeEdit } from 'react-icons/md';
import styles from './ChallengeSummary.module.scss';

interface ChallengeSummaryProps {
	data: ChallengeFull;
}

const iconProps: IconBaseProps = {
	size: 22,
};

export const ChallengeSummary = ({ data }: ChallengeSummaryProps) => {
	const [open, setOpen] = useState(false);
	const queryClient = useQueryClient();

	const router = useRouter();

	const { mutate } = useMutation({
		mutationFn: () => deleteChallenge(data?.id),
		onSuccess() {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.challenges.all,
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
		<div className={styles.summary}>
			<SectionHeader
				title={data?.title}
				description={data?.description}
				titleProps={{
					variant: 'h2',
				}}
			/>
			<div className={styles.buttons}>
				<Button
					onClick={handleClose}
					variant="outlined"
					color="danger"
					fullWidth
				>
					<MdDeleteOutline {...iconProps} />
					Delete Challenge
				</Button>
				<Button variant="outlined" fullWidth asChild>
					<Link href={PRIVATE_PAGES.CHALLENGES.EDIT(data?.id)}>
						<MdOutlineModeEdit {...iconProps} />
						Edit Challenge
					</Link>
				</Button>
			</div>
			<ConfirmModal
				title="Delete Challenge"
				text="Are you sure you want to delete this challenge?"
				isOpen={open}
				onClose={handleClose}
				onConfirm={handleDelete}
			/>
		</div>
	);
};
