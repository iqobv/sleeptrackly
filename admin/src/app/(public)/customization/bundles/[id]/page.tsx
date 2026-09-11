import { UpdateBundle } from '@/components/Customization/Bundles/UpdateBundle/UpdateBundle';

interface BundlePageProps {
	params: Promise<{ id: string }>;
}

export default async function BundlePage({ params }: BundlePageProps) {
	const { id } = await params;

	return <UpdateBundle id={id} />;
}
