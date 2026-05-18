'use client';

import { createSanction } from '@/api';
import { Button, Select, TextField } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { UserSanctionDto } from '@/dto';
import { userSanctionSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { Controller, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import styles from './ReportSanctionForm.module.scss';
import { USER_SANCTIONS_OPTIONS, UserSanctionOption } from './userSanctions';

interface ReportSanctionFormProps {
	reportId?: string;
	isUpdate?: boolean;
	showRemoveButton?: boolean;
	removeSanction?: () => void;
	defaultValues?: Partial<UserSanctionDto>;
}

const ReportSanctionForm = ({
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
		mutationKey: QUERY_KEYS.userSanction.create,
		onSuccess: () => {
			toast.success('Sanction created');
			if (reportId) {
				queryClient.invalidateQueries({
					queryKey: QUERY_KEYS.report.getReport(reportId),
				});
			}
		},
		onError: (error) => toast.error(error.message),
	});

	const onSubmit = (data: UserSanctionDto) => mutate(data);

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<TextField
				type="datetime-local"
				label="Start date"
				error={errors['startsAt']?.message as string}
				{...register('startsAt')}
			/>
			<TextField
				type="datetime-local"
				label="End date"
				error={errors['endsAt']?.message as string}
				{...register('endsAt')}
			/>
			<Controller
				name="type"
				control={control}
				render={({ field }) => {
					return (
						<Select
							options={USER_SANCTIONS_OPTIONS as UserSanctionOption[]}
							isClearable
							label="Sanction type"
							placeholder="Select sanction type"
							error={errors['type']?.message as string}
							value={field.value}
							onChange={(value: string) => field.onChange(value)}
						/>
					);
				}}
			/>
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

export default ReportSanctionForm;
