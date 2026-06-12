'use client';

import { PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { BundlesList } from '../BundlesList/BundlesList';

export const Bundles = () => {
	return (
		<PageWrapper
			title="Bundles"
			description="You can view and manage your bundles here."
			href={PAGES.BUNDLE_NEW}
			buttonText="Add New Bundle"
			showBackButton={false}
		>
			<BundlesList />
		</PageWrapper>
	);
};
