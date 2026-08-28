import { Expose } from 'class-transformer';
import { IsString } from 'class-validator';

export class QrCodeScanDto {
	@Expose()
	@IsString({ message: 'Token is required' })
	token: string;
}
