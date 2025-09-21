import { ApiProperty } from '@nestjs/swagger';
import { ChallengeTaskDto } from 'src/api/challenge-task/dto';
import { ChallengeDto } from './challenge.dto';

export class ChallengeFullDto extends ChallengeDto {
	@ApiProperty({ type: [ChallengeTaskDto] })
	tasks: ChallengeTaskDto[];
}
