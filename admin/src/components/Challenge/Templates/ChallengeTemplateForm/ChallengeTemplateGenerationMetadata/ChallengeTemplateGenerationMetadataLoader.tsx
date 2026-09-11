import { PrimitiveArrayFieldLoader } from '@/components/Challenge/PrimitiveArrayField/PrimitiveArrayFieldLoader';
import { SkeletonLoader } from '@shared/ui';

export const ChallengeTemplateGenerationMetadataLoader = () => {
	return (
		<>
			<SkeletonLoader height={95} />
			<PrimitiveArrayFieldLoader />
		</>
	);
};
