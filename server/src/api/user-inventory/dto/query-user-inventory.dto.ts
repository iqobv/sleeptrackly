import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsString, Min } from 'class-validator';

export class QueryUserInventoryDto {
	@ApiProperty({
		required: false,
		description: 'Language code for item translations',
		example: 'en',
	})
	@IsString()
	language: string;

	@ApiProperty({
		required: true,
		description: 'Page number for pagination',
		example: 1,
	})
	@Type(() => Number)
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@Min(1)
	page: number;

	@ApiProperty({
		required: true,
		description: 'Number of items per page for pagination',
		example: 10,
	})
	@Type(() => Number)
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@Min(1)
	limit: number;
}
