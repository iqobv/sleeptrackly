import { IsUUID } from 'class-validator';

export class UpdateChallengeTaskParamsDto {
	@IsUUID('4')
	challengeId: string;

	@IsUUID('4')
	taskId: string;
}
