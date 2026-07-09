import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { JwtPayload } from '@libs/types/jwt-payload.types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AccessTokenGuard extends AuthGuard('jwt') {
	public handleRequest<TUser = JwtPayload>(err: unknown, user: unknown): TUser {
		if (err || !user) {
			throw err instanceof Error
				? err
				: new UnauthorizedException(ERROR_MESSAGES.AUTH.UNAUTHORIZED);
		}

		return user as TUser;
	}
}
