'use client';

import { getProfile } from '@/api';
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
		queryKey: ['profile', username],
		queryFn: () => getProfile(username),
		enabled: !!username,
		retry: false,
	});

	return (
		<div className={styles['profile']}>
			{isLoading && <ProfileSkeleton />}
			{!isLoading && data && (
				<>
					<ProfileMainInfo profile={data} />
					<ProfileStatistics profile={data} />
				</>
			)}
		</div>
	);
};

export default Profile;
