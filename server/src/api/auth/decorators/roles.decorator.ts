import { UserRole } from '@generated/prisma/enums';
import { CustomDecorator, SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'roles';

export const Roles = (...roles: UserRole[]): CustomDecorator<string> =>
	SetMetadata(ROLES_KEY, roles);
