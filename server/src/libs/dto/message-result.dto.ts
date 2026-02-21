import { ApiProperty } from '@nestjs/swagger';

export class MessageResultDto {
	@ApiProperty({ example: true })
	success: boolean;

	@ApiProperty({ example: 'MESSAGE_CODE' })
	messageCode: string;

	@ApiProperty({
		example: 'Message.',
	})
	message: string;
}
