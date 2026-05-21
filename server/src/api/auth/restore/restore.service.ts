import { TokenService } from '@api/token/token.service';
import { UserService } from '@api/user/user.service';
import { TokenType } from '@generated/prisma/enums';
import { MailService } from '@infra/mail/mail.service';
import { PrismaService } from '@infra/prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { SendRestoreEmailDto } from './dto';

@Injectable()
export class RestoreService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly tokenService: TokenService,
		private readonly userService: UserService,
		private readonly mailService: MailService,
	) {}

	async generateRestoreToken(dto: SendRestoreEmailDto) {
		const { email } = dto;

		const message =
			'If a user with this email exists, a restore email will be sent';

		const user = await this.userService.findByEmail(email);

		if (!user) return { message };

		const { token } = await this.tokenService.createToken({
			type: TokenType.RESTORE_ACCOUNT,
			userId: user.id,
			expiresAt: new Date(Date.now() + 1000 * 60 * 60),
		});

		await this.mailService.sendRestoreAccountEmail(user.email, token);

		return { message };
	}

	async restoreAccount(token: string) {
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

			return { message: 'Account restored successfully' };
		});
	}
}
