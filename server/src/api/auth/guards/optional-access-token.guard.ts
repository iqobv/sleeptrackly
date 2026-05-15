import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalAccessTokenGuard extends AuthGuard('jwt') {
	handleRequest<TUser = unknown>(
		err: Error | null,
		user: TUser | false,
	): TUser | null {
		if (err || !user) {
			return null;
		}
		return user;
	}
}
