import { TokenType } from '@generated/prisma/enums';
import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional, IsUUID } from 'class-validator';

export class CreateTokenDto {
	@IsUUID('4')
	@IsOptional()
	userId: string | null;

	@ApiProperty({ enum: TokenType, enumName: 'TokenType' })
	@IsEnum(TokenType)
	type: TokenType;

	@IsDate()
	expiresAt: Date;
}
