import { SleepEntryDto } from '@api/sleep-entry/dto/sleep-entry.dto';
import { Expose, Type } from 'class-transformer';
import { UserSleepStatusDto } from './sleep-status.dto';

export class UpdatedSleepRewardDto {
	@Expose() rewarded: boolean;
	@Expose() amount: number;
}

export class UpdatedSleepStatusDto {
	@Expose()
	@Type(() => UserSleepStatusDto)
	userSleepStatus: UserSleepStatusDto;

	@Expose()
	@Type(() => SleepEntryDto)
	sleepEntry: SleepEntryDto | null;

	@Expose()
	@Type(() => UpdatedSleepRewardDto)
	reward: UpdatedSleepRewardDto | null;
}
