'use client';

import { createNotification } from '@/api';
import { Button, TextField } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { CreateNotificationDto } from '@/dto';
import { createNotificationSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import styles from './CreateNotification.module.scss';
import { FIELDS } from './createNotificationFields';

const CreateNotification = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
	} = useForm({
		resolver: zodResolver(createNotificationSchema),
		defaultValues: {
			isEmail: false,
			showInApp: true,
			title: '',
			body: '',
			isGlobal: true,
			redirectUrl: '',
		},
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (dto: CreateNotificationDto) => createNotification(dto),
		mutationKey: QUERY_KEYS.notifications.create,
	});

	const onSubmit = (data: CreateNotificationDto) => {
		mutate(data);
		reset();
	};

	return (
		<div className={styles['create-notification']}>
			<form onSubmit={handleSubmit(onSubmit)}>
				{FIELDS.map((f) => (
					<div key={f.name}>
						{f.type === 'checkbox' ? (
							<>
								<input type="checkbox" id={f.name} {...register(f.name)} />
								<label htmlFor={f.name}>{f.label}</label>
							</>
						) : (
							<TextField
								label={f.label}
								placeholder={f.placeholder}
								type={f.type}
								error={errors[f.name]?.message as string}
								{...register(f.name)}
							/>
						)}
					</div>
				))}

				{isDirty && (
					<div className={styles['form-actions']}>
						<Button
							type="button"
							variant="secondary"
							onClick={() => reset()}
							loading={isPending}
						>
							Cancel
						</Button>
						<Button type="submit" loading={isPending}>
							Create Notification
						</Button>
					</div>
				)}
			</form>
		</div>
	);
};

export default CreateNotification;
