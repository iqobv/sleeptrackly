import { Module } from '@nestjs/common';
import { UserInventoryController } from './user-inventory.controller';
import { UserInventoryService } from './user-inventory.service';

@Module({
	controllers: [UserInventoryController],
	exports: [UserInventoryService],
	providers: [UserInventoryService],
})
export class UserInventoryModule {}
