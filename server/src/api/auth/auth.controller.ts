import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	Req,
	Res,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ApiBody } from '@nestjs/swagger';
import { User } from '@prisma/client';
import type { Request, Response } from 'express';
import { Auth, Authorized } from 'src/libs/decorators';
import { CreateUserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { GoogleAuth, LocalAuth } from './decorators';

@Controller('auth')
export class AuthController {
	constructor(
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly configService: ConfigService,
	) {}

	@LocalAuth()
	@ApiBody({ type: CreateUserDto })
	@Post('login')
	async login(@Req() req: Request) {
		const user = req.user as User;
		return await this.authService.login(user, req);
	}

	@Post('register')
	async register(@Req() req: Request, @Body() dto: CreateUserDto) {
		return await this.authService.register(dto, req);
	}

	@Get('google')
	@GoogleAuth()
	async googleLogin(@Req() req: Request) {}

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

	@Post('logout')
	@HttpCode(HttpStatus.OK)
	async logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
		await this.authService.logout(req, res);
	}

	@Auth()
	@HttpCode(HttpStatus.OK)
	@Get('me')
	async getProfile(@Authorized('id') userId: string) {
		return await this.userService.findById(userId);
	}
}
