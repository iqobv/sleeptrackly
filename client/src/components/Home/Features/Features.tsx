import { List, SectionHeader } from '@/components/UI';
import styles from './Features.module.scss';
import FeaturesItem from './FeaturesItem/FeaturesItem';
import { FEATURES_ITEMS } from './featuresItems';

const Features = () => {
	return (
		<div className="container">
			<SectionHeader title="Discover Features" titleComponent="h2" />
			<List
				items={FEATURES_ITEMS}
				className={styles['features__list']}
				renderItem={(item) => <FeaturesItem key={item.title} item={item} />}
			/>
		</div>
	);
};

export default Features;
