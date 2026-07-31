import { PageWrapperLoader } from '@/components/UI';
import { SkeletonLoader } from '@shared/ui';
import { ChallengeFormLoader } from '../ChallengeForm/ChallengeFormLoader';

export const EditChallengeLoader = () => {
	return (
		<PageWrapperLoader
			customRightSlot={<SkeletonLoader width={44} height={44} />}
			showBackButton
		>
			<ChallengeFormLoader />
		</PageWrapperLoader>
	);
};
