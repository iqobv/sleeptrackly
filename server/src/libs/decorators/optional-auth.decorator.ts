import { OptionalAccessTokenGuard } from '@api/auth/guards/optional-access-token.guard';
import { applyDecorators, UseGuards } from '@nestjs/common';

export function OptionalAuth(): MethodDecorator {
	return applyDecorators(UseGuards(OptionalAccessTokenGuard));
}
