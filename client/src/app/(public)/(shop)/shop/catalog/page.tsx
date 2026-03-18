import { AllShop } from '@/components/Shop';
import { SectionHeader } from '@/components/UI';
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
