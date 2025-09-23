'use client';

import { deleteChallenge } from '@/api';
import { Button, PageHeader } from '@/components/UI';
import ConfirmModal from '@/components/UI/ConfirmModal/ConfirmModal';
import { PAGES } from '@/config';
import { IChallengeFull } from '@/types/challenge.types';
import { useMutation } from '@tanstack/react-query';
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

	const router = useRouter();

	const { mutate } = useMutation({
		mutationFn: () => deleteChallenge(data?.id),
		mutationKey: ['challenge', data?.id],
		onSuccess() {
			router.push(PAGES.CHALLENGES);
		},
	});

	const handleClose = () => setOpen(!open);

	const handleDelete = () => {
		mutate();
		handleClose();
	};

	return (
		<div className={styles['summary']}>
			<PageHeader
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
					href={PAGES.EDIT_CHALLENGE(data?.id)}
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
