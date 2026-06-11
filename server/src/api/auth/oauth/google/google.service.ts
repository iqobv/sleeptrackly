import { TokensDto } from '@api/auth/dto/tokens.dto';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { ClientInfoDto } from '@libs/dto/client-info.dto';
import {
	forwardRef,
	Inject,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { AuthService } from '../../auth.service';

@Injectable()
export class GoogleService {
	private readonly googleClient: OAuth2Client;
	private readonly googleClientId: string;

	constructor(
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
	) {
		this.googleClientId =
			this.configService.getOrThrow<string>('GOOGLE_CLIENT_ID');
		this.googleClient = new OAuth2Client(this.googleClientId);
	}

	public async verifyOneTapToken(
		credential: string,
		clientInfo: ClientInfoDto,
	): Promise<TokensDto> {
		try {
			const ticket = await this.googleClient.verifyIdToken({
				idToken: credential,
				audience: this.googleClientId,
			});

			const payload = ticket.getPayload();

			if (!payload || !payload.email || !payload.sub) {
				throw new UnauthorizedException(
					ERROR_MESSAGES.AUTH.INVALID_GOOGLE_TOKEN,
				);
			}

			return await this.authService.validateOAuthLogin(
				{
					provider: 'google',
					providerId: payload.sub,
					email: payload.email,
					avatarUrl: payload.picture,
					username: 'NO_USERNAME',
				},
				clientInfo,
			);
		} catch {
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.INVALID_GOOGLE_TOKEN);
		}
	}
}
