import { OptionalAccessTokenGuard } from '@api/auth/guards';
import { applyDecorators, UseGuards } from '@nestjs/common';

export function OptionalAuth(): MethodDecorator {
	return applyDecorators(UseGuards(OptionalAccessTokenGuard));
}
