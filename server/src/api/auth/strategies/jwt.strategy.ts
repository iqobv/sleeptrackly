import { PrismaService } from '@infra/prisma/prisma.service';
import { JwtPayload } from '@libs/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import type { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		private readonly configService: ConfigService,
		private readonly prismaService: PrismaService,
	) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request: Request) => {
					const token = request?.cookies['accessToken'] as string | undefined;
					return token || null;
				},
			]),
			secretOrKey: configService.getOrThrow<string>('JWT_ACCESS_SECRET'),
		});
	}

	public async validate(payload: JwtPayload): Promise<JwtPayload> {
		const session = await this.prismaService.session.findUnique({
			where: { id: payload.sessionId },
		});

		if (!session) {
			throw new UnauthorizedException(
				'Session not found. Please log in again.',
			);
		}

		return payload;
	}
}
