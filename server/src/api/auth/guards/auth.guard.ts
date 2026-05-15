import { UserService } from '@api/user/user.service';
import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly userService: UserService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req = context.switchToHttp().getRequest<Request>();

		const userId = req.session.userId;

		if (typeof userId === 'undefined') {
			throw new UnauthorizedException();
		}

		const user = await this.userService.getById(userId);

		if (!user) {
			req.session.destroy(() => {});
			return false;
		}

		req.user = {
			id: user.id,
			email: user.email,
			role: user.role,
			sessionId: 'test',
			createdAt: new Date(),
		};

		return true;
	}
}
