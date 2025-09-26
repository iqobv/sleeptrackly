import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import type { Request } from 'express';
import { UserService } from 'src/api/user/user.service';

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly userService: UserService) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const req: Request = context.switchToHttp().getRequest();

		const userId = req.session.userId;

		if (typeof userId === 'undefined') {
			throw new UnauthorizedException();
		}

		const user = await this.userService.getById(userId);

		if (!user) {
			req.cookies['session'] = '';
			return false;
		}

		req.user = user;

		return true;
	}
}
