import { Expose } from 'class-transformer';

export class QrIdDto {
	@Expose() qrId: string;
	@Expose() expiresAt: Date;
}
