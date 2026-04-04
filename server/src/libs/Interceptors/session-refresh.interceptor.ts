import {
	CallHandler,
	ExecutionContext,
	Injectable,
	NestInterceptor,
} from '@nestjs/common';
import type { Request } from 'express';
import { Observable } from 'rxjs';
import { PrismaService } from 'src/infra/prisma/prisma.service';

@Injectable()
export class SessionRefreshInterceptor implements NestInterceptor {
	constructor(private readonly prisma: PrismaService) {}

	async intercept(
		context: ExecutionContext,
		next: CallHandler,
	): Promise<Observable<unknown>> {
		const request: Request = context.switchToHttp().getRequest();
		const session = request.session;
		const sessionId = request.sessionID;

		if (session && request.user && sessionId) {
			const now = new Date();
			const lastUpdate = session.lastPostgresUpdate;

			if (
				!lastUpdate ||
				now.getTime() - new Date(lastUpdate).getTime() > 3600000
			) {
				const newExpiresAt = session.cookie.expires;

				if (newExpiresAt) {
					await this.prisma.session
						.updateMany({
							where: { sessionId },
							data: { expiresAt: newExpiresAt },
						})
						.then(() => {
							session.lastPostgresUpdate = now.toISOString();
						})
						.catch((err) => {
							console.error('Failed to refresh session in Postgres:', err);
						});
				}
			}
		}

		return next.handle();
	}
}
