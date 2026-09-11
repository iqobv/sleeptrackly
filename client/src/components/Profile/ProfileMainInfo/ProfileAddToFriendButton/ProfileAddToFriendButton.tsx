'use client';

import { Profile } from '@/types/profile/profile.types';
import { Button } from '@shared/ui';
import { useProfileAddToFriendButton } from './useProfileAddToFriendButton';

interface ProfileAddToFriendButtonProps {
	profile: Profile;
}

export const ProfileAddToFriendButton = ({
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
