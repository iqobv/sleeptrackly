import { NotificationType } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class NotificationDto extends DefaultFieldsDto {
	@Expose() userId?: string | null;
	@Expose() weeklySleepSummaryId?: string | null;
	@Expose() achievementId?: string | null;
	@Expose() challengeId?: string | null;

	@Expose()
	@ApiProperty({ enum: NotificationType, enumName: 'NotificationType' })
	type: NotificationType;

	@Expose() isGlobal: boolean;
	@Expose() isRead: boolean;
	@Expose() isPush: boolean;
	@Expose() showInApp: boolean;
	@Expose() isScheduled: boolean;
	@Expose() isEmail: boolean;
	@Expose() title: string;
	@Expose() body?: string | null;
	@Expose() redirectUrl?: string | null;
	@Expose() scheduledAt?: Date | null;
}
