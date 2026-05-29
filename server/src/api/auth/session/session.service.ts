import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import {
	extractClientIP,
	hashToken,
	isPrivateIP,
	normalizeIp,
	splitToken,
} from '@libs/utils';
import { HttpService } from '@nestjs/axios';
import {
	ForbiddenException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UAParser } from 'ua-parser-js';
import {
	CreateSessionDto,
	IpApiDto,
	RotateSessionDto,
	UserAgentDto,
} from './dto';

@Injectable()
export class SessionService {
	constructor(
		private readonly prismaService: PrismaService,
		private readonly httpService: HttpService,
	) {}

	async createSession(dto: CreateSessionDto, tx?: Prisma.TransactionClient) {
		const { hashToken, expiresAt, clientInfo, userId } = dto;

		const prisma = tx ?? this.prismaService;

		const ipData =
			clientInfo?.ip && !isPrivateIP(clientInfo.ip)
				? await this.getInfoFromIp(clientInfo.ip)
				: null;
		const userAgentData = clientInfo?.userAgent
			? this.getInfoFromUserAgent(clientInfo.userAgent)
			: null;

		const session = await prisma.session.create({
			data: {
				hashToken,
				expiresAt,
				ipAddress: clientInfo?.ip ?? null,
				userAgent: clientInfo?.userAgent,
				...(ipData && {
					city: ipData.city,
					countryCode: ipData.countryCode,
					region: ipData.regionName,
				}),
				...(userAgentData && {
					osName: userAgentData.osName,
					deviceType: userAgentData.deviceType,
					browserName: userAgentData.browserName,
					browserVersion: userAgentData.browserVersion,
				}),
				user: { connect: { id: userId } },
			},
		});

		return session;
	}

	async rotateSession(
		sessionId: string,
		dto: RotateSessionDto,
		tx?: Prisma.TransactionClient,
	) {
		const { clientInfo, expiresAt, hashToken, previousToken, userId } = dto;
		const { ip, userAgent } = clientInfo;

		const prisma = tx ?? this.prismaService;

		const geo: IpApiDto | null = isPrivateIP(ip)
			? null
			: await this.getInfoFromIp(ip);

		const parsedUa = this.getInfoFromUserAgent(userAgent);

		return await prisma.session.update({
			where: { id: sessionId, userId },
			data: {
				hashToken,
				previousToken,
				ipAddress: ip ?? null,
				countryCode: geo?.countryCode,
				city: geo?.city,
				userAgent,
				expiresAt,
				rotatedAt: new Date(),
				...parsedUa,
			},
		});
	}

	async getUserSessions(userId: string, refreshToken: string) {
		const allSessions = await this.prismaService.session.findMany({
			where: { userId },
			orderBy: { createdAt: 'desc' },
		});

		const { sessionId, rawToken } = splitToken(refreshToken);

		const currentSession = await this.getSessionByRefreshToken(
			userId,
			sessionId,
			rawToken,
		);

		const mappedSessions = allSessions.map(
			({ hashToken: _rt, previousToken: _pt, userAgent: _ua, ...rest }) => ({
				...rest,
				isCurrent: rest.id === currentSession.id,
			}),
		);

		return mappedSessions;
	}

	async findSessionById(sessionId: string) {
		const session = await this.prismaService.session.findUnique({
			where: { id: sessionId },
		});

		if (!session) throw new NotFoundException(ERROR_MESSAGES.SESSION.NOT_FOUND);

		return session;
	}

	async findSessionByIdAndToken(sessionId: string, token: string) {
		const session = await this.prismaService.session.findFirst({
			where: { AND: [{ id: sessionId }, { hashToken: token }] },
		});

		if (!session) throw new NotFoundException(ERROR_MESSAGES.SESSION.NOT_FOUND);

		return session;
	}

	async deleteSession(userId: string, sessionId: string) {
		const session = await this.findSessionById(sessionId);

		if (session.userId !== userId)
			throw new ForbiddenException(ERROR_MESSAGES.SESSION.DELETE_FORBIDDEN);

		await this.prismaService.session.delete({
			where: { id: sessionId },
		});

		return { message: 'Session deleted successfully' };
	}

	async deleteAllOtherSessions(userId: string, refreshToken: string) {
		const { sessionId, rawToken } = splitToken(refreshToken);

		const currentSession = await this.getSessionByRefreshToken(
			userId,
			sessionId,
			rawToken,
		);

		await this.prismaService.session.deleteMany({
			where: {
				userId,
				id: { not: currentSession.id },
			},
		});

		return { message: 'All other sessions deleted successfully' };
	}

	async terminateExpiredSessions() {
		const now = new Date();

		await this.prismaService.session.deleteMany({
			where: { expiresAt: { lt: now } },
		});

		return true;
	}

	@Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
	async handleTerminateExpiredSessions() {
		return await this.terminateExpiredSessions();
	}

	private async getInfoFromIp(ip: string) {
		const normalizedIp = normalizeIp(ip);
		const clientIp = extractClientIP(normalizedIp);

		try {
			const response = await this.httpService.axiosRef.get<IpApiDto>(
				`http://ip-api.com/json/${clientIp}?fields=countryCode,region,regionName,city,query`,
			);

			return response.data;
		} catch (error) {
			console.log(error);
			return null;
		}
	}

	private async getSessionByRefreshToken(
		userId: string,
		sessionId: string,
		rawRefreshToken: string,
	) {
		const refreshTokenHash = hashToken(rawRefreshToken);

		const rotateGap = new Date(Date.now() - 2 * 60 * 1000);

		const session = await this.prismaService.session.findFirst({
			where: {
				id: sessionId,
				userId,
				OR: [
					{ hashToken: refreshTokenHash },
					{ previousToken: refreshTokenHash, rotatedAt: { gt: rotateGap } },
				],
			},
		});

		if (!session) throw new NotFoundException(ERROR_MESSAGES.SESSION.NOT_FOUND);

		const {
			hashToken: _rt,
			previousToken: _pt,
			userAgent: _ua,
			...rest
		} = session;

		return rest;
	}

	private getInfoFromUserAgent(userAgent: string): UserAgentDto {
		const parser = new UAParser(userAgent);
		const result = parser.getResult();

		const deviceType = result.device.type || 'desktop';
		const browserName = result.browser.name;
		const browserVersion = result.browser.version;
		const osName = result.os.name;

		return { deviceType, browserName, browserVersion, osName };
	}
}
