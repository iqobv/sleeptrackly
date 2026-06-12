'use client';

import { CDNImage, UserAvatar } from '@/components/UI';
import { useAuth } from '@/hooks/useAuth.hook';
import { Profile } from '@/types/profile/profile.types';
import { SectionHeader } from '@shared/ui';
import { ProfileBadges } from '../ProfileBadges/ProfileBadges';
import { ProfileAddToFriendButton } from './ProfileAddToFriendButton/ProfileAddToFriendButton';
import styles from './ProfileMainInfo.module.scss';
import { ProfileReportButton } from './ProfileReportButton/ProfileReportButton';

interface ProfileMainInfoProps {
	profile: Profile;
}

export const ProfileMainInfo = ({ profile }: ProfileMainInfoProps) => {
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
				<UserAvatar
					avatarPath={avatar ? avatar.item.mediaUrl : profile.avatar?.url}
					size={300}
					isAnimated={avatar?.item.isAnimated}
				/>
				{avatarFrame && (
					<CDNImage
						path={avatarFrame.item.mediaUrl}
						width={300}
						height={300}
						alt="avatar frame"
						className={styles.avatarFrame}
						key={avatarFrame.id}
					/>
				)}
			</div>
			<SectionHeader
				title={profile.username}
				titleProps={{
					variant: 'h2',
				}}
				description={`Joined ${year}`}
				textAlign="center"
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
