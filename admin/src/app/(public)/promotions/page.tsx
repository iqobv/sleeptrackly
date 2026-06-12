import { Promotions } from '@/components/Promotions/Promotions';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Promotions',
};

export default function PromotionsPage() {
	return <Promotions />;
}
