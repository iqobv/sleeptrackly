import { CustomizationPageHeaderLoader } from '../../CustomizationPageHeader';
import { CollectionFormLoader } from '../CollectionForm';

export const CreateCollectionLoader = () => {
	return (
		<div className="page">
			<CustomizationPageHeaderLoader />
			<CollectionFormLoader />
		</div>
	);
};
