import { Grid, SectionHeaderLoader } from '@shared/ui';
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
		<SectionHeaderLoader
			titleWidth={250}
			descriptionHeight={160}
			hasDescription
		/>
		<AchievementsListLoader />
	</>
);
