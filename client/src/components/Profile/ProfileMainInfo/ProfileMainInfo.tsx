'use client';

import { Avatar, CDNImage, SectionHeader } from '@/components/UI';
import { useAuth } from '@/hooks';
import { IProfile } from '@/types';
import ProfileBadges from '../ProfileBadges/ProfileBadges';
import ProfileAddToFriendButton from './ProfileAddToFriendButton/ProfileAddToFriendButton';
import styles from './ProfileMainInfo.module.scss';
import ProfileReportButton from './ProfileReportButton/ProfileReportButton';

interface ProfileMainInfoProps {
	profile: IProfile;
}

const ProfileMainInfo = ({ profile }: ProfileMainInfoProps) => {
	const year = new Date(profile.createdAt).getFullYear().toString();
	const { user } = useAuth();

	const animatedAvatar = profile.equippedItems.find(
		(ei) => ei.item.type === 'ANIMATED_AVATAR',
	);
	const avatarFrame = profile.equippedItems.find(
		(ei) => ei.item.type === 'AVATAR_FRAME',
	);
	const badges = profile.equippedItems.filter((ei) => ei.item.type === 'BADGE');

	return (
		<div className={styles['profile-main-info']}>
			<div className={styles['profile-main-info__avatar-wrapper']}>
				<Avatar
					avatar={
						animatedAvatar ? animatedAvatar.item.mediaUrl : profile.avatar?.url
					}
					size={300}
					priority
					isVideo={!!animatedAvatar}
				/>
				{avatarFrame && (
					<CDNImage
						src={avatarFrame.item.mediaUrl}
						width={300}
						height={300}
						alt="avatar frame"
						className={styles['profile-main-info__avatar-frame']}
						key={avatarFrame.id}
					/>
				)}
			</div>
			<SectionHeader
				title={profile.username}
				titleComponent="h2"
				description={`Joined ${year}`}
				containerClassName={styles['profile-main-info__username']}
			/>
			{badges.length > 0 && <ProfileBadges badges={badges} />}
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
