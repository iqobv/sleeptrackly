'use client';

import { PageWrapper } from '@/components/UI';
import { PAGES } from '@/config';
import { CollectionList } from '../CollectionList/CollectionList';

export const Collections = () => {
	return (
		<PageWrapper
			title="Collections"
			description="You can view and manage your collections here."
			showBackButton={false}
			buttonText="Add New Collection"
			href={PAGES.COLLECTION_NEW}
		>
			<CollectionList />
		</PageWrapper>
	);
};
