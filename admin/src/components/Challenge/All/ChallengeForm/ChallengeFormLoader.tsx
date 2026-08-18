import { FormContentLoader, TranslationFormLoader } from '@/components/UI';
import { SkeletonLoader } from '@shared/ui';
import { CHALLENGE_FIELDS } from './challengeFormFields';

export const ChallengeFormLoader = () => {
	return (
		<FormContentLoader>
			{Array.from({ length: CHALLENGE_FIELDS().length }).map((_, i) => (
				<SkeletonLoader key={i} height={95} />
			))}
			<SkeletonLoader height={95} />
			<SkeletonLoader height={95} />
			<SkeletonLoader height={24} width={150} />
			<SkeletonLoader height={44} width={150} />
			<TranslationFormLoader rows={3} />
		</FormContentLoader>
	);
};
