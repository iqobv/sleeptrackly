import { ApiProperty } from '@nestjs/swagger';

export class QrIdDto {
	@ApiProperty({ example: 'abc123' })
	qrId: string;

	@ApiProperty({ example: new Date() })
	expiresAt: Date;
}
