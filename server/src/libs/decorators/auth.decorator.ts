import { applyDecorators, UseGuards } from '@nestjs/common';
import { UserRole } from '@prisma/client';
import { Roles } from 'src/api/auth/decorators';
import { AuthenticatedGuard, RolesGuard } from 'src/api/auth/guards';

export function Auth(...roles: UserRole[]) {
	if (roles.length > 0) {
		return applyDecorators(
			Roles(...roles),
			UseGuards(AuthenticatedGuard, RolesGuard),
		);
	}
	return applyDecorators(UseGuards(AuthenticatedGuard));
}
