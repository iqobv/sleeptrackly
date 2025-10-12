'use client';

import { Button } from '@/components/UI';
import { IProfile } from '@/types';
import styles from './ProfileAddToFriendButton.module.scss';
import { useProfileAddToFriendButton } from './useProfileAddToFriendButton';

interface ProfileAddToFriendButtonProps {
	profile: IProfile;
}

const ProfileAddToFriendButton = ({
	profile,
}: ProfileAddToFriendButtonProps) => {
	const { user, buttonConfig, isPending, mutate } =
		useProfileAddToFriendButton(profile);

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
