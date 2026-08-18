import { PageWrapperLoader } from '@/components/UI';
import { ChallengeTemplateFormLoader } from '../ChallengeTemplateForm/ChallengeTemplateFormLoader';

export const CreateChallengeTemplateLoader = () => {
	return (
		<PageWrapperLoader showBackButton>
			<ChallengeTemplateFormLoader />
		</PageWrapperLoader>
	);
};
