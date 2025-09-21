import { ApiProperty } from '@nestjs/swagger';
import { SleepEntryDto } from './sleep-entry.dto';

export class SleepDayDto {
	@ApiProperty({ example: '2025-01-01' })
	day: string;

	@ApiProperty({ type: SleepEntryDto })
	data: SleepEntryDto | null;
}
