import { AcquiredFrom } from '@generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';

export class UserInventoryItemDto {
	@ApiProperty({ example: 'a511a531-25ce-45fe-a522-7d044a9d9497' })
	id: string;

	@ApiProperty({ example: 'a511a531-25ce-45fe-a522-7d044a9d9497' })
	userId: string;

	@ApiProperty({ example: 'a511a531-25ce-45fe-a522-7d044a9d9497' })
	itemId: string;

	@ApiProperty({ example: true })
	isEquipped: boolean;

	@ApiProperty({ example: AcquiredFrom.PURCHASE, enum: AcquiredFrom })
	acquiredFrom: AcquiredFrom;

	@ApiProperty({ example: new Date() })
	acquiredAt: Date;

	@ApiProperty({ example: new Date() })
	createdAt: Date;

	@ApiProperty({ example: new Date() })
	updatedAt: Date;
}
