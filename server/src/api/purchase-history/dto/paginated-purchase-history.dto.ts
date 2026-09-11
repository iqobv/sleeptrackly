import { PaginatedDataDto } from '@libs/dto/paginated-data.dto';
import { Expose, Type } from 'class-transformer';
import { PurchaseHistoryDto } from './purchase-history.dto';

export class PaginatedPurchaseHistoryDto extends PaginatedDataDto<PurchaseHistoryDto> {
	@Expose()
	@Type(() => PurchaseHistoryDto)
	declare items: PurchaseHistoryDto[];
}
