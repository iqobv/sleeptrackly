'use client';

import { createNotification } from '@/api';
import { Button, Field, Input } from '@/components/UI';
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
		<form onSubmit={handleSubmit(onSubmit)}>
			{FIELDS.map((f) => (
				<div key={f.name}>
					{f.type === 'checkbox' ? (
						<>
							<input type="checkbox" id={f.name} {...register(f.name)} />
							<label htmlFor={f.name}>{f.label}</label>
						</>
					) : (
						<Field
							label={f.label}
							error={errors[f.name]?.message as string}
							required={f.required}
						>
							<Input
								placeholder={f.placeholder}
								type={f.type}
								{...register(f.name)}
							/>
						</Field>
					)}
				</div>
			))}

			{isDirty && (
				<div className={styles.actions}>
					<Button
						type="button"
						variant="contained"
						color="secondary"
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
	);
};

export default CreateNotification;
