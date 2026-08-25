import { IsEnum, IsOptional, IsString } from 'class-validator';
import { QrLoginStatus, QrLoginStatusResponse } from '../types/qr-status.types';

export class QrStatusApprovedDto {
	@IsEnum(QrLoginStatus)
	status: typeof QrLoginStatus.APPROVED = QrLoginStatus.APPROVED;

	@IsString()
	userId: string;

	@IsString()
	tokenId: string;
}

export class QrStatusPendingDto {
	@IsEnum(QrLoginStatus)
	status: typeof QrLoginStatus.PENDING = QrLoginStatus.PENDING;
}

export class QrStatusExpiredDto {
	@IsEnum(QrLoginStatus)
	status: typeof QrLoginStatus.EXPIRED = QrLoginStatus.EXPIRED;

	@IsString()
	error: string;
}

export class FinalizeQrLoginResponseDto {
	@IsEnum(QrLoginStatusResponse)
	status: QrLoginStatusResponse;

	@IsString()
	@IsOptional()
	accessToken?: string;

	@IsString()
	@IsOptional()
	refreshToken?: string;
}
