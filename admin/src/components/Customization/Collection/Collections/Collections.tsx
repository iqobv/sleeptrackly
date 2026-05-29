'use client';

import { PAGES } from '@/config';
import { CustomizationPageHeader } from '../../CustomizationPageHeader';
import { CollectionList } from '../CollectionList';

export const Collections = () => {
	return (
		<div className="page">
			<CustomizationPageHeader
				title="Collections"
				sectionHeaderProps={{
					description: 'You can view and manage your collections here.',
				}}
				href={PAGES.COLLECTION_NEW}
				buttonText="Add New Collection"
			/>
			<CollectionList />
		</div>
	);
};
