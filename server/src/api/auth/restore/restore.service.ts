import { TokenService } from '@api/token/token.service';
import { UserService } from '@api/user/user.service';
import { TokenType } from '@generated/prisma/enums';
import { MailService } from '@infra/mail/mail.service';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { SendRestoreEmailDto } from './dto/send-restore-email.dto';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';

@Injectable()
export class RestoreService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly tokenService: TokenService,
		private readonly userService: UserService,
		private readonly mailService: MailService,
	) {}

	public async generateRestoreToken(
		dto: SendRestoreEmailDto,
	): Promise<MessageResponse> {
		const { email } = dto;

		const user = await this.userService.findByEmail(email);

		if (!user) return SUCCESS_MESSAGES.RESTORE.EMAIL_SENT;

		const { token } = await this.tokenService.createToken({
			type: TokenType.RESTORE_ACCOUNT,
			userId: user.id,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60),
		});

		await this.mailService.sendRestoreAccountEmail(user.email, token);

		return SUCCESS_MESSAGES.RESTORE.EMAIL_SENT;
	}

	public async restoreAccount(token: string): Promise<MessageResponse> {
		return await this.prismaService.$transaction(async (tx) => {
			const foundToken = await this.tokenService.verifyAndConsumeToken(
				token,
				TokenType.RESTORE_ACCOUNT,
				tx,
			);

			await tx.user.update({
				where: { id: foundToken.id },
				data: { deletedAt: null },
			});

			return SUCCESS_MESSAGES.RESTORE.RESTORE_SUCCESS;
		});
	}
}
