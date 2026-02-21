import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
	ApiBody,
	ApiConflictResponse,
	ApiCreatedResponse,
	ApiExcludeEndpoint,
	ApiOkResponse,
	ApiOperation,
	ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { SkipThrottle, Throttle } from '@nestjs/throttler';
import { User } from '@prisma/client';
import type { Request, Response } from 'express';
import { Auth, Authorized } from 'src/libs/decorators';
import { CreateUserDto, UserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { GoogleAuth, LocalAuth } from './decorators';
import { LoginDto, RegisterResultDto } from './dto';

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
	@LocalAuth()
	@HttpCode(HttpStatus.OK)
	@Post('login')
	async login(@Req() req: Request) {
		const user = req.user as User;
		return await this.authService.login(user, req);
	}

	@ApiOperation({ summary: 'Register with email and password' })
	@ApiBody({ type: CreateUserDto })
	@ApiCreatedResponse({ type: RegisterResultDto })
	@ApiConflictResponse({ description: 'User already exists' })
	@Throttle({
		short: { limit: 2, ttl: 1000 },
		medium: { limit: 3, ttl: 10000 },
		long: { limit: 5, ttl: 60000 },
	})
	@HttpCode(HttpStatus.CREATED)
	@Post('register')
	async register(@Body() dto: CreateUserDto) {
		return await this.authService.register(dto);
	}

	@ApiOperation({ summary: 'Login with Google' })
	@ApiOkResponse({ type: UserDto })
	@Get('google')
	@GoogleAuth()
	async googleLogin() {}

	@ApiExcludeEndpoint()
	@Get('google/callback')
	@GoogleAuth()
	async googleLoginCallback(
		@Req() req: Request,
		@Res({ passthrough: true }) res: Response,
	) {
		const user = req.user as User;
		await this.authService.login(user, req);

		res.send(`
			<script>
				window.opener.postMessage({ success: true }, '${process.env.GOOGLE_REDIRECT_ORIGIN}');
				window.close();
			</script>`);
	}

	@ApiOperation({ summary: 'Logout' })
	@ApiOkResponse()
	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		await this.authService.logout(req, res);
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
	@HttpCode(HttpStatus.NO_CONTENT)
	@Delete('delete')
	async deleteAccount(@Authorized('id') userId: string) {
		await this.userService.remove(userId);
	}
}
