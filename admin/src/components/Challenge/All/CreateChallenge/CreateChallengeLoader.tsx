import { PageWrapperLoader } from '@/components/UI';
import { ChallengeFormLoader } from '../ChallengeForm/ChallengeFormLoader';

export const CreateChallengeLoader = () => {
	return (
		<PageWrapperLoader showBackButton>
			<ChallengeFormLoader />
		</PageWrapperLoader>
	);
};
