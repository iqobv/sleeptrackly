import { Grid, SectionHeader, SkeletonLoader } from '@shared/ui';
import { AchievementItemLoader } from './AchievementItem/AchievementItemLoader';

export const AchievementsListLoader = () => {
	return (
		<Grid columns={2} gap={16}>
			{Array.from({ length: 4 }).map((_, i) => (
				<AchievementItemLoader key={i} />
			))}
		</Grid>
	);
};

export const AchievementsPageLoader = () => (
	<>
		<SectionHeader
			title={<SkeletonLoader width="16.5rem" height="3rem" />}
			titleProps={{ as: 'div' }}
			description={<SkeletonLoader width="10rem" height="1.5rem" />}
			descriptionProps={{ as: 'div' }}
		/>
		<AchievementsListLoader />
	</>
);
