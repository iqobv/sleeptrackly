import { IsArray, IsNumber, IsUUID, Min } from 'class-validator';
import { Prisma } from 'generated/prisma/client';

export class CreatePurchaseHistoryDto {
	@IsUUID('4')
	userId: string;

	@IsUUID('4')
	productId: string;

	@IsUUID('4')
	transactionId: string;

	@IsNumber()
	@Min(0)
	pricePaid: number;

	@IsNumber()
	priceSnapshot: number;

	@IsArray()
	nameSnapshot: Prisma.JsonArray;
}
