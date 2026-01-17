import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export class PaginationQueryDto {
	@ApiProperty({
		required: false,
		description: 'Page number for pagination',
		example: 1,
	})
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	page?: number = 1;

	@ApiProperty({
		required: false,
		description: 'Number of items per page for pagination',
		example: 20,
	})
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@IsOptional()
	@Type(() => Number)
	@IsInt()
	@Min(1)
	limit?: number = 20;
}
