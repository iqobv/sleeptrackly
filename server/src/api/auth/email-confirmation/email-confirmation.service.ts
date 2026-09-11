import { TokenService } from '@api/token/token.service';
import { Prisma } from '@generated/prisma/client';
import { TokenType } from '@generated/prisma/enums';
import { MailService } from '@infra/mail/mail.service';
import { PrismaService } from '@infra/prisma/prisma.service';
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
import { ConfirmationDto } from './dto/confirmation.dto';
import { ResendEmailDto } from './dto/resend-email.dto';

@Injectable()
export class EmailConfirmationService {
	constructor(
		private readonly tokenService: TokenService,
		private readonly mailService: MailService,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
		private readonly prismaService: PrismaService,
	) {}

	public async verifyEmail(
		dto: ConfirmationDto,
		clientInfo: ClientInfoDto,
	): Promise<TokensDto> {
		return await this.prismaService.$transaction(async (tx) => {
			const existsToken = await this.tokenService.findToken(
				dto.token,
				TokenType.EMAIL_VERIFICATION,
				tx,
			);

			if (!existsToken.userId)
				throw new NotFoundException(ERROR_MESSAGES.TOKEN.NOT_FOUND);

			const updatedUser = await tx.user.update({
				where: { id: existsToken.userId },
				data: { emailVerified: true },
			});

			await this.tokenService.deleteToken(existsToken.id, tx);

			return await this.authService.generateAndSaveTokens(
				updatedUser,
				clientInfo,
				tx,
			);
		});
	}

	public async sendVerificationEmail(
		dto: ResendEmailDto,
	): Promise<MessageResponse> {
		const { email } = dto;

		const user = await this.prismaService.user.findUnique({
			where: { email },
		});

		if (!user) return SUCCESS_MESSAGES.EMAIL_CONFIRMATION.EMAIL_SENT;

		const token = await this.generateVerificationToken(user.id);

		await this.mailService.sendVerificationEmail(user.email, token);

		return SUCCESS_MESSAGES.EMAIL_CONFIRMATION.EMAIL_SENT;
	}

	public async generateVerificationToken(
		userId: string,
		tx?: Prisma.TransactionClient,
	): Promise<string> {
		const { token } = await this.tokenService.createToken(
			{
				userId,
				type: TokenType.EMAIL_VERIFICATION,
				expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
			},
			tx,
		);

		return token;
	}
}
