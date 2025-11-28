import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class NotificationQueryDto {
	@ApiProperty({
		required: false,
		description: 'Page number for pagination',
		example: 1,
	})
	@Type(() => Number)
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@Min(1)
	page: number = 1;

	@ApiProperty({
		required: false,
		description: 'Number of items per page for pagination',
		example: 10,
	})
	@Type(() => Number)
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@Min(1)
	limit: number = 10;
}
