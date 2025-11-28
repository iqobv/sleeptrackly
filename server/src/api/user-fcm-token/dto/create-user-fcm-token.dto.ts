import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateUserFcmTokenDto {
	@ApiProperty({
		example: 'fcm_token_1234567890abcdef',
	})
	@IsString()
	token: string;
}
