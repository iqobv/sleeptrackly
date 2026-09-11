'use client';

import { createNotification } from '@/api/notification/notification.api';
import { FormContent, FormFields } from '@/components/UI';
import { CreateNotificationDto } from '@/dto/notification/notification.dto';
import { createNotificationSchema } from '@/schemas/notification/notification.schema';
import { Form } from '@shared/form';
import { useMutation } from '@tanstack/react-query';
import { FIELDS } from './createNotificationFields';

export const CreateNotification = () => {
	const { mutate, isPending } = useMutation({
		mutationFn: (dto: CreateNotificationDto) => createNotification(dto),
	});

	return (
		<Form<CreateNotificationDto>
			schema={createNotificationSchema}
			onSubmit={(data, _e, methods) => {
				mutate(data, {
					onSuccess: () => methods.reset(),
				});
			}}
			defaultValues={{
				isEmail: false,
				showInApp: true,
				type: 'OTHER',
				title: '',
				body: '',
				isGlobal: true,
				redirectUrl: '',
			}}
		>
			<FormContent
				buttonLabel="Create Notification"
				isLoading={isPending}
				isEdit={false}
			>
				<FormFields fields={FIELDS} />
			</FormContent>
		</Form>
	);
};
