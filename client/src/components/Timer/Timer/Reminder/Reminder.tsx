'use client';

import {
	getUserNotificationSettings,
	updateUserNotificationSettings,
} from '@/api/settings/notifications.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import {
	UpdateNotificationSettingsDto,
	UpdateReminderTimeDto,
} from '@/dto/settings/notifications.dto';
import { usePushNotifications } from '@/hooks/usePushNotifications.hook';
import { reminderTimeSchema } from '@/schemas/settings/settingsNotifications.schema';
import {
	Form,
	FormActions,
	FormField,
	FormReset,
	FormSubmit,
} from '@shared/form';
import { Button, Input, SectionHeader, ToggleSwitch } from '@shared/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './Reminder.module.scss';

export const Reminder = () => {
	const { isLoading, isPushEnabled, handleTogglePush } = usePushNotifications();

	const queryClient = useQueryClient();

	const { data } = useQuery({
		queryKey: QUERY_KEYS.notifications.settings(),
		queryFn: getUserNotificationSettings,
	});

	const { mutate, isPending } = useMutation({
		mutationFn: (dto: UpdateNotificationSettingsDto) =>
			updateUserNotificationSettings(dto),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.notifications.settings(),
			});
		},
	});

	return (
		<div className={styles.reminder}>
			<SectionHeader
				title="Reminder Time"
				padding={0}
				titleProps={{
					variant: 'h3',
				}}
			/>
			{isPushEnabled ? (
				<Form<UpdateReminderTimeDto>
					schema={reminderTimeSchema}
					defaultValues={{
						isReminderEnabled: false,
						reminderTime: undefined,
						userTimeZone: undefined,
					}}
					values={{
						reminderTime: data?.reminderTime,
						isReminderEnabled: data?.isReminderEnabled,
						userTimeZone: data?.userTimeZone,
					}}
					onSubmit={(data) => mutate(data)}
				>
					{({ watch }) => {
						const isReminderEnabled = watch('isReminderEnabled');

						return (
							<>
								<FormField name="isReminderEnabled">
									<ToggleSwitch label="Enable Reminder" />
								</FormField>
								{isReminderEnabled && (
									<>
										<FormField name="reminderTime" label="Reminder Time">
											<Input type="time" />
										</FormField>
										<FormField name="userTimeZone" hidden>
											<Input type="hidden" hidden />
										</FormField>
									</>
								)}
								<FormActions justifyContent="center">
									<FormReset disabledOnEmpty>Reset</FormReset>
									<FormSubmit
										disabledOnEmpty
										buttonProps={{ loading: isPending }}
									>
										Save
									</FormSubmit>
								</FormActions>
							</>
						);
					}}
				</Form>
			) : (
				<div className={styles.push}>
					<Button loading={isLoading} onClick={() => handleTogglePush(true)}>
						Enable Push Notifications
					</Button>
				</div>
			)}
		</div>
	);
};
