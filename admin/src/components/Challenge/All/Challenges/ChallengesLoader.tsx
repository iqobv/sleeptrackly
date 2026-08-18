import { PageWrapperLoader } from '@/components/UI';
import { ChallengesTableLoader } from './ChallengesTable/ChallengesTableLoader';

export const ChallengesLoader = () => (
	<PageWrapperLoader>
		<ChallengesTableLoader />
	</PageWrapperLoader>
);
