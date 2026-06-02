import { IsString } from 'class-validator';

export class QrCodeScanDto {
	@IsString({ message: 'Token is required' })
	token: string;
}
