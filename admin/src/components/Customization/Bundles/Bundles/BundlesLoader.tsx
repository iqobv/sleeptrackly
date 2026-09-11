import { PageWrapperLoader } from '@/components/UI';
import { BundlesListLoader } from '../BundlesList/BundlesListLoader';

export const BundlesLoader = () => (
	<PageWrapperLoader showBackButton={false} showRightButton>
		<BundlesListLoader />
	</PageWrapperLoader>
);
