import { ClientInfoDto } from '@libs/dto';
import { Type } from 'class-transformer';
import { IsDate, IsString, IsUUID } from 'class-validator';

export class CreateSessionDto {
	@IsUUID('4')
	userId: string;

	@IsString()
	hashToken: string;

	@IsDate()
	expiresAt: Date;

	@Type(() => ClientInfoDto)
	clientInfo: ClientInfoDto;
}
