import { TokenType } from '@generated/prisma/enums';
import { IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';

export class CreateTokenDto {
	@IsUUID('4')
	@IsOptional()
	userId: string | null;

	@IsEnum(TokenType)
	type: TokenType;

	@IsDate()
	expiresAt: Date;
}
