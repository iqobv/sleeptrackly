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

	return (
		<div className={styles['profile']}>
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
	);
};

export default Profile;
