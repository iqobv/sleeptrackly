'use client';

import { getAllBundles } from '@/api';
import { Button } from '@/components/UI';
import { PAGES, QUERY_KEYS } from '@/config';
import { Bundle } from '@/types';
import Link from 'next/link';
import BundleCard from '../../BundleCard/BundleCard';
import { CustomizationPageHeader } from '../../CustomizationPageHeader';
import ItemsListPaginatedWrapper from '../../ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';

const BundlesList = () => {
	return (
		<div>
			<CustomizationPageHeader
				title="Bundles"
				href={PAGES.BUNDLE_NEW}
				buttonText="Add New Bundle"
			/>
			<ItemsListPaginatedWrapper<Bundle>
				queryFn={getAllBundles}
				queryKey={(query) => [QUERY_KEYS.customization.bundle.getAll(query)]}
				itemCard={(bundle) => (
					<BundleCard
						actions={
							<Button fullWidth variant="contained" color="secondary" asChild>
								<Link href={PAGES.BUNDLE(bundle.id)} prefetch={false}>
									View
								</Link>
							</Button>
						}
						bundle={bundle}
					/>
				)}
			/>
		</div>
	);
};

export default BundlesList;
