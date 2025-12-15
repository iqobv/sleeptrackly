import { FeatureItem } from '../featuresItems';
import styles from './FeaturesItem.module.scss';

interface FeaturesItemProps {
	item: FeatureItem;
}

const FeaturesItem = ({ item }: FeaturesItemProps) => {
	return (
		<div className={styles['features-item']}>
			<div className={styles['features-item__icon']}>{item.icon}</div>
			<div>
				<p className={styles['features-item__title']}>{item.title}</p>
				<p className={styles['features-item__description']}>
					{item.description}
				</p>
			</div>
		</div>
	);
};

export default FeaturesItem;
