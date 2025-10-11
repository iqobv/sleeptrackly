'use client';

import { Button } from '@/components/UI';
import { QUERY_KEYS } from '@/config';
import { useAuth } from '@/hooks';
import { IFriend, IProfile, TFriendStatus } from '@/types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import styles from './ProfileAddToFriendButton.module.scss';
import {
	DEFAULT_BUTTON,
	PROFILE_FRIENDS_BUTTONS,
	SUCCESS_TEXT,
} from './profileAddToFriendButtons';

interface ProfileAddToFriendButtonProps {
	profile: IProfile;
}

const ProfileAddToFriendButton = ({
	profile,
}: ProfileAddToFriendButtonProps) => {
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

	return (
		<div className={styles['profile-add-to-friend']}>
			{user && user?.id !== profile.id && (
				<Button
					onClick={() => mutate()}
					loading={isPending}
					disabled={buttonConfig.isDisabled || isPending}
				>
					{buttonConfig.text}
				</Button>
			)}
		</div>
	);
};

export default ProfileAddToFriendButton;
