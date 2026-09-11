import { JwtPayload } from '@libs/types/jwt-payload.types';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Authorized = createParamDecorator(
	(data: keyof JwtPayload | undefined, ctx: ExecutionContext) => {
		const req: Request = ctx.switchToHttp().getRequest();
		const user = req.user;

		if (!user) return null;

		return data ? user[data] : user;
	},
);
