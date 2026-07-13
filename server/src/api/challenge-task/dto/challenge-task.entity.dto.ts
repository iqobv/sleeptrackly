import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose } from 'class-transformer';

export class ChallengeTaskEntityDto extends DefaultFieldsDto {
	@Expose() userChallengeId: string;
	@Expose() date: string;
	@Expose() isCompleted: boolean;
	@Expose() isFailed: boolean;
	@Expose() isRecovered: boolean;
	@Expose() sleepEntryId: string | null;
}
