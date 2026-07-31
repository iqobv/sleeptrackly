'use client';

import { UserAvatar } from '@/components/UI/UserAvatar/UserAvatar';
import { useAuth } from '@/hooks/useAuth';
import { Profile } from '@shared/types';
import { SectionHeader } from '@shared/ui';
import styles from './ProfileMainInfo.module.scss';
import { ProfileSanctionsButton } from './ProfileSanctionsButton/ProfileSanctionsButton';

interface ProfileMainInfoProps {
	profile: Profile;
}

export const ProfileMainInfo = ({ profile }: ProfileMainInfoProps) => {
	const year = new Date(profile.createdAt).getFullYear().toString();
	const { user } = useAuth();

	return (
		<div className={styles.info}>
			<UserAvatar avatarPath={profile.avatar?.url} size={300} />
			<SectionHeader
				title={profile.username}
				titleProps={{
					variant: 'h2',
				}}
				description={`Joined ${year}`}
				containerClassName={styles.username}
			/>
			{profile && user && user.id !== profile.id && (
				<div className={styles.buttons}>
					<ProfileSanctionsButton profile={profile} />
				</div>
			)}
		</div>
	);
};
