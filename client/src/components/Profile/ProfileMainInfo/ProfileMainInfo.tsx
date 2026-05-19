'use client';

import { Avatar, CDNImage, SectionHeader } from '@/components/UI';
import { useAuth } from '@/hooks';
import { Profile } from '@/types';
import ProfileBadges from '../ProfileBadges/ProfileBadges';
import ProfileAddToFriendButton from './ProfileAddToFriendButton/ProfileAddToFriendButton';
import styles from './ProfileMainInfo.module.scss';
import ProfileReportButton from './ProfileReportButton/ProfileReportButton';

interface ProfileMainInfoProps {
	profile: Profile;
}

const ProfileMainInfo = ({ profile }: ProfileMainInfoProps) => {
	const year = new Date(profile.createdAt).getFullYear().toString();
	const { user } = useAuth();

	const avatar = profile.equippedItems.find(
		(ei) => ei.item.type === 'ANIMATED_AVATAR' || ei.item.type === 'AVATAR',
	);
	const avatarFrame = profile.equippedItems.find(
		(ei) => ei.item.type === 'AVATAR_FRAME',
	);
	const badges = profile.equippedItems.filter((ei) => ei.item.type === 'BADGE');

	return (
		<div className={styles.info}>
			<div className={styles.avatarWrapper}>
				<Avatar
					avatar={avatar ? avatar.item.mediaUrl : profile.avatar?.url}
					size={300}
					priority
					isVideo={avatar?.item.isAnimated}
				/>
				{avatarFrame && (
					<CDNImage
						src={avatarFrame.item.mediaUrl}
						width={300}
						height={300}
						alt="avatar frame"
						className={styles.avatarFrame}
						key={avatarFrame.id}
						preload
					/>
				)}
			</div>
			<SectionHeader
				title={profile.username}
				titleComponent="h2"
				description={`Joined ${year}`}
				containerClassName={styles.username}
			/>
			{badges.length > 0 && <ProfileBadges badges={badges} />}
			{profile && user && user.id !== profile.id && (
				<div className={styles.buttons}>
					<ProfileAddToFriendButton profile={profile} />
					<ProfileReportButton profile={profile} />
				</div>
			)}
		</div>
	);
};

export default ProfileMainInfo;
