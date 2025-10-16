import {
	forwardRef,
	Inject,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { TokenType } from '@prisma/client';
import type { Request } from 'express';
import { TokenService } from 'src/api/token/token.service';
import { UserService } from 'src/api/user/user.service';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { AuthService } from '../auth.service';
import { QrLoginStatusResult } from './types/qr-status.types';

@Injectable()
export class QrLoginService {
	constructor(
		private readonly tokenService: TokenService,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly prismaService: PrismaService,
	) {}

	async initiateQrLogin() {
		const qrToken = await this.tokenService.createToken(
			null,
			TokenType.QR_LOGIN,
			3,
		);

		return { qrId: qrToken.token };
	}

	async approveQrLogin(qrId: string, userId: string) {
		const token = await this.tokenService.findToken(qrId, TokenType.QR_LOGIN);
		if (!token) {
			throw new NotFoundException('QR code not found or expired.');
		}

		await this.prismaService.token.update({
			where: { id: token.id },
			data: { user: { connect: { id: userId } } },
		});

		return { success: true };
	}

	private async getQrLoginStatus(qrId: string): Promise<QrLoginStatusResult> {
		try {
			const token = await this.tokenService.findToken(qrId, TokenType.QR_LOGIN);

			if (token.userId) {
				return {
					status: 'approved' as const,
					userId: token.userId,
					tokenId: token.id,
				};
			}

			return { status: 'pending' as const };
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Unknown error';

			return {
				status: 'expired',
				error: errorMessage,
			};
		}
	}

	async finalizeQrLogin(qrId: string, req: Request) {
		const result = await this.getQrLoginStatus(qrId);

		if (result.status === 'approved' && result.userId) {
			const user = await this.userService.findById(result.userId);

			if (user) {
				await this.authService.login(user, req);
				await this.tokenService.deleteToken(result.tokenId);
				return { status: 'success' };
			}
		}

		return { status: result.status };
	}
}
