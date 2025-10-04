import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';
import { Request } from 'express';

export const Authorized = createParamDecorator(
	(data: keyof User, ctx: ExecutionContext) => {
		const req: Request = ctx.switchToHttp().getRequest();
		const user = req.user as User;

		return data ? user[data] : user;
	},
);
