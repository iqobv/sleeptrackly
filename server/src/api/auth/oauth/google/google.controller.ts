import { SUCCESS_MESSAGES } from '@libs/constants';
import { ApiSuccessResponse, ClientInfo } from '@libs/decorators';
import { ClientInfoDto } from '@libs/dto';
import { MessageResponse } from '@libs/types';
import { setAuthCookies } from '@libs/utils';
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
import { ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AuthService } from '../../auth.service';
import { GoogleAuth } from '../../decorators';
import { OAuthDto } from '../../dto';
import { GoogleOneTapDto } from './dto';
import { GoogleService } from './google.service';

@ApiTags('Google OAuth')
@Controller('oauth/google')
export class GoogleController {
	private readonly targetOrigin: string;

	constructor(
		private readonly googleService: GoogleService,
		private readonly configService: ConfigService,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
	) {
		this.targetOrigin = this.configService.getOrThrow<string>(
			'OAUTH_REDIRECT_ORIGIN',
		);
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

		setAuthCookies(res, accessToken, refreshToken, this.configService);

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

		setAuthCookies(res, accessToken, refreshToken, this.configService);

		return SUCCESS_MESSAGES.AUTH.GOOGLE_ONE_TAP_LOGIN_SUCCESS;
	}
}
