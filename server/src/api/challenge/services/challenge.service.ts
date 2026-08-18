import {
	Challenge,
	ChallengeStatus,
	ChallengeTaskStatus,
	ChallengeVisibility,
	Prisma,
} from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { DATE_FORMAT } from '@libs/constants/date-format.constants';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { pickTranslation } from '@libs/mappers/pick-translation.mapper';
import { transformProduct } from '@libs/mappers/translation-products.mapper';
import { challengeTranslationSelect } from '@libs/prisma/challenge-translation.select.prisma';
import { productInclude } from '@libs/prisma/product.include.prisma';
import { MessageResponse } from '@libs/types/messages/message-detail.types';
import {
	BadRequestException,
	ConflictException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import dayjs from 'dayjs';
import tz from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import { ChallengeDto, ChallengeWithUserStatusDto } from '../dto/challenge.dto';
import { FullUserChallengeDto } from '../dto/user-challenge.dto';

dayjs.extend(utc);
dayjs.extend(tz);

@Injectable()
export class ChallengeService {
	constructor(private readonly prismaService: PrismaService) {}

	public async findUserChallenges(
		userId: string,
		language: string = 'en',
	): Promise<FullUserChallengeDto[]> {
		const challenges = await this.prismaService.userChallenge.findMany({
			where: {
				userId,
				status: { in: [ChallengeStatus.ACTIVE, ChallengeStatus.FROZEN] },
			},
			include: {
				challenge: {
					include: {
						...challengeTranslationSelect(language),
						product: {
							include: productInclude(language),
						},
					},
				},
			},
		});

		const result = challenges.map(
			({
				challenge: { translations, metadata, product, ...restChallenge },
				...rest
			}) => ({
				...rest,
				challenge: {
					translation: pickTranslation(translations, language) || {
						title: '',
						description: '',
						language: 'en',
					},
					metadata,
					product: product ? transformProduct(product, language) : null,
					...restChallenge,
				},
			}),
		) as unknown as FullUserChallengeDto[];

		return plainToInstance(FullUserChallengeDto, result);
	}

	public async findAvailableChallenges(
		userId: string,
		language: string = 'en',
	): Promise<ChallengeDto[]> {
		const now = new Date();

		const challenges = await this.prismaService.challenge.findMany({
			where: {
				visibility: ChallengeVisibility.PUBLISHED,
				availableFrom: { lte: now },
				OR: [{ availableTo: { gte: now } }, { availableTo: null }],
				participants: {
					none: { userId },
				},
			},
			include: {
				...challengeTranslationSelect(language),
				product: {
					include: productInclude(language),
				},
			},
		});

		const result: ChallengeDto[] = challenges.map(
			({ translations, metadata, product, ...rest }) => ({
				translation: pickTranslation(translations, language) || {
					title: '',
					description: '',
					language: 'en',
				},
				metadata,
				product: product ? transformProduct(product, language) : null,
				...rest,
			}),
		) as ChallengeDto[];

		return plainToInstance(ChallengeDto, result);
	}

	public async findFullChallengeById(
		id: string,
		userId: string,
		language: string = 'en',
	): Promise<ChallengeWithUserStatusDto> {
		const challenge = await this.prismaService.challenge.findUnique({
			where: { id },
			include: {
				...challengeTranslationSelect(language),
				participants: {
					where: { userId },
					include: { challengeTasks: { orderBy: { date: 'asc' } } },
				},
				product: { include: productInclude(language) },
			},
		});

		if (!challenge)
			throw new NotFoundException(ERROR_MESSAGES.CHALLENGE.NOT_FOUND);

		const {
			participants,
			translations,
			availableFrom,
			availableTo,
			product,
			...rest
		} = challenge;

		const isParticipating = participants.length > 0;

		this.validateChallengeAvailability(isParticipating, challenge);

		const userChallenge = isParticipating ? participants[0] : null;

		const result: ChallengeWithUserStatusDto = {
			...rest,
			translation: pickTranslation(translations, language) || {
				title: '',
				description: '',
				language: 'en',
			},
			availableFrom,
			availableTo,
			product: product ? transformProduct(product, language) : null,
			isParticipating: !!userChallenge,
			userChallenge: userChallenge
				? {
						...userChallenge,
						tasks: userChallenge.challengeTasks || [],
					}
				: null,
		} as ChallengeWithUserStatusDto;

		return plainToInstance(ChallengeWithUserStatusDto, result);
	}

	public async participateInChallenge(
		challengeId: string,
		userId: string,
	): Promise<void> {
		const user = await this.prismaService.user.findUnique({
			where: { id: userId },
			select: { id: true, timezone: true },
		});

		if (!user) throw new NotFoundException(ERROR_MESSAGES.USER.NOT_FOUND);

		const challenge = await this.prismaService.challenge.findUnique({
			where: { id: challengeId },
		});

		if (!challenge)
			throw new NotFoundException(ERROR_MESSAGES.CHALLENGE.NOT_FOUND);

		const { durationDays } = challenge;

		this.validateChallengeAvailability(false, challenge);

		const userNow = dayjs().tz(user.timezone);
		let startDateTime = userNow;

		if (userNow.hour() >= 5) {
			startDateTime = userNow.add(1, 'day');
		}

		const startDate = startDateTime.format(DATE_FORMAT);
		const endDate = startDateTime
			.add(durationDays - 1, 'day')
			.format(DATE_FORMAT);

		await this.prismaService.$transaction(async (tx) => {
			const existing = await tx.userChallenge.findUnique({
				where: { userId_challengeId: { userId, challengeId: challenge.id } },
			});

			if (existing)
				throw new ConflictException(
					ERROR_MESSAGES.CHALLENGE.ALREADY_PARTICIPATING,
				);

			const userChallenge = await tx.userChallenge.create({
				data: {
					challengeId: challenge.id,
					userId,
					status: ChallengeStatus.ACTIVE,
					startDate,
					endDate,
				},
			});

			const tasksData: Prisma.ChallengeTaskCreateManyInput[] = Array.from(
				{ length: durationDays },
				(_, i) => {
					const date = startDateTime.add(i, 'day').format(DATE_FORMAT);
					return {
						date,
						userChallengeId: userChallenge.id,
						status: ChallengeTaskStatus.PENDING,
					};
				},
			);

			await tx.challengeTask.createMany({
				data: tasksData,
				skipDuplicates: true,
			});
		});
	}

	public async restoreChallenge(
		challengeId: string,
		userId: string,
	): Promise<MessageResponse> {
		const userChallenge = await this.prismaService.userChallenge.findUnique({
			where: { userId_challengeId: { userId, challengeId } },
			include: {
				challenge: true,
				user: { select: { id: true, challengeRecoveries: true } },
				challengeTasks: { orderBy: { date: 'asc' } },
			},
		});

		if (!userChallenge)
			throw new NotFoundException(ERROR_MESSAGES.CHALLENGE.NOT_FOUND);

		if (userChallenge.status !== ChallengeStatus.FROZEN)
			throw new BadRequestException(ERROR_MESSAGES.CHALLENGE.NOT_FROZEN);

		const failedTasks = userChallenge.challengeTasks.filter(
			(task) => task.status === ChallengeTaskStatus.FAILED,
		);

		if (failedTasks.length === 0)
			throw new BadRequestException(
				ERROR_MESSAGES.CHALLENGE.ONLY_FAILED_TASKS_CAN_BE_RECOVERED,
			);

		if (userChallenge.usedRecoveries >= userChallenge.challenge.maxRecoveries)
			throw new BadRequestException(
				ERROR_MESSAGES.CHALLENGE.RECOVERY_LIMIT_REACHED,
			);

		if (userChallenge.user.challengeRecoveries <= 0)
			throw new BadRequestException(
				ERROR_MESSAGES.CHALLENGE.NOT_ENOUGH_RECOVERIES_LEFT,
			);

		const isOneTask = failedTasks.length === 1;

		await this.prismaService.$transaction(async (tx) => {
			await tx.userChallenge.update({
				where: { id: userChallenge.id },
				data: {
					status: isOneTask ? ChallengeStatus.ACTIVE : ChallengeStatus.FROZEN,
					...(isOneTask && { frozenAt: null }),
					usedRecoveries: { increment: 1 },
				},
			});

			await tx.challengeTask.update({
				where: {
					id: failedTasks[0].id,
				},
				data: {
					status: ChallengeTaskStatus.RECOVERED,
					completedAt: new Date(),
				},
			});

			await tx.user.update({
				where: { id: userId },
				data: {
					challengeRecoveries: { decrement: 1 },
				},
			});
		});

		if (isOneTask) return SUCCESS_MESSAGES.CHALLENGE.CHALLENGE_RECOVERED;

		return SUCCESS_MESSAGES.CHALLENGE.CHALLENGE_TASK_RECOVERED;
	}

	public async declineChallengeParticipation(
		challengeId: string,
		userId: string,
	): Promise<void> {
		const userChallenge = await this.prismaService.userChallenge.findUnique({
			where: { userId_challengeId: { userId, challengeId } },
		});

		if (!userChallenge)
			throw new NotFoundException(ERROR_MESSAGES.CHALLENGE.NOT_FOUND);

		const endedStatuses: ChallengeStatus[] = [
			ChallengeStatus.COMPLETED,
			ChallengeStatus.FAILED,
			ChallengeStatus.EXPIRED,
		];

		const activeStatuses: ChallengeStatus[] = [
			ChallengeStatus.ACTIVE,
			ChallengeStatus.FROZEN,
		];

		if (!activeStatuses.includes(userChallenge.status))
			throw new BadRequestException(ERROR_MESSAGES.CHALLENGE.NOT_PARTICIPATING);

		if (endedStatuses.includes(userChallenge.status))
			throw new BadRequestException(ERROR_MESSAGES.CHALLENGE.ALREADY_ENDED);

		await this.prismaService.userChallenge.delete({
			where: { id: userChallenge.id },
		});
	}

	private validateChallengeAvailability(
		isParticipating: boolean,
		challenge: Challenge,
	): void {
		const now = new Date();

		if (isParticipating) return;

		const { visibility, availableFrom, availableTo } = challenge;

		if (visibility !== ChallengeVisibility.PUBLISHED)
			throw new BadRequestException(ERROR_MESSAGES.CHALLENGE.NOT_AVAILABLE);

		if (availableFrom && availableFrom > now)
			throw new BadRequestException(ERROR_MESSAGES.CHALLENGE.NOT_STARTED);

		if (availableTo && availableTo < now)
			throw new BadRequestException(ERROR_MESSAGES.CHALLENGE.ALREADY_ENDED);
	}
}
