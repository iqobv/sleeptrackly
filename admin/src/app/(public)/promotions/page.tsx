import { PromotionsList } from '@/components/Promotions';
import { Button } from '@/components/UI';
import { PAGES } from '@/config';
import Link from 'next/link';

export default function PromotionsPage() {
	return (
		<div>
			<Button asChild>
				<Link href={PAGES.PROMOTION_NEW}>Create Promotion</Link>
			</Button>
			<PromotionsList />
		</div>
	);
}
