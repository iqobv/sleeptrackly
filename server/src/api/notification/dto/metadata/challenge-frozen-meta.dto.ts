import { ChallengeFailReason } from '@api/challenge/types/challenge-fail-reason.types';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ChallengeFrozenMetaDto {
	@Expose()
	@ApiProperty({ enum: ChallengeFailReason, enumName: 'ChallengeFailReason' })
	reason: ChallengeFailReason;

	@Expose() recoveriesLeft: number;
}
