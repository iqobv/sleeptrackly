import { UserAvatarService } from '@api/user-avatar/user-avatar.service';
import { UserProviderService } from '@api/user-provider/user-provider.service';
import { CreateUserDto } from '@api/user/dto/create-user.dto';
import {
	BaseUserDto,
	UserDto,
	UserWithPasswordDto,
} from '@api/user/dto/user-response.dto';
import { UserService } from '@api/user/user.service';
import { Prisma } from '@generated/prisma/client';
import { MailService } from '@infra/mail/mail.service';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { ClientInfoDto } from '@libs/dto/client-info.dto';
import { JwtPayload } from '@libs/types/jwt-payload.types';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { comparePassword } from '@libs/utils/password.util';
import { createRefreshToken, splitToken } from '@libs/utils/refresh-token.util';
import { generateRawToken, hashToken } from '@libs/utils/token.util';
import {
	ForbiddenException,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { plainToInstance } from 'class-transformer';
import { LoginServiceResponseDto } from './dto/login-response.dto';
import { LoginDto } from './dto/login.dto';
import { OAuthDto } from './dto/o-auth.dto';
import { TokensDto } from './dto/tokens.dto';
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

	public async validateUser(
		email: string,
		password: string,
	): Promise<UserWithPasswordDto | null> {
		const user = await this.userService.findByEmail(email, true);
		if (!user) return null;

		const isMatch =
			!!password &&
			!!user.password &&
			(await comparePassword(password, user?.password));

		if (!isMatch) return null;

		return user;
	}

	public async login(
		dto: LoginDto,
		clientInfo: ClientInfoDto,
	): Promise<LoginServiceResponseDto> {
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

		const finalUser = plainToInstance(UserDto, user);

		const tokens = await this.generateAndSaveTokens(user, clientInfo);

		return { user: finalUser, ...tokens };
	}

	public async register(dto: CreateUserDto): Promise<MessageResponse> {
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

	public async logout(rawRefreshToken: string, userId?: string): Promise<void> {
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

	public async deleteAccount(id: string): Promise<void> {
		await this.userService.remove(id);
	}

	public async validateOAuthLogin(
		dto: OAuthDto,
		clientInfo: ClientInfoDto,
	): Promise<TokensDto> {
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

			let user = await this.userService.findByEmail(email);
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

	public async refreshTokens(
		rawRefreshToken: string,
		clientInfo: ClientInfoDto,
	): Promise<TokensDto> {
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

	private validateAccountStatus(user: BaseUserDto): void {
		if (!user.deletedAt) return;

		const fourteenDaysInMs = 14 * 24 * 60 * 60 * 1000;
		const deletionTime = user.deletedAt.getTime();
		const isRecoverable = Date.now() - deletionTime < fourteenDaysInMs;

		if (isRecoverable) {
			throw new ForbiddenException(ERROR_MESSAGES.AUTH.ACCOUNT_SUSPENDED);
		}

		throw new ForbiddenException(ERROR_MESSAGES.AUTH.ACCOUNT_DELETED);
	}

	public async generateAndSaveTokens(
		user: BaseUserDto,
		clientInfo: ClientInfoDto,
		tx?: Prisma.TransactionClient,
	): Promise<TokensDto> {
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
