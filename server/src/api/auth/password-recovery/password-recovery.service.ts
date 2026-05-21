import { TokenService } from '@api/token/token.service';
import { PasswordRecoveryDto } from '@api/user/dto';
import { UserService } from '@api/user/user.service';
import { Prisma } from '@generated/prisma/client';
import { TokenType } from '@generated/prisma/enums';
import { MailService } from '@infra/mail/mail.service';
import { ClientInfoDto } from '@libs/dto';
import {
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
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

		const message =
			'If a user with this email exists, a password reset email has been sent';

		if (!user) return { message };

		const token = await this.generateVerificationToken(user.id);

		await this.mailService.sendResetPasswordEmail(user.email, token);

		return { message };
	}

	async resetPassword(dto: ResetPasswordDto, clientInfo: ClientInfoDto) {
		const existsToken = await this.tokenService.findToken(
			dto.token,
			TokenType.PASSWORD_RESET,
		);

		if (!existsToken.userId) throw new NotFoundException('Token not found');

		const user = await this.userService.findById(existsToken.userId);

		await this.userService.changePassword(user.id, {
			newPassword: dto.password,
		});

		await this.tokenService.deleteToken(existsToken.id);

		return await this.authService.generateAndSaveTokens(user, clientInfo);
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

	private async generateVerificationToken(
		userId: string,
		tx?: Prisma.TransactionClient,
	) {
		const { token } = await this.tokenService.createToken(
			{
				userId,
				type: TokenType.PASSWORD_RESET,
				expiresAt: new Date(Date.now() + 1 * 60 * 60 * 1000),
			},
			tx,
		);

		return token;
	}
}
