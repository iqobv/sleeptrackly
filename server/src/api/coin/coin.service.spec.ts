import { PrismaService } from '@infra/prisma/prisma.service';
import { Test, TestingModule } from '@nestjs/testing';
import { CoinService } from './coin.service';

type PrismaMock = {
	userCoin: {
		create: jest.Mock;
		findUnique: jest.Mock;
		update: jest.Mock;
	};
};

describe('CoinService', () => {
	let service: CoinService;
	let prisma: PrismaMock;

	const userCoin = {
		id: 'coin_1',
		userId: 'user_1',
		amount: 100,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(async () => {
		prisma = {
			userCoin: {
				create: jest.fn(),
				findUnique: jest.fn(),
				update: jest.fn(),
			},
		};

		const module: TestingModule = await Test.createTestingModule({
			providers: [CoinService, { provide: PrismaService, useValue: prisma }],
		}).compile();

		service = module.get<CoinService>(CoinService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create a user coin record if not exists', async () => {
			prisma.userCoin.findUnique.mockResolvedValue(null);
			prisma.userCoin.create.mockResolvedValue(userCoin);

			const result = await service.create('user_1');

			expect(prisma.userCoin.findUnique).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
			});
			expect(prisma.userCoin.create).toHaveBeenCalledWith({
				data: { user: { connect: { id: 'user_1' } } },
			});
			expect(result).toEqual(userCoin);
		});

		it('should throw ConflictException if user coin record already exists', async () => {
			prisma.userCoin.findUnique.mockResolvedValue(userCoin);

			await expect(service.create('user_1')).rejects.toThrow(
				'User coin record already exists',
			);
		});
	});

	describe('update', () => {
		it('should update the user coin amount if record exists', async () => {
			prisma.userCoin.findUnique.mockResolvedValue(userCoin);
			prisma.userCoin.update.mockResolvedValue({
				...userCoin,
				amount: 200,
			});

			const result = await service.update({ userId: 'user_1', amount: 200 });

			expect(prisma.userCoin.findUnique).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
			});
			expect(prisma.userCoin.update).toHaveBeenCalledWith({
				where: { userId: 'user_1', id: 'coin_1' },
				data: { amount: 200 },
			});
			expect(result).toEqual({ ...userCoin, amount: 200 });
		});

		it('should throw NotFoundException if user coin record does not exist', async () => {
			prisma.userCoin.findUnique.mockResolvedValue(null);

			await expect(
				service.update({ userId: 'user_1', amount: 200 }),
			).rejects.toThrow('User coin record not found');
		});
	});

	describe('getUserCoin', () => {
		it('should return user coin record if exists', async () => {
			prisma.userCoin.findUnique.mockResolvedValue(userCoin);

			const result = await service.getUserCoin('user_1');

			expect(prisma.userCoin.findUnique).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
			});
			expect(result).toEqual(userCoin);
		});
	});
});
