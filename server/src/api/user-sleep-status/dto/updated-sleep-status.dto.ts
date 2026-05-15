import { SleepEntryDto } from '@api/sleep-entry/dto';
import { ApiProperty } from '@nestjs/swagger';
import { SleepStatusDto } from './sleep-status.dto';

export class UpdatedSleepStatusDto {
	@ApiProperty({ type: SleepStatusDto })
	userSleepStatus: SleepStatusDto;

	@ApiProperty({ type: SleepEntryDto })
	sleepEntry: SleepEntryDto | null;
}
