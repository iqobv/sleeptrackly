import { Reports } from '@/components/Report';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Reports',
};

export default function ReportsPage() {
	return (
		<div>
			<Reports />
		</div>
	);
}
