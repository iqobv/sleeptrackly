import { PageWrapperLoader } from '@/components/UI';
import { BundleFormLoader } from '../BundleForm/BundleFormLoader';

export const UpdateBundleLoader = () => (
	<PageWrapperLoader showBackButton showRightButton>
		<BundleFormLoader isEdit />
	</PageWrapperLoader>
);
