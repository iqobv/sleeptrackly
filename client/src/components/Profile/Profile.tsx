'use client';

import { getProfile } from '@/api';
import { QUERY_KEYS } from '@/config';
import { useQuery } from '@tanstack/react-query';
import styles from './Profile.module.scss';
import ProfileMainInfo from './ProfileMainInfo/ProfileMainInfo';
import ProfileSkeleton from './ProfileSkeleton/ProfileSkeleton';
import ProfileStatistics from './ProfileStatistics/ProfileStatistics';

interface ProfileProps {
	username: string;
}

const Profile = ({ username }: ProfileProps) => {
	const { data, isLoading } = useQuery({
		queryFn: () => getProfile(username),
		queryKey: QUERY_KEYS.profile.username(username),
		enabled: !!username,
		retry: false,
	});

	const backgroundItem = data?.equippedItems.find(
		(ei) => ei.item.type === 'BACKGROUND_IMAGE',
	);

	return (
		<div
			className={`${styles['profile']} page`}
			style={
				backgroundItem
					? {
							backgroundImage: `url(${process.env.NEXT_PUBLIC_CDN_URL}/${backgroundItem.item.mediaUrl})`,
						}
					: {}
			}
		>
			<div className={`${styles['profile__container']} container page`}>
				{isLoading && <ProfileSkeleton />}
				{!isLoading && data && (
					<>
						<ProfileMainInfo profile={data} />
						<ProfileStatistics profile={data} />
					</>
				)}
			</div>
		</div>
	);
};

export default Profile;
