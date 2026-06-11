'use client';

import { createNotification } from '@/api';
import { FormContent, FormFields } from '@/components/UI';
import { CreateNotificationDto } from '@/dto';
import { createNotificationSchema } from '@/schemas';
import { Form } from '@shared/form';
import { useMutation } from '@tanstack/react-query';
import { FIELDS } from './createNotificationFields';

const CreateNotification = () => {
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

export default CreateNotification;
