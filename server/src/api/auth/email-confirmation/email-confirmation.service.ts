import {
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TokenType } from '@prisma/client';
import type { Request } from 'express';
import { TokenService } from 'src/api/token/token.service';
import { UserService } from 'src/api/user/user.service';
import { MailService } from 'src/infra/mail/mail.service';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { AuthService } from '../auth.service';
import { ConfirmationDto, ResendEmailDto } from './dto';

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

		if (!existsToken.userId) throw new NotFoundException('Token not found');

		await this.userService.update(existsToken.userId, {
			emailVerified: true,
		});

		await this.tokenService.deleteToken(existsToken.id);

		const user = await this.userService.findById(existsToken.userId);

		return await this.authService.login(user, req);
	}

	async sendVerificationEmail(dto: ResendEmailDto) {
		const { email } = dto;

		const user = await this.userService.findByEmail(email);

		if (!user) return;

		const token = await this.generateVerificationToken(user.id);

		await this.mailService.sendVerificationEmail(user.email, token.token);
	}

	async generateVerificationToken(userId: string) {
		const token = await this.tokenService.createToken(
			userId,
			TokenType.EMAIL_VERIFICATION,
			60,
		);

		return token;
	}
}
