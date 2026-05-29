import { CustomizationLinks } from '@/components/Customization/CustomizationLinks';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Customization',
};

export default function CustomizationPage() {
	return <CustomizationLinks />;
}
