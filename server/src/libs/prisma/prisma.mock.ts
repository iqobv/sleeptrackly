import { PrismaClient } from '@generated/prisma/client';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';

export const prismaMock =
	mockDeep<PrismaClient>() as unknown as DeepMockProxy<PrismaClient>;

export type MockContext = {
	prisma: DeepMockProxy<PrismaClient>;
};
