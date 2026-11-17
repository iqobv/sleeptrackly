import { NotificationType } from '@generated/prisma/enums';
import { plainToInstance, TransformFnParams } from 'class-transformer';
import { ChallengeFailedMetaDto } from './challenge-failed-meta.dto';
import { ChallengeFrozenMetaDto } from './challenge-frozen-meta.dto';

export const notificationTransformMetadata = ({
	obj,
	value,
}: TransformFnParams): unknown => {
	const metadata = value as unknown;

	if (!metadata) return metadata;

	switch ((obj as { type?: NotificationType }).type) {
		case NotificationType.CHALLENGE_FROZEN:
			return plainToInstance(ChallengeFrozenMetaDto, metadata);
		case NotificationType.CHALLENGE_FAILED:
			return plainToInstance(ChallengeFailedMetaDto, metadata);
		default:
			return null;
	}
};
