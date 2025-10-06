'use client';

import { Avatar, SectionHeader } from '@/components/UI';
import { IProfile } from '@/types';
import styles from './ProfileMainInfo.module.scss';

interface ProfileMainInfoProps {
	profile: IProfile;
}

const ProfileMainInfo = ({ profile }: ProfileMainInfoProps) => {
	const year = new Date(profile.createdAt).getFullYear().toString();

	return (
		<div className={styles['profile-main-info']}>
			<Avatar avatar={profile.avatar?.url} size={300} />
			<SectionHeader
				title={profile.username}
				titleComponent="h2"
				description={`Joined ${year}`}
				containerClassName={styles['profile-main-info__username']}
			/>
		</div>
	);
};

export default ProfileMainInfo;
