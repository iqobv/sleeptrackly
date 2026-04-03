import { PromotionsList } from '@/components/Promotions';
import { Button } from '@/components/UI';
import { PAGES } from '@/config';

export default function PromotionsPage() {
	return (
		<div>
			<Button href={PAGES.PROMOTION_NEW}>Create Promotion</Button>
			<PromotionsList />
		</div>
	);
}
