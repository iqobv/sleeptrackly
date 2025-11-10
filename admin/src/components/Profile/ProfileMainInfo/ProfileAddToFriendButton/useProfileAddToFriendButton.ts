'use client';

import { QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { IFriend, IProfile, TFriendStatus } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import {
	DEFAULT_BUTTON,
	PROFILE_FRIENDS_BUTTONS,
	SUCCESS_TEXT,
} from './profileAddToFriendButtons';

export const useProfileAddToFriendButton = (profile: IProfile) => {
	const { user } = useAuth();
	const queryClient = useQueryClient();

	const buttonConfig = profile?.friendship
		? PROFILE_FRIENDS_BUTTONS(profile.id, profile?.friendship, user?.id)[
				profile.friendship.status as TFriendStatus
		  ]
		: DEFAULT_BUTTON(profile.id, user?.id);

	const { mutate, isPending } = useMutation({
		mutationFn: buttonConfig.mutationFn as () => Promise<IFriend>,
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
