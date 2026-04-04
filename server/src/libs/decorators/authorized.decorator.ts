import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { User } from 'generated/prisma/client';

export const Authorized = createParamDecorator(
	(data: keyof User, ctx: ExecutionContext) => {
		const req: Request = ctx.switchToHttp().getRequest();
		const user = req.user as User;

		if (!user) return null;

		return data ? user[data] : user;
	},
);
