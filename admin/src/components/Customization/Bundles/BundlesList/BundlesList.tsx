'use client';

import { getAllBundles } from '@/api/customization/bundle/getAllBundles.api';
import { PAGES } from '@/config/pages.config';
import { QUERY_KEYS } from '@/config/queryClient.config';
import { Bundle } from '@/types/customization/bundle/bundle.types';
import { Button } from '@shared/ui';
import Link from 'next/link';
import { BundleCard } from '../../BundleCard/BundleCard';
import { ItemsListPaginatedWrapper } from '../../ItemsListPaginatedWrapper/ItemsListPaginatedWrapper';
import { BundlesListLoader } from './BundlesListLoader';

export const BundlesList = () => {
	return (
		<ItemsListPaginatedWrapper<Bundle>
			queryFn={({ language: _l, ...params }) => getAllBundles(params)}
			queryKey={({ language: _l, ...params }) =>
				QUERY_KEYS.customization.bundle.list(params)
			}
			loader={<BundlesListLoader />}
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
	);
};
