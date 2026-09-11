import { IsDate, IsOptional, IsString } from 'class-validator';
import { CreateSessionDto } from './create-session.dto';

export class RotateSessionDto extends CreateSessionDto {
	@IsString()
	@IsOptional()
	previousToken?: string;

	@IsDate()
	@IsOptional()
	rotatedAt?: Date;
}
