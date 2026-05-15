'use client';

import { QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { Friend, FriendStatus, Profile } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
	DEFAULT_BUTTON,
	PROFILE_FRIENDS_BUTTONS,
	SUCCESS_TEXT,
} from './profileAddToFriendButtons';

export const useProfileAddToFriendButton = (profile: Profile) => {
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const buttonConfig = profile?.friendship
		? PROFILE_FRIENDS_BUTTONS(profile.id, profile?.friendship, user?.id)[
				profile.friendship.status as FriendStatus
			]
		: DEFAULT_BUTTON(profile.id, user?.id);

	const { mutate, isPending } = useMutation({
		mutationFn: buttonConfig.mutationFn as () => Promise<Friend>,
		onSuccess: () => {
			queryClient.refetchQueries({
				queryKey: QUERY_KEYS.profile.username(profile.username),
			});
			toast.success(buttonConfig.successText || SUCCESS_TEXT);
		},
		onError: (error) => {
			toast.error((error as Error).message);
		},
	});

	return { buttonConfig, isPending, mutate };
};
