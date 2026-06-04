import { PaginatedDataDto } from '@libs/dto';
import { Expose, Type } from 'class-transformer';
import { NotificationDto } from './notification.dto';

export class PaginatedNotificationDto extends PaginatedDataDto<NotificationDto> {
	@Expose()
	@Type(() => NotificationDto)
	declare items: NotificationDto[];
}
