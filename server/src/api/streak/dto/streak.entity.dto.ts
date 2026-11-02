import { StreakStatus } from '@generated/prisma/enums';
import { DefaultFieldsDto } from '@libs/dto/default-fields.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class StreakEntityDto extends DefaultFieldsDto {
	@Expose() userId: string;
	@Expose() startDate: Date;
	@Expose() endDate: Date | null;
	@Expose() length: number;
	@Expose() restoresUsed: number;
	@Expose() lastRestoredAt: Date | null;
	@Expose() lastActivityDate: string;

	@ApiProperty({ enum: StreakStatus, enumName: 'StreakStatus' })
	@Expose()
	status: StreakStatus;
}
