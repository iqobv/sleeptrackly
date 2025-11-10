import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsOptional } from 'class-validator';

export class UpdateUserSanctionDto {
	@ApiProperty({
		example: '2025-01-01T00:00:00.000Z',
	})
	@IsDateString()
	@IsOptional()
	endsAt?: Date;
}
