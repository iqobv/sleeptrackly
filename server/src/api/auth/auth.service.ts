import { Prisma, User } from '@generated/prisma/client';
import { MailService } from '@infra/mail/mail.service';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES, SUCCESS_MESSAGES } from '@libs/constants';
import { ClientInfoDto } from '@libs/dto';
import { JwtPayload } from '@libs/types';
import {
	comparePassword,
	createRefreshToken,
	generateRawToken,
	hashToken,
	splitToken,
} from '@libs/utils';
import {
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserAvatarService } from '../user-avatar/user-avatar.service';
import { UserProviderService } from '../user-provider/user-provider.service';
import { CreateUserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { LoginDto, OAuthDto } from './dto';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { SessionService } from './session/session.service';

@Injectable()
export class AuthService {
	private readonly JWT_ACCESS_SECRET: string;

	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
		private readonly userProviderService: UserProviderService,
		private readonly userAvatarService: UserAvatarService,
		private readonly emailConfirmationService: EmailConfirmationService,
		private readonly sessionService: SessionService,
		private readonly jwtService: JwtService,
		private readonly prismaService: PrismaService,
		private readonly mailService: MailService,
	) {
		this.JWT_ACCESS_SECRET =
			this.configService.getOrThrow<string>('JWT_ACCESS_SECRET');
	}

	async validateUser(email: string, password: string) {
		const user = await this.userService.findByEmail(email, true);
		if (!user) return null;

		const isMatch =
			!!password &&
			!!user.password &&
			(await comparePassword(password, user?.password));

		if (!isMatch) return null;

		return user;
	}

	async login(dto: LoginDto, clientInfo: ClientInfoDto) {
		const { email, password } = dto;

		const user = await this.userService.findByEmail(email, true);

		if (!user || !user.password)
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);

		const isMatch = await comparePassword(password, user.password);

		if (!isMatch)
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.INVALID_CREDENTIALS);

		if (!user.emailVerified)
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.EMAIL_NOT_VERIFIED);

		this.validateAccountStatus(user);

		return await this.generateAndSaveTokens(user, clientInfo);
	}

	async register(dto: CreateUserDto) {
		const { user, token } = await this.prismaService.$transaction(
			async (tx) => {
				const user = await this.userService.create(dto, tx);

				const tokenData =
					await this.emailConfirmationService.generateVerificationToken(
						user.id,
						tx,
					);

				return { user, token: tokenData };
			},
		);

		await this.mailService.sendVerificationEmail(user.email, token);

		return {
			...SUCCESS_MESSAGES.AUTH.REGISTRATION_SUCCESS,
			meta: { email: user.email },
		};
	}

	async logout(rawRefreshToken: string, userId?: string) {
		const { rawToken, sessionId } = splitToken(rawRefreshToken);

		const hashedToken = hashToken(rawToken);

		const session = await this.sessionService.findSessionByIdAndToken(
			sessionId,
			hashedToken,
		);

		if (userId && session.userId !== userId) {
			throw new ForbiddenException(ERROR_MESSAGES.TOKEN.MISMATCH);
		}

		await this.sessionService.deleteSession(session.userId, session.id);
	}

	async deleteAccount(id: string) {
		await this.userService.remove(id);
	}

	async validateOAuthLogin(dto: OAuthDto, clientInfo: ClientInfoDto) {
		const {
			provider,
			providerId,
			avatarUrl,
			email,
			username: oAuthUsername,
		} = dto;

		return await this.prismaService.$transaction(async (tx) => {
			const providerUser = await this.userProviderService.findProvider(
				provider,
				providerId,
				tx,
			);

			if (providerUser) {
				this.validateAccountStatus(providerUser.user);
				return await this.generateAndSaveTokens(
					providerUser.user,
					clientInfo,
					tx,
				);
			}

			const username =
				oAuthUsername === 'NO_USERNAME'
					? await this.userService.generateUsername()
					: oAuthUsername;

			let user = await this.userService.findByEmail(email, true);
			if (!user) {
				user = await this.userService.create(
					{
						email,
						username,
						emailVerified: true,
					},
					tx,
				);
				if (avatarUrl && user)
					await this.userAvatarService.uploadProviderAvatar(avatarUrl, user.id);
			} else {
				this.validateAccountStatus(user);
			}

			await this.userProviderService.createProvider(
				{
					provider,
					providerId,
					userId: user.id,
				},
				tx,
			);

			return await this.generateAndSaveTokens(user, clientInfo, tx);
		});
	}

	async refreshTokens(rawRefreshToken: string, clientInfo: ClientInfoDto) {
		const { rawToken, sessionId } = splitToken(rawRefreshToken);

		const hashedToken = hashToken(rawToken);

		const session = await this.sessionService.findSessionByIdAndToken(
			sessionId,
			hashedToken,
		);

		if (!session || session.expiresAt < new Date()) {
			if (session) {
				await this.sessionService.deleteSession(session.userId, session.id);
			}

			throw new UnauthorizedException(
				ERROR_MESSAGES.AUTH.INVALID_REFRESH_TOKEN,
			);
		}

		const user = await this.userService.findById(session.userId);

		if (!user || !user.emailVerified)
			throw new UnauthorizedException(ERROR_MESSAGES.AUTH.UNAUTHORIZED);

		const newRawRefreshToken = generateRawToken();
		const newRefreshTokenHash = hashToken(newRawRefreshToken);

		const now = new Date();
		const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

		const updatedSession = await this.sessionService.rotateSession(session.id, {
			userId: user.id,
			hashToken: newRefreshTokenHash,
			previousToken: session.hashToken,
			rotatedAt: new Date(),
			clientInfo,
			expiresAt,
		});

		const payload: JwtPayload = {
			id: user.id,
			email: user.email,
			role: user.role,
			sessionId: updatedSession.id,
			createdAt: new Date(user.createdAt).toISOString(),
		};

		const accessToken = this.jwtService.sign(payload, {
			secret: this.JWT_ACCESS_SECRET,
			expiresIn: '15m',
		});

		const refreshToken = createRefreshToken(
			updatedSession.id,
			newRawRefreshToken,
		);

		return { accessToken, refreshToken };
	}

	private validateAccountStatus(user: User): void {
		if (!user.deletedAt) {
			return;
		}

		const fourteenDaysInMs = 14 * 24 * 60 * 60 * 1000;
		const deletionTime = user.deletedAt.getTime();
		const isRecoverable = Date.now() - deletionTime < fourteenDaysInMs;

		if (isRecoverable) {
			throw new ForbiddenException(ERROR_MESSAGES.AUTH.ACCOUNT_SUSPENDED);
		}

		throw new ForbiddenException(ERROR_MESSAGES.AUTH.ACCOUNT_DELETED);
	}

	async generateAndSaveTokens(
		user: User,
		clientInfo: ClientInfoDto,
		tx?: Prisma.TransactionClient,
	) {
		const rawRefreshToken = generateRawToken();
		const refreshTokenHash = hashToken(rawRefreshToken);

		const now = new Date();
		const expiresAt = new Date(now.getTime() + 30 * 24 * 60 * 60 * 1000);

		const session = await this.sessionService.createSession(
			{
				userId: user.id,
				hashToken: refreshTokenHash,
				clientInfo,
				expiresAt,
			},
			tx,
		);

		const payload: JwtPayload = {
			id: user.id,
			email: user.email,
			role: user.role,
			sessionId: session.id,
			createdAt: new Date(user.createdAt).toISOString(),
		};

		const accessToken = this.jwtService.sign(payload, {
			secret: this.JWT_ACCESS_SECRET,
			expiresIn: '15m',
		});

		const refreshToken = createRefreshToken(session.id, rawRefreshToken);

		return { accessToken, refreshToken };
	}
}
