'use client';

import { createSanction } from '@/api';
import { QUERY_KEYS } from '@/config';
import { UserSanctionDto } from '@/dto';
import { userSanctionSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSelect } from '@shared/form';
import { Button, Field, Input, SelectItem } from '@shared/ui';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './ReportSanctionForm.module.scss';
import { USER_SANCTIONS_OPTIONS } from './userSanctions';

interface ReportSanctionFormProps {
	reportId?: string;
	isUpdate?: boolean;
	showRemoveButton?: boolean;
	removeSanction?: () => void;
	defaultValues?: Partial<UserSanctionDto>;
}

export const ReportSanctionForm = ({
	reportId,
	isUpdate = false,
	showRemoveButton = false,
	removeSanction,
	defaultValues,
}: ReportSanctionFormProps) => {
	const queryClient = useQueryClient();

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		resolver: zodResolver(userSanctionSchema),
		defaultValues: {
			...defaultValues,
			startsAt: defaultValues?.startsAt
				? dayjs(defaultValues.startsAt).format('YYYY-MM-DDTHH:mm')
				: '',
			endsAt: defaultValues?.endsAt
				? dayjs(defaultValues.endsAt).format('YYYY-MM-DDTHH:mm')
				: '',
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (data: UserSanctionDto) => createSanction(data),
		onSuccess: () => {
			toast.success('Sanction created');
			if (reportId) {
				queryClient.invalidateQueries({
					queryKey: QUERY_KEYS.report.detail(reportId),
				});
			}
		},
		onError: (error) => toast.error(error.message),
	});

	const onSubmit = (data: UserSanctionDto) => mutate(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<Field label="Start date" error={errors['startsAt']?.message as string}>
				<Input type="datetime-local" {...register('startsAt')} />
			</Field>
			<Field label="End date" error={errors['endsAt']?.message as string}>
				<Input type="datetime-local" {...register('endsAt')} />
			</Field>
			<Field
				label="Sanction type"
				id="type"
				error={errors['type']?.message as string}
			>
				<FormSelect
					name="type"
					control={control}
					placeholder="Select sanction type"
					id="type"
				>
					{USER_SANCTIONS_OPTIONS.map((option) => (
						<SelectItem key={option.value} value={option.value}>
							{option.label}
						</SelectItem>
					))}
				</FormSelect>
			</Field>
			<div className={styles.buttons}>
				<Button type="submit" loading={isPending}>
					{isUpdate ? 'Update sanction' : 'Create sanction'}
				</Button>
				{showRemoveButton && (
					<Button
						onClick={removeSanction}
						type="button"
						variant="contained"
						color="secondary"
					>
						{isUpdate ? 'Remove sanction' : 'Cancel'}
					</Button>
				)}
			</div>
		</form>
	);
};
