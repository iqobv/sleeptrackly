import { ERROR_MESSAGES } from '@libs/constants';
import { BadRequestException } from '@nestjs/common';

export class InsufficientCoinsException extends BadRequestException {
	constructor() {
		super(ERROR_MESSAGES.COIN_TRANSACTION.INSUFFICIENT_FUNDS);
	}
}
