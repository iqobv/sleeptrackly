import { PlatformDto } from '@libs/dto/platform.dto';
import { IsUUID } from 'class-validator';

export class ChallengePayloadDto extends PlatformDto {
	@IsUUID('4') userId: string;
	@IsUUID('4') sleepEntryId: string;
}
