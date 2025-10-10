'use client';

import { Button } from '@/components/UI';
import { useAuth } from '@/hooks';
import { IFriend, IProfile, TFriendStatus } from '@/types';
import { useMutation } from '@tanstack/react-query';
import styles from './ProfileAddToFriendButton.module.scss';
import {
	DEFAULT_BUTTON,
	PROFILE_FRIENDS_BUTTONS,
} from './profileAddToFriendButtons';

interface ProfileAddToFriendButtonProps {
	profile: IProfile;
}

const ProfileAddToFriendButton = ({
	profile,
}: ProfileAddToFriendButtonProps) => {
	const { user } = useAuth();

	const buttonConfig = profile?.friendship
		? PROFILE_FRIENDS_BUTTONS(profile.id, profile?.friendship, user?.id)[
				profile.friendship.status as TFriendStatus
		  ]
		: DEFAULT_BUTTON(profile.id, user?.id);

	const { mutate, isPending } = useMutation({
		mutationFn: buttonConfig.mutationFn as () => Promise<IFriend>,
	});

	return (
		<div className={styles['profile-add-to-friend']}>
			{user?.id !== profile.id && (
				<Button
					onClick={() => mutate()}
					disabled={buttonConfig.isDisabled || isPending}
				>
					{buttonConfig.text}
				</Button>
			)}
		</div>
	);
};

export default ProfileAddToFriendButton;
