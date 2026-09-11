import { SectionHeader } from '@shared/ui';
import { FeatureItem } from '../featuresItems';

interface FeaturesItemProps {
	item: FeatureItem;
}

export const FeaturesItem = ({ item }: FeaturesItemProps) => {
	return (
		<SectionHeader
			title={item.title}
			description={item.description}
			titleProps={{
				variant: 'h3',
			}}
			descriptionProps={{
				color: 'secondary',
			}}
		/>
	);
};
