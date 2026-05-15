import { AcquiredFrom } from '@generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';

export class CreateUserInventoryDto {
	@ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
	@IsUUID('4')
	userId: string;

	@ApiProperty({ example: '660e8400-e29b-41d4-a716-446655440000' })
	@IsUUID('4')
	itemId: string;

	@ApiProperty({ example: AcquiredFrom.PURCHASE })
	@IsEnum(AcquiredFrom)
	acquiredFrom: AcquiredFrom;

	@ApiProperty({ example: new Date() })
	@IsDate()
	acquiredAt: Date;

	@ApiProperty({ example: true, required: false })
	@IsBoolean()
	@IsOptional()
	isEquipped?: boolean;
}
