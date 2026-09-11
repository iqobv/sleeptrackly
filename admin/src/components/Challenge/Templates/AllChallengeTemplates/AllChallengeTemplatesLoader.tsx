import { PageWrapperLoader } from '@/components/UI';
import { ChallengeTemplatesTableFiltersLoader } from './ChallengeTemplatesTable/ChallengeTemplatesTableFiltersLoader';
import { ChallengeTemplatesTableLoader } from './ChallengeTemplatesTable/ChallengeTemplatesTableLoader';

export const AllChallengeTemplatesLoader = () => {
	return (
		<PageWrapperLoader>
			<ChallengeTemplatesTableFiltersLoader />
			<ChallengeTemplatesTableLoader />
		</PageWrapperLoader>
	);
};
