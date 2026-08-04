import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { transformProduct } from '@libs/mappers/translation-products.mapper';
import { productInclude } from '@libs/prisma/product.include.prisma';
import { paginate } from '@libs/utils/pagination.util';
import { validateChallengeMetadata } from '@libs/utils/validate-challenge-metadata.util';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ChallengeQueryDto } from '../dto/challenge-query.dto';
import { FullChallengeDto } from '../dto/challenge.dto';
import { CreateChallengeDto } from '../dto/create-challenge.dto';
import { PaginatedChallengesDto } from '../dto/paginated-challenges.dto';
import { UpdateChallengeDto } from '../dto/update-challenge.dto';

@Injectable()
export class AdminChallengeService {
	constructor(private readonly prismaService: PrismaService) {}

	public async findAll(
		query: ChallengeQueryDto,
	): Promise<PaginatedChallengesDto> {
		const {
			limit = 20,
			page = 1,
			showExpired = false,
			sortBy = 'createdAt',
			sortOrder = 'asc',
			type,
			visibility,
			tier,
		} = query;

		const now = new Date();

		const where: Prisma.ChallengeWhereInput = {
			...(type && { type }),
			...(visibility && { visibility }),
			...(tier && { tier }),
			...(!showExpired && {
				OR: [{ availableTo: { gte: now } }, { availableTo: null }],
			}),
		};

		const result = await paginate<unknown>(
			{ page, limit },
			async (limit, offset) => {
				const [items, total] = await this.prismaService.$transaction([
					this.prismaService.challenge.findMany({
						where,
						orderBy: { [sortBy]: sortOrder },
						skip: offset,
						take: limit,
					}),
					this.prismaService.challenge.count({ where }),
				]);

				return { items, total };
			},
		);

		return plainToInstance(PaginatedChallengesDto, result);
	}

	public async findById(id: string): Promise<FullChallengeDto> {
		const challenge = await this.prismaService.challenge.findUnique({
			where: { id },
			include: { translations: true, product: { include: productInclude() } },
		});

		if (!challenge)
			throw new NotFoundException(ERROR_MESSAGES.CHALLENGE.NOT_FOUND);

		const { product, ...rest } = challenge;

		const mappedChallenge = {
			...rest,
			product: product ? transformProduct(product, 'en') : null,
		} as FullChallengeDto;

		return plainToInstance(FullChallengeDto, mappedChallenge);
	}

	public async create(dto: CreateChallengeDto): Promise<FullChallengeDto> {
		const { rewardProductId, translations, metadata, ...rest } = dto;

		const challenge = await this.prismaService.challenge.create({
			data: {
				...rest,
				...(metadata
					? { metadata: metadata as unknown as Prisma.InputJsonObject }
					: {}),
				...(rewardProductId
					? { product: { connect: { id: rewardProductId } } }
					: {}),
				translations: {
					createMany: {
						data: translations,
						skipDuplicates: true,
					},
				},
			},
			include: { translations: true, product: { include: productInclude() } },
		});

		const { product, ...restChallenge } = challenge;

		const mappedChallenge = {
			...restChallenge,
			product: product ? transformProduct(product, 'en') : null,
		} as FullChallengeDto;

		return plainToInstance(FullChallengeDto, mappedChallenge);
	}

	public async update(
		id: string,
		dto: UpdateChallengeDto,
	): Promise<FullChallengeDto> {
		const { metadata, translations, ...rest } = dto;

		const challenge = await this.findById(id);

		if (dto.type && dto.type !== challenge.type) {
			throw new BadRequestException(
				ERROR_MESSAGES.CHALLENGE.TYPE_CANNOT_BE_CHANGED,
			);
		}

		if (metadata) {
			const errors = validateChallengeMetadata(challenge.type, metadata);

			if (errors.length > 0) {
				throw new BadRequestException(
					`Metadata validation failed for type ${challenge.type}: ${errors.join('; ')}`,
				);
			}
		}

		const incomingLanguages = translations?.map((t) => t.language) || [];

		const translationsUpdate = translations
			? ({
					translations: {
						deleteMany: {
							language: { notIn: incomingLanguages },
						},
						upsert: translations.map((t) => ({
							where: {
								challengeId_language: {
									challengeId: challenge.id,
									language: t.language,
								},
							},
							create: { ...t },
							update: { ...t, language: t.language },
						})),
					},
				} satisfies Prisma.ChallengeUpdateInput)
			: {};

		const updated = await this.prismaService.challenge.update({
			where: { id: challenge.id },
			data: {
				...rest,
				...(metadata ? { metadata } : {}),
				...translationsUpdate,
			},
			include: { translations: true, product: { include: productInclude() } },
		});

		const { product, ...restChallenge } = updated;

		const mappedChallenge = {
			...restChallenge,
			product: product ? transformProduct(product, 'en') : null,
		} as FullChallengeDto;

		return plainToInstance(FullChallengeDto, mappedChallenge);
	}

	public async delete(id: string): Promise<void> {
		const challenge = await this.findById(id);

		await this.prismaService.challenge.delete({
			where: { id: challenge.id },
		});

		return;
	}
}
