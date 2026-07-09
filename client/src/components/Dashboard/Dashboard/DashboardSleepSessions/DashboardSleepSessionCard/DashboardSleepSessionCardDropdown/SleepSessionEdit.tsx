'use client';

import { updateSleepEntry } from '@/api/sleepEntry/updateSleepEntry.api';
import { SleepEntryForm } from '@/components/SleepEntry/SleepEntryForm';
import { QUERY_KEYS } from '@/config/queryClient.config';
import {
	UpdateSleepEntryDto,
	UpdateSleepEntryFormDto,
} from '@/dto/sleepEntry/sleepEntry.dto';
import { updateSleepEntryFormSchema } from '@/schemas/sleepEntry/updateSleepEntry.schema';
import { SleepEntry } from '@/types/dashboard/dashboard.types';
import { FormReset, FormSubmit } from '@shared/form';
import { ModalBody, ModalClose, ModalFooter, SectionHeader } from '@shared/ui';
import { formatDate, formatLocalDatetime } from '@shared/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import styles from './DashboardSleepSessionCardDropdown.module.scss';
import { DashboardSleepSessionCardFormModal } from './DashboardSleepSessionCardFormModal';
import { SleepSessionFormModalProps } from './SleepSessionFormModal.types';

interface SleepSessionEditProps extends SleepSessionFormModalProps {
	sleepEntry: SleepEntry;
}

export const SleepSessionEdit = ({
	sleepEntry,
	children,
	date,
}: SleepSessionEditProps) => {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: (data: UpdateSleepEntryDto) =>
			updateSleepEntry(sleepEntry.id, data),
	});

	return (
		<DashboardSleepSessionCardFormModal
			trigger={children}
			header="Edit Sleep Entry"
		>
			<SectionHeader
				title={`Update Sleep session for ${formatDate(date, {
					weekday: 'long',
					day: 'numeric',
					month: 'short',
					year: 'numeric',
				})}`}
				titleProps={{
					variant: 'h4',
				}}
				padding={0}
			/>
			<SleepEntryForm<UpdateSleepEntryFormDto>
				schema={updateSleepEntryFormSchema}
				onSubmit={(data, _e, methods) => {
					const { setError } = methods;

					if (!data.sleepEnd) return;

					const startOfDay = dayjs(date).startOf('day').toDate();
					const endOfDay = dayjs(date).endOf('day').toDate();
					const sleepEnd = new Date(data.sleepEnd);

					if (sleepEnd < startOfDay || sleepEnd > endOfDay) {
						setError('sleepEnd', {
							type: 'deps',
							message: 'Sleep end cannot be after the selected date',
						});

						return;
					}

					const finalData: UpdateSleepEntryDto = {
						...data,
						timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
						dateForChart: dayjs(date).format('YYYY-MM-DD'),
					};

					mutate(finalData, {
						onSuccess: () => {
							queryClient.invalidateQueries({
								queryKey: QUERY_KEYS.dashboard.base,
							});
							toast.success('Sleep entry created successfully');
						},
						onError: (error: unknown) => {
							if (isAxiosError(error) && error.response?.data.message) {
								if (error.response.data.field) {
									setError(error.response.data.field, {
										type: 'custom',
										message: error.response.data.message,
									});
									return;
								}

								setError('root', {
									type: 'custom',
									message: error.response.data.message,
								});
							}
						},
					});
				}}
				defaultValues={{
					rating: 0,
					sleepEnd: undefined,
					sleepStart: undefined,
				}}
				values={{
					rating: sleepEntry.rating,
					sleepEnd: formatLocalDatetime(sleepEntry.sleepEnd),
					sleepStart: formatLocalDatetime(sleepEntry.sleepStart),
				}}
				isOnlyForm
				isCreate={false}
				date={date}
				formBodyWrapper={ModalBody}
				customSubmit={
					<ModalFooter className={styles.actions}>
						<FormSubmit>Update</FormSubmit>
						<ModalClose asChild>
							<FormReset>Cancel</FormReset>
						</ModalClose>
					</ModalFooter>
				}
			/>
		</DashboardSleepSessionCardFormModal>
	);
};
