import { Reports } from '@/components/Report/Reports/Reports';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Reports',
};

export default function ReportsPage() {
	return <Reports />;
}
