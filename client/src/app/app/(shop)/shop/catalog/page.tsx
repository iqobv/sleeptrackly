import { AllShop } from '@/components/Shop/AllShop/AllShop';
import { SectionHeader } from '@shared/ui';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Shop',
};

export default function CatalogPage() {
	return (
		<div className="container page" style={{ paddingBottom: 120 }}>
			<SectionHeader title="Shop Catalog" />
			<AllShop />
		</div>
	);
}
