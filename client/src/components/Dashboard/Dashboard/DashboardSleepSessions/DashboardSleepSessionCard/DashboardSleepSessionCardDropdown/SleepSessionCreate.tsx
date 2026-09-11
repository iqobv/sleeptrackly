'use client';

import { createSleepEntry } from '@/api/sleepEntry/createSleepEntry.api';
import { SleepEntryForm } from '@/components/SleepEntry/SleepEntryForm';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { CreateSleepEntryDto } from '@/dto/sleepEntry/sleepEntry.dto';
import { createSleepEntryFormSchema } from '@/schemas/sleepEntry/createSleepEntry.schema';
import { FormReset, FormSubmit } from '@shared/form';
import { ModalBody, ModalClose, ModalFooter, SectionHeader } from '@shared/ui';
import { formatDate } from '@shared/utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { isAxiosError } from 'axios';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import styles from './DashboardSleepSessionCardDropdown.module.scss';
import { DashboardSleepSessionCardFormModal } from './DashboardSleepSessionCardFormModal';
import { SleepSessionFormModalProps } from './SleepSessionFormModal.types';

export const SleepSessionCreate = ({
	children,
	date,
}: SleepSessionFormModalProps) => {
	const queryClient = useQueryClient();

	const { mutate } = useMutation({
		mutationFn: (data: CreateSleepEntryDto) => createSleepEntry(data),
	});

	return (
		<DashboardSleepSessionCardFormModal
			header="Create Sleep Entry"
			trigger={children}
		>
			<SectionHeader
				title={`Create Sleep session for ${formatDate(date, {
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
			<SleepEntryForm
				schema={createSleepEntryFormSchema}
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

					const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

					const finalData: CreateSleepEntryDto = {
						...data,
						dateForChart: dayjs(date).format('YYYY-MM-DD'),
						timezone,
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
				isOnlyForm
				isCreate
				date={date}
				formBodyWrapper={ModalBody}
				customSubmit={
					<ModalFooter className={styles.actions}>
						<FormSubmit>Create</FormSubmit>
						<ModalClose asChild>
							<FormReset>Cancel</FormReset>
						</ModalClose>
					</ModalFooter>
				}
			/>
		</DashboardSleepSessionCardFormModal>
	);
};
