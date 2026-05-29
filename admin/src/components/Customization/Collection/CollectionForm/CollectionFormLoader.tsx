import { SkeletonLoader } from '@/components/UI';
import { TranslationFormLoader } from '../../TranslationForm';

export const CollectionFormLoader = () => {
	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				gap: '0.5rem',
				marginBottom: '1.25rem',
			}}
		>
			{Array.from({ length: 5 }).map((_, i) => (
				<SkeletonLoader key={i} height={95} />
			))}
			<TranslationFormLoader />
		</div>
	);
};
