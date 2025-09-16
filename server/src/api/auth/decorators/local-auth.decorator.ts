import { applyDecorators, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from '../guards';

export function LocalAuth() {
	return applyDecorators(UseGuards(LocalAuthGuard));
}
