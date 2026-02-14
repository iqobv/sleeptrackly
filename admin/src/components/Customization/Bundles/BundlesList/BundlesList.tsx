'use client';

import { getAllBundles } from '@/api';
import { Button } from '@/components/UI';
import { PAGES, QUERY_KEYS } from '@/config';
import { IBundle } from '@/types';
import BundleCard from '../../BundleCard/BundleCard';
import ItemsListPaginatedWrapper from '../../ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';

const BundlesList = () => {
	return (
		<div>
			<Button href={PAGES.BUNDLE_NEW}>New Bundle</Button>
			<ItemsListPaginatedWrapper<IBundle>
				queryFn={getAllBundles}
				queryKey={(query) => [QUERY_KEYS.customization.bundle.getAll(query)]}
				itemCard={(bundle) => (
					<BundleCard
						actions={
							<Button
								fullWidth
								variant="secondary"
								href={PAGES.BUNDLE(bundle.id)}
							>
								View
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
