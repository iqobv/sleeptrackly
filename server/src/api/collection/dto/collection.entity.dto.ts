import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { OmitType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class CollectionEntityDto extends DefaultFieldsDto {
	@Expose() slug: string;
	@Expose() accentColor: string;
	@Expose() iconUrl: string;
	@Expose() showInStore: boolean;
}

export class CollectionProductEntityDto extends OmitType(DefaultFieldsDto, [
	'updatedAt',
] as const) {
	@Expose() collectionId: string;
	@Expose() productId: string;
}
