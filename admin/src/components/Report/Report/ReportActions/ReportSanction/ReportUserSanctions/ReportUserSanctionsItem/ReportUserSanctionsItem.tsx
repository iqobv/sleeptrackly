'use client';

import { removeUserSanction } from '@/api';
import { PAGES, QUERY_KEYS } from '@/config';
import { UserSanction } from '@/types';
import { Button, ConfirmModal, SectionHeader } from '@shared/ui';
import { capitalize } from '@shared/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import styles from './ReportUserSanctionsItem.module.scss';

interface ReportUserSanctionsItemProps {
	sanction: UserSanction;
	reportId: string;
	index: number;
}

export const ReportUserSanctionsItem = ({
	sanction,
	reportId,
	index,
}: ReportUserSanctionsItemProps) => {
	const queryClient = useQueryClient();

	const [openModal, setOpenModal] = useState<boolean>(false);

	const { mutate } = useMutation({
		mutationFn: (id: string) => removeUserSanction(id),
		mutationKey: QUERY_KEYS.userSanction.remove,
		onSuccess: () =>
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.report.getReport(reportId),
			}),
	});

	const handleClick = () => mutate(sanction.id);

	const handleOpenModal = () => setOpenModal(!openModal);

	return (
		<div key={sanction.id} className={styles.item}>
			<div className={styles.header}>
				<SectionHeader
					title={`Sanction #${index + 1}`}
					titleProps={{
						variant: 'h3',
					}}
				/>
				<Button isIcon size="sm" variant="text" onClick={handleOpenModal}>
					<MdOutlineDeleteOutline size={25} />
				</Button>
				<ConfirmModal
					isOpen={openModal}
					title="Delete sanction"
					text="Are you sure you want to delete this sanction?"
					onClose={handleOpenModal}
					onConfirm={handleClick}
				/>
			</div>
			<div className={styles.user}>
				<p>User: </p>
				{sanction.user ? (
					<Link href={PAGES.USER(sanction.user.username)} prefetch={false}>
						{sanction.user.username}
					</Link>
				) : (
					<span>Unknown</span>
				)}
			</div>
			<div className={styles.user}>
				<p>Created by: </p>
				{sanction.createdBy ? (
					<Link href={PAGES.USER(sanction.createdBy.username)} prefetch={false}>
						{sanction.createdBy.username} ({sanction.createdBy.role})
					</Link>
				) : (
					<span>Unknown</span>
				)}
			</div>
			<p>Start at: {dayjs(sanction.startsAt).format('DD.MM.YYYY HH:mm')}</p>
			<p>End at: {dayjs(sanction.endsAt).format('DD.MM.YYYY HH:mm')}</p>
			<p>
				Type:
				{capitalize(sanction.type.replaceAll('_', ' ').toLowerCase())}
			</p>
		</div>
	);
};
