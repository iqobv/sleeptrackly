import { EnvService } from '@infra/env/env.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { authEnvSchema } from '../../../config/schemas/auth.schema';
import { OAuthDto } from '../dto/o-auth.dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(private readonly envService: EnvService) {
		const config = envService.getGroup(authEnvSchema);

		super({
			clientID: config.GOOGLE_CLIENT_ID,
			clientSecret: config.GOOGLE_CLIENT_SECRET,
			callbackURL: config.GOOGLE_REDIRECT,
			scope: ['email', 'profile'],
		});
	}

	public validate(
		_accessToken: string,
		_refreshToken: string,
		profile: Profile,
		done: VerifyCallback,
	): void {
		const { id, emails, photos, username } = profile;

		if (!emails || emails.length === 0) {
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.NO_EMAIL_ASSOCIATED);
		}

		const user: OAuthDto = {
			provider: 'google',
			providerId: id,
			avatarUrl: photos?.[0]?.value,
			email: emails[0].value,
			username: username || 'NO_USERNAME',
		};

		done(null, user);
	}
}
