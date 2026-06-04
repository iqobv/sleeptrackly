import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy, VerifyCallback } from 'passport-google-oauth20';
import { OAuthDto } from '../dto';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
	constructor(private readonly configService: ConfigService) {
		super({
			clientID: configService.getOrThrow<string>('GOOGLE_CLIENT_ID'),
			clientSecret: configService.getOrThrow<string>('GOOGLE_CLIENT_SECRET'),
			callbackURL: configService.getOrThrow<string>('GOOGLE_REDIRECT'),
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
			throw new UnauthorizedException('No email associated with this account!');
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
