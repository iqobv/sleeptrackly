import { CreateProduct } from '@/components/Customization/Products/CreateProduct/CreateProduct';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'New Product',
};

export default function NewProductPage() {
	return <CreateProduct />;
}
