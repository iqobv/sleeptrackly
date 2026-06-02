import { FullCoinTransactionDto } from '@api/coin-transaction/dto';
import { PurchaseHistoryDto } from '@api/purchase-history/dto';
import { UserInventoryDto } from '@api/user-inventory/dto';
import { Expose, Type } from 'class-transformer';

export class PurchaseDto {
	@Expose()
	@Type(() => FullCoinTransactionDto)
	coinTransaction: FullCoinTransactionDto;

	@Expose()
	@Type(() => PurchaseHistoryDto)
	purchaseHistory: PurchaseHistoryDto;

	@Expose()
	@Type(() => UserInventoryDto)
	inventoryResults: UserInventoryDto[];
}
