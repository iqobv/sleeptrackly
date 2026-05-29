import { ApiProperty } from '@nestjs/swagger';
import { QrLoginStatusResponse } from '../types';

export class QrStatusDto {
	@ApiProperty({
		example: QrLoginStatusResponse.SUCCESS,
		enum: QrLoginStatusResponse,
	})
	status: QrLoginStatusResponse;
}
