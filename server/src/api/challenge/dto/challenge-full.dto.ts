import { ChallengeTaskDto } from '@api/challenge-task/dto';
import { ApiProperty } from '@nestjs/swagger';
import { ChallengeDto } from './challenge.dto';

export class ChallengeFullDto extends ChallengeDto {
	@ApiProperty({ type: [ChallengeTaskDto] })
	tasks: ChallengeTaskDto[];
}
