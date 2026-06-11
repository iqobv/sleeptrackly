'use client';

import { PageWrapper } from '@/components/UI';
import { PAGES } from '@/config';
import { ProductsList } from '../ProductsList/ProductsList';

export const Products = () => {
	return (
		<PageWrapper
			title="Products"
			description="Manage your products here. You can add, edit, or remove products as needed."
			href={PAGES.PRODUCT_NEW}
			buttonText="Add New Product"
			showBackButton={false}
		>
			<ProductsList />
		</PageWrapper>
	);
};
