'use client';

import { updateUserNotificationSettings } from '@/api/settings/notifications.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { UpdateNotificationSettingsDto } from '@/dto/settings/notifications.dto';
import { settingsNotificationsSchema } from '@/schemas/settings/settingsNotifications.schema';
import { NotificationSettings } from '@/types/settings/notifications.types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

interface UseSettingsNotificationsFormProps {
	data: NotificationSettings;
}

export const useSettingsNotificationsForm = ({
	data,
}: UseSettingsNotificationsFormProps) => {
	const queryClient = useQueryClient();

	const methods = useForm({
		resolver: zodResolver(settingsNotificationsSchema),
		defaultValues: {
			isAchievementUnlockedEnabled: true,
			isEmailNotificationsEnabled: true,
			isFriendRequestsEnabled: true,
			isInAppNotificationsEnabled: true,
			isReminderEnabled: false,
			isUpdatesEnabled: true,
			reminderTime: undefined,
		},
		values: data,
	});

	const { mutate } = useMutation({
		mutationFn: (dto: UpdateNotificationSettingsDto) =>
			updateUserNotificationSettings(dto),
		onSuccess: (updatedSettings: NotificationSettings) => {
			queryClient.invalidateQueries({
				queryKey: QUERY_KEYS.notifications.settings(),
			});
			methods.reset(updatedSettings);
		},
		onError: () => {
			toast.error('Failed to update notification settings.');
		},
	});

	const updateSetting = (dto: Partial<UpdateNotificationSettingsDto>) =>
		mutate(dto);

	return {
		methods,
		updateSetting,
	};
};
