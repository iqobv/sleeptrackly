import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class QrCodeScanDto {
	@ApiProperty({ example: 'a81bc81bdead4e5dabff90865d1e13b1' })
	@IsString({ message: 'Token is required' })
	token: string;
}
