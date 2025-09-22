'use client';

import { PageHeader } from '@/components/UI';
import { IProfile } from '@/types';
import Image from 'next/image';
import styles from './ProfileMainInfo.module.scss';

interface ProfileMainInfoProps {
	profile: IProfile;
}

const ProfileMainInfo = ({ profile }: ProfileMainInfoProps) => {
	const year = new Date(profile.createdAt).getFullYear().toString();

	return (
		<div className={styles['profile-main-info']}>
			<Image
				src={`/api/images/${profile?.avatar?.url || 'default-avatar.png'}`}
				width={300}
				height={300}
				alt="avatar"
				className={styles['profile-main-info__avatar-image']}
				priority
			/>
			<PageHeader
				title={profile.username}
				titleComponent="h2"
				description={`Joined ${year}`}
				containerClassName={styles['profile-main-info__username']}
			/>
		</div>
	);
};

export default ProfileMainInfo;
