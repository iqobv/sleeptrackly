'use client';

import { Button } from '@/components/UI';
import { IProfile } from '@/types';
import { useProfileAddToFriendButton } from './useProfileAddToFriendButton';

interface ProfileAddToFriendButtonProps {
	profile: IProfile;
}

const ProfileAddToFriendButton = ({
	profile,
}: ProfileAddToFriendButtonProps) => {
	const { buttonConfig, isPending, mutate } =
		useProfileAddToFriendButton(profile);

	return (
		<Button
			onClick={() => mutate()}
			loading={isPending}
			disabled={buttonConfig.isDisabled || isPending}
		>
			{buttonConfig.text}
		</Button>
	);
};

export default ProfileAddToFriendButton;
