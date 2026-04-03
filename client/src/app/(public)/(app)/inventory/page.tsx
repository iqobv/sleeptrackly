import { InventoryList } from '@/components/Inventory';
import { SectionHeader } from '@/components/UI';
import { Metadata } from 'next';

export const metadata: Metadata = {
	title: 'Inventory',
	description: 'Manage your inventory items.',
};

export default function InventoryPage() {
	return (
		<div className="page container" style={{ paddingBottom: 100 }}>
			<SectionHeader
				title="My Inventory"
				description="Manage your inventory items."
			/>
			<InventoryList />
		</div>
	);
}
