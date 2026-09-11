import { TokenService } from '@api/token/token.service';
import { PasswordRecoveryDto } from '@api/user/dto/password.dto';
import { UserService } from '@api/user/services/user.service';
import { Prisma } from '@generated/prisma/client';
import { TokenType } from '@generated/prisma/enums';
import { MailService } from '@infra/mail/mail.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { ClientInfoDto } from '@libs/dto/client-info.dto';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import {
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { TokensDto } from '../dto/tokens.dto';
import { ResetPasswordDto } from './dto/reset-password.dto';

@Injectable()
export class PasswordRecoveryService {
	constructor(
		private readonly tokenService: TokenService,
		private readonly userService: UserService,
		private readonly mailService: MailService,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
	) {}

	public async sendEmailForResetPassword(
		email: string,
	): Promise<MessageResponse> {
		const user = await this.userService.findByEmail(email);

		if (!user) return SUCCESS_MESSAGES.PASSWORD_RECOVERY.EMAIL_SENT;

		const token = await this.generateVerificationToken(user.id);

		await this.mailService.sendResetPasswordEmail(user.email, token);

		return SUCCESS_MESSAGES.PASSWORD_RECOVERY.EMAIL_SENT;
	}

	public async resetPassword(
		dto: ResetPasswordDto,
		clientInfo: ClientInfoDto,
	): Promise<TokensDto> {
		const existsToken = await this.tokenService.findToken(
			dto.token,
			TokenType.PASSWORD_RESET,
		);

		if (!existsToken.userId)
			throw new NotFoundException(ERROR_MESSAGES.TOKEN.NOT_FOUND);

		const user = await this.userService.findById(existsToken.userId);

		await this.userService.changePassword(user.id, {
			newPassword: dto.password,
		});

		await this.tokenService.deleteToken(existsToken.id);

		return await this.authService.generateAndSaveTokens(user, clientInfo);
	}

	public async changePassword(
		id: string,
		dto: PasswordRecoveryDto,
	): Promise<MessageResponse> {
		const { newPassword, oldPassword } = dto;

		const user = await this.userService.findById(id);

		await this.userService.changePassword(user.id, {
			oldPassword,
			newPassword,
		});

		return SUCCESS_MESSAGES.PASSWORD_RECOVERY.PASSWORD_CHANGED;
	}

	public async needOldPassword(id: string): Promise<boolean> {
		const user = await this.userService.findById(id, true);

		return !!user.password;
	}

	private async generateVerificationToken(
		userId: string,
		tx?: Prisma.TransactionClient,
	): Promise<string> {
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
