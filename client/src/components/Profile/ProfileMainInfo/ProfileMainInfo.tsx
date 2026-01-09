'use client';

import { Avatar, SectionHeader } from '@/components/UI';
import { useAuth } from '@/hooks';
import { IProfile } from '@/types';
import ProfileAddToFriendButton from './ProfileAddToFriendButton/ProfileAddToFriendButton';
import styles from './ProfileMainInfo.module.scss';
import ProfileReportButton from './ProfileReportButton/ProfileReportButton';

interface ProfileMainInfoProps {
	profile: IProfile;
}

const ProfileMainInfo = ({ profile }: ProfileMainInfoProps) => {
	const year = new Date(profile.createdAt).getFullYear().toString();
	const { user } = useAuth();

	return (
		<div className={styles['profile-main-info']}>
			<div className={styles['profile-main-info__avatar-wrapper']}>
				<Avatar avatar={profile.avatar?.url} size={300} priority />
			</div>
			<SectionHeader
				title={profile.username}
				titleComponent="h2"
				description={`Joined ${year}`}
				containerClassName={styles['profile-main-info__username']}
			/>
			{profile && user && user.id !== profile.id && (
				<div className={styles['profile-main-info__buttons']}>
					<ProfileAddToFriendButton profile={profile} />
					<ProfileReportButton profile={profile} />
				</div>
			)}
		</div>
	);
};

export default ProfileMainInfo;
