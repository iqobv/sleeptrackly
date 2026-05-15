'use client';

import { updateUserNotificationSettings } from '@/api';
import { QUERY_KEYS } from '@/config';
import { UpdateNotificationSettingsDto } from '@/dto';
import { useAuth } from '@/hooks';
import { SettingsNotificationsSchema } from '@/schemas';
import { NotificationSettings } from '@/types';
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
	const { user } = useAuth();

	const methods = useForm({
		resolver: zodResolver(SettingsNotificationsSchema),
		defaultValues: data,
	});

	const { mutate } = useMutation({
		mutationFn: (dto: UpdateNotificationSettingsDto) =>
			updateUserNotificationSettings(dto),
		mutationKey: QUERY_KEYS.notifications.updateSettings(user?.id ?? ''),
		onSuccess: (updatedSettings: NotificationSettings) => {
			queryClient.refetchQueries({
				queryKey: QUERY_KEYS.notifications.settings(user?.id ?? ''),
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
