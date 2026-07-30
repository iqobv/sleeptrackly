import { Prisma } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants/error-messages.constants';
import { paginate } from '@libs/utils/pagination.util';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ChallengeTemplateDto } from './dto/challenge-template.dto';
import { ChallengeTemplateQueryDto } from './dto/challenge-templates-query.dto';
import { CreateChallengeTemplateDto } from './dto/create-challenge-template.dto';
import { PaginatedChallengeTemplatesDto } from './dto/paginated-challenge-teplates.dto';
import { UpdateChallengeTemplateDto } from './dto/update-challenge-template.dto';

@Injectable()
export class ChallengeTemplateService {
	constructor(private readonly prismaService: PrismaService) {}

	public async findAll(
		query: ChallengeTemplateQueryDto,
	): Promise<PaginatedChallengeTemplatesDto> {
		const {
			page = 1,
			limit = 20,
			isActive,
			sortBy = 'createdAt',
			sortOrder = 'asc',
			tier,
			type,
		} = query;

		const where: Prisma.ChallengeTemplateWhereInput = {
			...(isActive !== undefined && { isActive }),
			...(tier && { tier }),
			...(type && { type }),
		};

		const result = await paginate({ page, limit }, async (limit, offset) => {
			const [items, total] = await this.prismaService.$transaction([
				this.prismaService.challengeTemplate.findMany({
					where,
					take: limit,
					skip: offset,
					orderBy: {
						[sortBy]: sortOrder,
					},
				}),
				this.prismaService.challengeTemplate.count({ where }),
			]);

			return { items, total };
		});

		return plainToInstance(PaginatedChallengeTemplatesDto, result);
	}

	public async findById(id: string): Promise<ChallengeTemplateDto> {
		const template = await this.prismaService.challengeTemplate.findUnique({
			where: { id },
			include: { translations: true },
		});

		if (!template)
			throw new NotFoundException(ERROR_MESSAGES.CHALLENGE_TEMPLATE.NOT_FOUND);

		return plainToInstance(ChallengeTemplateDto, template);
	}

	public async create(
		dto: CreateChallengeTemplateDto,
	): Promise<ChallengeTemplateDto> {
		const { generationRules, translations, ...rest } = dto;

		const created = await this.prismaService.challengeTemplate.create({
			data: {
				...rest,
				generationRules: generationRules as unknown as Prisma.JsonObject,
				translations: {
					createMany: {
						data: translations.map((translation) => ({
							...translation,
						})),
						skipDuplicates: true,
					},
				},
			},
			include: {
				translations: true,
			},
		});

		return plainToInstance(ChallengeTemplateDto, created);
	}

	public async update(
		id: string,
		dto: UpdateChallengeTemplateDto,
	): Promise<ChallengeTemplateDto> {
		const { translations, generationRules, ...rest } = dto;

		const template = await this.findById(id);

		if (dto.type && dto.type !== template.type) {
			throw new BadRequestException(
				ERROR_MESSAGES.CHALLENGE_TEMPLATE.TYPE_CANNOT_BE_CHANGED,
			);
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
								challengeTemplateId_language: {
									challengeTemplateId: template.id,
									language: t.language,
								},
							},
							create: { ...t },
							update: { ...t, language: t.language },
						})),
					},
				} satisfies Prisma.ChallengeTemplateUpdateInput)
			: {};

		const updated = await this.prismaService.challengeTemplate.update({
			where: { id: template.id },
			data: {
				...rest,
				...(generationRules && {
					generationRules: generationRules as unknown as Prisma.JsonObject,
				}),
				...translationsUpdate,
			},
			include: { translations: true },
		});

		return plainToInstance(ChallengeTemplateDto, updated);
	}

	public async delete(id: string): Promise<void> {
		const template = await this.findById(id);

		await this.prismaService.challengeTemplate.delete({
			where: { id: template.id },
		});

		return;
	}
}
