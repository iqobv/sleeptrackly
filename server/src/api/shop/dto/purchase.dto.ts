import { FullCoinTransactionDto } from '@api/coin-transaction/dto';
import { PurchaseHistoryDto } from '@api/purchase-history/dto';
import { UserInventoryItemDto } from '@api/user-inventory/dto';
import { ApiProperty } from '@nestjs/swagger';

export class PurchaseDto {
	@ApiProperty({ type: FullCoinTransactionDto })
	coinTransaction: FullCoinTransactionDto;

	@ApiProperty({ type: PurchaseHistoryDto })
	purchaseHistory: PurchaseHistoryDto;

	@ApiProperty({ type: UserInventoryItemDto })
	inventoryResults: UserInventoryItemDto;
}
