import { AcquiredFrom } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserInventoryEntityDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() itemId: string;
	@Expose() isEquipped: boolean;

	@Expose()
	@ApiProperty({ enum: AcquiredFrom, enumName: 'AcquiredFrom' })
	acquiredFrom: AcquiredFrom;

	@Expose() acquiredAt: Date;
}
