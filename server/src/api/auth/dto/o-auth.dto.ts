import { CreateUserDto } from '@api/user/dto';
import { OmitType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class OAuthDto extends OmitType(CreateUserDto, [
	'password',
	'emailVerified',
] as const) {
	@IsString()
	provider: string;

	@IsString()
	providerId: string;

	@IsString()
	@IsOptional()
	avatarUrl?: string;

	@IsString()
	username: string;
}
