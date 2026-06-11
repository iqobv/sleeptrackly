import { applyDecorators, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from '../guards/google-auth.guard';

export function GoogleAuth(): ReturnType<typeof applyDecorators> {
	return applyDecorators(UseGuards(GoogleAuthGuard));
}
