'use client';

import { Avatar, SectionHeader } from '@/components/UI';
import { useAuth } from '@/hooks';
import { IProfile } from '@/types';
import styles from './ProfileMainInfo.module.scss';
import ProfileSanctionsButton from './ProfileSanctionsButton/ProfileSanctionsButton';

interface ProfileMainInfoProps {
	profile: IProfile;
}

const ProfileMainInfo = ({ profile }: ProfileMainInfoProps) => {
	const year = new Date(profile.createdAt).getFullYear().toString();
	const { user } = useAuth();

	return (
		<div className={styles['profile-main-info']}>
			<Avatar avatar={profile.avatar?.url} size={300} priority />
			<SectionHeader
				title={profile.username}
				titleComponent="h2"
				description={`Joined ${year}`}
				containerClassName={styles['profile-main-info__username']}
			/>
			{profile && user && user.id !== profile.id && (
				<div className={styles['profile-main-info__buttons']}>
					<ProfileSanctionsButton profile={profile} />
					{/* <Button isIcon variant="text">
						<MdOutlineAdminPanelSettings size={25} />
					</Button> */}
				</div>
			)}
		</div>
	);
};

export default ProfileMainInfo;
