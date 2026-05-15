import { ReportStatus } from '@generated/prisma/enums';
import { PrismaService } from '@infra/prisma/prisma.service';
import { userSelect } from '@libs/prisma';
import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { CreateReportDto, SearchQueryDto, UpdateReportDto } from './dto';

@Injectable()
export class ReportService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(userId: string, dto: CreateReportDto) {
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

		return report;
	}

	async findById(id: string) {
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

		if (!report) throw new NotFoundException('Report not found');

		return report;
	}

	async findAll(dto: SearchQueryDto) {
		const {
			page = 1,
			pageSize = 10,
			sortBy = 'createdAt',
			sortOrder = 'desc',
			reportType,
			status,
		} = dto;

		const safePage = Math.max(Number(page) || 1, 1);
		const safeSize = Math.max(Number(pageSize) || 10, 1);
		const skip = (safePage - 1) * safeSize;

		const orderBy = sortBy
			? { [sortBy]: sortOrder }
			: { createdAt: 'desc' as const };

		const [items, total] = await this.prismaService.$transaction([
			this.prismaService.report.findMany({
				where: { reportType, status },
				orderBy,
				skip,
				take: safeSize,
			}),
			this.prismaService.report.count({
				where: { reportType, status },
			}),
		]);

		return {
			items,
			meta: {
				total,
				page: safePage,
				pageSize: safeSize,
				totalPages: Math.max(Math.ceil(total / safeSize), 1),
			},
		};
	}

	async update(id: string, userId: string, dto: UpdateReportDto) {
		const { response, status } = dto;

		const report = await this.findById(id);

		if (status === report.status)
			throw new BadRequestException('Status is the same');

		if (status === ReportStatus.PENDING)
			throw new BadRequestException('Cannot change status to pending');

		return await this.prismaService.report.update({
			where: { id: report.id },
			data: {
				response,
				status,
				...(report.status === ReportStatus.PENDING && {
					reviewedBy: { connect: { id: userId } },
				}),
			},
		});
	}

	private async findSendReports(userId: string, reportedId: string) {
		const report = await this.prismaService.report.findFirst({
			where: { reporterId: userId, targetUserId: reportedId },
			orderBy: { createdAt: 'desc' },
		});

		if (report) {
			const now = new Date().getTime();

			if (now - report.createdAt.getTime() < 60 * 60 * 1000) {
				throw new BadRequestException('You can send a report once per hour');
			}
		}
	}
}
