import { UpdateBundle } from '@/components/Customization/Bundles';

interface BundlePageProps {
	params: Promise<{ id: string }>;
}

export default async function BundlePage({ params }: BundlePageProps) {
	const { id } = await params;

	return (
		<div>
			<UpdateBundle id={id} />
		</div>
	);
}
