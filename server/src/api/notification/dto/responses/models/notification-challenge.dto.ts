import { ChallengeDto } from '@api/challenge/dto/challenge.dto';
import { PickType } from '@nestjs/swagger';

export class NotificationChallengeDto extends PickType(ChallengeDto, [
	'id',
	'translation',
] as const) {}
