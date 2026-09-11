import { CookieService } from '@api/auth/cookie/cookie.service';
import { GoogleAuth } from '@api/auth/decorators/google-auth.decorator';
import { OAuthDto } from '@api/auth/dto/o-auth.dto';
import { EnvService } from '@infra/env/env.service';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { ApiSuccessResponse } from '@libs/decorators/api-response.decorator';
import { ClientInfo } from '@libs/decorators/client-info.decorator';
import { ClientInfoDto } from '@libs/dto/client-info.dto';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import {
	Body,
	Controller,
	forwardRef,
	Get,
	HttpCode,
	HttpStatus,
	Inject,
	Post,
	Req,
	Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AuthService } from '../../auth.service';
import { GoogleOneTapDto } from './dto/google-one-tap.dto';
import { GoogleService } from './google.service';

@ApiTags('Google OAuth')
@Controller('oauth/google')
export class GoogleController {
	private readonly targetOrigin: string;

	constructor(
		private readonly googleService: GoogleService,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
		private readonly cookieService: CookieService,
		private readonly envService: EnvService,
	) {
		this.targetOrigin = envService.get('OAUTH_REDIRECT_ORIGIN');
	}

	/** Initiate Google OAuth flow */
	@Get()
	@GoogleAuth()
	public async googleAuth(): Promise<void> {}

	/** Handle Google OAuth callback */
	@Get('callback')
	@GoogleAuth()
	public async googleAuthCallback(
		@Req() req: Request,
		@ClientInfo() clientInfo: ClientInfoDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<void> {
		const user = req.user as unknown as OAuthDto;

		const { accessToken, refreshToken } =
			await this.authService.validateOAuthLogin(user, clientInfo);

		this.cookieService.setAuthCookies(res, accessToken, refreshToken);

		res.send(`
			<script>
				window.opener.postMessage({ success: true }, '${this.targetOrigin}');
				window.close();
			</script>`);
	}

	/** Handle Google One Tap login */
	@Post('one-tap')
	@ApiSuccessResponse(
		HttpStatus.OK,
		SUCCESS_MESSAGES.AUTH.GOOGLE_ONE_TAP_LOGIN_SUCCESS,
	)
	@HttpCode(HttpStatus.OK)
	public async googleOneTapLogin(
		@Body() dto: GoogleOneTapDto,
		@ClientInfo() clientInfo: ClientInfoDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<MessageResponse> {
		const { accessToken, refreshToken } =
			await this.googleService.verifyOneTapToken(dto.credential, clientInfo);

		this.cookieService.setAuthCookies(res, accessToken, refreshToken);

		return SUCCESS_MESSAGES.AUTH.GOOGLE_ONE_TAP_LOGIN_SUCCESS;
	}
}
