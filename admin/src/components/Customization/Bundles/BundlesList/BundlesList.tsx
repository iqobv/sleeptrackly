'use client';

import { getAllBundles } from '@/api';
import { PAGES, QUERY_KEYS } from '@/config';
import { Bundle } from '@/types';
import { Button } from '@shared/ui';
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
				queryFn={({ language: _l, ...params }) => getAllBundles(params)}
				queryKey={({ language: _l, ...params }) => [
					QUERY_KEYS.customization.bundle.getAll(params),
				]}
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
