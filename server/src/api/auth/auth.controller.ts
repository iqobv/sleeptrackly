import {
	Auth,
	Authorized,
	ClientInfo,
	Cookie,
	OptionalAuth,
} from '@libs/decorators';
import { ClientInfoDto } from '@libs/dto';
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
import {
	ApiBody,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import type { Response } from 'express';
import { UserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { LoginDto, RegisterDto, RegisterResultDto } from './dto';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly configService: ConfigService,
	) {}

	@ApiOperation({ summary: 'Login with email and password' })
	@ApiBody({ type: LoginDto })
	@ApiUnauthorizedResponse({ description: 'Email or password is incorrect' })
	@Throttle({
		short: { limit: 2, ttl: 1000 },
		medium: { limit: 3, ttl: 10000 },
		long: { limit: 5, ttl: 60000 },
	})
	@ApiOkResponse({ type: UserDto })
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(
		@Body() dto: LoginDto,
		@ClientInfo() clientInfo: ClientInfoDto,
		@Res({ passthrough: true }) res: Response,
	) {
		const { accessToken, refreshToken } = await this.authService.login(
			dto,
			clientInfo,
		);
		setAuthCookies(res, accessToken, refreshToken, this.configService);
		return { message: 'Login successful' };
	}

	@ApiOperation({ summary: 'Register with email and password' })
	@ApiCreatedResponse({ type: RegisterResultDto })
	@ApiConflictResponse({ description: 'User already exists' })
	@Throttle({
		short: { limit: 2, ttl: 1000 },
		medium: { limit: 3, ttl: 10000 },
		long: { limit: 5, ttl: 60000 },
	})
	@HttpCode(HttpStatus.CREATED)
	@Post('register')
	async register(@Body() dto: RegisterDto) {
		return await this.authService.register(dto);
	}

	@OptionalAuth()
	@ApiOperation({ summary: 'Logout' })
	@ApiOkResponse()
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(
		@Cookie('refreshToken') rawRefreshToken: string | undefined,
		@Authorized('id') userId: string,
		@Res({ passthrough: true }) res: Response,
	) {
		if (!rawRefreshToken)
			throw new UnauthorizedException('Refresh token is missing');

		await this.authService.logout(rawRefreshToken, userId);

		clearAuthCookies(res, this.configService);

		return { message: 'Logout successful' };
	}

	@ApiOperation({ summary: 'Refresh tokens' })
	@Post('refresh')
	async refreshTokens(
		@Cookie('refreshToken') rawRefreshToken: string,
		@ClientInfo() clientInfo: ClientInfoDto,
		@Res({ passthrough: true }) res: Response,
	) {
		if (!rawRefreshToken)
			throw new UnauthorizedException('Refresh token is missing');

		try {
			const { accessToken, refreshToken } =
				await this.authService.refreshTokens(rawRefreshToken, clientInfo);
			setAuthCookies(res, accessToken, refreshToken, this.configService);
		} catch (error) {
			clearAuthCookies(res, this.configService);
			throw error;
		}

		return { message: 'Tokens refreshed successfully' };
	}

	@ApiOperation({ summary: 'Get profile' })
	@ApiOkResponse({ type: UserDto })
	@Auth()
	@SkipThrottle()
	@HttpCode(HttpStatus.OK)
	@Get('me')
	async getProfile(@Authorized('id') userId: string) {
		return await this.userService.findById(userId);
	}

	@ApiOperation({ summary: 'Delete account' })
	@Throttle({ long: { limit: 5, ttl: 60000 } })
	@ApiOkResponse()
	@Auth()
	@Delete('delete')
	async deleteAccount(
		@Authorized('id') userId: string,
		@Res({ passthrough: true }) res: Response,
	) {
		const result = await this.userService.remove(userId);

		clearAuthCookies(res, this.configService);

		return result;
	}
}
