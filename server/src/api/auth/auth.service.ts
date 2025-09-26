/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import type { Request, Response } from 'express';
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
		const { ip, userAgent } = this.getInfoFromRequest(req);

		const oldSessionId = req.sessionID;

		if (oldSessionId)
			await this.sessionService.terminateSession(user.id, oldSessionId, false);

		await new Promise<void>((resolve, reject) => {
			req.login(user, (err: Error) => {
				if (err) return reject(err);
				resolve();
			});
		});

		const newSessionId = req.sessionID;

		await this.sessionService.createSession(user.id, {
			sessionId: newSessionId,
			expiresAt: req.session.cookie.expires as Date,
			ipAddress: normalizeIp(Array.isArray(ip) ? ip[0] : ip) ?? undefined,
			userAgent,
		});

		const { password, ...result } = user;

		return { ...result };
	}

	async register(dto: CreateUserDto, req: Request) {
		const user = await this.userService.create(dto);

		await this.emailConfirmationService.sendVerificationToken(user);

		return await this.login(user, req);
	}

	async logout(req: Request, res: Response) {
		const sessionID = req.sessionID;

		if (req.user && sessionID)
			await this.sessionService.terminateSession(req.user.id, sessionID);

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
		const { provider, providerId, avatarUrl, email, username } = dto;

		const providerUser = await this.userProviderService.findProvider(
			provider,
			providerId,
		);

		if (providerUser) return providerUser.user;

		let user = await this.userService.findByEmail(email, true);
		if (!user) {
			user = await this.userService.create({
				email,
				username,
			});
			if (avatarUrl && user)
				await this.userAvatarService.uploadProviderAvatar(avatarUrl, user.id);
			await this.emailConfirmationService.sendVerificationToken(user);
		}

		await this.userProviderService.createProvider(
			provider,
			providerId,
			user.id,
		);

		return user;
	}

	private getInfoFromRequest(req: Request) {
		return {
			ip:
				req.headers['x-forwarded-for'] ||
				req.headers['x-real-ip'] ||
				req.ip ||
				'unknown',
			userAgent: req.headers['user-agent'],
		};
	}
}
