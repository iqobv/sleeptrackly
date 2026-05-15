import { IsString, IsUUID } from 'class-validator';

export class CreateUserProviderDto {
	@IsString()
	provider: string;

	@IsString()
	providerId: string;

	@IsUUID('4')
	userId: string;
}
