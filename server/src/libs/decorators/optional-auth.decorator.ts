import { OptionalAccessTokenGuard } from '@api/auth/guards';
import { applyDecorators, UseGuards } from '@nestjs/common';

export function OptionalAuth() {
	return applyDecorators(UseGuards(OptionalAccessTokenGuard));
}
