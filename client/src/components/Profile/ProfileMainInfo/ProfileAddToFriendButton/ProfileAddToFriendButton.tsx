'use client';

import { Button } from '@/components/UI';
import { Profile } from '@/types';
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
