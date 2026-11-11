import { UserCoin } from '@generated/prisma/client';
import { PrismaService } from '@infra/prisma/prisma.service';
import { prismaMock } from '@libs/prisma/prisma.mock';
import { Test, TestingModule } from '@nestjs/testing';
import { mockReset } from 'jest-mock-extended';
import { CoinService } from './coin.service';

describe('CoinService', () => {
	let service: CoinService;

	const userCoin: UserCoin = {
		id: 'coin_1',
		userId: 'user_1',
		amount: 100,
		createdAt: new Date(),
		updatedAt: new Date(),
	};

	beforeEach(async () => {
		mockReset(prismaMock);

		const module: TestingModule = await Test.createTestingModule({
			providers: [
				CoinService,
				{ provide: PrismaService, useValue: prismaMock },
			],
		}).compile();

		service = module.get<CoinService>(CoinService);
	});

	it('should be defined', () => {
		expect(service).toBeDefined();
	});

	describe('create', () => {
		it('should create a user coin record if not exists', async () => {
			prismaMock.userCoin.findUnique.mockResolvedValue(null);
			prismaMock.userCoin.create.mockResolvedValue(userCoin);

			const result = await service.create('user_1');

			expect(prismaMock.userCoin.findUnique).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
			});
			expect(prismaMock.userCoin.create).toHaveBeenCalledWith({
				data: { user: { connect: { id: 'user_1' } } },
			});
			expect(result).toEqual(userCoin);
		});

		it('should return exists record', async () => {
			prismaMock.userCoin.findUnique.mockResolvedValue(userCoin);

			const result = await service.create('user_1');

			expect(prismaMock.userCoin.findUnique).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
			});

			expect(prismaMock.userCoin.create).not.toHaveBeenCalled();

			expect(result).toEqual(userCoin);
		});
	});

	describe('update', () => {
		it('should update the user coin amount if record exists', async () => {
			prismaMock.userCoin.findUnique.mockResolvedValue(userCoin);
			prismaMock.userCoin.update.mockResolvedValue({
				...userCoin,
				amount: 200,
			});

			const result = await service.update({ userId: 'user_1', amount: 200 });

			expect(prismaMock.userCoin.findUnique).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
			});
			expect(prismaMock.userCoin.update).toHaveBeenCalledWith({
				where: { userId: 'user_1', id: 'coin_1' },
				data: { amount: 200 },
			});
			expect(result).toEqual({ ...userCoin, amount: 200 });
		});

		it('should throw NotFoundException if user coin record does not exist', async () => {
			prismaMock.userCoin.findUnique.mockResolvedValue(null);

			await expect(
				service.update({ userId: 'user_1', amount: 200 }),
			).rejects.toThrow('User coin record not found');
		});
	});

	describe('getUserCoin', () => {
		it('should return user coin record if exists', async () => {
			prismaMock.userCoin.findUnique.mockResolvedValue(userCoin);

			const result = await service.getUserCoin('user_1');

			expect(prismaMock.userCoin.findUnique).toHaveBeenCalledWith({
				where: { userId: 'user_1' },
			});
			expect(result).toMatchObject(userCoin);
		});
	});
});
