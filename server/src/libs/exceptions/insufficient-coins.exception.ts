import { BadRequestException } from '@nestjs/common';

export class InsufficientCoinsException extends BadRequestException {
	constructor() {
		super({
			message: 'Insufficient coins',
			errorCode: 'INSUFFICIENT_FUNDS',
		});
	}
}
