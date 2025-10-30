import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { userSelect } from 'src/libs/prisma';
import { CreateReportDto, SearchQueryDto, UpdateReportDto } from './dto';

@Injectable()
export class ReportService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(userId: string, dto: CreateReportDto) {
		const { reportType, title, description, reportedId } = dto;

		if (reportedId) await this.findSendReports(userId, reportedId);

		const report = await this.prismaService.report.create({
			data: {
				sender: { connect: { id: userId } },
				title,
				description,
				reportType,
				reported: { connect: { id: reportedId } },
			},
		});

		return report;
	}

	async findById(id: string) {
		const report = await this.prismaService.report.findUnique({
			where: { id },
			include: {
				sender: { select: userSelect },
				reported: { select: userSelect },
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

	async update(id: string, dto: UpdateReportDto) {
		const { response, status } = dto;

		const report = await this.findById(id);

		if (status === report.status)
			throw new BadRequestException('Status is the same');

		return await this.prismaService.report.update({
			where: { id: report.id },
			data: { response, status },
		});
	}

	private async findSendReports(userId: string, reportedId: string) {
		const report = await this.prismaService.report.findFirst({
			where: { senderId: userId, reportedId },
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
