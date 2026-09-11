import { IsUUID } from 'class-validator';

export class ChallengePayloadDto {
	@IsUUID('4') userId: string;
	@IsUUID('4') sleepEntryId: string;
}
