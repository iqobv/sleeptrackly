import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
	constructor(private readonly configService: ConfigService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req: Request = context.switchToHttp().getRequest();
		const res = context.switchToHttp().getResponse();

		if (req.isAuthenticated()) return true;

		await new Promise<void>((resolve) => {
			req.session.destroy(() => resolve());
		});

		res.clearCookie('session', {
			path: '/',
			httpOnly: true,
		});

		throw new UnauthorizedException();
	}
}
