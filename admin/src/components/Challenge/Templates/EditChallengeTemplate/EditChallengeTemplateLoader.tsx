import { PageWrapperLoader } from '@/components/UI';
import { SkeletonLoader } from '@shared/ui';
import { ChallengeTemplateFormLoader } from '../ChallengeTemplateForm/ChallengeTemplateFormLoader';

export const EditChallengeTemplateLoader = () => {
	return (
		<PageWrapperLoader
			showBackButton
			customRightSlot={<SkeletonLoader height={44} width={44} />}
		>
			<ChallengeTemplateFormLoader />
		</PageWrapperLoader>
	);
};
