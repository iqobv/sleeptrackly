import { SectionHeaderLoader } from '@shared/ui';
import { CalendarLoader } from '../Calendar/CalendarLoader';
import { ChallengeInfoLoader } from '../ChallengeInfo/ChallengeInfoLoader';
import { ChallengeSummaryLoader } from '../ChallengeSummary/ChallengeSummaryLoader';

export const ChallengeLoader = () => (
	<div>
		<ChallengeSummaryLoader />
		<CalendarLoader />
		<ChallengeInfoLoader />
	</div>
);

export const ChallengePageLoader = () => (
	<div className="container">
		<SectionHeaderLoader
			titleWidth={220}
			descriptionWidth={180}
			hasDescription
		/>
		<ChallengeLoader />
	</div>
);
