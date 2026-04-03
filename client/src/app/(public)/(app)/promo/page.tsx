import { Promotion } from '@/components/Promotion';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Promotion',
};

export default function PromotionPage() {
	return (
		<div className="container page">
			<Promotion />
		</div>
	);
}
