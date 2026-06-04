import { TranslationDto } from '@libs/dto';
import { Expose, Type } from 'class-transformer';
import { PurchaseHistoryEntityDto } from './purchase-history.entity.dto';

export class PurchaseHistoryDto extends PurchaseHistoryEntityDto {
	@Expose()
	@Type(() => TranslationDto)
	nameSnapshot: TranslationDto;
}
