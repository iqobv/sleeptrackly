import { NotificationType } from '@generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsDate,
	IsEnum,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator';

export class CreateNotificationDto {
	@ApiProperty({ example: '68ffff65-5934-41ef-b351-db066542eb06' })
	@IsUUID('4')
	@IsOptional()
	userId?: string;

	@ApiProperty({ example: true })
	@IsBoolean()
	@IsOptional()
	isGlobal?: boolean;

	@ApiProperty({ example: true })
	@IsBoolean()
	@IsOptional()
	isRead?: boolean;

	@ApiProperty({ example: true })
	@IsBoolean()
	@IsOptional()
	isPush?: boolean;

	@ApiProperty({ example: true })
	@IsBoolean()
	@IsOptional()
	showInApp?: boolean;

	@ApiProperty({ example: true })
	@IsBoolean()
	@IsOptional()
	isEmail?: boolean;

	@ApiProperty({ example: 'Notification Title' })
	@IsString()
	title: string;

	@ApiProperty({ example: 'Notification body text' })
	@IsString()
	@IsOptional()
	body?: string;

	@ApiProperty({ example: '/dashboard' })
	@IsString()
	@IsOptional()
	redirectUrl?: string;

	@ApiProperty({ example: new Date().toISOString() })
	@IsDate()
	@IsOptional()
	scheduledAt?: Date;

	@ApiProperty({ example: NotificationType.OTHER, enum: NotificationType })
	@IsEnum(NotificationType)
	type: NotificationType;

	@ApiProperty({ example: '68ffff65-5934-41ef-b351-db066542eb06' })
	@IsUUID('4')
	@IsOptional()
	weeklySleepSummaryId?: string;
}
