import { Report } from '@/components/Report/Report/Report';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Report',
};

interface ReportPageProps {
	params: Promise<{ id: string }>;
}

export default async function ReportPage({ params }: ReportPageProps) {
	const { id } = await params;

	return <Report id={id} />;
}
