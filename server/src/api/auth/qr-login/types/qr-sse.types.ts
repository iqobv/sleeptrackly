import { Expose, Type } from 'class-transformer';

export interface QrSsePayload {
	qrId: string;
	status: string;
}

export class QrSseEventDataDto {
	@Expose() status: string;
}

export class QrSseEventDto {
	@Expose()
	@Type(() => QrSseEventDataDto)
	data: QrSseEventDataDto;

	@Expose()
	type: string;
}
