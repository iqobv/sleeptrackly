import { PageWrapperLoader } from '../UI';
import { PromotionsListLoader } from './PromotionsList/PromotionsListLoader';

export const PromotionsLoader = () => (
	<PageWrapperLoader showRightButton>
		<PromotionsListLoader />
	</PageWrapperLoader>
);
