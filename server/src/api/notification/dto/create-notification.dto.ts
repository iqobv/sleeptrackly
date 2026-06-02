import { NotificationType } from '@generated/prisma/enums';
import {
	IsBoolean,
	IsDate,
	IsEnum,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator';

export class CreateNotificationDto {
	@IsUUID('4')
	@IsOptional()
	userId?: string;

	@IsBoolean()
	@IsOptional()
	isGlobal?: boolean;

	@IsBoolean()
	@IsOptional()
	isRead?: boolean;

	@IsBoolean()
	@IsOptional()
	isPush?: boolean;

	@IsBoolean()
	@IsOptional()
	showInApp?: boolean;

	@IsBoolean()
	@IsOptional()
	isEmail?: boolean;

	@IsString()
	title: string;

	@IsString()
	@IsOptional()
	body?: string;

	@IsString()
	@IsOptional()
	redirectUrl?: string;

	@IsDate()
	@IsOptional()
	scheduledAt?: Date;

	@IsEnum(NotificationType)
	type: NotificationType;

	@IsUUID('4')
	@IsOptional()
	weeklySleepSummaryId?: string;

	@IsUUID('4')
	@IsOptional()
	achievementId?: string;
}
