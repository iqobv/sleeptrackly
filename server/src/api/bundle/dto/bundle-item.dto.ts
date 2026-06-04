import { FullItemDto } from '@api/item/dto';
import { Expose, Type } from 'class-transformer';
import { BundleItemEntityDto } from './bundle.entity.dto';

export class BundleItemDto extends BundleItemEntityDto {
	@Expose()
	@Type(() => FullItemDto)
	item: FullItemDto;
}
