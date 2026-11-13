import { BaseUserSanctionDto } from '@api/user-sanction/dto/user-sanction.dto';
import { NotificationType } from '@generated/prisma/enums';
import { ApiPolymorphicMeta } from '@libs/decorators/api-polymorphic-meta.decorator';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { ChallengeFailedMetaDto } from './metadata/challenge-failed-meta.dto';
import { ChallengeFrozenMetaDto } from './metadata/challenge-frozen-meta.dto';
import {
	NotificationMetaMap,
	NotificationMetaModels,
} from './metadata/notification-meta-map';

@ApiExtraModels(...NotificationMetaModels)
export class NotificationDto extends DefaultFieldsDto {
	@Expose() userId: string | null;
	@Expose() weeklySleepSummaryId: string | null;
	@Expose() achievementId: string | null;
	@Expose() challengeId: string | null;
	@Expose() sanctionId: string | null;
	@Expose() friendshipId: string | null;
	@Expose() streakId: string | null;

	@Expose()
	@ApiProperty({ enum: NotificationType, enumName: 'NotificationType' })
	type: NotificationType;

	@Expose() isGlobal: boolean;
	@Expose() isRead: boolean;
	@Expose() isPush: boolean;
	@Expose() showInApp: boolean;
	@Expose() isScheduled: boolean;
	@Expose() isEmail: boolean;
	@Expose() title: string | null;
	@Expose() body: string | null;
	@Expose() redirectUrl: string | null;
	@Expose() scheduledAt: Date | null;

	@ApiPolymorphicMeta(NotificationMetaMap)
	@Expose()
	meta: ChallengeFrozenMetaDto | ChallengeFailedMetaDto | null;

	@Expose()
	@Type(() => BaseUserSanctionDto)
	sanction: BaseUserSanctionDto | null;
}
