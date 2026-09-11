import { Grid, SectionHeaderLoader } from '@shared/ui';
import { ActiveChallengeCardLoader } from './ActiveChallengeCard/ActiveChallengeCardLoader';

export const ActiveChallengesGridLoader = () => (
	<Grid columns={2} stretchLastOdd>
		{Array.from({ length: 3 }).map((_, i) => (
			<ActiveChallengeCardLoader key={i} />
		))}
	</Grid>
);

export const ActiveChallengesLoader = () => (
	<div>
		<SectionHeaderLoader
			titleHeight={38}
			titleWidth={170}
			hasDescription
			padding={10}
		/>
		<ActiveChallengesGridLoader />
	</div>
);
