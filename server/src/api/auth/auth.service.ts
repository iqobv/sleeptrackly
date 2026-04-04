import { ForbiddenException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import type { Request, Response } from 'express';
import { User } from 'generated/prisma/client';
import { getCookieConfig } from 'src/config';
import { comparePassword, normalizeIp } from 'src/libs/utils';
import { UserAvatarService } from '../user-avatar/user-avatar.service';
import { UserProviderService } from '../user-provider/user-provider.service';
import { CreateUserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { OAuthDto } from './dto';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';
import { SessionService } from './session/session.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
		private readonly userProviderService: UserProviderService,
		private readonly userAvatarService: UserAvatarService,
		private readonly emailConfirmationService: EmailConfirmationService,
		private readonly sessionService: SessionService,
	) {}

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

	async login(user: User, req: Request) {
		if (!user.emailVerified) throw new ForbiddenException('Email not verified');

		const deviceInfo = this.getInfoFromRequest(req);

		const oldSessionId = req.sessionID;

		if (oldSessionId)
			await this.sessionService.terminateSession(user.id, oldSessionId, false);

		await new Promise<void>((resolve, reject) => {
			req.login(user, (err: Error) => (err ? reject(err) : resolve()));
		});

		await this.logSessionToDb(
			user,
			req.sessionID,
			req.session.cookie.expires as Date,
			{ ipAddress: deviceInfo.ip.toString(), ...deviceInfo },
		);

		const { password, ...result } = user;

		return { ...result };
	}

	async register(dto: CreateUserDto) {
		const user = await this.userService.create(dto);

		await this.emailConfirmationService.sendVerificationEmail({
			email: user.email,
		});

		return {
			success: true,
			messageCode: 'REGISTRATION_SUCCESS',
			message:
				'Registration successful. Please check your email to verify your account.',
			email: user.email,
		};
	}

	async logout(req: Request, res: Response) {
		const sessionID = req.sessionID;

		if (req.user && sessionID)
			await this.sessionService.terminateBySessionId(sessionID, req.user.id);

		return new Promise<void>((resolve, reject) => {
			req.session.destroy((err: Error) => {
				if (err) return reject(err);
				res.clearCookie(
					this.configService.getOrThrow<string>('SESSION_NAME') || 'session',
					getCookieConfig(this.configService),
				);
				resolve();
			});
		});
	}

	async deleteAccount(id: string) {
		await this.userService.remove(id);
	}

	async validateOAuthLogin(dto: OAuthDto) {
		const { provider, providerId, avatarUrl, email } = dto;

		const providerUser = await this.userProviderService.findProvider(
			provider,
			providerId,
		);

		if (providerUser) return providerUser.user;

		const username = await this.userService.generateUsername();

		let user = await this.userService.findByEmail(email, true);
		if (!user) {
			user = await this.userService.create({
				email,
				username,
				emailVerified: true,
			});
			if (avatarUrl && user)
				await this.userAvatarService.uploadProviderAvatar(avatarUrl, user.id);
		}

		await this.userProviderService.createProvider(
			provider,
			providerId,
			user.id,
		);

		return user;
	}

	private async logSessionToDb(
		user: User,
		sessionId: string,
		expiresAt: Date,
		deviceInfo: { ipAddress?: string; userAgent?: string },
	) {
		await this.sessionService.createSession(user.id, {
			sessionId,
			expiresAt,
			ipAddress: normalizeIp(deviceInfo.ipAddress || null) ?? undefined,
			userAgent: deviceInfo.userAgent,
		});
	}

	getInfoFromRequest(req: Request) {
		const cfConnectingIp = req.headers['cf-connecting-ip'];
		const xForwardedFor = req.headers['x-forwarded-for'];

		let clientIp: string;

		if (typeof cfConnectingIp === 'string') {
			clientIp = cfConnectingIp;
		} else if (typeof xForwardedFor === 'string') {
			clientIp = xForwardedFor.split(',')[0].trim();
		} else {
			clientIp = req.ip || req.socket.remoteAddress || 'unknown';
		}

		return {
			ip: clientIp,
			userAgent: req.headers['user-agent'],
		};
	}
}
