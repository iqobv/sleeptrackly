import { ApiProperty } from '@nestjs/swagger';
import { SleepEntryDto } from 'src/api/sleep-entry/dto';
import { SleepStatusDto } from './sleep-status.dto';

export class UpdatedSleepStatusDto {
	@ApiProperty({ type: SleepStatusDto })
	userSleepStatus: SleepStatusDto;

	@ApiProperty({ type: SleepEntryDto })
	sleepEntry: SleepEntryDto | null;
}
