import { MessageResultDto } from '@libs/dto';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterResultDto extends MessageResultDto {
	@ApiProperty({ example: 'REGISTRATION_SUCCESS' })
	declare messageCode: string;

	@ApiProperty({
		example:
			'Registration successful. Please check your email to verify your account.',
	})
	declare message: string;

	@ApiProperty({ example: 'user@example.com' })
	email: string;
}
