import { FormContentLoader, TranslationFormLoader } from '@/components/UI';
import { SkeletonLoader } from '@shared/ui';
import { CHALLENGE_TEMPLATE_FIELDS } from './challengeTemplateFields';
import { ChallengeTemplateGenerationMetadataLoader } from './ChallengeTemplateGenerationMetadata/ChallengeTemplateGenerationMetadataLoader';

export const ChallengeTemplateFormLoader = () => {
	return (
		<FormContentLoader>
			{Array.from({ length: CHALLENGE_TEMPLATE_FIELDS().length }).map(
				(_, i) => (
					<SkeletonLoader key={i} height={95} />
				),
			)}
			<ChallengeTemplateGenerationMetadataLoader />
			<TranslationFormLoader rows={3} />
		</FormContentLoader>
	);
};
