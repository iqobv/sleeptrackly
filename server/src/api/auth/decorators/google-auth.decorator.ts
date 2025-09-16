import { applyDecorators, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from '../guards';

export function GoogleAuth() {
	return applyDecorators(UseGuards(GoogleAuthGuard));
}
