import { FeaturedShop } from '@/components/Shop/FeaturedShop/FeaturedShop';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Shop',
};

export default function ShopPage() {
	return (
		<div className="page container">
			<FeaturedShop />
		</div>
	);
}
