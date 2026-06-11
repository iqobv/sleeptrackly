import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { Expose } from 'class-transformer';

export class UserSleepStatusDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() isSleeping: boolean;
	@Expose() sleepStart: Date | null;
}
