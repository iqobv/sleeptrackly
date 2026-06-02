import { AcquiredFrom } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto';
import { Expose } from 'class-transformer';

export class UserInventoryEntityDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() itemId: string;
	@Expose() isEquipped: boolean;
	@Expose() acquiredFrom: AcquiredFrom;
	@Expose() acquiredAt: Date;
}
