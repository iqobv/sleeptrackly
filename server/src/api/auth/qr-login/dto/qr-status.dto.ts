import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { QrLoginStatusResponse } from '../types/qr-status.types';

export class QrStatusDto {
	@Expose()
	@ApiProperty({
		enum: QrLoginStatusResponse,
		enumName: 'QrLoginStatusResponse',
	})
	status: QrLoginStatusResponse;
}
