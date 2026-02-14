import { ApiProperty } from '@nestjs/swagger';
import { FullCoinTransactionDto } from 'src/api/coin-transaction/dto';
import { PurchaseHistoryDto } from 'src/api/purchase-history/dto';
import { UserInventoryItemDto } from 'src/api/user-inventory/dto';

export class PurchaseDto {
	@ApiProperty({ type: FullCoinTransactionDto })
	coinTransaction: FullCoinTransactionDto;

	@ApiProperty({ type: PurchaseHistoryDto })
	purchaseHistory: PurchaseHistoryDto;

	@ApiProperty({ type: UserInventoryItemDto })
	inventoryResults: UserInventoryItemDto;
}
