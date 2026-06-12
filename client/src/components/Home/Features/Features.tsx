import { List, SectionHeader } from '@shared/ui';
import styles from './Features.module.scss';
import { FeaturesItem } from './FeaturesItem/FeaturesItem';
import { FEATURES_ITEMS } from './featuresItems';

export const Features = () => {
	return (
		<div className="container">
			<SectionHeader
				title="Discover Features"
				titleProps={{
					variant: 'h2',
				}}
			/>
			<List
				items={FEATURES_ITEMS}
				className={styles['features__list']}
				renderItem={(item) => <FeaturesItem key={item.title} item={item} />}
			/>
		</div>
	);
};
