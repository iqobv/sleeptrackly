import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
	Auth,
	Authorized,
	ClientInfo,
	Cookie,
	OptionalAuth,
} from '@libs/decorators';
import { ClientInfoDto } from '@libs/dto';
import { MessageResponse } from '@libs/types';
import { clearAuthCookies, setAuthCookies } from '@libs/utils';
import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Res,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import type { Response } from 'express';
import { FullUserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto } from './dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly configService: ConfigService,
	) {}

	/** Login with email and password */
	@Throttle({
		short: { limit: 2, ttl: 1000 },
		medium: { limit: 3, ttl: 10000 },
		long: { limit: 5, ttl: 60000 },
	})
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS)
	@ApiErrorResponse(
		HttpStatus.UNAUTHORIZED,
		ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS,
	)
	@HttpCode(HttpStatus.OK)
	@Post('login')
	public async login(
		@Body() dto: LoginDto,
		@ClientInfo() clientInfo: ClientInfoDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<MessageResponse> {
		const { accessToken, refreshToken } = await this.authService.login(
			dto,
			clientInfo,
		);
		setAuthCookies(res, accessToken, refreshToken, this.configService);

		return SUCCESS_MESSAGES.AUTH.LOGIN_SUCCESS;
	}

	/** Register a new user */
	@Throttle({
		short: { limit: 2, ttl: 1000 },
		medium: { limit: 3, ttl: 10000 },
		long: { limit: 5, ttl: 60000 },
	})
	@ApiSuccessResponse(HttpStatus.CREATED, {
		...SUCCESS_MESSAGES.AUTH.REGISTRATION_SUCCESS,
		meta: { email: 'user@example.com' },
	})
	@ApiErrorResponse(HttpStatus.CONFLICT, ERROR_MESSAGES.USER.ALREADY_EXISTS)
	@HttpCode(HttpStatus.CREATED)
	@Post('register')
	public async register(@Body() dto: RegisterDto): Promise<MessageResponse> {
		return await this.authService.register(dto);
	}

	/** Logout */
	@OptionalAuth()
	@SkipThrottle()
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.LOGOUT_SUCCESS)
	@ApiErrorResponse(
		HttpStatus.UNAUTHORIZED,
		ERROR_MESSAGES.AUTH.REFRESH_TOKEN_MISSING,
	)
	@HttpCode(HttpStatus.OK)
	@Post('logout')
	public async logout(
		@Cookie('refreshToken') rawRefreshToken: string | undefined,
		@Authorized('id') userId: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<MessageResponse> {
		if (!rawRefreshToken)
			throw new UnauthorizedException(
				ERROR_MESSAGES.AUTH.REFRESH_TOKEN_MISSING,
			);

		await this.authService.logout(rawRefreshToken, userId);

		clearAuthCookies(res, this.configService);

		return SUCCESS_MESSAGES.AUTH.LOGOUT_SUCCESS;
	}

	/** Refresh access and refresh tokens */
	@OptionalAuth()
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.TOKENS_REFRESHED)
	@ApiErrorResponse(
		HttpStatus.UNAUTHORIZED,
		ERROR_MESSAGES.AUTH.REFRESH_TOKEN_MISSING,
	)
	@HttpCode(HttpStatus.OK)
	@Post('refresh')
	public async refreshTokens(
		@Cookie('refreshToken') rawRefreshToken: string,
		@ClientInfo() clientInfo: ClientInfoDto,
		@Res({ passthrough: true }) res: Response,
	): Promise<MessageResponse> {
		if (!rawRefreshToken)
			throw new UnauthorizedException(
				ERROR_MESSAGES.AUTH.REFRESH_TOKEN_MISSING,
			);

		try {
			const { accessToken, refreshToken } =
				await this.authService.refreshTokens(rawRefreshToken, clientInfo);
			setAuthCookies(res, accessToken, refreshToken, this.configService);
		} catch (error) {
			clearAuthCookies(res, this.configService);
			throw error;
		}

		return SUCCESS_MESSAGES.AUTH.TOKENS_REFRESHED;
	}

	/** Get profile */
	@Auth()
	@SkipThrottle()
	@ApiOkResponse({ type: FullUserDto })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.USER.NOT_FOUND)
	@Get('me')
	public async getProfile(
		@Authorized('id') userId: string,
	): Promise<FullUserDto> {
		return await this.userService.findById(userId);
	}

	/** Delete account */
	@Auth()
	@Throttle({ long: { limit: 5, ttl: 60000 } })
	@ApiErrorResponse(HttpStatus.NOT_FOUND, ERROR_MESSAGES.USER.NOT_FOUND)
	@ApiSuccessResponse(HttpStatus.OK, SUCCESS_MESSAGES.AUTH.USER_DELETED)
	@Delete('delete')
	public async deleteAccount(
		@Authorized('id') userId: string,
		@Res({ passthrough: true }) res: Response,
	): Promise<MessageResponse> {
		await this.userService.remove(userId);

		clearAuthCookies(res, this.configService);

		return SUCCESS_MESSAGES.AUTH.USER_DELETED;
	}
}
