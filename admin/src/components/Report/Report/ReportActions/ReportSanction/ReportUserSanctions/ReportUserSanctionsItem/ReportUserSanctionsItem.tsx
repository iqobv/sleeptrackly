'use client';

import { removeUserSanction } from '@/api';
import { Button, ConfirmModal, SectionHeader } from '@/components/UI';
import { PAGES, QUERY_KEYS } from '@/config';
import { IUserSanction } from '@/types';
import { capitalize } from '@/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import Link from 'next/link';
import { useState } from 'react';
import { MdOutlineDeleteOutline } from 'react-icons/md';
import styles from './ReportUserSanctionsItem.module.scss';

interface ReportUserSanctionsItemProps {
	sanction: IUserSanction;
	reportId: string;
	index: number;
}

const ReportUserSanctionsItem = ({
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
		<div key={sanction.id} className={styles['report-user-sanctions__item']}>
			<div className={styles['report-user-sanctions__header']}>
				<SectionHeader title={`Sanction #${index + 1}`} titleComponent="h3" />
				<Button isIcon size="sm" variant="text" onClick={handleOpenModal}>
					<MdOutlineDeleteOutline size={25} />
				</Button>
				<ConfirmModal
					isOpen={openModal}
					title="Delete sanction"
					text="Are you sure you want to delete this sanction?"
					onClose={handleOpenModal}
					onCancel={handleOpenModal}
					onConfirm={handleClick}
				/>
			</div>
			<div className={styles['report-user-sanctions__user']}>
				<p>User: </p>
				<Link href={PAGES.USER(sanction.user.username)}>
					{sanction.user.username}
				</Link>
			</div>
			<div className={styles['report-user-sanctions__user']}>
				<p>Created by: </p>
				<Link href={PAGES.USER(sanction.createdBy.username)}>
					{sanction.createdBy.username} ({sanction.createdBy.role})
				</Link>
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

export default ReportUserSanctionsItem;
