import { CustomizationPageHeaderLoader } from '../../CustomizationPageHeader';
import { CollectionListLoader } from '../CollectionList';

export const CollectionsLoader = () => {
	return (
		<div className="page">
			<CustomizationPageHeaderLoader />
			<CollectionListLoader />
		</div>
	);
};
