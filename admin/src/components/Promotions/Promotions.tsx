'use client';

import { PageWrapper } from '@/components/UI';
import { PAGES } from '@/config/pages.config';
import { PromotionsList } from './PromotionsList/PromotionsList';

export const Promotions = () => {
	return (
		<PageWrapper
			title="Promotions"
			buttonText="Add Promotion"
			showBackButton={false}
			href={PAGES.PROMOTION_NEW}
		>
			<PromotionsList />
		</PageWrapper>
	);
};
