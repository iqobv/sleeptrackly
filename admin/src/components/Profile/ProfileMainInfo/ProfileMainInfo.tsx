'use client';

import { Avatar, SectionHeader } from '@/components/UI';
import { useAuth } from '@/hooks';
import { Profile } from '@/types';
import styles from './ProfileMainInfo.module.scss';
import ProfileSanctionsButton from './ProfileSanctionsButton/ProfileSanctionsButton';

interface ProfileMainInfoProps {
	profile: Profile;
}

const ProfileMainInfo = ({ profile }: ProfileMainInfoProps) => {
	const year = new Date(profile.createdAt).getFullYear().toString();
	const { user } = useAuth();

	return (
		<div className={styles.info}>
			<Avatar avatar={profile.avatar?.url} size={300} priority />
			<SectionHeader
				title={profile.username}
				titleComponent="h2"
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

export default ProfileMainInfo;
