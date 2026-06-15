import { InventoryListLoader } from '@/components/Inventory/InventoryList/InventoryListLoader';

export default function InventoryPageLoading() {
	return (
		<div className="page container">
			<InventoryListLoader />
		</div>
	);
}
