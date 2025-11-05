import {
	BadRequestException,
	Injectable,
	NotFoundException,
} from '@nestjs/common';
import { UserSanction, UserSanctionType } from '@prisma/client';
import dayjs from 'dayjs';
import { PrismaService } from 'src/infra/prisma/prisma.service';
import { CreaeteUserSanctionDto, UpdateUserSanctionDto } from './dto';

@Injectable()
export class UserSanctionService {
	constructor(private readonly prismaService: PrismaService) {}

	async findByUserId(userId: string) {
		return await this.prismaService.userSanction.findMany({
			where: { userId },
		});
	}

	private async findByTypeAndUserId(type: UserSanctionType, userId: string) {
		return await this.prismaService.userSanction.findUnique({
			where: { userId_type: { type, userId } },
		});
	}

	async findById(id: string) {
		const sanction = await this.prismaService.userSanction.findUnique({
			where: { id },
		});

		if (!sanction) throw new NotFoundException('Sanction not found');

		return sanction;
	}

	async create(userId: string, dto: CreaeteUserSanctionDto) {
		const { targetUserId, type, endsAt, startsAt, reportId } = dto;

		if (startsAt > endsAt)
			throw new BadRequestException('Start date must be before end date');

		if (endsAt < new Date())
			throw new BadRequestException('End date must be in the future');

		let endDate = dayjs(endsAt).toDate();

		const sanction = await this.findByTypeAndUserId(type, targetUserId);

		let userSanction: UserSanction;

		if (sanction) {
			endDate = dayjs(sanction.endsAt).isAfter(dayjs(endsAt))
				? dayjs(sanction.endsAt).toDate()
				: dayjs(endsAt).toDate();

			userSanction = await this.prismaService.userSanction.update({
				where: { userId_type: { type, userId: targetUserId } },
				data: { endsAt: endDate },
			});
		} else {
			userSanction = await this.prismaService.userSanction.create({
				data: {
					report: { connect: { id: reportId } },
					user: { connect: { id: targetUserId } },
					createdBy: { connect: { id: userId } },
					startsAt,
					endsAt: endDate,
					type,
				},
			});
		}

		return userSanction;
	}

	async update(id: string, dto: UpdateUserSanctionDto) {
		const { endsAt } = dto;

		if (endsAt && endsAt < new Date())
			throw new BadRequestException('End date must be in the future');

		const sanction = await this.findById(id);

		const userSanction = await this.prismaService.userSanction.update({
			where: {
				id: sanction.id,
			},
			data: {
				endsAt,
			},
		});

		return userSanction;
	}

	async remove(id: string) {
		await this.findById(id);

		await this.prismaService.userSanction.delete({ where: { id } });

		return true;
	}
}
