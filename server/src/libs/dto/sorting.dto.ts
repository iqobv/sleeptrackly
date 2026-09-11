import { Prisma } from '@generated/prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';

export class SortOrderDto {
	@ApiProperty({
		enum: Prisma.SortOrder,
		enumName: 'SortOrder',
		required: false,
	})
	@IsOptional()
	@IsEnum(Prisma.SortOrder)
	sortOrder?: Prisma.SortOrder;
}
