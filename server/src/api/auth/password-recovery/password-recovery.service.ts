import {
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { TokenType } from '@prisma/client';
import type { Request } from 'express';
import { TokenService } from 'src/api/token/token.service';
import { PasswordRecoveryDto } from 'src/api/user/dto';
import { UserService } from 'src/api/user/user.service';
import { MailService } from 'src/infra/mail/mail.service';
import { AuthService } from '../auth.service';
import { ResetPasswordDto } from './dto';

@Injectable()
export class PasswordRecoveryService {
	constructor(
		private readonly tokenService: TokenService,
		private readonly userService: UserService,
		private readonly mailService: MailService,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
	) {}

	async sendEmailForResetPassword(email: string) {
		const user = await this.userService.findByEmail(email);

		if (!user) throw new NotFoundException('User not found');

		const token = await this.generateVerificationToken(user.id);

		await this.mailService.sendResetPasswordEmail(user.email, token.token);

		return true;
	}

	async resetPassword(req: Request, dto: ResetPasswordDto) {
		const existsToken = await this.tokenService.findToken(
			dto.token,
			TokenType.PASSWORD_RESET,
		);

		const user = await this.userService.findById(existsToken.userId);

		await this.userService.changePassword(user.id, {
			newPassword: dto.password,
		});

		await this.tokenService.deleteToken(existsToken.id);

		return await this.authService.login(user, req);
	}

	async changePassword(id: string, dto: PasswordRecoveryDto) {
		const { newPassword, oldPassword } = dto;

		const user = await this.userService.findById(id);

		await this.userService.changePassword(user.id, {
			oldPassword,
			newPassword,
		});

		return true;
	}

	async needOldPassword(id: string) {
		const user = await this.userService.findById(id, true);

		return !!user.password;
	}

	private async generateVerificationToken(userId: string) {
		const token = await this.tokenService.createToken(
			userId,
			TokenType.PASSWORD_RESET,
			1,
		);

		return token;
	}
}
