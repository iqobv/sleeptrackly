import { NotificationType } from '@generated/prisma/enums';
import { Type } from '@nestjs/common';
import { ChallengeFailedMetaDto } from './challenge-failed-meta.dto';
import { ChallengeFrozenMetaDto } from './challenge-frozen-meta.dto';

export const NotificationMetaMap: Partial<
	Record<NotificationType, Type<unknown>>
> = {
	CHALLENGE_FROZEN: ChallengeFrozenMetaDto,
	CHALLENGE_FAILED: ChallengeFailedMetaDto,
};

export const NotificationMetaModels = Object.values(NotificationMetaMap);
