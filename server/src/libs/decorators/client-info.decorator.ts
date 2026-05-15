import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';
import { ClientInfoDto } from '../dto';
import { extractClientInfo } from '../utils';

export const ClientInfo = createParamDecorator(
	(data: keyof ClientInfoDto, ctx: ExecutionContext) => {
		const req = ctx.switchToHttp().getRequest<Request>();
		const clientInfo = extractClientInfo(req);

		return data ? clientInfo[data] : clientInfo;
	},
);
