import { Platform } from '@generated/prisma/enums';
import {
	BadRequestException,
	createParamDecorator,
	ExecutionContext,
} from '@nestjs/common';

export const CurrentPlatform = createParamDecorator(
	(data: unknown, ctx: ExecutionContext): Platform => {
		const request = ctx.switchToHttp().getRequest();

		const platformHeader = request.headers['x-client-platform'];

		if (!platformHeader) return Platform.WEB;

		const platform = platformHeader.toString().toUpperCase();

		if (Object.values(Platform).includes(platform)) return platform;

		throw new BadRequestException('Invalid client platform header');
	},
);
