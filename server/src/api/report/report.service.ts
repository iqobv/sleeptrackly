import { Prisma } from '@generated/prisma/client';
import { ReportStatus } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { ERROR_MESSAGES } from '@libs/constants';
import { userSelect } from '@libs/prisma';
import { paginate } from '@libs/utils';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
	AllReportsDto,
	CreateReportDto,
	FullReportDto,
	ReportDto,
	SearchQueryDto,
	UpdateReportDto,
} from './dto';

@Injectable()
export class ReportService {
	constructor(private readonly prismaService: PrismaService) {}

	public async create(userId: string, dto: CreateReportDto): Promise<ReportDto> {
		const { reportType, title, description, reportedId } = dto;

		if (reportedId) await this.findSendReports(userId, reportedId);

		const report = await this.prismaService.report.create({
			data: {
				reporter: { connect: { id: userId } },
				title,
				description,
				reportType,
				targetUser: { connect: { id: reportedId } },
			},
		});

		return plainToInstance(ReportDto, report);
	}

	public async findById(id: string): Promise<FullReportDto> {
		const report = await this.prismaService.report.findUnique({
			where: { id },
			include: {
				reporter: { select: userSelect },
				targetUser: { select: userSelect },
				sanctions: {
					include: {
						user: { select: userSelect },
						createdBy: { select: userSelect },
					},
				},
			},
		});

		if (!report) throw new NotFoundException(ERROR_MESSAGES.REPORT.NOT_FOUND);

		return plainToInstance(FullReportDto, report);
	}

	public async findAll(dto: SearchQueryDto): Promise<AllReportsDto> {
		const {
			page = 1,
			limit = 20,
			sortBy = 'createdAt',
			sortOrder = 'desc',
			reportType,
			status,
		} = dto;

		const orderBy: Prisma.ReportOrderByWithRelationInput = sortBy
			? { [sortBy]: sortOrder }
			: { createdAt: 'desc' };

		const where = {
			reportType,
			status,
		} satisfies Prisma.ReportWhereInput;

		const result = await paginate(
			{ limit, page },
			async (safePage, safeSize) => {
				const [total, items] = await this.prismaService.$transaction([
					this.prismaService.report.count({
						where,
					}),
					this.prismaService.report.findMany({
						where,
						orderBy,
						skip: (safePage - 1) * safeSize,
						take: safeSize,
					}),
				]);

				return { items, total };
			},
		);

		return plainToInstance(AllReportsDto, result);
	}

	public async update(
		id: string,
		userId: string,
		dto: UpdateReportDto,
	): Promise<ReportDto> {
		const { response, status } = dto;

		const report = await this.findById(id);

		if (status === report.status)
			throw new BadRequestException(ERROR_MESSAGES.REPORT.STATUS_IS_THE_SAME);

		if (status === ReportStatus.PENDING)
			throw new BadRequestException(
				ERROR_MESSAGES.REPORT.CANNOT_CHANGE_STATUS_TO_PENDING,
			);

		const updated = await this.prismaService.report.update({
			where: { id: report.id },
			data: {
				response,
				status,
				...(report.status === ReportStatus.PENDING && {
					reviewedBy: { connect: { id: userId } },
				}),
			},
		});

		return plainToInstance(ReportDto, updated);
	}

	private async findSendReports(
		userId: string,
		reportedId: string,
	): Promise<void> {
		const report = await this.prismaService.report.findFirst({
			where: { reporterId: userId, targetUserId: reportedId },
			orderBy: { createdAt: 'desc' },
		});

		if (report) {
			const now = new Date().getTime();

			if (now - report.createdAt.getTime() < 60 * 60 * 1000)
				throw new BadRequestException(
					ERROR_MESSAGES.REPORT.YOU_CAN_SEND_A_REPORT_ONCE_PER_HOUR,
				);
		}
	}
}
