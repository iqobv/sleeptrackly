import { AcquiredFrom } from '@generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';

export class CreateUserInventoryDto {
	@IsUUID('4')
	userId: string;

	@IsUUID('4')
	itemId: string;

	@ApiProperty({ enum: AcquiredFrom, enumName: 'AcquiredFrom' })
	@IsEnum(AcquiredFrom)
	acquiredFrom: AcquiredFrom;

	@IsDate()
	acquiredAt: Date;

	@IsBoolean()
	@IsOptional()
	isEquipped?: boolean;
}
