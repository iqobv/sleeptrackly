import { UserSanctionType } from '@generated/prisma/enums';
import { SUCCESS_MESSAGES } from '@libs/constants/success-messages.constants';
import { Test, TestingModule } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { AdminUserSanctionController } from './admin-user-sanction.controller';
import { UserSanctionDto } from './dto/user-sanction.dto';
import { UserSanctionService } from './user-sanction.service';

jest.mock('uuid', () => ({ v4: () => 'mock-uuid' }));

describe('AdminUserSanctionController', () => {
	let controller: AdminUserSanctionController;
	let service = mock<UserSanctionService>();

	const now = new Date();

	const sanction: UserSanctionDto = {
		id: 'sanction-1',
		userId: 'u1',
		reportId: 'rep1',
		createdById: 'admin1',
		startsAt: now,
		endsAt: new Date(now.getTime() + 1000 * 60 * 60),
		type: UserSanctionType.AVATAR_CHANGE_BAN,
		createdAt: now,
		updatedAt: now,
	};

	beforeEach(async () => {
		const moduleRef: TestingModule = await Test.createTestingModule({
			controllers: [AdminUserSanctionController],
			providers: [
				{
					provide: UserSanctionService,
					useValue: service,
				},
			],
		}).compile();

		controller = moduleRef.get<AdminUserSanctionController>(
			AdminUserSanctionController,
		);
	});

	it('should be defined', () => {
		expect(controller).toBeDefined();
	});

	describe('findByUserId', () => {
		it('should return sanctions by user id', async () => {
			const sanctions = [sanction];
			service.findByUserId.mockResolvedValue(sanctions);

			const result = await controller.findByUserId('u1');

			expect(service.findByUserId).toHaveBeenCalledWith('u1');
			expect(result).toEqual(sanctions);
		});
	});

	describe('findById', () => {
		it('should return sanction by id', async () => {
			service.findById.mockResolvedValue(sanction);

			const result = await controller.findById('sanction-1');

			expect(service.findById).toHaveBeenCalledWith('sanction-1');
			expect(result).toEqual(sanction);
		});
	});

	describe('create', () => {
		it('should create sanction', async () => {
			service.create.mockResolvedValue(sanction);

			const dto = {
				targetUserId: 'u2',
				type: UserSanctionType.AVATAR_CHANGE_BAN,
				endsAt: new Date(now.getTime() + 1000 * 60 * 60),
				startsAt: now,
				reportId: 'rep1',
			};

			const result = await controller.create('admin-1', dto);

			expect(service.create).toHaveBeenCalledWith('admin-1', dto);
			expect(result).toEqual(sanction);
		});
	});

	describe('update', () => {
		it('should update sanction', async () => {
			service.update.mockResolvedValue(sanction);

			const dto = { endsAt: new Date(now.getTime() + 1000 * 60 * 60) };

			const result = await controller.update('sanction-1', dto);

			expect(service.update).toHaveBeenCalledWith('sanction-1', dto);
			expect(result).toEqual(sanction);
		});
	});

	describe('remove', () => {
		it('should remove sanction', async () => {
			service.remove.mockResolvedValue(SUCCESS_MESSAGES.SANCTION.DELETED);

			const result = await controller.remove('sanction-1');

			expect(service.remove).toHaveBeenCalledWith('sanction-1');
			expect(result).toEqual(SUCCESS_MESSAGES.SANCTION.DELETED);
		});
	});
});
