'use client';

import { getProfile } from '@/api/profile/profile.api';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { env } from '@/env';
import { skipToken, useQuery } from '@tanstack/react-query';
import styles from './Profile.module.scss';
import { ProfileMainInfo } from './ProfileMainInfo/ProfileMainInfo';
import { ProfileSkeleton } from './ProfileSkeleton/ProfileSkeleton';
import { ProfileStatistics } from './ProfileStatistics/ProfileStatistics';

interface ProfileProps {
	username: string;
}

export const Profile = ({ username }: ProfileProps) => {
	const { data, isLoading } = useQuery({
		queryFn: username ? () => getProfile(username) : skipToken,
		queryKey: QUERY_KEYS.profile.username(username),
		retry: false,
	});

	const backgroundItem = data?.equippedItems.find(
		(ei) => ei.item.type === 'BACKGROUND_IMAGE',
	);

	return (
		<div
			className={`${styles.profile} page`}
			style={
				backgroundItem
					? {
							backgroundImage: `url(${env.NEXT_PUBLIC_CDN_URL}/${backgroundItem.item.mediaUrl})`,
						}
					: {}
			}
		>
			<div className={`${styles.container} container page`}>
				{isLoading && <ProfileSkeleton />}
				{!isLoading && data && (
					<>
						<ProfileMainInfo profile={data} />
						{data.statistics && (
							<ProfileStatistics statistics={data.statistics} />
						)}
					</>
				)}
			</div>
		</div>
	);
};
