import { PromotionsList } from '@/components/Promotions';
import { Button } from '@shared/ui';
import { PAGES } from '@/config';
import Link from 'next/link';

export default function PromotionsPage() {
	return (
		<div>
			<Button asChild>
				<Link href={PAGES.PROMOTION_NEW} prefetch={false}>
					Create Promotion
				</Link>
			</Button>
			<PromotionsList />
		</div>
	);
}
