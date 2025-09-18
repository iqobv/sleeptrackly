'use client';

import { Button, TextField } from '@/components/UI';
import { useAuth } from '@/hooks';
import { SettingsSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import UploadAvatar from '../UploadAvatar/UploadAvatar';
import styles from './SettingsForm.module.scss';
import { SETTINGS_FIELDS } from './settingsFormFields';

const SettingsForm = () => {
	const { user } = useAuth();

	const {
		register,
		handleSubmit,
		reset,
		formState: { errors, isDirty },
	} = useForm({
		resolver: zodResolver(SettingsSchema),
		defaultValues: {
			email: user?.email || '',
			username: user?.username || '',
		},
	});

	useEffect(() => {
		reset({
			email: user?.email || '',
			username: user?.username || '',
		});
	}, [user]);

	const onSubmit = (data: any) => {
		console.log(data);
	};

	return (
		<div className={styles['settings-form']}>
			<UploadAvatar />
			<form onSubmit={handleSubmit(onSubmit)}>
				{SETTINGS_FIELDS.map((f) => (
					<div key={f.name}>
						<TextField
							type={f.type}
							placeholder={f.placeholder}
							label={f.label}
							{...register(f.name)}
						/>
					</div>
				))}
				{isDirty && <Button type="submit">Save</Button>}
			</form>
		</div>
	);
};

export default SettingsForm;
