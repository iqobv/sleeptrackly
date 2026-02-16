import { Inject, Injectable } from '@nestjs/common';
import * as admin from 'firebase-admin';
import { FIREBASE_ADMIN } from './fcm.admin';

@Injectable()
export class FcmService {
	constructor(
		@Inject(FIREBASE_ADMIN) private readonly firebase: admin.app.App,
	) {}

	async sendNotification(
		tokens: string[],
		payload: admin.messaging.MessagingPayload,
	) {
		if (tokens.length === 0) return;

		try {
			const res = await this.firebase.messaging().sendEachForMulticast({
				tokens,
				...payload,
			});

			const tokensToRemove: string[] = [];

			res.responses.forEach((response, idx) => {
				if (
					!response.success &&
					response.error &&
					/registration-token-not-registered|invalid-registration-token/.test(
						response.error.code,
					)
				) {
					tokensToRemove.push(tokens[idx]);
				}
			});

			return { ...res, tokensToRemove };
		} catch (error) {
			console.error('Error sending notification:', error);
			throw error;
		}
	}
}
