import { Roles } from '@api/auth/decorators';
import { AccessTokenGuard, RolesGuard } from '@api/auth/guards';
import { UserRole } from '@generated/prisma/enums';
import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';

export function Auth(...roles: UserRole[]) {
	if (roles.length > 0) {
		return applyDecorators(
			Roles(...roles),
			UseGuards(AccessTokenGuard, RolesGuard),
			ApiUnauthorizedResponse({ description: 'Unauthorized' }),
		);
	}
	return applyDecorators(
		UseGuards(AccessTokenGuard),
		ApiUnauthorizedResponse({ description: 'Unauthorized' }),
	);
}
