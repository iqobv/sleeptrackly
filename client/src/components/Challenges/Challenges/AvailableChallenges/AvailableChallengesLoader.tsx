import { Grid, SectionHeaderLoader } from '@shared/ui';
import { AvailableChallengeCardLoader } from './AvailableChallengeCard/AvailableChallengeCardLoader';

export const AvailableChallengesGridLoader = () => (
	<Grid columns={2} stretchLastOdd>
		{Array.from({ length: 2 }).map((_, i) => (
			<AvailableChallengeCardLoader key={i} />
		))}
	</Grid>
);

export const AvailableChallengesLoader = () => (
	<div>
		<SectionHeaderLoader
			titleHeight={38}
			titleWidth={170}
			hasDescription
			padding={10}
		/>
		<AvailableChallengesGridLoader />
	</div>
);
