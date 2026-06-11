import { TokenService } from '@api/token/token.service';
import { UserService } from '@api/user/user.service';
import { TokenType } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { ClientInfoDto } from '@libs/dto/client-info.dto';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Observable, Subject } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { QrIdDto } from './dto/qr-id.dto';
import { QrSseEvent, QrSsePayload } from './types/qr-sse.types';
import { QrLoginStatus, QrLoginStatusResult } from './types/qr-status.types';

@Injectable()
export class QrLoginService {
	private readonly qrSubject = new Subject<QrSsePayload>();

	constructor(
		private readonly tokenService: TokenService,
		@Inject(forwardRef(() => AuthService))
		private readonly authService: AuthService,
		private readonly userService: UserService,
		private readonly prismaService: PrismaService,
	) {}

	public subscribeToQrStatus(qrId: string): Observable<QrSseEvent> {
		return this.qrSubject.asObservable().pipe(
			filter((payload: QrSsePayload) => payload.qrId === qrId),
			map((payload: QrSsePayload) => ({
				data: {
					status: payload.status,
				},
				type: 'qr_status_signal',
			})),
		);
	}

	public async initiateQrLogin(): Promise<QrIdDto> {
		const expiresAt = new Date(Date.now() + 3 * 60 * 1000);

		const qrToken = await this.tokenService.createToken({
			userId: null,
			type: TokenType.QR_LOGIN,
			expiresAt,
		});

		return {
			qrId: qrToken.token,
			expiresAt: expiresAt,
		};
	}

	public async approveQrLogin(
		qrId: string,
		userId: string,
	): Promise<MessageResponse> {
		const token = await this.tokenService
			.findToken(qrId, TokenType.QR_LOGIN)
			.catch((e) => {
				this.qrSubject.next({
					qrId,
					status: 'expired',
				});

				throw e;
			});

		await this.prismaService.token.update({
			where: { id: token.id },
			data: { user: { connect: { id: userId } } },
		});

		this.qrSubject.next({
			qrId,
			status: 'approved',
		});

		return SUCCESS_MESSAGES.AUTH.QR_LOGIN_APPROVED;
	}

	private async getQrLoginStatus(qrId: string): Promise<QrLoginStatusResult> {
		try {
			const token = await this.tokenService.findToken(qrId, TokenType.QR_LOGIN);

			if (token.userId) {
				return {
					status: 'approved',
					userId: token.userId,
					tokenId: token.id,
				};
			}

			return { status: 'pending' };
		} catch (err) {
			const errorMessage = err instanceof Error ? err.message : 'Unknown error';

			return {
				status: 'expired',
				error: errorMessage,
			};
		}
	}

	public async finalizeQrLogin(
		qrId: string,
		clientInfo: ClientInfoDto,
	): Promise<{
		status: QrLoginStatus | 'success';
		accessToken?: string;
		refreshToken?: string;
	}> {
		const result = await this.getQrLoginStatus(qrId);

		if (result.status === 'approved' && result.userId) {
			const user = await this.userService.findById(result.userId);

			if (user) {
				const tokens = await this.authService.generateAndSaveTokens(
					user,
					clientInfo,
				);
				await this.tokenService.deleteToken(result.tokenId);
				return { status: 'success', ...tokens };
			}
		}

		return { status: result.status };
	}
}
