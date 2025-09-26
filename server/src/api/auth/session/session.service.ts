import { HttpService } from '@nestjs/axios';
import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Session } from '@prisma/client';
import { RedisStore } from 'connect-redis';
import { UserService } from 'src/api/user/user.service';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { extractClientIP, normalizeIp } from 'src/libs/utils';
import { UAParser } from 'ua-parser-js';
import { CreateSessionDto, IpApiDto } from './dto';

@Injectable()
export class SessionService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly userService: UserService,
		private readonly httpService: HttpService,
		@Inject('REDIS_STORE') private readonly redisStore: RedisStore,
	) {}

	async createSession(userId: string, dto: CreateSessionDto) {
		const { sessionId, expiresAt, ipAddress, userAgent } = dto;

		const ipData = ipAddress ? await this.getInfoFromIp(ipAddress) : null;
		const userAgentData = userAgent
			? this.getInfoFromUserAgent(userAgent)
			: null;

		const session = await this.prismaService.session.create({
			data: {
				sessionId,
				expiresAt,
				ipAddress,
				userAgent,
				...(ipData && {
					city: ipData.city,
					country: ipData.country,
					countryCode: ipData.countryCode,
					region: ipData.region,
				}),
				...(userAgentData && {
					deviceType: userAgentData.deviceType,
					browserName: userAgentData.browserName,
					browserVersion: userAgentData.browserVersion,
				}),
				user: { connect: { id: userId } },
			},
		});

		return session;
	}

	async getAllSessions(userId: string, currentSessionId: string) {
		const sessions = await this.prismaService.session.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
		});

		const sessionsWithCurrent: (Omit<Session, 'sessionId'> & {
			current: boolean;
		})[] = sessions.map(({ sessionId, ...rest }) => ({
			...rest,
			current: sessionId === currentSessionId,
		}));

		return sessionsWithCurrent;
	}

	async findById(id: string, userId: string, throwError?: boolean) {
		const session = await this.prismaService.session.findUnique({
			where: { id, userId },
		});

		if (throwError && !session)
			throw new NotFoundException('Session not found');

		return session;
	}

	async terminateBySessionId(sessionId: string, userId: string) {
		const session = await this.prismaService.session.findUnique({
			where: { sessionId, userId },
		});

		if (!session) return null;

		return await this.terminateSession(session.userId, session.id, false);
	}

	async terminateSession(
		userId: string,
		id: string,
		throwError: boolean = true,
	) {
		const session = await this.findById(id, userId, throwError);

		if (!throwError && !session) return null;

		await this.prismaService.session.delete({
			where: { id: session?.id, userId },
		});

		if (session?.sessionId) {
			await this.destroyRedisSession(session.sessionId);
		}

		return true;
	}

	async terminateAllSessions(userId: string, exceptId: string) {
		const session = await this.findById(exceptId, userId);

		const sessions = await this.prismaService.session.findMany({
			where: { userId, id: { not: session?.id } },
		});

		await Promise.all(
			sessions.map(async (s) => {
				await this.destroyRedisSession(s.sessionId);
				await this.prismaService.session.delete({ where: { id: s.id } });
			}),
		);

		return true;
	}

	private async getInfoFromIp(ip: string) {
		const normalizedIp = normalizeIp(ip);
		const clientIp = extractClientIP(normalizedIp);

		const response = await this.httpService.axiosRef.get<IpApiDto>(
			`http://ip-api.com/json/${clientIp}?fields=status,message,country,countryCode,region,regionName,city,timezone,query`,
		);

		return response.data;
	}

	private destroyRedisSession(sessionId: string): Promise<void> {
		return new Promise((resolve, reject) => {
			this.redisStore
				.destroy(sessionId, (err?: Error) => {
					if (err) {
						reject(err);
					} else {
						resolve();
					}
				})
				.catch(reject);
		});
	}

	private getInfoFromUserAgent(userAgent: string) {
		const parser = new UAParser(userAgent);
		const result = parser.getResult();

		const deviceType = result.device.type || 'desktop';
		const browserName = result.browser.name;
		const browserVersion = result.browser.version;

		return { deviceType, browserName, browserVersion };
	}
}
