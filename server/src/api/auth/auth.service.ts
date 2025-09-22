import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@prisma/client';
import type { Request, Response } from 'express';
import { getCookieConfig } from 'src/config';
import { comparePassword } from 'src/libs/utils';
import { UserAvatarService } from '../user-avatar/user-avatar.service';
import { UserProviderService } from '../user-provider/user-provider.service';
import { CreateUserDto } from '../user/dto';
import { UserService } from '../user/user.service';
import { OAuthDto } from './dto';
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service';

@Injectable()
export class AuthService {
	constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
		private readonly userProviderService: UserProviderService,
		private readonly userAvatarService: UserAvatarService,
		private readonly emailConfirmationService: EmailConfirmationService,
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
		return new Promise((resolve, reject) => {
			req.login(user, (err) => {
				if (err) return reject(err);
				const { password, ...result } = user;

				resolve(result);
			});
		});
	}

	async register(dto: CreateUserDto, req: Request) {
		const user = await this.userService.create(dto);

		await this.emailConfirmationService.sendVerificationToken(user);

		return await this.login(user, req);
	}

	async logout(req: Request, res: Response) {
		return new Promise<void>((resolve, reject) => {
			req.session.destroy((err) => {
				if (err) return reject(err);
				res.clearCookie(
					this.configService.getOrThrow<string>('SESSION_NAME') || 'session',
					getCookieConfig(this.configService),
				);
				resolve();
			});
		});
	}

	async validateOAuthLogin(dto: OAuthDto) {
		const { provider, providerId, avatarUrl, email, username } = dto;

		let providerUser = await this.userProviderService.findProvider(
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
}
