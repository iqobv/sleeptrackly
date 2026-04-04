import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiUnauthorizedResponse } from '@nestjs/swagger';
import { UserRole } from 'generated/prisma/enums';
import { Roles } from 'src/api/auth/decorators';
import { AuthenticatedGuard, RolesGuard } from 'src/api/auth/guards';

export function Auth(...roles: UserRole[]) {
	if (roles.length > 0) {
		return applyDecorators(
			Roles(...roles),
			UseGuards(AuthenticatedGuard, RolesGuard),
			ApiUnauthorizedResponse({ description: 'Unauthorized' }),
		);
	}
	return applyDecorators(
		UseGuards(AuthenticatedGuard),
		ApiUnauthorizedResponse({ description: 'Unauthorized' }),
	);
}
