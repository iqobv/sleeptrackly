import { PageWrapperLoader } from '../UI';
import { PromotionsListLoader } from './PromotionsList';

export const PromotionsLoader = () => (
	<PageWrapperLoader showRightButton>
		<PromotionsListLoader />
	</PageWrapperLoader>
);
