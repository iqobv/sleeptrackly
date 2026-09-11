import { Type } from 'class-transformer';
import { IsNumber, Min } from 'class-validator';

export class NotificationQueryDto {
	@Type(() => Number)
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@Min(1)
	page: number = 1;

	@Type(() => Number)
	@IsNumber({ allowNaN: false, allowInfinity: false })
	@Min(1)
	limit: number = 10;
}
