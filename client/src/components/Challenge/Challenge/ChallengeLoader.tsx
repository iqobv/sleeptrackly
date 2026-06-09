import { SkeletonLoader } from '@shared/ui';
import { CalendarLoader } from '../Calendar';
import { ChallengeInfoLoader } from '../ChallengeInfo';
import { ChallengeSummaryLoader } from '../ChallengeSummary';

export const ChallengeLoader = () => (
	<div>
		<ChallengeSummaryLoader />
		<CalendarLoader />
		<ChallengeInfoLoader />
	</div>
);

export const ChallengePageLoader = () => (
	<div className="container">
		<div style={{ padding: '1.25rem 0' }}>
			<SkeletonLoader height="3rem" width="13.75rem" />
			<SkeletonLoader
				height="1.5rem"
				width="11.25rem"
				style={{ marginTop: 'var(--gap)' }}
			/>
		</div>
		<ChallengeLoader />
	</div>
);
