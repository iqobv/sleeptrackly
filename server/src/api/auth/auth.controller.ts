import { FullUserDto } from '@api/user/dto/full-user.dto';
import { UserDto } from '@api/user/dto/user-response.dto';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import {
	ApiErrorResponse,
	ApiSuccessResponse,
} from '@libs/decorators/api-response.decorator';
import { Auth } from '@libs/decorators/auth.decorator';
import { Authorized } from '@libs/decorators/authorized.decorator';
import { ClientInfo } from '@libs/decorators/client-info.decorator';
import { Cookie } from '@libs/decorators/cookie.decorator';
import { OptionalAuth } from '@libs/decorators/optional-auth.decorator';
import { ClientInfoDto } from '@libs/dto/client-info.dto';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { clearAuthCookies, setAuthCookies } from '@libs/utils/cookie.util';
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
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

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
	@ApiOkResponse({ type: UserDto })
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
	): Promise<UserDto> {
		const { user, accessToken, refreshToken } = await this.authService.login(
			dto,
			clientInfo,
		);
		setAuthCookies(res, accessToken, refreshToken, this.configService);

		return user;
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
