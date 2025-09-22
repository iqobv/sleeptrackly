import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenType, User } from '@prisma/client';
import type { Request } from 'express';
import { TokenService } from 'src/api/token/token.service';
import { UserService } from 'src/api/user/user.service';
import { MailService } from 'src/infra/mail/mail.service';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { AuthService } from '../auth.service';
import { ConfirmationDto } from './dto';

@Injectable()
export class EmailConfirmationService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly tokenService: TokenService,
		private readonly userService: UserService,
		private readonly mailService: MailService,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
		private readonly configService: ConfigService,
	) {}

	async newVerification(req: Request, dto: ConfirmationDto) {
		const existsToken = await this.tokenService.findToken(
			dto.token,
			TokenType.EMAIL_VERIFICATION,
		);

		await this.userService.update(existsToken.userId, {
			emailVerified: true,
		});

		await this.tokenService.deleteToken(existsToken.id);

		const user = await this.userService.findById(existsToken.userId);

		return await this.authService.login(user, req);
	}

	async sendVerificationToken(user: User) {
		const token = await this.generateVerificationToken(user.id);

		await this.mailService.sendVerificationEmail(user.email, token.token);

		return true;
	}

	async generateVerificationToken(userId: string) {
		const token = await this.tokenService.createToken(
			userId,
			TokenType.EMAIL_VERIFICATION,
			1,
		);

		return token;
	}
}
