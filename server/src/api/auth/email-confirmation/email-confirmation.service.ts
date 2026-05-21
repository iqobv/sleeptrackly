import { TokenService } from '@api/token/token.service';
import { UserService } from '@api/user/user.service';
import { Prisma } from '@generated/prisma/client';
import { TokenType } from '@generated/prisma/enums';
import { MailService } from '@infra/mail/mail.service';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ClientInfoDto } from '@libs/dto';
import {
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfirmationDto, ResendEmailDto } from './dto';

@Injectable()
export class EmailConfirmationService {
	constructor(
		private readonly tokenService: TokenService,
		private readonly userService: UserService,
		private readonly mailService: MailService,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
		private readonly prismaService: PrismaService,
	) {}

	async newVerification(dto: ConfirmationDto, clientInfo: ClientInfoDto) {
		return await this.prismaService.$transaction(async (tx) => {
			const existsToken = await this.tokenService.findToken(
				dto.token,
				TokenType.EMAIL_VERIFICATION,
				tx,
			);

			if (!existsToken.userId) throw new NotFoundException('Token not found');

			await this.userService.update(
				existsToken.userId,
				{
					emailVerified: true,
				},
				true,
				tx,
			);

			await this.tokenService.deleteToken(existsToken.id, tx);

			const user = await this.userService.findById(existsToken.userId);

			return await this.authService.generateAndSaveTokens(user, clientInfo, tx);
		});
	}

	async sendVerificationEmail(dto: ResendEmailDto) {
		const { email } = dto;

		const message =
			'If a user with this email exists, a verification email has been sent';

		const user = await this.userService.findByEmail(email);

		if (!user) return { message };

		const token = await this.generateVerificationToken(user.id);

		await this.mailService.sendVerificationEmail(user.email, token);

		return { message };
	}

	async generateVerificationToken(
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
