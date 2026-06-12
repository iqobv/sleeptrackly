import { Roles } from '@api/auth/decorators/roles.decorator';
import { AccessTokenGuard } from '@api/auth/guards/access-token.guard';
import { RolesGuard } from '@api/auth/guards/roles.guard';
import { UserRole } from '@generated/prisma/enums';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
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
