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
		const req = context.switchToHttp().getRequest() as Request;

		const userId = req.session.userId;

		if (typeof userId === 'undefined') {
			throw new UnauthorizedException();
		}

		const user = await this.userService.findById(userId);

		req.user = user;

		return true;
	}
}
