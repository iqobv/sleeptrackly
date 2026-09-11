import { ClientInfoDto } from '@libs/dto/client-info.dto';
import { extractClientInfo } from '@libs/utils/client-info.util';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

export const ClientInfo = createParamDecorator(
	(data: keyof ClientInfoDto, ctx: ExecutionContext) => {
		const req = ctx.switchToHttp().getRequest<Request>();
		const clientInfo = extractClientInfo(req);

		return data ? clientInfo[data] : clientInfo;
	},
);
