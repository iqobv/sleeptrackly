'use client';

import { deleteSleepEntry } from '@/api/sleepEntry/deleteSleepEntry.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { SleepEntry } from '@/types/dashboard/dashboard.types';
import { Button, ConfirmModal, Typography } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import { useState } from 'react';
import { toast } from 'react-toastify';
import styles from './DashboardSleepSessionCardDropdown.module.scss';
import { SleepSessionFormModalProps } from './SleepSessionFormModal.types';

interface SleepSessionDeleteProps extends Omit<
	SleepSessionFormModalProps,
	'children'
> {
	sleepEntry: SleepEntry;
}

export const SleepSessionDelete = ({
	sleepEntry,
	date,
}: SleepSessionDeleteProps) => {
	const queryClient = useQueryClient();

	const [isOpen, setIsOpen] = useState(false);

	const id = sleepEntry.id;

	const { mutate } = useMutation({
		mutationFn: () => deleteSleepEntry(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: QUERY_KEYS.dashboard.base });
			toast.success('Sleep session deleted successfully');
		},
		onError: (error) => {
			if (isAxiosError(error) && error.response?.data?.message) {
				toast.error(
					`Error deleting sleep session: ${error.response.data.message}`,
				);
			} else {
				toast.error(error.message || 'Error deleting sleep session');
			}
		},
	});

	const onClose = () => setIsOpen((prev) => !prev);

	const handleDelete = () => {
		mutate();
		onClose();
	};

	return (
		<>
			<Button
				variant="text"
				color="danger"
				className={styles.button}
				onClick={onClose}
			>
				Delete Sleep Session
			</Button>
			<ConfirmModal
				isOpen={isOpen}
				onClose={onClose}
				text={
					<Typography>
						You are about to delete the sleep session for{' '}
						{date.toLocaleDateString()}. This action cannot be undone. Are you
						sure you want to proceed?
					</Typography>
				}
				onConfirm={handleDelete}
				title="Delete Sleep Session"
			/>
		</>
	);
};
