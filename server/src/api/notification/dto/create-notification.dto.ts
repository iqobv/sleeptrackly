import { NotificationType } from '@generated/prisma/enums';
import { ApiPolymorphicMeta } from '@libs/decorators/api-polymorphic-meta.decorator';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import {
	IsBoolean,
	IsDate,
	IsEnum,
	IsOptional,
	IsString,
	IsUUID,
} from 'class-validator';
import { ChallengeFailedMetaDto } from './metadata/challenge-failed-meta.dto';
import { ChallengeFrozenMetaDto } from './metadata/challenge-frozen-meta.dto';
import {
	NotificationMetaMap,
	NotificationMetaModels,
} from './metadata/notification-meta-map';

@ApiExtraModels(...NotificationMetaModels)
// @ApiExtraModels(ChallengeFrozenMetaDto, ChallengeFailedMetaDto)
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
	title?: string;

	@IsString()
	@IsOptional()
	body?: string;

	@IsString()
	@IsOptional()
	redirectUrl?: string;

	@IsDate()
	@IsOptional()
	scheduledAt?: Date;

	@ApiProperty({ enum: NotificationType, enumName: 'NotificationType' })
	@IsEnum(NotificationType)
	type: NotificationType;

	@IsUUID('4')
	@IsOptional()
	weeklySleepSummaryId?: string;

	@IsUUID('4')
	@IsOptional()
	achievementId?: string;

	@IsUUID('4')
	@IsOptional()
	challengeId?: string;

	@IsUUID('4')
	@IsOptional()
	sanctionId?: string;

	@IsUUID('4')
	@IsOptional()
	friendshipId?: string;

	@IsUUID('4')
	@IsOptional()
	streakId?: string;

	@ApiPolymorphicMeta(NotificationMetaMap)
	@IsOptional()
	meta?: ChallengeFrozenMetaDto | ChallengeFailedMetaDto;
}
