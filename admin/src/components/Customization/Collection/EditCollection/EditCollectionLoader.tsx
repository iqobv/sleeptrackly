import { CustomizationPageHeaderLoader } from '../../CustomizationPageHeader';
import { CollectionFormLoader } from '../CollectionForm';

export const EditCollectionLoader = () => {
	return (
		<div className="page">
			<CustomizationPageHeaderLoader />
			<CollectionFormLoader />
		</div>
	);
};
