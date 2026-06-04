import { Roles } from '@api/auth/decorators';
import { AccessTokenGuard, RolesGuard } from '@api/auth/guards';
import { UserRole } from '@generated/prisma/enums';
import { ERROR_MESSAGES } from '@libs/constants';
import { applyDecorators, HttpStatus, UseGuards } from '@nestjs/common';
import { ApiErrorResponse } from './api-response.decorator';

const errorResponse = ApiErrorResponse(
	HttpStatus.UNAUTHORIZED,
	ERROR_MESSAGES.AUTH.UNAUTHORIZED,
);

export function Auth(...roles: UserRole[]): ReturnType<typeof applyDecorators> {
	if (roles.length > 0) {
		return applyDecorators(
			Roles(...roles),
			UseGuards(AccessTokenGuard, RolesGuard),
			errorResponse,
		);
	}
	return applyDecorators(UseGuards(AccessTokenGuard), errorResponse);
}
