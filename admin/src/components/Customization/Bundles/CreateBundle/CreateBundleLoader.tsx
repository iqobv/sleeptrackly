import { PageWrapperLoader } from '@/components/UI';
import { BundleFormLoader } from '../BundleForm/BundleFormLoader';

export const CreateBundleLoader = () => (
	<PageWrapperLoader showBackButton>
		<BundleFormLoader />
	</PageWrapperLoader>
);
